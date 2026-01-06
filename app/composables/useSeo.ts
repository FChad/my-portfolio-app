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
    const fullTitle = `Chad Feierstein - ${title}`
    const description = options.description || t('home.tagline')
    const image = options.image || `${baseUrl}/img/og/default-og-image.svg`

    // Nur den Seitentitel setzen - titleTemplate in nuxt.config.ts macht den Rest
    useHead({ title })

    // SEO Meta-Tags - canonical, og:locale, hreflang werden automatisch von @nuxtjs/i18n gesetzt
    useSeoMeta({
      author: 'Chad Feierstein',
      description,
      ogTitle: fullTitle,
      ogDescription: description,
      ogImage: image,
      ogImageAlt: fullTitle,
      ogType: 'website',
      ogSiteName: 'Chad Feierstein - Portfolio',
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