"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { useSciFiSound } from '@/hooks/useSciFiSound';

interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error';
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  showToast: (message: string, type?: 'info' | 'success' | 'error', action?: Toast['action']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const { playSound } = useSciFiSound();

  const showToast = (message: string, type: 'info' | 'success' | 'error' = 'info', action?: Toast['action']) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, type, action }]);
    
    if (type === 'error') playSound('error');
    else if (type === 'success') playSound('success');
    else playSound('hover');

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Clipboard Detection on Window Focus
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleFocus = async () => {
      try {
        const text = await navigator.clipboard.readText();
        const instagramRegex = /(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv|stories)\/[a-zA-Z0-9_-]+\/?/i;
        
        if (instagramRegex.test(text)) {
            // Check if we already have a toast for this
            const alreadyShown = toasts.some(t => t.message.includes("Instagram link detected"));
            if (!alreadyShown) {
                showToast("Instagram link detected in clipboard", "info", {
                    label: "PASTE",
                    onClick: () => {
                        const input = document.querySelector('input');
                        if (input) {
                            // React specific way to set input value
                            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
                            nativeInputValueSetter?.call(input, text);
                            input.dispatchEvent(new Event('input', { bubbles: true }));
                            playSound('click');
                        }
                    }
                });
            }
        }
      } catch (err) {
        // Clipboard permission denied or empty
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [toasts, playSound]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="pointer-events-auto min-w-[300px] bg-base-400 border border-base-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] p-[2px] clip-corner relative"
            >
               {/* Accent Line */}
               <div className={`absolute top-0 left-0 w-[2px] h-full ${
                   toast.type === 'success' ? 'bg-green-500' : 
                   toast.type === 'error' ? 'bg-red-500' : 'bg-base-500'
               }`} />

               <div className="bg-base-300/10 p-4 flex items-start gap-4 backdrop-blur-sm">
                 <div className="mt-1">
                    {toast.type === 'success' && <CheckCircle size={18} className="text-green-500" />}
                    {toast.type === 'error' && <AlertCircle size={18} className="text-red-500" />}
                    {toast.type === 'info' && <Info size={18} className="text-base-500" />}
                 </div>
                 
                 <div className="flex-1">
                    <h4 className="font-mono text-xs text-base-200 uppercase tracking-widest mb-1">System Notification</h4>
                    <p className="font-body text-base-100 text-sm leading-tight">{toast.message}</p>
                    
                    {toast.action && (
                        <button 
                            onClick={() => {
                                toast.action!.onClick();
                                removeToast(toast.id);
                            }}
                            className="mt-3 text-xs font-mono uppercase bg-base-500 text-base-400 px-3 py-1 font-bold hover:bg-base-100 transition-colors"
                        >
                            {toast.action.label}
                        </button>
                    )}
                 </div>

                 <button onClick={() => removeToast(toast.id)} className="text-base-300 hover:text-base-100 transition-colors">
                    <X size={14} />
                 </button>
               </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};