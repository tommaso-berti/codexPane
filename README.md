# CodexPane

CodexPane is a static documentation web app built as a React SPA.

It renders MDX content from the repository, has client-side navigation and search, and does not use any database.

## Stack

- React 19
- Vite (rolldown-vite)
- React Router
- Redux Toolkit + React Redux (theme state)
- Material UI + Tailwind CSS v4
- MDX (`@mdx-js/rollup`, `@mdx-js/react`)
- MiniSearch (in-memory search index)

## Core Principles

- Content is file-based (`src/content/**`) and versioned in Git.
- Routes are slug-based and resolved entirely on the client.
- Docs navigation/search metadata is generated from MDX files into a single manifest.
- No backend and no persistence beyond browser storage for UI preferences.

## Project Structure

```text
.
├── src/
│   ├── components/            # app shell + navigation + MDX render components
│   ├── content/               # documentation topics (mdx + structure.json)
│   ├── contexts/              # DocsContext (topic/section metadata)
│   ├── features/
│   │   ├── docs/              # shared lazy MDX loader hooks
│   │   └── search/            # search modal + index hook
│   ├── store/                 # Redux store and slices
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .github/workflows/         # deploy + manual release notes workflows
├── scripts/release-notes/     # release notes generation pipeline
├── release-notes/             # versioned release notes files (vX.Y.Z.md)
├── .release-notes.config.json # release notes metadata/config
├── CHANGELOG.md
├── VERSION
├── vite.config.js
└── package.json
```

## Scripts

```bash
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview production build
npm run lint     # eslint
```

## Local Development

```bash
npm install
npm run dev
```

By default Vite runs on `http://localhost:5173`.

## Routing Model

The app uses these route patterns:

- `/` -> home
- `/:docs` -> topic introduction (`src/content/<docs>/introduction.mdx`)
- `/:docs/:section` -> section page (`src/content/<docs>/<section>.mdx`)

Unknown routes are redirected to `/`.

## Content Authoring

Each topic folder under `src/content/<topic>/` contains:
- `introduction.mdx`
- one or more top-level `<section>.mdx`
- optional local `components/` folder for embedded playground components

Example:

```text
src/content/react/
  introduction.mdx
  hooks-usestate.mdx
  hooks-useeffect.mdx
```

### Authoring contract

- Add a new section by adding a top-level `*.mdx` file in the topic folder.
- Section route/id comes from the filename.
- Subsections are inferred from `##` headings in the section file.
- No manual sidebar/search sync file is required.
- Optional frontmatter overrides:
  - `title`
  - `order`
  - `icon` (topic introduction only)

### Manifest workflow

- Build/update manifest:
  - `npm run docs:build-manifest`
- Validate manifest is up to date (used in lint/CI):
  - `npm run docs:validate`

Generated file:
- `src/content/docs-manifest.generated.json`

### Add docs in 60 seconds

1. Create a new section file in a topic folder, for example:
   - `src/content/react/state-management.mdx`
2. Add the page title as first heading (`#`), then your subsections as `##`:
   - `# State management`
   - `## Local component state`
   - `## Shared state`
3. Build the manifest:
   - `npm run docs:build-manifest`
4. Run and verify:
   - `npm run dev`
   - open `/react/state-management`
   - check sidebar + search show the new section/subsections

Example file:

```md
# State management

Short intro text.

## Local component state

Use `useState` for local UI concerns.

## Shared state

Lift state up or use a store when multiple branches need the same data.
```

Optional frontmatter overrides:

```md
---
title: State management in React
order: 6
---
```

## Search Behavior

Search is client-side and powered by MiniSearch.

- Source: generated docs manifest (`src/content/docs-manifest.generated.json`)
- Indexed fields: titles (section/subsection)
- Query options: prefix + fuzzy match
- Result behavior: clicking a result navigates to the matching page/anchor

## Theme and UI State

Theme preference is managed in Redux and persisted to `localStorage` key `mui-mode`.

Supported modes:

- Light
- Dark
- System (resolved from `prefers-color-scheme`)

## Build and Deployment

This is a static SPA. Local production build:

```bash
npm run build
```

Production deploy is handled by GitHub Actions with a versioned release layout on VPS:
- Target domain: `www.codexpane.tommasoberti.com`
- Remote structure:
  - `/srv/www/www.codexpane.tommasoberti.com/releases/vX.Y.Z`
  - `/srv/www/www.codexpane.tommasoberti.com/current` (symlink to active release)
- Workflow file: `.github/workflows/deploy.yml`

### CI/CD Deploy Logic (same procedure as portfolio)

Triggers:
- `push` on `main`
- `push` on tags `v*`
- `pull_request` `closed` on `main`
- manual `workflow_dispatch`

Version bump policy from commit/PR text:
- `#major` or `[major]` -> major bump
- `#minor` or `[minor]` -> minor bump
- `#patch` or `[patch]` -> patch bump
- `#skip-deploy` or `[skip-deploy]` -> skip deploy steps

Behavior:
1. Resolve release version/tag.
2. Build app and upload `dist/` to `/releases/vX.Y.Z`.
3. Update `current` symlink.
4. Prune old releases (keep last 5).
5. Generate `release-notes/vX.Y.Z.md`.
6. Publish GitHub Release body from that file.
7. Commit release notes artifact to `main` (`docs(release): vX.Y.Z artifacts #skip-deploy [skip ci]`).

### Release Notes Pipeline

Data structure and procedure are aligned with `tommaso-berti-portfolio`.

Files:
- `.release-notes.config.json`
- `scripts/release-notes/collect_changes.sh`
- `scripts/release-notes/generate_notes.mjs`
- `scripts/release-notes/release_notes_prompt.md`
- `scripts/release-notes/run.sh`
- `scripts/static-data/refresh-static-data.mjs`
- `release-notes/vX.Y.Z.md`
- `public/data/release-notes.json`

Manual workflow:
- `.github/workflows/release-notes.yml` (`workflow_dispatch`)
- Inputs: `tag`, optional `from`, optional `to`
- Output: `release-notes/<tag>.md` and GitHub Release body update

Static data workflow:
- `.github/workflows/refresh-static-data.yml` (`workflow_dispatch`)
- Optional input: `tag`
- Output: `public/data/release-notes.json` for frontend modal consumption

Local generation:

```bash
scripts/release-notes/run.sh --tag v1.2.3
scripts/release-notes/run.sh --tag v1.2.3 --from v1.2.2 --to HEAD
npm run data:refresh -- --tag v1.2.3
```

Notes:
- If `OPENAI_API_KEY` is available, notes are AI-generated (`RELEASE_NOTES_MODEL`, default `gpt-5-mini`).
- Without API key, generator falls back to deterministic commit-based notes.

## Known Limitations

- Initial build still includes many interactive MDX demo modules from `src/content/**`.
- Search index currently uses metadata only (not full MDX body text).
- No SSR/SSG; all rendering is client-side.

## Versioning and Release Notes

- App version is read from [`VERSION`](./VERSION)
- CI/CD release notes artifacts are generated in [`release-notes/`](./release-notes)
- In-app modal currently reads notes from [`CHANGELOG.md`](./CHANGELOG.md)
- Footer exposes a modal with notes for the current version
