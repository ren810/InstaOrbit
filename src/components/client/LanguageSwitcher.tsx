'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';

// Language configuration
const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: 'us' },
    { code: 'zh-CN', name: 'Chinese', nativeName: '简体中文', flag: 'cn' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: 'es' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: 'sa' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: 'br' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: 'jp' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: 'ru' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: 'de' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: 'fr' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: 'in' }
];

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentLocale = pathname.split('/')[1] || 'en';
    const currentLanguage = languages.find(l => l.code === currentLocale) || languages[0];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (newLocale: string) => {
        const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
        document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
        router.push(`/${newLocale}${pathWithoutLocale}`);
        setIsOpen(false);
    };

    if (!mounted) {
        return (
            <div className="flex items-center gap-2 px-4 py-2.5 border border-[#333] bg-[#1a1a1a]">
                <Globe size={16} className="text-[#888]" />
                <span className="font-mono text-xs text-[#666]">EN</span>
            </div>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2.5 border border-[#333] bg-[#1a1a1a] hover:bg-[#252525] hover:border-[#ee6436] transition-all duration-300"
                aria-label="Select language"
            >
                <Globe size={16} className="text-[#888]" />
                <img
                    src={`https://flagcdn.com/w40/${currentLanguage.flag}.png`}
                    alt={currentLanguage.name}
                    width={20}
                    height={15}
                    style={{ objectFit: 'cover', borderRadius: 2 }}
                />
                <span className="hidden sm:inline font-mono text-xs uppercase tracking-wider text-[#aaa]">
                    {currentLanguage.code.split('-')[0]}
                </span>
                <ChevronDown
                    size={14}
                    className={`text-[#666] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-72 border border-[#333] bg-[#0d0d0d] shadow-xl z-[9999]"
                    >
                        <div className="px-4 py-3 border-b border-[#333] bg-[#111]">
                            <span className="font-mono text-xs uppercase tracking-widest text-[#ee6436]">
                                ● Select Language
                            </span>
                        </div>

                        <div className="overflow-y-auto" style={{ maxHeight: '320px' }}>
                            {languages.map((language, idx) => {
                                const isSelected = currentLocale === language.code;
                                return (
                                    <button
                                        key={language.code}
                                        onClick={() => handleLanguageChange(language.code)}
                                        className={`
                      w-full flex items-center gap-4 px-4 py-3.5 text-left transition-all duration-200
                      ${isSelected
                                                ? 'bg-[#ee6436]/10 border-l-2 border-l-[#ee6436]'
                                                : 'bg-[#0d0d0d] hover:bg-[#1a1a1a] border-l-2 border-l-transparent'
                                            }
                    `}
                                    >
                                        <span className="font-mono text-xs text-[#444] w-5">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <img
                                            src={`https://flagcdn.com/w40/${language.flag}.png`}
                                            alt={language.name}
                                            width={28}
                                            height={21}
                                            style={{ objectFit: 'cover', borderRadius: 2 }}
                                        />
                                        <div className="flex flex-col flex-1">
                                            <span className={`font-mono text-sm ${isSelected ? 'text-[#ee6436]' : 'text-white'}`}>
                                                {language.nativeName}
                                            </span>
                                            <span className="text-xs text-[#666]">{language.name}</span>
                                        </div>
                                        {isSelected && <Check size={18} className="text-[#ee6436]" />}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="px-4 py-2.5 border-t border-[#333] bg-[#111]">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-[#555]">
                                Scroll to see all • 10 Languages
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
