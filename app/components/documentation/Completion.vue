<script setup lang="ts">
interface Props {
    title: string
    message: string
}

defineProps<Props>()
</script>

<template>
    <section class="py-12 md:py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-900">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="flex flex-col items-center gap-4 md:gap-6">
                <!-- Success Icon -->
                <UiIconBox icon="mdi:check-circle" size="lg" color="bg-emerald-500" />

                <!-- Title -->
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
                    {{ title }}
                </h2>

                <!-- Message -->
                <p
                    class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto">
                    {{ message }}
                </p>
            </div>
        </div>
    </section>
</template>
