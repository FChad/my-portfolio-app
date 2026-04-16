// Project Types and Utilities
// Similar structure to useDocumentation.ts for consistent project management

export interface ProjectFeature {
    id: string
    title: string // Translation key
    description: string // Translation key
    icon: string
}

export interface ProjectLink {
    type: 'demo' | 'source' | 'docs'
    url: string
    labelKey?: string // Optional translation key for custom label
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

import { projectConfigs, getProjectBySlug, getAllProjectConfigs } from '~/data/projects'

/**
 * Composable for working with project data
 * Provides access to project configurations and utility functions
 */
export function useProjects() {
    /**
     * Get a project configuration by its slug
     */
    const getProject = (slug: string): ProjectConfig | undefined => {
        return getProjectBySlug(slug)
    }

    /**
     * Get all project configurations
     */
    const getAllConfigs = (): ProjectConfig[] => {
        return getAllProjectConfigs()
    }

    /**
     * Check if a project exists by slug
     */
    const hasProject = (slug: string): boolean => {
        return slug in projectConfigs
    }

    return {
        getProject,
        getAllConfigs,
        hasProject
    }
}
