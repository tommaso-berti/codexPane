# CodexPane

A modern, fast **React + Vite** documentation app for your personal cheatsheets (Linux, Git, React, hosting, console commands, etc.).
Content lives in **MDX** files (Markdown + React components). UI is styled with **Tailwind CSS**, with **Material UI** components where it’s convenient (dialogs, tabs, tables). **Redux Toolkit** handles UI state (theme, search query, sidebar).

---

## Features

* **MDX-first content**: write docs in Markdown, drop in React components when needed.
* **Sidebar + content layout**: “Tesla-style” docs (left nav, right doc).
* **Blazing-fast dev** with **Vite**.
* **Material UI + Tailwind** together: MUI for complex components, Tailwind for layout/spacing.
* **Client-side search** (optional) with FlexSearch.
* **Dark mode** and preferences persisted to `localStorage`.
* **Zero database**: all static, versioned in Git, deploy anywhere.

---

## Tech Stack

| Technology / Type | NPM package (example) | Purpose | Where used (file / folder)                                      |
|---|---:|---|-----------------------------------------------------------------|
| Language | JavaScript | App development with React | `src/`                                                          |
| UI framework | React / ReactDOM | UI library and rendering | `src/main.jsx`, `src/App.jsx`, `src/components/`                |
| Bundler / dev server | Vite (`vite`) | Build and dev server | `vite.config.js`, project root                                  |
| Vite React plugin | `@vitejs/plugin-react` | JSX support / fast refresh | `vite.config.js`                                                |
| Tailwind integration | `@tailwindcss/vite` or `tailwindcss` | Tailwind + Vite integration / utility CSS | `vite.config.js`, `src/index.css`, classes in `src/components/` |
| MDX / markdown (build) | `@mdx-js/rollup` | Load `.mdx` as components at build time | `vite.config.js`, `content/*.mdx`                               |
| MDX runtime | `@mdx-js/react` | Runtime provider / MDX component rendering (`MDXProvider`) | `src/components/TopicPage.jsx`, components that render MDX      |
| Remark plugin | `remark-gfm` | GitHub Flavored Markdown support | `vite.config.js`                                                |
| Rehype plugin | `rehype-slug` | Generate slugs for anchors in MDX | `vite.config.js`                                                |
| Routing | `react-router-dom` | Client-side routing | `src/App.jsx`, `src/components/*`                               |
| UI components | `@mui/material` | Material UI components (Breadcrumbs, Typography, Link, List...) | `src/components/Breadcrumb.jsx`, other components               |
| MUI icons | `@mui/icons-material` | Icons (e.g. `NavigateNextIcon`) | `src/components/Breadcrumb.jsx`                                 |
| State management | `@reduxjs/toolkit`, `react-redux` (likely) | Global state / slices | `store/store.js`, `store/sectMenuListSlice.js`                  |
| GitHub-style Markdown CSS | `github-markdown-css` | GitHub-like Markdown styles for rendered MDX content | `src/components/SectPage.jsx`, `src/styles/github-markdown.css` |
| Linting | ESLint | Code quality rules | `eslint.config.js`                                              |
| Package manager / runtime | Node.js / npm | Run scripts, manage deps | `package.json`                                                  |
| Content / docs | MDX / Markdown | Documentation and lesson content | `content/*.mdx`, `content/*/structure.json`                     |

> **Why no DB?** The content is static and versionable. Git gives you history, diffs, and easy backups. Keep it simple.

---

## Project Structure

```
/src
  /assets
  /components
    Header.jsx
    Sidebar.jsx
    TopicPage.jsx
  /content
    react/
      useState.mdx
      useEffect.mdx
    linux/
      grep.mdx
      chmod.mdx
  /redux
    uiSlice.js
    store.js
  /routes
    Home.jsx
    Docs.jsx
  App.jsx
  main.jsx
tailwind.config.js
vite.config.ts
```

---

## Development

### 1) Create project & install deps

```bash
# React + TypeScript + Vite
npm create vite@latest my-cheatsheet -- --template react-ts
cd my-cheatsheet

# Tailwind CSS
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# MDX
npm i @mdx-js/react

# Router, Redux, MUI and helpers
npm i react-router-dom @reduxjs/toolkit react-redux
npm i @mui/material @emotion/react @emotion/styled
npm i rehype-prism-plus
# optional search
npm i flexsearch
```

