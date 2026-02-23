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
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-800 dark:text-white mb-3 md:mb-4">
                    {{ $t('home.about.title') }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto px-2">
                    {{ $t('home.about.subtitle') }}
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
                <!-- Left: Main intro -->
                <div class="space-y-4 md:space-y-6">
                    <!-- Story -->
                    <i18n-t keypath="home.about.story" tag="p" scope="global"
                        class="text-base md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        <template #role>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{ $t('home.about.storyHighlights.role') }}</strong>
                        </template>
                        <template #admin>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{ $t('home.about.storyHighlights.admin') }}</strong>
                        </template>
                        <template #location>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{ $t('home.about.storyHighlights.location') }}</strong>
                        </template>
                        <template #cloud>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{ $t('home.about.storyHighlights.cloud') }}</strong>
                        </template>
                        <template #experience>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{ $t('home.about.storyHighlights.experience') }}</strong>
                        </template>
                    </i18n-t>

                    <!-- CTA Button -->
                    <NuxtLinkLocale to="/about"
                        class="group inline-flex items-center justify-center px-5 sm:px-7 py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <span class="flex items-center gap-2 sm:gap-3">
                            <Icon name="mdi:open-in-new" class="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                            {{ $t('home.about.cta') }}
                        </span>
                    </NuxtLinkLocale>
                </div>

                <!-- Right: Personal info cards -->
                <div class="flex flex-col gap-3 md:gap-4">
                    <div v-for="card in infoCards" :key="card.icon"
                        class="group relative bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div class="flex items-center gap-3 md:gap-4">
                            <div
                                class="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-blue-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-md shrink-0">
                                <Icon :name="card.icon" class="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <div class="space-y-0.5 md:space-y-1 min-w-0">
                                <div class="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                                    {{ card.labelKey ? $t(card.labelKey) : card.label }}
                                </div>
                                <div
                                    class="text-sm md:text-base lg:text-xl font-bold text-neutral-800 dark:text-white truncate">
                                    {{ $t(card.valueKey) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
