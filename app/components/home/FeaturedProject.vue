<template>
    <section class="py-12 md:py-16 lg:py-24 relative overflow-hidden">

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
                    {{ $t('home.featured.title') }}
                </h2>
                <p
                    class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto px-2">
                    {{ $t('home.featured.subtitle') }}
                </p>
            </div>

            <!-- Main Container -->
            <div class="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
                <!-- Left: Visual/Interactive Side -->
                <div class="relative order-2 lg:order-1">
                    <ProjectsIllustrationsChatBotPreview />
                </div>

                <!-- Right: Content Side -->
                <div class="order-1 lg:order-2 contents lg:block">
                    <div class="order-1 lg:order-0 flex flex-col gap-4 md:gap-5 lg:gap-6">
                        <!-- Project Title -->
                        <h3
                            class="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-white leading-tight">
                            {{ $t('home.featured.projectTitle') }}
                        </h3>

                        <!-- Description -->
                        <div class="flex flex-col gap-3 md:gap-4">
                            <p class="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                {{ $t('home.featured.description') }}
                            </p>
                        </div>

                        <!-- Action Buttons (hidden on mobile, shown on desktop inside this block) -->
                        <div
                            class="hidden lg:flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center pt-2 md:pt-4">
                            <UiButton variant="primary" to="/showcase/project/my-chat-bot">
                                <span class="flex items-center gap-2 sm:gap-3">
                                    <Icon name="mdi:eye"
                                        class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform" />
                                    {{ $t('home.featured.cta.view') }}
                                </span>
                            </UiButton>

                            <UiButton variant="secondary" href="https://ai.chad.lu" external>
                                <span class="flex items-center gap-2 sm:gap-3">
                                    {{ $t('home.featured.cta.demo') }}
                                    <Icon name="mdi:rocket-launch"
                                        class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform" />
                                </span>
                            </UiButton>
                        </div>
                    </div>

                    <!-- Action Buttons (mobile only, after illustration) -->
                    <div
                        class="flex lg:hidden order-3 flex-col sm:flex-row gap-3 justify-center pt-2">
                        <UiButton variant="primary" to="/showcase/project/my-chat-bot">
                            <span class="flex items-center gap-2 sm:gap-3">
                                <Icon name="mdi:eye"
                                    class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform" />
                                {{ $t('home.featured.cta.view') }}
                            </span>
                        </UiButton>

                        <UiButton variant="secondary" href="https://ai.chad.lu" external>
                            <span class="flex items-center gap-2 sm:gap-3">
                                {{ $t('home.featured.cta.demo') }}
                                <Icon name="mdi:rocket-launch"
                                    class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform" />
                            </span>
                        </UiButton>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
