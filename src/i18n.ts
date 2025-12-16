import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// All supported locales with their regional variants
export const locales = [
    'en',    // English (USA, UK, Australia, Canada)
    'zh-CN', // Chinese Simplified (China)
    'es',    // Spanish (Spain, Mexico, Latin America)
    'ar',    // Arabic (Middle East, North Africa)
    'pt',    // Portuguese (Brazil, Portugal)
    'ja',    // Japanese (Japan)
    'ru',    // Russian (Russia, Eastern Europe)
    'de',    // German (Germany, Austria, Switzerland)
    'fr',    // French (France, Canada, Africa)
    'hi'     // Hindi (India)
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// Locale metadata for SEO and display
export const localeMetadata: Record<Locale, {
    name: string;
    nativeName: string;
    flag: string;
    dir: 'ltr' | 'rtl';
    hreflang: string;
    regions: string[];
}> = {
    en: {
        name: 'English',
        nativeName: 'English',
        flag: '🇺🇸',
        dir: 'ltr',
        hreflang: 'en',
        regions: ['USA', 'UK', 'Australia', 'Canada']
    },
    'zh-CN': {
        name: 'Chinese (Simplified)',
        nativeName: '简体中文',
        flag: '🇨🇳',
        dir: 'ltr',
        hreflang: 'zh-Hans',
        regions: ['China']
    },
    es: {
        name: 'Spanish',
        nativeName: 'Español',
        flag: '🇪🇸',
        dir: 'ltr',
        hreflang: 'es',
        regions: ['Spain', 'Mexico', 'Latin America']
    },
    ar: {
        name: 'Arabic',
        nativeName: 'العربية',
        flag: '🇸🇦',
        dir: 'rtl',
        hreflang: 'ar',
        regions: ['Middle East', 'North Africa']
    },
    pt: {
        name: 'Portuguese',
        nativeName: 'Português',
        flag: '🇧🇷',
        dir: 'ltr',
        hreflang: 'pt',
        regions: ['Brazil', 'Portugal']
    },
    ja: {
        name: 'Japanese',
        nativeName: '日本語',
        flag: '🇯🇵',
        dir: 'ltr',
        hreflang: 'ja',
        regions: ['Japan']
    },
    ru: {
        name: 'Russian',
        nativeName: 'Русский',
        flag: '🇷🇺',
        dir: 'ltr',
        hreflang: 'ru',
        regions: ['Russia', 'Eastern Europe']
    },
    de: {
        name: 'German',
        nativeName: 'Deutsch',
        flag: '🇩🇪',
        dir: 'ltr',
        hreflang: 'de',
        regions: ['Germany', 'Austria', 'Switzerland']
    },
    fr: {
        name: 'French',
        nativeName: 'Français',
        flag: '🇫🇷',
        dir: 'ltr',
        hreflang: 'fr',
        regions: ['France', 'Canada', 'Africa']
    },
    hi: {
        name: 'Hindi',
        nativeName: 'हिन्दी',
        flag: '🇮🇳',
        dir: 'ltr',
        hreflang: 'hi',
        regions: ['India']
    }
};

// Check if a locale is valid
export function isValidLocale(locale: string): locale is Locale {
    return locales.includes(locale as Locale);
}

// Get locale direction (for RTL support)
export function getLocaleDirection(locale: Locale): 'ltr' | 'rtl' {
    return localeMetadata[locale]?.dir || 'ltr';
}
