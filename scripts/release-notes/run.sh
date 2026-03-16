#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  scripts/release-notes/run.sh --tag vX.Y.Z [--from <git-ref>] [--to <git-ref>] [--repo <path>]

Environment:
  OPENAI_API_KEY      Required for AI-generated notes. If missing, fallback notes are produced.
  RELEASE_NOTES_MODEL Optional, defaults to gpt-5-mini
EOF
}

TAG=""
FROM_REF=""
TO_REF=""
REPO_PATH="$(pwd)"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --tag)
      TAG="${2:-}"
      shift 2
      ;;
    --from)
      FROM_REF="${2:-}"
      shift 2
      ;;
    --to)
      TO_REF="${2:-}"
      shift 2
      ;;
    --repo)
      REPO_PATH="${2:-}"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "$TAG" ]]; then
  echo "Missing required argument: --tag" >&2
  usage
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COLLECT_SCRIPT="${SCRIPT_DIR}/collect_changes.sh"
GENERATE_SCRIPT="${SCRIPT_DIR}/generate_notes.mjs"
PROMPT_TEMPLATE="${SCRIPT_DIR}/release_notes_prompt.md"

if [[ ! -x "$COLLECT_SCRIPT" ]]; then
  echo "Missing executable: $COLLECT_SCRIPT" >&2
  exit 1
fi

if [[ ! -f "$GENERATE_SCRIPT" ]]; then
  echo "Missing file: $GENERATE_SCRIPT" >&2
  exit 1
fi

if [[ ! -f "$PROMPT_TEMPLATE" ]]; then
  echo "Missing file: $PROMPT_TEMPLATE" >&2
  exit 1
fi

mkdir -p "${REPO_PATH}/release-notes"
PAYLOAD_FILE="${REPO_PATH}/release-notes/.payload-${TAG}.json"
OUTPUT_FILE="${REPO_PATH}/release-notes/${TAG}.md"

collect_args=(
  --repo "$REPO_PATH"
  --tag "$TAG"
  --out "$PAYLOAD_FILE"
)
if [[ -n "$FROM_REF" ]]; then
  collect_args+=(--from "$FROM_REF")
fi
if [[ -n "$TO_REF" ]]; then
  collect_args+=(--to "$TO_REF")
fi

"$COLLECT_SCRIPT" "${collect_args[@]}"

node "$GENERATE_SCRIPT" \
  --repo "$REPO_PATH" \
  --payload "$PAYLOAD_FILE" \
  --template "$PROMPT_TEMPLATE" \
  --version "$TAG" \
  --out "$OUTPUT_FILE"

if [[ ! -f "$OUTPUT_FILE" ]]; then
  echo "Release notes file was not generated: $OUTPUT_FILE" >&2
  exit 1
fi

echo "Release notes generated: $OUTPUT_FILE"
