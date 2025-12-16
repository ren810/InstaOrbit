import React from "react";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import JsonLdLocalized from "@/components/server/JsonLdLocalized";
import FAQSchema from "@/components/server/FAQSchema";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";

// Supported locales
const locales = ['en', 'zh-CN', 'es', 'ar', 'pt', 'ja', 'ru', 'de', 'fr', 'hi'];

// Site configuration - UPDATE THIS WITH YOUR DOMAIN
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://instaorbits.com';

// Locale metadata for SEO
const localeConfig: Record<string, {
    name: string;
    dir: 'ltr' | 'rtl';
    hreflang: string;
    ogLocale: string;
    geoRegion: string;
}> = {
    en: { name: 'English', dir: 'ltr', hreflang: 'en', ogLocale: 'en_US', geoRegion: 'US' },
    'zh-CN': { name: '简体中文', dir: 'ltr', hreflang: 'zh-Hans', ogLocale: 'zh_CN', geoRegion: 'CN' },
    es: { name: 'Español', dir: 'ltr', hreflang: 'es', ogLocale: 'es_ES', geoRegion: 'ES' },
    ar: { name: 'العربية', dir: 'rtl', hreflang: 'ar', ogLocale: 'ar_SA', geoRegion: 'SA' },
    pt: { name: 'Português', dir: 'ltr', hreflang: 'pt', ogLocale: 'pt_BR', geoRegion: 'BR' },
    ja: { name: '日本語', dir: 'ltr', hreflang: 'ja', ogLocale: 'ja_JP', geoRegion: 'JP' },
    ru: { name: 'Русский', dir: 'ltr', hreflang: 'ru', ogLocale: 'ru_RU', geoRegion: 'RU' },
    de: { name: 'Deutsch', dir: 'ltr', hreflang: 'de', ogLocale: 'de_DE', geoRegion: 'DE' },
    fr: { name: 'Français', dir: 'ltr', hreflang: 'fr', ogLocale: 'fr_FR', geoRegion: 'FR' },
    hi: { name: 'हिन्दी', dir: 'ltr', hreflang: 'hi', ogLocale: 'hi_IN', geoRegion: 'IN' }
};

// Generate hreflang alternates for all locales
function generateAlternates(locale: string) {
    const languages: Record<string, string> = {};

    locales.forEach(loc => {
        const hreflang = localeConfig[loc].hreflang;
        languages[hreflang] = `${SITE_URL}/${loc}`;
    });

    // Add x-default pointing to English
    languages['x-default'] = `${SITE_URL}/en`;

    return {
        canonical: `${SITE_URL}/${locale}`,
        languages
    };
}

// Viewport configuration for mobile optimization
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#ee6436',
    colorScheme: 'dark',
};

