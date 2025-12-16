// Blog page layout for SEO-optimized articles
import React from 'react';
import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/server/Navbar';
import { Footer } from '@/components/server/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';

type Props = {
    children: React.ReactNode;
    params: { locale: string };
};

export default function BlogLayout({ children, params: { locale } }: Props) {
    const t = useTranslations('blog');

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href={`/${locale}`}
                        className="inline-flex items-center gap-2 text-base-200 hover:text-base-500 transition-colors mb-8 font-mono text-sm uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} />
                        {t('backToHome')}
                    </Link>
                    {children}
                </div>
            </main>
            <Footer />
        </>
    );
}
