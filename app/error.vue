<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError
})

const { t } = useI18n()

const handleError = () => clearError({ redirect: '/' })

const errorCode = computed(() => props.error?.status || 500)
const isNotFound = computed(() => props.error?.status === 404)

const errorTitle = computed(() =>
    isNotFound.value ? t('error.404.title') : t('error.general.title')
)

const errorMessage = computed(() =>
    isNotFound.value ? t('error.404.message') : t('error.general.message')
)

const helpfulLinks = [
    { to: '/', key: 'home', icon: 'mdi:home' },
    { to: '/about', key: 'about', icon: 'mdi:account' },
    { to: '/showcase', key: 'showcase', icon: 'mdi:eye' },
    { to: '/contact', key: 'contact', icon: 'mdi:email' }
]
</script>

<template>
    <div class="w-full min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
        <LayoutHeader />

        <!-- Error Content -->
        <main
            class="relative flex-1 flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
            <!-- Main Content -->
            <div class="relative z-20 max-w-3xl w-full text-center flex flex-col gap-6 md:gap-8">
                <!-- Error Code with Icon -->
                <div class="flex flex-col items-center gap-3 md:gap-4">
                    <h1
                        class="text-7xl sm:text-8xl md:text-9xl font-bold leading-none text-blue-600 dark:text-blue-400 tracking-tight">
                        {{ errorCode }}
                    </h1>
                </div>

                <!-- Error Title -->
                <h2
                    class="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-neutral-800 dark:text-white uppercase">
                    {{ errorTitle }}
                </h2>

                <!-- Error Message -->
                <p
                    class="max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {{ errorMessage }}
                </p>

                <!-- Error Details (in development) -->
                <div v-if="error?.message && error.message !== errorMessage" class="max-w-2xl mx-auto w-full">
                    <UiCard variant="muted" size="sm">
                        <p class="text-sm text-red-600 dark:text-red-400 font-mono break-all text-left">
                            {{ error.message }}
                        </p>
                    </UiCard>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center">
                    <UiButton variant="primary" size="lg" @click="handleError">
                        <span class="flex items-center gap-3">
                            <Icon name="mdi:home"
                                class="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:scale-110 transition-transform" />
                            {{ t('error.backHome') }}
                        </span>
                    </UiButton>

                    <UiButton variant="secondary" size="lg" to="/contact">
                        <span class="flex items-center gap-3">
                            {{ t('error.contact') }}
                            <Icon name="mdi:email"
                                class="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:scale-110 transition-transform" />
                        </span>
                    </UiButton>
                </div>

                <!-- Helpful Links -->
                <div
                    class="mt-4 md:mt-6 pt-6 md:pt-8 border-t border-neutral-200 dark:border-neutral-700/60 flex flex-col gap-3 md:gap-4">
                    <p class="text-xs md:text-sm font-medium tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
                        {{ t('error.helpfulLinks') }}
                    </p>
                    <div class="flex flex-wrap gap-2 sm:gap-3 justify-center">
                        <UiButton v-for="link in helpfulLinks" :key="link.key" variant="secondary" size="xs" :to="link.to">
                            <span class="flex items-center gap-2">
                                <Icon :name="link.icon" class="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                {{ $t(`nav.${link.key}`) }}
                            </span>
                        </UiButton>
                    </div>
                </div>
            </div>
        </main>

        <LayoutFooter />
    </div>
</template>
