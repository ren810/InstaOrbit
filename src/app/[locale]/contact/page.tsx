import { Navbar } from '@/components/server/Navbar';
import { Footer } from '@/components/server/Footer';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, Clock, Globe } from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://instaorbits.com';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'legal' });

    return {
        title: t('contact.title'),
        description: t('contact.metaDescription'),
        alternates: {
            canonical: `${SITE_URL}/${locale}/contact`,
        },
    };
}

export default async function ContactPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'legal' });

    // ContactPage Schema for SEO
    const contactSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": t('contact.title'),
        "url": `${SITE_URL}/${locale}/contact`,
        "description": t('contact.metaDescription'),
        "inLanguage": locale === 'zh-CN' ? 'zh-Hans' : locale,
        "mainEntity": {
            "@type": "Organization",
            "name": "InstaOrbit",
            "url": SITE_URL,
            "logo": `${SITE_URL}/logo.png`,
            "contactPoint": {
                "@type": "ContactPoint",
                "email": "support@instaorbits.com",
                "contactType": "customer service",
                "availableLanguage": ["English", "Spanish", "Chinese", "Russian", "Arabic", "Portuguese", "Japanese", "German", "French", "Hindi"],
                "areaServed": "Worldwide"
            }
        }
    };

    return (
        <>
            {/* ContactPage Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
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
                    <div className="mb-12 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <MessageSquare className="w-10 h-10 text-[#ee6436]" />
                            <h1 className="text-3xl md:text-4xl font-bold text-white">
                                {t('contact.title')}
                            </h1>
                        </div>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            {t('contact.subtitle')}
                        </p>
                    </div>

                    {/* Contact Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {/* Email Card */}
                        <div className="p-6 bg-[#111] border border-[#222] rounded-lg hover:border-[#ee6436]/50 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-[#ee6436]/10 rounded-lg">
                                    <Mail className="w-6 h-6 text-[#ee6436]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">{t('contact.email.title')}</h3>
                                    <p className="text-gray-400 text-sm">{t('contact.email.subtitle')}</p>
                                </div>
                            </div>
                            <a
                                href="mailto:support@instaorbits.com"
                                className="text-[#ee6436] hover:underline font-mono"
                            >
                                support@instaorbits.com
                            </a>
                        </div>

                        {/* Response Time Card */}
                        <div className="p-6 bg-[#111] border border-[#222] rounded-lg hover:border-[#ee6436]/50 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-[#ee6436]/10 rounded-lg">
                                    <Clock className="w-6 h-6 text-[#ee6436]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">{t('contact.response.title')}</h3>
                                    <p className="text-gray-400 text-sm">{t('contact.response.subtitle')}</p>
                                </div>
                            </div>
                            <p className="text-gray-300">{t('contact.response.time')}</p>
                        </div>
                    </div>

                    {/* FAQ Notice */}
                    <div className="p-6 bg-gradient-to-r from-[#ee6436]/10 to-transparent border border-[#ee6436]/20 rounded-lg text-center">
                        <Globe className="w-8 h-8 text-[#ee6436] mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-white mb-2">{t('contact.faq.title')}</h3>
                        <p className="text-gray-300 mb-4">{t('contact.faq.content')}</p>
                        <Link
                            href={`/${locale}#faq`}
                            className="inline-flex items-center gap-2 px-6 py-2 bg-[#ee6436] text-white rounded-lg hover:bg-[#d55a30] transition-colors"
                        >
                            {t('contact.faq.button')}
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

