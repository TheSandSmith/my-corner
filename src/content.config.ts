import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const BASE_DIR = './src/content';

const localeSchema = z.enum(['en']); // TODO: add more languages when localization is introduced

const pageSchema = z.object({
  lang: localeSchema,
  title: z.string(),
  slug: z.string(),
  excludeFromIndex: z.boolean(),
  lastmod: z.string().datetime(),
  type: z.enum(['SITE', 'BLOG', 'PROJECT']),
  slugTranslations: z.record(localeSchema).optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/{en,fr}/*.mdx', base: `${BASE_DIR}/blog` }),
  schema: pageSchema,
});

const project = defineCollection({
  loader: glob({ pattern: '**/{en,fr}/*.mdx', base: `${BASE_DIR}/project` }),
  schema: pageSchema,
});

// Learn more about custom content loaders at: https://docs.astro.build/en/guides/content-collections/#building-a-custom-loader
export const collections = { blog, project };
