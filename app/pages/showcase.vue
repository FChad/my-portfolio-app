<script setup lang="ts">
import { ref } from 'vue'

// Mobile menu state
const mobileMenuOpen = ref(false)
</script>

<template>
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="max-w-4xl mx-auto min-h-[calc(100vh-65px)]">
            <h1 class="text-4xl font-bold mb-8">Showcase</h1>

            <!-- Blog Posts -->
            <div class="space-y-8">
                <!-- Sample Blog Post -->
                <article class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
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
                <article class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
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
</template>
