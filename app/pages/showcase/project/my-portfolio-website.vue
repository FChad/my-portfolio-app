<script lang="ts" setup>
const { t } = useI18n()

const keyFeatures = [
    {
        id: 'multilingual',
        title: 'projects.myPortfolio.features.multilingual.title',
        description: 'projects.myPortfolio.features.multilingual.description',
        icon: 'mdi:web'
    },
    {
        id: 'responsive',
        title: 'projects.myPortfolio.features.responsive.title',
        description: 'projects.myPortfolio.features.responsive.description',
        icon: 'mdi:responsive'
    },
    {
        id: 'darkMode',
        title: 'projects.myPortfolio.features.darkMode.title',
        description: 'projects.myPortfolio.features.darkMode.description',
        icon: 'mdi:theme-light-dark'
    },
    {
        id: 'performance',
        title: 'projects.myPortfolio.features.performance.title',
        description: 'projects.myPortfolio.features.performance.description',
        icon: 'mdi:lightning-bolt'
    },
    {
        id: 'seo',
        title: 'projects.myPortfolio.features.seo.title',
        description: 'projects.myPortfolio.features.seo.description',
        icon: 'mdi:magnify'
    },
    {
        id: 'contact',
        title: 'projects.myPortfolio.features.contact.title',
        description: 'projects.myPortfolio.features.contact.description',
        icon: 'mdi:email-outline'
    }
];

const technologies = [
    {
        id: 'nuxt3',
        name: 'projects.myPortfolio.technologies.nuxt3.name',
        tech: 'projects.myPortfolio.technologies.nuxt3.tech',
        icon: 'mdi:nuxt',
        description: 'projects.myPortfolio.technologies.nuxt3.description'
    },
    {
        id: 'vue3',
        name: 'projects.myPortfolio.technologies.vue3.name',
        tech: 'projects.myPortfolio.technologies.vue3.tech',
        icon: 'mdi:vuejs',
        description: 'projects.myPortfolio.technologies.vue3.description'
    },
    {
        id: 'typescript',
        name: 'projects.myPortfolio.technologies.typescript.name',
        tech: 'projects.myPortfolio.technologies.typescript.tech',
        icon: 'mdi:language-typescript',
        description: 'projects.myPortfolio.technologies.typescript.description'
    },
    {
        id: 'tailwind',
        name: 'projects.myPortfolio.technologies.tailwind.name',
        tech: 'projects.myPortfolio.technologies.tailwind.tech',
        icon: 'mdi:tailwind',
        description: 'projects.myPortfolio.technologies.tailwind.description'
    },
    {
        id: 'i18n',
        name: 'projects.myPortfolio.technologies.i18n.name',
        tech: 'projects.myPortfolio.technologies.i18n.tech',
        icon: 'mdi:translate',
        description: 'projects.myPortfolio.technologies.i18n.description'
    },
    {
        id: 'veevalidate',
        name: 'projects.myPortfolio.technologies.veevalidate.name',
        tech: 'projects.myPortfolio.technologies.veevalidate.tech',
        icon: 'mdi:check-circle',
        description: 'projects.myPortfolio.technologies.veevalidate.description'
    },
    {
        id: 'resend',
        name: 'projects.myPortfolio.technologies.resend.name',
        tech: 'projects.myPortfolio.technologies.resend.tech',
        icon: 'mdi:email-send',
        description: 'projects.myPortfolio.technologies.resend.description'
    },
    {
        id: 'iconify',
        name: 'projects.myPortfolio.technologies.iconify.name',
        tech: 'projects.myPortfolio.technologies.iconify.tech',
        icon: 'mdi:emoticon-outline',
        description: 'projects.myPortfolio.technologies.iconify.description'
    }
];


</script>

