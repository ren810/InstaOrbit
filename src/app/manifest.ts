import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'InstaOrbit - Instagram Downloader',
    short_name: 'InstaOrbit',
    description: 'High-performance Instagram video and photo downloader. Download Instagram reels, videos, and photos in HD quality.',
    start_url: '/',
    display: 'standalone',
    background_color: '#141414',
    theme_color: '#ee6436',
    icons: [],
  }
}
