import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const SEMVER_TAG_REGEX = /^v(\d+)\.(\d+)\.(\d+)$/;
const MAX_RELEASE_ENTRIES = 12;
const MAX_RELEASE_HISTORY = 10;

function parseArgs(argv) {
    const args = {};
    for (let i = 2; i < argv.length; i += 1) {
        const key = argv[i];
        if (!key.startsWith("--")) continue;
        args[key.slice(2)] = argv[i + 1];
        i += 1;
    }
    return args;
}

function parseSemver(tagName) {
    const match = `${tagName ?? ""}`.trim().match(SEMVER_TAG_REGEX);
    if (!match) return null;
    return {
        tag: match[0],
        major: Number(match[1]),
        minor: Number(match[2]),
        patch: Number(match[3]),
    };
}

function compareSemverDesc(a, b) {
    if (a.major !== b.major) return b.major - a.major;
    if (a.minor !== b.minor) return b.minor - a.minor;
    return b.patch - a.patch;
}

function resolveReleaseType(currentTag, previousTag) {
    const current = parseSemver(currentTag);
    const previous = parseSemver(previousTag);
    if (!current || !previous) return "patch";
    if (current.major !== previous.major) return "major";
    if (current.minor !== previous.minor) return "minor";
    return "patch";
}

function listSemverTagsDesc() {
    const output = execSync("git tag -l 'v[0-9]*.[0-9]*.[0-9]*' --sort=-v:refname", { encoding: "utf8" }).trim();
    if (!output) return [];
    return output.split("\n").map((line) => line.trim()).filter(Boolean);
}

function getRepoUrl() {
    const remote = execSync("git config --get remote.origin.url", { encoding: "utf8" }).trim();
    const match = remote.match(/github\.com[:/]+([^/]+)\/([^/.]+)(\.git)?$/);
    if (!match) return "";
    return `https://github.com/${match[1]}/${match[2]}`;
}

function readJsonIfExists(filePath) {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readMarkdownIfExists(filePath) {
    if (!fs.existsSync(filePath)) return "";
    return fs.readFileSync(filePath, "utf8").trim();
}

function mapEntriesFromPayload(payload, repoUrl) {
    const commits = Array.isArray(payload?.commits) ? payload.commits : [];
    return commits.slice(0, MAX_RELEASE_ENTRIES).map((item) => ({
        sha: `${item.sha || ""}`,
        subject: `${item.subject || ""}`.trim(),
        url: item.sha ? `${repoUrl}/commit/${item.sha}` : "",
        author: `${item.author || ""}`.trim(),
        date: `${item.date || ""}`.trim(),
    }));
}

function resolvePublishedAt(markdownPath, fallback) {
    try {
        const stat = fs.statSync(markdownPath);
        return stat.mtime.toISOString();
    } catch {
        return fallback;
    }
}

function buildHistoryItem({ tag, tags, repoRoot, repoUrl, fallbackPublishedAt }) {
    const tagIndex = tags.findIndex((candidate) => candidate === tag);
    const previousTag = tagIndex === -1 ? null : (tags[tagIndex + 1] ?? null);
    const releaseType = resolveReleaseType(tag, previousTag);

    const markdownPath = path.join(repoRoot, "release-notes", `${tag}.md`);
    const payloadPath = path.join(repoRoot, "release-notes", `.payload-${tag}.json`);
    const bodyMarkdown = readMarkdownIfExists(markdownPath);
    if (!bodyMarkdown) return null;

    const payload = readJsonIfExists(payloadPath);
    const entries = mapEntriesFromPayload(payload, repoUrl);
    const publishedAt = resolvePublishedAt(markdownPath, fallbackPublishedAt);

    return {
        tag,
        version: tag.replace(/^v/i, ""),
        previousTag,
        releaseType,
        entries,
        source: payload ? "local" : "markdown",
        bodyMarkdown,
        releaseUrl: `${repoUrl}/releases/tag/${tag}`,
        publishedAt,
    };
}

function main() {
    const args = parseArgs(process.argv);
    const forcedTag = `${args.tag || ""}`.trim();

    const tags = listSemverTagsDesc();
    if (tags.length === 0) {
        throw new Error("No SemVer tags found. Cannot generate static release-notes payload.");
    }

    const latestTag = forcedTag || tags[0];
    const latestIndex = tags.findIndex((tag) => tag === latestTag);
    if (latestIndex === -1) {
        throw new Error(`Tag not found in repository: ${latestTag}`);
    }
    const repoRoot = process.cwd();
    const repoUrl = getRepoUrl();
    const outputPath = path.join(repoRoot, "public", "data", "release-notes.json");

    const now = new Date().toISOString();
    const historyTags = tags.slice(latestIndex, latestIndex + MAX_RELEASE_HISTORY);
    const history = historyTags
        .map((tag) => buildHistoryItem({ tag, tags, repoRoot, repoUrl, fallbackPublishedAt: now }))
        .filter(Boolean);

    if (history.length === 0) {
        throw new Error("No release notes markdown files found for selected tag history.");
    }

    const latest = history[0];

    const json = {
        generatedAt: now,
        latestTag: latest.tag,
        latestVersion: latest.version,
        previousTag: latest.previousTag,
        releaseType: latest.releaseType,
        entries: latest.entries,
        bodyMarkdown: latest.bodyMarkdown,
        releaseUrl: latest.releaseUrl,
        publishedAt: latest.publishedAt || now,
        history,
    };

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, `${JSON.stringify(json, null, 2)}\n`, "utf8");
    console.log(`Wrote static release-notes payload: ${outputPath}`);
}

main();
