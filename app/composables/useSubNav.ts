/**
 * Simple SubNav management for SSR using useState
 */

export function provideSubNav(title: string, showBackButton = true, backTo = '/showcase') {
    const state = useState('subNav', () => ({ title: '', showBackButton: true, backTo: '/showcase' }))
    state.value = { title, showBackButton, backTo }
}

export function useSubNav() {
    const state = useState('subNav', () => ({ title: '', showBackButton: true, backTo: '/showcase' }))
    return {
        title: computed(() => state.value.title),
        showBackButton: computed(() => state.value.showBackButton),
        backTo: computed(() => state.value.backTo)
    }
}
