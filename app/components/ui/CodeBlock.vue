<script lang="ts" setup>
interface Props {
    command?: string
    description?: string
    note?: string
    language?: string
    fileContent?: string
    fileName?: string
    isFile?: boolean
    showLineNumbers?: boolean
    maxHeight?: number
    wrapLines?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    language: 'bash',
    isFile: false,
    showLineNumbers: false,
    wrapLines: false
})

const languageMap: Record<string, { icon: string; name: string; color: string }> = {
    'bash': { icon: 'mdi:console', name: 'Bash', color: 'text-green-500' },
    'shell': { icon: 'mdi:console', name: 'Shell', color: 'text-green-500' },
    'sh': { icon: 'mdi:console', name: 'Shell', color: 'text-green-500' },
    'zsh': { icon: 'mdi:console', name: 'Zsh', color: 'text-green-500' },
    'fish': { icon: 'mdi:console', name: 'Fish', color: 'text-green-500' },
    'powershell': { icon: 'mdi:powershell', name: 'PowerShell', color: 'text-blue-500' },
    'cmd': { icon: 'mdi:console', name: 'Command Prompt', color: 'text-gray-600' },
    'yaml': { icon: 'mdi:file-code', name: 'YAML', color: 'text-red-500' },
    'yml': { icon: 'mdi:file-code', name: 'YAML', color: 'text-red-500' },
    'json': { icon: 'mdi:code-json', name: 'JSON', color: 'text-yellow-500' },
    'javascript': { icon: 'mdi:language-javascript', name: 'JavaScript', color: 'text-yellow-500' },
    'js': { icon: 'mdi:language-javascript', name: 'JavaScript', color: 'text-yellow-500' },
    'typescript': { icon: 'mdi:language-typescript', name: 'TypeScript', color: 'text-blue-500' },
    'ts': { icon: 'mdi:language-typescript', name: 'TypeScript', color: 'text-blue-500' },
    'vue': { icon: 'mdi:vuejs', name: 'Vue', color: 'text-green-500' },
    'python': { icon: 'mdi:language-python', name: 'Python', color: 'text-blue-500' },
    'py': { icon: 'mdi:language-python', name: 'Python', color: 'text-blue-500' },
    'php': { icon: 'mdi:language-php', name: 'PHP', color: 'text-purple-500' },
    'go': { icon: 'mdi:language-go', name: 'Go', color: 'text-blue-500' },
    'rust': { icon: 'mdi:language-rust', name: 'Rust', color: 'text-orange-500' },
    'java': { icon: 'mdi:language-java', name: 'Java', color: 'text-red-500' },
    'c': { icon: 'mdi:language-c', name: 'C', color: 'text-blue-600' },
    'cpp': { icon: 'mdi:language-cpp', name: 'C++', color: 'text-blue-600' },
    'csharp': { icon: 'mdi:language-csharp', name: 'C#', color: 'text-purple-600' },
    'html': { icon: 'mdi:language-html5', name: 'HTML', color: 'text-orange-500' },
    'css': { icon: 'mdi:language-css3', name: 'CSS', color: 'text-blue-500' },
    'scss': { icon: 'mdi:sass', name: 'SCSS', color: 'text-pink-500' },
    'sass': { icon: 'mdi:sass', name: 'Sass', color: 'text-pink-500' },
    'sql': { icon: 'mdi:database', name: 'SQL', color: 'text-blue-600' },
    'xml': { icon: 'mdi:file-xml', name: 'XML', color: 'text-orange-600' },
    'markdown': { icon: 'mdi:language-markdown', name: 'Markdown', color: 'text-gray-600' },
    'md': { icon: 'mdi:language-markdown', name: 'Markdown', color: 'text-gray-600' },
    'dockerfile': { icon: 'mdi:docker', name: 'Dockerfile', color: 'text-blue-500' },
    'docker': { icon: 'mdi:docker', name: 'Docker', color: 'text-blue-500' },
    'nginx': { icon: 'mdi:web', name: 'Nginx', color: 'text-green-600' },
    'apache': { icon: 'mdi:web', name: 'Apache', color: 'text-red-600' },
    'text': { icon: 'mdi:file-document', name: 'Text', color: 'text-gray-500' },
    'plain': { icon: 'mdi:file-document', name: 'Plain Text', color: 'text-gray-500' },
    'config': { icon: 'mdi:cog', name: 'Config', color: 'text-amber-500' },
    'systemd': { icon: 'mdi:cog', name: 'Systemd', color: 'text-indigo-500' }
}

const languageInfo = computed(() =>
    languageMap[props.language.toLowerCase()] || { icon: 'mdi:file-code', name: props.language.toUpperCase(), color: 'text-gray-500' }
)

const contentText = computed(() =>
    props.isFile ? props.fileContent || '' : props.command || ''
)

const formattedLines = computed(() =>
    contentText.value ? contentText.value.split('\n') : []
)

const isCopied = ref(false)

const copyToClipboard = async () => {
    if (!contentText.value) return

    try {
        await navigator.clipboard.writeText(contentText.value)
        isCopied.value = true
        setTimeout(() => isCopied.value = false, 2000)
    } catch {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = contentText.value
        textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        isCopied.value = true
        setTimeout(() => isCopied.value = false, 2000)
    }
}
</script>

