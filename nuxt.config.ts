// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

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
  site: {
    url: 'https://www.chad.lu',
    name: 'Chad Feierstein - Portfolio'
  },
  sitemap: {
    enabled: true,
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    autoLastmod: true,
  },
  colorMode: {
    classSuffix: ''
  },
  i18n: {
    baseUrl: 'https://www.chad.lu',
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
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      script: [
        {
          src: 'https://challenges.cloudflare.com/turnstile/v0/api.js',
          async: true
        }
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
  },
  nitro: {
    experimental: {
      wasm: true
    },
    rollupConfig: {
      external: ['@react-email/render']
    },
    prerender: {
      crawlLinks: true,  // Crawlt alle internen Links beim Build
    },
    compressPublicAssets: true
  },
  ssr: true
})