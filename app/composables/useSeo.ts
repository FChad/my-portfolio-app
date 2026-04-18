import { SITE_AUTHOR, SITE_NAME } from '~/utils/constants'

interface SeoOptions {
  title?: string
  description?: string
  image?: string
  keywords?: string
}

export const useSeo = () => {
  const { t } = useI18n()
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const setSeoMeta = (options: SeoOptions = {}) => {
    const title = options.title || t('nav.home')
    const fullTitle = `${SITE_AUTHOR} - ${title}`
    const description = options.description || t('home.tagline')
    const image = options.image || `${baseUrl}/img/og/default-og-image.svg`

    // Only set the page title — titleTemplate in nuxt.config.ts handles the rest
    useHead({ title })

    // SEO meta tags — canonical, og:locale, hreflang are set automatically by @nuxtjs/i18n
    useSeoMeta({
      author: SITE_AUTHOR,
      description,
      ogTitle: fullTitle,
      ogDescription: description,
      ogImage: image,
      ogImageAlt: fullTitle,
      ogType: 'website',
      ogSiteName: SITE_NAME,
      twitterCard: 'summary_large_image',
      twitterTitle: fullTitle,
      twitterDescription: description,
      twitterImage: image,
      keywords: options.keywords
    })
  }

  return {
    setSeoMeta
  }
}