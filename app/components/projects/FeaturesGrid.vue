<script setup lang="ts">
import type { ProjectFeature } from '~/composables/useProjects'

interface Props {
    title: string
    subtitle: string
    features: ProjectFeature[]
}

defineProps<Props>()

const { t } = useI18n()
</script>

<template>
    <section class="py-12 md:py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center flex flex-col gap-3 md:gap-4 lg:gap-6 mb-8 md:mb-12 lg:mb-16">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
                {{ title }}
            </h2>
            <p
                class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed">
                {{ subtitle }}
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
            <UiCard v-for="feature in features" :key="feature.id">
                <div class="flex items-start md:items-center gap-3 md:gap-4">
                    <UiIconBox :icon="feature.icon" />
                    <div class="flex-1 min-w-0">
                        <h3 class="text-sm md:text-base lg:text-xl font-bold text-neutral-800 dark:text-white">
                            {{ t(feature.title) }}
                        </h3>
                        <p class="text-sm md:text-base text-neutral-500 dark:text-neutral-400 mt-0.5">
                            {{ t(feature.description) }}
                        </p>
                    </div>
                </div>
            </UiCard>
        </div>
    </section>
</template>
