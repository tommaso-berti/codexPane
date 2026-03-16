import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const SEMVER_TAG_REGEX = /^v(\d+)\.(\d+)\.(\d+)$/;
const MAX_RELEASE_ENTRIES = 12;

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
    const previousTag = tags[latestIndex + 1] ?? null;
    const releaseType = resolveReleaseType(latestTag, previousTag);

    const repoRoot = process.cwd();
    const repoUrl = getRepoUrl();
    const markdownPath = path.join(repoRoot, "release-notes", `${latestTag}.md`);
    const payloadPath = path.join(repoRoot, "release-notes", `.payload-${latestTag}.json`);
    const outputPath = path.join(repoRoot, "public", "data", "release-notes.json");

    const bodyMarkdown = readMarkdownIfExists(markdownPath);
    if (!bodyMarkdown) {
        throw new Error(`Missing release notes markdown: ${markdownPath}`);
    }

    const payload = readJsonIfExists(payloadPath);
    const entries = mapEntriesFromPayload(payload, repoUrl);
    const now = new Date().toISOString();

    const json = {
        generatedAt: now,
        latestTag,
        latestVersion: latestTag.replace(/^v/i, ""),
        previousTag,
        releaseType,
        entries,
        bodyMarkdown,
        releaseUrl: `${repoUrl}/releases/tag/${latestTag}`,
        publishedAt: now,
        history: [
            {
                tag: latestTag,
                version: latestTag.replace(/^v/i, ""),
                previousTag,
                releaseType,
                entries,
                source: "local",
                bodyMarkdown,
                releaseUrl: `${repoUrl}/releases/tag/${latestTag}`,
                publishedAt: now,
            },
        ],
    };

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, `${JSON.stringify(json, null, 2)}\n`, "utf8");
    console.log(`Wrote static release-notes payload: ${outputPath}`);
}

main();
