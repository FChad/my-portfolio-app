<script setup lang="ts">
const { icon, size = 'md', color = 'bg-neutral-100 dark:bg-neutral-700' } = defineProps<{
    icon?: string
    size?: 'md' | 'lg'
    color?: string
}>()

const sizeMap = {
    md: { box: 'w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg md:rounded-xl', icon: 'w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7' },
    lg: { box: 'w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl', icon: 'w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8' },
}
</script>

<template>
    <div :class="['flex items-center justify-center shrink-0', sizeMap[size].box, color]">
        <Icon v-if="icon" :name="icon" :class="['text-neutral-600 dark:text-white', sizeMap[size].icon]" />
        <slot v-else />
    </div>
</template>
