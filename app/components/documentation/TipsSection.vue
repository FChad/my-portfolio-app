<script setup lang="ts">
import type { DocTip, DocTroubleshooting } from '~/composables/useDocumentation'

interface Props {
    title: string
    subtitle: string
    items: DocTip[] | DocTroubleshooting[]
}

defineProps<Props>()

// Copy functionality for inline commands
const copiedCommand = ref<string | null>(null)

const copyCommand = async (command: string) => {
    try {
        await navigator.clipboard.writeText(command)
        copiedCommand.value = command
        setTimeout(() => copiedCommand.value = null, 2000)
    } catch {
        const textArea = document.createElement('textarea')
        textArea.value = command
        textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        copiedCommand.value = command
        setTimeout(() => copiedCommand.value = null, 2000)
    }
}
</script>

<template>
    <section class="py-12 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
                    {{ title }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                    {{ subtitle }}
                </p>
            </div>

            <!-- Items -->
            <div class="flex flex-col gap-3 md:gap-4">
                <UiCard v-for="item in items" :key="item.id">
                    <!-- Item Header -->
                    <div class="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <UiIconBox :icon="item.icon" />
                        <h3 class="text-base md:text-lg lg:text-xl font-bold text-neutral-900 dark:text-white">
                            {{ item.title }}
                        </h3>
                    </div>

                    <!-- Item Content -->
                    <div
                        class="pt-3 md:pt-4 border-t border-neutral-200 dark:border-neutral-700 flex flex-col gap-2.5 md:gap-3">
                        <div v-for="(cmd, cmdIndex) in item.commands" :key="cmdIndex">
                            <!-- Inline Command -->
                            <div v-if="!cmd.isFile" class="py-1.5">
                                <div class="flex items-start gap-2 md:gap-3">
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm md:text-base text-neutral-700 dark:text-neutral-300 mb-1">
                                            {{ cmd.description }}
                                        </p>
                                        <div class="flex items-center gap-2">
                                            <code
                                                class="inline-block px-2.5 py-1 md:px-3 md:py-1.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs md:text-sm font-mono text-neutral-800 dark:text-neutral-200 overflow-x-auto max-w-full whitespace-nowrap scrollbar-thin">
                                                        {{ cmd.command }}
                                                    </code>
                                            <UiButton variant="secondary" square :class="copiedCommand === cmd.command
                                                ? 'bg-green-500! text-white! border-green-600!'
                                                : ''" @click.stop="copyCommand(cmd.command)"
                                                :title="copiedCommand === cmd.command ? 'Copied!' : 'Copy'">
                                                <Icon
                                                    :name="copiedCommand === cmd.command ? 'mdi:check' : 'mdi:content-copy'"
                                                    class="w-3 h-3 md:w-3.5 md:h-3.5" />
                                            </UiButton>
                                        </div>
                                        <p v-if="cmd.note"
                                            class="mt-1 text-xs md:text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                                            <Icon name="mdi:information" class="w-3.5 h-3.5 shrink-0" />
                                            {{ cmd.note }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- File Content (full CodeBlock) -->
                            <div v-else class="py-1">
                                <p v-if="cmd.description"
                                    class="text-sm md:text-base text-neutral-700 dark:text-neutral-300 mb-2">
                                    {{ cmd.description }}
                                </p>
                                <UiCodeBlock :file-content="cmd.fileContent" :file-name="cmd.fileName"
                                    :language="cmd.language" is-file show-line-numbers />
                            </div>
                        </div>
                    </div>
                </UiCard>
            </div>
        </div>
    </section>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
    height: 3px;
}

.scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.3);
    border-radius: 2px;
}
</style>
