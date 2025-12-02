import type { ProjectConfig } from '~/composables/useProjects'

export const myPortfolioWebsiteConfig: ProjectConfig = {
    slug: 'my-portfolio-website',
    titleKey: 'projects.myPortfolio.title',
    descriptionKey: 'projects.myPortfolio.description',
    tags: ['Nuxt3', 'TypeScript', 'Tailwind', 'i18n', 'VeeValidate', 'Resend', 'Iconify'],
    links: [
        {
            type: 'demo',
            url: 'https://www.chad.lu'
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
            color: 'blue'
        },
        {
            id: 'responsive',
            title: 'projects.myPortfolio.features.responsive.title',
            description: 'projects.myPortfolio.features.responsive.description',
            icon: 'mdi:responsive',
            color: 'green'
        },
        {
            id: 'darkMode',
            title: 'projects.myPortfolio.features.darkMode.title',
            description: 'projects.myPortfolio.features.darkMode.description',
            icon: 'mdi:theme-light-dark',
            color: 'purple'
        },
        {
            id: 'performance',
            title: 'projects.myPortfolio.features.performance.title',
            description: 'projects.myPortfolio.features.performance.description',
            icon: 'mdi:lightning-bolt',
            color: 'orange'
        },
        {
            id: 'seo',
            title: 'projects.myPortfolio.features.seo.title',
            description: 'projects.myPortfolio.features.seo.description',
            icon: 'mdi:magnify',
            color: 'red'
        },
        {
            id: 'contact',
            title: 'projects.myPortfolio.features.contact.title',
            description: 'projects.myPortfolio.features.contact.description',
            icon: 'mdi:email-outline',
            color: 'blue'
        }
    ],
    technologies: [
        {
            id: 'nuxt3',
            name: 'projects.myPortfolio.technologies.nuxt3.name',
            tech: 'projects.myPortfolio.technologies.nuxt3.tech',
            icon: 'mdi:nuxt',
            description: 'projects.myPortfolio.technologies.nuxt3.description',
            color: 'green'
        },
        {
            id: 'vue3',
            name: 'projects.myPortfolio.technologies.vue3.name',
            tech: 'projects.myPortfolio.technologies.vue3.tech',
            icon: 'mdi:vuejs',
            description: 'projects.myPortfolio.technologies.vue3.description',
            color: 'green'
        },
        {
            id: 'typescript',
            name: 'projects.myPortfolio.technologies.typescript.name',
            tech: 'projects.myPortfolio.technologies.typescript.tech',
            icon: 'mdi:language-typescript',
            description: 'projects.myPortfolio.technologies.typescript.description',
            color: 'blue'
        },
        {
            id: 'tailwind',
            name: 'projects.myPortfolio.technologies.tailwind.name',
            tech: 'projects.myPortfolio.technologies.tailwind.tech',
            icon: 'mdi:tailwind',
            description: 'projects.myPortfolio.technologies.tailwind.description',
            color: 'blue'
        },
        {
            id: 'i18n',
            name: 'projects.myPortfolio.technologies.i18n.name',
            tech: 'projects.myPortfolio.technologies.i18n.tech',
            icon: 'mdi:translate',
            description: 'projects.myPortfolio.technologies.i18n.description',
            color: 'purple'
        },
        {
            id: 'veevalidate',
            name: 'projects.myPortfolio.technologies.veevalidate.name',
            tech: 'projects.myPortfolio.technologies.veevalidate.tech',
            icon: 'mdi:check-circle',
            description: 'projects.myPortfolio.technologies.veevalidate.description',
            color: 'green'
        },
        {
            id: 'resend',
            name: 'projects.myPortfolio.technologies.resend.name',
            tech: 'projects.myPortfolio.technologies.resend.tech',
            icon: 'mdi:email-send',
            description: 'projects.myPortfolio.technologies.resend.description',
            color: 'orange'
        },
        {
            id: 'iconify',
            name: 'projects.myPortfolio.technologies.iconify.name',
            tech: 'projects.myPortfolio.technologies.iconify.tech',
            icon: 'mdi:emoticon-outline',
            description: 'projects.myPortfolio.technologies.iconify.description',
            color: 'red'
        }
    ],
    callToAction: {
        titleKey: 'projects.myPortfolio.callToAction.title',
        subtitleKey: 'projects.myPortfolio.callToAction.subtitle',
        buttonKey: 'projects.myPortfolio.callToAction.button',
        buttonUrl: 'https://www.chad.lu'
    }
}
