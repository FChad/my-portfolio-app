import { defineSitemapEventHandler } from '#imports'
import { getAllDocumentationSlugs } from '~/data/documentation'
import { getAllProjectSlugs } from '~/data/projects'

export default defineSitemapEventHandler(() => {
    // Locale prefixes: empty string for default (de), prefixed for others
    const localePrefixes = ['', '/lb', '/fr', '/en']

    // Base paths for static pages
    const staticPaths = ['/', '/about', '/contact', '/showcase']

    // Generate static pages for all locales
    const staticPages = localePrefixes.flatMap(prefix =>
        staticPaths.map(path => ({
            loc: prefix + (path === '/' && prefix ? '' : path)
        }))
    )

    // Dynamic documentation pages for all locales
    const documentationSlugs = getAllDocumentationSlugs()
    const documentationUrls = localePrefixes.flatMap(prefix =>
        documentationSlugs.map(slug => ({
            loc: `${prefix}/showcase/documentation/${slug}`
        }))
    )

    // Dynamic project pages for all locales
    const projectSlugs = getAllProjectSlugs()
    const projectUrls = localePrefixes.flatMap(prefix =>
        projectSlugs.map(slug => ({
            loc: `${prefix}/showcase/project/${slug}`
        }))
    )

    return [...staticPages, ...documentationUrls, ...projectUrls]
})
