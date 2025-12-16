// ✅ SERVER COMPONENT - Localized features grid
// Features grid renders translated content from i18n

import React from 'react';
import { useTranslations } from 'next-intl';
import { Zap, Shield, Download, Smartphone, Globe, Lock } from 'lucide-react';

// Feature icons mapping
const featureIcons = {
  fast: Zap,
  hd: Download,
  noWatermark: Shield,
  unlimited: Download,
  crossPlatform: Globe,
  secure: Lock
};

const featureKeys = ['fast', 'hd', 'noWatermark', 'unlimited', 'crossPlatform', 'secure'] as const;

export const Features = () => {
  const t = useTranslations('features');

  return (
    <section id="features" className="py-24 px-6 border-t border-base-300 bg-base-400 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-base-100 font-display text-5xl md:text-7xl mb-6">{t('title')}</h2>
          <p className="text-base-200 font-body text-lg max-w-2xl">{t('subtitle')}</p>
          <div className="w-24 h-1 bg-base-500 mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-base-300 border border-base-300">
          {featureKeys.map((key) => {
            const Icon = featureIcons[key];
            return (
              <div key={key} className="bg-base-400 p-8 group hover:bg-base-300/30 transition-colors duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon size={64} strokeWidth={1} />
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 mb-6 flex items-center justify-center border border-base-500/50 rounded-full text-base-500 group-hover:bg-base-500 group-hover:text-base-100 transition-all duration-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display text-2xl mb-3 text-base-100">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="font-body text-base-200 leading-relaxed text-sm lg:text-base">
                    {t(`items.${key}.description`)}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-base-500 group-hover:w-full transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
