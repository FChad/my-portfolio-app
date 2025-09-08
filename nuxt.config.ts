// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: false },
    modules: [
        '@nuxt/icon',
        '@nuxtjs/color-mode',
        '@nuxtjs/i18n',
        '@nuxtjs/robots',
        '@nuxtjs/sitemap',
        '@nuxtjs/tailwindcss'
    ],
    colorMode: {
        classSuffix: ''
    },
    i18n: {
        baseUrl: 'https://www.chad.lu',
        defaultLocale: 'de',
        locales: [
            { code: 'lb', name: 'Lëtzebuergesch', file: 'lb.json' },
            { code: 'de', name: 'Deutsch', file: 'de.json' },
            { code: 'fr', name: 'Français', file: 'fr.json' },
            { code: 'en', name: 'English', file: 'en.json' }
        ],
        langDir: 'locales',
        strategy: 'prefix_except_default',
        detectBrowserLanguage: false
    },
    robots: {
        disallow: '/'
    },
    sitemap: {
        enabled: false
    },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            meta: [
                { name: 'robots', content: 'noindex, nofollow' }
            ],
            link: [
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
                { rel: 'manifest', href: '/site.webmanifest' }
            ]
        }
    }
})