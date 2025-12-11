// ✅ SERVER COMPONENT - Pure SEO structured data
// No client-side logic, just renders JSON-LD script tag
// Executed on server for better SEO

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "InstaOrbit",
        "description": "High-performance Instagram video and photo downloader. Download Instagram reels, videos, and photos in HD quality.",
        "url": "https://instaorbit.com",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "1250"
        },
        "featureList": [
          "Lightning Fast Downloads",
          "HD Quality Support",
          "No Watermarks",
          "Unlimited Downloads",
          "Cross Platform",
          "Secure & Private"
        ]
      },
      {
        "@type": "Organization",
        "name": "InstaOrbit",
        "url": "https://instaorbit.com",
        "logo": "https://instaorbit.com/logo.png",
        "description": "Professional Instagram media downloader service",
        "sameAs": [
          "https://twitter.com/instaorbit",
          "https://github.com/instaorbit"
        ]
      },
      {
        "@type": "WebSite",
        "name": "InstaOrbit",
        "url": "https://instaorbit.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://instaorbit.com/?url={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
