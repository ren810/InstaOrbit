import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://instaorbits.com';

// All supported locales
const locales = ['en', 'zh-CN', 'es', 'ar', 'pt', 'ja', 'ru', 'de', 'fr', 'hi'];

// Blog posts
const blogPosts = [
  'how-to-download-instagram-reels',
  'best-instagram-video-downloader-2025',
  'download-instagram-stories-without-app',
  'save-instagram-reels-without-watermark',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale
  locales.forEach(locale => {
    // Home page for each locale (highest priority)
    sitemapEntries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });

    // Blog index page
    sitemapEntries.push({
      url: `${SITE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Individual blog posts
    blogPosts.forEach(slug => {
      sitemapEntries.push({
        url: `${SITE_URL}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });

    // Privacy Policy page
    sitemapEntries.push({
      url: `${SITE_URL}/${locale}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    });

    // Terms of Service page
    sitemapEntries.push({
      url: `${SITE_URL}/${locale}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    });

    // Contact page
    sitemapEntries.push({
      url: `${SITE_URL}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });

    // Cookie Policy page
    sitemapEntries.push({
      url: `${SITE_URL}/${locale}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    });

    // Features section
    sitemapEntries.push({
      url: `${SITE_URL}/${locale}#features`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });

    // How It Works section
    sitemapEntries.push({
      url: `${SITE_URL}/${locale}#how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });

    // FAQ section
    sitemapEntries.push({
      url: `${SITE_URL}/${locale}#faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  });

  return sitemapEntries;
}
