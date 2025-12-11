import { useCallback, useRef } from 'react';

export const useSciFiSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (typeof window === 'undefined') return;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playSound = useCallback((type: 'hover' | 'click' | 'success' | 'error') => {
    if (typeof window === 'undefined') return;
    
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'hover') {
      // High pitched, short blip
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
      
      gainNode.gain.setValueAtTime(0.02, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      
      osc.start(now);
      osc.stop(now + 0.05);
    } 
    else if (type === 'click') {
      // Techy "thud" or "click"
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      
      osc.start(now);
      osc.stop(now + 0.1);
    }
    else if (type === 'success') {
      // Ascending arpeggio
      const frequencies = [440, 554, 659, 880]; // A Major
      frequencies.forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        
        o.type = 'square';
        o.frequency.value = freq;
        
        const startTime = now + i * 0.05;
        g.gain.setValueAtTime(0, startTime);
        g.gain.linearRampToValueAtTime(0.05, startTime + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
        
        o.start(startTime);
        o.stop(startTime + 0.3);
      });
    }
    else if (type === 'error') {
      // Low buzz
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.linearRampToValueAtTime(50, now + 0.3);
      
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.linearRampToValueAtTime(0.001, now + 0.3);
      
      osc.start(now);
      osc.stop(now + 0.3);
    }

  }, []);

  return { playSound };
};