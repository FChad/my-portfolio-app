<script setup lang="ts">
interface EducationItem {
    year: string
    title: string
    description: string
    school?: string
    grade?: string
}

defineProps<{
    items: EducationItem[]
}>()
</script>

<template>
    <section class="py-12 md:py-16 lg:py-24 bg-neutral-100 dark:bg-neutral-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <p class="text-xs font-mono tracking-[0.2em] uppercase text-accent">
                    03 &mdash; Education
                </p>
                <h3 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-800 dark:text-white">
                    {{ $t('about.education.title') }}
                </h3>
            </div>

            <div class="grid lg:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
                <UiCard v-for="item in items" :key="item.title">
                    <div class="flex flex-col gap-3">
                        <div class="flex items-center gap-2 flex-wrap">
                            <UiBadge>{{ item.year }}</UiBadge>
                            <UiBadge v-if="item.grade" variant="blue">{{ item.grade }}</UiBadge>
                        </div>
                        <h4 class="font-display font-bold text-lg md:text-xl tracking-tight m-0 text-neutral-800 dark:text-white">
                            {{ item.title }}
                        </h4>
                        <div v-if="item.school" class="text-sm md:text-base text-accent font-semibold">
                            {{ item.school }}
                        </div>
                        <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed m-0">
                            {{ item.description }}
                        </p>
                    </div>
                </UiCard>
            </div>
        </div>
    </section>
</template>
