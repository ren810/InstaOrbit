"use client";

// ✅ CLIENT COMPONENT - JUSTIFIED
// Requires: useState, useEffect for simulated log animation
// Displays loading state with animated terminal-like logs

import React from 'react';
import { motion } from 'framer-motion';

export const SystemLog = () => {
    const [lines, setLines] = React.useState<string[]>([]);
    
    React.useEffect(() => {
        const logs = [
            "INITIALIZING HANDSHAKE PROTOCOL...",
            "BYPASSING ENCRYPTION LAYER...",
            "RESOLVING MEDIA PACKETS...",
            "CHUNK_SIZE: 1024KB [OPTIMIZED]",
            "EXTRACTION COMPLETE."
        ];
        let delay = 0;
        logs.forEach((log, index) => {
            delay += Math.random() * 500 + 200;
            setTimeout(() => {
                setLines(prev => [...prev.slice(-3), `> ${log}`]);
            }, delay);
        });
    }, []);

    return (
        <div className="font-mono text-xs text-base-500 flex flex-col items-start gap-1 min-w-[200px]">
            {lines.map((line, i) => (
                <motion.span 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="opacity-70"
                >
                    {line}
                </motion.span>
            ))}
            <span className="w-2 h-4 bg-base-500 animate-pulse inline-block" />
        </div>
    );
};
