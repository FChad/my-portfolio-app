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
      defineOgImage('Portfolio', { title: fullTitle, description })
    }
  }

  return {
    setSeoMeta
  }
}