<template>
    <!-- Navigation -->
    <UiSubNavigation :title="t('showcase.projects.myPortfolio.title')" />

    <main class="overflow-hidden">

        <!-- Hero Section -->
        <section class="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <div class="text-center max-w-4xl mx-auto">
                    <!-- Title and Description -->
                    <h1 class="text-5xl md:text-6xl font-black mb-6">
                        <span class="uppercase block text-gray-700 dark:text-gray-300">
                            {{ t('showcase.projects.myPortfolio.title') }}
                        </span>
                    </h1>

                    <p
                        class="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                        {{ t('projects.myPortfolio.description') }}
                    </p>

                    <!-- Action Buttons -->
                    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
                        <a href="https://www.chad.lu" target="_blank" rel="noopener noreferrer"
                            class="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <Icon name="mdi:rocket-launch" class="w-5 h-5" />
                            Live Demo
                            <Icon name="mdi:open-in-new" class="w-4 h-4" />
                        </a>

                        <a href="https://github.com/FChad/my-portfolio-app" target="_blank" rel="noopener noreferrer"
                            class="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-2xl border border-gray-200/60 dark:border-gray-600/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <Icon name="mdi:github" class="w-5 h-5" />
                            View Source
                            <Icon name="mdi:open-in-new" class="w-4 h-4" />
                        </a>
                    </div>

                    <!-- Tags -->
                    <div class="flex flex-wrap gap-2 sm:gap-3 justify-center px-4">
                        <span
                            v-for="tag in ['Nuxt3', 'TypeScript', 'Tailwind', 'i18n', 'VeeValidate', 'Resend', 'Iconify']"
                            :key="tag"
                            class="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200/60 dark:border-gray-600/60 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300">
                            {{ tag }}
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Key Features Section -->
        <section class="py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-12 sm:mb-16">
                    <div class="text-center mb-8 sm:mb-12">
                        <h2
                            class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
                            {{ t('projects.myPortfolio.keyFeatures.title') }}</h2>
                        <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
                            {{ t('projects.myPortfolio.keyFeatures.subtitle') }}
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        <div v-for="feature in keyFeatures" :key="feature.id"
                            class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200/60 dark:border-gray-600/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <div
                                    class="p-2.5 sm:p-3 bg-blue-500 rounded-xl shadow-lg w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                                    <Icon :name="feature.icon" class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <h3
                                    class="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {{ t(feature.title) }}
                                </h3>
                            </div>
                            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                {{ t(feature.description) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Technologies Section -->
        <section class="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-12 sm:mb-16">
                    <div class="text-center mb-8 sm:mb-12">
                        <h2
                            class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
                            {{ t('projects.myPortfolio.builtWith.title') }}</h2>
                        <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
                            {{ t('projects.myPortfolio.builtWith.subtitle') }}
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div v-for="tech in technologies" :key="tech.id"
                            class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-200/60 dark:border-gray-600/60 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div class="flex items-center gap-3 mb-2">
                                <Icon :name="tech.icon" class="w-4 h-4 text-gray-800 dark:text-gray-200" />
                                <span class="text-base font-medium text-gray-600 dark:text-gray-400">{{ t(tech.name)
                                }}</span>
                            </div>
                            <p class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{{ t(tech.tech) }}
                            </p>
                            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ t(tech.description)
                            }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 bg-blue-600 text-white">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-4xl font-bold mb-6">{{
                    t('projects.myPortfolio.callToAction.title') }}
                </h2>
                <p class="text-xl mb-8 opacity-90">
                    {{ t('projects.myPortfolio.callToAction.subtitle') }}
                </p>

                <a href="https://www.chad.lu" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-xl font-semibold hover:bg-gray-200 hover:shadow-lg transition-all duration-300">
                    <Icon name="mdi:rocket-launch" class="w-5 h-5" />
                    {{ t('projects.myPortfolio.callToAction.button') }}
                    <Icon name="mdi:open-in-new" class="w-4 h-4" />
                </a>
            </div>
        </section>
    </main>
</template>

<style lang="postcss" scoped>
@keyframes float-slow {

    0%,
    100% {
        transform: translateY(0px) rotate(12deg);
    }

    50% {
        transform: translateY(-20px) rotate(12deg);
    }
}

@keyframes float-medium {

    0%,
    100% {
        transform: translateY(0px) rotate(-12deg);
    }

    50% {
        transform: translateY(-15px) rotate(-12deg);
    }
}

@keyframes float-fast {

    0%,
    100% {
        transform: translateY(0px) rotate(6deg);
    }

    50% {
        transform: translateY(-10px) rotate(6deg);
    }
}

.animate-float-slow {
    animation: float-slow 6s ease-in-out infinite;
}

.animate-float-medium {
    animation: float-medium 4s ease-in-out infinite;
}

.animate-float-fast {
    animation: float-fast 3s ease-in-out infinite;
}
</style>
