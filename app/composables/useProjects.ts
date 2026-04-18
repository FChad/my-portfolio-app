// Project Types and Utilities

export interface ProjectFeature {
    id: string
    title: string
    description: string
    icon: string
}

export interface ProjectLink {
    type: 'demo' | 'source' | 'docs'
    url: string
    labelKey?: string
}

export interface ProjectSubNav {
    titleKey: string
    showBackButton: boolean
    backTo: string
}

export interface ProjectConfig {
    slug: string
    titleKey: string
    descriptionKey: string
    tags: string[]
    links: ProjectLink[]
    illustrationVariant?: 'coding' | 'robot' | 'chatbot' | 'portfolio'
    seo: {
        titleKey: string
        descriptionKey: string
        keywordsKey: string
    }
    subNav: ProjectSubNav
    features: ProjectFeature[]
    callToAction: {
        titleKey: string
        subtitleKey: string
        buttonKey: string
        buttonUrl: string
    }
}

export { projectConfigs, getProjectBySlug, getAllProjectConfigs } from '~/data/projects'
