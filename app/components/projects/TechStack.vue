<script setup lang="ts">
import type { ProjectTechnology } from '~/composables/useProjects'

interface Props {
    title: string
    subtitle: string
    technologies: ProjectTechnology[]
}

defineProps<Props>()

const { t } = useI18n()
const { getColorClasses } = useColorMapping()
</script>

<template>
    <section class="py-10 sm:py-16 md:py-24 relative overflow-hidden">
        <!-- Subtle gradient background -->
        <div
            class="absolute inset-0 bg-linear-to-b from-transparent via-gray-50/50 to-transparent dark:via-gray-900/30">
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center space-y-3 sm:space-y-4 md:space-y-6 mb-8 sm:mb-12 md:mb-16">
                <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 dark:text-white">
                    {{ title }}
                </h2>
                <p
                    class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                    {{ subtitle }}
                </p>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                <div v-for="tech in technologies" :key="tech.id"
                    class="group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div class="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div :class="[
                            'w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300',
                            getColorClasses(tech.color).bg
                        ]">
                            <Icon :name="tech.icon" class="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {{ t(tech.name) }}
                        </span>
                    </div>
                    <h4 class="text-base sm:text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-1.5 sm:mb-2">
                        {{ t(tech.tech) }}
                    </h4>
                    <p class="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {{ t(tech.description) }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
