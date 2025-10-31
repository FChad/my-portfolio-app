<script setup lang="ts">
interface Props {
    modelValue: boolean
    title?: string
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const props = withDefaults(defineProps<Props>(), {
    maxWidth: 'lg'
})

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()

const close = () => {
    emit('update:modelValue', false)
}

// Close on ESC key
const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.modelValue) {
        close()
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
})

// Prevent body scroll when modal is open
watch(() => props.modelValue, (isOpen) => {
    if (isOpen) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})

const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
}
</script>

<template>
    <Teleport to="body">
        <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
            @click.self="close">
            <!-- Enhanced Backdrop -->
            <div class="absolute inset-0 bg-black/60 backdrop-blur-md" @click="close"></div>

            <!-- Modal Content with enhanced shadow and border -->
            <div :class="[
                'relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl w-full',
                'shadow-2xl hover:shadow-3xl transition-shadow duration-300',
                'border border-gray-200 dark:border-gray-700',
                maxWidthClasses[maxWidth],
                'max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col'
            ]">
                <!-- Header with modern styling -->
                <div
                    class="relative flex items-start justify-between px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800">
                    <div class="flex-1 mr-2 sm:mr-4">
                        <h3 v-if="title" class="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                            {{ title }}
                        </h3>
                        <slot v-else name="header"></slot>
                    </div>

                    <!-- Modern close button with hover effect -->
                    <button @click="close"
                        class="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30 group transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105">
                        <Icon name="mdi:close"
                            class="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                    </button>
                </div>

                <!-- Body with custom scrollbar styling and better padding -->
                <div
                    class="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-800/50 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
                    <slot></slot>
                </div>

                <!-- Footer with modern styling -->
                <div v-if="$slots.footer"
                    class="px-4 py-4 sm:px-6 sm:py-5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
/* Custom scrollbar for webkit browsers with smoother styling */
:deep(.scrollbar-thin::-webkit-scrollbar) {
    width: 6px;
}

:deep(.scrollbar-thin::-webkit-scrollbar-track) {
    background: transparent;
    margin: 8px 0;
}

:deep(.scrollbar-thin::-webkit-scrollbar-thumb) {
    background: rgb(209, 213, 219);
    border-radius: 10px;
    transition: background 0.2s ease;
}

:deep(.dark .scrollbar-thin::-webkit-scrollbar-thumb) {
    background: rgb(75, 85, 99);
}

:deep(.scrollbar-thin::-webkit-scrollbar-thumb:hover) {
    background: rgb(156, 163, 175);
}

:deep(.dark .scrollbar-thin::-webkit-scrollbar-thumb:hover) {
    background: rgb(107, 114, 128);
}

/* Smooth modal entry animation */
@keyframes modalFadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.fixed>.relative {
    animation: modalFadeIn 0.2s ease-out;
}
</style>
