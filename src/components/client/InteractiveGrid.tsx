"use client";

import React, { useEffect, useRef } from 'react';

const GRID_BLOCK_SIZE = 60;
const GRID_HIGHLIGHT_DURATION = 300;

interface GridBlock {
  element: HTMLDivElement;
  x: number;
  y: number;
  gridX: number;
  gridY: number;
  highlightEndTime: number;
}

export const InteractiveGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<GridBlock[]>([]);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef<{ x: number | undefined; y: number | undefined; radius: number }>({
    x: undefined,
    y: undefined,
    radius: GRID_BLOCK_SIZE * 2,
  });

  useEffect(() => {
    // Safety check for server-side rendering
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;

    const createBlock = (posX: number, posY: number, gridX: number, gridY: number) => {
      const el = document.createElement('div');
      el.classList.add('absolute', 'border', 'border-base-300/[0.3]', 'box-border', 'transition-colors', 'duration-300', 'ease-out');
      el.style.width = `${GRID_BLOCK_SIZE}px`;
      el.style.height = `${GRID_BLOCK_SIZE}px`;
      el.style.left = `${posX}px`;
      el.style.top = `${posY}px`;
      
      container.appendChild(el);

      return {
        element: el,
        x: posX + GRID_BLOCK_SIZE / 2,
        y: posY + GRID_BLOCK_SIZE / 2,
        gridX,
        gridY,
        highlightEndTime: 0,
      };
    };

    const initGrid = () => {
      container.innerHTML = '';
      blocksRef.current = [];

      const width = window.innerWidth;
      const height = window.innerHeight;

      const cols = Math.ceil(width / GRID_BLOCK_SIZE);
      const rows = Math.ceil(height / GRID_BLOCK_SIZE);

      const offsetX = (width - cols * GRID_BLOCK_SIZE) / 2;
      const offsetY = (height - rows * GRID_BLOCK_SIZE) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const block = createBlock(
            c * GRID_BLOCK_SIZE + offsetX,
            r * GRID_BLOCK_SIZE + offsetY,
            c,
            r
          );
          blocksRef.current.push(block);
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      addHighlights();
    };

    const handleMouseOut = () => {
      mouseRef.current.x = undefined;
      mouseRef.current.y = undefined;
    };

    const addHighlights = () => {
      const mouse = mouseRef.current;
      if (mouse.x === undefined || mouse.y === undefined) return;

      // Find closest block
      let closestBlock: GridBlock | null = null;
      let minDist = Infinity;

      for (const block of blocksRef.current) {
        const dx = mouse.x - block.x;
        const dy = mouse.y - block.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < minDist) {
          minDist = dist;
          closestBlock = block;
        }
      }

      if (closestBlock && minDist < mouse.radius) {
        const now = Date.now();
        closestBlock.element.style.borderColor = '#ee6436'; // base-500
        closestBlock.element.style.boxShadow = '0 0 15px rgba(238, 100, 54, 0.15)';
        closestBlock.highlightEndTime = now + GRID_HIGHLIGHT_DURATION;
      }
    };

    const animate = () => {
      const now = Date.now();
      blocksRef.current.forEach(block => {
        if (block.highlightEndTime > 0 && now > block.highlightEndTime) {
          block.element.style.borderColor = ''; 
          block.element.style.boxShadow = '';
          block.highlightEndTime = 0;
        }
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    initGrid();
    window.addEventListener('resize', initGrid);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', initGrid);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-screen -z-10 pointer-events-none overflow-hidden"
    />
  );
};