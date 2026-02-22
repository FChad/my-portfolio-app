<script setup lang="ts">
import { ref } from 'vue'
import type { DocStep } from '~/composables/useDocumentation'

interface Props {
    title: string
    steps: DocStep[]
    initialExpanded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    initialExpanded: true
})

// Steps use direct English text - no translation needed

// Initialize expanded state
const getInitialExpandedState = () => {
    const initialState: Record<string, boolean> = {}
    props.steps.forEach(step => {
        initialState[step.id] = props.initialExpanded
    })
    return initialState
}

const isExpanded = ref<Record<string, boolean>>(getInitialExpandedState())

const toggleExpanded = (stepId: string) => {
    isExpanded.value[stepId] = !isExpanded.value[stepId]
}
</script>

<template>
    <section class="py-12 sm:py-16 md:py-24 relative overflow-hidden">

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-8 sm:mb-12 md:mb-16">
                <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-neutral-800 dark:text-white">
                    {{ title }}
                </h2>
            </div>

            <!-- Steps -->
            <div class="space-y-3 sm:space-y-4 md:space-y-6">
                <div v-for="(step, index) in steps" :key="step.id"
                    class="group bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300">
                    <!-- Step Header -->
                    <button @click="toggleExpanded(step.id)"
                        class="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left hover:bg-neutral-50/50 dark:hover:bg-neutral-700/50 rounded-xl sm:rounded-2xl md:rounded-3xl transition-colors">
                        <div class="flex items-center gap-3 sm:gap-4">
                            <div
                                class="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-500 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 shrink-0">
                                <span class="text-white font-black text-base sm:text-lg md:text-xl">{{ index + 1
                                    }}</span>
                            </div>
                            <div class="min-w-0">
                                <h3
                                    class="text-base sm:text-lg md:text-xl font-bold text-neutral-900 dark:text-white mb-0.5 sm:mb-1">
                                    {{ step.title }}
                                </h3>
                                <p
                                    class="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-300 line-clamp-2">
                                    {{ step.description }}
                                </p>
                            </div>
                        </div>
                        <Icon name="mdi:chevron-down"
                            :class="`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-neutral-400 transition-transform duration-300 shrink-0 ml-2 sm:ml-4 ${isExpanded[step.id] ? 'rotate-180' : ''}`" />
                    </button>

                    <!-- Step Content -->
                    <div v-show="isExpanded[step.id]" class="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                        <div class="pt-3 sm:pt-4 border-t border-neutral-200 dark:border-neutral-700">
                            <div class="space-y-3 sm:space-y-4">
                                <div v-for="(cmd, cmdIndex) in step.commands" :key="cmdIndex">
                                    <template v-if="!cmd.isFile">
                                        <UiCodeBlock :command="cmd.command" :description="cmd.description"
                                            :note="cmd.note" :language="cmd.language" />
                                    </template>
                                    <template v-else>
                                        <UiCodeBlock :file-content="cmd.fileContent" :file-name="cmd.fileName"
                                            :language="cmd.language" is-file />
                                    </template>
                                </div>
                            </div>
                            <div v-if="step.note"
                                class="mt-4 sm:mt-6 p-3 sm:p-4 md:p-5 bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200 dark:border-blue-700/50 rounded-lg sm:rounded-xl md:rounded-2xl">
                                <div class="flex items-start gap-2 sm:gap-3">
                                    <div
                                        class="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-md sm:rounded-lg flex items-center justify-center shrink-0">
                                        <Icon name="mdi:information" class="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <p
                                        class="text-blue-800 dark:text-blue-300 text-xs sm:text-sm md:text-base leading-relaxed">
                                        {{ step.note }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
