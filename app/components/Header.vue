<script setup lang="ts">
// Mobile menu state
const mobileMenuOpen = ref(false)

// Route and locale composables
const route = useRoute()
const { locale } = useI18n()

// Check if current route matches the given path (supporting localized routes)
const isActiveRoute = (path: string) => {
    // For home page, check if we're on the root or localized root
    if (path === '/') {
        const isRoot = route.path === '/' || route.path === `/${locale.value}`
        return isRoot
    }

    // For other pages, check if path starts with the given path
    // Handle both localized and non-localized routes
    const currentPath = route.path
    const localizedPath = locale.value === 'de' ? path : `/${locale.value}${path}`

    return currentPath.startsWith(path) || currentPath.startsWith(localizedPath)
}
</script>

<template>
    <!-- Header -->
    <header
        class="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
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
                    <NuxtLinkLocale to="/" :class="[
                        'font-medium transition-colors relative group',
                        isActiveRoute('/')
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    ]">
                        {{ $t('nav.home') }}
                        <span :class="[
                            'absolute -bottom-1 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all',
                            isActiveRoute('/') ? 'w-full' : 'w-0 group-hover:w-full'
                        ]"></span>
                    </NuxtLinkLocale>
                    <NuxtLinkLocale to="/about" :class="[
                        'font-medium transition-colors relative group',
                        isActiveRoute('/about')
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    ]">
                        {{ $t('nav.about') }}
                        <span :class="[
                            'absolute -bottom-1 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all',
                            isActiveRoute('/about') ? 'w-full' : 'w-0 group-hover:w-full'
                        ]"></span>
                    </NuxtLinkLocale>
                    <NuxtLinkLocale to="/showcase" :class="[
                        'font-medium transition-colors relative group',
                        isActiveRoute('/showcase')
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    ]">
                        {{ $t('nav.showcase') }}
                        <span :class="[
                            'absolute -bottom-1 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all',
                            isActiveRoute('/showcase') ? 'w-full' : 'w-0 group-hover:w-full'
                        ]"></span>
                    </NuxtLinkLocale>
                    <NuxtLinkLocale to="/contact" :class="[
                        'font-medium transition-colors relative group',
                        isActiveRoute('/contact')
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    ]">
                        {{ $t('nav.contact') }}
                        <span :class="[
                            'absolute -bottom-1 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all',
                            isActiveRoute('/contact') ? 'w-full' : 'w-0 group-hover:w-full'
                        ]"></span>
                    </NuxtLinkLocale>
                </nav>

                <!-- Right Side Controls -->
                <div class="flex items-center gap-4">
                    <!-- Mobile Menu Button -->
                    <button @click="mobileMenuOpen = !mobileMenuOpen"
                        class="md:hidden flex items-center p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors">
                        <Icon v-if="!mobileMenuOpen" name="mdi:menu" class="w-5 h-5" />
                        <Icon v-else name="mdi:close" class="w-5 h-5" />
                    </button>

                    <!-- Desktop Controls -->
                    <div class="hidden md:flex items-center gap-3">
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>

            <!-- Mobile Navigation Menu -->
            <div v-show="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                <div class="flex flex-col space-y-3 text-lg">
                    <NuxtLinkLocale to="/" @click="mobileMenuOpen = false" :class="[
                        'text-center font-medium transition-colors px-3 py-2',
                        isActiveRoute('/')
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    ]">
                        {{ $t('nav.home') }}
                    </NuxtLinkLocale>
                    <NuxtLinkLocale to="/about" @click="mobileMenuOpen = false" :class="[
                        'text-center font-medium transition-colors px-3 py-2',
                        isActiveRoute('/about')
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    ]">
                        {{ $t('nav.about') }}
                    </NuxtLinkLocale>
                    <NuxtLinkLocale to="/showcase" @click="mobileMenuOpen = false" :class="[
                        'text-center font-medium transition-colors px-3 py-2',
                        isActiveRoute('/showcase')
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    ]">
                        {{ $t('nav.showcase') }}
                    </NuxtLinkLocale>
                    <NuxtLinkLocale to="/contact" @click="mobileMenuOpen = false" :class="[
                        'text-center font-medium transition-colors px-3 py-2',
                        isActiveRoute('/contact')
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    ]">
                        {{ $t('nav.contact') }}
                    </NuxtLinkLocale>
                    <div class="flex justify-center gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
/* Custom styles if needed */
</style>
