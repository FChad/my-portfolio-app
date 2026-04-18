<script setup lang="ts">
const { visible, fading } = useAnimationCycle()
</script>

<template>
    <FeaturesVisualBrowser url="https://ai.chad.lu" favicon="mdi:robot-excited">
        <div class="chat-illustration bg-neutral-50 dark:bg-neutral-900 flex flex-col pointer-events-none select-none">
            <!-- Chat Header -->
            <div
                class="flex items-center justify-between px-5 py-3 md:px-6 md:py-3.5 border-b border-neutral-200 dark:border-neutral-700/60">
                <span class="text-sm md:text-base font-bold text-neutral-800 dark:text-white">AskChadAI</span>
                <div class="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-1.5">
                    <Icon name="mdi:creation" class="w-4.5 h-4.5 text-blue-500" />
                    <span class="text-sm font-semibold text-neutral-800 dark:text-white">Llama 3.3 70B</span>
                    <Icon name="mdi:chevron-down" class="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                </div>
            </div>

            <!-- Messages Area -->
            <div :class="['flex-1 flex flex-col px-4 py-5 md:px-6 md:py-6 gap-5 md:gap-6', { 'msgs-fading': fading }]">
                <!-- User Message 1 -->
                <div :class="['flex items-end gap-2.5 msg msg-left', { 'msg-visible': visible }]"
                    style="--msg-delay: 0.3s">
                    <div
                        class="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center shrink-0 shadow-sm">
                        <Icon name="mdi:account" class="w-4.5 h-4.5 text-neutral-500 dark:text-neutral-400" />
                    </div>
                    <div
                        class="bg-blue-500/10 dark:bg-blue-500/15 border border-blue-200/60 dark:border-blue-500/20 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[75%]">
                        <p class="text-neutral-800 dark:text-neutral-100 text-sm md:text-base leading-relaxed">What is
                            Vue.js?</p>
                    </div>
                </div>

                <!-- AI Response 1 -->
                <div :class="['flex items-end gap-2.5 justify-end msg msg-right', { 'msg-visible': visible }]"
                    style="--msg-delay: 0.9s">
                    <div
                        class="bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-600/40 rounded-2xl rounded-br-md px-4 py-2.5 shadow-sm max-w-[80%]">
                        <p class="text-neutral-700 dark:text-neutral-200 text-sm md:text-base leading-relaxed">
                            Vue.js is a <span class="font-semibold text-blue-600 dark:text-blue-400">progressive
                                framework</span> for building user interfaces. 🚀
                        </p>
                    </div>
                    <div
                        class="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                        <Icon name="mdi:robot" class="w-4.5 h-4.5 text-white" />
                    </div>
                </div>

                <!-- User Message 2 -->
                <div :class="['flex items-end gap-2.5 msg msg-left', { 'msg-visible': visible }]"
                    style="--msg-delay: 1.5s">
                    <div
                        class="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center shrink-0 shadow-sm">
                        <Icon name="mdi:account" class="w-4.5 h-4.5 text-neutral-500 dark:text-neutral-400" />
                    </div>
                    <div
                        class="bg-blue-500/10 dark:bg-blue-500/15 border border-blue-200/60 dark:border-blue-500/20 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[75%]">
                        <p class="text-neutral-800 dark:text-neutral-100 text-sm md:text-base leading-relaxed">What is
                            Nuxt?</p>
                    </div>
                </div>

                <!-- AI Response 2 with typing indicator -->
                <div :class="['flex items-end gap-2.5 justify-end msg msg-right', { 'msg-visible': visible }]"
                    style="--msg-delay: 2.1s">
                    <div
                        class="bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-600/40 rounded-2xl rounded-br-md px-4 py-2.5 shadow-sm max-w-[80%]">
                        <p class="text-neutral-700 dark:text-neutral-200 text-sm md:text-base leading-relaxed">
                            Nuxt is a <span class="font-semibold text-blue-600 dark:text-blue-400">full-stack
                                framework</span> built on top of Vue.js
                        </p>
                        <div class="mt-2 flex gap-1.5 items-center">
                            <span class="typing-dot w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500" />
                            <span class="typing-dot w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500"
                                style="animation-delay: 0.15s" />
                            <span class="typing-dot w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500"
                                style="animation-delay: 0.3s" />
                        </div>
                    </div>
                    <div
                        class="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                        <Icon name="mdi:robot" class="w-4.5 h-4.5 text-white" />
                    </div>
                </div>
            </div>
        </div>
    </FeaturesVisualBrowser>
</template>

<style scoped>
/* Staggered message entrance animations */
.msg {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
        transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: var(--msg-delay, 0s);
}

.msg-left {
    transform: translateX(-12px) translateY(8px);
}

.msg-right {
    transform: translateX(12px) translateY(8px);
}

.msg-visible {
    opacity: 1;
    transform: translateX(0) translateY(0);
}

/* Uniform fade-out: remove stagger delay */
.msgs-fading .msg {
    transition-delay: 0s;
}

/* Typing dots animation */
.typing-dot {
    animation: typing-pulse 1.2s ease-in-out infinite;
}

@keyframes typing-pulse {

    0%,
    60%,
    100% {
        opacity: 0.3;
        transform: scale(0.85);
    }

    30% {
        opacity: 1;
        transform: scale(1.15);
    }
}
</style>
