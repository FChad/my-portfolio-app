<script setup lang="ts">
const techStack = computed(() => [
    'Vue.js 3',
    'Nuxt.js',
    'TypeScript',
    'OpenRouter.ai',
    '+2'
])
</script>

<template>
    <section class="py-12 md:py-16 lg:py-24 relative overflow-hidden">
        <div
            class="absolute inset-0 bg-gradient-to-b from-transparent via-purple-100/60 to-transparent dark:via-purple-900/10">
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 dark:text-white">
                    {{ $t('home.featured.title') }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2">
                    {{ $t('home.featured.subtitle') }}
                </p>
            </div>

            <!-- Main Container -->
            <div class="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
                <!-- Left: Visual/Interactive Side -->
                <div class="relative order-2 lg:order-1">
                    <FeaturesVisualBrowser url="https://ai.chad.lu" favicon="mdi:robot-excited">
                        <FeaturesAiChatInterface />
                    </FeaturesVisualBrowser>
                </div>

                <!-- Right: Content Side -->
                <div class="order-1 lg:order-2">
                    <div class="space-y-4 md:space-y-5 lg:space-y-6">
                        <!-- Project Title -->
                        <h3
                            class="text-2xl md:text-3xl lg:text-4xl font-black text-gray-800 dark:text-white leading-tight">
                            {{ $t('home.featured.projectTitle') }}
                        </h3>

                        <!-- Description -->
                        <div class="space-y-3 md:space-y-4">
                            <p class="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                {{ $t('home.featured.description') }}
                            </p>
                        </div>

                        <!-- Tech Stack -->
                        <div class="space-y-2 md:space-y-3">
                            <h4
                                class="text-xs md:text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <Icon name="mdi:cog" class="w-3.5 h-3.5 md:w-4 md:h-4" />
                                {{ $t('home.featured.techStack') }}
                            </h4>
                            <div class="flex flex-wrap gap-2">
                                <span v-for="(tech, index) in techStack" :key="index"
                                    :class="index === techStack.length - 1
                                        ? 'px-2.5 py-1 md:px-3 md:py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full text-xs md:text-sm'
                                        : 'px-2.5 py-1 md:px-3 md:py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs md:text-sm font-medium'">
                                    {{ tech }}
                                </span>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                            <NuxtLinkLocale to="/showcase/project/my-chat-bot"
                                class="flex-1 inline-flex items-center justify-center gap-2 md:gap-3 px-5 py-2.5 md:px-6 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl md:rounded-2xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-sm md:text-base">
                                <Icon name="mdi:eye" class="w-4 h-4 md:w-5 md:h-5" />
                                {{ $t('home.featured.cta.view') }}
                            </NuxtLinkLocale>

                            <a href="https://ai.chad.lu" target="_blank" rel="noopener noreferrer"
                                class="flex-1 inline-flex items-center justify-center gap-2 md:gap-3 px-5 py-2.5 md:px-6 md:py-3 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl md:rounded-2xl font-bold border border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-sm md:text-base">
                                <Icon name="mdi:rocket-launch" class="w-4 h-4 md:w-5 md:h-5" />
                                {{ $t('home.featured.cta.demo') }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
