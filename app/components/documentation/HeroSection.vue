<script setup lang="ts">
interface Props {
    title: string
    description: string
    tags: string[]
}

defineProps<Props>()
</script>

<template>
    <section class="relative py-12 sm:py-16 md:py-24 overflow-hidden">

        <!-- Content -->
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center space-y-4 sm:space-y-6 md:space-y-8">
                <!-- Title -->
                <h1
                    class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-neutral-800 dark:text-white">
                    {{ title }}
                </h1>

                <!-- Description -->
                <p
                    class="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-4xl mx-auto">
                    {{ description }}
                </p>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3 justify-center pt-2 sm:pt-4">
                    <span v-for="tag in tags" :key="tag"
                        class="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm text-neutral-700 dark:text-neutral-300 rounded-full text-xs sm:text-sm md:text-base font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                        {{ tag }}
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>
