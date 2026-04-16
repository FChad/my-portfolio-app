<script setup lang="ts">
interface Props {
    texts: string[]
    typingSpeed?: number
    deletingSpeed?: number
    pauseDuration?: number
    startDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseDuration: 2000,
    startDelay: 800
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
</script>

<template>
    <div class="h-12 md:h-16 lg:h-20 flex items-center justify-center" role="region" aria-label="Dynamic text display">
        <!-- Creative text with gradient and animated cursor -->
        <div class="flex items-center text-2xl md:text-3xl lg:text-4xl font-bold relative">
            <!-- Solid text matching brand palette -->
            <span
                class="text-blue-600 dark:text-blue-400"
                role="status" aria-live="polite">
                {{ typingText }}
            </span>

            <!-- Simple blinking cursor -->
            <span class="w-0.5 h-8 md:h-10 lg:h-12 ml-1 inline-block rounded-full"
                :class="isActive ? 'bg-blue-600 dark:bg-blue-400 animate-typing-cursor-blink' : 'bg-transparent'"
                aria-hidden="true">
            </span>
        </div>
    </div>
</template>

<style scoped>
/* Simple blinking cursor */
@keyframes typing-cursor-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

.animate-typing-cursor-blink {
    animation: typing-cursor-blink 1s step-start infinite;
}
</style>
