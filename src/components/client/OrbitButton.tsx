"use client";

import React from 'react';
import clsx from 'clsx';
import { useSciFiSound } from '@/hooks/useSciFiSound';

interface OrbitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  isLoading?: boolean;
}

export const OrbitButton: React.FC<OrbitButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className,
  isLoading,
  onClick,
  ...props 
}) => {
  const { playSound } = useSciFiSound();

  const handleMouseEnter = () => {
    playSound('hover');
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSound('click');
    if (onClick) onClick(e);
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={clsx(
        "relative group inline-flex items-center justify-center",
        "min-w-[200px] h-[65px] px-8",
        "font-mono text-sm tracking-[1.8px] uppercase",
        "bg-base-400 border border-base-300",
        "transition-all duration-300 ease-out",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        // Text Colors
        "text-base-200 hover:text-base-100",
        // Text Shadow on Hover
        "hover:[text-shadow:0_0_10px_rgba(242,238,218,0.2)]",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {/* Top Line */}
      <span className={clsx(
        "absolute top-0 left-[10%] w-[60px] h-[1px] -translate-y-[1px] bg-base-100 transition-all duration-300",
        "group-hover:left-0 group-hover:w-[20px]"
      )} />
      
      {/* Bottom Line */}
      <span className={clsx(
        "absolute bottom-0 right-[10%] w-[60px] h-[1px] translate-y-[1px] bg-base-100 transition-all duration-300",
        "group-hover:right-0 group-hover:w-[20px]"
      )} />

      {/* Side Decoration Lines Container */}
      <span className="absolute inset-0 pointer-events-none w-full h-full block">
        {/* Right Vertical */}
        <span className={clsx(
          "absolute bottom-[30%] -right-[1px] w-[1px] h-[20px] bg-base-100 transition-all duration-300",
          "group-hover:-bottom-[1px]"
        )} />
        {/* Left Vertical */}
        <span className={clsx(
          "absolute top-[30%] -left-[1px] w-[1px] h-[20px] bg-base-100 transition-all duration-300",
          "group-hover:-top-[1px]"
        )} />
      </span>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {isLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-base-200 border-t-base-500 rounded-full animate-spin" />
            <span>PROCESSING</span>
          </>
        ) : children}
      </span>
    </button>
  );
};