<script setup lang="ts">
const mobileMenuOpen = ref(false)
const route = useRoute()

// Navigation links configuration
const navLinks = [
    { to: '/', key: 'home' },
    { to: '/about', key: 'about' },
    { to: '/showcase', key: 'showcase' },
    { to: '/contact', key: 'contact' }
]

const isActive = (path: string) => {
    if (path === '/') {
        return route.path === '/' || route.path.match(/^\/[a-z]{2}$/)
    }
    return route.path.startsWith(path) || route.path.match(new RegExp(`^/[a-z]{2}${path}`))
}
</script>

<template>
    <!-- Header -->
    <header
        class="sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo/Name -->
                <div class="flex items-center">
                    <NuxtLinkLocale to="/"
                        class="title text-xl font-bold uppercase text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity">
                        Chad Feierstein
                    </NuxtLinkLocale>
                </div>

                <!-- Navigation Links -->
                <nav class="hidden md:flex items-center gap-8 text-lg">
                    <NuxtLinkLocale v-for="link in navLinks" :key="link.key" :to="link.to" :class="[
                        'nav-link font-medium relative group text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400',
                        isActive(link.to) && 'text-blue-600! dark:text-blue-400! active'
                    ]">
                        {{ $t(`nav.${link.key}`) }}
                        <span
                            class="nav-underline absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all"></span>
                    </NuxtLinkLocale>
                </nav>

                <!-- Right Side Controls -->
                <div class="flex items-center gap-2 md:gap-4">
                    <!-- Language & Theme (always visible) -->
                    <FeaturesLanguageSwitcher />
                    <FeaturesThemeSwitcher />

                    <!-- Mobile Menu Button -->
                    <div class="relative md:hidden">
                        <UiButton variant="secondary" square @click.stop="mobileMenuOpen = !mobileMenuOpen"
                            :aria-expanded="mobileMenuOpen" aria-controls="mobile-menu"
                            :aria-label="mobileMenuOpen ? $t('common.closeMenu') : $t('common.openMenu')">
                            <Icon v-if="!mobileMenuOpen" name="mdi:menu" class="w-5 h-5" />
                            <Icon v-else name="mdi:close" class="w-5 h-5" />
                        </UiButton>

                        <!-- Mobile Dropdown Menu -->
                        <nav v-show="mobileMenuOpen" id="mobile-menu" :aria-label="$t('common.mobileNav')"
                            class="absolute top-full right-0 mt-1 flex flex-col gap-1 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-sm z-60 p-2 min-w-44">
                            <NuxtLinkLocale v-for="link in navLinks" :key="link.key" :to="link.to"
                                @click="mobileMenuOpen = false" :class="[
                                    'flex items-center gap-3 w-full px-4 py-2 text-left font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md no-underline',
                                    isActive(link.to) && 'text-blue-600! dark:text-blue-400!'
                                ]">
                                {{ $t(`nav.${link.key}`) }}
                            </NuxtLinkLocale>
                        </nav>

                        <!-- Overlay zum Schließen -->
                        <div v-if="mobileMenuOpen" @click="mobileMenuOpen = false" class="fixed inset-0 z-55" />
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
/* Active state underline for navigation links */
.nav-link.active .nav-underline {
    width: 100%;
}
</style>
