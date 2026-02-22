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
    <header class="sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
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
                <nav class="hidden md:flex items-center space-x-8 text-lg">
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
                <div class="flex items-center gap-4">
                    <!-- Mobile Menu Button -->
                    <button @click="mobileMenuOpen = !mobileMenuOpen" :aria-expanded="mobileMenuOpen"
                        aria-controls="mobile-menu"
                        :aria-label="mobileMenuOpen ? $t('common.closeMenu') : $t('common.openMenu')"
                        class="md:hidden flex items-center p-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                        <Icon v-if="!mobileMenuOpen" name="mdi:menu" class="w-5 h-5" />
                        <Icon v-else name="mdi:close" class="w-5 h-5" />
                    </button>

                    <!-- Desktop Controls -->
                    <div class="hidden md:flex items-center gap-3">
                        <FeaturesLanguageSwitcher />
                        <FeaturesThemeSwitcher />
                    </div>
                </div>
            </div>

            <!-- Mobile Navigation Menu -->
            <nav v-show="mobileMenuOpen" id="mobile-menu" :aria-label="$t('common.mobileNav')"
                class="md:hidden py-4 border-t border-neutral-200 dark:border-neutral-700">
                <div class="flex flex-col space-y-3 text-lg">
                    <NuxtLinkLocale v-for="link in navLinks" :key="link.key" :to="link.to"
                        @click="mobileMenuOpen = false" :class="[
                            'text-center font-medium px-3 py-2 text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400',
                            isActive(link.to) && 'text-blue-600! dark:text-blue-400!'
                        ]">
                        {{ $t(`nav.${link.key}`) }}
                    </NuxtLinkLocale>
                    <div class="flex justify-center gap-4 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                        <FeaturesLanguageSwitcher />
                        <FeaturesThemeSwitcher />
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>

<style scoped>
/* Active state underline for navigation links */
.nav-link.active .nav-underline {
    width: 100%;
}
</style>
