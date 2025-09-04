<script setup lang="ts">
const { t } = useI18n()

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
        icon: 'heroicons:academic-cap'
    },
    {
        title: t('about.certificationsList.cert2.title'),
        year: '2021',
        description: t('about.certificationsList.cert2.description'),
        icon: 'heroicons:shield-check'
    },
    {
        title: t('about.certificationsList.cert3.title'),
        year: '2021',
        description: t('about.certificationsList.cert3.description'),
        icon: 'heroicons:server'
    },
    {
        title: t('about.certificationsList.cert4.title'),
        year: '2020',
        description: t('about.certificationsList.cert4.description'),
        icon: 'heroicons:server'
    },
    {
        title: t('about.certificationsList.cert5.title'),
        year: '2020',
        description: t('about.certificationsList.cert5.description'),
        icon: 'heroicons:server'
    },
    {
        title: t('about.certificationsList.cert6.title'),
        year: '2020',
        description: t('about.certificationsList.cert6.description'),
        icon: 'heroicons:document-text'
    }
]

const timeline = [
    {
        year: '2024',
        title: t('about.timelineItems.item1.title'),
        description: t('about.timelineItems.item1.description'),
        icon: 'heroicons:code-bracket',
        type: 'work'
    },
    {
        year: '2023',
        title: t('about.timelineItems.item2.title'),
        description: t('about.timelineItems.item2.description'),
        icon: 'heroicons:academic-cap',
        type: 'education'
    },
    {
        year: '2021',
        title: t('about.timelineItems.item3.title'),
        description: t('about.timelineItems.item3.description'),
        icon: 'heroicons:academic-cap',
        type: 'education'
    },
    {
        year: '2020',
        title: t('about.timelineItems.item4.title'),
        description: t('about.timelineItems.item4.description'),
        icon: 'heroicons:wrench-screwdriver',
        type: 'work'
    },
    {
        year: '2019',
        title: t('about.timelineItems.item5.title'),
        description: t('about.timelineItems.item5.description'),
        icon: 'heroicons:academic-cap',
        type: 'education'
    }
]

const experiences = [
    {
        title: t('about.experiencesList.exp1.title'),
        description: t('about.experiencesList.exp1.description'),
        icon: 'heroicons:paper-airplane'
    },
    {
        title: t('about.experiencesList.exp2.title'),
        description: t('about.experiencesList.exp2.description'),
        icon: 'heroicons:arrow-down-circle'
    },
    {
        title: t('about.experiencesList.exp3.title'),
        description: t('about.experiencesList.exp3.description'),
        icon: 'heroicons:musical-note'
    }
]
</script>

