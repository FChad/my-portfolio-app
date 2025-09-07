<script setup lang="ts">
import { computed } from 'vue'

const { t } = useI18n()

// Get translated texts dynamically
const texts = computed(() => [
    t('home.roles.fullstack'),
    t('home.roles.serveradmin'),
    t('home.roles.solver')
])
</script>

<template>
    <!-- Main Content -->
    <main class="overflow-hidden">
        <!-- Hero Section -->
        <section class="relative min-h-[calc(100vh-65px)] flex items-center justify-center overflow-hidden">
            <!-- Animated Stars Background -->
            <div class="absolute inset-0">
                <!-- Dynamic Gradient Background - Light/Dark Mode -->
                <div class="absolute inset-0 
                    bg-gradient-radial from-slate-50 via-slate-100 to-slate-300
                    dark:from-blue-950/90 dark:via-gray-900 dark:to-gray-950
                    transition-colors duration-500"></div>

                <!-- Animated Stars Canvas -->
                <AnimatedStars :particle-count="50" :flare-count="15" :motion="0.03" :link-chance="85"
                    canvas-class="z-0 opacity-85 dark:opacity-80 transition-opacity duration-500" />

                <!-- Adaptive overlay for text readability -->
                <div class="absolute inset-0 z-10
                    bg-gradient-to-b from-transparent via-transparent to-white/30
                    dark:from-transparent dark:via-transparent dark:to-gray-900/20
                    transition-colors duration-500"></div>
            </div>

            <!-- Main Content -->
            <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center space-y-8">
                    <!-- Main Headline with Enhanced Typography -->
                    <div class="space-y-4 mt-16">
                        <div class="space-y-2">
                            <p class="text-2xl font-medium tracking-wide uppercase
                                text-blue-600 dark:text-blue-300
                                transition-colors duration-500">
                                {{ $t('home.greeting') }}</p>
                            <h1 class="text-6xl md:text-8xl font-black leading-tight">
                                <span class="uppercase block transition-colors duration-500
                                    text-gray-800 dark:text-white 
                                    drop-shadow-sm dark:drop-shadow-lg">
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
                        <p class="text-xl md:text-2xl leading-relaxed transition-colors duration-500
                            text-gray-600 dark:text-gray-200 
                            drop-shadow-sm dark:drop-shadow-md">
                            {{ $t('home.tagline') }}
                        </p>
                    </div>

                    <!-- Enhanced CTA Section -->
                    <div class="pt-8">
                        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                            <!-- Primary CTA -->
                            <NuxtLinkLocale to="/showcase"
                                class="group relative px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-700 hover:shadow-xlsp transition-all duration-300 inline-flex items-center">
                                <span class="relative z-10 flex items-center gap-3">
                                    <Icon name="mdi:eye" class="w-6 h-6" />
                                    {{ $t('home.cta.primary') }}
                                </span>
                            </NuxtLinkLocale>

                            <!-- Secondary CTA -->
                            <NuxtLinkLocale to="/contact"
                                class="group relative px-10 py-5 border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-2xl font-bold text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 shadow-lg inline-flex items-center">
                                <span class="flex items-center gap-3">
                                    {{ $t('home.cta.secondary') }}
                                    <Icon name="mdi:chat" class="w-6 h-6 transition-transform duration-300" />
                                </span>
                            </NuxtLinkLocale>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section class="py-20 bg-gray-100/50 dark:bg-gray-800/50">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 class="text-4xl font-bold mb-6">{{ $t('about.title') }}</h2>
                        <p class="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            {{ $t('about.story.intro') }}
                        </p>

                        <!-- CTA to About Page -->
                        <NuxtLinkLocale to="/about"
                            class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
                            {{ $t('home.about.cta') }}
                            <Icon name="mdi:arrow-right" class="w-4 h-4" />
                        </NuxtLinkLocale>
                    </div>

                    <!-- Enhanced Stats -->
                    <div class="grid grid-cols-2 gap-6">
                        <div
                            class="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">5+</div>
                            <div class="text-gray-600 dark:text-gray-300">{{ $t('home.stats.experience') }}</div>
                        </div>
                        <div
                            class="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">10+</div>
                            <div class="text-gray-600 dark:text-gray-300">{{ $t('home.stats.certifications') }}</div>
                        </div>
                        <div
                            class="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">4</div>
                            <div class="text-gray-600 dark:text-gray-300">{{ $t('home.stats.languages') }}</div>
                        </div>
                        <div
                            class="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div class="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">100%</div>
                            <div class="text-gray-600 dark:text-gray-300">{{ $t('home.stats.satisfaction') }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section class="py-20">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold mb-4">{{ $t('home.services.title') }}</h2>
                    <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        {{ $t('home.services.subtitle') }}
                    </p>
                </div>

                <div class="grid md:grid-cols-3 gap-8">
                    <!-- Web Development Service -->
                    <div
                        class="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <div
                            class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Icon name="mdi:code-braces" class="w-8 h-8 text-white" />
                        </div>
                        <h3 class="text-xl font-bold mb-4">{{ $t('home.services.webdev.title') }}</h3>
                        <p class="text-gray-600 dark:text-gray-300 mb-6">
                            {{ $t('home.services.webdev.description') }}
                        </p>
                        <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                            <li>• {{ $t('home.services.webdev.features.spa') }}</li>
                            <li>• {{ $t('home.services.webdev.features.ssr') }}</li>
                            <li>• {{ $t('home.services.webdev.features.pwa') }}</li>
                        </ul>
                    </div>

                    <!-- UI/UX Service -->
                    <div
                        class="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <div
                            class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Icon name="mdi:brush" class="w-8 h-8 text-white" />
                        </div>
                        <h3 class="text-xl font-bold mb-4">{{ $t('home.services.uiux.title') }}</h3>
                        <p class="text-gray-600 dark:text-gray-300 mb-6">
                            {{ $t('home.services.uiux.description') }}
                        </p>
                        <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                            <li>• {{ $t('home.services.uiux.features.responsive') }}</li>
                            <li>• {{ $t('home.services.uiux.features.designSystems') }}</li>
                            <li>• {{ $t('home.services.uiux.features.accessibility') }}</li>
                        </ul>
                    </div>

                    <!-- Consulting Service -->
                    <div
                        class="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <div
                            class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Icon name="mdi:lightbulb" class="w-8 h-8 text-white" />
                        </div>
                        <h3 class="text-xl font-bold mb-4">{{ $t('home.services.consulting.title') }}</h3>
                        <p class="text-gray-600 dark:text-gray-300 mb-6">
                            {{ $t('home.services.consulting.description') }}
                        </p>
                        <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                            <li>• {{ $t('home.services.consulting.features.codeReviews') }}</li>
                            <li>• {{ $t('home.services.consulting.features.performance') }}</li>
                            <li>• {{ $t('home.services.consulting.features.techStack') }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 bg-blue-600 text-white">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-4xl font-bold mb-6">{{ $t('home.bottomCta.title') }}</h2>
                <p class="text-xl mb-8 opacity-90">
                    {{ $t('home.bottomCta.subtitle') }}
                </p>

                <NuxtLinkLocale to="/about"
                    class="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-xl font-semibold hover:bg-gray-200 hover:shadow-lg transition-all duration-300">
                    {{ $t('home.bottomCta.button') }}
                    <Icon name="mdi:rocket" class="w-5 h-5" />
                </NuxtLinkLocale>
            </div>
        </section>
    </main>
</template>

<style scoped>
/* Custom animations for enhanced hero section */
@keyframes float {

    0%,
    100% {
        transform: translateY(0px) rotate(0deg);
    }

    50% {
        transform: translateY(-20px) rotate(5deg);
    }
}

@keyframes float-delayed {

    0%,
    100% {
        transform: translateY(0px) rotate(0deg);
    }

    50% {
        transform: translateY(-15px) rotate(-3deg);
    }
}

@keyframes float-slow {

    0%,
    100% {
        transform: translateY(0px) rotate(0deg);
    }

    50% {
        transform: translateY(-25px) rotate(2deg);
    }
}

@keyframes float-reverse {

    0%,
    100% {
        transform: translateY(-10px) rotate(0deg);
    }

    50% {
        transform: translateY(10px) rotate(-2deg);
    }
}

@keyframes shimmer {
    0% {
        transform: translateX(-100%) skewX(-12deg);
    }

    100% {
        transform: translateX(200%) skewX(-12deg);
    }
}

@keyframes pulse-slow {

    0%,
    100% {
        opacity: 0.3;
        transform: scale(1);
    }

    50% {
        opacity: 0.5;
        transform: scale(1.05);
    }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
    animation: float-delayed 8s ease-in-out infinite;
}

.animate-float-slow {
    animation: float-slow 10s ease-in-out infinite;
}

.animate-float-reverse {
    animation: float-reverse 7s ease-in-out infinite;
}

.animate-shimmer {
    animation: shimmer 3s ease-in-out infinite;
}

.animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
}

/* Grid pattern background */
.bg-grid-pattern {
    background-image:
        linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
}

.dark .bg-grid-pattern {
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
}

/* Enhanced gradient text */
.bg-clip-text {
    -webkit-background-clip: text;
    background-clip: text;
}

/* Smooth transitions for all interactive elements */
* {
    transition-property: transform, opacity, color, background-color, border-color, box-shadow;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
