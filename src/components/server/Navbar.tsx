// ✅ SERVER COMPONENT - Localized navigation with language switcher

import React from 'react';
import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled
const LanguageSwitcher = dynamic(
  () => import('@/components/client/LanguageSwitcher'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center gap-2 px-4 py-2.5 border border-[#333] bg-[#1a1a1a]">
        <span className="font-mono text-xs text-[#666]">...</span>
      </div>
    )
  }
);

export const Navbar = () => {
  const t = useTranslations('nav');

  const navItems = [
    { label: t('features'), href: '#features' },
    { label: t('howItWorks'), href: '#how-it-works' },
    { label: t('faq'), href: '#faq' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center mix-blend-difference text-base-100">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 border border-base-500 flex items-center justify-center rotate-45">
          <div className="w-4 h-4 bg-base-500 -rotate-45" />
        </div>
        <span className="font-display text-2xl tracking-wide uppercase">InstaOrbit</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="font-mono text-sm uppercase tracking-widest hover:text-base-500 transition-colors"
          >
            {item.label}
          </a>
        ))}
        <LanguageSwitcher />
      </div>

      <div className="md:hidden flex items-center gap-4">
        <LanguageSwitcher />
        <button className="text-base-100" aria-label="Open menu">
          <Menu />
        </button>
      </div>
    </nav>
  );
};