<template>
    <main class="overflow-hidden">
        <!-- Hero Section -->
        <section
            class="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>

            <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h1 class="text-5xl md:text-6xl font-black mb-6">
                        <span class="uppercase block text-gray-700 dark:text-gray-300">
                            {{ $t('about.hero.title') }}
                        </span>
                    </h1>
                    <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        {{ $t('about.hero.subtitle') }}
                    </p>
                </div>

                <!-- Profile Card -->
                <div class="max-w-4xl mx-auto">
                    <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
                        <div class="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 class="text-3xl font-bold mb-6">{{ $t('about.profile.title') }}</h2>
                                <div class="space-y-4">
                                    <div class="flex items-center gap-4">
                                        <Icon name="heroicons:map-pin"
                                            class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        <span>{{ $t('about.profile.location') }}</span>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <Icon name="heroicons:flag" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        <span>{{ $t('about.profile.nationality') }}</span>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <Icon name="heroicons:cake" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        <span>{{ $t('about.profile.age') }}</span>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <Icon name="heroicons:heart" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        <span>{{ $t('about.profile.status') }}</span>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <Icon name="heroicons:academic-cap"
                                            class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        <span>{{ $t('about.profile.driving') }}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="text-center">
                                <div
                                    class="w-48 h-48 mx-auto bg-blue-600 dark:bg-blue-400 rounded-full flex items-center justify-center mb-6">
                                    <Icon name="heroicons:user" class="w-24 h-24 text-white" />
                                </div>
                                <h3 class="text-2xl font-bold mb-2">Chad Feierstein</h3>
                                <p class="text-gray-600 dark:text-gray-400">{{ $t('about.profile.role') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Me Section -->
        <section class="py-20">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    <div>
                        <h2 class="text-4xl font-bold mb-6">{{ $t('about.story.title') }}</h2>
                        <div class="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            <p>{{ $t('about.story.intro') }}</p>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <div
                            class="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
                            <h3 class="text-xl font-bold mb-3 flex items-center gap-3">
                                <Icon name="heroicons:heart" class="w-6 h-6 text-red-500" />
                                {{ $t('about.passion.title') }}
                            </h3>
                            <p class="text-gray-600 dark:text-gray-300">{{ $t('about.passion.description') }}</p>
                        </div>

                        <div
                            class="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl">
                            <h3 class="text-xl font-bold mb-3 flex items-center gap-3">
                                <Icon name="heroicons:puzzle-piece" class="w-6 h-6 text-green-500" />
                                {{ $t('about.hobbies.title') }}
                            </h3>
                            <p class="text-gray-600 dark:text-gray-300">{{ $t('about.hobbies.description') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Languages Section -->
        <section class="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl font-bold text-center mb-16">{{ $t('about.languages.title') }}</h2>

                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="lang in languages" :key="lang.name"
                        class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                        <div class="flex items-center gap-3 mb-4">
                            <Icon :name="lang.flag" class="w-8 h-8" />
                            <h3 class="font-bold">{{ lang.name }}</h3>
                        </div>
                        <div class="text-center">
                            <span
                                class="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white font-bold text-lg rounded-full">
                                {{ lang.level }}
                            </span>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                {{ $t(`about.languages.levels.${lang.level}`) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Timeline Section -->
        <section class="py-20">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl font-bold text-center mb-16">{{ $t('about.timeline.title') }}</h2>

                <div class="relative">
                    <!-- Timeline line - Desktop centered, Mobile left -->
                    <div
                        class="absolute left-2 md:left-1/2 md:transform md:-translate-x-1/2 w-1 bg-blue-600 dark:bg-blue-400 h-full">
                    </div>

                    <div class="space-y-12">
                        <div v-for="(item, index) in timeline" :key="item.year" :class="[
                            'relative flex items-center',
                            'justify-start md:justify-start',
                            index % 2 === 1 ? 'md:justify-end' : ''
                        ]">
                            <!-- Timeline dot - Mobile left positioned, Desktop centered -->
                            <div :class="[
                                'absolute w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-400 z-10 flex items-center justify-center',
                                'md:left-1/2 md:transform md:-translate-x-1/2'
                            ]">
                                <div class="w-3 h-3 bg-white dark:bg-gray-900 rounded-full"></div>
                            </div>

                            <!-- Content card - Mobile full width with left margin, Desktop alternating -->
                            <div :class="[
                                'p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg',
                                'ml-8 w-full md:w-5/12 md:ml-0',
                                index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                            ]">
                                <div class="flex items-center gap-3 mb-3">
                                    <Icon :name="item.icon" :class="[
                                        'w-6 h-6',
                                        item.type === 'work' ? 'text-blue-500' : 'text-purple-500'
                                    ]" />
                                    <span class="text-sm font-medium text-gray-500">{{ item.year }}</span>
                                </div>
                                <h3 class="text-xl font-bold mb-2">{{ item.title }}</h3>
                                <p class="text-gray-600 dark:text-gray-300">{{ item.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Certifications Section -->
        <section class="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl font-bold text-center mb-16">{{ $t('about.certifications.title') }}</h2>

                <div class="grid md:grid-cols-2 gap-8">
                    <div v-for="cert in certifications" :key="cert.title"
                        class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <div class="flex items-start gap-4">
                            <div
                                class="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                <Icon :name="cert.icon" class="w-6 h-6 text-white" />
                            </div>
                            <div class="flex-1">
                                <h3 class="font-bold text-lg mb-2">{{ cert.title }}</h3>
                                <p class="text-gray-600 dark:text-gray-300">{{ cert.description }}</p>
                            </div>
                            <div class="flex-shrink-0">
                                <span
                                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full font-medium">
                                    {{ cert.year }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Special Experiences Section -->
        <section class="py-20 bg-blue-600 text-white">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl font-bold text-center mb-16">{{ $t('about.experiences.title') }}</h2>

                <div class="grid md:grid-cols-3 gap-8">
                    <div v-for="experience in experiences" :key="experience.title"
                        class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300">
                        <div class="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                            <Icon :name="experience.icon" class="w-8 h-8" />
                        </div>
                        <h3 class="text-xl font-bold mb-3">{{ experience.title }}</h3>
                        <p class="text-white/80">{{ experience.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-4xl font-bold mb-6">{{ $t('about.cta.title') }}</h2>
                <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
                    {{ $t('about.cta.subtitle') }}
                </p>
                <NuxtLinkLocale to="/contact"
                    class="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    {{ $t('about.cta.button') }}
                    <Icon name="heroicons:arrow-right" class="w-5 h-5" />
                </NuxtLinkLocale>
            </div>
        </section>
    </main>
</template>

<style scoped>
.bg-grid-pattern {
    background-image: radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 24px 24px;
}
</style>
