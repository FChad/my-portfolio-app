<template>
    <button @click="toggleColorMode"
        class="flex items-center p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        :aria-label="buttonLabel" :disabled="!isReady">
        <!-- Skeleton Loading State -->
        <div v-if="!isReady" class="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />

        <!-- Theme Icon -->
        <Icon v-else :name="currentIcon" class="w-5 h-5" />
    </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isReady = ref(false)

onMounted(() => {
    nextTick(() => {
        isReady.value = true
    })
})

// Get current effective theme (what's actually displayed)
const currentTheme = computed(() => {
    if (!isReady.value) return 'light'
    return colorMode.value as 'light' | 'dark'
})

// Get current preference, treating system/null as system
const currentPreference = computed(() => {
    if (!isReady.value) return 'system'
    const pref = colorMode.preference
    return (pref === 'light' || pref === 'dark') ? pref : 'system'
})

// Simple toggle between light and dark only
const toggleColorMode = () => {
    if (!isReady.value) return

    // If currently system or light, go to dark
    // If currently dark, go to light
    const currentPref = currentPreference.value
    colorMode.preference = (currentPref === 'dark') ? 'light' : 'dark'
}

// Icon always based on current theme (what's displayed)
const currentIcon = computed(() => {
    return currentTheme.value === 'dark' ? 'heroicons:sun' : 'heroicons:moon'
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
