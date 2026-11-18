import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const vite = await createServer({
  configFile: path.join(root, 'vite.config.js'),
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
});

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
  const renderedApp = renderToString(createElement(App));
  const outputPath = path.join(root, 'dist', 'index.html');
  const html = await readFile(outputPath, 'utf8');

  if (!html.includes('<!--app-html-->')) {
    throw new Error('Prerender marker <!--app-html--> is missing from index.html.');
  }

  const headTags = [];
  const appMarkup = renderedApp.replace(/<title>[\s\S]*?<\/title>|<(?:meta|link)\b[^>]*\/?\s*>/g, (tag) => {
    headTags.push(tag);
    return '';
  });
  const withHeadMetadata = html.replace('</head>', `${headTags.join('\n')}\n  </head>`);
  await writeFile(outputPath, withHeadMetadata.replace('<!--app-html-->', appMarkup));
} finally {
  await vite.close();
}
