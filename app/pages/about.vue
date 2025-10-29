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

// Modal state for work experience details
const isModalOpen = ref(false)
const selectedWorkItem = ref<typeof workTimeline[0] | null>(null)

const openWorkDetails = (item: typeof workTimeline[0]) => {
    selectedWorkItem.value = item
    isModalOpen.value = true
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
    <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-12 w-full">
        <h1 class="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ $t('about.hero.title') }}
        </h1>

        <!-- Profile Introduction -->
        <div class="max-w-4xl mx-auto">
            <!-- About Me Card - Header + Story -->
            <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-md hover:shadow-lg">
                <div class="text-center">
                    <div class="flex items-center justify-center flex-col sm:flex-row gap-4 mb-4">
                        <div class="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-md">
                            <Icon name="mdi:account-heart" class="w-10 h-10 text-white" />
                        </div>
                        <div class="flex flex-col items-center sm:items-start">
                            <h3 class="text-2xl font-bold text-gray-800 dark:text-white">Chad Feierstein</h3>
                            <p class="text-blue-600 dark:text-blue-400 font-medium">{{ $t('about.profile.role') }}</p>
                            <p class="text-gray-500 dark:text-gray-400">{{ $t('about.profile.currentWork') }}</p>
                        </div>
                    </div>

                    <!-- Story Text -->
                    <div class="mt-4 pt-6 border-t border-gray-200 dark:border-gray-600">
                        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {{ $t('about.story.intro') }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Personal Details Section -->
    <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ $t('about.details.title') }}
        </h2>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
                class="group flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg">
                <div
                    class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
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
                class="group flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg">
                <div
                    class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
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
                class="group flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg">
                <div
                    class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
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
                class="group flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg">
                <div
                    class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
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
                class="group flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg">
                <div
                    class="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
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
    <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ $t('about.interests.title') }}
        </h2>

        <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center shadow-md">
                        <Icon name="mdi:heart" class="w-6 h-6 text-white" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white">{{
                        $t('about.passion.title') }}</h3>
                </div>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{
                    $t('about.passion.description') }}</p>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
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
    <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">{{
            $t('about.languages.title') }}</h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="lang in languages" :key="lang.name"
                class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg">
                <div class="flex items-center gap-3 mb-4">
                    <Icon :name="lang.flag" class="w-8 h-8" />
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
    <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">{{
            $t('about.education.title') }}</h2>

        <div class="grid md:grid-cols-2 gap-8">
            <div v-for="(edu, index) in education" :key="edu.year"
                class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg">
                <div class="flex flex-col gap-4">
                    <!-- Title, School and Year -->
                    <div class="flex items-start justify-between gap-4">
                        <div class="flex-1">
                            <h3 class="text-lg font-bold mb-1">{{ edu.degree }}</h3>
                            <p class="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-2">
                                <Icon name="mdi:school" class="w-5 h-5" />
                                {{ edu.school }}
                            </p>
                        </div>
                        <!-- Year Badge -->
                        <span
                            class="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-sm rounded-full font-medium flex-shrink-0">
                            {{ edu.year }}
                        </span>
                    </div>

                    <!-- Field and Grade -->
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {{ edu.field }} <br /> {{ edu.grade }}
                    </p>

                    <!-- View More Link -->
                    <div v-if="edu.link" class="mt-auto ml-auto">
                        <a :href="edu.link" target="_blank"
                            class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md hover:shadow-lg">
                            <Icon name="mdi:open-in-new" class="w-5 h-5" />
                            {{ $t('about.education.viewMore') }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Work Experience Timeline Section -->
    <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
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
                        'absolute w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400 z-20 flex items-center justify-center left-[2px]',
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
                        'p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg',
                        'ml-8 w-full md:w-5/12 md:ml-0',
                        index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                    ]">
                        <div class="flex flex-col gap-4">
                            <!-- Title, Company and Year -->
                            <div class="flex items-start justify-between gap-4">
                                <div class="flex-1">
                                    <h3 class="text-lg font-bold mb-1">{{ item.title }}</h3>
                                    <p v-if="item.company"
                                        class="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-2">
                                        <Icon name="mdi:office-building" class="w-5 h-5" />
                                        {{ item.company }}
                                    </p>
                                </div>
                                <!-- Year Badge -->
                                <span
                                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-sm rounded-full font-medium flex-shrink-0">
                                    {{ item.year }}
                                </span>
                            </div>

                            <!-- Description -->
                            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{
                                item.description }}</p>

                            <!-- Details Button -->
                            <div class="mt-auto ml-auto">
                                <button @click="openWorkDetails(item)"
                                    class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md hover:shadow-lg">
                                    <Icon name="mdi:information-outline" class="w-5 h-5" />
                                    {{ $t('about.work.viewDetails') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Certifications Section -->
    <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <div class="text-center">
            <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400">{{
                $t('about.certifications.title') }}</h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-4">
                {{ $t('about.certifications.subtitle') }}
            </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
            <div v-for="(cert, index) in certifications" :key="cert.title"
                class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg">
                <div class="flex flex-col gap-4">
                    <!-- Title and Year -->
                    <div class="flex items-start justify-between gap-4">
                        <div class="flex-1">
                            <h3 class="text-lg font-bold mb-1">{{ cert.title }}</h3>
                        </div>
                        <!-- Year Badge -->
                        <span
                            class="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-sm rounded-full font-medium flex-shrink-0">
                            {{ cert.year }}
                        </span>
                    </div>

                    <!-- Description -->
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ cert.description }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Special Experiences Section -->
    <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">{{
            $t('about.experiences.title') }}</h2>

        <div class="grid md:grid-cols-3 gap-8">
            <div v-for="experience in experiences" :key="experience.title"
                class="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg flex flex-col gap-4">
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
    <section class="py-16 md:py-24">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4 md:gap-6">
            <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400">{{ $t('about.cta.title') }}
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-300">
                {{ $t('about.cta.subtitle') }}
            </p>
            <div class="flex justify-center">
                <NuxtLinkLocale to="/contact"
                    class="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg w-fit">
                    {{ $t('about.cta.button') }}
                    <Icon name="mdi:arrow-right" class="w-5 h-5" />
                </NuxtLinkLocale>
            </div>
        </div>
    </section>

    <!-- Work Experience Details Modal -->
    <UiModal v-model="isModalOpen" max-width="2xl">
        <template #header>
            <div v-if="selectedWorkItem" class="flex flex-col gap-1 w-full">
                <!-- Title and Company -->
                <h3 class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                    {{ selectedWorkItem.title }}
                </h3>
            </div>
        </template>

        <div v-if="selectedWorkItem" class="flex flex-col gap-6">
            <!-- Company, Type and Year Badges -->
            <div class="flex flex-wrap items-center gap-2 sm:gap-3">
                <!-- Company Badge -->
                <div v-if="selectedWorkItem.company"
                    class="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg sm:rounded-xl border border-blue-200 dark:border-blue-700/50">
                    <Icon name="mdi:office-building" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span class="text-blue-900 dark:text-blue-200 font-semibold text-base">{{
                        selectedWorkItem.company }}</span>
                </div>
                <!-- Type Badge -->
                <div v-if="selectedWorkItem.type"
                    class="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg sm:rounded-xl border border-purple-200 dark:border-purple-700/50">
                    <Icon name="mdi:briefcase" class="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span class="text-purple-900 dark:text-purple-200 font-semibold text-base">{{
                        selectedWorkItem.type }}</span>
                </div>
                <!-- Year Badge -->
                <div
                    class="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-green-50 dark:bg-green-900/30 rounded-lg sm:rounded-xl border border-green-200 dark:border-green-700/50">
                    <Icon name="mdi:calendar" class="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span class="text-green-900 dark:text-green-200 font-bold text-base">{{
                        selectedWorkItem.year }}</span>
                </div>
            </div>

            <!-- Description Section -->
            <div
                class="flex flex-col gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                <h4 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                    {{ $t('about.work.modal.description') }}
                </h4>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                    {{ selectedWorkItem.description }}
                </p>
            </div>

            <!-- Tasks Section -->
            <div v-if="selectedWorkItem.tasks && selectedWorkItem.tasks.length > 0"
                class="flex flex-col gap-3 bg-white dark:bg-gray-800/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                <h4 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                    {{ $t('about.work.modal.tasks') }}
                </h4>
                <ul class="flex flex-col gap-2">
                    <li v-for="(task, taskIndex) in selectedWorkItem.tasks" :key="taskIndex"
                        class="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <!-- Number Badge -->
                        <span class="text-blue-600 dark:text-blue-400 font-semibold flex-shrink-0">
                            {{ taskIndex + 1 }}.
                        </span>
                        <!-- Task Text -->
                        <span class="flex-1 text-sm sm:text-base">
                            {{ task }}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </UiModal>
</template>
