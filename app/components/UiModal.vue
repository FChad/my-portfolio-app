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
                'relative bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl w-full',
                'shadow-2xl',
                'border border-gray-200 dark:border-gray-700',
                'ring-1 ring-black/5 dark:ring-white/5',
                maxWidthClasses[maxWidth],
                'max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col'
            ]">
                <!-- Header -->
                <div
                    class="relative flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6 border-b border-gray-200 dark:border-gray-700/50">
                    <div class="flex-1 mr-2 sm:mr-4">
                        <h3 v-if="title" class="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                            {{ title }}
                        </h3>
                        <slot v-else name="header"></slot>
                    </div>

                    <!-- Enhanced close button -->
                    <button @click="close"
                        class="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group shadow-sm hover:shadow">
                        <Icon name="mdi:close"
                            class="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                    </button>
                </div>

                <!-- Body with custom scrollbar styling -->
                <div
                    class="flex-1 overflow-y-auto px-4 py-4 sm:px-8 sm:py-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    <slot></slot>
                </div>

                <!-- Footer -->
                <div v-if="$slots.footer"
                    class="px-4 py-4 sm:px-8 sm:py-6 border-t border-gray-200 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-900/50">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
/* Custom scrollbar for webkit browsers */
:deep(.scrollbar-thin::-webkit-scrollbar) {
    width: 8px;
}

:deep(.scrollbar-thin::-webkit-scrollbar-track) {
    background: transparent;
}

:deep(.scrollbar-thin::-webkit-scrollbar-thumb) {
    background: rgb(209, 213, 219);
    border-radius: 4px;
}

:deep(.dark .scrollbar-thin::-webkit-scrollbar-thumb) {
    background: rgb(55, 65, 81);
}

:deep(.scrollbar-thin::-webkit-scrollbar-thumb:hover) {
    background: rgb(156, 163, 175);
}

:deep(.dark .scrollbar-thin::-webkit-scrollbar-thumb:hover) {
    background: rgb(75, 85, 99);
}
</style>
