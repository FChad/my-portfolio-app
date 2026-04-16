<script setup lang="ts">
interface Props {
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    to?: string
    href?: string
    external?: boolean
    disabled?: boolean
    type?: 'button' | 'submit'
    active?: boolean
    square?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    type: 'button',
})

const variantClasses = {
    primary: {
        enabled: 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 dark:bg-blue-600 dark:border-blue-500 dark:hover:bg-blue-500',
        disabled: 'bg-neutral-100 text-neutral-400 border border-neutral-200 dark:bg-neutral-800/60 dark:text-neutral-600 dark:border-neutral-700',
    },
    secondary: {
        enabled: 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 dark:hover:bg-neutral-800',
        active: 'bg-neutral-100 text-neutral-800 border border-neutral-300 dark:bg-neutral-800 dark:text-white dark:border-neutral-600',
        disabled: 'bg-neutral-50 text-neutral-300 border border-neutral-200 dark:bg-neutral-900/60 dark:text-neutral-700 dark:border-neutral-800',
    },
    danger: {
        enabled: 'bg-red-600 hover:bg-red-700 text-white border border-red-700 dark:bg-red-600 dark:border-red-500 dark:hover:bg-red-500',
        disabled: 'bg-neutral-100 text-neutral-400 border border-neutral-200 dark:bg-neutral-800/60 dark:text-neutral-600 dark:border-neutral-700',
    },
}

const variantClass = computed(() => {
    if (props.variant === 'primary') {
        return props.disabled ? variantClasses.primary.disabled : variantClasses.primary.enabled
    }
    if (props.variant === 'danger') {
        return props.disabled ? variantClasses.danger.disabled : variantClasses.danger.enabled
    }
    if (props.disabled) return variantClasses.secondary.disabled
    return props.active ? variantClasses.secondary.active : variantClasses.secondary.enabled
})

const sizeClasses = {
    xs: 'px-3 py-2 text-sm rounded-lg',
    sm: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl',
    md: 'px-5 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base rounded-lg sm:rounded-xl',
    lg: 'px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg rounded-lg sm:rounded-xl',
}

const sizeClass = computed(() => props.square ? '' : (sizeClasses[props.size] ?? ''))

const baseClass = computed(() => {
    const c: string[] = ['group/btn', 'transition-all', 'duration-300', 'inline-flex', 'items-center', 'justify-center']
    c.push(props.disabled ? 'cursor-not-allowed' : 'cursor-pointer')

    if (props.square) {
        c.push('font-medium', 'p-2', 'rounded-lg')
    } else {
        c.push('font-bold')
        if (!props.disabled) {
            if (props.size !== 'xs') c.push('shadow-xs', 'hover:shadow-sm')
        }
    }

    return c.join(' ')
})
</script>

<template>
    <NuxtLinkLocale v-if="to" :to="to" :class="[baseClass, variantClass, sizeClass]">
        <slot />
    </NuxtLinkLocale>
    <NuxtLink v-else-if="href" :to="href" external :target="external ? '_blank' : undefined"
        :rel="external ? 'noopener noreferrer' : undefined" :class="[baseClass, variantClass, sizeClass]">
        <slot />
    </NuxtLink>
    <button v-else :type="type" :disabled="disabled" :class="[baseClass, variantClass, sizeClass]">
        <slot />
    </button>
</template>
