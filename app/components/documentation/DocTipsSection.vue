<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { DocTip, DocTroubleshooting } from '~/composables/useDocumentation'

interface Props {
    title: string
    subtitle: string
    items: DocTip[] | DocTroubleshooting[]
    type?: 'tips' | 'troubleshooting'
}

const props = withDefaults(defineProps<Props>(), {
    type: 'tips'
})

// Tips and troubleshooting use direct English text - no translation needed

// Initialize expanded state
const getInitialExpandedState = () => {
    const initialState: Record<string, boolean> = {}
    props.items.forEach(item => {
        initialState[item.id] = false
    })
    return initialState
}

const isExpanded = ref<Record<string, boolean>>({})

onMounted(() => {
    isExpanded.value = getInitialExpandedState()
})

const toggleExpanded = (itemId: string) => {
    isExpanded.value[itemId] = !isExpanded.value[itemId]
}
</script>

<template>
    <section class="py-12 sm:py-16 md:py-24 relative overflow-hidden">
        <!-- Gradient background based on type -->
        <div :class="[
            'absolute inset-0',
            type === 'troubleshooting'
                ? 'bg-gradient-to-b from-transparent via-orange-100/40 to-transparent dark:via-orange-900/10'
                : 'bg-gradient-to-b from-transparent via-purple-100/40 to-transparent dark:via-purple-900/10'
        ]"></div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-8 sm:mb-12 md:mb-16">
                <h2
                    class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 dark:text-white mb-3 sm:mb-4">
                    {{ title }}
                </h2>
                <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    {{ subtitle }}
                </p>
            </div>

            <!-- Items -->
            <div class="space-y-3 sm:space-y-4 md:space-y-6">
                <div v-for="item in items" :key="item.id"
                    class="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300">
                    <button @click="toggleExpanded(item.id)"
                        class="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left hover:bg-gray-50/50 dark:hover:bg-gray-700/50 rounded-xl sm:rounded-2xl md:rounded-3xl transition-colors">
                        <div class="flex items-center gap-3 sm:gap-4">
                            <div :class="[
                                'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 flex-shrink-0',
                                type === 'troubleshooting'
                                    ? 'bg-gradient-to-br from-orange-500 to-red-600'
                                    : 'bg-gradient-to-br from-purple-500 to-pink-600'
                            ]">
                                <Icon :name="item.icon" class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                            </div>
                            <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                                {{ item.title }}
                            </h3>
                        </div>
                        <Icon :name="isExpanded[item.id] ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                            class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-400 transition-transform flex-shrink-0 ml-2 sm:ml-4" />
                    </button>

                    <Transition name="expand">
                        <div v-show="isExpanded[item.id]" class="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                            <div
                                class="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-4">
                                <div v-for="(cmd, cmdIndex) in item.commands" :key="cmdIndex">
                                    <UiCodeBlock :command="cmd.command" :description="cmd.description" :note="cmd.note"
                                        :language="cmd.language" />
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </section>
</template>
