<script setup lang="ts">
definePageMeta({
    layout: 'hero'
})

const { t } = useI18n()
const { setSeoMeta, getStructuredData } = useSeo()

setSeoMeta({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    keywords: t('seo.home.keywords')
})

useHead(() => ({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(getStructuredData('Person'))
        },
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(getStructuredData('WebSite'))
        }
    ]
}))

const texts = computed(() => [
    t('home.roles.fullstack'),
    t('home.roles.serveradmin'),
    t('home.roles.solver')
])

const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about-section') as HTMLElement
    if (aboutSection) {
        window.scrollTo({
            top: aboutSection.offsetTop,
            behavior: 'smooth'
        })
    }
}

// Quick Facts Data
const quickFacts = computed(() => [
    { icon: 'mdi:map-marker', color: 'text-blue-500', key: 'location' },
    { icon: 'mdi:school', color: 'text-purple-500', key: 'experience' },
    { icon: 'mdi:school', color: 'text-purple-500', key: 'education' },
    { icon: 'mdi:heart', color: 'text-red-500', key: 'passion' }
])

// Stats Data
const stats = computed(() => [
    {
        icon: 'mdi:briefcase',
        value: '5+',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        iconColor: 'text-blue-600 dark:text-blue-400',
        valueColor: 'text-blue-600 dark:text-blue-400',
        titleKey: 'experience',
        descKey: 'experienceDesc'
    },
    {
        icon: 'mdi:certificate',
        value: '10+',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        iconColor: 'text-green-600 dark:text-green-400',
        valueColor: 'text-green-600 dark:text-green-400',
        titleKey: 'certifications',
        descKey: 'certificationsDesc'
    },
    {
        icon: 'mdi:translate',
        value: '4',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        iconColor: 'text-purple-600 dark:text-purple-400',
        valueColor: 'text-purple-600 dark:text-purple-400',
        titleKey: 'languages',
        descKey: 'languagesDesc'
    },
    {
        icon: 'mdi:code-braces',
        value: '15+',
        bgColor: 'bg-orange-100 dark:bg-orange-900/30',
        iconColor: 'text-orange-600 dark:text-orange-400',
        valueColor: 'text-orange-600 dark:text-orange-400',
        titleKey: 'projects',
        descKey: 'projectsDesc'
    }
])

// Services Data
const services = computed(() => [
    {
        key: 'webdev',
        icon: 'mdi:web',
        bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
        iconBg: 'bg-blue-500',
        checkColor: 'text-blue-500',
        features: ['spa', 'ssr', 'pwa']
    },
    {
        key: 'cloud',
        icon: 'mdi:cloud',
        bgGradient: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
        iconBg: 'bg-purple-500',
        checkColor: 'text-purple-500',
        features: ['aws', 'azure', 'gcp']
    },
    {
        key: 'itadmin',
        icon: 'mdi:server',
        bgGradient: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
        iconBg: 'bg-green-500',
        checkColor: 'text-green-500',
        features: ['linux', 'networks', 'security']
    }
])

// Featured Project Features
const featuredFeatures = computed(() => [
    {
        icon: 'mdi:brain',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20',
        iconColor: 'text-purple-600 dark:text-purple-400',
        key: 'ai'
    },
    {
        icon: 'mdi:chat-processing',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        iconColor: 'text-green-600 dark:text-green-400',
        key: 'realtime'
    },
    {
        icon: 'mdi:palette',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        iconColor: 'text-blue-600 dark:text-blue-400',
        key: 'ui'
    },
    {
        icon: 'mdi:shield-check',
        bgColor: 'bg-orange-50 dark:bg-orange-900/20',
        iconColor: 'text-orange-600 dark:text-orange-400',
        key: 'security'
    }
])

// Tech Stack
const techStack = computed(() => [
    'Vue.js 3',
    'Nuxt.js',
    'TypeScript',
    'OpenRouter.ai',
    '+2'
])
</script>

