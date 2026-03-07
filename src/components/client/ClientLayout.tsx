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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || loading) return;

    // Initialize Lenis for smooth scrolling only after preloader is done
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
  }, [mounted, loading]);

  return (
    <>
      {mounted && (
        <AnimatePresence>
          {loading && <Preloader onComplete={() => setLoading(false)} />}
        </AnimatePresence>
      )}

      <main
        className="relative w-full min-h-screen bg-base-400 text-base-100 selection:bg-base-500 selection:text-white cursor-none"
        style={mounted && loading ? { visibility: 'hidden', position: 'fixed', top: 0, left: 0, width: '100%' } : {}}
      >
        {mounted && !loading && (
          <>
            <CustomCursor />
            <InteractiveGrid />
          </>
        )}
        {children}
      </main>
    </>
  );
};
