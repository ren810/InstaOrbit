"use client";

// ✅ CLIENT COMPONENT - JUSTIFIED
// Requires: useState, useEffect, Lenis library (client-only)
// Manages: Smooth scrolling, preloader state, global providers
// Optimization: Slimmed down, providers moved to layout where possible

import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'framer-motion';

import { InteractiveGrid } from '@/components/client/InteractiveGrid';
import { Preloader } from '@/components/client/Preloader';
import { CustomCursor } from '@/components/client/CustomCursor';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.main
          className="relative w-full min-h-screen bg-base-400 text-base-100 selection:bg-base-500 selection:text-white cursor-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <CustomCursor />
          <InteractiveGrid />
          {children}
        </motion.main>
      )}
    </>
  );
};
