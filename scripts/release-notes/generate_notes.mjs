import fs from "fs";
import path from "path";

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

function categorizeCommits(commits) {
  const categories = {
    features: [],
    fixes: [],
    refactor: [],
    breaking: [],
    misc: [],
  };

  for (const commit of commits) {
    const subject = `${commit.subject || ""}`.trim();
    const body = `${commit.body || ""}`;
    const lower = subject.toLowerCase();
    const hasBreaking = /breaking change|!:/.test(`${subject}\n${body}`.toLowerCase());

    if (hasBreaking) {
      categories.breaking.push(commit);
      continue;
    }
    if (lower.startsWith("feat")) {
      categories.features.push(commit);
      continue;
    }
    if (lower.startsWith("fix")) {
      categories.fixes.push(commit);
      continue;
    }
    if (lower.startsWith("refactor") || lower.startsWith("perf") || lower.startsWith("chore")) {
      categories.refactor.push(commit);
      continue;
    }
    categories.misc.push(commit);
  }

  return categories;
}

function formatCommitLine(commit) {
  const subject = commit.subject || "(no subject)";
  return `- ${subject} (${commit.shortSha})`;
}

function sectionFromCommits(commits, emptyLine) {
  if (!commits.length) return [emptyLine];
  return commits.map(formatCommitLine);
}

function buildFallbackMarkdown(payload, version) {
  const c = categorizeCommits(payload.commits || []);
  const releaseType = `${payload?.releaseType || "patch"}`.toLowerCase();
  const isPatchRelease = releaseType === "patch";
  const fixesForPatch = isPatchRelease ? [...c.fixes, ...c.features] : c.fixes;
  const featuresForPatch = isPatchRelease ? [] : c.features;
  const changedFilesPreview = (payload.changedFiles || []).slice(0, 20).map((f) => `- ${f}`);

  const it = [
    `# Release Notes ${version}`,
    "",
    "## Italiano",
    "### Panoramica",
    `- Rilascio generato da commit nel range \`${payload.range}\`.`,
    `- Commit inclusi: ${(payload.commits || []).length}. File modificati: ${(payload.changedFiles || []).length}.`,
    "",
    "### Novita",
    ...sectionFromCommits(featuresForPatch, "- Nessuna nuova funzionalita rilevata."),
    "",
    "### Correzioni",
    ...sectionFromCommits(fixesForPatch, "- Nessun bug fix rilevato."),
    "",
    "### Migliorie Tecniche",
    ...sectionFromCommits([...c.refactor, ...c.misc], "- Nessuna attivita di refactor/engineering rilevata."),
    "",
    "### Modifiche Incompatibili",
    ...sectionFromCommits(c.breaking, "- Nessuna breaking change rilevata."),
    "",
    "### Note di Migrazione",
    "- Nessuna migrazione richiesta in base ai commit disponibili.",
    "",
    "### Limiti Noti",
    "- Generazione in fallback senza sintesi AI: contenuto derivato direttamente dai commit.",
    "",
    "### Confronto e Intervallo Commit",
    `- Range: \`${payload.range}\``,
    `- Compare URL: ${payload.compareUrl || "N/A"}`,
    ...((changedFilesPreview.length > 0) ? ["- File principali:", ...changedFilesPreview] : ["- Nessun file cambiato rilevato."]),
    "",
    "## English",
    "### Overview",
    `- Release generated from commits in range \`${payload.range}\`.`,
    `- Included commits: ${(payload.commits || []).length}. Changed files: ${(payload.changedFiles || []).length}.`,
    "",
    "### New Features",
    ...sectionFromCommits(featuresForPatch, "- No new features detected."),
    "",
    "### Bug Fixes",
    ...sectionFromCommits(fixesForPatch, "- No bug fixes detected."),
    "",
    "### Refactor & Engineering",
    ...sectionFromCommits([...c.refactor, ...c.misc], "- No refactor/engineering activity detected."),
    "",
    "### Breaking Changes",
    ...sectionFromCommits(c.breaking, "- No breaking changes detected."),
    "",
    "### Migration Notes",
    "- No migration steps required based on available commits.",
    "",
    "### Known Limitations",
    "- Fallback mode without AI synthesis: content is directly derived from commits.",
    "",
    "### Diff & Commit Range",
    `- Range: \`${payload.range}\``,
    `- Compare URL: ${payload.compareUrl || "N/A"}`,
  ];

  return `${it.join("\n")}\n`;
}