// Dynamic metadata generation per locale - ENHANCED FOR CRAWLERS
export async function generateMetadata({
    params: { locale }
}: {
    params: { locale: string }
}): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const config = localeConfig[locale] || localeConfig.en;

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: t('title'),
            template: `%s | InstaOrbit`
        },
        description: t('description'),
        keywords: t('keywords').split(', '),

        // Author information for crawlers
        authors: [{ name: 'InstaOrbit', url: SITE_URL }],
        creator: 'InstaOrbit',
        publisher: 'InstaOrbit',

        // Generator meta tag
        generator: 'Next.js',

        // Application name for mobile
        applicationName: 'InstaOrbit',

        // Referrer policy
        referrer: 'origin-when-cross-origin',

        // Format detection for mobile
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },

        // Category for app stores/discovery
        category: 'Technology',

        // Classification
        classification: 'Instagram Downloader Tool',

        // Alternates with hreflang
        alternates: generateAlternates(locale),

        // Enhanced robots directives for all crawlers
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },

        // Open Graph - Enhanced
        openGraph: {
            type: 'website',
            locale: config.ogLocale,
            alternateLocale: locales
                .filter(l => l !== locale)
                .map(l => localeConfig[l].ogLocale),
            url: `${SITE_URL}/${locale}`,
            siteName: 'InstaOrbit',
            title: t('title'),
            description: t('description'),
            countryName: config.geoRegion,
            images: [
                {
                    url: '/og-image.svg',
                    width: 1200,
                    height: 630,
                    alt: 'InstaOrbit - Instagram Downloader',
                    type: 'image/svg+xml',
                },
            ],
        },

        // Twitter Cards - Enhanced
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
            creator: '@instaorbit',
            site: '@instaorbit',
            images: {
                url: '/og-image.svg',
                alt: 'InstaOrbit - Instagram Downloader',
            },
        },

        // Icons - Complete set
        icons: {
            icon: [
                { url: '/favicon.svg', type: 'image/svg+xml' },
                { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
                { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            ],
            apple: [
                { url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' },
            ],
            shortcut: '/favicon.svg',
        },

        // Manifest for PWA
        manifest: '/manifest.json',

        // Search engine verification codes
        verification: {
            google: process.env.GOOGLE_VERIFICATION || 'your-google-verification-code',
            yandex: process.env.YANDEX_VERIFICATION || 'your-yandex-verification-code',
            other: {
                'baidu-site-verification': process.env.BAIDU_VERIFICATION || 'your-baidu-verification-code',
                'msvalidate.01': process.env.BING_VERIFICATION || 'your-bing-verification-code',
            },
        },

        // Additional meta for crawlers
        other: {
            'geo.region': config.geoRegion,
            'geo.placename': config.name,
            'content-language': locale,
            'distribution': 'global',
            'rating': 'general',
            'revisit-after': '3 days',
            'coverage': 'worldwide',
            'target': 'all',
            'HandheldFriendly': 'true',
            'MobileOptimized': '320',
        },
    };
}

// Generate static params for all locales
export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

type Props = {
    children: React.ReactNode;
    params: { locale: string };
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
    // Validate locale
    if (!locales.includes(locale)) {
        notFound();
    }

    // Get messages for this locale
    const messages = await getMessages();
    const config = localeConfig[locale] || localeConfig.en;

    return (
        <html lang={locale} dir={config.dir} suppressHydrationWarning>
            <head>
                {/* Hreflang tags for international SEO */}
                {locales.map(loc => (
                    <link
                        key={loc}
                        rel="alternate"
                        hrefLang={localeConfig[loc].hreflang}
                        href={`${SITE_URL}/${loc}`}
                    />
                ))}
                <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en`} />

                {/* Canonical URL */}
                <link rel="canonical" href={`${SITE_URL}/${locale}`} />

                {/* DNS prefetch for performance */}
                <link rel="dns-prefetch" href="//fonts.googleapis.com" />
                <link rel="dns-prefetch" href="//fonts.gstatic.com" />
                <link rel="dns-prefetch" href="//www.google-analytics.com" />

                {/* Preconnect for critical resources */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/* Font loading */}
                <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Host+Grotesk:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
                <link href="https://fonts.cdnfonts.com/css/schabo" rel="stylesheet" />

                {/* Favicon and app icons */}
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />

                {/* Theme color for mobile browsers */}
                <meta name="theme-color" content="#ee6436" />
                <meta name="msapplication-TileColor" content="#ee6436" />

                {/* Crawler hints */}
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="bingbot" content="index, follow" />

                {/* Geographic targeting */}
                <meta name="geo.region" content={config.geoRegion} />
                <meta name="geo.placename" content={config.name} />

                {/* Language and content */}
                <meta httpEquiv="content-language" content={locale} />
                <meta name="language" content={config.name} />
            </head>
            <body className="bg-base-400 text-base-100 antialiased overflow-x-hidden" suppressHydrationWarning>
                <NextIntlClientProvider messages={messages}>
                    {/* Structured Data */}
                    <JsonLdLocalized locale={locale} />
                    <FAQSchema locale={locale} />

                    {children}

                    <Analytics />
                    <SpeedInsights />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
