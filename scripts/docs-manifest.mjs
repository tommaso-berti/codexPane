import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import GithubSlugger from 'github-slugger';

const CONTENT_ROOT = path.resolve(process.cwd(), 'src/content');
const OUTPUT_FILE = path.resolve(CONTENT_ROOT, 'docs-manifest.generated.json');
const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---\n?/;

function toPosix(value) {
    return value.split(path.sep).join('/');
}

function titleCase(value) {
    return value
        .split(/[-_]/g)
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function stripQuotes(value) {
    if (!value) return value;
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        return value.slice(1, -1);
    }
    return value;
}

function parseFrontmatter(raw, filePath, errors) {
    const normalized = raw.replace(/\r\n/g, '\n');
    if (!normalized.startsWith('---\n')) {
        return { data: {}, content: normalized };
    }

    const match = normalized.match(FRONTMATTER_RE);
    if (!match) {
        errors.push(`Malformed frontmatter in ${filePath}: missing closing '---'.`);
        return { data: {}, content: normalized };
    }

    const data = {};
    const block = match[1];
    for (const line of block.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const sepIndex = trimmed.indexOf(':');
        if (sepIndex < 1) {
            errors.push(`Malformed frontmatter line in ${filePath}: "${line}"`);
            continue;
        }
        const key = trimmed.slice(0, sepIndex).trim();
        const rawValue = stripQuotes(trimmed.slice(sepIndex + 1).trim());
        if (key === 'order') {
            const parsed = Number(rawValue);
            if (!Number.isFinite(parsed)) {
                errors.push(`Invalid frontmatter 'order' in ${filePath}: "${rawValue}"`);
                continue;
            }
            data.order = parsed;
            continue;
        }
        data[key] = rawValue;
    }

    return { data, content: normalized.slice(match[0].length) };
}

function stripInlineMarkdown(value) {
    return value
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/_([^_]+)_/g, '$1')
        .replace(/~~([^~]+)~~/g, '$1')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function extractFirstHeading(content, level) {
    const headingPattern = new RegExp(`^${'#'.repeat(level)}\\s+(.+?)\\s*$`, 'm');
    const match = content.match(headingPattern);
    return match ? stripInlineMarkdown(match[1]) : '';
}

function extractSubsections(content, topicId, sectionId, errors, filePath) {
    const headingRegex = /^##(?!#)\s+(.+?)\s*$/gm;
    const slugger = new GithubSlugger();
    const subSections = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const headingText = stripInlineMarkdown(match[1]);
        if (!headingText) {
            errors.push(`Empty subsection heading in ${filePath}`);
            continue;
        }
        const subId = slugger.slug(headingText);
        if (!subId) {
            errors.push(`Invalid subsection heading "${match[1]}" in ${filePath}`);
            continue;
        }

        subSections.push({
            id: subId,
            title: headingText,
            slug: `${topicId}/${sectionId}#${subId}`,
            order: subSections.length + 1,
        });
    }

    return subSections;
}

function listTopicDirectories() {
    return fs
        .readdirSync(CONTENT_ROOT, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);
}

function loadLegacyHints(topicDir, errors) {
    const structurePath = path.join(CONTENT_ROOT, topicDir, 'structure.json');
    if (!fs.existsSync(structurePath)) {
        return { doc: {}, sectionById: new Map() };
    }

    try {
        const raw = JSON.parse(fs.readFileSync(structurePath, 'utf8'));
        const sectionById = new Map((raw.items || []).map((section) => [section.id, section]));
        return {
            doc: {
                title: raw.title,
                icon: raw.icon,
                order: raw.order,
            },
            sectionById,
        };
    } catch (error) {
        errors.push(`Failed to read legacy hints from ${toPosix(structurePath)}: ${error.message}`);
        return { doc: {}, sectionById: new Map() };
    }
}

