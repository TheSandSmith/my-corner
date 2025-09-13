// @ts-check
import { defineConfig } from 'astro/config';

/* ------------------------------ Integrations ------------------------------ */
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
/* -------------------------------------------------------------------------- */

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.joebashour.dev',
  base: '/',
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    icon(),
    svelte(),
    mdx(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
