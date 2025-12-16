import { Navbar } from '@/components/server/Navbar';
import { Footer } from '@/components/server/Footer';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Cookie, Info, Shield } from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://instaorbits.com';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'legal' });

    return {
        title: t('cookie.title'),
        description: t('cookie.metaDescription'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/cookie-policy`,
        },
    };
}

export default async function CookiePolicyPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'legal' });

    // WebPage Schema for SEO
    const cookieSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": t('cookie.title'),
        "description": t('cookie.metaDescription'),
        "url": `${SITE_URL}/${locale}/cookie-policy`,
        "inLanguage": locale === 'zh-CN' ? 'zh-Hans' : locale,
        "isPartOf": {
            "@type": "WebSite",
            "name": "InstaOrbit",
            "url": SITE_URL
        }
    };

    const sections = ['whatAreCookies', 'howWeUse', 'typesOfCookies', 'thirdParty', 'management', 'changes'] as const;

    return (
        <>
            {/* WebPage Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(cookieSchema) }}
            />
            <Navbar />
            <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Link */}
                    <Link
                        href={`/${locale}`}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ee6436] transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('backToHome')}
                    </Link>

                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Cookie className="w-10 h-10 text-[#ee6436]" />
                            <h1 className="text-3xl md:text-4xl font-bold text-white">
                                {t('cookie.title')}
                            </h1>
                        </div>
                        <p className="text-gray-400">
                            {t('cookie.lastUpdated')}: December 2024
                        </p>
                    </div>

                    {/* Introduction */}
                    <div className="mb-10 p-6 bg-[#111] border border-[#222] rounded-lg">
                        <p className="text-gray-300 leading-relaxed">
                            {t('cookie.introduction')}
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-8">
                        {sections.map((sectionKey) => (
                            <section key={sectionKey} className="p-6 bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg">
                                <div className="flex items-start gap-3 mb-4">
                                    {sectionKey === 'whatAreCookies' && <Info className="w-6 h-6 text-[#ee6436] mt-1" />}
                                    {sectionKey === 'howWeUse' && <Cookie className="w-6 h-6 text-[#ee6436] mt-1" />}
                                    {sectionKey === 'typesOfCookies' && <Shield className="w-6 h-6 text-[#ee6436] mt-1" />}
                                    {sectionKey === 'thirdParty' && <Info className="w-6 h-6 text-[#ee6436] mt-1" />}
                                    {sectionKey === 'management' && <Shield className="w-6 h-6 text-[#ee6436] mt-1" />}
                                    {sectionKey === 'changes' && <Info className="w-6 h-6 text-[#ee6436] mt-1" />}
                                    <h2 className="text-xl font-semibold text-white">
                                        {t(`cookie.sections.${sectionKey}.title`)}
                                    </h2>
                                </div>
                                <div className="text-gray-300 leading-relaxed whitespace-pre-line pl-9">
                                    {t(`cookie.sections.${sectionKey}.content`)}
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Contact for Questions */}
                    <div className="mt-12 p-6 bg-gradient-to-r from-[#ee6436]/10 to-transparent border border-[#ee6436]/20 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2">{t('cookie.questions.title')}</h3>
                        <p className="text-gray-300 mb-4">{t('cookie.questions.content')}</p>
                        <Link
                            href={`/${locale}/contact`}
                            className="inline-flex items-center gap-2 px-6 py-2 bg-[#ee6436] text-white rounded-lg hover:bg-[#d55a30] transition-colors"
                        >
                            {t('cookie.questions.button')}
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
