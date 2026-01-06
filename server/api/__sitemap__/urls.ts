import { defineSitemapEventHandler } from '#imports'
import { getAllDocumentationSlugs } from '~/data/documentation'
import { getAllProjectSlugs } from '~/data/projects'

export default defineSitemapEventHandler(() => {
    // Locale config: prefix for URL path, _sitemap matches the i18n language code
    const locales = [
        { prefix: '', _sitemap: 'de-DE' },
        { prefix: '/lb', _sitemap: 'lb-LU' },
        { prefix: '/fr', _sitemap: 'fr-FR' },
        { prefix: '/en', _sitemap: 'en-US' }
    ]

    // Use current date as lastmod for all URLs
    const lastmod = new Date().toISOString()

    // Base paths for static pages
    const staticPaths = ['/', '/about', '/contact', '/showcase']

    // Generate static pages for all locales
    const staticPages = locales.flatMap(locale =>
        staticPaths.map(path => ({
            loc: locale.prefix + (path === '/' && locale.prefix ? '' : path),
            _sitemap: locale._sitemap,
            lastmod
        }))
    )

    // Dynamic documentation pages for all locales
    const documentationSlugs = getAllDocumentationSlugs()
    const documentationUrls = locales.flatMap(locale =>
        documentationSlugs.map(slug => ({
            loc: `${locale.prefix}/showcase/documentation/${slug}`,
            _sitemap: locale._sitemap,
            lastmod
        }))
    )

    // Dynamic project pages for all locales
    const projectSlugs = getAllProjectSlugs()
    const projectUrls = locales.flatMap(locale =>
        projectSlugs.map(slug => ({
            loc: `${locale.prefix}/showcase/project/${slug}`,
            _sitemap: locale._sitemap,
            lastmod
        }))
    )

    return [...staticPages, ...documentationUrls, ...projectUrls]
})