function normalizeItalianSectionHeadings(text) {
  const source = `${text || ""}`;
  const itMarker = "## Italiano";
  const enMarker = "## English";

  const itStart = source.indexOf(itMarker);
  if (itStart === -1) return source;

  const afterIt = source.slice(itStart + itMarker.length);
  const enIndexInAfterIt = afterIt.indexOf(enMarker);
  const itBlock = enIndexInAfterIt === -1 ? afterIt : afterIt.slice(0, enIndexInAfterIt);
  const enTail = enIndexInAfterIt === -1 ? "" : afterIt.slice(enIndexInAfterIt);

  const normalizedItBlock = itBlock
    .replace(/^###\s+Overview$/gm, "### Panoramica")
    .replace(/^###\s+New Features$/gm, "### Novita")
    .replace(/^###\s+Nuove funzionalita$/gm, "### Novita")
    .replace(/^###\s+Bug Fixes$/gm, "### Correzioni")
    .replace(/^###\s+Correzioni Bug$/gm, "### Correzioni")
    .replace(/^###\s+Refactor\s*&\s*Engineering$/gm, "### Migliorie Tecniche")
    .replace(/^###\s+Refactor\s*&\s*Ingegneria$/gm, "### Migliorie Tecniche")
    .replace(/^###\s+Breaking Changes$/gm, "### Modifiche Incompatibili")
    .replace(/^###\s+Modifiche Breaking$/gm, "### Modifiche Incompatibili")
    .replace(/^###\s+Migration Notes$/gm, "### Note di Migrazione")
    .replace(/^###\s+Known Limitations$/gm, "### Limiti Noti")
    .replace(/^###\s+Limitazioni Note$/gm, "### Limiti Noti")
    .replace(/^###\s+Diff\s*&\s*Commit Range$/gm, "### Confronto e Intervallo Commit")
    .replace(/^###\s+Differenze\s*&\s*Intervallo Commit$/gm, "### Confronto e Intervallo Commit");

  return `${source.slice(0, itStart + itMarker.length)}${normalizedItBlock}${enTail}`;
}

function extractResponseText(json) {
  if (typeof json?.output_text === "string" && json.output_text.trim()) return json.output_text;
  if (!Array.isArray(json?.output)) return "";

  const parts = [];
  for (const item of json.output) {
    const content = Array.isArray(item?.content) ? item.content : [];
    for (const c of content) {
      if (c?.type === "output_text" && typeof c?.text === "string") parts.push(c.text);
    }
  }
  return parts.join("\n").trim();
}

function hasMinimumSections(text) {
  const hasIt = text.includes("## Italiano");
  const hasEn = text.includes("## English");
  const hasItFeatures = text.includes("### Novita") || text.includes("### Nuove funzionalita");
  const hasItFixes = text.includes("### Correzioni") || text.includes("### Correzioni Bug") || text.includes("### Bug Fixes");
  const hasItRefactor =
    text.includes("### Migliorie Tecniche") ||
    text.includes("### Refactor & Ingegneria") ||
    text.includes("### Refactor & Engineering");
  const hasItDiff =
    text.includes("### Confronto e Intervallo Commit") ||
    text.includes("### Differenze & Intervallo Commit") ||
    text.includes("### Diff & Commit Range");
  const hasEnFeatures = text.includes("### New Features");
  const hasEnFixes = text.includes("### Bug Fixes");

  return hasIt && hasEn && hasItFeatures && hasItFixes && hasItRefactor && hasItDiff && hasEnFeatures && hasEnFixes;
}

async function generateWithOpenAI({ model, apiKey, prompt }) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: prompt,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  return extractResponseText(data);
}

async function main() {
  const args = parseArgs(process.argv);

  const payloadPath = args.payload;
  const outPath = args.out;
  const templatePath = args.template;
  const version = args.version || "v0.0.0";

  if (!payloadPath || !outPath || !templatePath) {
    throw new Error("Missing required args: --payload --out --template");
  }

  const payload = JSON.parse(fs.readFileSync(payloadPath, "utf8"));
  const template = fs.readFileSync(templatePath, "utf8");

  const prompt = template
    .replace("{{VERSION}}", version)
    .replace("{{PAYLOAD_JSON}}", JSON.stringify(payload, null, 2));

  let markdown = "";
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.RELEASE_NOTES_MODEL || "gpt-5-mini";

  if (apiKey) {
    try {
      markdown = await generateWithOpenAI({ model, apiKey, prompt });
      markdown = normalizeItalianSectionHeadings(markdown);
      if (!hasMinimumSections(markdown)) {
        throw new Error("Generated output does not include required sections.");
      }
    } catch (error) {
      console.error(`[release-notes] AI generation failed: ${error.message}`);
      markdown = buildFallbackMarkdown(payload, version);
    }
  } else {
    console.warn("[release-notes] OPENAI_API_KEY not found. Using fallback generator.");
    markdown = buildFallbackMarkdown(payload, version);
  }

  const outDir = path.dirname(outPath);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, `${markdown.trim()}\n`, "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
