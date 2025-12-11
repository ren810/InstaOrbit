"use client";

// ✅ CLIENT COMPONENT - JUSTIFIED
// Requires: Framer Motion animations, event handlers for download/actions
// Displays download results with interactive elements

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Music, Instagram, FileVideo, HardDrive, Clock, FileType } from 'lucide-react';
import { DownloadResult } from '@/lib/types';

interface HeroResultCardProps {
  result: DownloadResult;
  playSound: (type: 'hover' | 'click' | 'success' | 'error') => void;
}

export const HeroResultCard: React.FC<HeroResultCardProps> = ({ result, playSound }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
      className="w-full max-w-5xl mt-12"
    >
      {/* Result Card Container */}
      <div className="bg-base-300 p-[1px] relative overflow-hidden clip-corner shadow-2xl">
        
        {/* Tech Deco Lines */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-base-500/50 to-transparent z-10" />
        
        <div className="bg-base-400 grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-[1px] border border-base-300 relative z-0">
          
          {/* Left Column: Thumbnail */}
          <div className="md:col-span-5 relative group bg-black overflow-hidden aspect-[4/5] md:aspect-auto min-h-[400px]">
            <img src={result.thumbnail} alt="Thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 scale-100 group-hover:scale-105" />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-base-400 via-transparent to-transparent opacity-90" />
            
            {/* Floating Tech Badge */}
            <div className="absolute top-6 left-6 px-3 py-1 bg-base-500 text-base-400 font-mono text-xs font-bold tracking-widest uppercase">
              Media_Secured
            </div>

            {/* Play Icon (Decorative) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full border border-base-100/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                    <div className="w-14 h-14 bg-base-100 text-base-400 rounded-full flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(242,238,218,0.3)]">
                        <FileVideo size={28} fill="currentColor" />
                    </div>
                </div>
            </div>
          </div>
          
          {/* Right Column: Data & Actions */}
          <div className="md:col-span-7 flex flex-col h-full">
            
            {/* Header Info */}
            <div className="p-8 border-b border-base-300 bg-base-300/5 flex-grow-0">
              <div className="flex items-start justify-between mb-4">
                <span className="font-mono text-xs text-base-500 tracking-[0.2em] uppercase flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-base-500 rounded-full" /> 
                   Target Identified
                </span>
                <div className="flex gap-1">
                    <div className="w-1 h-1 bg-base-500 rounded-full animate-pulse" />
                    <div className="w-1 h-1 bg-base-500 rounded-full animate-pulse delay-75" />
                    <div className="w-1 h-1 bg-base-500 rounded-full animate-pulse delay-150" />
                </div>
              </div>
              <h3 className="font-display text-4xl md:text-5xl text-base-100 mb-2 leading-[0.85]">{result.title}</h3>
              <p className="font-mono text-base-200 text-sm tracking-wide">AUTHOR: {result.author}</p>
            </div>

            {/* Technical Stats Grid */}
            <div className="grid grid-cols-3 divide-x divide-base-300 border-b border-base-300 bg-base-400 flex-grow-0">
                <div className="p-5 flex flex-col items-center justify-center gap-2 hover:bg-base-300/10 transition-colors">
                    <HardDrive size={20} className="text-base-500" strokeWidth={1.5} />
                    <div className="text-center">
                        <span className="block font-mono text-base-100 text-sm font-bold">24.5 MB</span>
                        <span className="block text-[10px] text-base-200 uppercase tracking-widest mt-1">File Size</span>
                    </div>
                </div>
                <div className="p-5 flex flex-col items-center justify-center gap-2 hover:bg-base-300/10 transition-colors">
                    <Clock size={20} className="text-base-500" strokeWidth={1.5} />
                    <div className="text-center">
                        <span className="block font-mono text-base-100 text-sm font-bold">00:45</span>
                        <span className="block text-[10px] text-base-200 uppercase tracking-widest mt-1">Duration</span>
                    </div>
                </div>
                <div className="p-5 flex flex-col items-center justify-center gap-2 hover:bg-base-300/10 transition-colors">
                    <FileType size={20} className="text-base-500" strokeWidth={1.5} />
                    <div className="text-center">
                        <span className="block font-mono text-base-100 text-sm font-bold">MP4 / HD</span>
                        <span className="block text-[10px] text-base-200 uppercase tracking-widest mt-1">Format</span>
                    </div>
                </div>
            </div>

            {/* Action Area */}
            <div className="p-8 flex flex-col gap-6 justify-center bg-base-400 flex-grow">
              
              {/* Primary Download Button - Massive */}
              <a 
                href={result.downloadUrl} 
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('success')}
                className="group relative w-full h-20 bg-base-500 flex items-center justify-between px-8 overflow-hidden transition-all hover:bg-[#ff7a4d] clip-corner shadow-[0_0_20px_rgba(238,100,54,0.15)] hover:shadow-[0_0_30px_rgba(238,100,54,0.4)]"
              >
                 <div className="relative z-10 flex flex-col items-start gap-1">
                    <span className="font-mono text-[10px] text-base-400/80 font-bold tracking-[0.2em] uppercase group-hover:text-base-400">Secure Link Ready</span>
                    <span className="font-display text-3xl text-base-400 leading-none mt-0.5">DOWNLOAD FILE</span>
                 </div>
                 <div className="relative z-10 w-12 h-12 bg-base-400/20 flex items-center justify-center rounded-sm group-hover:bg-base-400/30 transition-colors border border-base-400/10">
                    <Download className="text-base-400 w-7 h-7" />
                 </div>
                 
                 {/* Button Scanline */}
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </a>

              {/* Secondary Options */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                    onMouseEnter={() => playSound('hover')}
                    onClick={() => playSound('click')}
                    className="h-14 border border-base-300 hover:border-base-500/50 flex items-center justify-center gap-3 text-base-200 hover:text-base-100 hover:bg-base-300/10 transition-all text-xs font-mono uppercase tracking-widest group"
                >
                    <Music size={16} className="group-hover:text-base-500 transition-colors" /> 
                    <span>Extract Audio</span>
                </button>
                <button 
                    onMouseEnter={() => playSound('hover')}
                    onClick={() => playSound('click')}
                    className="h-14 border border-base-300 hover:border-base-500/50 flex items-center justify-center gap-3 text-base-200 hover:text-base-100 hover:bg-base-300/10 transition-all text-xs font-mono uppercase tracking-widest group"
                >
                     <Instagram size={16} className="group-hover:text-base-500 transition-colors" />
                     <span>Save Cover</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
