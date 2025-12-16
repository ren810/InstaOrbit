import { Navbar } from '@/components/server/Navbar';
import { Footer } from '@/components/server/Footer';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Scale, AlertTriangle, Copyright, Ban, RefreshCw } from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://instaorbits.com';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'legal' });

    return {
        title: t('terms.title'),
        description: t('terms.metaDescription'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/terms-of-service`,
        },
    };
}

export default async function TermsOfServicePage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'legal' });

    const sections = [
        { icon: FileText, title: t('terms.sections.acceptance.title'), content: t('terms.sections.acceptance.content') },
        { icon: Scale, title: t('terms.sections.usage.title'), content: t('terms.sections.usage.content') },
        { icon: Copyright, title: t('terms.sections.intellectual.title'), content: t('terms.sections.intellectual.content') },
        { icon: Ban, title: t('terms.sections.prohibited.title'), content: t('terms.sections.prohibited.content') },
        { icon: AlertTriangle, title: t('terms.sections.disclaimer.title'), content: t('terms.sections.disclaimer.content') },
        { icon: RefreshCw, title: t('terms.sections.changes.title'), content: t('terms.sections.changes.content') },
    ];

    return (
        <>
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
                            <FileText className="w-10 h-10 text-[#ee6436]" />
                            <h1 className="text-3xl md:text-4xl font-bold text-white">
                                {t('terms.title')}
                            </h1>
                        </div>
                        <p className="text-gray-400">
                            {t('terms.lastUpdated')}: December 16, 2024
                        </p>
                    </div>

                    {/* Introduction */}
                    <div className="mb-12 p-6 bg-[#111] border border-[#222] rounded-lg">
                        <p className="text-gray-300 leading-relaxed">
                            {t('terms.introduction')}
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-8">
                        {sections.map((section, index) => (
                            <div key={index} className="p-6 bg-[#111] border border-[#222] rounded-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <section.icon className="w-6 h-6 text-[#ee6436]" />
                                    <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                                </div>
                                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
