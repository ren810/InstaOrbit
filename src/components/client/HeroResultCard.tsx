"use client";

// ✅ CLIENT COMPONENT - JUSTIFIED
// Requires: Framer Motion animations, event handlers for download/actions
// Displays download results with interactive elements

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Music, Instagram, FileVideo, HardDrive, Clock, FileType, ChevronLeft, ChevronRight, Layers, User } from 'lucide-react';
import { DownloadResult } from '@/lib/types';

interface HeroResultCardProps {
  result: DownloadResult;
  playSound: (type: 'hover' | 'click' | 'success' | 'error') => void;
}

export const HeroResultCard: React.FC<HeroResultCardProps> = ({ result, playSound }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState('');
  const [showFullCaption, setShowFullCaption] = useState(false);
  
  // Simplified carousel detection - check mediaUrls array directly
  const mediaUrls = result.mediaUrls || [];
  const isCarousel = mediaUrls.length > 1;
  const currentMedia = isCarousel ? mediaUrls[currentIndex] : null;
  const displayThumbnail = currentMedia?.thumbnail || result.thumbnail;
  const displayUrl = currentMedia?.url || result.downloadUrl;
  const displayType = currentMedia?.type || result.type;

  // Proxy Instagram URLs to bypass CORS
  const getProxiedImageUrl = (url: string) => {
    return `/api/proxy-image?url=${encodeURIComponent(url)}`;
  };

  const proxiedThumbnail = getProxiedImageUrl(displayThumbnail);

  // Preload images when carousel changes
  useEffect(() => {
    if (isCarousel && mediaUrls.length > 0) {
      // Preload current, next, and previous images through proxy
      const preloadImages = [
        currentIndex,
        (currentIndex + 1) % mediaUrls.length,
        (currentIndex - 1 + mediaUrls.length) % mediaUrls.length
      ];
      
      preloadImages.forEach(index => {
        const img = new Image();
        img.src = getProxiedImageUrl(mediaUrls[index].thumbnail);
      });
    }
  }, [currentIndex, isCarousel, mediaUrls]);

  // Reset loaded state when image changes
  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  // Debug logging
  console.log('Carousel Debug:', {
    isCarousel,
    mediaCount: mediaUrls.length,
    currentIndex,
    displayThumbnail,
    imageLoaded
  });

  const handlePrev = () => {
    if (isCarousel && !isTransitioning) {
      setIsTransitioning(true);
      const newIndex = currentIndex === 0 ? mediaUrls.length - 1 : currentIndex - 1;
      console.log('Moving to previous:', newIndex);
      setCurrentIndex(newIndex);
      playSound('click');
      // Reset transition lock quickly
      setTimeout(() => setIsTransitioning(false), 100);
    }
  };

  const handleNext = () => {
    if (isCarousel && !isTransitioning) {
      setIsTransitioning(true);
      const newIndex = currentIndex === mediaUrls.length - 1 ? 0 : currentIndex + 1;
      console.log('Moving to next:', newIndex);
      setCurrentIndex(newIndex);
      playSound('click');
      // Reset transition lock quickly
      setTimeout(() => setIsTransitioning(false), 100);
    }
  };

  const downloadAll = async () => {
    if (isCarousel) {
      playSound('success');
      setDownloadingAll(true);
      for (let i = 0; i < mediaUrls.length; i++) {
        setDownloadProgress(`Downloading ${i + 1} of ${mediaUrls.length}...`);
        await downloadMedia(mediaUrls[i].url, `instagram_${i + 1}.${mediaUrls[i].type === 'video' ? 'mp4' : 'jpg'}`);
        // Wait 1 second between downloads to avoid rate limiting
        if (i < mediaUrls.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      setDownloadingAll(false);
      setDownloadProgress('');
    }
  };

  const downloadMedia = async (url: string, filename: string) => {
    try {
      // Use our server-side download proxy to bypass CORS
      const response = await fetch('/api/download-media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      // Get the media as blob from our proxy
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

  const handleDownloadCurrent = async () => {
    playSound('success');
    setDownloading(true);
    setDownloadProgress('Preparing download...');
    const filename = isCarousel 
      ? `instagram_${currentIndex + 1}.${displayType === 'video' ? 'mp4' : 'jpg'}`
      : `instagram.${displayType === 'video' ? 'mp4' : 'jpg'}`;
    await downloadMedia(displayUrl, filename);
    setDownloading(false);
    setDownloadProgress('');
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
            {/* Loading indicator */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-base-400/50 backdrop-blur-sm z-30">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-base-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-base-100 font-mono text-sm">Loading image {currentIndex + 1}...</p>
                </div>
              </div>
            )}
            
            <img 
              key={`img-${currentIndex}-${displayThumbnail}`}
              src={proxiedThumbnail}
              alt={result.title || "Instagram media"} 
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-200"
              onLoad={() => {
                console.log('Image loaded:', currentIndex, proxiedThumbnail);
                setImageLoaded(true);
              }}
              onError={(e) => {
                console.error('Image failed to load:', currentIndex, proxiedThumbnail, e);
                setImageLoaded(true);
              }}
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
                  disabled={isTransitioning}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-base-400/90 backdrop-blur-sm border border-base-300 hover:bg-base-500 hover:border-base-500 transition-all flex items-center justify-center z-20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-6 h-6 text-base-100" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={isTransitioning}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-base-400/90 backdrop-blur-sm border border-base-300 hover:bg-base-500 hover:border-base-500 transition-all flex items-center justify-center z-20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-6 h-6 text-base-100" />
                </button>
                
                {/* Dot indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {mediaUrls.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (!isTransitioning && index !== currentIndex) {
                          setIsTransitioning(true);
                          setCurrentIndex(index);
                          playSound('click');
                          setTimeout(() => setIsTransitioning(false), 100);
                        }
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex 
                          ? 'bg-base-500 w-6' 
                          : 'bg-base-300 hover:bg-base-200'
                      }`}
                    />
                  ))}
                </div>
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
              <div className="mb-3">
                <h3 
                  className={`font-display text-3xl md:text-4xl text-base-100 leading-tight ${
                    !showFullCaption ? 'line-clamp-2' : ''
                  }`}
                >
                  {result.caption || result.title}
                </h3>
                {(result.caption || result.title) && (result.caption || result.title).length > 100 && (
                  <button
                    onClick={() => setShowFullCaption(!showFullCaption)}
                    className="mt-2 text-xs font-mono text-base-500 hover:text-base-100 transition-colors uppercase tracking-wider"
                  >
                    {showFullCaption ? '← Show Less' : 'Show More →'}
                  </button>
                )}
              </div>
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
                disabled={downloading || downloadingAll}
                className="group relative w-full h-20 bg-base-500 flex items-center justify-between px-8 overflow-hidden transition-all hover:bg-[#ff7a4d] clip-corner shadow-[0_0_20px_rgba(238,100,54,0.15)] hover:shadow-[0_0_30px_rgba(238,100,54,0.4)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 <div className="relative z-10 flex flex-col items-start gap-1">
                    <span className="font-mono text-[10px] text-base-400/80 font-bold tracking-[0.2em] uppercase group-hover:text-base-400">
                      {downloading ? 'Downloading...' : (isCarousel ? `Download Item ${currentIndex + 1}` : 'Secure Link Ready')}
                    </span>
                    <span className="font-display text-3xl text-base-400 leading-none mt-0.5">
                      {downloading ? 'PLEASE WAIT' : `DOWNLOAD ${isCarousel ? 'CURRENT' : 'FILE'}`}
                    </span>
                 </div>
                 <div className="relative z-10 w-12 h-12 bg-base-400/20 flex items-center justify-center rounded-sm group-hover:bg-base-400/30 transition-colors border border-base-400/10">
                    {downloading ? (
                      <div className="w-7 h-7 border-3 border-base-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Download className="text-base-400 w-7 h-7" />
                    )}
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
                    disabled={downloading || downloadingAll}
                    className="h-14 border border-base-300 hover:border-base-500/50 flex items-center justify-center gap-3 text-base-200 hover:text-base-100 hover:bg-base-300/10 transition-all text-xs font-mono uppercase tracking-widest group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {downloadingAll ? (
                      <>
                        <div className="w-4 h-4 border-2 border-base-500 border-t-transparent rounded-full animate-spin" />
                        <span>{downloadProgress}</span>
                      </>
                    ) : (
                      <>
                        <Layers size={16} className="group-hover:text-base-500 transition-colors" /> 
                        <span>Download All ({mediaUrls.length})</span>
                      </>
                    )}
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
