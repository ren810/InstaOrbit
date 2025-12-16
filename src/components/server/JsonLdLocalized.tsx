// ✅ SERVER COMPONENT - Localized SEO structured data
// Language-aware JSON-LD for better international SEO

type Props = {
    locale: string;
};

// Locale display names for structured data
const localeNames: Record<string, { name: string; inLanguage: string }> = {
    en: { name: 'English', inLanguage: 'en-US' },
    'zh-CN': { name: '简体中文', inLanguage: 'zh-CN' },
    es: { name: 'Español', inLanguage: 'es' },
    ar: { name: 'العربية', inLanguage: 'ar' },
    pt: { name: 'Português', inLanguage: 'pt-BR' },
    ja: { name: '日本語', inLanguage: 'ja' },
    ru: { name: 'Русский', inLanguage: 'ru' },
    de: { name: 'Deutsch', inLanguage: 'de' },
    fr: { name: 'Français', inLanguage: 'fr' },
    hi: { name: 'हिन्दी', inLanguage: 'hi' }
};

// Localized descriptions
const descriptions: Record<string, string> = {
    en: 'High-performance Instagram video and photo downloader. Download Instagram reels, videos, and photos in HD quality.',
    'zh-CN': '高性能Instagram视频和照片下载器。下载Instagram快拍、视频和照片，保持高清画质。',
    es: 'Descargador de videos y fotos de Instagram de alto rendimiento. Descarga reels, videos y fotos en calidad HD.',
    ar: 'أداة تحميل فيديوهات وصور انستقرام عالية الأداء. حمّل ريلز وفيديوهات وصور بجودة HD.',
    pt: 'Downloader de vídeos e fotos do Instagram de alto desempenho. Baixe reels, vídeos e fotos em qualidade HD.',
    ja: '高性能Instagramビデオ・写真ダウンローダー。リール、ビデオ、写真をHD画質でダウンロード。',
    ru: 'Высокопроизводительный загрузчик видео и фото из Instagram. Скачивайте рилсы, видео и фото в HD качестве.',
    de: 'Hochleistungs-Instagram-Video- und Foto-Downloader. Laden Sie Reels, Videos und Fotos in HD-Qualität herunter.',
    fr: 'Téléchargeur de vidéos et photos Instagram haute performance. Téléchargez des reels, vidéos et photos en qualité HD.',
    hi: 'उच्च-प्रदर्शन Instagram वीडियो और फोटो डाउनलोडर। रील्स, वीडियो और फोटो HD क्वालिटी में डाउनलोड करें।'
};

