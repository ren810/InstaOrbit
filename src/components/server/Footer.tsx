// ✅ SERVER COMPONENT - Localized footer
// Uses translations for all text content

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Github, Twitter, Disc } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  const t = useTranslations('footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-300 border-t border-base-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <h2 className="font-display text-4xl text-base-100 mb-2">INSTAORBIT</h2>
            <p className="font-mono text-base-200 text-sm uppercase tracking-wider">
              {t('disclaimer')}
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="#"
              className="w-10 h-10 border border-base-200 flex items-center justify-center text-base-200 hover:border-base-500 hover:text-base-500 transition-all"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 border border-base-200 flex items-center justify-center text-base-200 hover:border-base-500 hover:text-base-500 transition-all"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 border border-base-200 flex items-center justify-center text-base-200 hover:border-base-500 hover:text-base-500 transition-all"
              aria-label="Discord"
            >
              <Disc size={20} />
            </a>
          </div>
        </div>

        <div className="h-px w-full bg-base-200/20" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-base-200/50 uppercase">
          <p>{t('copyright', { year: currentYear })}</p>
          <div className="flex gap-6 flex-wrap justify-center">
            <Link href={`/${locale}/privacy-policy`} className="hover:text-base-500 transition-colors">{t('links.privacy')}</Link>
            <Link href={`/${locale}/terms-of-service`} className="hover:text-base-500 transition-colors">{t('links.terms')}</Link>
            <Link href={`/${locale}/cookie-policy`} className="hover:text-base-500 transition-colors">{t('links.cookies')}</Link>
            <Link href={`/${locale}/contact`} className="hover:text-base-500 transition-colors">{t('links.contact')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
