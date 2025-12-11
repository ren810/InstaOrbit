// ✅ SERVER COMPONENT - Main page layout
// Uses server components by default with client islands for interactivity
// Optimized for SEO and performance

import { Navbar } from '@/components/server/Navbar';
import { Hero } from '@/components/server/Hero';
import { Features } from '@/components/server/Features';
import { HowItWorksClient } from '@/components/client/HowItWorksClient';
import { FAQ } from '@/components/client/FAQ';
import { Footer } from '@/components/server/Footer';
import { ClientLayout } from '@/components/client/ClientLayout';
import { ToastProvider } from '@/components/client/ToastSystem';

export default function Home() {
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