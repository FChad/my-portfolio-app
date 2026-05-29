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
            <UiSectionHeader number="06" label="Certifications" :title="$t('about.certifications.title')"
                :subtitle="$t('about.certifications.subtitle')" as="h3" />

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
