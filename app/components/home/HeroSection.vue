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
</script>

<template>
    <section class="relative min-h-[calc(100dvh-65px)] flex items-center justify-center overflow-hidden">
        <!-- Animated mesh-gradient background (hero only) -->
        <div aria-hidden="true" class="absolute inset-0 pointer-events-none">
            <div class="mesh-blob mesh-blob-1"></div>
            <div class="mesh-blob mesh-blob-2"></div>
            <div class="mesh-blob mesh-blob-3"></div>
            <div class="mesh-blob mesh-blob-4"></div>
            <div class="absolute inset-0 mix-blend-overlay opacity-[0.035] dark:opacity-[0.06]
                        bg-[image:var(--grain-bg)]"></div>
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
                        class="text-4xl sm:text-6xl md:text-7xl font-display font-bold leading-none uppercase text-brand">
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
                class="cursor-pointer text-neutral-400 dark:text-neutral-500 hover:text-accent transition-colors"
                aria-label="Scroll down">
                <Icon name="mdi:chevron-down" class="w-7 h-7 sm:w-8 sm:h-8" />
            </button>
        </div>
    </section>
</template>

<style scoped>
.mesh-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    will-change: transform;
}

.mesh-blob-1 {
    top: -20%;
    left: -10%;
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, var(--mesh-color-1), transparent 70%);
    animation: drift-1 22s ease-in-out infinite alternate;
}

.mesh-blob-2 {
    top: 5%;
    right: -15%;
    width: 55vw;
    height: 55vw;
    background: radial-gradient(circle, var(--mesh-color-2), transparent 70%);
    animation: drift-2 28s ease-in-out infinite alternate;
}

.mesh-blob-3 {
    bottom: -25%;
    left: 15%;
    width: 65vw;
    height: 65vw;
    background: radial-gradient(circle, var(--mesh-color-3), transparent 70%);
    animation: drift-3 32s ease-in-out infinite alternate;
}

.mesh-blob-4 {
    bottom: 5%;
    right: 0%;
    width: 50vw;
    height: 50vw;
    background: radial-gradient(circle, var(--mesh-color-4), transparent 70%);
    animation: drift-4 26s ease-in-out infinite alternate;
}

@keyframes drift-1 {
    0% { transform: translate3d(0, 0, 0) scale(1); }
    100% { transform: translate3d(8%, 6%, 0) scale(1.15); }
}
@keyframes drift-2 {
    0% { transform: translate3d(0, 0, 0) scale(1); }
    100% { transform: translate3d(-6%, 9%, 0) scale(1.1); }
}
@keyframes drift-3 {
    0% { transform: translate3d(0, 0, 0) scale(1); }
    100% { transform: translate3d(5%, -7%, 0) scale(1.2); }
}
@keyframes drift-4 {
    0% { transform: translate3d(0, 0, 0) scale(1); }
    100% { transform: translate3d(-9%, -5%, 0) scale(1.15); }
}

@media (prefers-reduced-motion: reduce) {
    .mesh-blob {
        animation: none;
    }
}
</style>
