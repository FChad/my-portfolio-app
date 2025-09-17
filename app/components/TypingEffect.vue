<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'

interface Props {
    texts: string[]
    typingSpeed?: number
    deletingSpeed?: number
    pauseDuration?: number
    terminalUser?: string
    terminalHost?: string
    command?: string
}

const props = withDefaults(defineProps<Props>(), {
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseDuration: 2000,
    terminalUser: 'chad',
    terminalHost: 'portfolio',
    command: 'echo'
})

// Reactive state
const typingText = ref('')
const isActive = ref(false)

// Animation state - using more performant approach
let animationId: number | null = null
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

    // Start animation
    nextTick(() => {
        if (isActive.value) {
            animationId = requestAnimationFrame(animate)
        }
    })
}

const stopTyping = (): void => {
    isActive.value = false
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
    <div class="h-32 flex items-center justify-center" role="region" aria-label="Dynamic text display">
        <div
            class="bg-white/80 dark:bg-gray-800/80 border border-gray-300/80 dark:border-gray-700/80 rounded-lg p-4 shadow-md font-mono text-left max-w-2xl w-full backdrop-blur-sm transition-all hover:shadow-lg">
            <!-- Terminal Header -->
            <div class="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200/70 dark:border-gray-700/70">
                <div class="flex gap-2" role="presentation">
                    <div class="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors" title="Close"></div>
                    <div class="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
                        title="Minimize"></div>
                    <div class="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                        title="Maximize"></div>
                </div>
                <span class="text-gray-600 dark:text-gray-400 text-sm ml-4">{{ terminalPrompt }}</span>
            </div>

            <!-- Terminal Content -->
            <div class="text-blue-600 dark:text-green-400 text-lg md:text-xl flex items-center min-h-[1.5rem]">
                <span class="text-gray-700 dark:text-gray-300 mr-2">{{ command }}</span>
                <span class="text-orange-600 dark:text-orange-400">"</span>
                <span class="text-blue-600 dark:text-blue-300 font-medium" role="status" aria-live="polite">{{
                    typingText }}</span>
                <span class="w-2 h-5 ml-1 inline-block rounded-sm transition-all "
                    :class="isActive ? 'bg-blue-600 dark:bg-blue-300 animate-typing-cursor' : 'bg-transparent'"
                    aria-hidden="true"></span>
                <span class="text-orange-600 dark:text-orange-400">"</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Custom cursor animation - smooth fade between 100% and 20% */
@keyframes typing-cursor {
    0% {
        opacity: 1;
    }

    25% {
        opacity: 0.2;
    }

    50% {
        opacity: 0.2;
    }

    75% {
        opacity: 1;
    }

    100% {
        opacity: 1;
    }
}

.animate-typing-cursor {
    animation: typing-cursor 2s infinite;
}
</style>
