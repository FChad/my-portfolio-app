<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'

interface Props {
    texts: string[]
    typingSpeed?: number
    deletingSpeed?: number
    pauseDuration?: number
    startDelay?: number
    terminalUser?: string
    terminalHost?: string
    command?: string
}

const props = withDefaults(defineProps<Props>(), {
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseDuration: 2000,
    startDelay: 800,
    terminalUser: 'chad',
    terminalHost: 'portfolio',
    command: 'echo'
})

// Reactive state
const typingText = ref('')
const isActive = ref(false)

// Animation state (using more performant approach)
let animationId: number | null = null
let startDelayTimer: ReturnType<typeof setTimeout> | null = null
let lastTime = 0
let currentTextIndex = 0
let currentCharIndex = 0
let isDeleting = false
let pauseUntil = 0

// Optimized animation using requestAnimationFrame
const animate = (currentTime: number): void => {
    if (!isActive.value || !props.texts || props.texts.length === 0) return

    // Handle pause periods
    if (currentTime < pauseUntil) {
        animationId = requestAnimationFrame(animate)
        return
    }

    // Throttle animation based on typing/deleting speed
    const speed = isDeleting ? props.deletingSpeed : props.typingSpeed
    if (currentTime - lastTime < speed) {
        animationId = requestAnimationFrame(animate)
        return
    }

    lastTime = currentTime
    const currentText = props.texts[currentTextIndex] || ''

    if (!isDeleting) {
        // Typing forward
        if (currentCharIndex <= currentText.length) {
            typingText.value = currentText.slice(0, currentCharIndex)
            currentCharIndex++

            // When word is complete, pause before deleting
            if (currentCharIndex > currentText.length) {
                pauseUntil = currentTime + props.pauseDuration
                isDeleting = true
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
                currentTextIndex = (currentTextIndex + 1) % props.texts.length
                currentCharIndex = 0
                pauseUntil = currentTime + 200 // Small pause before next word
            }
        }
    }

    // Continue animation
    if (isActive.value) {
        animationId = requestAnimationFrame(animate)
    }
}

const startTyping = (): void => {
    // Stop any existing animation
    stopTyping()

    // Reset state
    currentTextIndex = 0
    currentCharIndex = 0
    isDeleting = false
    typingText.value = ''
    pauseUntil = 0
    lastTime = 0
    isActive.value = true

    // Delay before starting the animation
    startDelayTimer = setTimeout(() => {
        nextTick(() => {
            if (isActive.value) {
                animationId = requestAnimationFrame(animate)
            }
        })
    }, props.startDelay)
}

const stopTyping = (): void => {
    isActive.value = false
    if (startDelayTimer !== null) {
        clearTimeout(startDelayTimer)
        startDelayTimer = null
    }
    if (animationId !== null) {
        cancelAnimationFrame(animationId)
        animationId = null
    }
}

// Watch for changes in texts prop to restart animation
watch(() => props.texts, (newTexts) => {
    if (newTexts && newTexts.length > 0) {
        startTyping()
    }
}, { immediate: false, deep: true })

onMounted(() => {
    if (props.texts && props.texts.length > 0) {
        startTyping()
    }
})

onUnmounted(() => {
    stopTyping()
})

const terminalPrompt = computed(() => `${props.terminalUser}@${props.terminalHost}:~$`)
</script>

<template>
    <div class="h-12 md:h-16 lg:h-20 flex items-center justify-center" role="region" aria-label="Dynamic text display">
        <!-- Creative text with gradient and animated cursor -->
        <div class="flex items-center text-2xl md:text-3xl lg:text-4xl font-bold relative">
            <!-- Gradient text with subtle glow -->
            <span
                class="bg-linear-to-r from-sky-500 via-blue-600 to-blue-700 dark:from-sky-300 dark:via-blue-400 dark:to-blue-400 bg-clip-text text-transparent animate-gradient-shift"
                role="status" aria-live="polite" style="background-size: 200% 200%;">
                {{ typingText }}
            </span>

            <!-- Animated cursor with glow effect -->
            <span class="w-1 h-8 md:h-10 lg:h-12 ml-1 inline-block rounded-sm relative"
                :class="isActive ? 'bg-linear-to-b from-sky-400 to-blue-600 dark:from-sky-300 dark:to-blue-500 animate-typing-cursor-pulse' : 'bg-transparent'"
                aria-hidden="true">
                <!-- Glow effect behind cursor -->
                <span v-if="isActive"
                    class="absolute inset-0 bg-linear-to-b from-sky-400 to-blue-600 dark:from-sky-300 dark:to-blue-500 blur-sm animate-cursor-glow"></span>
            </span>
        </div>
    </div>
</template>

<style scoped>
/* Gradient animation for text */
@keyframes gradient-shift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.animate-gradient-shift {
    animation: gradient-shift 8s ease infinite;
}

/* Enhanced cursor animation with pulsing effect */
@keyframes typing-cursor-pulse {

    0%,
    100% {
        opacity: 1;
        transform: scaleY(1);
    }

    50% {
        opacity: 0.3;
        transform: scaleY(0.95);
    }
}

.animate-typing-cursor-pulse {
    animation: typing-cursor-pulse 1.2s ease-in-out infinite;
}

/* Glow animation for cursor */
@keyframes cursor-glow {

    0%,
    100% {
        opacity: 0.5;
        transform: scale(1);
    }

    50% {
        opacity: 0.8;
        transform: scale(1.2);
    }
}

.animate-cursor-glow {
    animation: cursor-glow 1.2s ease-in-out infinite;
}
</style>
