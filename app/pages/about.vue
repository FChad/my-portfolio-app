<script setup lang="ts">
import {
    BIRTH_DATE, calculateAge,
    profileInfoItems, certificationItems, timelineItems, experienceItems
} from '~/data/about'

const { t } = useI18n()
const { setSeoMeta } = useSeo()

setSeoMeta({
    title: t('seo.about.title'),
    description: t('seo.about.description'),
    keywords: t('seo.about.keywords')
})

const currentAge = calculateAge(BIRTH_DATE)

const profileInfo = computed(() =>
    profileInfoItems.map(item => ({
        icon: item.icon,
        label: t(item.labelKey),
        value: t(item.valueKey)
    }))
)

const certifications = computed(() =>
    certificationItems.map(item => ({
        title: t(item.titleKey),
        year: item.year,
        description: t(item.descriptionKey),
        icon: item.icon
    }))
)

const combinedTimeline = computed(() =>
    timelineItems.map(item => ({
        year: item.year,
        category: item.category,
        title: t(item.titleKey),
        description: t(item.descriptionKey),
        company: item.companyKey ? t(item.companyKey) : undefined,
        type: item.typeKey ? t(item.typeKey) : undefined,
        tasks: item.taskKeys?.map(key => t(key)),
        school: item.schoolKey ? t(item.schoolKey) : undefined,
        grade: item.gradeKey ? t(item.gradeKey) : undefined,
        link: item.link,
        linkLabel: item.linkLabelKey ? t(item.linkLabelKey) : undefined
    }))
)

const experiences = computed(() =>
    experienceItems.map(item => ({
        title: t(item.titleKey),
        description: t(item.descriptionKey),
        icon: item.icon,
        image: item.image,
        alt: item.alt
    }))
)

// Track which experience card is expanded (mobile tap)
const expandedExperience = ref<number | null>(null)

const toggleExperience = (index: number) => {
    expandedExperience.value = expandedExperience.value === index ? null : index
}
</script>

<template>
    <!-- Profile Introduction -->
    <section class="py-12 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
                    {{ $t('about.header.title') }}
                </h1>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                    {{ $t('about.header.subtitle') }}
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
                <!-- Left: Name, role & intro -->
                <div class="flex flex-col gap-4 md:gap-6">
                    <!-- Name -->
                    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-white">
                        Chad Feierstein
                    </h2>

                    <!-- Intro text -->
                    <i18n-t keypath="about.story.intro" tag="p" scope="global"
                        class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        <template #age>{{ currentAge }}</template>
                        <template #role>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                $t('about.story.introHighlights.role') }}</strong>
                        </template>
                        <template #admin>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                $t('about.story.introHighlights.admin') }}</strong>
                        </template>
                        <template #location>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                $t('about.story.introHighlights.location') }}</strong>
                        </template>
                        <template #cloud>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                $t('about.story.introHighlights.cloud') }}</strong>
                        </template>
                        <template #webapps>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                $t('about.story.introHighlights.webapps') }}</strong>
                        </template>
                        <template #servers>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                $t('about.story.introHighlights.servers') }}</strong>
                        </template>
                        <template #positions>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                $t('about.story.introHighlights.positions') }}</strong>
                        </template>
                        <template #langCount>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                $t('about.story.introHighlights.langCount') }}</strong>
                        </template>
                    </i18n-t>
                </div>

                <!-- Right: Personal info cards -->
                <div class="flex flex-col gap-3 md:gap-4">
                    <UiCard v-for="info in profileInfo" :key="info.icon">
                        <div class="flex items-center gap-3 md:gap-4">
                            <UiIconBox :icon="info.icon" />
                            <div class="flex flex-col gap-0.5 md:gap-1 min-w-0">
                                <div class="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">{{ info.label }}
                                </div>
                                <div
                                    class="text-sm md:text-base lg:text-xl font-bold text-neutral-800 dark:text-white truncate">
                                    {{
                                        info.value }}</div>
                            </div>
                        </div>
                    </UiCard>
                </div>
            </div>
        </div>
    </section>

    <!-- Languages -->
    <section class="py-12 md:py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
                    {{ $t('about.languages.title') }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300">{{
                    $t('about.languages.subtitle') }}</p>
            </div>

            <AboutLanguageIllustration />
        </div>
    </section>

    <!-- Work & Education Timeline -->
    <section class="py-12 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
                    {{ $t('about.work.journey') }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300">{{
                    $t('about.work.subtitle') }}</p>
            </div>

            <FeaturesTimelineSection :items="combinedTimeline" />
        </div>
    </section>

    <!-- Certifications -->
    <section class="py-12 md:py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
                    {{ $t('about.certifications.title') }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                    {{ $t('about.certifications.subtitle') }}
                </p>
            </div>

            <AboutCertificationIllustration :certifications="certifications" />
        </div>
    </section>

    <!-- Interests & Passions -->
    <section class="py-12 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
                    {{ $t('about.interests.title') }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300">{{
                    $t('about.interests.subtitle') }}</p>
            </div>

            <AboutInterestsIllustration class="mb-6 md:mb-8 lg:mb-12" />

            <!-- Experience cards with images -->
            <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div v-for="(experience, index) in experiences" :key="experience.title"
                    class="group relative rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer md:cursor-default"
                    @click="toggleExperience(index)">

                    <!-- Background Image -->
                    <div class="absolute inset-0">
                        <img :src="`/img/about/${experience.image}`" :alt="experience.alt"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            :class="{ 'scale-110': expandedExperience === index }" loading="lazy" />
                        <div class="absolute inset-0 bg-linear-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                            :class="{ 'opacity-20': expandedExperience === index }">
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="relative h-full min-h-64 sm:min-h-72 md:min-h-80 flex flex-col justify-end">

                        <div
                            class="flex flex-col gap-1.5 md:gap-2 lg:gap-3 bg-linear-to-t from-black/70 via-black/50 to-transparent p-5 md:p-6 lg:p-8 pt-12 md:pt-16">
                            <h3
                                class="text-lg md:text-xl lg:text-2xl font-bold text-white drop-shadow-lg transition-all">
                                {{ experience.title }}
                            </h3>
                            <p class="text-sm md:text-base text-white/90 leading-relaxed drop-shadow-md max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-300 overflow-hidden"
                                :class="{ 'max-h-40 opacity-100': expandedExperience === index }">
                                {{ experience.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="py-12 md:py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-900">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="flex flex-col gap-3 md:gap-4 mb-6 md:mb-8">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
                    {{ $t('about.cta.title') }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                    {{ $t('about.cta.subtitle') }}
                </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center">
                <UiButton variant="primary" to="/contact">
                    <span class="flex items-center gap-2 sm:gap-3">
                        {{ $t('about.cta.button') }}
                        <Icon name="mdi:arrow-right"
                            class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                </UiButton>

                <UiButton variant="secondary" to="/showcase">
                    <span class="flex items-center gap-2 sm:gap-3">
                        <Icon name="mdi:eye"
                            class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform" />
                        {{ $t('home.cta.primary') }}
                    </span>
                </UiButton>
            </div>
        </div>
    </section>
</template>
