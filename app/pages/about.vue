<script setup lang="ts">
const { t } = useI18n()

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

// Color mapping for consistent theming
const colorMap = {
    blue: {
        bg: 'bg-blue-500',
        bgLight: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-800 dark:text-blue-300',
        textAccent: 'text-blue-600 dark:text-blue-400',
        hover: 'bg-blue-600 hover:bg-blue-700'
    },
    green: {
        bg: 'bg-green-500',
        bgLight: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-800 dark:text-green-300',
        textAccent: 'text-green-600 dark:text-green-400',
        hover: 'bg-green-600 hover:bg-green-700'
    },
    purple: {
        bg: 'bg-purple-500',
        bgLight: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-800 dark:text-purple-300',
        textAccent: 'text-purple-600 dark:text-purple-400',
        hover: 'bg-purple-600 hover:bg-purple-700'
    },
    orange: {
        bg: 'bg-orange-500',
        bgLight: 'bg-orange-100 dark:bg-orange-900/30',
        text: 'text-orange-800 dark:text-orange-300',
        textAccent: 'text-orange-600 dark:text-orange-400',
        hover: 'bg-orange-600 hover:bg-orange-700'
    },
    red: {
        bg: 'bg-red-500',
        bgLight: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-800 dark:text-red-300',
        textAccent: 'text-red-600 dark:text-red-400',
        hover: 'bg-red-600 hover:bg-red-700'
    }
} as const

// Helper function to get color classes
const getColorClasses = (color: string) => {
    return (colorMap as any)[color] || colorMap.blue
}

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

const education = [
    {
        year: '2021',
        degree: t('about.education.bts.degree'),
        field: t('about.education.bts.field'),
        school: t('about.education.bts.school'),
        grade: t('about.education.bts.grade'),
        link: 'https://www.lgk.lu/bts/clc/',
        icon: 'mdi:school-outline',
        type: 'higher',
        color: 'purple'
    },
    {
        year: '2019',
        degree: t('about.education.dap.degree'),
        field: t('about.education.dap.field'),
        school: t('about.education.dap.school'),
        grade: t('about.education.dap.grade'),
        link: 'https://www.lgk.lu/training/formation-professionnelle/informaticien-technicien-dap',
        icon: 'mdi:school-outline',
        type: 'technical',
        color: 'orange'
    }
]

const workTimeline = [
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
        icon: 'mdi:code-braces'
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
        icon: 'mdi:cloud'
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
        icon: 'mdi:wrench'
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
        icon: 'mdi:web'
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
        icon: 'mdi:database'
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
        icon: 'mdi:network'
    }
]

const experiences = [
    {
        title: t('about.experiencesList.exp1.title'),
        description: t('about.experiencesList.exp1.description'),
        icon: 'mdi:send',
        color: 'blue'
    },
    {
        title: t('about.experiencesList.exp2.title'),
        description: t('about.experiencesList.exp2.description'),
        icon: 'mdi:arrow-down-circle',
        color: 'green'
    },
    {
        title: t('about.experiencesList.exp3.title'),
        description: t('about.experiencesList.exp3.description'),
        icon: 'mdi:music-note',
        color: 'purple'
    }
]
</script>

