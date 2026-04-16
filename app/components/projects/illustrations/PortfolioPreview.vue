<script setup lang="ts">
const visible = ref(false)
const fading = ref(false)

const HOLD_DURATION = 3400
const FADEOUT_DURATION = 600
const PAUSE_DURATION = 800

let loopTimer: ReturnType<typeof setTimeout> | null = null

const runCycle = () => {
    fading.value = false
    visible.value = true

    loopTimer = setTimeout(() => {
        fading.value = true
        visible.value = false

        loopTimer = setTimeout(() => {
            loopTimer = setTimeout(runCycle, PAUSE_DURATION)
        }, FADEOUT_DURATION)
    }, 2600 + HOLD_DURATION)
}

onMounted(runCycle)

onUnmounted(() => {
    if (loopTimer) clearTimeout(loopTimer)
})
</script>

<template>
    <FeaturesVisualBrowser url="https://chad.lu" favicon="mdi:code-braces">
        <div
            class="portfolio-preview bg-neutral-50 dark:bg-neutral-900 flex flex-col pointer-events-none select-none overflow-hidden">
            <!-- Navigation Bar -->
            <div
                class="flex items-center justify-between px-5 py-2.5 md:px-6 md:py-3 border-b border-neutral-200 dark:border-neutral-700/60">
                <span class="text-sm md:text-base font-bold text-neutral-800 dark:text-white tracking-tight">CF</span>
                <div class="flex items-center gap-3 md:gap-4">
                    <span
                        class="text-xs font-medium text-neutral-500 dark:text-neutral-400 hidden sm:inline">Home</span>
                    <span
                        class="text-xs font-medium text-neutral-500 dark:text-neutral-400 hidden sm:inline">Showcase</span>
                    <span
                        class="text-xs font-medium text-neutral-500 dark:text-neutral-400 hidden sm:inline">About</span>
                    <span
                        class="text-xs font-medium text-neutral-500 dark:text-neutral-400 hidden sm:inline">Contact</span>
                    <div
                        class="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                        <Icon name="mdi:theme-light-dark" class="w-3 h-3 text-neutral-500 dark:text-neutral-400" />
                    </div>
                </div>
            </div>

            <!-- Hero Content -->
            <div
                :class="['flex-1 px-5 py-6 md:px-6 md:py-8 flex flex-col items-center justify-center text-center gap-3', { 'content-fading': fading }]">
                <!-- Greeting -->
                <p :class="['text-[10px] md:text-xs font-medium tracking-widest uppercase text-neutral-400 dark:text-neutral-500 section section-1', { 'section-visible': visible }]"
                    style="--section-delay: 0.2s">
                    HELLO, I'M
                </p>

                <!-- Name -->
                <h2 :class="['text-lg md:text-xl lg:text-2xl font-bold text-neutral-800 dark:text-white uppercase leading-none section section-2', { 'section-visible': visible }]"
                    style="--section-delay: 0.5s">
                    Chad Feierstein
                </h2>

                <!-- Typing effect mockup -->
                <div :class="['flex items-center gap-1 section section-3', { 'section-visible': visible }]"
                    style="--section-delay: 0.8s">
                    <span class="text-xs md:text-sm font-semibold text-blue-600 dark:text-blue-400">Full-Stack
                        Developer</span>
                    <span class="typing-cursor w-0.5 h-3.5 bg-blue-500 dark:bg-blue-400 rounded-full" />
                </div>

                <!-- Tagline -->
                <p :class="['text-[10px] md:text-xs text-neutral-500 dark:text-neutral-400 max-w-50 md:max-w-65 leading-relaxed section section-4', { 'section-visible': visible }]"
                    style="--section-delay: 1.1s">
                    Building modern web applications with passion and precision.
                </p>

                <!-- CTA Buttons -->
                <div :class="['flex gap-2 pt-1 section section-5', { 'section-visible': visible }]"
                    style="--section-delay: 1.5s">
                    <div class="px-3 py-1.5 bg-blue-600 rounded-lg flex items-center gap-1.5">
                        <Icon name="mdi:eye" class="w-3 h-3 text-white" />
                        <span class="text-[10px] md:text-xs font-bold text-white">Showcase</span>
                    </div>
                    <div
                        class="px-3 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg flex items-center gap-1.5">
                        <span
                            class="text-[10px] md:text-xs font-bold text-neutral-700 dark:text-neutral-200">Contact</span>
                        <Icon name="mdi:chat" class="w-3 h-3 text-neutral-500 dark:text-neutral-400" />
                    </div>
                </div>

                <!-- Decorative dots (representing stars) -->
                <div :class="['flex gap-1.5 pt-2 section section-6', { 'section-visible': visible }]"
                    style="--section-delay: 1.9s">
                    <span class="w-1 h-1 rounded-full bg-blue-400 opacity-40 animate-pulse" />
                    <span class="w-1 h-1 rounded-full bg-blue-300 opacity-30 animate-pulse"
                        style="animation-delay: 0.3s" />
                    <span class="w-1 h-1 rounded-full bg-blue-500 opacity-50 animate-pulse"
                        style="animation-delay: 0.6s" />
                    <span class="w-1 h-1 rounded-full bg-blue-400 opacity-35 animate-pulse"
                        style="animation-delay: 0.9s" />
                    <span class="w-1 h-1 rounded-full bg-blue-300 opacity-25 animate-pulse"
                        style="animation-delay: 1.2s" />
                </div>
            </div>
        </div>
    </FeaturesVisualBrowser>
</template>

<style scoped>
/* Section fade-in animations */
.section {
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    transition-delay: var(--section-delay, 0s);
}

.section-visible {
    opacity: 1;
    transform: translateY(0);
}

/* Fade-out */
.content-fading .section {
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    transition-delay: 0s;
}

/* Typing cursor blink */
.typing-cursor {
    animation: cursor-blink 1s step-end infinite;
}

@keyframes cursor-blink {

    0%,
    50% {
        opacity: 1;
    }

    51%,
    100% {
        opacity: 0;
    }
}
</style>
