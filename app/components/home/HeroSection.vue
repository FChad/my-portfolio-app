<script setup lang="ts">
const { t } = useI18n()

const texts = computed(() => [
    t('home.roles.fullstack'),
    t('home.roles.serveradmin'),
    t('home.roles.solver')
])

const scrollToAbout = () => {
    document.querySelector('#about-section')?.scrollIntoView({ behavior: 'smooth' })
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
            <!-- Animated Stars Canvas (Lazy Loaded) -->
            <LazyAnimatedStars :particle-count="50" :flare-count="10" :motion="0.03" :link-chance="25"
                canvas-class="z-0 opacity-85 dark:opacity-80 transition-opacity" />

            <!-- Adaptive overlay for text readability -->
            <div
                class="absolute inset-0 z-10 bg-linear-to-b from-transparent via-transparent to-white/40 dark:from-transparent dark:via-transparent dark:to-neutral-900/20">
            </div>
        </div>

        <!-- Main Content -->
        <div class="relative z-20 max-w-4xl mx-auto px-4 sm:px-6">
            <div class="text-center space-y-6 sm:space-y-10">
                <!-- Greeting + Name -->
                <div>
                    <p class="text-base sm:text-xl md:text-2xl font-medium tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-1 sm:mb-2">
                        {{ $t('home.greeting') }}
                    </p>
                    <h1 class="text-4xl sm:text-6xl md:text-7xl font-black leading-none text-neutral-800 dark:text-white uppercase">
                        Chad Feierstein
                    </h1>
                </div>

                <!-- Typing Effect -->
                <EffectsTypingEffect :texts="texts" :typing-speed="100" :deleting-speed="50"
                    :pause-duration="2000" />

                <!-- Tagline -->
                <p class="max-w-3xl mx-auto text-base sm:text-xl md:text-2xl leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {{ $t('home.tagline') }}
                </p>

                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center">
                    <NuxtLinkLocale to="/showcase"
                        class="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center hover:-translate-y-1">
                        <span class="flex items-center gap-3">
                            <Icon name="mdi:eye"
                                class="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                            {{ $t('home.cta.primary') }}
                        </span>
                    </NuxtLinkLocale>

                    <NuxtLinkLocale to="/contact"
                        class="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center hover:-translate-y-1">
                        <span class="flex items-center gap-3">
                            {{ $t('home.cta.secondary') }}
                            <Icon name="mdi:chat"
                                class="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                        </span>
                    </NuxtLinkLocale>
                </div>
            </div>
        </div>

        <!-- Scroll Down Indicator -->
        <div class="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30">
            <div class="flex flex-col items-center animate-bounce">
                <div class="relative flex justify-center items-center w-10 h-10 sm:w-12.5 sm:h-12.5 
                            border-2 border-blue-500/30 dark:border-blue-400/40 
                            rounded-full bg-white/10 dark:bg-neutral-900/20 
                            backdrop-blur-[10px] cursor-pointer
                            hover:-translate-y-0.5 hover:border-blue-500/60 hover:bg-blue-500/10
                            dark:hover:border-blue-400/70 dark:hover:bg-blue-400/10
                            transition-all duration-300 group" @click="scrollToAbout">
                    <Icon name="mdi:chevron-down"
                        class="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors" />
                    <!-- Pulse ring effect -->
                    <span
                        class="absolute inset-0 rounded-full border-2 border-blue-500/50 dark:border-blue-400/50 animate-ping"></span>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
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
