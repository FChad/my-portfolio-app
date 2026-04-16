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
 * Get all documentation configurations
 */
export function getAllDocumentationConfigs(): DocumentationConfig[] {
    return Object.values(documentationConfigs)
}
