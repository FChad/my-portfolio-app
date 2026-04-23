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

// Lazy load the landscape: it's decorative and below-the-fold priority.
const LazyAnimatedLandscape = defineAsyncComponent(() =>
    import('~/components/effects/AnimatedLandscape.vue')
)
</script>

<template>
    <section class="relative min-h-[calc(100dvh-65px)] flex items-center justify-center overflow-hidden">
        <!-- Animated Landscape Background -->
        <div class="absolute inset-0">
            <LazyAnimatedLandscape
                wrapper-class="z-0 opacity-90 dark:opacity-95 transition-opacity" />

            <!-- Readability overlay: slightly stronger at the bottom where
                 the CTA buttons sit, so the hills/trees never fight the text. -->
            <div
                class="absolute inset-0 z-10 bg-linear-to-b from-white/20 via-white/10 to-white/70 dark:from-neutral-900/30 dark:via-neutral-900/20 dark:to-neutral-900/70">
            </div>
        </div>

        <!-- Main Content -->
        <div class="relative z-20 max-w-4xl mx-auto px-4 sm:px-6">
            <div class="text-center flex flex-col gap-4 sm:gap-6 md:gap-8">
                <!-- Greeting + Name -->
                <div>
                    <p
                        class="text-base sm:text-xl md:text-2xl font-medium tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-1 sm:mb-2">
                        {{ $t('home.greeting') }}
                    </p>
                    <h1
                        class="text-4xl sm:text-6xl md:text-7xl font-bold leading-none text-neutral-800 dark:text-white uppercase">
                        Chad Feierstein
                    </h1>
                </div>

                <!-- Typing Effect -->
                <EffectsTypingEffect :texts="texts" :typing-speed="100" :deleting-speed="50" :pause-duration="2000" />

                <!-- Tagline -->
                <p
                    class="max-w-3xl mx-auto text-base sm:text-xl md:text-2xl leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {{ $t('home.tagline') }}
                </p>

                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center">
                    <UiButton variant="primary" size="lg" to="/showcase">
                        <span class="flex items-center gap-3">
                            <Icon name="mdi:eye"
                                class="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:scale-110 transition-transform" />
                            {{ $t('home.cta.primary') }}
                        </span>
                    </UiButton>

                    <UiButton variant="secondary" size="lg" to="/contact">
                        <span class="flex items-center gap-3">
                            {{ $t('home.cta.secondary') }}
                            <Icon name="mdi:chat"
                                class="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:scale-110 transition-transform" />
                        </span>
                    </UiButton>
                </div>
            </div>
        </div>

        <!-- Scroll Down Indicator -->
        <div class="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30">
            <button @click="scrollToAbout"
                class="cursor-pointer text-neutral-400 dark:text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Scroll down">
                <Icon name="mdi:chevron-down" class="w-7 h-7 sm:w-8 sm:h-8" />
            </button>
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