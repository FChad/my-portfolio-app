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
    default: 'bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md border border-neutral-300 dark:border-neutral-700/60 hover:border-accent/50 hover:-translate-y-1 transition-[transform,border-color] duration-300',
    blue: 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800',
    muted: 'bg-neutral-50/60 dark:bg-neutral-900/40 backdrop-blur-sm border border-neutral-300/80 dark:border-neutral-700/50',
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
