<script setup lang="ts">
import { ref } from 'vue'

// Mobile menu state
const mobileMenuOpen = ref(false)
</script>

<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <NuxtRouteAnnouncer />

        <!-- Header -->
        <header
            class="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <!-- Logo/Name -->
                    <div class="flex items-center">
                        <NuxtLink to="/"
                            class="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Chad Feierstein
                        </NuxtLink>
                    </div>

                    <!-- Navigation Links -->
                    <nav class="hidden md:flex items-center space-x-8">
                        <NuxtLink to="/"
                            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors relative group">
                            Home
                            <span
                                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
                        </NuxtLink>
                        <NuxtLink to="/blog"
                            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors relative group router-link-active">
                            Blog
                            <span
                                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
                        </NuxtLink>
                    </nav>

                    <!-- Right Side Controls -->
                    <div class="flex items-center gap-4">
                        <!-- Mobile Menu Button -->
                        <button @click="mobileMenuOpen = !mobileMenuOpen"
                            class="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <Icon v-if="!mobileMenuOpen" name="heroicons:bars-3" class="w-6 h-6" />
                            <Icon v-else name="heroicons:x-mark" class="w-6 h-6" />
                        </button>

                        <!-- Desktop Controls -->
                        <div class="hidden md:flex items-center gap-3">
                            <LanguageToggle />
                            <ColorModeToggle />
                        </div>
                    </div>
                </div>

                <!-- Mobile Navigation Menu -->
                <div v-show="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                    <div class="flex flex-col space-y-3">
                        <NuxtLink to="/" @click="mobileMenuOpen = false"
                            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors px-3 py-2">
                            Home
                        </NuxtLink>
                        <NuxtLink to="/blog" @click="mobileMenuOpen = false"
                            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors px-3 py-2">
                            Blog
                        </NuxtLink>
                        <div
                            class="flex items-center justify-center gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <LanguageToggle />
                            <ColorModeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-4xl font-bold mb-8">Blog</h1>

                <!-- Blog Posts -->
                <div class="space-y-8">
                    <!-- Sample Blog Post -->
                    <article
                        class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div class="flex items-center gap-4 mb-4">
                            <div
                                class="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                CF
                            </div>
                            <div>
                                <h3 class="font-semibold">Chad Feierstein</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400">3. September 2024</p>
                            </div>
                        </div>
                        <h2 class="text-2xl font-bold mb-3">Willkommen zu meinem Portfolio Blog</h2>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">
                            Hier teile ich meine Gedanken über Webentwicklung, Design und Technologie.
                            Bleiben Sie dran für spannende Artikel und Tutorials!
                        </p>
                        <div class="flex items-center gap-4">
                            <span
                                class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                Webentwicklung
                            </span>
                            <span
                                class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                                Nuxt.js
                            </span>
                        </div>
                    </article>

                    <!-- Another Sample Blog Post -->
                    <article
                        class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div class="flex items-center gap-4 mb-4">
                            <div
                                class="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white font-bold">
                                CF
                            </div>
                            <div>
                                <h3 class="font-semibold">Chad Feierstein</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400">1. September 2024</p>
                            </div>
                        </div>
                        <h2 class="text-2xl font-bold mb-3">Moderne Webentwicklung mit Nuxt 3</h2>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">
                            Entdecken Sie die Möglichkeiten von Nuxt 3 und wie es die Entwicklung
                            von Vue.js Anwendungen revolutioniert. Von SSR bis zu statischen Sites.
                        </p>
                        <div class="flex items-center gap-4">
                            <span
                                class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                                Vue.js
                            </span>
                            <span
                                class="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm">
                                SSR
                            </span>
                        </div>
                    </article>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="border-t border-gray-200 dark:border-gray-700 mt-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <p class="text-center text-gray-600 dark:text-gray-300">
                    © 2024 Chad Feierstein. Erstellt mit Nuxt 3, Tailwind CSS und Color Mode
                </p>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.router-link-active {
    @apply text-blue-600 dark:text-blue-400;
}

.router-link-active span {
    @apply w-full;
}
</style>
