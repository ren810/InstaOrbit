// ✅ SERVER COMPONENT - Localized Hero section
// Static layout and heading rendered on server with translations
// Interactive form/results rendered as client components

import React from 'react';
import { useTranslations } from 'next-intl';
import { HeroDownloadForm } from '@/components/client/HeroDownloadForm';
import { HeroContent } from '@/components/client/HeroContent';

export const Hero = () => {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-[0.03]" />

      {/* Main Content with Animation */}
      <HeroContent>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-base-500/30 rounded-full bg-base-500/10">
          <div className="w-2 h-2 rounded-full bg-base-500 animate-pulse" />
          <span className="font-mono text-xs text-base-500 tracking-widest uppercase">{t('badge')}</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-base-100 font-display text-7xl md:text-9xl tracking-tight leading-[0.85]">
            {t('title')} <span className="text-transparent bg-clip-text bg-gradient-to-b from-base-500 to-base-500/50">{t('titleHighlight')}</span>
          </h1>

          <p className="font-body text-base-200 text-lg md:text-xl max-w-2xl leading-relaxed mt-2">
            {t('description')}
          </p>
        </div>

        {/* Download Form - Client Component for interactivity */}
        <HeroDownloadForm />

      </HeroContent>
    </section>
  );
};
