// Documentation Types and Utilities
// Note: Steps, commands, tips, and troubleshooting use direct English text (no translation keys)
// Only wrapper texts (title, description, notes, completion) use translation keys

export interface DocCommand {
    command: string
    description: string // Direct English text (not a translation key)
    note?: string // Direct English text (not a translation key)
    isFile?: boolean
    fileName?: string
    fileContent?: string
    language?: string
}

export interface DocStep {
    id: string
    title: string // Direct English text (not a translation key)
    description: string // Direct English text (not a translation key)
    commands: DocCommand[]
    note?: string // Direct English text (not a translation key)
    icon: string
}

export interface DocNote {
    id: string
    title: string // Translation key
    description: string // Translation key
    icon: string
    color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'amber' | 'emerald' | 'teal'
}

export interface DocTip {
    id: string
    title: string // Direct English text (not a translation key)
    icon: string
    color?: string
    commands: DocCommand[]
}

export interface DocTroubleshooting {
    id: string
    title: string // Direct English text (not a translation key)
    icon: string
    commands: DocCommand[]
}

export interface DocResource {
    id: string
    title: string
    description: string
    url: string
    icon: string
    gradient: string
}

export interface DocCompletion {
    title: string
    message: string
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
    notes: DocNote[]
    steps: DocStep[]
    tips?: DocTip[]
    troubleshooting?: DocTroubleshooting[]
    resources?: DocResource[]
    completion: DocCompletion
}

// Import documentation configs from data files
import { documentationConfigs, getDocumentationBySlug, getAllDocumentationSlugs, getAllDocumentationConfigs } from '~/data/documentation'

/**
 * Composable for working with documentation data
 * Provides access to documentation configurations and utility functions
 */
export function useDocumentation() {
    /**
     * Get a documentation configuration by its slug
     */
    const getDocumentation = (slug: string): DocumentationConfig | undefined => {
        return getDocumentationBySlug(slug)
    }

    /**
     * Get all available documentation slugs
     */
    const getSlugs = (): string[] => {
        return getAllDocumentationSlugs()
    }

    /**
     * Get all documentation configurations
     */
    const getAllConfigs = (): DocumentationConfig[] => {
        return getAllDocumentationConfigs()
    }

    /**
     * Check if a documentation exists by slug
     */
    const hasDocumentation = (slug: string): boolean => {
        return slug in documentationConfigs
    }

    return {
        getDocumentation,
        getSlugs,
        getAllConfigs,
        hasDocumentation,
        // Also export the raw configs for direct access
        documentationConfigs
    }
}
