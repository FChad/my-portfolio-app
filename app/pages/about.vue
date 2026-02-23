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

// Interactive states
const hoveredExperience = ref<number | null>(null)

const languages = [
    { name: t('about.languageNames.luxemburgish'), level: 'C2', native: true, flag: 'circle-flags:lu', progress: 100 },
    { name: t('about.languageNames.german'), level: 'C1', flag: 'circle-flags:de', progress: 85 },
    { name: t('about.languageNames.english'), level: 'B2', flag: 'circle-flags:gb', progress: 70 },
    { name: t('about.languageNames.french'), level: 'B1', flag: 'circle-flags:fr', progress: 55 }
]

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
            t('about.timelineItems.item1.task4')
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
        title: t('about.education.dap.degree'),
        description: t('about.education.dap.field'),
        school: t('about.education.dap.school'),
        grade: t('about.education.dap.grade'),
        link: 'https://www.lgk.lu/training/formation-professionnelle/informaticien-technicien-dap',
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
            <div class="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
                <!-- Left: Name, role & intro -->
                <div class="space-y-4 md:space-y-6">
                    <!-- Name -->
                    <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-neutral-800 dark:text-white">
                        Chad Feierstein
                    </h1>

                    <!-- Intro text -->
                    <i18n-t keypath="about.story.intro" tag="p" scope="global"
                        class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        <template #age>{{ currentAge }}</template>
                        <template #role>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{ $t('about.story.introHighlights.role') }}</strong>
                        </template>
                        <template #admin>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{ $t('about.story.introHighlights.admin') }}</strong>
                        </template>
                        <template #location>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{ $t('about.story.introHighlights.location') }}</strong>
                        </template>
                        <template #cloud>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{ $t('about.story.introHighlights.cloud') }}</strong>
                        </template>
                        <template #webapps>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{ $t('about.story.introHighlights.webapps') }}</strong>
                        </template>
                        <template #servers>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{ $t('about.story.introHighlights.servers') }}</strong>
                        </template>
                        <template #positions>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{ $t('about.story.introHighlights.positions') }}</strong>
                        </template>
                        <template #langCount>
                            <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{ $t('about.story.introHighlights.langCount') }}</strong>
                        </template>
                    </i18n-t>
                </div>

                <!-- Right: Personal info cards -->
                <div class="flex flex-col gap-3 md:gap-4">
                    <div v-for="info in profileInfo" :key="info.icon"
                        class="group relative bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div class="flex items-center gap-3 md:gap-4">
                            <div
                                class="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-blue-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-md shrink-0">
                                <Icon :name="info.icon" class="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <div class="space-y-0.5 md:space-y-1 min-w-0">
                                <div class="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">{{ info.label }}</div>
                                <div class="text-sm md:text-base lg:text-xl font-bold text-neutral-800 dark:text-white truncate">{{ info.value }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Languages -->
    <section class="py-12 md:py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-800 dark:text-white">
                    {{ $t('about.languages.title') }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300">{{ $t('about.languages.subtitle') }}</p>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div v-for="lang in languages" :key="lang.name"
                    class="group relative bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

                    <div class="flex flex-col items-center text-center gap-3 md:gap-4 lg:gap-5">
                        <!-- Flag with subtle ring -->
                        <div class="relative">
                            <svg class="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="44" fill="none" stroke-width="4"
                                    class="stroke-neutral-200 dark:stroke-neutral-700" />
                                <circle cx="50" cy="50" r="44" fill="none" stroke-width="4"
                                    stroke-linecap="round"
                                    class="stroke-blue-500"
                                    :stroke-dasharray="`${lang.progress * 2.764} 276.4`" />
                            </svg>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <Icon :name="lang.flag"
                                    class="w-11 h-11 md:w-13 md:h-13 lg:w-15 lg:h-15 rounded-full group-hover:scale-110 transition-transform duration-300" />
                            </div>
                        </div>

                        <!-- Language name -->
                        <h3 class="text-base md:text-lg lg:text-xl font-bold text-neutral-800 dark:text-white">
                            {{ lang.name }}
                        </h3>

                        <!-- Level -->
                        <div class="flex items-center gap-2">
                            <span class="text-lg md:text-xl font-black text-blue-600 dark:text-blue-400">{{ lang.level }}</span>
                            <span v-if="lang.native" class="text-[10px] md:text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Native</span>
                        </div>

                        <!-- Proficiency description -->
                        <p class="text-xs md:text-sm text-neutral-500 dark:text-neutral-400">
                            {{ $t(`about.languages.levels.${lang.level}`) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Work & Education Timeline -->
    <section class="py-12 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-800 dark:text-white">
                    {{ $t('about.work.journey') }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300">{{ $t('about.work.subtitle') }}</p>
            </div>

            <FeaturesTimelineSection :items="combinedTimeline" />
        </div>
    </section>

    <!-- Certifications -->
    <section class="py-12 md:py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-800 dark:text-white">
                    {{ $t('about.certifications.title') }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                    {{ $t('about.certifications.subtitle') }}
                </p>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div v-for="cert in certifications" :key="cert.title"
                    class="group relative bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div class="flex flex-col gap-3 md:gap-4 h-full">
                        <!-- Icon and year -->
                        <div class="flex items-start justify-between">
                            <div class="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 bg-blue-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                                <Icon :name="cert.icon" class="w-6 h-6 md:w-6.5 md:h-6.5 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <span
                                class="px-2 py-1 md:px-3 md:py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-xs md:text-sm font-bold text-neutral-700 dark:text-neutral-300">
                                {{ cert.year }}
                            </span>
                        </div>

                        <!-- Title -->
                        <h3 class="text-base md:text-lg lg:text-xl font-bold text-neutral-800 dark:text-white">{{ cert.title }}</h3>

                        <!-- Description -->
                        <p class="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed flex-1">{{ cert.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Interests & Passions -->
    <section class="py-12 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-800 dark:text-white">
                    {{ $t('about.interests.title') }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300">{{ $t('about.interests.subtitle') }}</p>
            </div>

            <!-- Passion & Hobbies -->
            <div class="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8 lg:mb-12">
                <!-- Passion card -->
                <div
                    class="group relative bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div class="flex flex-col gap-4 md:gap-5 lg:gap-6">
                        <div class="flex items-center gap-3 md:gap-4">
                            <div
                                class="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 bg-blue-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                                <Icon name="mdi:heart" class="w-6 h-6 md:w-6.5 md:h-6.5 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <h3 class="text-lg md:text-xl lg:text-2xl font-black text-neutral-800 dark:text-white">
                                {{ $t('about.passion.title') }}
                            </h3>
                        </div>
                        <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                            {{ $t('about.passion.description') }}
                        </p>
                    </div>
                </div>

                <!-- Hobbies card -->
                <div
                    class="group relative bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div class="flex flex-col gap-4 md:gap-5 lg:gap-6">
                        <div class="flex items-center gap-3 md:gap-4">
                            <div
                                class="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 bg-blue-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                                <Icon name="mdi:puzzle" class="w-6 h-6 md:w-6.5 md:h-6.5 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <h3 class="text-lg md:text-xl lg:text-2xl font-black text-neutral-800 dark:text-white">
                                {{ $t('about.hobbies.title') }}
                            </h3>
                        </div>
                        <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                            {{ $t('about.hobbies.description') }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Experience cards with images -->
            <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div v-for="(experience, index) in experiences" :key="experience.title"
                    @mouseenter="hoveredExperience = index" @mouseleave="hoveredExperience = null"
                    class="group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

                    <!-- Background Image -->
                    <div class="absolute inset-0">
                        <img :src="`/img/about/${experience.image}`" :alt="experience.alt"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy" />
                        <div
                            class="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-black/10 dark:from-black/80 dark:via-black/50 dark:to-black/30 group-hover:from-black/50 group-hover:via-black/20 group-hover:to-transparent dark:group-hover:from-black/70 dark:group-hover:via-black/40 dark:group-hover:to-black/20 transition-all duration-300">
                        </div>
                        <div class="absolute inset-0 bg-linear-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="relative h-full min-h-64 sm:min-h-72 md:min-h-80 flex flex-col justify-end p-5 md:p-6 lg:p-8">
                        <div
                            class="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center shadow-xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                            <Icon :name="experience.icon" class="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-600" />
                        </div>

                        <div class="space-y-1.5 md:space-y-2 lg:space-y-3">
                            <h3
                                class="text-lg md:text-xl lg:text-2xl font-black text-white drop-shadow-lg transition-all">
                                {{ experience.title }}
                            </h3>
                            <p
                                class="text-xs md:text-sm lg:text-base text-white/90 leading-relaxed drop-shadow-md group-hover:text-white transition-colors">
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
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-800 dark:text-white">
                    {{ $t('about.cta.title') }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                    {{ $t('about.cta.subtitle') }}
                </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center">
                <NuxtLinkLocale to="/contact"
                    class="group w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center hover:-translate-y-1">
                    <span class="flex items-center gap-2 sm:gap-3">
                        {{ $t('about.cta.button') }}
                        <Icon name="mdi:arrow-right"
                            class="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                </NuxtLinkLocale>

                <NuxtLinkLocale to="/showcase"
                    class="group w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center hover:-translate-y-1">
                    <span class="flex items-center gap-2 sm:gap-3">
                        <Icon name="mdi:eye"
                            class="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                        {{ $t('home.cta.primary') }}
                    </span>
                </NuxtLinkLocale>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Smooth hover transitions */
.group:hover .group-hover\:scale-110 {
    transform: scale(1.1);
}

.group:hover .group-hover\:rotate-3 {
    transform: rotate(3deg);
}

.group:hover .group-hover\:rotate-6 {
    transform: rotate(6deg);
}
</style>
