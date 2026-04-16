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
        <main class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
            <div class="max-w-2xl w-full text-center">
                <!-- Error Code -->
                <div class="mb-6 md:mb-8">
                    <h1 class="text-8xl md:text-9xl font-bold text-blue-600 dark:text-blue-400 animate-pulse">
                        {{ errorCode }}
                    </h1>
                </div>

                <!-- Error Title -->
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white mb-3 md:mb-4">
                    {{ errorTitle }}
                </h2>

                <!-- Error Message -->
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 mb-6 md:mb-8">
                    {{ errorMessage }}
                </p>

                <!-- Error Details (in development) -->
                <div v-if="error?.message"
                    class="mb-6 md:mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl md:rounded-2xl">
                    <p class="text-sm text-red-600 dark:text-red-400 font-mono">
                        {{ error.message }}
                    </p>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center">
                    <button @click="handleError"
                        class="cursor-pointer group w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-colors duration-200 inline-flex items-center justify-center">
                        <span class="flex items-center gap-2 sm:gap-3">
                            <Icon name="mdi:home"
                                class="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                            {{ t('error.backHome') }}
                        </span>
                    </button>

                    <NuxtLinkLocale to="/contact"
                        class="group w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-colors duration-200 inline-flex items-center justify-center">
                        <span class="flex items-center gap-2 sm:gap-3">
                            <Icon name="mdi:email"
                                class="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                            {{ t('error.contact') }}
                        </span>
                    </NuxtLinkLocale>
                </div>

                <!-- Helpful Links -->
                <div class="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-neutral-200 dark:border-neutral-700">
                    <p class="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mb-3 md:mb-4">
                        {{ t('error.helpfulLinks') }}
                    </p>
                    <div class="flex flex-wrap gap-3 md:gap-4 justify-center">
                        <NuxtLinkLocale to="/"
                            class="text-sm md:text-base font-medium text-blue-600 dark:text-blue-400 hover:underline">
                            {{ t('nav.home') }}
                        </NuxtLinkLocale>
                        <NuxtLinkLocale to="/about"
                            class="text-sm md:text-base font-medium text-blue-600 dark:text-blue-400 hover:underline">
                            {{ t('nav.about') }}
                        </NuxtLinkLocale>
                        <NuxtLinkLocale to="/showcase"
                            class="text-sm md:text-base font-medium text-blue-600 dark:text-blue-400 hover:underline">
                            {{ t('nav.showcase') }}
                        </NuxtLinkLocale>
                        <NuxtLinkLocale to="/contact"
                            class="text-sm md:text-base font-medium text-blue-600 dark:text-blue-400 hover:underline">
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
