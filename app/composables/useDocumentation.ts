// Documentation Types and Utilities
// Note: Steps, commands, tips, and troubleshooting use direct English text (no translation keys)
// Only wrapper texts (title, description) use translation keys

export interface DocCommand {
    command: string
    description: string
    note?: string
    isFile?: boolean
    fileName?: string
    fileContent?: string
    language?: string
}

export interface DocStep {
    id: string
    title: string
    description: string
    commands: DocCommand[]
    note?: string
}

export interface DocTip {
    id: string
    title: string
    icon: string
    commands: DocCommand[]
}

export interface DocTroubleshooting {
    id: string
    title: string
    icon: string
    commands: DocCommand[]
}

export interface DocResource {
    id: string
    title: string
    description: string
    url: string
    icon: string
}

export interface DocSubNav {
    titleKey: string
    showBackButton: boolean
    backTo: string
}

export interface DocumentationConfig {
    slug: string
    titleKey: string
    descriptionKey: string
    tags: string[]
    seo: {
        titleKey: string
        descriptionKey: string
        keywordsKey: string
    }
    subNav: DocSubNav
    steps: DocStep[]
    tips?: DocTip[]
    troubleshooting?: DocTroubleshooting[]
    resources?: DocResource[]
}

export { documentationConfigs, getDocumentationBySlug, getAllDocumentationConfigs } from '~/data/documentation'