**`tailwind.config.js`** (basic)

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,md,mdx}"],
  theme: { extend: {} },
  // If you prefer MUI CssBaseline, you can disable preflight:
  // corePlugins: { preflight: false },
  plugins: [require('@tailwindcss/typography')],
};
```

**`src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* prose helpers for MDX docs */
.prose pre { overflow: auto; }
```

### 2) Using MDX in Vite

You can import `.mdx` and render via `@mdx-js/react`:

````tsx
// src/content/linux/grep.mdx
export const meta = {
  title: "grep — search text",
  section: "Linux",
  tags: ["cli", "search"],
  slug: "linux/grep",
  order: 10,
  summary: "Quick grep usage: recursion, regex, exclusions."
};

## Basics
```bash
grep "pattern" file.txt
````

## Recursive search

```bash
grep -R "TODO" .
```

````

```tsx
// src/components/TopicPage.tsx
import { MDXProvider } from "@mdx-js/react";

export default function TopicPage({ children }: { children: React.ReactNode }) {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <MDXProvider>{children}</MDXProvider>
    </article>
  );
}
````

### 3) Router & Pages (example)

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Docs from "./routes/Docs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/docs/*" element={<Docs/>} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Material UI + Tailwind: how to combine

* **Use MUI** for complex interactive components (Drawer, Tabs, Dialog, DataGrid).
* **Use Tailwind** for layout/spacing/typography (`grid`, `flex`, `gap`, `p-*`, responsive utilities).
* You can style MUI with Tailwind via `className` for outer layout and use `sx` for internal component overrides.
* If you keep **MUI `CssBaseline`**, consider disabling Tailwind **preflight** (`corePlugins: { preflight: false }`) to avoid double resets. Otherwise, use Tailwind’s preflight and skip `CssBaseline`.
* **Dark mode**: pick one source of truth (e.g., Tailwind `class` + sync a MUI theme with `palette.mode`).

Example:

```tsx
import { ThemeProvider, createTheme, Button, Box } from "@mui/material";

const theme = createTheme({ palette: { mode: "light" }});

export function Panel() {
  return (
    <ThemeProvider theme={theme}>
      <div className="p-6 grid gap-4">
        <Box className="rounded-xl border p-4">
          <h2 className="text-lg font-semibold">Title</h2>
          <p className="text-sm opacity-80">Body…</p>
        </Box>
        <Button variant="contained" className="rounded-xl !px-6" sx={{ textTransform: "none" }}>
          Save
        </Button>
      </div>
    </ThemeProvider>
  );
}
```

---

## Content Authoring Flow (with AI)

1. Take notes on your Mac.
2. Send them to your **personal AI** to convert into **MDX with frontmatter/meta** (`title`, `section`, `tags`, `slug`, `order`, `summary`).
3. Save under `/src/content/<section>/<slug>.mdx`.
4. The app renders the MDX; the sidebar is generated from `meta`.

Prompt template (example):

```
Transform these notes into an MDX page for my personal docs.
- Add frontmatter-like `export const meta = { ... }` with: title, section, tags, slug, order, summary.
- Keep code blocks with language hints.
- Use compact H2/H3 headings.
- No fluff.

NOTES:
---
<paste here>
```

---

## Scripts

```bash
npm run dev       # start Vite dev server
npm run build     # production build (static assets)
npm run preview   # preview the production build
```

---

## Optional Enhancements

* **Search**: build a small FlexSearch index at build time from MDX meta + text (store JSON, query on client).
* **Code highlighting**: `rehype-prism-plus` pipeline for MDX.
* **Animations**: `framer-motion`.
* **Icons**: `lucide-react` or `@mui/icons-material`.
* **Content lints**: Prettier/ESLint for MDX/TS.

---

## Roadmap / Future

* **RAG Assistant**: keep MDX as the single source of truth; generate embeddings per section/chunk and run a local or serverless retrieval pipeline for Q&A on your docs.
* **Next.js Migration** (optional): when you want SSG/SSR and file-based routing, migrate to **Next.js + MDX + Contentlayer**. Your MDX stays the same; only the app shell changes.
* **Theming**: unify Tailwind palette with MUI theme tokens (or consider MUI Joy UI for CSS vars theming).