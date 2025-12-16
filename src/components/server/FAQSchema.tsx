// ✅ SERVER COMPONENT - FAQ Schema for Rich Snippets
// Generates FAQ structured data in JSON-LD format per locale

type Props = {
    locale: string;
};

// FAQ content per locale
const faqContent: Record<string, Array<{ question: string; answer: string }>> = {
    en: [
        { question: "Is InstaOrbit free to use?", answer: "Yes! InstaOrbit is completely free. No hidden charges, no subscriptions, no premium plans. Download unlimited Instagram content at no cost." },
        { question: "Do I need to create an account?", answer: "No account needed. Simply paste the Instagram URL and download. We don't store any of your personal data." },
        { question: "What content can I download?", answer: "You can download Instagram Reels, Videos, Photos, Stories, IGTV, and carousel posts. All in original HD quality." },
        { question: "Is it safe to use InstaOrbit?", answer: "Absolutely. We use secure HTTPS connections, don't store any user data, and never ask for your Instagram login credentials." },
        { question: "Why isn't my download working?", answer: "Make sure the Instagram post is public. Private account content cannot be downloaded. Also check that you're using the correct URL format." },
        { question: "Can I download from private accounts?", answer: "No, InstaOrbit only works with public Instagram posts. We respect user privacy and content restrictions." }
    ],
    'zh-CN': [
        { question: "InstaOrbit是免费的吗？", answer: "是的！InstaOrbit完全免费。没有隐藏费用，没有订阅，没有高级计划。免费下载无限量的Instagram内容。" },
        { question: "我需要创建账户吗？", answer: "不需要账户。只需粘贴Instagram URL即可下载。我们不存储任何您的个人数据。" },
        { question: "我可以下载什么内容？", answer: "您可以下载Instagram Reels、视频、照片、故事、IGTV和多图帖子。全部保持原始高清画质。" },
        { question: "使用InstaOrbit安全吗？", answer: "绝对安全。我们使用安全的HTTPS连接，不存储任何用户数据，也从不要求您的Instagram登录凭据。" }
    ],
    es: [
        { question: "¿InstaOrbit es gratis?", answer: "¡Sí! InstaOrbit es completamente gratis. Sin cargos ocultos, sin suscripciones, sin planes premium." },
        { question: "¿Necesito crear una cuenta?", answer: "No se necesita cuenta. Simplemente pega la URL de Instagram y descarga." },
        { question: "¿Qué contenido puedo descargar?", answer: "Puedes descargar Reels, Videos, Fotos, Historias, IGTV y publicaciones de carrusel de Instagram." },
        { question: "¿Es seguro usar InstaOrbit?", answer: "Absolutamente. Usamos conexiones HTTPS seguras y nunca pedimos tus credenciales de Instagram." }
    ],
    ar: [
        { question: "هل InstaOrbit مجاني؟", answer: "نعم! InstaOrbit مجاني تماماً. بدون رسوم خفية، بدون اشتراكات." },
        { question: "هل أحتاج لإنشاء حساب؟", answer: "لا حاجة لحساب. فقط الصق رابط انستقرام وحمّل." },
        { question: "ما المحتوى الذي يمكنني تحميله؟", answer: "يمكنك تحميل ريلز انستقرام، فيديوهات، صور، ستوري، IGTV." },
        { question: "هل استخدام InstaOrbit آمن؟", answer: "بالتأكيد. نستخدم اتصالات HTTPS آمنة." }
    ],
    pt: [
        { question: "O InstaOrbit é grátis?", answer: "Sim! O InstaOrbit é completamente grátis. Sem taxas ocultas, sem assinaturas." },
        { question: "Preciso criar uma conta?", answer: "Não é necessária conta. Simplesmente cole a URL do Instagram e baixe." },
        { question: "Que conteúdo posso baixar?", answer: "Você pode baixar Reels, Vídeos, Fotos, Stories, IGTV do Instagram." },
        { question: "É seguro usar o InstaOrbit?", answer: "Absolutamente. Usamos conexões HTTPS seguras." }
    ],
    ja: [
        { question: "InstaOrbitは無料ですか？", answer: "はい！InstaOrbitは完全無料です。隠れた料金なし、サブスクリプションなし。" },
        { question: "アカウントを作成する必要がありますか？", answer: "アカウントは不要です。InstagramのURLを貼り付けてダウンロードするだけ。" },
        { question: "どんなコンテンツをダウンロードできますか？", answer: "インスタグラムのリール、動画、写真、ストーリー、IGTVをダウンロードできます。" },
        { question: "InstaOrbitを使用するのは安全ですか？", answer: "もちろんです。安全なHTTPS接続を使用しています。" }
    ],
    ru: [
        { question: "InstaOrbit бесплатный?", answer: "Да! InstaOrbit полностью бесплатен. Без скрытых платежей, без подписок." },
        { question: "Нужно ли создавать аккаунт?", answer: "Аккаунт не нужен. Просто вставьте URL Instagram и скачайте." },
        { question: "Какой контент можно скачать?", answer: "Вы можете скачивать Рилсы, Видео, Фото, Сторис, IGTV из Instagram." },
        { question: "Безопасно ли использовать InstaOrbit?", answer: "Абсолютно. Мы используем защищённые HTTPS-соединения." }
    ],
    de: [
        { question: "Ist InstaOrbit kostenlos?", answer: "Ja! InstaOrbit ist völlig kostenlos. Keine versteckten Gebühren, keine Abonnements." },
        { question: "Muss ich ein Konto erstellen?", answer: "Kein Konto erforderlich. Fügen Sie einfach die Instagram-URL ein und laden Sie herunter." },
        { question: "Welche Inhalte kann ich herunterladen?", answer: "Sie können Instagram Reels, Videos, Fotos, Stories, IGTV herunterladen." },
        { question: "Ist die Nutzung von InstaOrbit sicher?", answer: "Absolut. Wir verwenden sichere HTTPS-Verbindungen." }
    ],
    fr: [
        { question: "InstaOrbit est-il gratuit ?", answer: "Oui ! InstaOrbit est entièrement gratuit. Pas de frais cachés, pas d'abonnements." },
        { question: "Dois-je créer un compte ?", answer: "Aucun compte nécessaire. Collez simplement l'URL Instagram et téléchargez." },
        { question: "Quel contenu puis-je télécharger ?", answer: "Vous pouvez télécharger les Reels, Vidéos, Photos, Stories, IGTV d'Instagram." },
        { question: "Est-il sûr d'utiliser InstaOrbit ?", answer: "Absolument. Nous utilisons des connexions HTTPS sécurisées." }
    ],
    hi: [
        { question: "क्या InstaOrbit मुफ्त है?", answer: "हां! InstaOrbit पूरी तरह मुफ्त है। कोई छुपी हुई फीस नहीं, कोई सब्सक्रिप्शन नहीं।" },
        { question: "क्या मुझे अकाउंट बनाना होगा?", answer: "कोई अकाउंट जरूरी नहीं। बस इंस्टाग्राम URL पेस्ट करें और डाउनलोड करें।" },
        { question: "मैं कौन सा कंटेंट डाउनलोड कर सकता हूं?", answer: "आप इंस्टाग्राम रील्स, वीडियो, फोटो, स्टोरीज, IGTV डाउनलोड कर सकते हैं।" },
        { question: "क्या InstaOrbit का उपयोग सुरक्षित है?", answer: "बिल्कुल। हम सुरक्षित HTTPS कनेक्शन का उपयोग करते हैं।" }
    ]
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://instaorbits.com';

export default function FAQSchema({ locale }: Props) {
    const faqs = faqContent[locale] || faqContent.en;

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        })),
        "inLanguage": locale === 'zh-CN' ? 'zh-Hans' : locale,
        "url": `${SITE_URL}/${locale}#faq`
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
    );
}
