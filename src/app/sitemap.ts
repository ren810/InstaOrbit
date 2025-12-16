import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://instaorbits.com';

// All supported locales
const locales = ['en', 'zh-CN', 'es', 'ar', 'pt', 'ja', 'ru', 'de', 'fr', 'hi'];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale
  locales.forEach(locale => {
    // Home page for each locale
    sitemapEntries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });

    // Features section
    sitemapEntries.push({
      url: `${SITE_URL}/${locale}#features`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    // How It Works section
    sitemapEntries.push({
      url: `${SITE_URL}/${locale}#how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    // FAQ section
    sitemapEntries.push({
      url: `${SITE_URL}/${locale}#faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  return sitemapEntries;
}
