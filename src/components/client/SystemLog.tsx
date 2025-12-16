"use client";

// ✅ CLIENT COMPONENT - JUSTIFIED
// Requires: useState, useEffect for simulated log animation
// Displays loading state with animated terminal-like logs

import React from 'react';
import { motion } from 'framer-motion';

interface SystemLogProps {
    isComplete?: boolean; // Pass true when API response is received
}

export const SystemLog: React.FC<SystemLogProps> = ({ isComplete = false }) => {
    const [lines, setLines] = React.useState<string[]>([]);
    const [dotCount, setDotCount] = React.useState(0);

    // Initial connection logs
    React.useEffect(() => {
        const initialLogs = [
            "INITIALIZING CONNECTION...",
            "ESTABLISHING SECURE TUNNEL...",
            "HANDSHAKE PROTOCOL ACTIVE..."
        ];

        let delay = 0;
        initialLogs.forEach((log) => {
            delay += Math.random() * 400 + 150;
            setTimeout(() => {
                setLines(prev => [...prev.slice(-3), `> ${log}`]);
            }, delay);
        });
    }, []);

    // Animated extracting dots while waiting
    React.useEffect(() => {
        if (isComplete) return;

        const interval = setInterval(() => {
            setDotCount(prev => (prev + 1) % 4);
        }, 400);

        return () => clearInterval(interval);
    }, [isComplete]);

    // Add completion message only when actually complete
    React.useEffect(() => {
        if (isComplete) {
            setLines(prev => [...prev.slice(-2), "> EXTRACTION COMPLETE ✓"]);
        }
    }, [isComplete]);

    const extractingText = isComplete
        ? null
        : `> EXTRACTING MEDIA${'.'.repeat(dotCount)}`;

    return (
        <div className="font-mono text-xs text-base-500 flex flex-col items-start gap-1 min-w-[200px]">
            {lines.map((line, i) => (
                <motion.span
                    key={`${i}-${line}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={line.includes('COMPLETE') ? 'text-green-500 opacity-100' : 'opacity-70'}
                >
                    {line}
                </motion.span>
            ))}
            {extractingText && (
                <motion.span
                    key="extracting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="opacity-90 text-base-500"
                >
                    {extractingText}
                </motion.span>
            )}
            <span className="w-2 h-4 bg-base-500 animate-pulse inline-block" />
        </div>
    );
};
