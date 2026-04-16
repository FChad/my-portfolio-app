<script setup lang="ts">
const { t } = useI18n()
const { setSeoMeta } = useSeo()

setSeoMeta({
    title: t('seo.about.title'),
    description: t('seo.about.description'),
    keywords: t('seo.about.keywords')
})

// Calculate age dynamically
const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--
    }

    return age
}

const currentAge = calculateAge('1999-08-03')

// Profile info cards (matching home page AboutPreview pattern)
const profileInfo = computed(() => [
    { icon: 'mdi:map-marker', label: t('about.profile.labels.location'), value: t('about.profile.location') },
    { icon: 'mdi:flag', label: t('about.profile.labels.nationality'), value: t('about.profile.nationality') },
    { icon: 'mdi:heart', label: t('about.profile.labels.status'), value: t('about.profile.status') },
    { icon: 'mdi:car', label: t('about.profile.labels.license'), value: t('about.profile.driving') }
])

const certifications = [
    {
        title: t('about.certificationsList.cert1.title'),
        year: '2023',
        description: t('about.certificationsList.cert1.description'),
        icon: 'mdi:school'
    },
    {
        title: t('about.certificationsList.cert2.title'),
        year: '2021',
        description: t('about.certificationsList.cert2.description'),
        icon: 'mdi:shield-check'
    },
    {
        title: t('about.certificationsList.cert3.title'),
        year: '2021',
        description: t('about.certificationsList.cert3.description'),
        icon: 'mdi:lan'
    },
    {
        title: t('about.certificationsList.cert4.title'),
        year: '2020',
        description: t('about.certificationsList.cert4.description'),
        icon: 'mdi:lan'
    },
    {
        title: t('about.certificationsList.cert5.title'),
        year: '2020',
        description: t('about.certificationsList.cert5.description'),
        icon: 'mdi:lan'
    },
    {
        title: t('about.certificationsList.cert6.title'),
        year: '2020',
        description: t('about.certificationsList.cert6.description'),
        icon: 'mdi:file-document'
    }
]

interface TimelineItem {
    year: string
    title: string
    description: string
    category: 'work' | 'education'
    company?: string
    type?: string
    tasks?: string[]
    school?: string
    grade?: string
    link?: string
    linkLabel?: string
}

// Combined timeline with work and education
const combinedTimeline: TimelineItem[] = [
    {
        year: '2024',
        title: t('about.timelineItems.item1.title'),
        description: t('about.timelineItems.item1.description'),
        company: t('about.timelineItems.item1.company'),
        type: t('about.timelineItems.item1.type'),
        tasks: [
            t('about.timelineItems.item1.task1'),
            t('about.timelineItems.item1.task2'),
            t('about.timelineItems.item1.task3'),
            t('about.timelineItems.item1.task4'),
            t('about.timelineItems.item1.task5')
        ],
        category: 'work'
    },
    {
        year: '2021',
        title: t('about.education.bts.degree'),
        description: t('about.education.bts.field'),
        school: t('about.education.bts.school'),
        grade: t('about.education.bts.grade'),
        link: 'https://www.lgk.lu/bts/clc/',
        linkLabel: t('about.education.links.bts'),
        category: 'education'
    },
    {
        year: '2021',
        title: t('about.timelineItems.item2.title'),
        description: t('about.timelineItems.item2.description'),
        company: t('about.timelineItems.item2.company'),
        type: t('about.timelineItems.item2.type'),
        tasks: [
            t('about.timelineItems.item2.task1'),
            t('about.timelineItems.item2.task2'),
            t('about.timelineItems.item2.task3'),
            t('about.timelineItems.item2.task4'),
            t('about.timelineItems.item2.task5'),
            t('about.timelineItems.item2.task6')
        ],
        category: 'work'
    },
    {
        year: '2020',
        title: t('about.timelineItems.item3.title'),
        description: t('about.timelineItems.item3.description'),
        company: t('about.timelineItems.item3.company'),
        type: t('about.timelineItems.item3.type'),
        tasks: [
            t('about.timelineItems.item3.task1'),
            t('about.timelineItems.item3.task2'),
            t('about.timelineItems.item3.task3'),
            t('about.timelineItems.item3.task4')
        ],
        category: 'work'
    },
    {
        year: '2019',
        title: t('about.education.dt.degree'),
        description: t('about.education.dt.field'),
        school: t('about.education.dt.school'),
        grade: t('about.education.dt.grade'),
        link: 'https://www.lgk.lu/fopro/if/',
        linkLabel: t('about.education.links.dt'),
        category: 'education'
    },
    {
        year: '2019',
        title: t('about.timelineItems.item4.title'),
        description: t('about.timelineItems.item4.description'),
        company: t('about.timelineItems.item4.company'),
        type: t('about.timelineItems.item4.type'),
        tasks: [
            t('about.timelineItems.item4.task1'),
            t('about.timelineItems.item4.task2'),
            t('about.timelineItems.item4.task3'),
            t('about.timelineItems.item4.task4'),
            t('about.timelineItems.item4.task5')
        ],
        category: 'work'
    },
    {
        year: '2019',
        title: t('about.timelineItems.item5.title'),
        description: t('about.timelineItems.item5.description'),
        company: t('about.timelineItems.item5.company'),
        type: t('about.timelineItems.item5.type'),
        tasks: [
            t('about.timelineItems.item5.task1'),
            t('about.timelineItems.item5.task2'),
            t('about.timelineItems.item5.task3'),
            t('about.timelineItems.item5.task4'),
            t('about.timelineItems.item5.task5')
        ],
        category: 'work'
    },
    {
        year: '2016',
        title: t('about.timelineItems.item6.title'),
        description: t('about.timelineItems.item6.description'),
        company: t('about.timelineItems.item6.company'),
        type: t('about.timelineItems.item6.type'),
        tasks: [
            t('about.timelineItems.item6.task1'),
            t('about.timelineItems.item6.task2'),
            t('about.timelineItems.item6.task3'),
            t('about.timelineItems.item6.task4'),
            t('about.timelineItems.item6.task5')
        ],
        category: 'work'
    }
]


// Track which experience card is expanded (mobile tap)
const expandedExperience = ref<number | null>(null)

const toggleExperience = (index: number) => {
    expandedExperience.value = expandedExperience.value === index ? null : index
}

const experiences = [
    {
        title: t('about.experiencesList.exp1.title'),
        description: t('about.experiencesList.exp1.description'),
        icon: 'mdi:helicopter',
        image: 'helicopter.webp',
        alt: 'Chad Feierstein helicopter flight over Dominican Republic city and Caribbean Sea'
    },
    {
        title: t('about.experiencesList.exp2.title'),
        description: t('about.experiencesList.exp2.description'),
        icon: 'mdi:parachute',
        image: 'skydiving.webp',
        alt: 'Chad Feierstein skydiving over Luxembourg from 4000 meters altitude'
    },
    {
        title: t('about.experiencesList.exp3.title'),
        description: t('about.experiencesList.exp3.description'),
        icon: 'mdi:music-note',
        image: 'tomorrowland2025.webp',
        alt: 'Chad Feierstein at Tomorrowland Belgium 2025 electronic music festival'
    }
]
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
