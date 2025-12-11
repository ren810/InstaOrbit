"use client";

// ✅ CLIENT COMPONENT - JUSTIFIED
// Requires: Framer Motion animations, event handlers for download/actions
// Displays download results with interactive elements

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Music, Instagram, FileVideo, HardDrive, Clock, FileType, ChevronLeft, ChevronRight, Layers, User } from 'lucide-react';
import { DownloadResult } from '@/lib/types';
import Image from 'next/image';

interface HeroResultCardProps {
  result: DownloadResult;
  playSound: (type: 'hover' | 'click' | 'success' | 'error') => void;
}

export const HeroResultCard: React.FC<HeroResultCardProps> = ({ result, playSound }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Simplified carousel detection - check mediaUrls array directly
  const mediaUrls = result.mediaUrls || [];
  const isCarousel = mediaUrls.length > 1;
  const currentMedia = isCarousel ? mediaUrls[currentIndex] : null;
  const displayThumbnail = currentMedia?.thumbnail || result.thumbnail;
  const displayUrl = currentMedia?.url || result.downloadUrl;
  const displayType = currentMedia?.type || result.type;

  // Debug logging
  console.log('Carousel Debug:', {
    isCarousel,
    mediaCount: mediaUrls.length,
    resultIsCarousel: result.isCarousel,
    currentIndex
  });

  const handlePrev = () => {
    if (isCarousel) {
      setCurrentIndex((prev) => (prev === 0 ? mediaUrls.length - 1 : prev - 1));
      playSound('click');
    }
  };

  const handleNext = () => {
    if (isCarousel) {
      setCurrentIndex((prev) => (prev === mediaUrls.length - 1 ? 0 : prev + 1));
      playSound('click');
    }
  };

  const downloadAll = async () => {
    if (isCarousel) {
      playSound('success');
      for (let i = 0; i < mediaUrls.length; i++) {
        await downloadMedia(mediaUrls[i].url, `instagram_${i + 1}.${mediaUrls[i].type === 'video' ? 'mp4' : 'jpg'}`);
        // Wait 1 second between downloads to avoid rate limiting
        if (i < mediaUrls.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
  };

  const downloadMedia = async (url: string, filename: string) => {
    try {
      // Fetch the media as blob to bypass CORS
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create temporary link and trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up blob URL
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      window.open(url, '_blank');
    }
  };

  const handleDownloadCurrent = () => {
    playSound('success');
    const filename = isCarousel 
      ? `instagram_${currentIndex + 1}.${displayType === 'video' ? 'mp4' : 'jpg'}`
      : `instagram.${displayType === 'video' ? 'mp4' : 'jpg'}`;
    downloadMedia(displayUrl, filename);
  };

  const handleDownloadThumbnail = () => {
    playSound('click');
    downloadMedia(displayThumbnail, `instagram_thumbnail.jpg`);
  };
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
            <Image 
              src={displayThumbnail} 
              alt={result.title || "Instagram media"} 
              fill
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-base-400 via-transparent to-transparent opacity-90" />
            
            {/* Carousel Badge */}
            {isCarousel && (
              <div className="absolute top-6 left-6 px-3 py-1 bg-base-500 text-base-400 font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                <Layers className="w-3 h-3" />
                {currentIndex + 1}/{mediaUrls.length} CAROUSEL
              </div>
            )}

            {/* Media Type Badge */}
            {!isCarousel && (
              <div className="absolute top-6 left-6 px-3 py-1 bg-base-500 text-base-400 font-mono text-xs font-bold tracking-widest uppercase">
                {displayType?.toUpperCase() || 'MEDIA'}_SECURED
              </div>
            )}

            {/* Carousel Navigation */}
            {isCarousel && mediaUrls.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-base-400/80 backdrop-blur-sm border border-base-300 hover:bg-base-500 hover:border-base-500 transition-all flex items-center justify-center z-10 group-hover:opacity-100 opacity-0"
                >
                  <ChevronLeft className="w-6 h-6 text-base-100" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-base-400/80 backdrop-blur-sm border border-base-300 hover:bg-base-500 hover:border-base-500 transition-all flex items-center justify-center z-10 group-hover:opacity-100 opacity-0"
                >
                  <ChevronRight className="w-6 h-6 text-base-100" />
                </button>
              </>
            )}

            {/* Play Icon (Decorative for videos) */}
            {displayType === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 rounded-full border border-base-100/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                      <div className="w-14 h-14 bg-base-100 text-base-400 rounded-full flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(242,238,218,0.3)]">
                          <FileVideo size={28} fill="currentColor" />
                      </div>
                  </div>
              </div>
            )}
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
              <h3 className="font-display text-3xl md:text-4xl text-base-100 mb-3 leading-tight">
                {result.caption || result.title}
              </h3>
              <p className="font-mono text-base-200 text-sm tracking-wide flex items-center gap-2">
                <User className="w-4 h-4" />
                {result.username || result.author}
              </p>
            </div>

            {/* Technical Stats Grid */}
            <div className="grid grid-cols-3 divide-x divide-base-300 border-b border-base-300 bg-base-400 flex-grow-0">
                <div className="p-5 flex flex-col items-center justify-center gap-2 hover:bg-base-300/10 transition-colors">
                    <FileType size={20} className="text-base-500" strokeWidth={1.5} />
                    <div className="text-center">
                        <span className="block font-mono text-base-100 text-sm font-bold uppercase">
                          {displayType || result.type || 'MEDIA'}
                        </span>
                        <span className="block text-[10px] text-base-200 uppercase tracking-widest mt-1">Type</span>
                    </div>
                </div>
                <div className="p-5 flex flex-col items-center justify-center gap-2 hover:bg-base-300/10 transition-colors">
                    <HardDrive size={20} className="text-base-500" strokeWidth={1.5} />
                    <div className="text-center">
                        <span className="block font-mono text-base-100 text-sm font-bold">
                          {currentMedia?.quality || result.quality || 'HD'}
                        </span>
                        <span className="block text-[10px] text-base-200 uppercase tracking-widest mt-1">Quality</span>
                    </div>
                </div>
                <div className="p-5 flex flex-col items-center justify-center gap-2 hover:bg-base-300/10 transition-colors">
                    {isCarousel ? <Layers size={20} className="text-base-500" strokeWidth={1.5} /> : <Clock size={20} className="text-base-500" strokeWidth={1.5} />}
                    <div className="text-center">
                        <span className="block font-mono text-base-100 text-sm font-bold">
                          {isCarousel ? `${mediaUrls.length} ITEMS` : 'READY'}
                        </span>
                        <span className="block text-[10px] text-base-200 uppercase tracking-widest mt-1">
                          {isCarousel ? 'Count' : 'Status'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Area */}
            <div className="p-8 flex flex-col gap-6 justify-center bg-base-400 flex-grow">
              
              {/* Primary Download Button */}
              <button
                onClick={handleDownloadCurrent}
                onMouseEnter={() => playSound('hover')}
                className="group relative w-full h-20 bg-base-500 flex items-center justify-between px-8 overflow-hidden transition-all hover:bg-[#ff7a4d] clip-corner shadow-[0_0_20px_rgba(238,100,54,0.15)] hover:shadow-[0_0_30px_rgba(238,100,54,0.4)] cursor-pointer"
              >
                 <div className="relative z-10 flex flex-col items-start gap-1">
                    <span className="font-mono text-[10px] text-base-400/80 font-bold tracking-[0.2em] uppercase group-hover:text-base-400">
                      {isCarousel ? `Download Item ${currentIndex + 1}` : 'Secure Link Ready'}
                    </span>
                    <span className="font-display text-3xl text-base-400 leading-none mt-0.5">
                      DOWNLOAD {isCarousel ? 'CURRENT' : 'FILE'}
                    </span>
                 </div>
                 <div className="relative z-10 w-12 h-12 bg-base-400/20 flex items-center justify-center rounded-sm group-hover:bg-base-400/30 transition-colors border border-base-400/10">
                    <Download className="text-base-400 w-7 h-7" />
                 </div>
                 
                 {/* Button Scanline */}
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </button>

              {/* Secondary Options */}
              <div className="grid grid-cols-2 gap-4">
                {isCarousel ? (
                  <button
                    onClick={downloadAll}
                    onMouseEnter={() => playSound('hover')}
                    className="h-14 border border-base-300 hover:border-base-500/50 flex items-center justify-center gap-3 text-base-200 hover:text-base-100 hover:bg-base-300/10 transition-all text-xs font-mono uppercase tracking-widest group cursor-pointer"
                  >
                    <Layers size={16} className="group-hover:text-base-500 transition-colors" /> 
                    <span>Download All ({mediaUrls.length})</span>
                  </button>
                ) : (
                  <a
                    href={displayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => playSound('hover')}
                    onClick={() => playSound('click')}
                    className="h-14 border border-base-300 hover:border-base-500/50 flex items-center justify-center gap-3 text-base-200 hover:text-base-100 hover:bg-base-300/10 transition-all text-xs font-mono uppercase tracking-widest group"
                  >
                    <FileVideo size={16} className="group-hover:text-base-500 transition-colors" /> 
                    <span>Preview Media</span>
                  </a>
                )}
                <button
                    onClick={handleDownloadThumbnail}
                    onMouseEnter={() => playSound('hover')}
                    className="h-14 border border-base-300 hover:border-base-500/50 flex items-center justify-center gap-3 text-base-200 hover:text-base-100 hover:bg-base-300/10 transition-all text-xs font-mono uppercase tracking-widest group cursor-pointer"
                >
                     <Instagram size={16} className="group-hover:text-base-500 transition-colors" />
                     <span>Save Thumbnail</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
