// Dynamic blog post page
import React from 'react';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Clock, Calendar, Share2, ArrowRight } from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://instaorbits.com';

const validSlugs = [
    'how-to-download-instagram-reels',
    'best-instagram-video-downloader-2025',
    'download-instagram-stories-without-app',
    'save-instagram-reels-without-watermark',
];

const locales = ['en', 'zh-CN', 'es', 'ar', 'pt', 'ja', 'ru', 'de', 'fr', 'hi'];

export function generateStaticParams() {
    const params: { locale: string; slug: string }[] = [];
    locales.forEach(locale => {
        validSlugs.forEach(slug => {
            params.push({ locale, slug });
        });
    });
    return params;
}

export async function generateMetadata({
    params: { locale, slug }
}: {
    params: { locale: string; slug: string }
}): Promise<Metadata> {
    if (!validSlugs.includes(slug)) return {};

    const t = await getTranslations({ locale, namespace: 'blog' });

    return {
        title: t(`posts.${slug}.title`),
        description: t(`posts.${slug}.metaDescription`),
        alternates: {
            canonical: `${SITE_URL}/${locale}/blog/${slug}`,
        },
        openGraph: {
            title: t(`posts.${slug}.title`),
            description: t(`posts.${slug}.metaDescription`),
            type: 'article',
            url: `${SITE_URL}/${locale}/blog/${slug}`,
        },
    };
}

export default function BlogPostPage({
    params: { locale, slug }
}: {
    params: { locale: string; slug: string }
}) {
    if (!validSlugs.includes(slug)) {
        notFound();
    }

    const t = useTranslations('blog');

    // Article Schema for SEO
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": t(`posts.${slug}.title`),
        "description": t(`posts.${slug}.metaDescription`),
        "author": {
            "@type": "Organization",
            "name": "InstaOrbit"
        },
        "publisher": {
            "@type": "Organization",
            "name": "InstaOrbit",
            "logo": {
                "@type": "ImageObject",
                "url": `${SITE_URL}/og-image.svg`
            }
        },
        "datePublished": "2025-01-01",
        "dateModified": new Date().toISOString().split('T')[0],
        "mainEntityOfPage": `${SITE_URL}/${locale}/blog/${slug}`,
        "inLanguage": locale
    };

    return (
        <article>
            {/* Article Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            {/* Header */}
            <header className="mb-10 pb-10 border-b border-base-300">
                <div className="flex items-center gap-4 mb-6">
                    <span className="px-3 py-1 bg-base-500/20 text-base-500 font-mono text-xs uppercase tracking-widest">
                        {t('guide')}
                    </span>
                    <span className="flex items-center gap-1 text-base-300 text-sm">
                        <Clock size={14} />
                        5 {t('minRead')}
                    </span>
                    <span className="flex items-center gap-1 text-base-300 text-sm">
                        <Calendar size={14} />
                        2025
                    </span>
                </div>

                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase mb-6">
                    {t(`posts.${slug}.title`)}
                </h1>

                <p className="text-base-200 text-lg max-w-3xl">
                    {t(`posts.${slug}.metaDescription`)}
                </p>
            </header>

            {/* Content */}
            <div className="prose prose-invert prose-orange max-w-none">
                {/* Section 1 */}
                <section className="mb-12">
                    <h2 className="font-display text-2xl uppercase mb-4 text-base-100">
                        {t(`posts.${slug}.section1.title`)}
                    </h2>
                    <p className="text-base-200 mb-6 leading-relaxed">
                        {t(`posts.${slug}.section1.content`)}
                    </p>
                </section>

                {/* Method/Steps */}
                <section className="mb-12">
                    <h2 className="font-display text-2xl uppercase mb-6 text-base-100">
                        {t(`posts.${slug}.section2.title`)}
                    </h2>

                    <div className="space-y-4 mb-8">
                        {[1, 2, 3, 4, 5].map((step) => (
                            <div key={step} className="flex gap-4 p-4 border border-base-300/50 bg-base-400/30">
                                <span className="font-mono text-2xl text-base-500 font-bold">
                                    {String(step).padStart(2, '0')}
                                </span>
                                <p className="text-base-200 flex-1">
                                    {t(`posts.${slug}.section2.step${step}`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Benefits */}
                <section className="mb-12 p-6 border border-base-500/30 bg-base-500/5">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-base-500 mb-4">
                        ● {t('whyUseThis')}
                    </h3>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-3 text-base-200">
                            <span className="w-2 h-2 bg-base-500" />
                            {t(`posts.${slug}.benefit1`)}
                        </li>
                        <li className="flex items-center gap-3 text-base-200">
                            <span className="w-2 h-2 bg-base-500" />
                            {t(`posts.${slug}.benefit2`)}
                        </li>
                        <li className="flex items-center gap-3 text-base-200">
                            <span className="w-2 h-2 bg-base-500" />
                            {t(`posts.${slug}.benefit3`)}
                        </li>
                    </ul>
                </section>

                {/* CTA */}
                <section className="text-center py-12 border border-base-500 bg-base-500/10">
                    <h3 className="font-display text-2xl uppercase mb-4">
                        {t('readyToDownload')}
                    </h3>
                    <p className="text-base-200 mb-6">
                        {t('tryNowDescription')}
                    </p>
                    <Link
                        href={`/${locale}`}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-base-500 text-white font-mono text-sm uppercase tracking-widest hover:bg-base-500/80 transition-colors"
                    >
                        {t('tryNowButton')}
                        <ArrowRight size={16} />
                    </Link>
                </section>
            </div>
        </article>
    );
}
