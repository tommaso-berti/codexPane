import fs from 'node:fs';
import path from 'node:path';

const RAW_ROOT = path.resolve('src/raw_content');
const CONTENT_ROOT = path.resolve('src/content');
const REPORT_PATH = path.resolve('docs/import-coverage-report.md');

function walk(dir, out = []) {
    if (!fs.existsSync(dir)) return out;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(fullPath, out);
        } else {
            out.push(fullPath);
        }
    }
    return out;
}

function toPosix(filePath) {
    return filePath.split(path.sep).join('/');
}

function normalizeSlug(name) {
    return name
        .toLowerCase()
        .replace(/\.[^.]+$/, '')
        .replace(/[’']/g, '')
        .replace(/&/g, ' and ')
        .replace(/^\d+(?:[.-]\d+)*(?:\s*[-.)]\s*|\s+)/, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function inferPreferredTopic(relativeRawPath) {
    const rel = toPosix(relativeRawPath);
    if (rel.startsWith('Algorithms/')) return 'algorithms';
    if (rel.startsWith('API/')) return 'api';
    if (rel.startsWith('CSS - CodexPane/')) return 'css';
    if (rel.startsWith('Command Line - CodexPane/')) return 'vps';
    if (rel.startsWith('Data structure/')) return 'data-structures';
    if (rel.startsWith('DevOps Fundamentals/')) return 'devops-fundamentals';
    if (rel.startsWith('Express.js/')) return 'express';
    if (rel.startsWith('Fundamentals of Operating Systems/')) return 'operating-systems';
    if (rel.startsWith('GitHub - CodexPane/')) return 'github';
    if (rel.startsWith('HTML - CodexPane/')) return 'html';
    if (rel.startsWith('HTTP - CodexPane/')) return 'http';
    if (rel.startsWith('JavaScript - CodexPane/')) return 'javascript';
    if (rel.startsWith('jQuery - CodexPane/')) return 'jquery';
    if (rel.startsWith('MUI/')) return 'mui';
    if (rel.startsWith('Node.js/')) return 'node';
    if (rel.startsWith('React/')) return 'react';
    if (rel.startsWith('Redux/')) return 'redux';
    if (rel.startsWith('Server testing TDD/')) return 'server-testing-tdd';
    if (rel.startsWith('Software design/')) return 'software-design';
    if (rel.startsWith('Tech interview/')) return 'tech-interview';
    if (rel.startsWith('User authentication/')) return 'authentication';

    if (rel.startsWith('Database/SQL/PostgreSQL/')) return 'postgresql';
    if (rel.startsWith('Database/SQL/')) return 'sql';
    if (rel.startsWith('Database/MongoDB - CodexPane/')) return 'mongodb';
    if (rel.startsWith('Database/')) return 'database';
    return null;
}

function selectBestMatch(matches, preferredTopic) {
    if (!matches.length) return null;
    if (!preferredTopic) return matches[0];
    const topicMatches = matches.filter((item) => toPosix(item).includes(`/src/content/${preferredTopic}/`));
    if (topicMatches.length) return topicMatches[0];
    return matches[0];
}

function makeContentRelative(filePath) {
    return toPosix(path.relative(path.resolve('.'), filePath));
}

const manualOverrides = new Map([
    [
        'Algorithms/Search and Graph Search Algorithms/3- Dijkstra\'s Algorithm.md',
        {
            status: 'Covered (direct)',
            target: 'src/content/algorithms/search-and-graph-search-algorithms-dijkstra-s-algorithm.mdx',
            note: 'Topic exported with normalized filename.',
        },
    ],
    [
        "Algorithms/Search and Graph Search Algorithms/3-1- Js Dijkstra's Algorithm.md",
        {
            status: 'Covered (direct)',
            target: 'src/content/algorithms/search-and-graph-search-algorithms-js-dijkstra-s-algorithm.mdx',
            note: 'Topic exported with normalized filename.',
        },
    ],
    [
        'HTML - CodexPane/3- Form imput.md',
        {
            status: 'Covered (merged)',
            target: 'src/content/html/form-input.mdx',
            note: 'Typo normalized from "imput" to "input".',
        },
    ],
    [
        'JavaScript - CodexPane/Advanced - CodexPane/3- Hoisting.md',
        {
            status: 'Covered (merged)',
            target: 'src/content/javascript/variables.mdx',
            note: 'Hoisting is documented in dedicated section within Variables.',
        },
    ],
    [
        'JavaScript - CodexPane/Automated testing - MVC/2- Code coverage and mocking.md',
        {
            status: 'Covered (merged)',
            target: 'src/content/javascript/testing-foundations.mdx',
            note: 'Coverage and mocking consolidated under Testing Foundations.',
        },
    ],
    [
        'JavaScript - CodexPane/Automated testing - MVC/Jest/1- Jest testing.md',
        {
            status: 'Covered (merged)',
            target: 'src/content/javascript/testing-foundations.mdx',
            note: 'Jest guidance consolidated under Testing Foundations.',
        },
    ],
    [
        'JavaScript - CodexPane/Automated testing - MVC/Mocha - MVC/1- Mocha.md',
        {
            status: 'Covered (merged)',
            target: 'src/content/javascript/testing-foundations.mdx',
            note: 'Mocha overview consolidated under Testing Foundations.',
        },
    ],
    [
        'JavaScript - CodexPane/Automated testing - MVC/Mocha - MVC/2- TDD with Mocha.md',
        {
            status: 'Covered (merged)',
            target: 'src/content/javascript/testing-foundations.mdx',
            note: 'TDD loop and Mocha workflow consolidated under Testing Foundations.',
        },
    ],
    [
        'JavaScript - CodexPane/Automated testing - MVC/Mocha - MVC/3- Spies with Sinon.md',
        {
            status: 'Covered (merged)',
            target: 'src/content/javascript/testing-foundations.mdx',
            note: 'Sinon spies consolidated under Testing Foundations.',
        },
    ],
    [
        'JavaScript - CodexPane/HTTPS Requests - CodexPane/6- fetch() with await… async.md',
        {
            status: 'Covered (direct)',
            target: 'src/content/http/fetch-with-await-and-async.mdx',
            note: 'Mapped to dedicated HTTP section with normalized title.',
        },
    ],
    [
        'JavaScript - CodexPane/Libraries/Uuid.md',
        {
            status: 'Covered (merged)',
            target: 'src/content/javascript/libraries-and-runtime-utilities.mdx',
            note: 'UUID content consolidated with runtime utilities.',
        },
    ],
    [
        'JavaScript - CodexPane/Libraries/fs.md',
        {
            status: 'Covered (merged)',
            target: 'src/content/javascript/libraries-and-runtime-utilities.mdx',
            note: 'Node fs usage consolidated with runtime utilities.',
        },
    ],
    [
        'JavaScript - CodexPane/Modules/Browser runtime/Struttura corretta progetto con browser runtime.md',
        {
            status: 'Covered (merged)',
            target: 'src/content/node/core-global-modules.mdx',
            note: 'Browser/runtime structure absorbed in Node runtime modules guidance.',
        },
    ],
    [
        'React/Automated test/1- Automatic test with Jest and Enzyme.md',
        {
            status: 'Covered (merged)',
            target: 'src/content/react/react-testing-with-jest-and-enzyme.mdx',
            note: 'Automated testing note consolidated in dedicated React testing page.',
        },
    ],
]);

const rawFiles = walk(RAW_ROOT)
    .filter((file) => file.toLowerCase().endsWith('.md'))
    .sort((a, b) => a.localeCompare(b));

const mdxFiles = walk(CONTENT_ROOT)
    .filter((file) => file.toLowerCase().endsWith('.mdx'))
    .sort((a, b) => a.localeCompare(b));

const mdxBySlug = new Map();
for (const mdxFile of mdxFiles) {
    const slug = normalizeSlug(path.basename(mdxFile));
    const list = mdxBySlug.get(slug) || [];
    list.push(mdxFile);
    mdxBySlug.set(slug, list);
}

const allMdxSlugs = [...mdxBySlug.entries()].map(([slug, files]) => ({ slug, files }));

const rows = [];
const counts = {
    direct: 0,
    merged: 0,
    missing: 0,
};

for (const rawFile of rawFiles) {
    const rawRelative = toPosix(path.relative(RAW_ROOT, rawFile));
    const override = manualOverrides.get(rawRelative);
    if (override) {
        rows.push({
            raw: rawRelative,
            status: override.status,
            target: override.target,
            note: override.note,
        });
        if (override.status === 'Covered (direct)') counts.direct += 1;
        else if (override.status === 'Covered (merged)') counts.merged += 1;
        else counts.missing += 1;
        continue;
    }

    const slug = normalizeSlug(path.basename(rawFile));
    const preferredTopic = inferPreferredTopic(rawRelative);
    const exactMatches = mdxBySlug.get(slug) || [];
    const selectedExact = selectBestMatch(exactMatches, preferredTopic);

    if (selectedExact) {
        rows.push({
            raw: rawRelative,
            status: 'Covered (direct)',
            target: makeContentRelative(selectedExact),
            note: exactMatches.length > 1 ? 'Resolved by topic-aware match.' : 'Slug-equivalent section found.',
        });
        counts.direct += 1;
        continue;
    }

    const looseCandidates = allMdxSlugs
        .filter((item) => item.slug.includes(slug) || slug.includes(item.slug))
        .flatMap((item) => item.files);
    const selectedLoose = selectBestMatch(looseCandidates, preferredTopic);

    if (selectedLoose) {
        rows.push({
            raw: rawRelative,
            status: 'Covered (merged)',
            target: makeContentRelative(selectedLoose),
            note: 'Normalized or merged during editorial import.',
        });
        counts.merged += 1;
        continue;
    }

    rows.push({
        raw: rawRelative,
        status: 'Missing (to add)',
        target: '-',
        note: 'No equivalent content identified.',
    });
    counts.missing += 1;
}

const generatedAt = new Date().toISOString();
const reportLines = [
    '# Raw Content Import Coverage Report',
    '',
    `Generated: ${generatedAt}`,
    '',
    '## Summary',
    '',
    `- Total raw markdown files: ${rawFiles.length}`,
    `- Covered (direct): ${counts.direct}`,
    `- Covered (merged): ${counts.merged}`,
    `- Missing (to add): ${counts.missing}`,
    '',
    '## Mapping Matrix',
    '',
    '| Raw note | Status | Target MDX | Note |',
    '|---|---|---|---|',
];

for (const row of rows) {
    reportLines.push(`| \`${row.raw}\` | ${row.status} | \`${row.target}\` | ${row.note} |`);
}

fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
fs.writeFileSync(REPORT_PATH, `${reportLines.join('\n')}\n`, 'utf8');

console.log(`Wrote report: ${REPORT_PATH}`);
console.log(`Summary => direct=${counts.direct}, merged=${counts.merged}, missing=${counts.missing}`);
