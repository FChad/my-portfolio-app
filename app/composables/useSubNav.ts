/**
 * Simple SubNav management for SSR using useState
 */

const defaultSubNav = () => ({ title: '', showBackButton: true, backTo: '/showcase' })

export function provideSubNav(title: string, showBackButton = true, backTo = '/showcase') {
    const state = useState('subNav', defaultSubNav)
    state.value = { title, showBackButton, backTo }
}

export function useSubNav() {
    const state = useState('subNav', defaultSubNav)
    return {
        title: computed(() => state.value.title),
        showBackButton: computed(() => state.value.showBackButton),
        backTo: computed(() => state.value.backTo)
    }
}