<template>
    <!-- Hero Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-12 w-full">
        <h1 class="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ $t('about.hero.title') }}
        </h1>

        <!-- Profile Introduction -->
        <div class="max-w-4xl mx-auto text-center">
            <div class="flex items-center justify-center gap-4 mb-6">
                <div class="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
                    <Icon name="mdi:account-heart" class="w-8 h-8 text-white" />
                </div>
                <div class="flex flex-col items-start">
                    <h3 class="text-2xl font-bold text-gray-800 dark:text-white">Chad Feierstein</h3>
                    <p class="text-blue-600 dark:text-blue-400 font-medium">{{ $t('about.profile.role') }}</p>
                    <p class="text-gray-500 dark:text-gray-400">{{ $t('about.profile.currentWork') }}</p>
                </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {{ $t('about.story.intro') }}
            </p>
        </div>
    </section>

    <!-- Personal Details Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ $t('about.details.title') }}
        </h2>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
                class="group flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                <div
                    class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon name="mdi:map-marker" class="w-5 h-5 text-white" />
                </div>
                <div>
                    <span class="text-sm text-gray-500 dark:text-gray-400 block">{{
                        $t('about.profile.labels.location') }}</span>
                    <span class="font-semibold text-gray-800 dark:text-gray-200">{{
                        $t('about.profile.location') }}</span>
                </div>
            </div>

            <div
                class="group flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                <div
                    class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon name="mdi:flag" class="w-5 h-5 text-white" />
                </div>
                <div>
                    <span class="text-sm text-gray-500 dark:text-gray-400 block">{{
                        $t('about.profile.labels.nationality') }}</span>
                    <span class="font-semibold text-gray-800 dark:text-gray-200">{{
                        $t('about.profile.nationality') }}</span>
                </div>
            </div>

            <div
                class="group flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                <div
                    class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon name="mdi:cake-variant" class="w-5 h-5 text-white" />
                </div>
                <div>
                    <span class="text-sm text-gray-500 dark:text-gray-400 block">{{
                        $t('about.profile.labels.age') }}</span>
                    <span class="font-semibold text-gray-800 dark:text-gray-200">{{
                        currentAge }} {{ $t('about.profile.labels.years') }}</span>
                </div>
            </div>

            <div
                class="group flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                <div
                    class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon name="mdi:heart" class="w-5 h-5 text-white" />
                </div>
                <div>
                    <span class="text-sm text-gray-500 dark:text-gray-400 block">{{
                        $t('about.profile.labels.status') }}</span>
                    <span class="font-semibold text-gray-800 dark:text-gray-200">{{
                        $t('about.profile.status') }}</span>
                </div>
            </div>

            <div
                class="group flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                <div
                    class="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon name="mdi:car" class="w-5 h-5 text-white" />
                </div>
                <div>
                    <span class="text-sm text-gray-500 dark:text-gray-400 block">{{
                        $t('about.profile.labels.license') }}</span>
                    <span class="font-semibold text-gray-800 dark:text-gray-200">{{
                        $t('about.profile.driving') }}</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Interests & Hobbies Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ $t('about.interests.title') }}
        </h2>

        <div class="grid md:grid-cols-2 gap-8">
            <div
                class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-500">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Icon name="mdi:heart" class="w-6 h-6 text-white" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white">{{
                        $t('about.passion.title') }}</h3>
                </div>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{
                    $t('about.passion.description') }}</p>
            </div>

            <div
                class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-500">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Icon name="mdi:puzzle" class="w-6 h-6 text-white" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white">{{
                        $t('about.hobbies.title') }}</h3>
                </div>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{
                    $t('about.hobbies.description') }}</p>
            </div>
        </div>
    </section>

    <!-- Languages Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">{{
            $t('about.languages.title') }}</h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="lang in languages" :key="lang.name"
                class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                <div class="flex items-center gap-3 mb-4">
                    <div class="relative">
                        <Icon :name="lang.flag" class="w-8 h-8" />
                        <div v-if="lang.native"
                            class="absolute -top-1 -right-1 w-4 h-4 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                            <Icon name="mdi:check" class="w-3 h-3 text-white" />
                        </div>
                    </div>
                    <h3 class="text-lg font-bold">{{ lang.name }}</h3>
                </div>
                <div class="text-center">
                    <span
                        class="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white font-bold text-lg rounded-full mb-2">
                        {{ lang.level }}
                    </span>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        {{ $t(`about.languages.levels.${lang.level}`) }}
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Education Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">{{
            $t('about.education.title') }}</h2>

        <div class="grid md:grid-cols-2 gap-8">
            <div v-for="(edu, index) in education" :key="edu.year"
                class="group relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-500 transform flex flex-col">
                <div class="flex flex-col gap-4 flex-1">
                    <!-- Header with icon and title, year on right -->
                    <div class="flex items-center justify-between flex-col lg:flex-row">
                        <div class="flex items-center flex-col md:flex-row gap-3">
                            <div :class="[
                                'w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300',
                                getColorClasses(edu.color).bg
                            ]">
                                <Icon :name="edu.icon" class="w-6 h-6 text-white" />
                            </div>
                            <h3 class="text-lg font-bold text-gray-800 dark:text-white">{{ edu.degree }}</h3>
                        </div>
                        <span :class="[
                            'px-3 py-1 text-sm rounded-full font-medium',
                            getColorClasses(edu.color).bgLight,
                            getColorClasses(edu.color).text
                        ]">
                            {{ edu.year }}
                        </span>
                    </div>

                    <!-- Field -->
                    <div class="flex flex-col gap-2">
                        <p :class="[
                            'font-medium',
                            getColorClasses(edu.color).textAccent
                        ]">{{ edu.field }}</p>
                    </div>

                    <!-- School and grade details -->
                    <div class="flex flex-col gap-3">
                        <div class="flex items-center gap-3">
                            <Icon name="mdi:school" class="w-5 h-5 text-gray-500" />
                            <span class="text-gray-600 dark:text-gray-300">{{ edu.school }}</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <Icon name="mdi:trophy" class="w-5 h-5 text-gray-500" />
                            <span class="text-gray-600 dark:text-gray-300">{{ edu.grade }}</span>
                        </div>
                    </div>

                    <div class="mt-auto ml-auto">
                        <a v-if="edu.link" :href="edu.link" target="_blank" :class="[
                            'inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg',
                            getColorClasses(edu.color).hover
                        ]">
                            <Icon name="mdi:open-in-new" class="w-5 h-5" />
                            {{ $t('about.education.viewMore') }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Work Experience Timeline Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">{{
            $t('about.work.title') }}</h2>

        <div class="relative">
            <!-- Timeline line - Desktop centered, Mobile left -->
            <div
                class="absolute left-2 md:left-1/2 md:transform md:-translate-x-1/2 w-1 bg-blue-600 dark:bg-blue-400 h-full">
            </div>

            <div class="flex flex-col gap-12">
                <div v-for="(item, index) in workTimeline" :key="item.year" :class="[
                    'relative flex items-center',
                    'justify-start md:justify-start',
                    index % 2 === 1 ? 'md:justify-end' : ''
                ]">
                    <!-- Timeline dot - Mobile left positioned, Desktop centered -->
                    <div :class="[
                        'absolute w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400 z-20 flex items-center justify-center',
                        'md:left-1/2 md:transform md:-translate-x-1/2'
                    ]">
                        <div class="w-2 h-2 bg-gray-50 dark:bg-gray-900 rounded-full"></div>
                    </div>

                    <!-- Connection line from timeline to card - Desktop only -->
                    <div :class="[
                        'absolute hidden md:block h-0.5 bg-blue-600 dark:bg-blue-400 z-10',
                        index % 2 === 0 ? 'right-1/2' : 'left-1/2',
                        'w-12'
                    ]"></div>

                    <!-- Content card - Mobile full width with left margin, Desktop alternating -->
                    <div :class="[
                        'p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300',
                        'ml-8 w-full md:w-5/12 md:ml-0',
                        index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                    ]">
                        <div class="flex flex-col gap-4">
                            <!-- Header with icon, type and year -->
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <Icon :name="item.icon" class="w-6 h-6 text-blue-500" />
                                    <span v-if="item.type" class="font-medium text-gray-500">{{ item.type
                                    }}</span>
                                </div>
                                <span
                                    class="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-sm rounded-full font-medium">
                                    {{ item.year }}
                                </span>
                            </div>

                            <!-- Title and Company -->
                            <div>
                                <h3 class="text-lg font-bold mb-1">{{ item.title }}</h3>
                                <p v-if="item.company"
                                    class="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-2">
                                    <Icon name="mdi:office-building" class="w-4 h-4" />
                                    {{ item.company }}
                                </p>
                            </div>

                            <!-- Description -->
                            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{
                                item.description }}</p>

                            <!-- Tasks list -->
                            <div v-if="item.tasks && item.tasks.length > 0" class="mt-3">
                                <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                    <Icon name="mdi:clipboard-check" class="w-4 h-4" />
                                    {{ $t('about.work.mainTasks') }}
                                </h4>
                                <ul class="space-y-1">
                                    <li v-for="(task, taskIndex) in item.tasks.slice(0, 3)" :key="taskIndex"
                                        class="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                        <span class="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                                        {{ task }}
                                    </li>
                                    <li v-if="item.tasks.length > 3"
                                        class="text-sm text-blue-600 dark:text-blue-400 italic">
                                        + {{ item.tasks.length - 3 }} {{ $t('about.work.moreTasks') }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Certifications Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <div class="text-center">
            <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400">{{
                $t('about.certifications.title') }}</h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-4">
                {{ $t('about.certifications.subtitle') }}
            </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
            <div v-for="(cert, index) in certifications" :key="cert.title"
                class="group relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-500 transform flex flex-col">
                <div class="flex flex-col gap-4 flex-1">
                    <div class="flex items-center justify-between flex-col lg:flex-row">
                        <div class="flex items-center flex-col md:flex-row gap-3">
                            <div :class="[
                                'w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300',
                                getColorClasses(cert.color).bg
                            ]">
                                <Icon :name="cert.icon" class="w-6 h-6 text-white" />
                            </div>
                            <h3 class="text-lg font-bold text-gray-800 dark:text-white">{{ cert.title }}</h3>
                        </div>
                        <span :class="[
                            'px-3 py-1 text-sm rounded-full font-medium',
                            getColorClasses(cert.color).bgLight,
                            getColorClasses(cert.color).text
                        ]">
                            {{ cert.year }}
                        </span>
                    </div>

                    <!-- Description -->
                    <div class="flex flex-col gap-3">
                        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ cert.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Special Experiences Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">{{
            $t('about.experiences.title') }}</h2>

        <div class="grid md:grid-cols-3 gap-8">
            <div v-for="experience in experiences" :key="experience.title"
                class="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col gap-4">
                <div :class="[
                    'w-16 h-16 mx-auto rounded-full flex items-center justify-center',
                    getColorClasses(experience.color).bg
                ]">
                    <Icon :name="experience.icon" class="w-8 h-8 text-white" />
                </div>
                <h3 class="text-lg font-bold text-gray-800 dark:text-white">{{ experience.title }}</h3>
                <p class="text-gray-600 dark:text-gray-300">{{ experience.description }}</p>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section>
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4 md:gap-6">
            <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400">{{ $t('about.cta.title') }}
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-300">
                {{ $t('about.cta.subtitle') }}
            </p>
            <div class="flex justify-center">
                <NuxtLinkLocale to="/contact"
                    class="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl w-fit">
                    {{ $t('about.cta.button') }}
                    <Icon name="mdi:arrow-right" class="w-5 h-5" />
                </NuxtLinkLocale>
            </div>
        </div>
    </section>
</template>