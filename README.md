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

This is a static SPA. Typical workflow:

```bash
npm run build
```

Deploy the `dist/` folder to any static host (GitHub Pages, Netlify, Vercel static output, Nginx, etc.).

Important for SPA hosting: configure fallback rewrites so unknown paths serve `index.html`.

## Known Limitations

- Initial build still includes many interactive MDX demo modules from `src/content/**`.
- Search index currently uses metadata only (not full MDX body text).
- No SSR/SSG; all rendering is client-side.

## Versioning and Release Notes

- App version is read from [`VERSION`](./VERSION)
- Release notes are sourced from [`CHANGELOG.md`](./CHANGELOG.md)
- Footer exposes a modal with notes for the current version
