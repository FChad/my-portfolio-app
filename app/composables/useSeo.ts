interface SeoOptions {
  title?: string
  description?: string
  image?: string
  keywords?: string
}

type SchemaType = 'Person' | 'WebSite' | 'SoftwareApplication'

/**
 * Minimaler SEO Composable für Portfolio Website
 * 
 * Nutzt Nuxt 4 Standards und @nuxtjs/i18n Automatisierung:
 * - useHead() für title und meta description
 * - useSeoMeta() für SEO-spezifische Tags (og:*, twitter:*)
 * - @nuxtjs/i18n generiert automatisch: hreflang, og:locale, canonical, lang attr
 */
export const useSeo = () => {
  const { t } = useI18n()
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  /** Generiert minimale Schema.org strukturierte Daten */
  const getStructuredData = (type: SchemaType) => {
    const baseData = {
      '@context': 'https://schema.org'
    }

    switch (type) {
      case 'Person':
        return {
          ...baseData,
          '@type': 'Person',
          name: 'Chad Feierstein',
          url: baseUrl,
          sameAs: [
            'https://www.linkedin.com/in/chad-feierstein/',
            'https://github.com/FChad'
          ],
          jobTitle: t('about.profile.role')
        }

      case 'WebSite':
        return {
          ...baseData,
          '@type': 'WebSite',
          name: 'Chad Feierstein Portfolio',
          url: baseUrl,
          inLanguage: ['lb', 'de', 'fr', 'en']
        }

      case 'SoftwareApplication':
        return {
          ...baseData,
          '@type': 'SoftwareApplication',
          name: t('nav.home'),
          author: {
            '@type': 'Person',
            name: 'Chad Feierstein'
          },
          applicationCategory: 'WebApplication'
        }
    }
  }

  /** 
   * Setzt SEO Meta-Tags nach Nuxt 4 Best Practices
   * - useHead() für title
   * - useSeoMeta() für SEO-spezifische Tags (og:*, twitter:*)
   */
  const setSeoMeta = (options: SeoOptions = {}) => {
    const title = options.title || t('nav.home')
    const description = options.description || t('home.tagline')
    const image = options.image || `${baseUrl}/img/og/default-og-image.svg`

    // Title in useHead() setzen (Best Practice)
    useHead({
      title,
      meta: [
        { name: 'description', content: description }
      ]
    })

    // Nur SEO-spezifische Meta-Tags in useSeoMeta()
    useSeoMeta({
      ogTitle: title,
      ogDescription: description,
      ogImage: image,
      ogImageAlt: title,
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: image
    })

    // Keywords optional
    if (options.keywords) {
      useSeoMeta({ keywords: options.keywords })
    }
  }

  return {
    setSeoMeta,
    getStructuredData
  }
}