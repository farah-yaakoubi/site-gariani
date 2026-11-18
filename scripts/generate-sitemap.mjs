import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { PUBLIC_ROUTES } from '../src/seo/public-routes.js';
import { SITE_ORIGIN } from '../src/seo/public-routes.js';

const urls = PUBLIC_ROUTES.map(({ path: routePath }) => {
  const pathname = `/${String(routePath).replace(/^\/+|\/+$/g, '')}`;
  return `  <url><loc>${SITE_ORIGIN}${pathname === '/' ? '' : pathname}</loc></url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
await writeFile(path.join(process.cwd(), 'dist', 'sitemap.xml'), sitemap);
