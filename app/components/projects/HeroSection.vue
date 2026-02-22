<script setup lang="ts">
import type { ProjectLink } from '~/composables/useProjects'

interface Props {
    title: string
    description: string
    tags: string[]
    links: ProjectLink[]
}

defineProps<Props>()

// Helper to get link by type
const getDemoLink = (links: ProjectLink[]) => links.find(l => l.type === 'demo')
const getSourceLink = (links: ProjectLink[]) => links.find(l => l.type === 'source')
</script>

<template>
    <section class="relative py-12 sm:py-16 md:py-24 overflow-hidden">
        <!-- Gradient Background -->
        <div
            class="absolute inset-0 bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        </div>

        <!-- Content -->
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center space-y-4 sm:space-y-6 md:space-y-8">
                <!-- Title -->
                <h1
                    class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-800 dark:text-white">
                    {{ title }}
                </h1>

                <!-- Description -->
                <p
                    class="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
                    {{ description }}
                </p>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center pt-2 sm:pt-4">
                    <a v-if="getDemoLink(links)" :href="getDemoLink(links)!.url" target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                        <Icon name="mdi:rocket-launch" class="w-5 h-5" />
                        Live Demo
                        <Icon name="mdi:open-in-new" class="w-4 h-4" />
                    </a>

                    <a v-if="getSourceLink(links)" :href="getSourceLink(links)!.url" target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl border border-blue-600 dark:border-blue-400 transition-all duration-300 hover:-translate-y-0.5">
                        <Icon name="mdi:github" class="w-5 h-5" />
                        View Source
                        <Icon name="mdi:open-in-new" class="w-4 h-4" />
                    </a>
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3 justify-center pt-2 sm:pt-4">
                    <span v-for="tag in tags" :key="tag"
                        class="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm md:text-base font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                        {{ tag }}
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>
