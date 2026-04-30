// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { dynamicIcons } from './app/icons'
import { SITE_AUTHOR, SITE_NAME } from './app/utils/constants'

export default defineNuxtConfig({
  compatibilityDate: '2026-04-30',
  devtools: { enabled: false },
  nitro: {
    preset: 'cloudflare-pages'
  },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/icon', '@nuxtjs/color-mode', '@nuxtjs/i18n', '@nuxtjs/seo', '@nuxt/fonts'],
  fonts: {
    families: [
      { name: 'Inter', provider: 'bunny', weights: ['100 900'] }
    ]
  },
  icon: {
    cssLayer: 'base',
    clientBundle: {
      scan: true,
      icons: [...dynamicIcons],
    },
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  site: {
    url: process.env.BASE_URL,
    name: SITE_NAME
  },
  ogImage: {
    enabled: false
  },
  colorMode: {
    classSuffix: ''
  },
  i18n: {
    baseUrl: process.env.BASE_URL,
    defaultLocale: 'de',
    locales: [
      {
        code: 'lb',
        name: 'Lëtzebuergesch',
        file: 'lb.json',
        language: 'lb-LU'
      },
      {
        code: 'de',
        name: 'Deutsch',
        file: 'de.json',
        language: 'de-DE'
      },
      {
        code: 'fr',
        name: 'Français',
        file: 'fr.json',
        language: 'fr-FR'
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
        language: 'en-US'
      }
    ],
    langDir: 'locales',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false
  },
  app: {
    head: {
      titleTemplate: `${SITE_AUTHOR} - %s`,
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },
  runtimeConfig: {
    // Private keys (only available on the server-side)
    resendApiKey: process.env.RESEND_API_KEY,
    emailFrom: process.env.EMAIL_FROM,
    emailFromName: process.env.EMAIL_FROM_NAME,
    emailTo: process.env.EMAIL_TO,
    turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY,

    // Public keys (exposed to the client-side code)
    public: {
      turnstileSiteKey: process.env.TURNSTILE_SITE_KEY,
      baseUrl: process.env.BASE_URL
    }
  }
})