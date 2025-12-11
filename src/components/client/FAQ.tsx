"use client";

// ✅ CLIENT COMPONENT - JUSTIFIED
// Requires: useState for accordion state, AnimatePresence for animations
// User interaction: Click to expand/collapse FAQ items

import React, { useState } from 'react';
import { FAQ_ITEMS } from '@/lib/constants';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 bg-base-400 relative border-t border-base-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-base-100 font-display text-5xl md:text-7xl mb-6">System Protocols</h2>
          <div className="w-24 h-1 bg-base-500 mx-auto" />
          <p className="font-mono text-base-200 mt-6 uppercase tracking-widest text-sm">
            Frequently Asked Questions Database
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={clsx(
                  "border transition-all duration-300",
                  isOpen ? "border-base-500 bg-base-300/10" : "border-base-300 hover:border-base-200"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={clsx(
                    "font-mono text-lg uppercase tracking-wide transition-colors",
                    isOpen ? "text-base-500" : "text-base-100"
                  )}>
                    {item.question}
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
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 font-body text-base-200 leading-relaxed border-t border-base-500/20 mx-6 mt-2">
                        {item.answer}
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
