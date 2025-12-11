"use client";

// ✅ CLIENT COMPONENT - JUSTIFIED
// Requires: Framer Motion hooks (useScroll, useTransform) for scroll animations
// Interactive scroll-based text reveal effect

import React, { useRef } from 'react';
import { HOW_TO_STEPS } from '@/lib/constants';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// --- Scroll Text Component ---
const ScrollRevealText = ({ text, className }: { text: string; className?: string }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 90%", "end 50%"]
  });

  const words = text.split(" ");

  return (
    <p ref={container} className={`${className} flex flex-wrap justify-end md:justify-start`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return (
             <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} />
        );
      })}
    </p>
  );
};

interface WordProps {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}

const Word: React.FC<WordProps> = ({ word, range, progress }) => {
    return (
        <span className="inline-block mr-[0.25em] whitespace-nowrap">
            {word.split("").map((char, i) => {
                 const charStart = range[0] + (i / word.length) * (range[1] - range[0]);
                 const charEnd = range[0] + ((i + 1) / word.length) * (range[1] - range[0]);
                 return <Char key={i} char={char} range={[charStart, charEnd]} progress={progress} />
            })}
        </span>
    )
}

interface CharProps {
  char: string;
  range: [number, number];
  progress: MotionValue<number>;
}

const Char: React.FC<CharProps> = ({ char, range, progress }) => {
    // Animates from Dark Gray (#262626) to Cream (#f2eeda)
    const color = useTransform(progress, range, ["#262626", "#f2eeda"]); 
    return <motion.span style={{ color }}>{char}</motion.span>
}

export const HowItWorksClient: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-base-400 relative border-t border-base-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-base-100 font-display text-5xl md:text-7xl mb-6">Operation Manual</h2>
            <div className="w-24 h-1 bg-base-500" />
          </div>
          
          <div className="max-w-md text-right md:text-left">
            <ScrollRevealText 
                text="THREE-STEP PROTOCOL FOR DATA EXTRACTION. FOLLOW SEQUENCE FOR OPTIMAL RESULTS."
                className="font-mono text-base md:text-lg leading-relaxed uppercase"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_TO_STEPS.map((item, idx) => (
            <div key={idx} className="group relative bg-base-300/20 border border-base-300 p-8 hover:border-base-500 transition-colors duration-300">
              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-base-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-base-500 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="mb-8 flex justify-between items-start">
                <span className="font-display text-6xl text-base-300 group-hover:text-base-500 transition-colors select-none">
                  {item.step}
                </span>
                <div className="p-3 bg-base-300 rounded-sm text-base-200 group-hover:text-base-100 transition-colors">
                  <item.icon size={24} />
                </div>
              </div>

              <h3 className="font-mono text-xl text-base-100 mb-4 uppercase tracking-wider">{item.title}</h3>
              <p className="font-body text-base-200 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