function buildTopicNode(topicId, errors) {
    const topicDir = path.join(CONTENT_ROOT, topicId);
    const legacy = loadLegacyHints(topicId, errors);
    const introFile = path.join(topicDir, 'introduction.mdx');

    if (!fs.existsSync(introFile)) {
        errors.push(`Missing introduction.mdx for topic "${topicId}"`);
        return null;
    }

    const introRaw = fs.readFileSync(introFile, 'utf8');
    const introParsed = parseFrontmatter(introRaw, toPosix(introFile), errors);
    const docTitle =
        introParsed.data.title ||
        legacy.doc.title ||
        extractFirstHeading(introParsed.content, 1) ||
        titleCase(topicId);

    const files = fs
        .readdirSync(topicDir, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx') && entry.name !== 'introduction.mdx')
        .map((entry) => entry.name);

    const sectionCandidates = files.map((fileName) => {
        const sectionId = fileName.replace(/\.mdx$/, '');
        const sectionFile = path.join(topicDir, fileName);
        const raw = fs.readFileSync(sectionFile, 'utf8');
        const parsed = parseFrontmatter(raw, toPosix(sectionFile), errors);
        const legacySection = legacy.sectionById.get(sectionId) || {};
        const sectionTitle =
            parsed.data.title ||
            legacySection.title ||
            extractFirstHeading(parsed.content, 1) ||
            titleCase(sectionId);

        return {
            id: sectionId,
            title: sectionTitle,
            slug: `${topicId}/${sectionId}`,
            sortOrder: Number.isFinite(parsed.data.order)
                ? parsed.data.order
                : Number.isFinite(legacySection.order)
                    ? legacySection.order
                    : Number.POSITIVE_INFINITY,
            filePath: `../../content/${topicId}/${fileName}`,
            subSections: extractSubsections(parsed.content, topicId, sectionId, errors, toPosix(sectionFile)),
        };
    });

    sectionCandidates.sort((a, b) => {
        if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
        return a.id.localeCompare(b.id);
    });
    const sections = sectionCandidates.map(({ sortOrder, ...section }, index) => ({
        ...section,
        order: index + 1,
    }));

    const sectionIds = new Set();
    for (const section of sections) {
        if (sectionIds.has(section.id)) {
            errors.push(`Duplicate section id "${section.id}" in topic "${topicId}"`);
        }
        sectionIds.add(section.id);

        const subIds = new Set();
        for (const sub of section.subSections) {
            if (subIds.has(sub.id)) {
                errors.push(`Duplicate subsection id "${sub.id}" in ${topicId}/${section.id}`);
            }
            subIds.add(sub.id);
        }
    }

    return {
        id: topicId,
        title: docTitle,
        icon: introParsed.data.icon || legacy.doc.icon || 'ImageNotSupportedIcon',
        slug: topicId,
        sortOrder: Number.isFinite(introParsed.data.order)
            ? introParsed.data.order
            : Number.isFinite(legacy.doc.order)
                ? legacy.doc.order
                : Number.POSITIVE_INFINITY,
        introPath: `../../content/${topicId}/introduction.mdx`,
        sections,
    };
}

function buildManifest() {
    const errors = [];
    const topics = listTopicDirectories();
    const unsortedDocs = topics
        .map((topicId) => buildTopicNode(topicId, errors))
        .filter(Boolean);

    const docs = unsortedDocs
        .sort((a, b) => {
            if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
            return a.id.localeCompare(b.id);
        })
        .map(({ sortOrder, ...doc }, index) => ({
            ...doc,
            order: index + 1,
        }));

    const docIds = new Set();
    for (const doc of docs) {
        if (docIds.has(doc.id)) {
            errors.push(`Duplicate doc id "${doc.id}"`);
        }
        docIds.add(doc.id);
    }

    return {
        manifest: {
            version: 1,
            docs,
        },
        errors,
    };
}

function serializeManifest(manifest) {
    return `${JSON.stringify(manifest, null, 2)}\n`;
}

function run() {
    const validateOnly = process.argv.includes('--validate');
    const { manifest, errors } = buildManifest();

    if (errors.length) {
        console.error('Docs manifest validation failed:');
        for (const error of errors) {
            console.error(`- ${error}`);
        }
        process.exit(1);
    }

    const serialized = serializeManifest(manifest);
    const existing = fs.existsSync(OUTPUT_FILE) ? fs.readFileSync(OUTPUT_FILE, 'utf8') : null;

    if (validateOnly) {
        if (existing !== serialized) {
            console.error(`Docs manifest is out of date: ${toPosix(OUTPUT_FILE)}`);
            console.error('Run: npm run docs:build-manifest');
            process.exit(1);
        }
        console.log('Docs manifest is valid and up to date.');
        return;
    }

    fs.writeFileSync(OUTPUT_FILE, serialized, 'utf8');
    console.log(`Wrote docs manifest: ${toPosix(OUTPUT_FILE)}`);
}

run();
