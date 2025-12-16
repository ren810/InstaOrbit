import { Navbar } from '@/components/server/Navbar';
import { Footer } from '@/components/server/Footer';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, Database, Mail, Clock } from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://instaorbits.com';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'legal' });

    return {
        title: t('privacy.title'),
        description: t('privacy.metaDescription'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/privacy-policy`,
        },
    };
}

export default async function PrivacyPolicyPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'legal' });

    const sections = [
        { icon: Database, title: t('privacy.sections.dataCollection.title'), content: t('privacy.sections.dataCollection.content') },
        { icon: Eye, title: t('privacy.sections.dataUsage.title'), content: t('privacy.sections.dataUsage.content') },
        { icon: Lock, title: t('privacy.sections.dataSecurity.title'), content: t('privacy.sections.dataSecurity.content') },
        { icon: Shield, title: t('privacy.sections.thirdParty.title'), content: t('privacy.sections.thirdParty.content') },
        { icon: Clock, title: t('privacy.sections.retention.title'), content: t('privacy.sections.retention.content') },
        { icon: Mail, title: t('privacy.sections.contact.title'), content: t('privacy.sections.contact.content') },
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
                            <Shield className="w-10 h-10 text-[#ee6436]" />
                            <h1 className="text-3xl md:text-4xl font-bold text-white">
                                {t('privacy.title')}
                            </h1>
                        </div>
                        <p className="text-gray-400">
                            {t('privacy.lastUpdated')}: December 16, 2024
                        </p>
                    </div>

                    {/* Introduction */}
                    <div className="mb-12 p-6 bg-[#111] border border-[#222] rounded-lg">
                        <p className="text-gray-300 leading-relaxed">
                            {t('privacy.introduction')}
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

                    {/* GDPR Notice */}
                    <div className="mt-12 p-6 bg-gradient-to-r from-[#ee6436]/10 to-transparent border border-[#ee6436]/20 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2">{t('privacy.gdpr.title')}</h3>
                        <p className="text-gray-300">{t('privacy.gdpr.content')}</p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
