<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

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

const typingText = ref('')

let currentTextIndex = 0
let currentCharIndex = 0
let isDeleting = false
let typingInterval: ReturnType<typeof setInterval>

const typeText = () => {
  if (!props.texts || props.texts.length === 0) return

  const currentText = props.texts[currentTextIndex]
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
          typingInterval = setInterval(typeText, props.deletingSpeed)
        }, props.pauseDuration)
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
        currentTextIndex = (currentTextIndex + 1) % props.texts.length
        currentCharIndex = 0 // Reset to start typing from beginning
        clearInterval(typingInterval)

        // Small pause before starting next word
        setTimeout(() => {
          typingInterval = setInterval(typeText, props.typingSpeed)
        }, 200)
        return
      }
    }
  }
}

const startTyping = () => {
  if (typingInterval) {
    clearInterval(typingInterval)
  }
  // Reset state
  currentTextIndex = 0
  currentCharIndex = 0
  isDeleting = false
  typingText.value = ''

  // Start with typing speed
  typingInterval = setInterval(typeText, props.typingSpeed)
}

// Watch for changes in texts prop to restart animation
watch(() => props.texts, () => {
  startTyping()
}, { immediate: false })

onMounted(() => {
  startTyping()
})

onUnmounted(() => {
  if (typingInterval) {
    clearInterval(typingInterval)
  }
})

const terminalPrompt = computed(() => `${props.terminalUser}@${props.terminalHost}:~$`)
</script>

<template>
  <div class="h-32 flex items-center justify-center">
    <div
      class="bg-white/80 dark:bg-gray-800/80 border border-gray-300/80 dark:border-gray-700/80 rounded-lg p-4 shadow-xl font-mono text-left max-w-2xl w-full backdrop-blur-sm">
      <!-- Terminal Header -->
      <div class="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200/70 dark:border-gray-700/70">
        <div class="flex gap-2">
          <div class="w-3 h-3 bg-red-500 rounded-full"></div>
          <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div class="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span class="text-gray-600 dark:text-gray-400 text-sm ml-4">{{ terminalPrompt }}</span>
      </div>
      <!-- Terminal Content -->
      <div class="text-blue-600 dark:text-green-400 text-lg md:text-xl flex items-center">
        <span class="text-gray-700 dark:text-gray-300 mr-2">{{ command }}</span>
        <span class="text-orange-600 dark:text-orange-400">"</span>
        <span class="text-blue-600 dark:text-blue-300">{{ typingText }}</span>
        <span class="w-2 h-5 bg-blue-600 dark:bg-blue-300 animate-pulse ml-1 inline-block"></span>
        <span class="text-orange-600 dark:text-orange-400">"</span>
      </div>
    </div>
  </div>
</template>
