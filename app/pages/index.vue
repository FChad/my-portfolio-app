<script setup lang="ts">
import { computed } from 'vue'

const { t } = useI18n()

// Get translated texts dynamically
const texts = computed(() => [
    t('home.roles.fullstack'),
    t('home.roles.serveradmin'),
    t('home.roles.solver')
])

// Smooth scroll to next section when clicking scroll indicator
const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about-section')
    if (aboutSection) {
        aboutSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }
}
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
                <AnimatedStars :particle-count="50" :flare-count="10" :motion="0.03" :link-chance="25"
                    canvas-class="z-0 opacity-85 dark:opacity-80 transition-opacity duration-500" />

                <!-- Adaptive overlay for text readability -->
                <div class="absolute inset-0 z-10
                    bg-gradient-to-b from-transparent via-transparent to-white/30
                    dark:from-transparent dark:via-transparent dark:to-gray-900/20
                    transition-colors duration-500"></div>
            </div>

            <!-- Main Content -->
            <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-16 lg:pb-10">
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

            <!-- Scroll Down Indicator -->
            <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
                <div class="flex flex-col items-center animate-bounce">
                    <div class="scroll-indicator" @click="scrollToAbout">
                        <Icon name="mdi:chevron-down" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about-section" class="py-20 bg-gray-100/50 dark:bg-gray-800/50">
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

        <!-- Latest Project Section - AI Chat Bot -->
        <section class="py-20">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold mb-4">Mein neuestes Projekt</h2>
                    <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Ein intelligenter KI Chat Bot - Modernste Technologie trifft auf benutzerfreundliches Design
                    </p>
                </div>

                <div class="max-w-4xl mx-auto">
                    <!-- Main Project Card -->
                    <div
                        class="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
                        <!-- Header with Icon and Title -->
                        <div class="relative p-8 bg-blue-500 dark:bg-blue-600 text-white">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-4">
                                    <div
                                        class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                        <Icon name="mdi:robot-excited" class="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 class="text-2xl font-bold">KI Chat Bot</h3>
                                        <p class="text-blue-100 text-lg">Mein letztes Projekt</p>
                                    </div>
                                </div>
                                <div class="hidden sm:block">
                                    <div
                                        class="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                                        <span class="text-sm font-medium">✨ Neu</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="p-8">
                            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                Ein fortschrittlicher KI Chat Bot, der intelligente Gespräche führt und komplexe
                                Anfragen bearbeitet.
                                Mit modernster AI-Technologie und einem eleganten Interface bietet er eine nahtlose
                                Benutzererfahrung.
                            </p>

                            <!-- Features Grid -->
                            <div class="grid md:grid-cols-2 gap-6 mb-8">
                                <div class="flex items-start space-x-3">
                                    <div
                                        class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Icon name="mdi:brain" class="w-5 h-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-800 dark:text-white mb-1">Intelligente KI
                                        </h4>
                                        <p class="text-sm text-gray-600 dark:text-gray-400">Erweiterte
                                            Sprachverarbeitung und Kontextverständnis</p>
                                    </div>
                                </div>

                                <div class="flex items-start space-x-3">
                                    <div
                                        class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Icon name="mdi:chat-processing"
                                            class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-800 dark:text-white mb-1">Echtzeit Chat</h4>
                                        <p class="text-sm text-gray-600 dark:text-gray-400">Sofortige Antworten und
                                            flüssige Konversationen</p>
                                    </div>
                                </div>

                                <div class="flex items-start space-x-3">
                                    <div
                                        class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Icon name="mdi:palette" class="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-800 dark:text-white mb-1">Modernes UI</h4>
                                        <p class="text-sm text-gray-600 dark:text-gray-400">Intuitive Benutzeroberfläche
                                            mit Dark/Light Mode</p>
                                    </div>
                                </div>

                                <div class="flex items-start space-x-3">
                                    <div
                                        class="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Icon name="mdi:shield-check"
                                            class="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-800 dark:text-white mb-1">Sicher & Privat
                                        </h4>
                                        <p class="text-sm text-gray-600 dark:text-gray-400">Datenschutz und sichere
                                            Kommunikation</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Tech Stack -->
                            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <h4
                                    class="text-sm font-semibold text-gray-800 dark:text-white mb-3 uppercase tracking-wide">
                                    Technologien</h4>
                                <div class="flex flex-wrap gap-2">
                                    <span
                                        class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">Vue.js</span>
                                    <span
                                        class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">Node.js</span>
                                    <span
                                        class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">OpenAI
                                        API</span>
                                    <span
                                        class="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-sm font-medium">WebSockets</span>
                                    <span
                                        class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-sm font-medium">TypeScript</span>
                                </div>
                            </div>

                            <!-- CTA Button -->
                            <div class="pt-6">
                                <NuxtLinkLocale to="/showcase"
                                    class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:shadow-lg transition-all duration-300 group">
                                    <Icon name="mdi:eye" class="w-5 h-5" />
                                    Projekt ansehen
                                    <Icon name="mdi:arrow-right"
                                        class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </NuxtLinkLocale>
                            </div>
                        </div>
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
/* Custom Gradient for Hero Background */
.bg-gradient-radial {
    background-image: radial-gradient(ellipse at center, var(--tw-gradient-stops));
}

/* Scroll Indicator Styles */
.scroll-indicator {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border: 2px solid rgba(59, 130, 246, 0.3);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    cursor: pointer;
}

.dark .scroll-indicator {
    border-color: rgba(96, 165, 250, 0.4);
    background: rgba(17, 24, 39, 0.2);
}

.scroll-indicator:hover {
    transform: translateY(-2px);
    border-color: rgba(59, 130, 246, 0.6);
    background: rgba(59, 130, 246, 0.1);
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
}

.dark .scroll-indicator:hover {
    border-color: rgba(96, 165, 250, 0.7);
    background: rgba(96, 165, 250, 0.1);
    box-shadow: 0 4px 15px rgba(96, 165, 250, 0.3);
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
