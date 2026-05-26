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
                    <!-- Section Label -->
                    <p class="text-xs font-mono tracking-[0.2em] uppercase text-accent">
                        01 &mdash; {{ $t('common.sections.labels.project') }}
                    </p>

                    <!-- Title -->
                    <h1 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand">
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
                            {{ $t('projects.actions.liveDemo') }}
                        </UiButton>

                        <UiButton v-if="getSourceLink(links)" variant="secondary" :href="getSourceLink(links)!.url"
                            external>
                            {{ $t('projects.actions.sourceCode') }}
                        </UiButton>
                    </div>
                </div>

                <!-- Right: Illustration -->
                <ProjectsProjectIllustration :variant="illustrationVariant" :bubble-text="bubbleText" />
            </div>
        </div>
    </section>
</template>
