// ✅ SERVER COMPONENT - Shell with client islands
// Static layout and heading rendered on server
// Interactive form/results rendered as client components
// Improves performance by reducing client-side JavaScript

import React from 'react';
import { motion } from 'framer-motion';
import { HeroDownloadForm } from '@/components/client/HeroDownloadForm';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-[0.03]" />
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center gap-12">
        
        {/* Badge - Static, no need for motion on server */}
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-base-500/30 rounded-full bg-base-500/10">
          <div className="w-2 h-2 rounded-full bg-base-500 animate-pulse" />
          <span className="font-mono text-xs text-base-500 tracking-widest uppercase">System Online v2.4</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-base-100 font-display text-7xl md:text-9xl tracking-tight leading-[0.85]">
              ORBIT <span className="text-transparent bg-clip-text bg-gradient-to-b from-base-500 to-base-500/50">DOWNLOADER</span>
            </h1>
    
            <p className="font-body text-base-200 text-lg md:text-xl max-w-2xl leading-relaxed mt-2">
              High-performance media extraction utility for Instagram. <br className="hidden md:block"/>
              Download Videos, Reels, Photos, and IGTV in original quality.
            </p>
        </div>

        {/* Download Form - Client Component for interactivity */}
        <HeroDownloadForm />

      </div>
    </section>
  );
};
