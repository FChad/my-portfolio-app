<script setup lang="ts">
import { computed } from 'vue'

// Define layout for hero page
definePageMeta({
    layout: 'hero'
})

const { t } = useI18n()
const { setSeoMeta, getStructuredData } = useSeo()

// SEO Implementation
setSeoMeta({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    keywords: t('seo.home.keywords'),
    type: 'website'
})

// Add structured data for homepage
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

// Get translated texts dynamically
const texts = computed(() => [
    t('home.roles.fullstack'),
    t('home.roles.serveradmin'),
    t('home.roles.solver')
])

// Smooth scroll to next section when clicking scroll indicator
const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about-section') as HTMLElement
    if (aboutSection) {
        const elementPosition = aboutSection.offsetTop - 65 - 10 // Account for navbar height and extra padding
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        })
    }
}
</script>

<template>
    <!-- Hero Section -->
    <section class="relative min-h-[calc(100vh-65px)] flex items-center justify-center overflow-hidden">
        <!-- Animated Stars Background -->
        <div class="absolute inset-0">
            <!-- Dynamic Gradient Background - Light/Dark Mode -->
            <div
                class="absolute inset-0 bg-gradient-radial from-gray-50 via-gray-100 to-gray-300 dark:from-blue-950/90 dark:via-gray-900 dark:to-gray-950 transition-colors ">
            </div>

            <!-- Animated Stars Canvas -->
            <AnimatedStars :particle-count="50" :flare-count="10" :motion="0.03" :link-chance="25"
                canvas-class="z-0 opacity-85 dark:opacity-80 transition-opacity " />

            <!-- Adaptive overlay for text readability -->
            <div
                class="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-white/30 dark:from-transparent dark:via-transparent dark:to-gray-900/20 transition-colors ">
            </div>
        </div>

        <!-- Main Content -->
        <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-16 lg:pb-10">
            <div class="text-center space-y-8">
                <!-- Main Headline with Enhanced Typography -->
                <div class="space-y-4 mt-16">
                    <div class="space-y-2">
                        <p
                            class="text-2xl font-medium tracking-wide uppercase text-blue-600 dark:text-blue-300 transition-colors">
                            {{ $t('home.greeting') }}</p>
                        <h1 class="text-6xl md:text-8xl font-black leading-tight">
                            <span
                                class="uppercase block transition-colors text-gray-800 dark:text-white drop-shadow-sm dark:drop-shadow-lg">
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
                        class="text-xl md:text-2xl leading-relaxed transition-colors text-gray-600 dark:text-gray-200 drop-shadow-sm dark:drop-shadow-md">
                        {{ $t('home.tagline') }}
                    </p>
                </div>

                <!-- Enhanced CTA Section -->
                <div class="pt-8">
                    <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                        <!-- Primary CTA -->
                        <NuxtLinkLocale to="/showcase"
                            class="group relative px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all inline-flex items-center">
                            <span class="relative z-10 flex items-center gap-3">
                                <Icon name="mdi:eye" class="w-6 h-6" />
                                {{ $t('home.cta.primary') }}
                            </span>
                        </NuxtLinkLocale>

                        <!-- Secondary CTA -->
                        <NuxtLinkLocale to="/contact"
                            class="group relative px-10 py-5 border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-2xl font-bold text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all shadow-md hover:shadow-lg inline-flex items-center">
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
                            backdrop-blur-[10px] transition-all cursor-pointer
                            hover:-translate-y-0.5 hover:border-blue-500/60 hover:bg-blue-500/10
                            dark:hover:border-blue-400/70 dark:hover:bg-blue-400/10" @click="scrollToAbout">
                    <Icon name="mdi:chevron-down" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
            </div>
        </div>
    </section>

    <!-- About Preview Section -->
    <section id="about-section">
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
                        class="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-3xl p-8 shadow-lg flex flex-col gap-6 transition-all">
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
                            <div class="flex items-center gap-3">
                                <Icon name="mdi:map-marker" class="w-5 h-5 text-blue-500" />
                                <span class="text-gray-600 dark:text-gray-400">{{ $t('home.about.location')
                                    }}</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <Icon name="mdi:school" class="w-5 h-5 text-purple-500" />
                                <span class="text-gray-600 dark:text-gray-400">{{ $t('home.about.experience')
                                    }}</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <Icon name="mdi:school" class="w-5 h-5 text-purple-500" />
                                <span class="text-gray-600 dark:text-gray-400">{{ $t('home.about.education')
                                    }}</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <Icon name="mdi:heart" class="w-5 h-5 text-red-500" />
                                <span class="text-gray-600 dark:text-gray-400">{{ $t('home.about.passion') }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Enhanced Stats Grid -->
                <div class="grid sm:grid-cols-2 gap-6">
                    <!-- Experience Card -->
                    <div
                        class="relative group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg transition-all hover:-translate-y-2">
                        <div
                            class="absolute top-4 right-4 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <Icon name="mdi:briefcase" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div class="text-center flex flex-col gap-2">
                            <div class="text-4xl font-black text-blue-600 dark:text-blue-400">5+
                            </div>
                            <div class="text-gray-600 dark:text-gray-300 font-medium">{{ $t('home.stats.experience')
                                }}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">{{
                                $t('home.stats.experienceDesc') }}</div>
                        </div>
                    </div>

                    <!-- Certifications Card -->
                    <div
                        class="relative group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg transition-all hover:-translate-y-2">
                        <div
                            class="absolute top-4 right-4 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <Icon name="mdi:certificate" class="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div class="text-center flex flex-col gap-2">
                            <div class="text-4xl font-black text-green-600 dark:text-green-400">10+</div>
                            <div class="text-gray-600 dark:text-gray-300 font-medium">{{
                                $t('home.stats.certifications') }}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">{{
                                $t('home.stats.certificationsDesc') }}</div>
                        </div>
                    </div>

                    <!-- Languages Card -->
                    <div
                        class="relative group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg transition-all hover:-translate-y-2">
                        <div
                            class="absolute top-4 right-4 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                            <Icon name="mdi:translate" class="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div class="text-center flex flex-col gap-2">
                            <div class="text-4xl font-black text-purple-600 dark:text-purple-400">4</div>
                            <div class="text-gray-600 dark:text-gray-300 font-medium">{{ $t('home.stats.languages')
                                }}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">{{
                                $t('home.stats.languagesDesc') }}</div>
                        </div>
                    </div>

                    <!-- Projects Card -->
                    <div
                        class="relative group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg transition-all hover:-translate-y-2">
                        <div
                            class="absolute top-4 right-4 w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                            <Icon name="mdi:code-braces" class="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div class="text-center flex flex-col gap-2">
                            <div class="text-4xl font-black text-orange-600 dark:text-orange-400">15+</div>
                            <div class="text-gray-600 dark:text-gray-300 font-medium">{{ $t('home.stats.projects')
                                }}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">{{
                                $t('home.stats.projectsDesc') }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CTA Button -->
            <NuxtLinkLocale to="/about"
                class="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all transform self-center">
                <Icon name="mdi:open-in-new" class="w-4 h-4" />
                {{ $t('home.about.cta') }}
            </NuxtLinkLocale>
        </div>
    </section>

    <!-- Skills & Services Section -->
    <section>
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
                <!-- Web Development -->
                <div
                    class="group relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-3xl p-8 hover:shadow-lg transition-all transform flex flex-col">
                    <div class="flex flex-col gap-4 flex-1">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                <Icon name="mdi:web" class="w-6 h-6 text-white" />
                            </div>
                            <h3 class="text-2xl font-bold text-gray-800 dark:text-white">{{
                                $t('home.services.webdev.title') }}</h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{
                            $t('home.services.webdev.description') }}</p>
                        <ul class="flex flex-col gap-2">
                            <li class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <Icon name="mdi:check-circle" class="w-4 h-4 text-blue-500" />
                                {{ $t('home.services.webdev.features.spa') }}
                            </li>
                            <li class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <Icon name="mdi:check-circle" class="w-4 h-4 text-blue-500" />
                                {{ $t('home.services.webdev.features.ssr') }}
                            </li>
                            <li class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <Icon name="mdi:check-circle" class="w-4 h-4 text-blue-500" />
                                {{ $t('home.services.webdev.features.pwa') }}
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Cloud Computing -->
                <div
                    class="group relative bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-3xl p-8 hover:shadow-lg transition-all transform flex flex-col">
                    <div class="flex flex-col gap-4 flex-1">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                <Icon name="mdi:cloud" class="w-6 h-6 text-white" />
                            </div>
                            <h3 class="text-2xl font-bold text-gray-800 dark:text-white">{{
                                $t('home.services.cloud.title') }}</h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{
                            $t('home.services.cloud.description') }}</p>
                        <ul class="flex flex-col gap-2">
                            <li class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <Icon name="mdi:check-circle" class="w-4 h-4 text-purple-500" />
                                {{ $t('home.services.cloud.features.aws') }}
                            </li>
                            <li class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <Icon name="mdi:check-circle" class="w-4 h-4 text-purple-500" />
                                {{ $t('home.services.cloud.features.azure') }}
                            </li>
                            <li class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <Icon name="mdi:check-circle" class="w-4 h-4 text-purple-500" />
                                {{ $t('home.services.cloud.features.gcp') }}
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- IT Administration -->
                <div
                    class="group relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-3xl p-8 hover:shadow-lg transition-all transform flex flex-col">
                    <div class="flex flex-col gap-4 flex-1">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                <Icon name="mdi:server" class="w-6 h-6 text-white" />
                            </div>
                            <h3 class="text-2xl font-bold text-gray-800 dark:text-white">{{
                                $t('home.services.itadmin.title') }}</h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{
                            $t('home.services.itadmin.description') }}</p>
                        <ul class="flex flex-col gap-2">
                            <li class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <Icon name="mdi:check-circle" class="w-4 h-4 text-green-500" />
                                {{ $t('home.services.itadmin.features.linux') }}
                            </li>
                            <li class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <Icon name="mdi:check-circle" class="w-4 h-4 text-green-500" />
                                {{ $t('home.services.itadmin.features.networks') }}
                            </li>
                            <li class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <Icon name="mdi:check-circle" class="w-4 h-4 text-green-500" />
                                {{ $t('home.services.itadmin.features.security') }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Project Showcase -->
    <section>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
            <div class="text-center flex flex-col gap-4">
                <h2 class="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400">
                    {{ $t('home.featured.title') }}
                </h2>
                <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    {{ $t('home.featured.subtitle') }}
                </p>
            </div>

            <!-- Featured Project Card -->
            <div class="max-w-4xl mx-auto">
                <div class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg">

                    <!-- Project Header - Simplified -->
                    <div class="p-8 border-b border-gray-200/60 dark:border-gray-600/60">
                        <div class="flex items-center gap-6">
                            <div
                                class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                                <Icon name="mdi:robot-excited" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div class="flex-1">
                                <h3 class="text-2xl font-black text-gray-800 dark:text-white">
                                    {{ $t('home.featured.projectTitle') }}
                                </h3>
                                <p class="text-gray-600 dark:text-gray-400 font-medium">
                                    {{ $t('home.featured.projectSubtitle') }}
                                </p>
                            </div>
                            <div class="hidden sm:block">
                                <div
                                    class="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl font-medium text-sm flex items-center gap-2">
                                    <Icon name="mdi:star" class="w-4 h-4" />
                                    {{ $t('home.featured.badge') }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project Content -->
                    <div class="p-8 flex flex-col gap-8">
                        <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            {{ $t('home.featured.description') }}
                        </p>

                        <!-- Key Features Grid -->
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="flex items-start gap-4">
                                <div
                                    class="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Icon name="mdi:brain" class="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div class="flex flex-col gap-1">
                                    <h4 class="font-semibold text-gray-800 dark:text-white">
                                        {{ $t('home.featured.features.ai.title') }}
                                    </h4>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">
                                        {{ $t('home.featured.features.ai.description') }}
                                    </p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4">
                                <div
                                    class="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Icon name="mdi:chat-processing" class="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div class="flex flex-col gap-1">
                                    <h4 class="font-semibold text-gray-800 dark:text-white">
                                        {{ $t('home.featured.features.realtime.title') }}
                                    </h4>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">
                                        {{ $t('home.featured.features.realtime.description') }}
                                    </p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4">
                                <div
                                    class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Icon name="mdi:palette" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div class="flex flex-col gap-1">
                                    <h4 class="font-semibold text-gray-800 dark:text-white">
                                        {{ $t('home.featured.features.ui.title') }}
                                    </h4>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">
                                        {{ $t('home.featured.features.ui.description') }}
                                    </p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4">
                                <div
                                    class="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Icon name="mdi:shield-check" class="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div class="flex flex-col gap-1">
                                    <h4 class="font-semibold text-gray-800 dark:text-white">
                                        {{ $t('home.featured.features.security.title') }}
                                    </h4>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">
                                        {{ $t('home.featured.features.security.description') }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Tech Stack - Einheitliches Design -->
                        <div class="border-t border-gray-200/60 dark:border-gray-600/60 pt-8 flex flex-col gap-4">
                            <h4 class="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                <Icon name="mdi:cog" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                {{ $t('home.featured.techStack') }}
                            </h4>
                            <div class="flex flex-wrap gap-2">
                                <span
                                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                                    Vue.js 3
                                </span>
                                <span
                                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                                    Nuxt.js
                                </span>
                                <span
                                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                                    TypeScript
                                </span>
                                <span
                                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                                    Ollama API
                                </span>
                                <span
                                    class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full text-sm">
                                    +2
                                </span>
                            </div>
                        </div>

                        <!-- Action Buttons - Konsistenter mit anderen Buttons -->
                        <div class="flex flex-col sm:flex-row gap-4">
                            <NuxtLinkLocale to="/showcase/project/my-chat-bot"
                                class="flex-1 inline-flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all ">
                                <Icon name="mdi:eye" class="w-5 h-5" />
                                {{ $t('home.featured.cta.view') }}
                            </NuxtLinkLocale>

                            <a href="https://ai.chad.lu" target="_blank" rel="noopener noreferrer"
                                class="flex-1 inline-flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold border border-gray-200 dark:border-gray-600 shadow-md hover:shadow-lg transition-all ">
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
