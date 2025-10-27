interface SeoOptions {
  title?: string
  description?: string
  image?: string
  keywords?: string
}

type SchemaType = 'Person' | 'WebSite' | 'SoftwareApplication'

export const useSeo = () => {
  const { t } = useI18n()
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

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

  const setSeoMeta = (options: SeoOptions = {}) => {
    const title = options.title || t('nav.home')
    const description = options.description || t('home.tagline')
    const image = options.image || `${baseUrl}/img/og/default-og-image.svg`

    useHead({ title })

    useSeoMeta({
      description,
      ogTitle: title,
      ogDescription: description,
      ogImage: image,
      ogImageAlt: title,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: image,
      keywords: options.keywords
    })
  }

  return {
    setSeoMeta,
    getStructuredData
  }
}