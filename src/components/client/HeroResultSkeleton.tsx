"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const HeroResultSkeleton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ type: 'spring', stiffness: 80, damping: 14 }}
      className="w-full max-w-5xl mt-12"
    >
      <div className="bg-base-300 p-[1px] relative overflow-hidden clip-corner shadow-2xl">
        <div className="bg-base-400 grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-[1px] border border-base-300 relative z-0">

          {/* Left: image placeholder */}
          <div className="md:col-span-5 relative bg-black overflow-hidden aspect-[4/5] md:aspect-auto min-h-[400px]">
            <div className="absolute inset-0 shimmer-bg shimmer-rect" />
          </div>

          {/* Right: content placeholders */}
          <div className="md:col-span-7 flex flex-col h-full">

            <div className="p-8 border-b border-base-300 bg-base-300/5 flex-grow-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-base-500 rounded-full animate-pulse" />
                  <div className="w-40 h-3 shimmer-bg shimmer-line" />
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-base-500 rounded-full animate-pulse" />
                  <div className="w-3 h-3 bg-base-500 rounded-full animate-pulse delay-75" />
                </div>
              </div>

              <div className="mb-3">
                <div className="w-3/4 h-8 shimmer-bg shimmer-line mb-3" />
                <div className="w-1/2 h-4 shimmer-bg shimmer-line" />
              </div>

              <div className="w-1/3 h-3 shimmer-bg shimmer-line mt-4" />
            </div>

            <div className="grid grid-cols-3 divide-x divide-base-300 border-b border-base-300 bg-base-400 flex-grow-0">
              <div className="p-5 flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 shimmer-bg shimmer-rect" />
                <div className="w-24 h-3 shimmer-bg shimmer-line mt-2" />
                <div className="w-12 h-2 shimmer-bg shimmer-line mt-1" />
              </div>
              <div className="p-5 flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 shimmer-bg shimmer-rect" />
                <div className="w-24 h-3 shimmer-bg shimmer-line mt-2" />
                <div className="w-12 h-2 shimmer-bg shimmer-line mt-1" />
              </div>
              <div className="p-5 flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 shimmer-bg shimmer-rect" />
                <div className="w-24 h-3 shimmer-bg shimmer-line mt-2" />
                <div className="w-12 h-2 shimmer-bg shimmer-line mt-1" />
              </div>
            </div>

            <div className="p-8 flex flex-col gap-6 justify-center bg-base-400 flex-grow">
              <div className="w-full h-20 shimmer-bg shimmer-rect" />

              <div className="grid grid-cols-2 gap-4">
                <div className="h-14 shimmer-bg shimmer-rect" />
                <div className="h-14 shimmer-bg shimmer-rect" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};
