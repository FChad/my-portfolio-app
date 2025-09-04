<script setup lang="ts">
// Mobile menu state
const mobileMenuOpen = ref(false)
</script>

<template>
    <!-- Header -->
    <header
        class="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo/Name -->
                <div class="flex items-center">
                    <NuxtLinkLocale to="/"
                        class="logo-gradient text-xl font-bold uppercase bg-gradient-to-r from-rose-500 via-violet-600 to-indigo-600 dark:from-rose-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                        Chad Feierstein
                    </NuxtLinkLocale>
                </div>

                <!-- Navigation Links -->
                <nav class="hidden md:flex items-center space-x-8">
                    <NuxtLinkLocale to="/"
                        class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors relative group router-link-active">
                        {{ $t('nav.home') }}
                        <span
                            class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
                    </NuxtLinkLocale>
                    <NuxtLinkLocale to="/about"
                        class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors relative group">
                        {{ $t('nav.about') }}
                        <span
                            class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
                    </NuxtLinkLocale>
                    <NuxtLinkLocale to="/blog"
                        class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors relative group">
                        {{ $t('nav.blog') }}
                        <span
                            class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
                    </NuxtLinkLocale>
                </nav>

                <!-- Right Side Controls -->
                <div class="flex items-center gap-4">
                    <!-- Mobile Menu Button -->
                    <button @click="mobileMenuOpen = !mobileMenuOpen"
                        class="md:hidden flex items-center p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Icon v-if="!mobileMenuOpen" name="heroicons:bars-3" class="w-5 h-5" />
                        <Icon v-else name="heroicons:x-mark" class="w-5 h-5" />
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
                <div class="flex flex-col space-y-3">
                    <NuxtLink to="/" @click="mobileMenuOpen = false"
                        class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors px-3 py-2">
                        {{ $t('nav.home') }}
                    </NuxtLink>
                    <NuxtLink to="/about" @click="mobileMenuOpen = false"
                        class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors px-3 py-2">
                        {{ $t('nav.about') }}
                    </NuxtLink>
                    <NuxtLink to="/blog" @click="mobileMenuOpen = false"
                        class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors px-3 py-2">
                        {{ $t('nav.blog') }}
                    </NuxtLink>
                    <div
                        class="flex items-center justify-center gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
.router-link-exact-active:not(.logo-gradient) {
    color: rgb(37 99 235);
}

.dark .router-link-exact-active:not(.logo-gradient) {
    color: rgb(96 165 250);
}

.router-link-exact-active span {
    width: 100%;
}
</style>