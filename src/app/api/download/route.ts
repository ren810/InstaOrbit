import { NextRequest, NextResponse } from 'next/server';

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

    // Try first API - Instagram Downloader
    try {
      const response1 = await fetch(
        `https://instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com/convert?url=${sanitizedUrl}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY || '377b748462msh8771d155e019b30p19bf99jsn1b1fe99821cf',
            'x-rapidapi-host': 'instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com'
          }
        }
      );

      if (response1.ok) {
        const data = await response1.json();
        
        // Check if data has media array (actual API response structure)
        if (data && data.media && Array.isArray(data.media) && data.media.length > 0) {
          const media = data.media[0]; // Get first media item
          const isCarousel = data.media.length > 1;
          
          return NextResponse.json({
            success: true,
            data: {
              thumbnail: media.thumbnail || 'https://picsum.photos/600/800',
              title: data.caption || 'Instagram Media',
              author: data.username || '@instagram',
              downloadUrl: media.url || '#',
              type: media.type || 'video',
              quality: media.quality || 'HD',
              caption: data.caption || '',
              username: data.username || '@instagram',
              mediaUrls: data.media || [],
              isCarousel: isCarousel,
              mediaCount: data.media.length
            }
          });
        }
      }
    } catch (err) {
      console.error('First API failed, trying second API...', err);
    }

    // Try second API - Instagram120
    try {
      const response2 = await fetch(
        'https://instagram120.p.rapidapi.com/api/instagram/posts',
        {
          method: 'POST',
          headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY || '377b748462msh8771d155e019b30p19bf99jsn1b1fe99821cf',
            'x-rapidapi-host': 'instagram120.p.rapidapi.com',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url })
        }
      );

      if (response2.ok) {
        const data = await response2.json();
        
        // Check if data is valid
        if (data && data.data) {
          const postData = data.data;
          return NextResponse.json({
            success: true,
            data: {
              thumbnail: postData.thumbnail_url || postData.display_url || 'https://picsum.photos/600/800',
              title: postData.caption?.text || postData.title || 'Instagram Media',
              author: postData.owner?.username || '@instagram',
              downloadUrl: postData.video_url || postData.image_url || postData.display_url || '#',
              type: postData.is_video ? 'video' : 'image',
              mediaUrls: postData.carousel_media || []
            }
          });
        }
      }
    } catch (err) {
      console.error('Second API failed', err);
    }

    // If both APIs fail
    return NextResponse.json(
      { error: 'Failed to fetch Instagram media. The post might be private or deleted.' },
      { status: 500 }
    );

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
