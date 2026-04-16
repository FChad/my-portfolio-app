<script lang="ts" setup>
const props = withDefaults(defineProps<{
    fileContent?: string
    fileName?: string
    isFile?: boolean
    showLineNumbers?: boolean
}>(), {
    isFile: false,
    showLineNumbers: false
})

const lines = computed(() => props.fileContent?.split('\n') ?? [])

const isCopied = ref(false)

const copy = async () => {
    if (!props.fileContent) return
    await navigator.clipboard.writeText(props.fileContent)
    isCopied.value = true
    setTimeout(() => isCopied.value = false, 2000)
}
</script>

<template>
    <div
        class="rounded-xl md:rounded-2xl overflow-hidden border bg-white/50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700">
        <!-- Header -->
        <div
            class="flex items-center justify-between border-b px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 bg-neutral-50/90 dark:bg-neutral-700/70 border-neutral-200/60 dark:border-neutral-600/50">
            <div class="flex items-center gap-1.5 sm:gap-2 md:gap-3 min-w-0 flex-1">
                <Icon name="mdi:code-tags"
                    class="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-500 dark:text-blue-400 shrink-0" />

                <!-- File Name -->
                <div v-if="isFile && fileName" class="min-w-0 flex-1">
                    <div
                        class="font-mono font-semibold truncate text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm md:text-base">
                        <span class="hidden sm:inline">{{ fileName }}</span>
                        <span class="sm:hidden">{{ fileName!.split('/').pop() }}</span>
                    </div>
                </div>
            </div>

            <!-- Copy Button -->
            <UiButton variant="secondary" square @click="copy" :class="isCopied
                ? 'bg-green-500! text-white! border-green-600!'
                : ''" class="rounded-md w-7 h-7 sm:w-8 sm:h-8 shrink-0 ml-2 touch-manipulation"
                :title="isCopied ? 'Copied!' : 'Copy code'"
                :aria-label="isCopied ? 'Code copied to clipboard' : 'Copy code to clipboard'">
                <Transition name="icon-fade" mode="out-in">
                    <Icon :key="isCopied ? 'check' : 'copy'" :name="isCopied ? 'mdi:check' : 'mdi:content-copy'"
                        class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Transition>
            </UiButton>
        </div>

        <!-- Code Content -->
        <div class="overflow-x-auto scrollbar-code bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
            <!-- Line Numbers + Code -->
            <div v-if="showLineNumbers && lines.length > 1" class="flex">
                <div
                    class="select-none border-r border-black/20 px-1.5 sm:px-2 md:px-3 py-2 sm:py-2.5 md:py-3 text-neutral-600 dark:text-neutral-400 text-[10px] sm:text-xs md:text-sm leading-5 sm:leading-6 font-mono bg-black/5 dark:bg-white/5">
                    <div v-for="(_line, i) in lines" :key="i" class="text-right">
                        {{ (i + 1).toString().padStart(lines.length.toString().length, ' ') }}
                    </div>
                </div>
                <div class="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3">
                    <pre
                        class="font-mono leading-relaxed"><code v-for="(line, i) in lines" :key="i" class="block text-[11px] sm:text-xs md:text-sm leading-5 sm:leading-6 whitespace-pre">{{ line || ' ' }}</code></pre>
                </div>
            </div>

            <!-- Single Block Code -->
            <div v-else class="px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3">
                <pre
                    class="font-mono leading-relaxed"><code class="text-[11px] sm:text-xs md:text-sm leading-5 sm:leading-6 whitespace-pre block">{{ fileContent }}</code></pre>
            </div>
        </div>
    </div>
</template>

<style scoped>
pre,
code {
    margin: 0;
    padding: 0;
    background: transparent;
    border-radius: 0;
    font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'SF Mono', Monaco, Consolas, monospace;
    font-variant-ligatures: common-ligatures;
    font-feature-settings: "liga" on, "calt" on;
}

.scrollbar-code::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.scrollbar-code::-webkit-scrollbar-track {
    background: transparent;
}

.scrollbar-code::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.3);
    border-radius: 3px;
}

.scrollbar-code::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.5);
}

button:focus-visible {
    outline: 2px solid var(--color-blue-500);
    outline-offset: 2px;
}

.icon-fade-enter-active,
.icon-fade-leave-active {
    transition: all 0.2s ease;
}

.icon-fade-enter-from,
.icon-fade-leave-to {
    opacity: 0;
    transform: scale(0.8);
}
</style>