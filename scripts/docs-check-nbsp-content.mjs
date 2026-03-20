import fs from 'node:fs';
import path from 'node:path';

const CONTENT_ROOT = path.resolve(process.cwd(), 'src/content');

function walkFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, out);
      continue;
    }
    if (entry.isFile() && full.endsWith('.mdx')) {
      out.push(full);
    }
  }
  return out;
}

function toPosix(value) {
  return value.split(path.sep).join('/');
}

let total = 0;
const hits = [];

for (const file of walkFiles(CONTENT_ROOT)) {
  const content = fs.readFileSync(file, 'utf8');
  const count = [...content].reduce((acc, ch) => acc + (ch.codePointAt(0) === 0x00a0 ? 1 : 0), 0);
  if (count > 0) {
    total += count;
    hits.push({ file: toPosix(file), count });
  }
}

if (hits.length > 0) {
  console.error('Found NBSP (U+00A0) in MDX content files:');
  for (const hit of hits) {
    console.error(`- ${hit.file} (${hit.count})`);
  }
  console.error(`Total NBSP found: ${total}`);
  process.exit(1);
}

console.log('NBSP check passed: no U+00A0 found in src/content/**/*.mdx');
