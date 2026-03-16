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
- Search index is built in memory from `structure.json` metadata.
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

Each topic folder under `src/content/<topic>/` typically contains:

- `structure.json` for sidebar/search metadata
- `introduction.mdx`
- one or more `<section>.mdx`

Example:

```text
src/content/react/
  structure.json
  introduction.mdx
  hooks-usestate.mdx
  hooks-useeffect.mdx
```

### `structure.json` expectations

The app reads:

- `id`
- `title`
- `icon`
- `slug`
- `items[]` (sections)
- `items[].items[]` (subsections/anchors)

Keep `slug` values aligned with file names and route paths.

## Search Behavior

Search is client-side and powered by MiniSearch.

- Source: normalized docs metadata from `structure.json`
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
