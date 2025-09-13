/**
 * Represents an item in the sitemap.
 *
 * @typedef {Object} SitemapItem
 * @property {string} url - The URL of the page. Should be an absolute URL (e.g., 'https://example.com/page').
 * @property {string} [lastmod] - The last modified date of the page in ISO format. Optional.
 * @property {('always'|'hourly'|'daily'|'weekly'|'monthly'|'yearly'|'never')} [changefreq] - The frequency with which the page content is likely to change. Optional.
 * @property {number} [priority] - The priority of the page relative to other pages on the site. Ranges from 0.0 to 1.0. Optional.
 * @property {LinkItem[]} [links] - Alternate language links for the page. Optional.
 */
export type SitemapItem = {
  url: string;
  lastmod?: string;
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: number;
  links?: LinkItem[];
};

export interface LinkItem {
  url: string;
  lang?: string;
}

export interface SlashPage {
  link: string;
  description: string;
  isVisible: boolean;
  nowrap?: boolean;
}
