<script setup lang="ts">
interface Resource {
    id: string
    title: string
    description: string
    url: string
    icon: string
}

interface Props {
    title: string
    subtitle: string
    resources: Resource[]
}

defineProps<Props>()

const { t } = useI18n()
</script>

<template>
    <section class="py-12 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
                    {{ title }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                    {{ subtitle }}
                </p>
            </div>

            <!-- Resources Grid -->
            <div class="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                <UiCard v-for="resource in resources" :key="resource.id">
                    <div class="flex items-start gap-3 md:gap-4">
                        <div class="flex-1 min-w-0">
                            <div class="flex items-start justify-between gap-2">
                                <h3 class="text-base md:text-lg lg:text-xl font-bold text-neutral-800 dark:text-white">
                                    {{ resource.title }}
                                </h3>
                                <UiButton variant="secondary" square :href="resource.url" external>
                                    <Icon name="mdi:external-link" class="w-4 h-4 md:w-5 md:h-5" />
                                </UiButton>
                            </div>
                            <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                {{ resource.description }}
                            </p>
                        </div>
                    </div>
                </UiCard>
            </div>
        </div>
    </section>
</template>
