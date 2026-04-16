import type { ProjectConfig } from '~/composables/useProjects'

export const myPortfolioWebsiteConfig: ProjectConfig = {
    slug: 'my-portfolio-website',
    titleKey: 'projects.myPortfolio.title',
    descriptionKey: 'projects.myPortfolio.description',
    tags: ['Nuxt', 'TypeScript', 'Tailwind', 'i18n', 'Resend', 'Iconify'],
    illustrationVariant: 'portfolio',
    links: [
        {
            type: 'demo',
            url: '/'
        },
        {
            type: 'source',
            url: 'https://github.com/FChad/my-portfolio-app'
        }
    ],
    seo: {
        titleKey: 'seo.projects.portfolio.title',
        descriptionKey: 'seo.projects.portfolio.description',
        keywordsKey: 'seo.projects.portfolio.keywords'
    },
    subNav: {
        titleKey: 'projects.myPortfolio.title',
        showBackButton: true,
        backTo: '/showcase'
    },
    features: [
        {
            id: 'multilingual',
            title: 'projects.myPortfolio.features.multilingual.title',
            description: 'projects.myPortfolio.features.multilingual.description',
            icon: 'mdi:web',
        },
        {
            id: 'responsive',
            title: 'projects.myPortfolio.features.responsive.title',
            description: 'projects.myPortfolio.features.responsive.description',
            icon: 'mdi:responsive',
        },
        {
            id: 'darkMode',
            title: 'projects.myPortfolio.features.darkMode.title',
            description: 'projects.myPortfolio.features.darkMode.description',
            icon: 'mdi:theme-light-dark',
        },
        {
            id: 'performance',
            title: 'projects.myPortfolio.features.performance.title',
            description: 'projects.myPortfolio.features.performance.description',
            icon: 'mdi:lightning-bolt',
        },
        {
            id: 'seo',
            title: 'projects.myPortfolio.features.seo.title',
            description: 'projects.myPortfolio.features.seo.description',
            icon: 'mdi:magnify',
        },
        {
            id: 'contact',
            title: 'projects.myPortfolio.features.contact.title',
            description: 'projects.myPortfolio.features.contact.description',
            icon: 'mdi:email-outline',
        }
    ],
    callToAction: {
        titleKey: 'projects.myPortfolio.callToAction.title',
        subtitleKey: 'projects.myPortfolio.callToAction.subtitle',
        buttonKey: 'projects.myPortfolio.callToAction.button',
        buttonUrl: '/'
    }
}
