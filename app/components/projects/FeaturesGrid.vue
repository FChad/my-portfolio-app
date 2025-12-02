<script setup lang="ts">
import type { ProjectFeature } from '~/composables/useProjects'

interface Props {
    title: string
    subtitle: string
    features: ProjectFeature[]
}

defineProps<Props>()

const { t } = useI18n()
const { getColorClasses } = useColorMapping()
</script>

<template>
    <section class="py-10 sm:py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center space-y-3 sm:space-y-4 md:space-y-6 mb-8 sm:mb-12 md:mb-16">
            <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 dark:text-white">
                {{ title }}
            </h2>
            <p
                class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {{ subtitle }}
            </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div v-for="feature in features" :key="feature.id"
                class="group bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div :class="[
                        'w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300',
                        getColorClasses(feature.color).bg
                    ]">
                        <Icon :name="feature.icon" class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                        {{ t(feature.title) }}
                    </h3>
                </div>
                <p class="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {{ t(feature.description) }}
                </p>
            </div>
        </div>
    </section>
</template>
