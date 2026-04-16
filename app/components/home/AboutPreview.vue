<script setup lang="ts">
const { t } = useI18n()

const infoCards = computed(() => [
    {
        icon: 'mdi:map-marker',
        labelKey: 'about.profile.labels.location',
        valueKey: 'about.profile.location'
    },
    {
        icon: 'mdi:account-heart',
        label: 'Position',
        valueKey: 'home.about.role'
    },
    {
        icon: 'mdi:school',
        labelKey: 'home.about.study',
        valueKey: 'home.about.education'
    },
    {
        icon: 'mdi:certificate',
        labelKey: 'home.about.training',
        valueKey: 'home.about.experience'
    }
])
</script>

<template>
    <section id="about-section" class="scroll-mt-18 py-12 md:py-16 lg:py-24 relative overflow-hidden">

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header (Centered) -->
            <div class="text-center mb-8 md:mb-12 lg:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white mb-3 md:mb-4">
                    {{ $t('home.about.title') }}
                </h2>
                <p
                    class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto px-2">
                    {{ $t('home.about.subtitle') }}
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
                <!-- Left: Main intro -->
                <div class="flex flex-col gap-4 md:gap-6">
                    <!-- Story -->
                    <i18n-t keypath="home.about.story" tag="p" scope="global"
                        class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        <template #role>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                $t('home.about.storyHighlights.role') }}</strong>
                        </template>
                        <template #admin>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                $t('home.about.storyHighlights.admin') }}</strong>
                        </template>
                        <template #location>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                $t('home.about.storyHighlights.location') }}</strong>
                        </template>
                        <template #cloud>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                $t('home.about.storyHighlights.cloud') }}</strong>
                        </template>
                        <template #experience>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                $t('home.about.storyHighlights.experience') }}</strong>
                        </template>
                    </i18n-t>

                    <!-- CTA Button -->
                    <div class="flex">
                        <UiButton variant="primary" to="/about">
                            <span class="flex items-center gap-2 sm:gap-3">
                                <Icon name="mdi:open-in-new"
                                    class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform" />
                                {{ $t('home.about.cta') }}
                            </span>
                        </UiButton>
                    </div>
                </div>

                <!-- Right: Personal info cards -->
                <div class="flex flex-col gap-3 md:gap-4">
                    <UiCard v-for="card in infoCards" :key="card.icon">
                        <div class="flex items-center gap-3 md:gap-4">
                            <UiIconBox :icon="card.icon" />
                            <div class="flex flex-col gap-0.5 md:gap-1 min-w-0">
                                <div class="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                                    {{ card.labelKey ? $t(card.labelKey) : card.label }}
                                </div>
                                <div
                                    class="text-sm md:text-base lg:text-xl font-bold text-neutral-800 dark:text-white truncate">
                                    {{ $t(card.valueKey) }}
                                </div>
                            </div>
                        </div>
                    </UiCard>
                </div>
            </div>
        </div>
    </section>
</template>
