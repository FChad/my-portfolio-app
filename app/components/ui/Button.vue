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
        enabled: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-400 dark:text-blue-950 dark:hover:bg-blue-300',
        disabled: 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800/60 dark:text-neutral-600',
    },
    secondary: {
        enabled: 'bg-transparent text-neutral-700 border border-neutral-300 hover:border-neutral-500 hover:text-neutral-900 dark:text-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-500 dark:hover:text-white',
        active: 'bg-neutral-100 text-neutral-900 border border-neutral-400 dark:bg-neutral-800 dark:text-white dark:border-neutral-500',
        disabled: 'bg-transparent text-neutral-300 border border-neutral-200 dark:text-neutral-700 dark:border-neutral-800',
    },
    danger: {
        enabled: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400',
        disabled: 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800/60 dark:text-neutral-600',
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
    xs: 'px-3 py-1.5 text-sm rounded-lg',
    sm: 'px-4 py-2 sm:px-5 sm:py-2.5 text-sm rounded-lg',
    md: 'px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl',
    lg: 'px-6 py-3 sm:px-8 sm:py-3.5 text-base sm:text-lg rounded-xl',
}

const sizeClass = computed(() => props.square ? '' : (sizeClasses[props.size] ?? ''))

const baseClass = computed(() => {
    const c: string[] = ['group/btn', 'inline-flex', 'items-center', 'justify-center', 'font-medium', 'transition-colors', 'duration-200']
    c.push(props.disabled ? 'cursor-not-allowed' : 'cursor-pointer')

    if (props.square) {
        c.push('p-2', 'rounded-lg')
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
