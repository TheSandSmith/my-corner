import fs from 'fs';
import path from 'path';
import 'dotenv/config';
export function checkPageExists(link) {
  const port_from_env = process.env.PORT;
  console.log('PORT from env:', port_from_env);
  const filePath = path.join(process.cwd(), 'src', 'pages', `${link.replace('/', '')}.astro`);
  return fs.existsSync(filePath);
}

// TODO: Implement this
export function sanitizePagesForSitemap() {
  return [];
}