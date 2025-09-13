import fs from 'fs';
import path from 'path';

export function checkPageExists(link: string): boolean {
  const filePath = path.join(
    process.cwd(),
    'src',
    'pages',
    `${link.replace('/', '')}.astro`
  );

  return fs.existsSync(filePath);
}

// TODO: Implement this
export function sanitizePagesForSitemap(): string[] {
  return [];
}