<template>
    <div
        class="backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-lg group border bg-white/90 dark:bg-gray-800/90 border-gray-200/60 dark:border-gray-700/60">
        <!-- Header -->
        <div
            class="flex items-center justify-between border-b duration-300 px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 bg-gray-50/90 dark:bg-gray-700/70 border-gray-200/60 dark:border-gray-600/50">
            <div class="flex items-center gap-1.5 sm:gap-2 md:gap-3 min-w-0 flex-1">
                <!-- Language Badge -->
                <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <Icon :name="languageInfo.icon"
                        :class="['w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5', languageInfo.color]" />
                    <span
                        class="font-medium text-gray-800 dark:text-gray-200 text-xs sm:text-sm md:text-base hidden sm:inline">
                        {{ languageInfo.name }}
                    </span>
                </div>

                <!-- File Name / Title -->
                <div class="min-w-0 flex-1">
                    <div v-if="isFile && fileName"
                        class="font-mono font-semibold truncate duration-300 text-gray-800 dark:text-gray-200 text-xs sm:text-sm md:text-base">
                        <Icon name="mdi:file-document"
                            class="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 inline mr-1 sm:mr-2 text-gray-600 dark:text-gray-400" />
                        <span class="hidden sm:inline">{{ fileName }}</span>
                        <span class="sm:hidden">{{ fileName.split('/').pop() }}</span>
                    </div>
                    <div v-if="description" :class="[
                        'truncate duration-300 text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base',
                        { 'text-[10px] sm:text-xs mt-0.5': isFile && fileName }
                    ]">
                        {{ description }}
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-1 flex-shrink-0 ml-2">
                <!-- Copy Button -->
                <button @click="copyToClipboard" :class="[
                    'flex items-center justify-center rounded-md w-7 h-7 sm:w-8 sm:h-8 touch-manipulation active:scale-90 transition-all',
                    isCopied
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500 text-white hover:scale-105 hover:shadow-lg'
                ]" :title="isCopied ? 'Copied!' : 'Copy code'"
                    :aria-label="isCopied ? 'Code copied to clipboard' : 'Copy code to clipboard'">
                    <Transition name="icon-fade" mode="out-in">
                        <Icon :key="isCopied ? 'check' : 'copy'" :name="isCopied ? 'mdi:check' : 'mdi:content-copy'"
                            class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Transition>
                </button>
            </div>
        </div>

        <!-- Code Content -->
        <div class="relative" :style="props.maxHeight ? `max-height: ${props.maxHeight}px; overflow: auto;` : ''">
            <div
                class="overflow-x-auto overflow-y-hidden scrollbar-code bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <!-- Line Numbers + Code -->
                <div v-if="showLineNumbers && formattedLines.length > 1" class="flex">
                    <!-- Line Numbers -->
                    <div
                        class="select-none border-r border-opacity-20 px-1.5 sm:px-2 md:px-3 py-2 sm:py-2.5 md:py-3 text-gray-600 dark:text-gray-400 text-[10px] sm:text-xs md:text-sm leading-5 sm:leading-6 font-mono bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-5">
                        <div v-for="(line, index) in formattedLines" :key="index" class="text-right">
                            {{ (index + 1).toString().padStart(formattedLines.length.toString().length, ' ') }}
                        </div>
                    </div>

                    <!-- Code Lines -->
                    <div class="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3">
                        <pre
                            class="font-mono leading-relaxed"><code v-for="(line, index) in formattedLines" :key="index" :class="`block text-[11px] sm:text-xs md:text-sm leading-5 sm:leading-6 ${props.wrapLines ? 'whitespace-pre-wrap break-all' : 'whitespace-pre'}`">{{ line || ' ' }}</code></pre>
                    </div>
                </div>

                <!-- Single Block Code (no line numbers) -->
                <div v-else class="px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3">
                    <pre
                        class="font-mono leading-relaxed"><code :class="`language-${props.language} text-[11px] sm:text-xs md:text-sm leading-5 sm:leading-6 ${props.wrapLines ? 'whitespace-pre-wrap break-all' : 'whitespace-pre'} block`">{{ contentText }}</code></pre>
                </div>
            </div>

            <!-- Fade overlay for max height -->
            <div v-if="props.maxHeight"
                class="absolute bottom-0 left-0 right-0 h-6 sm:h-8 bg-gradient-to-t from-current to-transparent opacity-20 pointer-events-none">
            </div>
        </div>

        <!-- Note Section -->
        <div v-if="note"
            class="border-t duration-300 px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 bg-amber-50/80 dark:bg-amber-900/20 border-amber-200/60 dark:border-amber-800/40 text-amber-800 dark:text-amber-200">
            <div class="flex items-start gap-1.5 sm:gap-2 md:gap-3">
                <Icon name="mdi:information"
                    class="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                <div class="leading-relaxed text-xs sm:text-sm md:text-base">
                    <span class="font-medium">Note:</span>
                    {{ note }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
/* Code formatting */
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

/* Scrollbar styling */
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

/* Focus styles */
button:focus-visible {
    outline: 2px solid theme('colors.blue.500');
    outline-offset: 2px;
}

/* Icon animation */
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