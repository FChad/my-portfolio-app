<script setup lang="ts">
const { variant = 'neutral', size = 'md' } = defineProps<{
    variant?: 'neutral' | 'blue' | 'green'
    size?: 'sm' | 'md'
}>()

const variantClass = computed(() => {
    switch (variant) {
        case 'neutral':
            return 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700/50 dark:text-neutral-400'
        case 'blue':
            return 'bg-blue-200 text-accent dark:bg-blue-900/40'
        case 'green':
            return 'bg-green-200 text-green-700 dark:bg-green-900/40 dark:text-green-300'
        default:
            return ''
    }
})

const sizeClass = computed(() => {
    switch (size) {
        case 'sm': return 'px-2 py-0.5 text-xs'
        case 'md': return 'px-2.5 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm'
        default: return ''
    }
})
</script>

<template>
    <span :class="['inline-flex items-center gap-1 rounded-md font-medium', variantClass, sizeClass]">
        <slot />
    </span>
</template>
