interface SeoOptions {
  title?: string
  description?: string
  image?: string
  keywords?: string
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
      knowsLanguage: supportedLocales,
      email: 'contact@chad.lu',
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'LTEch',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'LU'
        }
      },
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'BTS Cloud Computing',
          credentialCategory: 'degree'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Techniker in der Informatik',
          credentialCategory: 'certificate'
        }
      ]
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
      inLanguage: supportedLocales,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/showcase?search={search_term_string}`,
        'query-input': 'required name=search_term_string'
      },
      mainEntity: {
        '@type': 'Person',
        name: 'Chad Feierstein'
      }
    }

    const articleData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Chad Feierstein Portfolio Project',
      author: {
        '@type': 'Person',
        name: 'Chad Feierstein',
        url: baseUrl
      },
      publisher: {
        '@type': 'Person',
        name: 'Chad Feierstein',
        url: baseUrl
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': getCanonicalUrl()
      },
      datePublished: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      inLanguage: locale.value
    }

    const projectData = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Chad Feierstein Project',
      author: {
        '@type': 'Person',
        name: 'Chad Feierstein',
        url: baseUrl
      },
      applicationCategory: 'WebApplication',
      operatingSystem: 'Web Browser',
      url: getCanonicalUrl(),
      inLanguage: locale.value
    }

    switch (type) {
      case 'Person':
        return personData
      case 'WebSite':
        return websiteData
      case 'Article':
        return articleData
      case 'Project':
        return projectData
      default:
        return websiteData
    }
  }

  /** 
   * Setzt alle SEO Meta-Tags für die aktuelle Seite
   */
  const setSeoMeta = (options: SeoOptions = {}) => {
    const title = options.title || t('nav.home')
    const description = options.description || t('home.tagline')
    const image = options.image || `${baseUrl}/img/og/default-og-image.svg`
    const type = options.type || 'website'

    const i18nHead = useLocaleHead()

    const seoMeta: any = {
      title,
      description,
      author: 'Chad Feierstein',
      robots: 'index, follow',

      // Open Graph Meta Tags
      ogTitle: title,
      ogDescription: description,
      ogType: type,
      ogUrl: getCanonicalUrl(),
      ogLocale: locale.value,
      ogImage: image,
      ogImageAlt: `${title} - Chad Feierstein`,
      ogSiteName: 'Chad Feierstein - Portfolio',

      // Twitter Card Meta Tags
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: image,
      twitterImageAlt: `${title} - Chad Feierstein`,
      twitterSite: '@chadfeierstein',
      twitterCreator: '@chadfeierstein',

      // Additional Meta Tags
      themeColor: '#3b82f6',
      colorScheme: 'light dark',
      creator: 'Chad Feierstein',
      publisher: 'Chad Feierstein',
      applicationName: 'Chad Feierstein Portfolio',
      msapplicationTileColor: '#3b82f6'
    }

    // Article-specific meta tags
    if (type === 'article') {
      seoMeta.articleAuthor = 'Chad Feierstein'
      seoMeta.articlePublisher = baseUrl
      seoMeta.ogArticleAuthor = 'Chad Feierstein'
      seoMeta.ogArticlePublisher = baseUrl
    }

    // Keywords nur hinzufügen wenn verfügbar
    if (options.keywords) {
      seoMeta.keywords = options.keywords
    }

    useSeoMeta(seoMeta)

    useHead(() => ({
      htmlAttrs: i18nHead.value.htmlAttrs,
      link: [
        ...(i18nHead.value.link || []),
        { rel: 'canonical', href: getCanonicalUrl() }
      ],
      meta: [...(i18nHead.value.meta || [])]
    }))
  }

  return {
    setSeoMeta,
    getStructuredData,
    getCanonicalUrl
  }
}