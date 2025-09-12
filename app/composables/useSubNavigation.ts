export interface SubNavProps {
    title: string
    showBackButton?: boolean
    backTo?: string
    backLabel?: string
}

export const useSubNavigation = () => {
    const setSubNav = inject<(props: SubNavProps | null) => void>('setSubNav')

    if (!setSubNav) {
        throw new Error('useSubNavigation must be used within a layout that provides setSubNav')
    }

    const configure = (props: SubNavProps) => {
        setSubNav(props)
    }

    const clear = () => {
        setSubNav(null)
    }

    // Auto-cleanup on unmount
    onUnmounted(() => {
        clear()
    })

    return {
        configure,
        clear
    }
}