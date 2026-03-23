import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import GithubSlugger from 'github-slugger';

const CONTENT_ROOT = path.resolve(process.cwd(), 'src/content');
const OUTPUT_FILE = path.resolve(CONTENT_ROOT, 'docs-manifest.generated.json');
const OUTPUT_INDEX_FILE = path.resolve(CONTENT_ROOT, 'docs-index.generated.json');
const OUTPUT_TOPICS_DIR = path.resolve(CONTENT_ROOT, 'docs-topics');
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
        .filter((entry) => fs.existsSync(path.join(CONTENT_ROOT, entry.name, 'introduction.mdx')))
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

function serializeTopicManifest(topic) {
    return `${JSON.stringify({ version: 1, topic }, null, 2)}\n`;
}

function serializeIndexManifest(docs) {
    const indexDocs = docs.map((doc) => ({
        id: doc.id,
        title: doc.title,
        icon: doc.icon,
        slug: doc.slug,
        order: doc.order,
        introPath: doc.introPath,
        sectionCount: doc.sections?.length || 0,
        sections: [],
    }));
    return `${JSON.stringify({ version: 1, docs: indexDocs }, null, 2)}\n`;
}

function ensureTopicsDir() {
    if (!fs.existsSync(OUTPUT_TOPICS_DIR)) {
        fs.mkdirSync(OUTPUT_TOPICS_DIR, { recursive: true });
    }
}

function getTopicManifestPath(topicId) {
    return path.resolve(OUTPUT_TOPICS_DIR, `docs-topic-${topicId}.generated.json`);
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

    const serializedFull = serializeManifest(manifest);
    const serializedIndex = serializeIndexManifest(manifest.docs);
    const serializedTopics = manifest.docs.map((topic) => ({
        id: topic.id,
        filePath: getTopicManifestPath(topic.id),
        content: serializeTopicManifest(topic),
    }));

    const existingFull = fs.existsSync(OUTPUT_FILE) ? fs.readFileSync(OUTPUT_FILE, 'utf8') : null;
    const existingIndex = fs.existsSync(OUTPUT_INDEX_FILE) ? fs.readFileSync(OUTPUT_INDEX_FILE, 'utf8') : null;
    const existingTopicFiles = fs.existsSync(OUTPUT_TOPICS_DIR)
        ? fs
              .readdirSync(OUTPUT_TOPICS_DIR, { withFileTypes: true })
              .filter((entry) => entry.isFile() && entry.name.endsWith('.generated.json'))
              .map((entry) => entry.name)
        : [];
    const expectedTopicFiles = new Set(serializedTopics.map((topic) => path.basename(topic.filePath)));

    if (validateOnly) {
        if (existingFull !== serializedFull) {
            console.error(`Docs manifest is out of date: ${toPosix(OUTPUT_FILE)}`);
            console.error('Run: npm run docs:build-manifest');
            process.exit(1);
        }
        if (existingIndex !== serializedIndex) {
            console.error(`Docs index manifest is out of date: ${toPosix(OUTPUT_INDEX_FILE)}`);
            console.error('Run: npm run docs:build-manifest');
            process.exit(1);
        }
        for (const topic of serializedTopics) {
            const existingTopic = fs.existsSync(topic.filePath) ? fs.readFileSync(topic.filePath, 'utf8') : null;
            if (existingTopic !== topic.content) {
                console.error(`Docs topic manifest is out of date: ${toPosix(topic.filePath)}`);
                console.error('Run: npm run docs:build-manifest');
                process.exit(1);
            }
        }
        const staleTopicFiles = existingTopicFiles.filter((fileName) => !expectedTopicFiles.has(fileName));
        if (staleTopicFiles.length) {
            console.error(`Docs topic manifests contain stale files in ${toPosix(OUTPUT_TOPICS_DIR)}:`);
            for (const fileName of staleTopicFiles) {
                console.error(`- ${fileName}`);
            }
            console.error('Run: npm run docs:build-manifest');
            process.exit(1);
        }
        console.log('Docs manifest is valid and up to date.');
        return;
    }

    ensureTopicsDir();
    fs.writeFileSync(OUTPUT_FILE, serializedFull, 'utf8');
    fs.writeFileSync(OUTPUT_INDEX_FILE, serializedIndex, 'utf8');
    for (const fileName of existingTopicFiles) {
        if (!expectedTopicFiles.has(fileName)) {
            fs.unlinkSync(path.resolve(OUTPUT_TOPICS_DIR, fileName));
        }
    }
    for (const topic of serializedTopics) {
        fs.writeFileSync(topic.filePath, topic.content, 'utf8');
    }
    console.log(`Wrote docs manifest: ${toPosix(OUTPUT_FILE)}`);
    console.log(`Wrote docs index: ${toPosix(OUTPUT_INDEX_FILE)}`);
    console.log(`Wrote docs topic manifests: ${serializedTopics.length} files in ${toPosix(OUTPUT_TOPICS_DIR)}`);
}

run();
