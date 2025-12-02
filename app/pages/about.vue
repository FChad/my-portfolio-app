<script setup lang="ts">
const { t } = useI18n()
const { setSeoMeta, getStructuredData } = useSeo()

setSeoMeta({
    title: t('seo.about.title'),
    description: t('seo.about.description'),
    keywords: t('seo.about.keywords')
})

useHead(() => ({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(getStructuredData('Person'))
        }
    ]
}))

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
const { getColorClasses } = useColorMapping()

// Interactive states
const hoveredExperience = ref<number | null>(null)

const languages = [
    { name: t('about.languageNames.luxemburgish'), level: 'C2', native: true, flag: 'circle-flags:lu' },
    { name: t('about.languageNames.german'), level: 'C1', flag: 'circle-flags:de' },
    { name: t('about.languageNames.english'), level: 'B2', flag: 'circle-flags:gb' },
    { name: t('about.languageNames.french'), level: 'B1', flag: 'circle-flags:fr' }
]

const certifications = [
    {
        title: t('about.certificationsList.cert1.title'),
        year: '2023',
        description: t('about.certificationsList.cert1.description'),
        icon: 'mdi:school',
        color: 'blue'
    },
    {
        title: t('about.certificationsList.cert2.title'),
        year: '2021',
        description: t('about.certificationsList.cert2.description'),
        icon: 'mdi:shield-check',
        color: 'green'
    },
    {
        title: t('about.certificationsList.cert3.title'),
        year: '2021',
        description: t('about.certificationsList.cert3.description'),
        icon: 'mdi:lan',
        color: 'purple'
    },
    {
        title: t('about.certificationsList.cert4.title'),
        year: '2020',
        description: t('about.certificationsList.cert4.description'),
        icon: 'mdi:lan',
        color: 'orange'
    },
    {
        title: t('about.certificationsList.cert5.title'),
        year: '2020',
        description: t('about.certificationsList.cert5.description'),
        icon: 'mdi:lan',
        color: 'red'
    },
    {
        title: t('about.certificationsList.cert6.title'),
        year: '2020',
        description: t('about.certificationsList.cert6.description'),
        icon: 'mdi:file-document',
        color: 'blue'
    }
]

interface TimelineItem {
    year: string
    title: string
    description: string
    icon: string
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
        icon: 'mdi:code-braces',
        category: 'work'
    },
    {
        year: '2021',
        title: t('about.education.bts.degree'),
        description: t('about.education.bts.field'),
        school: t('about.education.bts.school'),
        grade: t('about.education.bts.grade'),
        link: 'https://www.lgk.lu/bts/clc/',
        icon: 'mdi:school-outline',
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
        icon: 'mdi:cloud',
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
        icon: 'mdi:wrench',
        category: 'work'
    },
    {
        year: '2019',
        title: t('about.education.dap.degree'),
        description: t('about.education.dap.field'),
        school: t('about.education.dap.school'),
        grade: t('about.education.dap.grade'),
        link: 'https://www.lgk.lu/training/formation-professionnelle/informaticien-technicien-dap',
        icon: 'mdi:school-outline',
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
        icon: 'mdi:web',
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
        icon: 'mdi:database',
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
        icon: 'mdi:network',
        category: 'work'
    }
]

const workTimeline = combinedTimeline.filter(item => item.category === 'work')

const experiences = [
    {
        title: t('about.experiencesList.exp1.title'),
        description: t('about.experiencesList.exp1.description'),
        icon: 'mdi:helicopter',
        color: 'blue',
        image: 'helicopter.webp',
        alt: 'Chad Feierstein helicopter flight over Dominican Republic city and Caribbean Sea'
    },
    {
        title: t('about.experiencesList.exp2.title'),
        description: t('about.experiencesList.exp2.description'),
        icon: 'mdi:parachute',
        color: 'green',
        image: 'skydiving.webp',
        alt: 'Chad Feierstein skydiving over Luxembourg from 4000 meters altitude'
    },
    {
        title: t('about.experiencesList.exp3.title'),
        description: t('about.experiencesList.exp3.description'),
        icon: 'mdi:music-note',
        color: 'purple',
        image: 'tomorrowland2025.webp',
        alt: 'Chad Feierstein at Tomorrowland Belgium 2025 electronic music festival'
    }
]
</script>

