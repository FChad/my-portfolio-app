<script setup lang="ts">
import type { ProjectLink } from '~/composables/useProjects'

interface Props {
    title: string
    description: string
    tags: string[]
    links: ProjectLink[]
    illustrationVariant?: 'coding' | 'robot' | 'chatbot' | 'portfolio'
    bubbleText?: string
}

const props = withDefaults(defineProps<Props>(), {
    illustrationVariant: 'coding',
    bubbleText: ''
})

// Helper to get link by type
const getDemoLink = (links: ProjectLink[]) => links.find(l => l.type === 'demo')
const getSourceLink = (links: ProjectLink[]) => links.find(l => l.type === 'source')
</script>

<template>
    <section class="py-12 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
                <!-- Left: Title, description & actions -->
                <div class="flex flex-col gap-4 md:gap-6">
                    <!-- Title -->
                    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
                        {{ title }}
                    </h1>

                    <!-- Description -->
                    <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {{ description }}
                    </p>

                    <!-- Tags -->
                    <div class="flex flex-wrap gap-1.5 md:gap-2">
                        <UiBadge v-for="tag in tags" :key="tag">{{ tag }}</UiBadge>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex flex-col sm:flex-row gap-3 sm:gap-5 pt-2">
                        <UiButton v-if="getDemoLink(links)" variant="primary" :href="getDemoLink(links)!.url" external>
                            <span class="flex items-center gap-2 sm:gap-3">
                                <Icon name="mdi:rocket-launch"
                                    class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform" />
                                Live Demo
                            </span>
                        </UiButton>

                        <UiButton v-if="getSourceLink(links)" variant="secondary" :href="getSourceLink(links)!.url"
                            external>
                            <span class="flex items-center gap-2 sm:gap-3">
                                <Icon name="mdi:github"
                                    class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform" />
                                Source Code
                            </span>
                        </UiButton>
                    </div>
                </div>

                <!-- Right: Illustration -->
                <ProjectsProjectIllustration :variant="illustrationVariant" :bubble-text="bubbleText" />
            </div>
        </div>
    </section>
</template>
