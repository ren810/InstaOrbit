import React from "react";
import type { Metadata, Viewport } from "next";
import JsonLd from "@/components/server/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://instaorbit.com'),
  title: {
    default: 'InstaOrbit | Professional Instagram Downloader',
    template: '%s | InstaOrbit'
  },
  alternates: {
    canonical: 'https://instaorbit.com',
  },
  description: "High-performance, sci-fi themed Instagram video and photo downloader. Download Instagram reels, videos, and photos in HD quality - fast, secure, and ad-free.",
  keywords: ['instagram downloader', 'instagram video downloader', 'download instagram reels', 'instagram photo downloader', 'save instagram videos', 'HD instagram downloader'],
  authors: [{ name: 'InstaOrbit' }],
  creator: 'InstaOrbit',
  publisher: 'InstaOrbit',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://instaorbit.com',
    siteName: 'InstaOrbit',
    title: 'InstaOrbit | Professional Instagram Downloader',
    description: 'Download Instagram videos, reels, and photos in HD quality. Lightning fast and secure.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'InstaOrbit - Instagram Downloader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InstaOrbit | Professional Instagram Downloader',
    description: 'Download Instagram videos, reels, and photos in HD quality.',
    creator: '@instaorbit',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
  verification: {
    google: 'your-google-verification-code', // Add your verification code
  },
};

// Viewport configuration (moved from metadata)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ee6436',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Optimized font loading with preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Host+Grotesk:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/schabo" rel="stylesheet" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
      </head>
      <body className="bg-base-400 text-base-100 antialiased overflow-x-hidden">
        <JsonLd />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}