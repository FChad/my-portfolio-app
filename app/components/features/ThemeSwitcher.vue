<template>
    <button @click="toggleColorMode"
        class="cursor-pointer flex items-center p-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
        :aria-label="buttonLabel" :disabled="!isReady">
        <!-- Skeleton Loading State -->
        <div v-if="!isReady" class="w-5 h-5 bg-neutral-300 dark:bg-neutral-700 rounded animate-pulse" />

        <!-- Theme Icon -->
        <Icon v-else :name="currentIcon" class="w-5 h-5" />
    </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isReady = ref(false)

// Use process.client to ensure we're on client side
onMounted(() => {
    // Small delay to ensure color mode is properly initialized
    setTimeout(() => {
        isReady.value = true
    }, 50)
})

// Get current effective theme (what's actually displayed)
const currentTheme = computed(() => {
    if (!isReady.value) {
        // During SSR or before ready, assume light mode
        return 'light'
    }
    return colorMode.value as 'light' | 'dark'
})

// Get current preference, treating system/null as system
const currentPreference = computed(() => {
    if (!isReady.value) return 'light'
    const pref = colorMode.preference
    return (pref === 'light' || pref === 'dark') ? pref : 'system'
})

// Simple toggle between light and dark only
const toggleColorMode = () => {
    if (!isReady.value) return

    // Get current actual theme (what's displayed) rather than preference
    const currentActualTheme = currentTheme.value

    // Always toggle based on what's actually displayed
    colorMode.preference = (currentActualTheme === 'dark') ? 'light' : 'dark'
}

// Icon shows what mode we'll switch TO (opposite of current theme)
const currentIcon = computed(() => {
    if (!isReady.value) {
        // During SSR, show moon icon (assumes light mode by default)
        return 'mdi:weather-night'
    }
    return currentTheme.value === 'light' ? 'mdi:weather-night' : 'mdi:white-balance-sunny'
})

// Generate descriptive button label
const buttonLabel = computed(() => {
    if (!isReady.value) return 'Loading theme toggle'

    const preference = currentPreference.value
    const theme = currentTheme.value

    if (preference === 'system') {
        return `Auto mode (currently ${theme}). Click to switch to ${theme === 'dark' ? 'light' : 'dark'} mode.`
    }

    return `Currently in ${preference} mode. Switch to ${preference === 'dark' ? 'light' : 'dark'} mode.`
})
</script>
