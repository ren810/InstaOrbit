"use client";

// ✅ CLIENT COMPONENT - JUSTIFIED
// Requires: useState for form state, event handlers, clipboard API
// Interactive form with user input and download functionality

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OrbitButton } from '@/components/client/OrbitButton';
import { DownloadState, DownloadResult } from '@/lib/types';
import { Clipboard, Instagram } from 'lucide-react';
import { useToast } from '@/components/client/ToastSystem';
import { useSciFiSound } from '@/hooks/useSciFiSound';
import { HeroResultCard } from '@/components/client/HeroResultCard';
import { SystemLog } from '@/components/client/SystemLog';
import { validateInstagramUrl } from '@/lib/validation';
import { logger } from '@/lib/logger';

export const HeroDownloadForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [state, setState] = useState<DownloadState>(DownloadState.IDLE);
  const [result, setResult] = useState<DownloadResult | null>(null);
  
  const { showToast } = useToast();
  const { playSound } = useSciFiSound();

  const handleDownload = async () => {
    if (!url) {
        showToast("Please enter a valid URL first", "error");
        playSound('error');
        return;
    }

    // Validate Instagram URL
    if (!validateInstagramUrl(url)) {
        showToast("Invalid Instagram URL. Please enter a valid Instagram post, reel, or story link.", "error");
        playSound('error');
        return;
    }
    
    setState(DownloadState.LOADING);
    playSound('click');
    
    try {
      // Call real API
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to download media');
      }

      if (data.success && data.data) {
        setResult(data.data);
        setState(DownloadState.SUCCESS);
        showToast("Media extraction successful", "success");
        playSound('success');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to download media';
      logger.error(error instanceof Error ? error : new Error(errorMessage), { url });
      
      showToast(errorMessage, "error");
      playSound('error');
      setState(DownloadState.IDLE);
      setResult(null);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      showToast("Link pasted from clipboard", "info");
      playSound('click');
    } catch (err) {
      logger.error('Failed to read clipboard', { error: err });
      showToast("Clipboard access denied", "error");
      playSound('error');
    }
  };

  return (
    <>
      {/* LARGE INPUT AREA */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-4xl mt-6 relative group"
      >
        {/* Glow Effect behind input */}
        <div className="absolute -inset-1 bg-gradient-to-r from-base-500/0 via-base-500/30 to-base-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
        
        <div className="relative flex flex-col md:flex-row bg-base-400 border border-base-300 clip-corner shadow-2xl">
          
          {/* Input Section */}
          <div className="flex-1 flex items-center h-24 border-b md:border-b-0 md:border-r border-base-300 bg-base-300/10 transition-colors focus-within:bg-base-300/20 group-focus-within:border-base-500/50">
            {/* Icon Box */}
            <div className="h-full w-24 flex items-center justify-center border-r border-base-300/50 text-base-500 bg-base-400/50">
              <Instagram className="w-10 h-10" strokeWidth={1.5} />
            </div>
            
            {/* Text Input */}
            <input 
              type="text" 
              placeholder="PASTE INSTAGRAM URL HERE..." 
              className="w-full h-full bg-transparent border-none outline-none text-base-100 font-mono text-xl md:text-2xl px-8 placeholder:text-base-200/20 uppercase tracking-wider"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            
            {/* Paste Action */}
            <button 
              onClick={handlePaste}
              onMouseEnter={() => playSound('hover')}
              className="h-full w-20 flex items-center justify-center text-base-200 hover:text-base-100 hover:bg-base-500/10 transition-colors border-l border-base-300/50"
              title="Paste from clipboard"
            >
              <Clipboard className="w-6 h-6" />
            </button>
          </div>

          {/* Action Button Section */}
          <div className="p-3 bg-base-400 flex-shrink-0 flex items-center justify-center min-w-[200px]">
              {state === DownloadState.LOADING ? (
                  <SystemLog />
              ) : (
                  <OrbitButton 
                      onClick={handleDownload} 
                      className="w-full md:w-auto h-full min-h-[72px] text-xl font-bold px-10"
                  >
                      INITIATE
                  </OrbitButton>
              )}
          </div>
        </div>
      </motion.div>

      {/* RESULT SECTION */}
      <AnimatePresence>
        {state === DownloadState.SUCCESS && result && (
          <HeroResultCard result={result} playSound={playSound} />
        )}
      </AnimatePresence>
    </>
  );
};
