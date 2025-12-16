// Blog index page - lists all blog posts
import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Clock, TrendingUp } from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://instaorbits.com';

// Blog posts configuration
const blogPosts = [
    {
        slug: 'how-to-download-instagram-reels',
        readTime: 5,
        category: 'guide',
        featured: true,
    },
    {
        slug: 'best-instagram-video-downloader-2025',
        readTime: 6,
        category: 'comparison',
        featured: true,
    },
    {
        slug: 'download-instagram-stories-without-app',
        readTime: 4,
        category: 'guide',
        featured: false,
    },
    {
        slug: 'save-instagram-reels-without-watermark',
        readTime: 5,
        category: 'tutorial',
        featured: false,
    },
];

export async function generateMetadata({
    params: { locale }
}: {
    params: { locale: string }
}): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'blog' });

    return {
        title: t('indexTitle'),
        description: t('indexDescription'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/blog`,
        },
    };
}

export default function BlogIndexPage({ params: { locale } }: { params: { locale: string } }) {
    const t = useTranslations('blog');

    return (
        <div>
            {/* Header */}
            <header className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-base-500">
                        ● {t('blogLabel')}
                    </span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl uppercase mb-4">
                    {t('indexTitle')}
                </h1>
                <p className="text-base-200 text-lg max-w-2xl">
                    {t('indexDescription')}
                </p>
            </header>

            {/* Featured Posts */}
            <section className="mb-12">
                <h2 className="font-mono text-xs uppercase tracking-widest text-base-500 mb-6">
                    ● {t('featuredPosts')}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {blogPosts.filter(p => p.featured).map((post) => (
                        <Link
                            key={post.slug}
                            href={`/${locale}/blog/${post.slug}`}
                            className="group block p-6 border border-base-300 bg-base-400/50 hover:border-base-500 hover:bg-base-300/30 transition-all duration-300"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-2 py-1 bg-base-500/20 text-base-500 font-mono text-xs uppercase">
                                    {t(`categories.${post.category}`)}
                                </span>
                                <span className="flex items-center gap-1 text-base-300 text-xs">
                                    <Clock size={12} />
                                    {post.readTime} {t('minRead')}
                                </span>
                            </div>
                            <h3 className="font-display text-xl uppercase mb-3 group-hover:text-base-500 transition-colors">
                                {t(`posts.${post.slug}.title`)}
                            </h3>
                            <p className="text-base-200 text-sm mb-4 line-clamp-2">
                                {t(`posts.${post.slug}.description`)}
                            </p>
                            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-base-500">
                                {t('readMore')} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* All Posts */}
            <section>
                <h2 className="font-mono text-xs uppercase tracking-widest text-base-500 mb-6">
                    ● {t('allPosts')}
                </h2>
                <div className="space-y-4">
                    {blogPosts.map((post, idx) => (
                        <Link
                            key={post.slug}
                            href={`/${locale}/blog/${post.slug}`}
                            className="group flex items-center gap-6 p-4 border border-base-300/50 hover:border-base-500 transition-all duration-300"
                        >
                            <span className="font-mono text-2xl text-base-300 w-12">
                                {String(idx + 1).padStart(2, '0')}
                            </span>
                            <div className="flex-1">
                                <h3 className="font-mono text-sm uppercase group-hover:text-base-500 transition-colors">
                                    {t(`posts.${post.slug}.title`)}
                                </h3>
                            </div>
                            <span className="flex items-center gap-1 text-base-300 text-xs">
                                <Clock size={12} />
                                {post.readTime} {t('minRead')}
                            </span>
                            <ArrowRight size={16} className="text-base-300 group-hover:text-base-500 group-hover:translate-x-1 transition-all" />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
