import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const context = process.env.CONTEXT;
if (!['deploy-preview', 'branch-deploy'].includes(context)) {
  throw new Error(`Refusing to add noindex headers in Netlify context: ${context ?? 'local/production'}`);
}

await writeFile(path.join(process.cwd(), 'dist', '_headers'), '/*\n  X-Robots-Tag: noindex\n');
