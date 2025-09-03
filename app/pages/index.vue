<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Mobile menu state
const mobileMenuOpen = ref(false)

// Typing effect
const typingText = ref('')
const { t } = useI18n()

// Get translated texts dynamically
const texts = computed(() => [
    t('home.roles.fullstack'),
    t('home.roles.vue'),
    t('home.roles.uiux'),
    t('home.roles.solver'),
    t('home.roles.creator')
])

// Services configuration with icons and gradients
const services = computed(() => [
    {
        key: 'webdev',
        icon: 'heroicons:code-bracket',
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        key: 'uiux',
        icon: 'heroicons:paint-brush',
        gradient: 'from-purple-500 to-pink-500'
    },
    {
        key: 'consulting',
        icon: 'heroicons:light-bulb',
        gradient: 'from-green-500 to-emerald-500'
    }
])

let currentTextIndex = 0
let currentCharIndex = 0
let isDeleting = false
let typingInterval: ReturnType<typeof setInterval>

const typeText = () => {
    const currentText = texts.value[currentTextIndex]

    if (!currentText) return

    if (!isDeleting) {
        // Typing forward
        if (currentCharIndex <= currentText.length) {
            typingText.value = currentText.slice(0, currentCharIndex)
            currentCharIndex++

            // When word is complete, pause before deleting
            if (currentCharIndex > currentText.length) {
                clearInterval(typingInterval)
                setTimeout(() => {
                    isDeleting = true
                    // Start deleting with faster interval
                    typingInterval = setInterval(typeText, 50)
                }, 2000)
                return
            }
        }
    } else {
        // Deleting backward
        if (currentCharIndex >= 0) {
            typingText.value = currentText.slice(0, currentCharIndex)
            currentCharIndex--

            // When word is completely deleted
            if (currentCharIndex < 0) {
                isDeleting = false
                currentTextIndex = (currentTextIndex + 1) % texts.value.length
                currentCharIndex = 0 // Reset to start typing from beginning
                clearInterval(typingInterval)

                // Small pause before starting next word
                setTimeout(() => {
                    typingInterval = setInterval(typeText, 100)
                }, 200)
                return
            }
        }
    }
}

onMounted(() => {
    // Start with typing speed
    typingInterval = setInterval(typeText, 100)
})

onUnmounted(() => {
    if (typingInterval) {
        clearInterval(typingInterval)
    }
})
</script>

