import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

function stripMdxFrontmatter() {
  return (tree) => {
    if (!tree || !Array.isArray(tree.children) || tree.children.length < 1) return;

    // Case 1: frontmatter was parsed as a YAML node.
    if (tree.children[0]?.type === 'yaml') {
      tree.children.shift();
      return;
    }

    // Case 2: parser treated frontmatter as markdown:
    // thematicBreak + paragraph(title/order lines) + thematicBreak.
    const [first, second, third] = tree.children;
    const isThematicBreak = (node) => node?.type === 'thematicBreak';
    const isFrontmatterParagraph = (node) => {
      if (node?.type !== 'paragraph') return false;
      const text = (node.children || [])
        .map((child) => (child?.value ?? ''))
        .join('')
        .trim();
      return /^title:\s+/i.test(text) || /^order:\s+/i.test(text);
    };

    if (isThematicBreak(first) && isFrontmatterParagraph(second) && isThematicBreak(third)) {
      tree.children.splice(0, 3);
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      mdx({
          remarkPlugins: [remarkFrontmatter, stripMdxFrontmatter, remarkGfm],
          rehypePlugins: [rehypeSlug],
          exclude: ['**/CHANGELOG.md']
      }),
      react(),
      tailwindcss()
  ],
})
