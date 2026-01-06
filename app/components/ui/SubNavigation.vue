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
    <nav class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 w-full">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Breadcrumb -->
                <div class="hidden sm:flex items-center space-x-2 text-sm md:text-base">
                    <NuxtLinkLocale to="/"
                        class="flex items-center justify-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                        <Icon name="mdi:home" class="w-5 h-5" />
                    </NuxtLinkLocale>
                    <Icon name="mdi:chevron-right" class="w-5 h-5 text-gray-400" />
                    <NuxtLinkLocale to="/showcase"
                        class="flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                        Showcase
                    </NuxtLinkLocale>
                    <Icon name="mdi:chevron-right" class="w-5 h-5 text-gray-400" />
                    <span class="flex items-center text-gray-700 dark:text-gray-300 font-medium">{{ title }}</span>
                </div>

                <!-- Back Button -->
                <NuxtLinkLocale v-if="props.showBackButton" :to="props.backTo"
                    class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <Icon name="mdi:arrow-left" class="w-5 h-5" />
                    {{ t('nav.back') }}
                </NuxtLinkLocale>
            </div>
        </div>
    </nav>
</template>