<template>
    <!-- Hero Section -->
    <section class="relative min-h-[calc(100vh-65px)] flex items-center justify-center overflow-hidden">
        <!-- Animated Stars Background -->
        <div class="absolute inset-0">
            <!-- Dynamic Gradient Background - Light/Dark Mode -->
            <div
                class="absolute inset-0 bg-gradient-radial from-gray-50 via-gray-100 to-gray-300 dark:from-blue-950/90 dark:via-gray-900 dark:to-gray-950 ">
            </div>

            <!-- Animated Stars Canvas -->
            <AnimatedStars :particle-count="50" :flare-count="10" :motion="0.03" :link-chance="25"
                canvas-class="z-0 opacity-85 dark:opacity-80 transition-opacity " />

            <!-- Adaptive overlay for text readability -->
            <div
                class="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-white/30 dark:from-transparent dark:via-transparent dark:to-gray-900/20 ">
            </div>
        </div>

        <!-- Main Content -->
        <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-16 lg:pb-10">
            <div class="text-center space-y-8">
                <!-- Main Headline with Enhanced Typography -->
                <div class="space-y-4 mt-16">
                    <div class="space-y-2">
                        <p class="text-2xl font-medium tracking-wide uppercase text-blue-600 dark:text-blue-300">
                            {{ $t('home.greeting') }}</p>
                        <h1 class="text-6xl md:text-8xl font-black leading-tight">
                            <span
                                class="uppercase block text-gray-800 dark:text-white drop-shadow-sm dark:drop-shadow-lg">
                                Chad<br />Feierstein
                            </span>
                        </h1>
                    </div>

                    <!-- Enhanced Typing Effect - Linux Shell Style -->
                    <TypingEffect :texts="texts" :typing-speed="100" :deleting-speed="50" :pause-duration="2000"
                        terminal-user="chad" terminal-host="portfolio" command="echo" />
                </div>

                <!-- Value Proposition -->
                <div class="max-w-3xl mx-auto">
                    <p
                        class="text-xl md:text-2xl leading-relaxed text-gray-600 dark:text-gray-200 drop-shadow-sm dark:drop-shadow-md">
                        {{ $t('home.tagline') }}
                    </p>
                </div>

                <!-- Enhanced CTA Section -->
                <div class="pt-8">
                    <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                        <!-- Primary CTA -->
                        <NuxtLinkLocale to="/showcase"
                            class="group relative px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-md hover:bg-blue-700 hover:shadow-lg inline-flex items-center">
                            <span class="relative z-10 flex items-center gap-3">
                                <Icon name="mdi:eye" class="w-6 h-6" />
                                {{ $t('home.cta.primary') }}
                            </span>
                        </NuxtLinkLocale>

                        <!-- Secondary CTA -->
                        <NuxtLinkLocale to="/contact"
                            class="group relative px-10 py-5 border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-2xl font-bold text-lg hover:bg-gray-100 dark:hover:bg-gray-800 shadow-md hover:shadow-lg inline-flex items-center">
                            <span class="flex items-center gap-3">
                                {{ $t('home.cta.secondary') }}
                                <Icon name="mdi:chat" class="w-6 h-6 transition-transform" />
                            </span>
                        </NuxtLinkLocale>
                    </div>
                </div>
            </div>
        </div>

        <!-- Scroll Down Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <div class="flex flex-col items-center animate-bounce">
                <div class="relative flex justify-center items-center w-[50px] h-[50px] 
                            border-2 border-blue-500/30 dark:border-blue-400/40 
                            rounded-full bg-white/10 dark:bg-gray-900/20 
                            backdrop-blur-[10px] cursor-pointer
                            hover:-translate-y-0.5 hover:border-blue-500/60 hover:bg-blue-500/10
                            dark:hover:border-blue-400/70 dark:hover:bg-blue-400/10" @click="scrollToAbout">
                    <Icon name="mdi:chevron-down" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
            </div>
        </div>
    </section>

    <!-- About Preview Section -->
    <section id="about-section" class="py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
            <!-- Section Header -->
            <div class="text-center flex flex-col gap-4">
                <h2 class="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400">
                    {{ $t('home.about.title') }}
                </h2>
                <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    {{ $t('home.about.subtitle') }}
                </p>
            </div>

            <!-- Main About Grid -->
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <!-- Left: Story & Quick Facts -->
                <div class="flex flex-col gap-8">
                    <!-- Personal Story Card -->
                    <div
                        class="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-3xl p-8 shadow-lg flex flex-col gap-6">
                        <div class="flex items-center flex-col sm:flex-row gap-4">
                            <div class="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
                                <Icon name="mdi:account-heart" class="w-8 h-8 text-white" />
                            </div>
                            <div class="flex flex-col">
                                <h3 class="text-2xl font-bold text-gray-800 dark:text-white">Chad Feierstein</h3>
                                <p class="text-blue-600 dark:text-blue-400 font-medium">{{ $t('home.about.role') }}
                                </p>
                            </div>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {{ $t('home.about.story') }}
                        </p>

                        <!-- Quick Facts -->
                        <div class="grid sm:grid-cols-2 gap-4">
                            <div v-for="fact in quickFacts" :key="fact.key" class="flex items-center gap-3">
                                <Icon :name="fact.icon" :class="`w-5 h-5 ${fact.color}`" />
                                <span class="text-gray-600 dark:text-gray-400">{{ $t(`home.about.${fact.key}`) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Enhanced Stats Grid -->
                <div class="grid sm:grid-cols-2 gap-6">
                    <div v-for="stat in stats" :key="stat.titleKey"
                        class="relative group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
                        <div
                            :class="`absolute top-4 right-4 w-10 h-10 ${stat.bgColor} rounded-full flex items-center justify-center`">
                            <Icon :name="stat.icon" :class="`w-5 h-5 ${stat.iconColor}`" />
                        </div>
                        <div class="text-center flex flex-col gap-2">
                            <div :class="`text-4xl font-black ${stat.valueColor}`">{{ stat.value }}</div>
                            <div class="text-gray-600 dark:text-gray-300 font-medium">{{
                                $t(`home.stats.${stat.titleKey}`) }}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">{{ $t(`home.stats.${stat.descKey}`) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CTA Button -->
            <NuxtLinkLocale to="/about"
                class="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold shadow-md hover:shadow-lg transform self-center">
                <Icon name="mdi:open-in-new" class="w-4 h-4" />
                {{ $t('home.about.cta') }}
            </NuxtLinkLocale>
        </div>
    </section>

    <!-- Skills & Services Section -->
    <section class="py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center flex flex-col gap-4">
                <h2 class="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400">
                    {{ $t('home.services.title') }}
                </h2>
                <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    {{ $t('home.services.subtitle') }}
                </p>
            </div>

            <!-- Services Grid -->
            <div class="flex flex-col lg:flex-row gap-8 mt-16">
                <div v-for="service in services" :key="service.key"
                    :class="`group relative bg-gradient-to-br ${service.bgGradient} rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 flex flex-col cursor-pointer`">
                    <div class="flex flex-col gap-4 flex-1">
                        <div class="flex items-center gap-3">
                            <div
                                :class="`w-10 h-10 ${service.iconBg} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`">
                                <Icon :name="service.icon" class="w-6 h-6 text-white" />
                            </div>
                            <h3
                                class="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                {{ $t(`home.services.${service.key}.title`) }}
                            </h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {{ $t(`home.services.${service.key}.description`) }}
                        </p>
                        <ul class="flex flex-col gap-2">
                            <li v-for="feature in service.features" :key="feature"
                                class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <Icon name="mdi:check-circle" :class="`w-4 h-4 ${service.checkColor}`" />
                                {{ $t(`home.services.${service.key}.features.${feature}`) }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Project Showcase - Creative Design -->
    <section class="py-16 md:py-24 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center flex flex-col gap-4 mb-16">
                <h2 class="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400">
                    {{ $t('home.featured.title') }}
                </h2>
                <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    {{ $t('home.featured.subtitle') }}
                </p>
            </div>

            <!-- Creative Split-Screen Layout -->
            <div class="relative">
                <!-- Main Container with Perspective -->
                <div class="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <!-- Left: Visual/Interactive Side -->
                    <div class="relative order-2 lg:order-1">
                        <VisualBrowser url="https://ai.chad.lu" favicon="mdi:robot-excited">
                            <AiChatInterface />
                        </VisualBrowser>
                    </div>

                    <!-- Right: Content Side -->
                    <div class="space-y-6 order-1 lg:order-2">
                        <!-- Project Title -->
                        <div class="space-y-3">
                            <h3 class="text-3xl md:text-4xl font-black text-gray-800 dark:text-white leading-tight">
                                {{ $t('home.featured.projectTitle') }}
                            </h3>
                        </div>

                        <!-- Description -->
                        <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            {{ $t('home.featured.description') }}
                        </p>

                        <!-- Key Features - Compact -->
                        <div class="grid grid-cols-2 gap-3">
                            <div v-for="feature in featuredFeatures" :key="feature.key"
                                :class="`flex items-center gap-3 p-3 ${feature.bgColor} rounded-xl`">
                                <Icon :name="feature.icon" :class="`w-5 h-5 ${feature.iconColor} flex-shrink-0`" />
                                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {{ $t(`home.featured.features.${feature.key}.title`) }}
                                </span>
                            </div>
                        </div>

                        <!-- Tech Stack - Floating Pills -->
                        <div class="space-y-3">
                            <h4
                                class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <Icon name="mdi:cog" class="w-4 h-4" />
                                {{ $t('home.featured.techStack') }}
                            </h4>
                            <div class="flex flex-wrap gap-2">
                                <span v-for="(tech, index) in techStack" :key="index"
                                    :class="index === techStack.length - 1
                                        ? 'px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full text-sm'
                                        : 'px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium'">
                                    {{ tech }}
                                </span>
                            </div>
                        </div>

                        <!-- Action Buttons - Enhanced -->
                        <div class="flex flex-col sm:flex-row gap-4 pt-4">
                            <NuxtLinkLocale to="/showcase/project/my-chat-bot"
                                class="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold shadow-md hover:shadow-lg">
                                <Icon name="mdi:eye" class="w-5 h-5" />
                                {{ $t('home.featured.cta.view') }}
                            </NuxtLinkLocale>

                            <a href="https://ai.chad.lu" target="_blank" rel="noopener noreferrer"
                                class="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-2xl font-semibold border border-gray-200 dark:border-gray-600 shadow-md hover:shadow-lg">
                                <Icon name="mdi:rocket-launch" class="w-5 h-5" />
                                {{ $t('home.featured.cta.demo') }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Custom Gradient for Hero Background */
.bg-gradient-radial {
    background-image: radial-gradient(ellipse at center, var(--tw-gradient-stops));
}

/* Enhanced bounce animation for scroll indicator */
@keyframes scroll-bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-8px);
    }

    60% {
        transform: translateY(-4px);
    }
}

.animate-bounce {
    animation: scroll-bounce 2s infinite;
}
</style>
