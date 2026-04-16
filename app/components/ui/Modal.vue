<script setup lang="ts">
const isOpen = defineModel<boolean>({ required: true })

const { title, maxWidth = 'lg' } = defineProps<{
    title?: string
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}>()

const close = () => {
    isOpen.value = false
}

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

const modalRef = ref<HTMLElement | null>(null)
let previouslyFocusedElement: HTMLElement | null = null

const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen.value) {
        close()
    }

    if (e.key === 'Tab' && isOpen.value && modalRef.value) {
        const focusable = modalRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault()
                last?.focus()
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault()
                first?.focus()
            }
        }
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
})

watch(isOpen, (open) => {
    if (open) {
        document.body.style.overflow = 'hidden'
        previouslyFocusedElement = document.activeElement as HTMLElement
        nextTick(() => {
            const focusable = modalRef.value?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
            focusable?.[0]?.focus()
        })
    } else {
        document.body.style.overflow = ''
        previouslyFocusedElement?.focus()
        previouslyFocusedElement = null
    }
})

const modalTitleId = useId()
const maxWidthClass = computed(() => `max-w-${maxWidth}`)
</script>

<template>
    <Teleport to="body">
        <div v-if="isOpen" ref="modalRef" role="dialog" aria-modal="true"
            :aria-labelledby="title ? modalTitleId : undefined"
            class="fixed inset-0 z-100 flex items-center justify-center p-2 md:p-4">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/60 backdrop-blur-md" @click="close"></div>

            <!-- Modal Content with enhanced shadow and border -->
            <div :class="[
                'relative bg-white dark:bg-neutral-800 rounded-xl md:rounded-2xl w-full',
                'shadow-md hover:shadow-lg transition-shadow duration-300',
                'border border-neutral-200 dark:border-neutral-700',
                maxWidthClass,
                'max-h-[95vh] md:max-h-[90vh] overflow-hidden flex flex-col'
            ]">
                <!-- Header with modern styling -->
                <div
                    class="relative flex items-start justify-between px-4 py-4 md:px-6 md:py-5 border-b border-neutral-200 dark:border-neutral-700">
                    <div class="flex-1 mr-2 md:mr-4">
                        <h3 v-if="title" :id="modalTitleId"
                            class="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
                            {{ title }}
                        </h3>
                        <slot v-else name="header"></slot>
                    </div>

                    <!-- Modern close button with hover effect -->
                    <UiButton variant="secondary" square @click="close">
                        <Icon name="mdi:close"
                            class="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover/btn:text-red-600 dark:group-hover/btn:text-red-400 transition-colors" />
                    </UiButton>
                </div>

                <div
                    class="flex-1 overflow-y-auto px-4 py-5 md:px-6 md:py-6">
                    <slot></slot>
                </div>

                <!-- Footer with modern styling -->
                <div v-if="$slots.footer"
                    class="px-4 py-4 md:px-6 md:py-5 border-t border-neutral-200 dark:border-neutral-700">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </Teleport>
</template>
