#!/usr/bin/env bash
set -euo pipefail

REPO_PATH=""
TAG=""
FROM_REF=""
TO_REF=""
OUT_FILE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --repo) REPO_PATH="${2:-}"; shift 2 ;;
    --tag) TAG="${2:-}"; shift 2 ;;
    --from) FROM_REF="${2:-}"; shift 2 ;;
    --to) TO_REF="${2:-}"; shift 2 ;;
    --out) OUT_FILE="${2:-}"; shift 2 ;;
    *) echo "Unknown arg: $1" >&2; exit 1 ;;
  esac
done

if [[ -z "$REPO_PATH" || -z "$OUT_FILE" ]]; then
  echo "Usage: collect_changes.sh --repo <path> --tag <vX.Y.Z> [--from ref] [--to ref] --out <file>" >&2
  exit 1
fi

cd "$REPO_PATH"

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "Not a git repository: $REPO_PATH" >&2
  exit 1
fi

if [[ -z "$TO_REF" ]]; then
  if [[ -n "$TAG" ]] && git rev-parse "$TAG" >/dev/null 2>&1; then
    TO_REF="$TAG"
  else
    TO_REF="HEAD"
  fi
fi

if [[ -z "$FROM_REF" ]]; then
  FROM_REF="$(git describe --tags --abbrev=0 "${TO_REF}^" 2>/dev/null || true)"
fi

if [[ -z "$FROM_REF" ]]; then
  FROM_REF="$(git rev-list --max-parents=0 "$TO_REF" | tail -n 1)"
fi

RANGE="${FROM_REF}..${TO_REF}"

TMP_COMMITS="$(mktemp)"
TMP_FILES="$(mktemp)"

trap 'rm -f "$TMP_COMMITS" "$TMP_FILES"' EXIT

git log "$RANGE" --date=iso-strict --pretty=format:'%H%x1f%s%x1f%b%x1f%an%x1f%ad' > "$TMP_COMMITS" || true
git diff --name-only "$FROM_REF" "$TO_REF" > "$TMP_FILES" || true

REMOTE_URL="$(git config --get remote.origin.url || true)"
COMPARE_URL=""

if [[ "$REMOTE_URL" =~ github.com[:/]+([^/]+)/([^/.]+)(\.git)?$ ]]; then
  OWNER="${BASH_REMATCH[1]}"
  REPO="${BASH_REMATCH[2]}"
  COMPARE_URL="https://github.com/${OWNER}/${REPO}/compare/${FROM_REF}...${TO_REF}"
fi

node --input-type=module - "$TMP_COMMITS" "$TMP_FILES" "$OUT_FILE" "$FROM_REF" "$TO_REF" "$RANGE" "$TAG" "$COMPARE_URL" "$REPO_PATH" <<'NODE'
import fs from "fs";

const [commitsPath, filesPath, outPath, fromRef, toRef, range, tag, compareUrl, repoPath] = process.argv.slice(2);

const SEMVER_RE = /^v?(\d+)\.(\d+)\.(\d+)$/;
function parseSemver(value) {
  const match = `${value || ""}`.trim().match(SEMVER_RE);
  if (!match) return null;
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

function resolveReleaseType(versionRef, previousRef) {
  const current = parseSemver(versionRef);
  const previous = parseSemver(previousRef);
  if (!current || !previous) return "patch";
  if (current.major !== previous.major) return "major";
  if (current.minor !== previous.minor) return "minor";
  return "patch";
}

const commitsRaw = fs.readFileSync(commitsPath, "utf8").trim();
const filesRaw = fs.readFileSync(filesPath, "utf8").trim();

const commits = commitsRaw
  ? commitsRaw.split("\n").map((line) => {
      const [sha, subject, body, author, date] = line.split("\u001f");
      return {
        sha: sha || "",
        shortSha: (sha || "").slice(0, 7),
        subject: (subject || "").trim(),
        body: (body || "").trim(),
        author: (author || "").trim(),
        date: (date || "").trim(),
      };
    })
  : [];

const changedFiles = filesRaw ? filesRaw.split("\n").filter(Boolean) : [];
const currentVersionRef = tag || toRef;
const releaseType = resolveReleaseType(currentVersionRef, fromRef);

const payload = {
  generatedAt: new Date().toISOString(),
  repositoryPath: repoPath,
  version: currentVersionRef,
  releaseType,
  fromRef,
  toRef,
  range,
  compareUrl,
  commits,
  changedFiles,
};

fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
NODE

echo "Payload written: $OUT_FILE"
