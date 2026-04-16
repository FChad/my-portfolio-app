<script setup lang="ts">
interface Props {
    title: string
    showBackButton?: boolean
    backTo?: string
}

const props = withDefaults(defineProps<Props>(), {
    showBackButton: true,
    backTo: '/showcase'
})

const { t } = useI18n()
</script>

<template>
    <nav
        class="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-700 w-full">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Breadcrumb -->
                <div class="hidden sm:flex items-center gap-2 text-sm md:text-base">
                    <NuxtLinkLocale to="/"
                        class="flex items-center justify-center text-neutral-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400"
                        aria-label="Home">
                        <Icon name="mdi:home" class="w-5 h-5" />
                    </NuxtLinkLocale>
                    <Icon name="mdi:chevron-right" class="w-5 h-5 text-neutral-400" />
                    <NuxtLinkLocale to="/showcase"
                        class="flex items-center text-neutral-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400">
                        Showcase
                    </NuxtLinkLocale>
                    <Icon name="mdi:chevron-right" class="w-5 h-5 text-neutral-400" />
                    <span class="flex items-center text-neutral-700 dark:text-neutral-300 font-medium">{{ title
                        }}</span>
                </div>

                <!-- Back Button -->
                <UiButton v-if="props.showBackButton" variant="secondary" size="xs" :to="props.backTo">
                    <span class="flex items-center gap-2">
                        <Icon name="mdi:arrow-left" class="w-5 h-5" />
                        {{ t('nav.back') }}
                    </span>
                </UiButton>
            </div>
        </div>
    </nav>
</template>
