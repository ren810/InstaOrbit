import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://instaorbits.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // General rule for all bots
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
      // Google specific
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Google Image bot
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Baidu (China)
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
      // Yandex (Russia)
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
      // Yandex Images
      {
        userAgent: 'YandexImages',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Bing
      {
        userAgent: 'bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // DuckDuckGo
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Sogou (China)
      {
        userAgent: 'Sogou',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 2,
      },
      // 360 Spider (China)
      {
        userAgent: '360Spider',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 2,
      },
      // Naver (Korea)
      {
        userAgent: 'Yeti',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Facebook crawler
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      // Twitter crawler
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      // LinkedIn crawler
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
      // Pinterest
      {
        userAgent: 'Pinterest',
        allow: '/',
      },
      // Block bad bots
      {
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'SemrushBot',
        disallow: '/',
      },
      {
        userAgent: 'MJ12bot',
        disallow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
