"use client";

// ✅ CLIENT COMPONENT - JUSTIFIED
// Requires: useState for form state, event handlers, clipboard API
// Interactive form with user input and download functionality

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OrbitButton } from '@/components/client/OrbitButton';
import { DownloadState, DownloadResult } from '@/lib/types';
import { MOCK_RESULT } from '@/lib/constants';
import { Clipboard, Instagram } from 'lucide-react';
import { useToast } from '@/components/client/ToastSystem';
import { useSciFiSound } from '@/hooks/useSciFiSound';
import { HeroResultCard } from '@/components/client/HeroResultCard';
import { SystemLog } from '@/components/client/SystemLog';

export const HeroDownloadForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [state, setState] = useState<DownloadState>(DownloadState.IDLE);
  const [result, setResult] = useState<DownloadResult | null>(null);
  
  const { showToast } = useToast();
  const { playSound } = useSciFiSound();

  const handleDownload = async () => {
    if (!url) {
        showToast("Please enter a valid URL first", "error");
        return;
    }
    
    setState(DownloadState.LOADING);
    
    // Simulate API call
    setTimeout(() => {
      setResult(MOCK_RESULT);
      setState(DownloadState.SUCCESS);
      showToast("Media extraction successful", "success");
    }, 2500);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      showToast("Link pasted from clipboard", "info");
      playSound('click');
    } catch (err) {
      console.error('Failed to read clipboard');
      showToast("Clipboard access denied", "error");
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
