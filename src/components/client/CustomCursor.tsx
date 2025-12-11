"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  // 1. Track raw mouse coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // 2. Apply physics to create the smooth "GSAP-like" delay
  // stiffness: 150, damping: 15 creates a smooth, fluid follow without being too slow
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const moveCursor = (e: MouseEvent) => {
      // We set the raw coordinates.
      // The centering happens in the style prop via translateX/Y: "-50%"
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') || 
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('clickable');

      setIsHovering(!!isClickable);
    };
    
    const handleMouseOut = (e: MouseEvent) => {
        if (!e.relatedTarget) {
            setIsVisible(false);
        }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
        <style jsx global>{`
            @media (pointer: fine) {
                body, a, button, input, textarea, [role="button"] { 
                    cursor: none !important; 
                }
            }
            @media (pointer: coarse) {
                .custom-cursor { display: none !important; }
            }
        `}</style>
        
        <motion.div
            className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: "-50%", // Matches your requested CSS implementation
                translateY: "-50%", // Matches your requested CSS implementation
                width: "2.5vw",     // Matches your requested size logic
                height: "2.5vw",    // Matches your requested size logic
                minWidth: "32px",   // Min size for usability
                minHeight: "32px",
            }}
            initial={{ opacity: 0 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isHovering ? 1.5 : 1,
                rotate: isHovering ? 45 : 0
            }}
            transition={{
                opacity: { duration: 0.2 },
                scale: { type: "spring", stiffness: 300, damping: 20 },
                rotate: { type: "spring", stiffness: 300, damping: 20 }
            }}
        >
            {/* 
              Sci-Fi Reticle Design 
              We keep the internal design exactly as before, just wrapped in the new movement logic
            */}
            <div className="relative w-full h-full">
                {/* Corners */}
                <div className="absolute top-0 left-0 w-[20%] h-[2px] bg-base-500" />
                <div className="absolute top-0 left-0 w-[2px] h-[20%] bg-base-500" />
                
                <div className="absolute top-0 right-0 w-[20%] h-[2px] bg-base-500" />
                <div className="absolute top-0 right-0 w-[2px] h-[20%] bg-base-500" />
                
                <div className="absolute bottom-0 left-0 w-[20%] h-[2px] bg-base-500" />
                <div className="absolute bottom-0 left-0 w-[2px] h-[20%] bg-base-500" />
                
                <div className="absolute bottom-0 right-0 w-[20%] h-[2px] bg-base-500" />
                <div className="absolute bottom-0 right-0 w-[2px] h-[20%] bg-base-500" />
                
                {/* Center Dot (disappears on hover) */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-base-100 rounded-full transition-opacity duration-200 ${isHovering ? 'opacity-0' : 'opacity-100'}`} />
                
                {/* Hover Ring (appears on hover) */}
                <div className={`absolute inset-0 border border-base-500 rounded-full transition-opacity duration-200 ${isHovering ? 'opacity-30' : 'opacity-0'}`} />
            </div>
        </motion.div>
    </>
  );
};