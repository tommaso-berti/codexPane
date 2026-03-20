import fs from 'node:fs';
import path from 'node:path';

const CONTENT_ROOT = path.resolve('src/content');
const PUBLIC_ROOT = path.resolve('public/content-images');

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function copyTopicImages(topicDirName) {
    const sourceDir = path.join(CONTENT_ROOT, topicDirName, 'images');
    if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
        return { topic: topicDirName, copied: 0 };
    }

    const targetDir = path.join(PUBLIC_ROOT, topicDirName);
    ensureDir(targetDir);

    let copied = 0;
    for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
        if (!entry.isFile()) continue;
        const sourcePath = path.join(sourceDir, entry.name);
        const targetPath = path.join(targetDir, entry.name);
        fs.copyFileSync(sourcePath, targetPath);
        copied += 1;
    }

    return { topic: topicDirName, copied };
}

function main() {
    ensureDir(PUBLIC_ROOT);

    const topics = fs
        .readdirSync(CONTENT_ROOT, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);

    let totalCopied = 0;
    let topicsWithImages = 0;

    for (const topic of topics) {
        const result = copyTopicImages(topic);
        if (result.copied > 0) {
            topicsWithImages += 1;
            totalCopied += result.copied;
        }
    }

    console.log(
        `Synced docs images: ${totalCopied} files across ${topicsWithImages} topics -> ${PUBLIC_ROOT}`
    );
}

main();
