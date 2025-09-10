// @ts-check
import { defineConfig } from 'astro/config';

/* ------------------------------ Integrations ------------------------------ */
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
/* -------------------------------------------------------------------------- */

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.joebashour.dev',
  integrations: [svelte(), mdx(), sitemap(), icon()],

  vite: {
    plugins: [tailwindcss()],
  },
});