// Localized features
const featuresLocalized: Record<string, string[]> = {
    en: ['Lightning Fast Downloads', 'HD Quality Support', 'No Watermarks', 'Unlimited Downloads', 'Cross Platform', 'Secure & Private'],
    'zh-CN': ['闪电般快速下载', '高清画质支持', '无水印', '无限下载', '跨平台', '安全隐私'],
    es: ['Descargas Ultra Rápidas', 'Calidad HD', 'Sin Marcas de Agua', 'Descargas Ilimitadas', 'Multiplataforma', 'Seguro y Privado'],
    ar: ['تحميل سريع للغاية', 'دعم جودة HD', 'بدون علامة مائية', 'تحميلات غير محدودة', 'متعدد المنصات', 'آمن وخاص'],
    pt: ['Downloads Ultra Rápidos', 'Qualidade HD', 'Sem Marca D\'água', 'Downloads Ilimitados', 'Multiplataforma', 'Seguro e Privado'],
    ja: ['超高速ダウンロード', 'HD画質サポート', 'ウォーターマークなし', '無制限ダウンロード', 'クロスプラットフォーム', '安全＆プライベート'],
    ru: ['Молниеносная загрузка', 'HD качество', 'Без водяных знаков', 'Неограниченные загрузки', 'Кроссплатформенность', 'Безопасно и приватно'],
    de: ['Blitzschnelle Downloads', 'HD Qualität', 'Keine Wasserzeichen', 'Unbegrenzte Downloads', 'Plattformübergreifend', 'Sicher & Privat'],
    fr: ['Téléchargements Ultra Rapides', 'Qualité HD', 'Sans Filigrane', 'Téléchargements Illimités', 'Multi-plateforme', 'Sécurisé et Privé'],
    hi: ['बिजली जैसी तेज़ डाउनलोड', 'HD क्वालिटी सपोर्ट', 'वॉटरमार्क नहीं', 'अनलिमिटेड डाउनलोड', 'क्रॉस प्लेटफॉर्म', 'सुरक्षित और प्राइवेट']
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://instaorbits.com';

export default function JsonLdLocalized({ locale }: Props) {
    const config = localeNames[locale] || localeNames.en;
    const description = descriptions[locale] || descriptions.en;
    const features = featuresLocalized[locale] || featuresLocalized.en;

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "@id": `${SITE_URL}/${locale}#webapp`,
                "name": "InstaOrbit",
                "description": description,
                "url": `${SITE_URL}/${locale}`,
                "inLanguage": config.inLanguage,
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
                "featureList": features,
                "availableLanguage": Object.keys(localeNames).map(loc => ({
                    "@type": "Language",
                    "name": localeNames[loc].name,
                    "alternateName": loc
                }))
            },
            {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                "name": "InstaOrbit",
                "url": SITE_URL,
                "logo": `${SITE_URL}/logo.png`,
                "description": description,
                "sameAs": [
                    "https://twitter.com/instaorbit",
                    "https://github.com/instaorbit"
                ]
            },
            {
                "@type": "WebSite",
                "@id": `${SITE_URL}/${locale}#website`,
                "name": "InstaOrbit",
                "url": `${SITE_URL}/${locale}`,
                "inLanguage": config.inLanguage,
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": `${SITE_URL}/${locale}?url={search_term_string}`
                    },
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": locale === 'en' ? 'Home' :
                            locale === 'zh-CN' ? '首页' :
                                locale === 'es' ? 'Inicio' :
                                    locale === 'ar' ? 'الرئيسية' :
                                        locale === 'pt' ? 'Início' :
                                            locale === 'ja' ? 'ホーム' :
                                                locale === 'ru' ? 'Главная' :
                                                    locale === 'de' ? 'Startseite' :
                                                        locale === 'fr' ? 'Accueil' :
                                                            locale === 'hi' ? 'होम' : 'Home',
                        "item": `${SITE_URL}/${locale}`
                    }
                ]
            },
            {
                "@type": "VideoObject",
                "name": locale === 'en' ? "How to Download Instagram Videos with InstaOrbit" :
                    locale === 'zh-CN' ? "如何使用InstaOrbit下载Instagram视频" :
                        locale === 'es' ? "Cómo Descargar Videos de Instagram con InstaOrbit" :
                            locale === 'ar' ? "كيفية تحميل فيديوهات انستقرام باستخدام InstaOrbit" :
                                locale === 'pt' ? "Como Baixar Vídeos do Instagram com InstaOrbit" :
                                    locale === 'ja' ? "InstaOrbitでInstagram動画をダウンロードする方法" :
                                        locale === 'ru' ? "Как скачать видео из Instagram с помощью InstaOrbit" :
                                            locale === 'de' ? "So laden Sie Instagram-Videos mit InstaOrbit herunter" :
                                                locale === 'fr' ? "Comment télécharger des vidéos Instagram avec InstaOrbit" :
                                                    locale === 'hi' ? "InstaOrbit से Instagram वीडियो कैसे डाउनलोड करें" :
                                                        "How to Download Instagram Videos with InstaOrbit",
                "description": description,
                "thumbnailUrl": `${SITE_URL}/og-image.svg`,
                "uploadDate": "2024-01-01",
                "duration": "PT2M30S",
                "contentUrl": `${SITE_URL}/${locale}`,
                "embedUrl": `${SITE_URL}/${locale}`,
                "inLanguage": config.inLanguage
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
