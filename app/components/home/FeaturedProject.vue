<script setup lang="ts">
</script>

<template>
    <section class="py-12 md:py-16 lg:py-24 relative overflow-hidden">

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-800 dark:text-white">
                    {{ $t('home.featured.title') }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto px-2">
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
                            class="text-2xl md:text-3xl lg:text-4xl font-black text-neutral-800 dark:text-white leading-tight">
                            {{ $t('home.featured.projectTitle') }}
                        </h3>

                        <!-- Description -->
                        <div class="space-y-3 md:space-y-4">
                            <p class="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                {{ $t('home.featured.description') }}
                            </p>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center pt-2 md:pt-4">
                            <NuxtLinkLocale to="/showcase/project/my-chat-bot"
                                class="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center hover:-translate-y-1">
                                <span class="flex items-center gap-3">
                                    <Icon name="mdi:eye"
                                        class="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                                    {{ $t('home.featured.cta.view') }}
                                </span>
                            </NuxtLinkLocale>

                            <a href="https://ai.chad.lu" target="_blank" rel="noopener noreferrer"
                                class="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center hover:-translate-y-1">
                                <span class="flex items-center gap-3">
                                    {{ $t('home.featured.cta.demo') }}
                                    <Icon name="mdi:rocket-launch"
                                        class="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
