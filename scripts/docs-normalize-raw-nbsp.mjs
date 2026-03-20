import fs from 'node:fs';
import path from 'node:path';

const RAW_ROOT = path.resolve(process.cwd(), 'src/raw_content');

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, out);
      continue;
    }
    if (entry.isFile() && full.endsWith('.md')) {
      out.push(full);
    }
  }
  return out;
}

function toPosix(value) {
  return value.split(path.sep).join('/');
}

const files = walkFiles(RAW_ROOT);
let changedFiles = 0;
let totalReplaced = 0;
const report = [];

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const count = [...original].reduce((acc, ch) => acc + (ch.codePointAt(0) === 0x00a0 ? 1 : 0), 0);
  if (!count) continue;

  const normalized = original.replace(/\u00A0/g, ' ');
  fs.writeFileSync(file, normalized);

  changedFiles += 1;
  totalReplaced += count;
  report.push({ file: toPosix(file), replaced: count });
}

if (changedFiles === 0) {
  console.log('No NBSP found in src/raw_content/**/*.md');
  process.exit(0);
}

console.log(`Normalized NBSP in raw content files: ${changedFiles}`);
console.log(`Total replacements: ${totalReplaced}`);
for (const item of report) {
  console.log(`- ${item.file} (${item.replaced})`);
}
