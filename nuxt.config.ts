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
    }
})