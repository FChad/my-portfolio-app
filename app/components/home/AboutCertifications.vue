<script setup lang="ts">
interface Certification {
    title: string
    year: string
    description: string
    icon: string
}

defineProps<{
    certifications: Certification[]
}>()
</script>

<template>
    <section class="py-12 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <p class="text-xs font-mono tracking-[0.2em] uppercase text-accent">
                    06 &mdash; Certifications
                </p>
                <h3 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-800 dark:text-white">
                    {{ $t('about.certifications.title') }}
                </h3>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                    {{ $t('about.certifications.subtitle') }}
                </p>
            </div>

            <div class="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <UiCard v-for="cert in certifications" :key="cert.title">
                    <div class="flex flex-col gap-3 md:gap-4">
                        <div class="flex items-start justify-between gap-3">
                            <UiIconBox :icon="cert.icon || 'mdi:award'" />
                            <UiBadge>{{ cert.year }}</UiBadge>
                        </div>
                        <div class="flex flex-col gap-1.5 min-w-0">
                            <h4 class="text-base md:text-lg font-display font-semibold text-neutral-800 dark:text-white">
                                {{ cert.title }}
                            </h4>
                            <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed m-0">
                                {{ cert.description }}
                            </p>
                        </div>
                    </div>
                </UiCard>
            </div>
        </div>
    </section>
</template>
