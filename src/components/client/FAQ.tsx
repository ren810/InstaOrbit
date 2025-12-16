"use client";

// ✅ CLIENT COMPONENT - Localized FAQ accordion
// Uses translations with useState for accordion state

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = useTranslations('faq');

  return (
    <section id="faq" className="py-24 px-6 bg-base-400 relative border-t border-base-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-base-100 font-display text-5xl md:text-7xl mb-6">{t('title')}</h2>
          <div className="w-24 h-1 bg-base-500 mx-auto" />
          <p className="font-mono text-base-200 mt-6 uppercase tracking-widest text-sm">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqKeys.map((key, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={key}
                className={clsx(
                  "border transition-all duration-300",
                  isOpen ? "border-base-500 bg-base-300/10" : "border-base-300 hover:border-base-200"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${key}`}
                >
                  <span className={clsx(
                    "font-mono text-lg uppercase tracking-wide transition-colors",
                    isOpen ? "text-base-500" : "text-base-100"
                  )}>
                    {t(`items.${key}.question`)}
                  </span>
                  <div className={clsx(
                    "transition-transform duration-300 text-base-200",
                    isOpen && "rotate-180 text-base-500"
                  )}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${key}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 font-body text-base-200 leading-relaxed border-t border-base-500/20 mx-6 mt-2">
                        {t(`items.${key}.answer`)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
