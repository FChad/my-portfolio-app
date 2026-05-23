<script setup lang="ts">
interface Props {
    number?: string
    label?: string
    title: string
    subtitle?: string
    as?: 'h1' | 'h2'
}

const props = withDefaults(defineProps<Props>(), {
    as: undefined,
})

const headingTag = computed(() => props.as ?? (props.number === '01' ? 'h1' : 'h2'))
</script>

<template>
    <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
        <p v-if="label" class="text-xs font-mono tracking-[0.2em] uppercase text-accent">
            <template v-if="number">{{ number }} &mdash; </template>{{ label }}
        </p>
        <component :is="headingTag"
            class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-800 dark:text-white">
            {{ title }}
        </component>
        <p v-if="subtitle"
            class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            {{ subtitle }}
        </p>
    </div>
</template>
