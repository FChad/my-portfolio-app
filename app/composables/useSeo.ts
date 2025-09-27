interface SeoOptions {
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
}

type SchemaType = 'Person' | 'WebSite' | 'Article' | 'Project'

/**
 * SEO Composable für Portfolio Website
 */
export const useSeo = () => {
  const { t, locale } = useI18n()
  const route = useRoute()
  const config = useRuntimeConfig()

  const baseUrl = config.public.baseUrl
  const supportedLocales = ['lb', 'de', 'fr', 'en']

  /** Generiert die kanonische URL für die aktuelle Seite */
  const getCanonicalUrl = () => `${baseUrl}${route.path}`

  /** Generiert Schema.org strukturierte Daten für SEO */
  const getStructuredData = (type: SchemaType) => {
    const personData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Chad Feierstein',
      url: baseUrl,
      sameAs: [
        'https://www.linkedin.com/in/chad-feierstein/',
        'https://github.com/FChad'
      ],
      jobTitle: t('about.profile.role'),
      worksFor: {
        '@type': 'Organization',
        name: 'Rotyre SARL'
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: t('about.profile.city'),
        addressCountry: t('about.profile.country')
      },
      knowsLanguage: supportedLocales
    }

    const websiteData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: `Chad Feierstein - ${t('nav.home')}`,
      url: baseUrl,
      author: {
        '@type': 'Person',
        name: 'Chad Feierstein'
      },
      inLanguage: locale.value,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/showcase?search={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }

    return type === 'Person' ? personData : type === 'WebSite' ? websiteData : null
  }

  /** 
   * Setzt alle SEO Meta-Tags für die aktuelle Seite
   */
  const setSeoMeta = (options: SeoOptions = {}) => {
    const title = options.title || t('nav.home')
    const description = options.description || t('home.tagline')
    const image = options.image // Kein Fallback - nur wenn explizit gesetzt

    const i18nHead = useLocaleHead()

    const seoMeta: any = {
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogType: options.type || 'website',
      ogUrl: getCanonicalUrl(),
      ogLocale: locale.value,
      twitterCard: image ? 'summary_large_image' : 'summary',
      twitterTitle: title,
      twitterDescription: description
    }

    // Nur Image Meta-Tags setzen wenn Bild vorhanden
    if (image) {
      seoMeta.ogImage = image
      seoMeta.twitterImage = image
    }

    useSeoMeta(seoMeta)

    useHead(() => ({
      htmlAttrs: i18nHead.value.htmlAttrs,
      link: [...(i18nHead.value.link || [])],
      meta: [...(i18nHead.value.meta || [])]
    }))
  }

  return {
    setSeoMeta,
    getStructuredData,
    getCanonicalUrl
  }
}