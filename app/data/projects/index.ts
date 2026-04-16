// Central registry for all project configurations
import type { ProjectConfig } from '~/composables/useProjects'
import { myChatBotConfig } from './my-chat-bot'
import { myPortfolioWebsiteConfig } from './my-portfolio-website'

// Registry of all project configurations
export const projectConfigs: Record<string, ProjectConfig> = {
    'my-chat-bot': myChatBotConfig,
    'my-portfolio-website': myPortfolioWebsiteConfig,
}

/**
 * Get a project configuration by its slug
 */
export function getProjectBySlug(slug: string): ProjectConfig | undefined {
    return projectConfigs[slug]
}

/**
 * Get all project configurations
 */
export function getAllProjectConfigs(): ProjectConfig[] {
    return Object.values(projectConfigs)
}
