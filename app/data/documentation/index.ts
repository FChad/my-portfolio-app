// Central registry for all documentation configurations
import type { DocumentationConfig } from '~/composables/useDocumentation'
import { debianInitialSetupConfig } from './debian-12-initial-setup'
import { debianOllamaSetupConfig } from './debian-ollama-setup'
import { debianCardanoNodeSetupConfig } from './debian-cardano-node-setup'
import { debianCardanoDbSyncSetupConfig } from './debian-cardano-db-sync-setup'

// Registry of all documentation configurations
export const documentationConfigs: Record<string, DocumentationConfig> = {
    'debian-12-initial-setup': debianInitialSetupConfig,
    'debian-ollama-setup': debianOllamaSetupConfig,
    'debian-cardano-node-setup': debianCardanoNodeSetupConfig,
    'debian-cardano-db-sync-setup': debianCardanoDbSyncSetupConfig,
}

/**
 * Get a documentation configuration by its slug
 */
export function getDocumentationBySlug(slug: string): DocumentationConfig | undefined {
    return documentationConfigs[slug]
}

/**
 * Get all documentation slugs
 */
export function getAllDocumentationSlugs(): string[] {
    return Object.keys(documentationConfigs)
}

/**
 * Get all documentation configurations
 */
export function getAllDocumentationConfigs(): DocumentationConfig[] {
    return Object.values(documentationConfigs)
}

// Re-export individual configs for direct imports
export { debianInitialSetupConfig } from './debian-12-initial-setup'
export { debianOllamaSetupConfig } from './debian-ollama-setup'
export { debianCardanoNodeSetupConfig } from './debian-cardano-node-setup'
export { debianCardanoDbSyncSetupConfig } from './debian-cardano-db-sync-setup'
