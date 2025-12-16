import { NextRequest, NextResponse } from 'next/server';
import { trackApiCall } from '@/lib/usage-tracker';

// Simple in-memory cache (cleared on server restart)
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

// Helper: Fetch with timeout
async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number = 8000): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

// API 1: Instagram Downloader V2
async function tryAPI1(sanitizedUrl: string, apiKey: string): Promise<any> {
  const response = await fetchWithTimeout(
    `https://instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com/get-post?url=${sanitizedUrl}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com'
      }
    }
  );

  if (!response.ok) throw new Error('API 1 failed');
  
  const data = await response.json();
  trackApiCall('instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com', true);
  
  if (data?.media && Array.isArray(data.media) && data.media.length > 0) {
    const firstMedia = data.media[0];
    const isCarousel = data.media.length > 1;
    
    const mediaUrls = data.media.map((item: any) => ({
      type: item.is_video ? 'video' : 'image',
      url: item.url,
      thumbnail: item.is_video ? item.thumb : item.url
    }));
    
    return {
      success: true,
      api: 'api1',
      data: {
        thumbnail: firstMedia.is_video ? firstMedia.thumb : firstMedia.url,
        title: firstMedia.caption || 'Instagram Media',
        author: data.owner?.username ? '@' + data.owner.username : '@instagram',
        downloadUrl: firstMedia.url || '#',
        type: firstMedia.is_video ? 'video' : 'image',
        quality: 'HD',
        caption: firstMedia.caption || '',
        username: data.owner?.username ? '@' + data.owner.username : '@instagram',
        mediaUrls,
        isCarousel,
        mediaCount: data.media.length,
        likes: firstMedia.like_count,
        comments: firstMedia.comment_count
      }
    };
  }
  
  throw new Error('API 1: No media found');
}

// API 2: Instagram Stories/Videos Downloader
async function tryAPI2(sanitizedUrl: string, apiKey: string): Promise<any> {
  const response = await fetchWithTimeout(
    `https://instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com/convert?url=${sanitizedUrl}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com'
      }
    }
  );

  if (!response.ok) throw new Error('API 2 failed');
  
  const data = await response.json();
  trackApiCall('instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com', true);
  
  if (data?.url) {
    return {
      success: true,
      api: 'api2',
      data: {
        thumbnail: data.thumbnail || data.url || 'https://picsum.photos/600/800',
        title: data.title || 'Instagram Media',
        author: data.author || '@instagram',
        downloadUrl: data.url || '#',
        type: data.type || 'video',
        quality: data.quality || 'HD',
        caption: data.caption || '',
        username: data.author || '@instagram',
        mediaUrls: [{
          type: data.type || 'video',
          url: data.url,
          thumbnail: data.thumbnail || data.url
        }],
        isCarousel: false,
        mediaCount: 1
      }
    };
  }
  
  throw new Error('API 2: No media found');
}

// Instagram Download API - OPTIMIZED with parallel calls, timeout, and caching
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { url } = await request.json();

    // Validate URL
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate Instagram URL format
    const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv|stories)\/[a-zA-Z0-9_-]+\/?(\?.*)?$/i;
    if (!instagramRegex.test(url)) {
      return NextResponse.json(
        { error: 'Invalid Instagram URL. Please provide a valid Instagram post, reel, or story URL.' },
        { status: 400 }
      );
    }

    // Check cache first (instant response!)
    const cached = cache.get(url);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log(`[CACHE HIT] ${url} - ${Date.now() - startTime}ms`);
      return NextResponse.json(cached.data);
    }

    const sanitizedUrl = encodeURIComponent(url);
    const rapidApiKey1 = process.env.RAPIDAPI_KEY1;
    const rapidApiKey2 = process.env.RAPIDAPI_KEY2;

    if (!rapidApiKey1 || !rapidApiKey2) {
      return NextResponse.json({ error: 'API keys not configured' }, { status: 500 });
    }

    // 🚀 PARALLEL API CALLS - Use first successful response (2x faster!)
    const results = await Promise.allSettled([
      tryAPI1(sanitizedUrl, rapidApiKey1),
      tryAPI2(sanitizedUrl, rapidApiKey2)
    ]);

    // Find first successful result
    for (const result of results) {
      if (result.status === 'fulfilled') {
        const response = result.value;
        
        // Cache successful response
        cache.set(url, { data: response, timestamp: Date.now() });
        
        console.log(`[API SUCCESS] ${response.api} - ${Date.now() - startTime}ms`);
        return NextResponse.json(response);
      }
    }

    // Both APIs failed - log errors
    const errors = results
      .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
      .map(r => r.reason?.message || 'Unknown error');
    
    console.error(`[API FAIL] Both APIs failed: ${errors.join(', ')} - ${Date.now() - startTime}ms`);
    
    trackApiCall('instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com', false);
    trackApiCall('instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com', false);

    return NextResponse.json(
      { error: 'Failed to fetch Instagram media. The post might be private or deleted.' },
      { status: 404 }
    );

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
