<script setup lang="ts">
interface Resource {
    id: string
    title: string
    description: string
    url: string
    icon: string
    gradient: string
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
    <section class="py-12 sm:py-16 md:py-24 relative overflow-hidden">
        <!-- Gradient background -->
        <div
            class="absolute inset-0 bg-gradient-to-b from-transparent via-green-100/40 to-transparent dark:via-green-900/10">
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-8 sm:mb-12 md:mb-16">
                <h2
                    class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 dark:text-white mb-3 sm:mb-4">
                    {{ title }}
                </h2>
                <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    {{ subtitle }}
                </p>
            </div>

            <!-- Resources Grid -->
            <div class="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <NuxtLink v-for="resource in resources" :key="resource.id" external :to="resource.url" target="_blank"
                    class="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-start gap-3 sm:gap-4">
                    <div :class="[
                        'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300',
                        resource.gradient
                    ]">
                        <Icon :name="resource.icon" class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-start justify-between gap-2 mb-1.5 sm:mb-2">
                            <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-800 dark:text-white">
                                {{ t(resource.title) }}
                            </h3>
                            <Icon name="mdi:external-link"
                                class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 flex-shrink-0 transition-colors" />
                        </div>
                        <p class="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                            {{ t(resource.description) }}
                        </p>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
