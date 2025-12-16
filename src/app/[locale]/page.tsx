// ✅ SERVER COMPONENT - Localized main page
// Uses server components by default with client islands for interactivity
// Optimized for SEO with language-specific content

import { Navbar } from '@/components/server/Navbar';
import { Hero } from '@/components/server/Hero';
import { Features } from '@/components/server/Features';
import { HowItWorksClient } from '@/components/client/HowItWorksClient';
import { FAQ } from '@/components/client/FAQ';
import { Footer } from '@/components/server/Footer';
import { ClientLayout } from '@/components/client/ClientLayout';
import { ToastProvider } from '@/components/client/ToastSystem';

type Props = {
    params: { locale: string };
};

export default function LocalizedHome({ params: { locale } }: Props) {
    return (
        <ToastProvider>
            <ClientLayout>
                <Navbar />
                <Hero />
                <Features />
                <HowItWorksClient />
                <FAQ />
                <Footer />
            </ClientLayout>
        </ToastProvider>
    );
}
