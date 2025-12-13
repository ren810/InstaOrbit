"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800); // Wait for smooth fade-out
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-base-400 flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Ring 1 */}
        <div className="absolute inset-0 border-l-2 border-r-2 border-base-500 rounded-full animate-[spin_1s_linear_infinite]" />

        {/* Ring 2 */}
        <div className="absolute inset-4 border-t-2 border-b-2 border-base-200 rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />

        {/* Disc */}
        <div className="absolute w-32 h-32 border border-base-500/30 rounded-full animate-[spin_3s_linear_infinite] flex items-center justify-center">
          <div className="w-2 h-2 bg-base-500 rounded-full" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2 z-10">
          <span className="font-display text-4xl text-base-100 tracking-widest">
            {Math.min(100, progress)}%
          </span>
          <span className="font-mono text-xs text-base-200 tracking-[0.2em] uppercase">
            Initializing
          </span>
        </div>
      </div>
    </motion.div>
  );
};