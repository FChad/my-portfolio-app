import { SITE_AUTHOR, SITE_NAME } from '~/utils/constants'

interface SeoOptions {
  title?: string
  description?: string
  image?: string
  keywords?: string
}

export const useSeo = () => {
  const { t } = useI18n()

  const setSeoMeta = (options: SeoOptions = {}) => {
    const title = options.title || t('nav.home')
    const fullTitle = `${SITE_AUTHOR} - ${title}`
    const description = options.description || t('home.tagline')

    useHead({ title })

    useSeoMeta({
      author: SITE_AUTHOR,
      description,
      ogTitle: fullTitle,
      ogDescription: description,
      ...(options.image ? { ogImage: options.image, twitterImage: options.image, ogImageAlt: fullTitle } : {}),
      ogType: 'website',
      ogSiteName: SITE_NAME,
      twitterCard: 'summary_large_image',
      twitterTitle: fullTitle,
      twitterDescription: description,
      keywords: options.keywords
    })

    if (!options.image) {
      // The OG card is identity-forward: the headline is the page subject
      // (the name on the homepage, the clean page title elsewhere — never the
      // "Name - Page" SEO prefix), with the roles as a persistent eyebrow.
      const isHome = !options.title || options.title === t('seo.home.title')
      // Takumi has no line-clamp, so cap the description to keep it to ~2 lines.
      const ogDescription = description.length > 130
        ? `${description.slice(0, 127).trimEnd()}…`
        : description
      defineOgImage('Portfolio', {
        title: isHome ? SITE_AUTHOR : options.title,
        eyebrow: `${t('home.roles.fullstack')} · ${t('home.roles.itadmin')}`,
        description: ogDescription
      })
    }
  }

  return {
    setSeoMeta
  }
}