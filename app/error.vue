<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError
})

const { t } = useI18n()

const handleError = () => clearError({ redirect: '/' })

const errorTitle = computed(() => {
    if (props.error?.status === 404) {
        return t('error.404.title')
    }
    return t('error.general.title')
})

const errorMessage = computed(() => {
    if (props.error?.status === 404) {
        return t('error.404.message')
    }
    return t('error.general.message')
})

const errorCode = computed(() => {
    return props.error?.status || 500
})
</script>

<template>
    <div class="w-full min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
        <!-- Header mit Navigation -->
        <LayoutHeader />

        <!-- Error Content -->
        <main class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
            <div class="max-w-2xl w-full text-center">
                <!-- Error Code -->
                <div class="mb-8">
                    <h1 class="text-9xl font-bold text-blue-600 dark:text-blue-400 animate-pulse">
                        {{ errorCode }}
                    </h1>
                </div>

                <!-- Error Title -->
                <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                    {{ errorTitle }}
                </h2>

                <!-- Error Message -->
                <p class="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                    {{ errorMessage }}
                </p>

                <!-- Error Details (in development) -->
                <div v-if="error?.message"
                    class="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p class="text-sm text-red-600 dark:text-red-400 font-mono">
                        {{ error.message }}
                    </p>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button @click="handleError"
                        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                        <Icon name="mdi:home" class="w-5 h-5" />
                        {{ t('error.backHome') }}
                    </button>

                    <NuxtLinkLocale to="/contact"
                        class="px-6 py-3 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-medium rounded-lg flex items-center justify-center gap-2">
                        <Icon name="mdi:email" class="w-5 h-5" />
                        {{ t('error.contact') }}
                    </NuxtLinkLocale>
                </div>

                <!-- Helpful Links -->
                <div class="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                    <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                        {{ t('error.helpfulLinks') }}
                    </p>
                    <div class="flex flex-wrap gap-4 justify-center">
                        <NuxtLinkLocale to="/" class="text-blue-600 dark:text-blue-400 hover:underline">
                            {{ t('nav.home') }}
                        </NuxtLinkLocale>
                        <NuxtLinkLocale to="/about" class="text-blue-600 dark:text-blue-400 hover:underline">
                            {{ t('nav.about') }}
                        </NuxtLinkLocale>
                        <NuxtLinkLocale to="/showcase" class="text-blue-600 dark:text-blue-400 hover:underline">
                            {{ t('nav.showcase') }}
                        </NuxtLinkLocale>
                        <NuxtLinkLocale to="/contact" class="text-blue-600 dark:text-blue-400 hover:underline">
                            {{ t('nav.contact') }}
                        </NuxtLinkLocale>
                    </div>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <LayoutFooter />
    </div>
</template>
