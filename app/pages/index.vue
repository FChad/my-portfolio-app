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
            <!-- Subtle Background -->
            <div
                class="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
            </div>

            <!-- Animated Stars Canvas -->
            <AnimatedStars :particle-count="50" :flare-count="10" :motion="0.03" :link-chance="25"
                canvas-class="z-0 opacity-85 dark:opacity-80 transition-opacity" />

            <!-- Adaptive overlay for text readability -->
            <div
                class="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-white/40 dark:from-transparent dark:via-transparent dark:to-gray-900/20">
            </div>
        </div>

        <!-- Main Content -->
        <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-16 lg:pb-10">
            <div class="text-center space-y-8">
                <!-- Main Headline with Enhanced Typography -->
                <div class="space-y-6 mt-16 animate-fade-in">
                    <!-- Greeting with subtle animation -->
                    <p class="text-xl sm:text-2xl font-medium tracking-wide uppercase animate-slide-down opacity-0"
                        style="animation-delay: 0.2s; animation-fill-mode: forwards;">
                        <span
                            class="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            {{ $t('home.greeting') }}
                        </span>
                    </p>

                    <!-- Name -->
                    <h1 class="text-5xl sm:text-6xl md:text-8xl font-black leading-tight animate-slide-up opacity-0 text-gray-800 dark:text-white uppercase"
                        style="animation-delay: 0.4s; animation-fill-mode: forwards;">
                        Chad<br />Feierstein
                    </h1>

                    <!-- Creative Typing Effect -->
                    <div class="animate-fade-in opacity-0"
                        style="animation-delay: 0.6s; animation-fill-mode: forwards;">
                        <TypingEffect :texts="texts" :typing-speed="100" :deleting-speed="50" :pause-duration="2000" />
                    </div>
                </div>

                <!-- Value Proposition with animation -->
                <div class="max-w-3xl mx-auto animate-fade-in opacity-0"
                    style="animation-delay: 0.8s; animation-fill-mode: forwards;">
                    <p class="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-600 dark:text-gray-300">
                        {{ $t('home.tagline') }}
                    </p>
                </div>

                <!-- Enhanced CTA Section with hover effects -->
                <div class="pt-8 animate-fade-in opacity-0" style="animation-delay: 1s; animation-fill-mode: forwards;">
                    <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12">
                        <!-- Primary CTA -->
                        <NuxtLinkLocale to="/showcase"
                            class="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center hover:-translate-y-1">
                            <span class="flex items-center gap-3">
                                <Icon name="mdi:eye"
                                    class="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                                {{ $t('home.cta.primary') }}
                            </span>
                        </NuxtLinkLocale>

                        <!-- Secondary CTA -->
                        <NuxtLinkLocale to="/contact"
                            class="group px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center hover:-translate-y-1">
                            <span class="flex items-center gap-3">
                                {{ $t('home.cta.secondary') }}
                                <Icon name="mdi:chat"
                                    class="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                            </span>
                        </NuxtLinkLocale>
                    </div>
                </div>
            </div>
        </div>

        <!-- Scroll Down Indicator with pulse animation -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-fade-in opacity-0"
            style="animation-delay: 1.2s; animation-fill-mode: forwards;">
            <div class="flex flex-col items-center animate-bounce">
                <div class="relative flex justify-center items-center w-[50px] h-[50px] 
                            border-2 border-blue-500/30 dark:border-blue-400/40 
                            rounded-full bg-white/10 dark:bg-gray-900/20 
                            backdrop-blur-[10px] cursor-pointer
                            hover:-translate-y-0.5 hover:border-blue-500/60 hover:bg-blue-500/10
                            dark:hover:border-blue-400/70 dark:hover:bg-blue-400/10
                            transition-all duration-300 group" @click="scrollToAbout">
                    <Icon name="mdi:chevron-down"
                        class="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                    <!-- Pulse ring effect -->
                    <span
                        class="absolute inset-0 rounded-full border-2 border-blue-500/50 dark:border-blue-400/50 animate-ping"></span>
                </div>
            </div>
        </div>
    </section>

    <!-- About Preview Section -->
    <section id="about-section" class="py-12 md:py-16 lg:py-24 relative overflow-hidden">
        <div
            class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-100/60 to-transparent dark:via-blue-900/10">
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header - Centered -->
            <div class="text-center mb-8 md:mb-12 lg:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 dark:text-white mb-3 md:mb-4">
                    {{ $t('home.about.title') }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2">
                    {{ $t('home.about.subtitle') }}
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
                <!-- Left: Main intro -->
                <div class="space-y-4 md:space-y-6">
                    <!-- Story -->
                    <p class="text-base md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        {{ $t('home.about.story') }}
                    </p>

                    <!-- CTA Button -->
                    <NuxtLinkLocale to="/about"
                        class="group inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl md:rounded-2xl font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-sm md:text-base">
                        <Icon name="mdi:open-in-new" class="w-4 h-4 md:w-5 md:h-5" />
                        {{ $t('home.about.cta') }}
                    </NuxtLinkLocale>
                </div>

                <!-- Right: Personal info cards -->
                <div class="flex flex-col gap-3 md:gap-4">
                    <!-- Location -->
                    <div
                        class="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div class="flex items-center gap-3 md:gap-4">
                            <div
                                class="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                                <Icon name="mdi:map-marker" class="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <div class="space-y-0.5 md:space-y-1 min-w-0">
                                <div class="text-xs md:text-sm text-gray-600 dark:text-gray-400">{{
                                    $t('home.about.location') }}</div>
                                <div
                                    class="text-sm md:text-base lg:text-xl font-bold text-gray-800 dark:text-white truncate">
                                    Rumelange,
                                    Luxemburg</div>
                            </div>
                        </div>
                    </div>

                    <!-- Role -->
                    <div
                        class="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div class="flex items-center gap-3 md:gap-4">
                            <div
                                class="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                                <Icon name="mdi:account-heart" class="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <div class="space-y-0.5 md:space-y-1 min-w-0">
                                <div class="text-xs md:text-sm text-gray-600 dark:text-gray-400">Position</div>
                                <div class="text-sm md:text-base lg:text-xl font-bold text-gray-800 dark:text-white">{{
                                    $t('home.about.role') }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Education -->
                    <div
                        class="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div class="flex items-center gap-3 md:gap-4">
                            <div
                                class="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                                <Icon name="mdi:school" class="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <div class="space-y-0.5 md:space-y-1 min-w-0">
                                <div class="text-xs md:text-sm text-gray-600 dark:text-gray-400">{{
                                    $t('home.about.study') }}</div>
                                <div class="text-sm md:text-base lg:text-xl font-bold text-gray-800 dark:text-white">{{
                                    $t('home.about.education') }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Passion -->
                    <div
                        class="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div class="flex items-center gap-3 md:gap-4">
                            <div
                                class="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                                <Icon name="mdi:certificate" class="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <div class="space-y-0.5 md:space-y-1 min-w-0">
                                <div class="text-xs md:text-sm text-gray-600 dark:text-gray-400">{{
                                    $t('home.about.training') }}</div>
                                <div class="text-sm md:text-base lg:text-xl font-bold text-gray-800 dark:text-white">{{
                                    $t('home.about.experience') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Skills & Services Section -->
    <section class="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center flex flex-col gap-4 mb-16">
                <h2 class="text-4xl md:text-5xl font-black text-gray-800 dark:text-white">
                    {{ $t('home.services.title') }}
                </h2>
                <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    {{ $t('home.services.subtitle') }}
                </p>
            </div>

            <!-- Services Grid -->
            <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
                <div v-for="service in services" :key="service.key"
                    class="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div class="flex flex-col gap-6 h-full">
                        <div class="flex items-center gap-4">
                            <div
                                :class="`w-14 h-14 ${service.iconBg} rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`">
                                <Icon :name="service.icon" class="w-7 h-7 text-white" />
                            </div>
                            <h3 class="text-2xl font-black text-gray-800 dark:text-white">
                                {{ $t(`home.services.${service.key}.title`) }}
                            </h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
                            {{ $t(`home.services.${service.key}.description`) }}
                        </p>
                        <ul class="flex flex-col gap-3">
                            <li v-for="feature in service.features" :key="feature"
                                class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <Icon name="mdi:check-circle" :class="`w-5 h-5 ${service.checkColor}`" />
                                <span class="font-medium">{{ $t(`home.services.${service.key}.features.${feature}`)
                                    }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Project Showcase -->
    <section class="py-16 md:py-24 relative overflow-hidden">
        <div
            class="absolute inset-0 bg-gradient-to-b from-transparent via-purple-100/60 to-transparent dark:via-purple-900/10">
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center flex flex-col gap-4 mb-16">
                <h2 class="text-4xl md:text-5xl font-black text-gray-800 dark:text-white">
                    {{ $t('home.featured.title') }}
                </h2>
                <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    {{ $t('home.featured.subtitle') }}
                </p>
            </div>

            <!-- Main Container -->
            <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <!-- Left: Visual/Interactive Side -->
                <div class="relative order-2 lg:order-1">
                    <VisualBrowser url="https://ai.chad.lu" favicon="mdi:robot-excited">
                        <AiChatInterface />
                    </VisualBrowser>
                </div>

                <!-- Right: Content Side -->
                <div
                    class="order-1 lg:order-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
                    <div class="space-y-6">
                        <!-- Project Title -->
                        <h3 class="text-3xl md:text-4xl font-black text-gray-800 dark:text-white leading-tight">
                            {{ $t('home.featured.projectTitle') }}
                        </h3>

                        <!-- Description -->
                        <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            {{ $t('home.featured.description') }}
                        </p>

                        <!-- Key Features -->
                        <div class="grid grid-cols-2 gap-3">
                            <div v-for="feature in featuredFeatures" :key="feature.key"
                                :class="`flex items-center gap-3 p-4 ${feature.bgColor} rounded-xl`">
                                <Icon :name="feature.icon" :class="`w-5 h-5 ${feature.iconColor} flex-shrink-0`" />
                                <span class="text-sm font-bold text-gray-700 dark:text-gray-300">
                                    {{ $t(`home.featured.features.${feature.key}.title`) }}
                                </span>
                            </div>
                        </div>

                        <!-- Tech Stack -->
                        <div class="space-y-3">
                            <h4
                                class="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
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

                        <!-- Action Buttons -->
                        <div class="flex flex-col sm:flex-row gap-4 pt-4">
                            <NuxtLinkLocale to="/showcase/project/my-chat-bot"
                                class="flex-1 inline-flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                <Icon name="mdi:eye" class="w-5 h-5" />
                                {{ $t('home.featured.cta.view') }}
                            </NuxtLinkLocale>

                            <a href="https://ai.chad.lu" target="_blank" rel="noopener noreferrer"
                                class="flex-1 inline-flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-2xl font-bold border border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
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
/* Hero entrance animations */
@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slide-down {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slide-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.8s ease-out;
}

.animate-slide-down {
    animation: slide-down 0.8s ease-out;
}

.animate-slide-up {
    animation: slide-up 0.8s ease-out;
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
