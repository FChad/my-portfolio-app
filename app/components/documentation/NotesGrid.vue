<script setup lang="ts">
import type { DocNote } from '~/composables/useDocumentation'

interface Props {
    title: string
    subtitle: string
    notes: DocNote[]
}

defineProps<Props>()

const { t } = useI18n()
</script>

<template>
    <section class="py-12 sm:py-16 md:py-24 relative overflow-hidden">

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-8 sm:mb-12 md:mb-16">
                <h2
                    class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-neutral-800 dark:text-white mb-3 sm:mb-4">
                    {{ title }}
                </h2>
                <p class="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                    {{ subtitle }}
                </p>
            </div>

            <!-- Notes Grid -->
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                <div v-for="note in notes" :key="note.id"
                    class="group bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div class="flex items-center gap-2.5 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                        <div class="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 bg-blue-500">
                            <Icon :name="note.icon" class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                        </div>
                        <h3 class="text-base sm:text-lg md:text-xl font-bold text-neutral-800 dark:text-white">
                            {{ t(note.title) }}
                        </h3>
                    </div>
                    <p class="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {{ t(note.description) }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