<template>
    <!-- Immersive Hero with Floating Elements -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <!-- Animated gradient background -->
        <div
            class="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <!-- Left: Main intro with creative layout -->
                <div class="space-y-8">
                    <!-- Animated label -->
                    <div
                        class="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg">
                        <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {{ $t('about.profile.role') }}
                        </span>
                    </div>

                    <!-- Name -->
                    <div class="space-y-4">
                        <h1 class="text-4xl sm:text-5xl md:text-7xl font-black text-gray-800 dark:text-white">
                            Chad Feierstein
                        </h1>
                        <p class="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            {{ $t('about.story.intro') }}
                        </p>
                    </div>

                    <!-- Quick stats in creative card layout -->
                    <div class="grid grid-cols-2 gap-3 sm:gap-4">
                        <div
                            class="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div
                                class="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl rotate-12 group-hover:rotate-0 transition-transform shadow-lg flex items-center justify-center">
                                <Icon name="mdi:cake-variant" class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div class="text-2xl sm:text-3xl font-black text-gray-800 dark:text-white">{{ currentAge }}
                            </div>
                            <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{
                                $t('about.profile.labels.years') }}
                            </div>
                        </div>

                        <div
                            class="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div
                                class="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl rotate-12 group-hover:rotate-0 transition-transform shadow-lg flex items-center justify-center">
                                <Icon name="mdi:briefcase" class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div class="text-2xl sm:text-3xl font-black text-gray-800 dark:text-white">{{
                                workTimeline.length }}
                            </div>
                            <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{ $t('about.work.title')
                                }}</div>
                        </div>

                        <div
                            class="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div
                                class="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl rotate-12 group-hover:rotate-0 transition-transform shadow-lg flex items-center justify-center">
                                <Icon name="mdi:certificate" class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div class="text-2xl sm:text-3xl font-black text-gray-800 dark:text-white">{{
                                certifications.length }}
                            </div>
                            <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{
                                $t('about.certifications.title') }}
                            </div>
                        </div>

                        <div
                            class="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div
                                class="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl rotate-12 group-hover:rotate-0 transition-transform shadow-lg flex items-center justify-center">
                                <Icon name="mdi:translate" class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div class="text-2xl sm:text-3xl font-black text-gray-800 dark:text-white">{{
                                languages.length }}</div>
                            <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{
                                $t('about.languages.title') }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Personal info with modern bento-style layout -->
                <div class="flex flex-col gap-3 sm:gap-4">
                    <!-- Location -->
                    <div
                        class="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div class="flex items-center gap-3 sm:gap-4">
                            <div
                                class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                                <Icon name="mdi:map-marker" class="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </div>
                            <div class="space-y-1">
                                <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{
                                    $t('about.profile.labels.location') }}</div>
                                <div class="text-base sm:text-xl font-bold text-gray-800 dark:text-white">{{
                                    $t('about.profile.location') }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Nationality -->
                    <div
                        class="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div class="flex items-center gap-3 sm:gap-4">
                            <div
                                class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                                <Icon name="mdi:flag" class="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </div>
                            <div class="space-y-1">
                                <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{
                                    $t('about.profile.labels.nationality') }}</div>
                                <div class="text-base sm:text-xl font-bold text-gray-800 dark:text-white">{{
                                    $t('about.profile.nationality') }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Status -->
                    <div
                        class="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div class="flex items-center gap-3 sm:gap-4">
                            <div
                                class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                                <Icon name="mdi:heart" class="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </div>
                            <div class="space-y-1">
                                <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{
                                    $t('about.profile.labels.status') }}</div>
                                <div class="text-base sm:text-xl font-bold text-gray-800 dark:text-white">{{
                                    $t('about.profile.status') }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Driving license -->
                    <div
                        class="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div class="flex items-center gap-3 sm:gap-4">
                            <div
                                class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                                <Icon name="mdi:car" class="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </div>
                            <div class="space-y-1">
                                <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{
                                    $t('about.profile.labels.license') }}</div>
                                <div class="text-base sm:text-xl font-bold text-gray-800 dark:text-white">{{
                                    $t('about.profile.driving') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Languages with interactive cards -->
    <section class="py-24 relative overflow-hidden">
        <div
            class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-100/60 to-transparent dark:via-blue-900/10">
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-black mb-4 text-gray-800 dark:text-white">
                    {{ $t('about.languages.title') }}
                </h2>
                <p class="text-xl text-gray-600 dark:text-gray-300">{{ $t('about.languages.subtitle') }}</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div v-for="(lang, index) in languages" :key="lang.name"
                    class="group relative bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <!-- Decorative corner -->

                    <div class="relative space-y-4 sm:space-y-6">
                        <!-- Flag with native indicator -->
                        <div class="flex items-center justify-between">
                            <Icon :name="lang.flag" class="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-md" />
                            <span v-if="lang.native"
                                class="px-2 py-1 sm:px-3 sm:py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold rounded-full">
                                Native
                            </span>
                        </div>

                        <!-- Language name -->
                        <h3 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">{{ lang.name }}</h3>

                        <!-- Level with progress bar -->
                        <div class="space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600 dark:text-gray-400">{{
                                    $t('about.languages.proficiency') }}</span>
                                <span class="text-lg font-black text-blue-600 dark:text-blue-400">{{ lang.level
                                }}</span>
                            </div>
                            <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                                    :style="{ width: lang.level === 'C2' ? '100%' : lang.level === 'C1' ? '85%' : lang.level === 'B2' ? '70%' : '55%' }">
                                </div>
                            </div>
                            <p class="text-xs text-gray-500 dark:text-gray-400">{{
                                $t(`about.languages.levels.${lang.level}`) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Work & Education Timeline -->
    <section class="py-24 relative overflow-hidden">
        <div
            class="absolute inset-0 bg-gradient-to-b from-blue-100/60 via-purple-100/60 to-pink-100/60 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12 sm:mb-16">
                <h2 class="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-gray-800 dark:text-white">
                    {{ $t('about.work.journey') }}
                </h2>
                <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300">{{ $t('about.work.subtitle') }}</p>
            </div>

            <FeaturesTimelineSection :items="combinedTimeline" />
        </div>
    </section>

    <!-- Certifications Section -->
    <section class="py-16 sm:py-24 relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12 sm:mb-16">
                <h2 class="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-gray-800 dark:text-white">
                    {{ $t('about.certifications.title') }}
                </h2>
                <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    {{ $t('about.certifications.subtitle') }}
                </p>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div v-for="(cert, index) in certifications" :key="cert.title"
                    class="group relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

                    <div class="space-y-3 sm:space-y-4">
                        <!-- Icon and year -->
                        <div class="flex items-start justify-between">
                            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"
                                :class="{
                                    'bg-gradient-to-br from-blue-500 to-blue-600': index === 0,
                                    'bg-gradient-to-br from-green-500 to-green-600': index === 1,
                                    'bg-gradient-to-br from-purple-500 to-purple-600': index === 2,
                                    'bg-gradient-to-br from-orange-500 to-orange-600': index === 3,
                                    'bg-gradient-to-br from-red-500 to-red-600': index === 4,
                                    'bg-gradient-to-br from-pink-500 to-pink-600': index === 5
                                }">
                                <Icon :name="cert.icon" class="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </div>
                            <span
                                class="px-2 py-1 sm:px-3 sm:py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
                                {{ cert.year }}
                            </span>
                        </div>

                        <!-- Title -->
                        <h3 class="text-base sm:text-lg font-bold text-gray-800 dark:text-white line-clamp-2">{{
                            cert.title }}</h3>

                        <!-- Description -->
                        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{{
                            cert.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Interests & Passions (Magazine style) -->
    <section class="py-16 sm:py-24 relative overflow-hidden bg-gray-50 dark:bg-gray-900">
        <div
            class="absolute inset-0 bg-gradient-to-b from-transparent via-purple-100/60 to-transparent dark:via-purple-900/10">
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12 sm:mb-16">
                <h2 class="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-gray-800 dark:text-white">
                    {{ $t('about.interests.title') }}
                </h2>
                <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">{{
                    $t('about.interests.subtitle') }}</p>
            </div>

            <!-- Passion & Hobbies in magazine layout -->
            <div class="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                <!-- Large passion card -->
                <div
                    class="group relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">

                    <div class="relative space-y-4 sm:space-y-6">
                        <div
                            class="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                            <Icon name="mdi:heart" class="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                        <h3 class="text-2xl sm:text-3xl font-black text-gray-800 dark:text-white">{{
                            $t('about.passion.title') }}</h3>
                        <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{{
                            $t('about.passion.description')
                            }}</p>
                    </div>
                </div>

                <!-- Hobbies card -->
                <div
                    class="group relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div class="space-y-4 sm:space-y-6">
                        <div
                            class="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                            <Icon name="mdi:puzzle" class="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                        <h3 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{{
                            $t('about.hobbies.title') }}
                        </h3>
                        <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{{
                            $t('about.hobbies.description')
                            }}</p>
                    </div>
                </div>
            </div>

            <!-- Special experiences in card grid -->
            <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <div v-for="(experience, index) in experiences" :key="experience.title"
                    @mouseenter="hoveredExperience = index" @mouseleave="hoveredExperience = null"
                    class="group relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

                    <!-- Background Image with Overlay -->
                    <div class="absolute inset-0">
                        <img :src="`/img/about/${experience.image}`" :alt="experience.alt"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy" />
                        <!-- Overlay for better text readability (lighter in light mode) -->
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10 dark:from-black/80 dark:via-black/50 dark:to-black/30 group-hover:from-black/50 group-hover:via-black/20 group-hover:to-transparent dark:group-hover:from-black/70 dark:group-hover:via-black/40 dark:group-hover:to-black/20 transition-all duration-300">
                        </div>
                        <!-- Colored gradient overlay on hover -->
                        <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                            :class="{
                                'from-blue-500 to-blue-600': experience.color === 'blue',
                                'from-green-500 to-green-600': experience.color === 'green',
                                'from-purple-500 to-purple-600': experience.color === 'purple'
                            }">
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="relative h-full min-h-[280px] sm:min-h-[320px] flex flex-col justify-end p-6 sm:p-8">
                        <!-- Icon floating badge -->
                        <div
                            class="absolute top-4 right-4 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                            <Icon :name="experience.icon" class="w-6 h-6 sm:w-7 sm:h-7" :class="{
                                'text-blue-600': experience.color === 'blue',
                                'text-green-600': experience.color === 'green',
                                'text-purple-600': experience.color === 'purple'
                            }" />
                        </div>

                        <!-- Text content -->
                        <div class="space-y-2 sm:space-y-3">
                            <h3
                                class="text-xl sm:text-2xl font-black text-white drop-shadow-lg group-hover:text-shadow-xl transition-all">
                                {{ experience.title }}
                            </h3>
                            <p
                                class="text-sm sm:text-base text-white/90 leading-relaxed drop-shadow-md group-hover:text-white transition-colors">
                                {{ experience.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section (Bold and modern) -->
    <section class="py-16 sm:py-24 relative overflow-hidden">
        <div
            class="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        </div>

        <!-- Decorative elements -->
        <div class="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5">
            <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 dark:bg-blue-700 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-700 rounded-full blur-3xl">
            </div>
        </div>

        <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
            <div class="space-y-3 sm:space-y-4">
                <h2 class="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 dark:text-white">
                    {{ $t('about.cta.title') }}
                </h2>
                <p class="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    {{ $t('about.cta.subtitle') }}
                </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <NuxtLinkLocale to="/contact"
                    class="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:scale-105 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <span>{{ $t('about.cta.button') }}</span>
                    <Icon name="mdi:arrow-right"
                        class="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
                </NuxtLinkLocale>
            </div>
        </div>
    </section>
</template>

<style scoped>
@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-20px);
    }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.delay-75 {
    animation-delay: 0.75s;
}

.delay-150 {
    animation-delay: 1.5s;
}

/* Smooth hover transitions */
.group:hover .group-hover\:scale-110 {
    transform: scale(1.1);
}

.group:hover .group-hover\:rotate-6 {
    transform: rotate(6deg);
}

/* Text gradient animation */
@keyframes shimmer {
    0% {
        background-position: -1000px 0;
    }

    100% {
        background-position: 1000px 0;
    }
}

.animate-shimmer {
    background: linear-gradient(to right, #4F46E5 0%, #7C3AED 50%, #EC4899 100%);
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
}
</style>
