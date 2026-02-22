<script setup lang="ts">
interface Props {
    title: string
    message: string
}

defineProps<Props>()
</script>

<template>
    <section class="py-10 sm:py-16 md:py-24 relative overflow-hidden">

        <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
                class="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border border-blue-200 dark:border-blue-700/50 rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-12 text-center shadow-lg hover:shadow-2xl transition-all duration-300">
                <!-- Success Icon -->
                <div
                    class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-500 rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 shadow-lg">
                    <Icon name="mdi:check-circle" class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                </div>

                <!-- Title -->
                <h3
                    class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-blue-800 dark:text-blue-300 mb-3 sm:mb-4 md:mb-6">
                    {{ title }}
                </h3>

                <!-- Message -->
                <p
                    class="text-sm sm:text-base md:text-lg lg:text-xl text-blue-700 dark:text-blue-200 leading-relaxed max-w-2xl mx-auto">
                    {{ message }}
                </p>
            </div>
        </div>
    </section>
</template>
