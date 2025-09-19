<template>
    <div class="turnstile-container">
        <div v-if="isReady" ref="turnstileElement" class="cf-turnstile" :data-sitekey="siteKey"
            :data-callback="callbackName" :data-expired-callback="expiredCallbackName"
            :data-error-callback="errorCallbackName" :data-theme="isDark ? 'dark' : 'light'" data-language="auto" />
        <div v-else class="turnstile-skeleton">
            <div class="animate-pulse bg-gray-200 dark:bg-gray-700 h-16 rounded-lg flex items-center justify-center">
                <Icon name="mdi:loading" class="animate-spin text-gray-500 dark:text-gray-400 text-xl" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
declare global {
    interface Window {
        turnstile?: any
        [key: string]: any // Allow string keys for dynamic callback names
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

// Create unique callback names for this instance
const instanceId = Math.random().toString(36).substr(2, 9)
const callbackName = `turnstileCallback_${instanceId}`
const expiredCallbackName = `turnstileExpired_${instanceId}`
const errorCallbackName = `turnstileError_${instanceId}`

// Callback functions
const onVerify = (token: string) => {
    emit('update:modelValue', token)
    emit('verified', token)
}

const onExpired = () => {
    emit('update:modelValue', '')
    emit('expired')
}

const onError = (error: string) => {
    emit('update:modelValue', '')
    emit('error', error)
}

const renderTurnstile = () => {
    if (import.meta.client && window.turnstile && turnstileElement.value) {
        try {
            widgetId.value = window.turnstile.render(turnstileElement.value, {
                sitekey: props.siteKey,
                callback: callbackName,
                'expired-callback': expiredCallbackName,
                'error-callback': errorCallbackName,
                theme: isDark.value ? 'dark' : 'light'
            })
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
        resetTurnstile()
        nextTick(() => renderTurnstile())
    }
})

onMounted(() => {
    // Register global callbacks
    if (import.meta.client) {
        window[callbackName] = onVerify
        window[expiredCallbackName] = onExpired
        window[errorCallbackName] = onError
    }

    // Wait for Turnstile script to load
    const checkTurnstile = () => {
        if (window.turnstile) {
            isReady.value = true
            nextTick(() => renderTurnstile())
        } else {
            setTimeout(checkTurnstile, 100)
        }
    }
    checkTurnstile()
})

onBeforeUnmount(() => {
    // Clean up global callbacks
    if (import.meta.client) {
        delete window[callbackName]
        delete window[expiredCallbackName]
        delete window[errorCallbackName]
    }
})

defineExpose({
    reset: resetTurnstile
})
</script>

<style scoped>
.turnstile-container {
    @apply flex justify-center my-6;
}

.turnstile-skeleton {
    @apply w-80 mx-auto;
}
</style>