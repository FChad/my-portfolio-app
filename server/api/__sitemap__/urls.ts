import { defineSitemapEventHandler } from '#imports'
import { getAllDocumentationSlugs } from '~/data/documentation'
import { getAllProjectSlugs } from '~/data/projects'

export default defineSitemapEventHandler(() => {
    // Static pages
    const staticPages = [
        { loc: '/' },
        { loc: '/about' },
        { loc: '/contact' },
        { loc: '/showcase' }
    ]

    // Dynamic documentation pages
    const documentationUrls = getAllDocumentationSlugs().map(slug => ({
        loc: `/showcase/documentation/${slug}`
    }))

    // Dynamic project pages
    const projectUrls = getAllProjectSlugs().map(slug => ({
        loc: `/showcase/project/${slug}`
    }))

    return [...staticPages, ...documentationUrls, ...projectUrls]
})
