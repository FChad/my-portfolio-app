// SubNav State Management
// Pages can use this composable to set their SubNav configuration
// Uses Nuxt's useState for SSR-safe state management

export interface SubNavConfig {
    title: string
    showBackButton: boolean
    backTo: string
}

const defaultConfig: SubNavConfig = {
    title: '',
    showBackButton: true,
    backTo: '/showcase'
}

/**
 * Composable for managing SubNavigation state
 * Pages can call setSubNav() to configure their SubNav
 * 
 * Uses useState() which is SSR-safe and prevents:
 * - State pollution between requests on the server
 * - Hydration mismatches between server and client
 */
export function useSubNav() {
    // useState is SSR-safe - creates isolated state per request on server
    const subNavState = useState<SubNavConfig>('subNav', () => ({ ...defaultConfig }))

    /**
     * Set the SubNav configuration for the current page
     * Call this in your page's setup function
     */
    const setSubNav = (config: Partial<SubNavConfig> & { title: string }) => {
        subNavState.value = {
            ...defaultConfig,
            ...config
        }
    }

    /**
     * Clear the SubNav configuration (reset to defaults)
     */
    const clearSubNav = () => {
        subNavState.value = { ...defaultConfig }
    }

    return {
        setSubNav,
        clearSubNav,
        subNavConfig: subNavState
    }
}
