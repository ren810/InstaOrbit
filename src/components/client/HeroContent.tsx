"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface HeroContentProps {
    children: React.ReactNode;
}

export const HeroContent: React.FC<HeroContentProps> = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center gap-12"
        >
            {children}
        </motion.div>
    );
};
