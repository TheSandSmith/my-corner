import { checkPageExists } from './utils';
import type { SlashPage } from './types';
import { ChangeFreqEnum } from '@astrojs/sitemap';

export const slashes: Record<string, SlashPage> = {
  '/🍪': {
    url: '/🍪',
    description: 'would you like a cookie?',
    isVisible: checkPageExists('/🍪'),
    sitemapRules: {
      exclude: true,
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.NEVER,
      priority: 0.1,
    },
  },
  '/about': {
    url: '/about',
    description: 'my story in 60 seconds',
    isVisible: checkPageExists('/about'),
    sitemapRules: {
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.MONTHLY,
      priority: 0.8,
    },
  },
  '/ai': {
    url: '/ai',
    description: 'how I am using AI',
    isVisible: checkPageExists('/ai'),
    sitemapRules: {
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.YEARLY,
      priority: 0.6,
    },
  },
  '/blank': {
    url: '/blank',
    description: 'this page was intentionally left blank',
    isVisible: checkPageExists('/blank'),
    sitemapRules: {
      exclude: true,
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.NEVER,
      priority: 0.1,
    },
  },
  '/blog': {
    url: '/blog',
    description: 'my miniblog where I share my thoughts and expertise',
    isVisible: checkPageExists('/blog'),
    sitemapRules: {
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.WEEKLY,
      priority: 0.9,
    },
  },
  '/bucket-list': {
    url: '/bucket-list',
    description:
      'a list of things I hope to complete before I pass on from this realm',
    isVisible: checkPageExists('/bucket-list'),
    sitemapRules: {
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.YEARLY,
      priority: 0.5,
    },
  },
  '/changelog': {
    url: '/changelog',
    description: 'what I have done (and will do) with this site',
    isVisible: checkPageExists('/changelog'),
    sitemapRules: {
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.MONTHLY,
      priority: 0.4,
    },
  },
  '/colophon': {
    url: '/colophon',
    description: 'what keeps this site alive',
    isVisible: checkPageExists('/colophon'),
    sitemapRules: {
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.YEARLY,
      priority: 0.5,
    },
  },
  '/contact': {
    url: '/contact',
    description: 'channels you can reach me through',
    isVisible: checkPageExists('/contact'),
    sitemapRules: {
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.YEARLY,
      priority: 0.7,
    },
  },
  '/feeds': {
    url: '/feeds',
    description: 'my own blog feeds (RSS, Atom, JSON)',
    isVisible: checkPageExists('/feeds'),
    sitemapRules: {
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.WEEKLY,
      priority: 0.6,
    },
  },
  '/guestbook': {
    url: '/guestbook',
    description: 'let me know you have dropped by…',
    isVisible: checkPageExists('/guestbook'),
    sitemapRules: {
      exclude: true,
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.NEVER,
      priority: 0.2,
    },
  },
  '/hello': {
    url: '/hello',
    description: 'ways you can say hello',
    isVisible: checkPageExists('/hello'),
    sitemapRules: {
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.YEARLY,
      priority: 0.5,
    },
  },
  '/interests': {
    url: '/interests',
    description: 'a list of what I am fascinated by',
    isVisible: checkPageExists('/interests'),
    sitemapRules: {
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.YEARLY,
      priority: 0.5,
    },
  },
  '/llm': {
    url: '/llm',
    description: 'are you an LLM?',
    isVisible: checkPageExists('/llm'),
    sitemapRules: {
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.NEVER,
      priority: 0.3,
    },
  },
  '/nope': {
    url: '/nope',
    description: 'a list of what I will never accept',
    isVisible: checkPageExists('/nope'),
    sitemapRules: {
      exclude: true,
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.NEVER,
      priority: 0.2,
    },
  },
  '/now': {
    url: '/now',
    description: 'a summary of what I am working on (updated quarterly)',
    isVisible: checkPageExists('/now'),
    sitemapRules: {
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.MONTHLY,
      priority: 0.7,
    },
  },
  '/podroll': {
    url: '/podroll',
    description: 'a curated list of podcasts I listen to (and would recommend)',
    isVisible: checkPageExists('/podroll'),
    sitemapRules: {
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.YEARLY,
      priority: 0.5,
    },
  },
  '/privacy': {
    url: '/privacy',
    description: 'how I ensure your visit to my site remains transparent',
    isVisible: checkPageExists('/privacy'),
    sitemapRules: {
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.YEARLY,
      priority: 0.4,
    },
  },
  '/resume': {
    url: '/resume',
    description: 'my career timeline up to now',
    isVisible: checkPageExists('/resume'),
    sitemapRules: {
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.YEARLY,
      priority: 0.8,
    },
  },
  '/sitemap': {
    url: '/sitemap',
    description: 'if you are not a bot, then do not worry about this!',
    isVisible: checkPageExists('/sitemap'),
    sitemapRules: {
      exclude: true,
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.NEVER,
      priority: 0.1,
    },
  },
  '/til': {
    url: '/til',
    description: 'today, I learned…',
    isVisible: checkPageExists('/til'),
    sitemapRules: {
      exclude: true,
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.DAILY,
      priority: 0.3,
    },
  },
  '/watched': {
    url: '/watched',
    description: 'I keep a log of all the movies I have watched so far',
    isVisible: checkPageExists('/watched'),
    sitemapRules: {
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.MONTHLY,
      priority: 0.5,
    },
  },
  '/yep': {
    url: '/yep',
    description: 'a list of what I will always accept',
    isVisible: checkPageExists('/yep'),
    sitemapRules: {
      exclude: true,
      lastmod: new Date().toISOString(),
      changefreq: ChangeFreqEnum.NEVER,
      priority: 0.2,
    },
  },
};
