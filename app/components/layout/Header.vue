<script setup lang="ts">
const mobileMenuOpen = ref(false)
const route = useRoute()

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
                        'nav-link font-medium relative group text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400',
                        isActive('/') && '!text-blue-600 dark:!text-blue-400 active'
                    ]">
                        {{ $t('nav.home') }}
                        <span
                            class="nav-underline absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all"></span>
                    </NuxtLinkLocale>
                    <NuxtLinkLocale to="/about" :class="[
                        'nav-link font-medium relative group text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400',
                        isActive('/about') && '!text-blue-600 dark:!text-blue-400 active'
                    ]">
                        {{ $t('nav.about') }}
                        <span
                            class="nav-underline absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all"></span>
                    </NuxtLinkLocale>
                    <NuxtLinkLocale to="/showcase" :class="[
                        'nav-link font-medium relative group text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400',
                        isActive('/showcase') && '!text-blue-600 dark:!text-blue-400 active'
                    ]">
                        {{ $t('nav.showcase') }}
                        <span
                            class="nav-underline absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all"></span>
                    </NuxtLinkLocale>
                    <NuxtLinkLocale to="/contact" :class="[
                        'nav-link font-medium relative group text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400',
                        isActive('/contact') && '!text-blue-600 dark:!text-blue-400 active'
                    ]">
                        {{ $t('nav.contact') }}
                        <span
                            class="nav-underline absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all"></span>
                    </NuxtLinkLocale>
                </nav>

                <!-- Right Side Controls -->
                <div class="flex items-center gap-4">
                    <!-- Mobile Menu Button -->
                    <button @click="mobileMenuOpen = !mobileMenuOpen"
                        class="md:hidden flex items-center p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
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
            <div v-show="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                <div class="flex flex-col space-y-3 text-lg">
                    <NuxtLinkLocale to="/" @click="mobileMenuOpen = false" :class="[
                        'text-center font-medium px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400',
                        isActive('/') && '!text-blue-600 dark:!text-blue-400'
                    ]">
                        {{ $t('nav.home') }}
                    </NuxtLinkLocale>
                    <NuxtLinkLocale to="/about" @click="mobileMenuOpen = false" :class="[
                        'text-center font-medium px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400',
                        isActive('/about') && '!text-blue-600 dark:!text-blue-400'
                    ]">
                        {{ $t('nav.about') }}
                    </NuxtLinkLocale>
                    <NuxtLinkLocale to="/showcase" @click="mobileMenuOpen = false" :class="[
                        'text-center font-medium px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400',
                        isActive('/showcase') && '!text-blue-600 dark:!text-blue-400'
                    ]">
                        {{ $t('nav.showcase') }}
                    </NuxtLinkLocale>
                    <NuxtLinkLocale to="/contact" @click="mobileMenuOpen = false" :class="[
                        'text-center font-medium px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400',
                        isActive('/contact') && '!text-blue-600 dark:!text-blue-400'
                    ]">
                        {{ $t('nav.contact') }}
                    </NuxtLinkLocale>
                    <div class="flex justify-center gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <FeaturesLanguageSwitcher />
                        <FeaturesThemeSwitcher />
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
