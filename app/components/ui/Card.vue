<script setup lang="ts">
interface Props {
    size?: 'sm' | 'md' | 'lg'
    variant?: 'default' | 'blue' | 'muted'
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    variant: 'default',
})

const sizeClasses = {
    sm: 'p-3 md:p-4 rounded-lg md:rounded-xl',
    md: 'p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl',
    lg: 'p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl',
}

const variantClasses = {
    default: 'bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700',
    blue: 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800',
    muted: 'bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-600',
}

const baseClass = computed(() => [
    variantClasses[props.variant],
    sizeClasses[props.size],
].join(' '))
</script>

<template>
    <div :class="baseClass">
        <slot />
    </div>
</template>