<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <NuxtRouteAnnouncer />

        <!-- Header -->
        <header
            class="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <!-- Logo/Name -->
                    <div class="flex items-center">
                        <NuxtLinkLocale to="/"
                            class="logo-gradient text-xl font-bold uppercase bg-gradient-to-r from-rose-500 via-violet-600 to-indigo-600 dark:from-rose-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                            Feierstein Chad
                        </NuxtLinkLocale>
                    </div>

                    <!-- Navigation Links -->
                    <nav class="hidden md:flex items-center space-x-8">
                        <NuxtLinkLocale to="/"
                            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors relative group router-link-active">
                            Home
                            <span
                                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
                        </NuxtLinkLocale>
                        <NuxtLinkLocale to="/blog"
                            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors relative group">
                            Blog
                            <span
                                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
                        </NuxtLinkLocale>
                    </nav>

                    <!-- Right Side Controls -->
                    <div class="flex items-center gap-4">
                        <!-- Mobile Menu Button -->
                        <button @click="mobileMenuOpen = !mobileMenuOpen"
                            class="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <Icon v-if="!mobileMenuOpen" name="heroicons:bars-3" class="w-6 h-6" />
                            <Icon v-else name="heroicons:x-mark" class="w-6 h-6" />
                        </button>

                        <!-- Desktop Controls -->
                        <div class="hidden md:flex items-center gap-3">
                            <LanguageSwitcher />
                            <ThemeSwitcher />
                        </div>
                    </div>
                </div>

                <!-- Mobile Navigation Menu -->
                <div v-show="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                    <div class="flex flex-col space-y-3">
                        <NuxtLink to="/" @click="mobileMenuOpen = false"
                            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors px-3 py-2">
                            Home
                        </NuxtLink>
                        <NuxtLink to="/blog" @click="mobileMenuOpen = false"
                            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors px-3 py-2">
                            Blog
                        </NuxtLink>
                        <div
                            class="flex items-center justify-center gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <LanguageSwitcher />
                            <ThemeSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="overflow-hidden">
            <!-- Hero Section -->
            <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
                <!-- Advanced Animated Background -->
                <div class="absolute inset-0">
                    <!-- Gradient Mesh Background -->
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                    </div>

                    <!-- Floating Geometric Shapes -->
                    <div
                        class="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-float">
                    </div>
                    <div
                        class="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float-delayed">
                    </div>
                    <div
                        class="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-15 animate-float-slow">
                    </div>
                    <div
                        class="absolute bottom-20 right-32 w-28 h-28 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-20 animate-float-reverse">
                    </div>

                    <!-- Grid Pattern -->
                    <div class="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

                    <!-- Blur Orbs -->
                    <div
                        class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow">
                    </div>
                    <div
                        class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000">
                    </div>
                </div>

                <!-- Main Content -->
                <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center space-y-8">
                        <!-- Main Headline with Enhanced Typography -->
                        <div class="space-y-4 mt-16">
                            <div class="space-y-2">
                                <p class="text-lg font-medium text-gray-600 dark:text-gray-400 tracking-wide uppercase">
                                    {{ $t('home.greeting') }}</p>
                                <h1 class="text-6xl md:text-8xl font-black leading-tight">
                                    <span
                                        class="block bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                        Chad
                                    </span>
                                    <span
                                        class="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
                                        Feierstein
                                    </span>
                                </h1>
                            </div>

                            <!-- Enhanced Typing Effect -->
                            <div class="h-16 flex items-center justify-center">
                                <div
                                    class="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <span
                                        class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{{
                                            typingText }}</span>
                                    <span class="w-1 h-8 bg-blue-600 animate-pulse rounded"></span>
                                </div>
                            </div>
                        </div>

                        <!-- Value Proposition -->
                        <div class="max-w-3xl mx-auto">
                            <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                {{ $t('home.tagline') }}
                            </p>
                        </div>

                        <!-- Enhanced CTA Section -->
                        <div class="pt-8">
                            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                                <!-- Primary CTA -->
                                <button
                                    class="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                                    <span class="relative z-10 flex items-center gap-3">
                                        <Icon name="heroicons:eye" class="w-6 h-6" />
                                        {{ $t('home.cta.primary') }}
                                    </span>
                                    <div
                                        class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    </div>
                                    <!-- Ripple Effect -->
                                    <div
                                        class="absolute inset-0 bg-white/20 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-500">
                                    </div>
                                </button>

                                <!-- Secondary CTA -->
                                <button
                                    class="group relative px-10 py-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-bold text-lg hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transform hover:-translate-y-2 transition-all duration-500 shadow-xl">
                                    <span class="flex items-center gap-3">
                                        {{ $t('home.cta.secondary') }}
                                        <Icon name="heroicons:chat-bubble-left-right"
                                            class="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- About Section -->
            <section class="py-20 bg-gray-50/50 dark:bg-gray-800/50">
                <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 class="text-4xl font-bold mb-6">{{ $t('about.title') }}</h2>
                            <p class="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                {{ $t('about.intro') }}
                            </p>
                            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                {{ $t('about.focus') }}
                            </p>

                            <!-- Skills Pills -->
                            <div class="flex flex-wrap gap-3">
                                <span
                                    class="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">Vue.js</span>
                                <span
                                    class="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">Nuxt.js</span>
                                <span
                                    class="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">TypeScript</span>
                                <span
                                    class="px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 rounded-full text-sm font-medium">Tailwind
                                    CSS</span>
                                <span
                                    class="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-sm font-medium">Node.js</span>
                            </div>
                        </div>

                        <!-- Interactive Stats -->
                        <div class="grid grid-cols-2 gap-6">
                            <div
                                class="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">3+</div>
                                <div class="text-gray-600 dark:text-gray-300">{{ $t('home.stats.experience') }}</div>
                            </div>
                            <div
                                class="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">50+</div>
                                <div class="text-gray-600 dark:text-gray-300">{{ $t('home.stats.projects') }}</div>
                            </div>
                            <div
                                class="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
                                <div class="text-gray-600 dark:text-gray-300">Verfügbar</div>
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
                        <h2 class="text-4xl font-bold mb-4">{{ $t('services.title') }}</h2>
                        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            {{ $t('services.subtitle') }}
                        </p>
                    </div>

                    <div class="grid md:grid-cols-3 gap-8">
                        <!-- Dynamic Services Loop -->
                        <div v-for="service in services" :key="service.key"
                            class="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                            <div
                                :class="`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`">
                                <Icon :name="service.icon" class="w-8 h-8 text-white" />
                            </div>
                            <h3 class="text-xl font-bold mb-4">{{ $t(`services.${service.key}.title`) }}</h3>
                            <p class="text-gray-600 dark:text-gray-300 mb-6">
                                {{ $t(`services.${service.key}.description`) }}
                            </p>
                            <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                                <template v-if="service.key === 'webdev'">
                                    <li>• {{ $t('services.webdev.features.spa') }}</li>
                                    <li>• {{ $t('services.webdev.features.ssr') }}</li>
                                    <li>• {{ $t('services.webdev.features.pwa') }}</li>
                                </template>
                                <template v-else-if="service.key === 'uiux'">
                                    <li>• {{ $t('services.uiux.features.responsive') }}</li>
                                    <li>• {{ $t('services.uiux.features.designSystems') }}</li>
                                    <li>• {{ $t('services.uiux.features.accessibility') }}</li>
                                </template>
                                <template v-else-if="service.key === 'consulting'">
                                    <li>• {{ $t('services.consulting.features.codeReviews') }}</li>
                                    <li>• {{ $t('services.consulting.features.performance') }}</li>
                                    <li>• {{ $t('services.consulting.features.techStack') }}</li>
                                </template>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA Section -->
            <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 class="text-4xl font-bold mb-6">{{ $t('cta.title') }}</h2>
                    <p class="text-xl mb-8 opacity-90">
                        {{ $t('cta.subtitle') }}
                    </p>
                    <button
                        class="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
                        {{ $t('cta.button') }}
                        <Icon name="heroicons:rocket-launch" class="inline-block ml-2 w-5 h-5" />
                    </button>
                </div>
            </section>
        </main>

        <!-- Footer -->
        <footer class="border-t border-gray-200 dark:border-gray-700 mt-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <p class="text-center text-gray-600 dark:text-gray-300">
                    {{ $t('footer.copyright') }}
                </p>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.router-link-active:not(.logo-gradient) {
    color: rgb(37 99 235);
}

.dark .router-link-active:not(.logo-gradient) {
    color: rgb(96 165 250);
}

.router-link-active span {
    width: 100%;
}

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
