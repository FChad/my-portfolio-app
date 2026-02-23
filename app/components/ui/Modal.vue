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

const modalRef = ref<HTMLElement | null>(null)
let previouslyFocusedElement: HTMLElement | null = null

// Close on ESC key
const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.modelValue) {
        close()
    }

    // Focus trapping
    if (e.key === 'Tab' && props.modelValue && modalRef.value) {
        const focusable = modalRef.value.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault()
                last.focus()
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault()
                first.focus()
            }
        }
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    // Ensure body scroll is restored if component unmounts while open
    document.body.style.overflow = ''
})

// Prevent body scroll when modal is open & manage focus
watch(() => props.modelValue, (isOpen) => {
    if (isOpen) {
        document.body.style.overflow = 'hidden'
        previouslyFocusedElement = document.activeElement as HTMLElement
        nextTick(() => {
            // Focus first focusable element inside modal
            const focusable = modalRef.value?.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
            )
            if (focusable?.length) {
                focusable[0].focus()
            }
        })
    } else {
        document.body.style.overflow = ''
        // Restore focus to previously focused element
        previouslyFocusedElement?.focus()
        previouslyFocusedElement = null
    }
})

const modalTitleId = useId()

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
        <div v-if="modelValue" ref="modalRef" role="dialog" aria-modal="true"
            :aria-labelledby="title ? modalTitleId : undefined"
            class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4" @click.self="close">
            <!-- Enhanced Backdrop -->
            <div class="absolute inset-0 bg-black/60 backdrop-blur-md" @click="close"></div>

            <!-- Modal Content with enhanced shadow and border -->
            <div :class="[
                'relative bg-white dark:bg-neutral-800 rounded-2xl sm:rounded-3xl w-full',
                'shadow-2xl hover:shadow-3xl transition-shadow duration-300',
                'border border-neutral-200 dark:border-neutral-700',
                maxWidthClasses[maxWidth],
                'max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col'
            ]">
                <!-- Header with modern styling -->
                <div
                    class="relative flex items-start justify-between px-4 py-4 sm:px-6 sm:py-5 border-b border-neutral-200 dark:border-neutral-700 bg-linear-to-r from-neutral-50 to-white dark:from-neutral-800/50 dark:to-neutral-800">
                    <div class="flex-1 mr-2 sm:mr-4">
                        <h3 v-if="title" :id="modalTitleId"
                            class="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
                            {{ title }}
                        </h3>
                        <slot v-else name="header"></slot>
                    </div>

                    <!-- Modern close button with hover effect -->
                    <button @click="close"
                        class="shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-neutral-200 dark:bg-neutral-700 hover:bg-red-100 dark:hover:bg-red-900/30 group cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105">
                        <Icon name="mdi:close"
                            class="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                    </button>
                </div>

                <!-- Body with custom scrollbar styling and better padding -->
                <div
                    class="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 bg-linear-to-b from-white to-neutral-50/50 dark:from-neutral-800 dark:to-neutral-800/50 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent hover:scrollbar-thumb-neutral-400 dark:hover:scrollbar-thumb-neutral-500">
                    <slot></slot>
                </div>

                <!-- Footer with modern styling -->
                <div v-if="$slots.footer"
                    class="px-4 py-4 sm:px-6 sm:py-5 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
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
