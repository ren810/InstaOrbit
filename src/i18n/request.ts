import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'zh-CN', 'es', 'ar', 'pt', 'ja', 'ru', 'de', 'fr', 'hi'];

export default getRequestConfig(async ({ requestLocale }) => {
    // Get the locale from the request
    const locale = await requestLocale;

    // Validate that the incoming `locale` parameter is valid
    if (!locale || !locales.includes(locale)) {
        notFound();
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
    };
});
