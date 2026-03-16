You are generating release notes from verified git metadata.

Constraints:
- Use only the provided data (commits, files, compare URL, range).
- No hallucinations, no guessed features.
- Output in Markdown.
- Include BOTH Italian and English sections.
- Keep bullets concise and concrete.
- Use `payload.releaseType` as release-type source of truth.
- If `payload.releaseType` is `patch`:
  - `### Nuove funzionalita` and `### New Features` must explicitly state no new features.
  - Do not list `feat:` commits under features; place concrete changes under `Bug Fixes` or `Refactor & Engineering`.

Required section order (IT first, then EN):

# Release Notes {{VERSION}}

## Italiano
### Panoramica
### Novita
### Correzioni
### Migliorie Tecniche
### Modifiche Incompatibili
### Note di Migrazione
### Limiti Noti
### Confronto e Intervallo Commit

## English
### Overview
### New Features
### Bug Fixes
### Refactor & Engineering
### Breaking Changes
### Migration Notes
### Known Limitations
### Diff & Commit Range

Input payload JSON:
{{PAYLOAD_JSON}}
