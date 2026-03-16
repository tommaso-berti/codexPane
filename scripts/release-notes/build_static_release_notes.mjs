import fs from "fs";
import path from "path";
import { execSync } from "child_process";

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

function toReleaseType(value) {
    const v = `${value || ""}`.toLowerCase();
    if (v === "major" || v === "minor" || v === "patch") return v;
    return "patch";
}

function readJsonIfExists(filePath) {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function getRemoteReleaseUrl(tag) {
    try {
        const remote = execSync("git config --get remote.origin.url", { encoding: "utf8" }).trim();
        const match = remote.match(/github\.com[:/]+([^/]+)\/([^/.]+)(\.git)?$/);
        if (!match) return "";
        const owner = match[1];
        const repo = match[2];
        return `https://github.com/${owner}/${repo}/releases/tag/${tag}`;
    } catch {
        return "";
    }
}

function getCommitUrl(sha) {
    try {
        const remote = execSync("git config --get remote.origin.url", { encoding: "utf8" }).trim();
        const match = remote.match(/github\.com[:/]+([^/]+)\/([^/.]+)(\.git)?$/);
        if (!match) return "";
        const owner = match[1];
        const repo = match[2];
        return `https://github.com/${owner}/${repo}/commit/${sha}`;
    } catch {
        return "";
    }
}

function main() {
    const args = parseArgs(process.argv);
    const tag = `${args.tag || ""}`.trim();
    if (!tag) {
        throw new Error("Missing required argument: --tag");
    }

    const repoRoot = process.cwd();
    const markdownPath = path.join(repoRoot, "release-notes", `${tag}.md`);
    const payloadPath = path.join(repoRoot, "release-notes", `.payload-${tag}.json`);
    const outPath = path.join(repoRoot, "public", "data", "release-notes.json");

    if (!fs.existsSync(markdownPath)) {
        throw new Error(`Missing release notes markdown: ${markdownPath}`);
    }

    const markdown = fs.readFileSync(markdownPath, "utf8").trim();
    const payload = readJsonIfExists(payloadPath);
    const commits = Array.isArray(payload?.commits) ? payload.commits : [];

    const entries = commits.slice(0, 12).map((item) => ({
        sha: `${item.sha || ""}`,
        subject: `${item.subject || ""}`.trim(),
        url: getCommitUrl(item.sha || ""),
        author: `${item.author || ""}`.trim(),
        date: `${item.date || ""}`.trim(),
    }));

    const version = tag.replace(/^v/i, "");
    const previousTag = payload?.fromRef || null;
    const releaseType = toReleaseType(payload?.releaseType);
    const releaseUrl = getRemoteReleaseUrl(tag);
    const now = new Date().toISOString();

    const result = {
        generatedAt: now,
        latestTag: tag,
        latestVersion: version,
        previousTag,
        releaseType,
        entries,
        bodyMarkdown: markdown,
        releaseUrl,
        publishedAt: now,
        history: [
            {
                tag,
                version,
                previousTag,
                releaseType,
                entries,
                source: "local",
                bodyMarkdown: markdown,
                releaseUrl,
                publishedAt: now,
            },
        ],
    };

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
    console.log(`Wrote static release notes: ${outPath}`);
}

main();
