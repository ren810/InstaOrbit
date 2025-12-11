// Font optimization using next/font
// Geist Mono is not available in next/font/google, keeping CDN approach
// For production, fonts are loaded via CDN in layout.tsx

// Note: When fonts become available in next/font, this file can be updated
// Current approach uses CSS imports in layout for optimal loading

export const fontConfig = {
  geistMono: 'var(--font-geist-mono)',
  hostGrotesk: 'var(--font-host-grotesk)',
  schabo: 'var(--font-schabo)',
}

