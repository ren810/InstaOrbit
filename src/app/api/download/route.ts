import { NextRequest, NextResponse } from 'next/server';
import { trackApiCall } from '@/lib/usage-tracker';

// Instagram Download API using RapidAPI
export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    // Validate URL
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate Instagram URL format
    const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv|stories)\/[a-zA-Z0-9_-]+\/?(\?.*)?$/i;
    if (!instagramRegex.test(url)) {
      return NextResponse.json(
        { error: 'Invalid Instagram URL. Please provide a valid Instagram post, reel, or story URL.' },
        { status: 400 }
      );
    }

    // Sanitize URL to prevent injection
    const sanitizedUrl = encodeURIComponent(url);
    const rapidApiKey1 = process.env.RAPIDAPI_KEY1;
    const rapidApiKey2 = process.env.RAPIDAPI_KEY2;

    if (!rapidApiKey1 || !rapidApiKey2) {
      return NextResponse.json(
        { error: 'API keys not configured' },
        { status: 500 }
      );
    }

    // Try API 1 first: Instagram Downloader V2 API
    try {
      const response = await fetch(
        `https://instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com/get-post?url=${sanitizedUrl}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': rapidApiKey1,
            'x-rapidapi-host': 'instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        
        // Track successful API 1 call
        trackApiCall('instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com', true);
        
        // Parse API 1 response structure
        if (data && data.media && Array.isArray(data.media) && data.media.length > 0) {
          const firstMedia = data.media[0];
          const isCarousel = data.media.length > 1;
          
          // Map media array to standard format
          const mediaUrls = data.media.map((item: any) => ({
            type: item.is_video ? 'video' : 'image',
            url: item.url,
            thumbnail: item.is_video ? item.thumb : item.url // thumb is JPG for videos, url for images
          }));
          
          return NextResponse.json({
            success: true,
            api: 'instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com',
            data: {
              thumbnail: firstMedia.is_video ? firstMedia.thumb : firstMedia.url, // thumb (JPG) for videos, url for images
              title: firstMedia.caption || 'Instagram Media',
              author: data.owner?.username ? '@' + data.owner.username : '@instagram',
              downloadUrl: firstMedia.url || '#',
              type: firstMedia.is_video ? 'video' : 'image',
              quality: 'HD',
              caption: firstMedia.caption || '',
              username: data.owner?.username ? '@' + data.owner.username : '@instagram',
              mediaUrls: mediaUrls,
              isCarousel: isCarousel,
              mediaCount: data.media.length,
              likes: firstMedia.like_count,
              comments: firstMedia.comment_count
            }
          });
        }
      }
    } catch (error) {
      console.log('API 1 failed, trying API 2...', error);
      // Track failed API 1 call
      trackApiCall('instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com', false);
    }

    // Try API 2: Instagram Downloader (Stories/Videos)
    try {
      const response = await fetch(
        `https://instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com/convert?url=${sanitizedUrl}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': rapidApiKey2,
            'x-rapidapi-host': 'instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        
        // Track successful API 2 call
        trackApiCall('instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com', true);
        
        // Parse API 2 response structure
        if (data && data.url) {
          return NextResponse.json({
            success: true,
            api: 'instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com',
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
          });
        }
      }
    } catch (error) {
      console.log('API 2 also failed', error);
      // Track failed API 2 call
      trackApiCall('instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com', false);
    }

    // Both APIs failed
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
