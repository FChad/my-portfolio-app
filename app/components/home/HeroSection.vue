<script setup lang="ts">
const { t } = useI18n()

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

// Lazy load AnimatedStars for better initial page load performance
const LazyAnimatedStars = defineAsyncComponent(() =>
    import('~/components/effects/AnimatedStars.vue')
)
</script>

<template>
    <section class="relative min-h-[calc(100vh-65px)] flex items-center justify-center overflow-hidden">
        <!-- Animated Stars Background -->
        <div class="absolute inset-0">
            <!-- Subtle Background -->
            <div
                class="absolute inset-0 bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
            </div>

            <!-- Animated Stars Canvas (Lazy Loaded) -->
            <LazyAnimatedStars :particle-count="50" :flare-count="10" :motion="0.03" :link-chance="25"
                canvas-class="z-0 opacity-85 dark:opacity-80 transition-opacity" />

            <!-- Adaptive overlay for text readability -->
            <div
                class="absolute inset-0 z-10 bg-linear-to-b from-transparent via-transparent to-white/40 dark:from-transparent dark:via-transparent dark:to-gray-900/20">
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
                            class="bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
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
                        <EffectsTypingEffect :texts="texts" :typing-speed="100" :deleting-speed="50"
                            :pause-duration="2000" />
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
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-fade-in opacity-0"
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
