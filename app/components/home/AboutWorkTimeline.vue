<script setup lang="ts">
interface WorkItem {
    year: string
    title: string
    description: string
    company?: string
    type?: string
    active?: boolean
}

defineProps<{
    items: WorkItem[]
}>()
</script>

<template>
    <section class="py-12 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <UiSectionHeader number="04" label="Career" :title="$t('about.work.journey')"
                :subtitle="$t('about.work.subtitle')" as="h3" />

            <div class="max-w-3xl mx-auto">
                <div v-for="(item, index) in items" :key="`${item.year}-${index}`"
                    class="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-3 sm:gap-6 py-6 border-b border-neutral-200 dark:border-neutral-700"
                    :class="index === 0 ? 'border-t' : ''">
                    <div class="flex items-start pt-0.5">
                        <span class="font-display font-bold text-base md:text-lg tracking-tight"
                            :class="item.active ? 'text-accent' : 'text-neutral-500 dark:text-neutral-400'">
                            {{ item.year }}
                        </span>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div class="flex items-start justify-between gap-3">
                            <div class="font-display font-semibold text-base md:text-lg tracking-tight text-neutral-800 dark:text-white min-w-0">
                                {{ item.title }}
                            </div>
                            <div class="flex items-center gap-1.5 shrink-0">
                                <UiBadge v-if="item.active" variant="green">{{ $t('about.work.active') }}</UiBadge>
                                <UiBadge v-if="item.type" variant="blue">{{ item.type }}</UiBadge>
                            </div>
                        </div>
                        <div v-if="item.company" class="text-sm md:text-base text-accent font-medium">
                            {{ item.company }}
                        </div>
                        <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed m-0">
                            {{ item.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
