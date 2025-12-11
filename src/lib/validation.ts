// URL Validation utilities

export const validateInstagramUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  const pattern = /^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv|stories)\/[a-zA-Z0-9_-]+\/?(\?.*)?$/i;
  return pattern.test(url);
};

export const sanitizeUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    
    // Only allow Instagram URLs
    if (!parsed.hostname.includes('instagram.com')) {
      return '';
    }
    
    // Remove potentially dangerous query parameters
    const safeUrl = `${parsed.protocol}//${parsed.hostname}${parsed.pathname}`;
    return safeUrl;
  } catch {
    return '';
  }
};

export const extractInstagramShortcode = (url: string): string | null => {
  const match = url.match(/\/(p|reel|tv|stories)\/([a-zA-Z0-9_-]+)/);
  return match ? match[2] : null;
};

export const getInstagramMediaType = (url: string): 'post' | 'reel' | 'story' | 'tv' | null => {
  const match = url.match(/\/(p|reel|tv|stories)\//);
  if (!match) return null;
  
  switch (match[1]) {
    case 'p': return 'post';
    case 'reel': return 'reel';
    case 'tv': return 'tv';
    case 'stories': return 'story';
    default: return null;
  }
};
