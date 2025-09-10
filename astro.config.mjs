// @ts-check
import { defineConfig } from 'astro/config';

/* ------------------------------ Integrations ------------------------------ */
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
