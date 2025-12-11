import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          100: '#f2eeda', // Cream
          200: '#8c8a7f', // Gray
          300: '#262626', // Dark Gray
          400: '#141414', // Black
          500: '#ee6436', // Orange
        }
      },
      fontFamily: {
        display: ['SCHABO', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
        body: ['Host Grotesk', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pan-overlay': 'pan-overlay 30s infinite linear',
      },
      keyframes: {
        'pan-overlay': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% -100%' },
        }
      }
    },
  },
  plugins: [],
};
export default config;