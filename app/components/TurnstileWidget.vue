<template>
    <div class="flex justify-center my-6">
        <div v-if="isReady" ref="turnstileElement" />
        <div v-else class="w-80 mx-auto">
            <div class="animate-pulse bg-gray-200 dark:bg-gray-700 h-16 rounded-lg flex items-center justify-center">
                <Icon name="mdi:loading" class="animate-spin text-gray-500 dark:text-gray-400 text-xl" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
declare global {
    interface Window {
        turnstile: {
            render: (element: HTMLElement, options: any) => string
            reset: (widgetId: string) => void
            remove: (widgetId: string) => void
        }
    }
}

interface Props {
    siteKey: string
    modelValue?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
    'update:modelValue': [value: string]
    'verified': [token: string]
    'expired': []
    'error': [error: string]
}>()

const { $colorMode } = useNuxtApp()
const turnstileElement = ref<HTMLElement>()
const widgetId = ref<string>()
const isReady = ref(false)

const isDark = computed(() => $colorMode?.value === 'dark')

const renderTurnstile = () => {
    if (import.meta.client && window.turnstile && turnstileElement.value) {
        try {
            // Remove existing widget if it exists
            if (widgetId.value) {
                try {
                    window.turnstile.remove(widgetId.value)
                } catch (error) {
                    console.warn('Failed to remove existing Turnstile widget:', error)
                }
                widgetId.value = undefined
            }

            // Clear the DOM element to ensure clean state
            turnstileElement.value.innerHTML = ''

            // Render with direct function references
            widgetId.value = window.turnstile.render(turnstileElement.value, {
                sitekey: props.siteKey,
                callback: (token: string) => {
                    console.log('Turnstile callback triggered with token')
                    emit('update:modelValue', token)
                    emit('verified', token)
                },
                'expired-callback': () => {
                    console.log('Turnstile expired')
                    emit('update:modelValue', '')
                    emit('expired')
                },
                'error-callback': (error: string) => {
                    console.log('Turnstile error:', error)
                    emit('update:modelValue', '')
                    emit('error', error)
                },
                theme: isDark.value ? 'dark' : 'light',
                language: 'auto'
            })

            console.log('Turnstile rendered with widgetId:', widgetId.value)
        } catch (error) {
            console.error('Failed to render Turnstile:', error)
        }
    }
}

const resetTurnstile = () => {
    if (import.meta.client && window.turnstile && widgetId.value) {
        window.turnstile.reset(widgetId.value)
        emit('update:modelValue', '')
    }
}

// Watch for theme changes
watch(isDark, () => {
    if (widgetId.value && isReady.value) {
        // Clear token when theme changes to ensure clean state
        emit('update:modelValue', '')
        // Re-render with new theme
        nextTick(() => renderTurnstile())
    }
})

onMounted(() => {
    // Wait for Turnstile script to load
    const checkTurnstile = () => {
        if (import.meta.client && window.turnstile) {
            isReady.value = true
            nextTick(() => renderTurnstile())
        } else {
            setTimeout(checkTurnstile, 100)
        }
    }
    checkTurnstile()
})

onBeforeUnmount(() => {
    // Clean up Turnstile widget
    if (import.meta.client && window.turnstile && widgetId.value) {
        try {
            window.turnstile.remove(widgetId.value)
        } catch (error) {
            console.warn('Failed to remove Turnstile widget on unmount:', error)
        }
    }
})

defineExpose({
    reset: resetTurnstile
})
</script>