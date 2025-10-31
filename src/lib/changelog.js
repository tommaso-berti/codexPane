import rawChangelog from '../../CHANGELOG.md?raw';

function escapeRegExp(str) {
    return str.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function extractNotesFor(version) {
    const v = version.replace(/^v/i, '');
    const vEscaped = escapeRegExp(v);

    const pattern = new RegExp(
        String.raw`^##\s*\[?v?${vEscaped}\]?(?:\s*-\s*[0-9]{4}-[0-9]{2}-[0-9]{2})?\s*\r?\n` +
        String.raw`([\s\S]*?)(?=^##\s|\Z)`,
        'm'
    );

    const match = rawChangelog.match(pattern);
    return match ? match[1].trim() : null;
}
