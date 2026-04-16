<script setup lang="ts">
interface Props {
    title: string
    description: string
    tags: string[]
}

defineProps<Props>()
</script>

<template>
    <section class="py-12 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center flex flex-col gap-3 md:gap-4">
                <!-- Title -->
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
                    {{ title }}
                </h1>

                <!-- Description -->
                <p
                    class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-4xl mx-auto">
                    {{ description }}
                </p>

                <!-- Tags -->
                <div class="flex flex-wrap gap-1.5 md:gap-2 justify-center pt-2 md:pt-4">
                    <UiBadge v-for="tag in tags" :key="tag">{{ tag }}</UiBadge>
                </div>
            </div>
        </div>
    </section>
</template>
