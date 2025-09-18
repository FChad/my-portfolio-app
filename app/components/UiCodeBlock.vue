<script lang="ts" setup>
import { computed, ref } from 'vue'

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

// Static functions for server-side rendering
function getLanguageInfo(lang: string) {
    const langMap: Record<string, { icon: string; name: string; color: string }> = {
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

    return langMap[lang.toLowerCase()] || { icon: 'mdi:file-code', name: lang.toUpperCase(), color: 'text-gray-500' }
}

function getContent() {
    return props.isFile ? props.fileContent || '' : props.command || ''
}

function getFormattedLines() {
    const content = getContent()
    if (!content) return []
    return content.split('\n')
}

// Static values for server-side rendering - computed for better performance
const languageInfo = computed(() => getLanguageInfo(props.language))
const contentText = computed(() => getContent())
const formattedLines = computed(() => getFormattedLines())

// Copy functionality
const isCopied = ref(false)

const copyToClipboard = async () => {
    const textToCopy = contentText.value
    if (!textToCopy) return

    try {
        // Modern clipboard API
        await navigator.clipboard.writeText(textToCopy)
        isCopied.value = true
        setTimeout(() => {
            isCopied.value = false
        }, 2000)
    } catch (err) {
        console.error('Clipboard API failed, trying fallback: ', err)
        // Fallback for browsers that don't support clipboard API or when HTTPS is not available
        try {
            const textArea = document.createElement('textarea')
            textArea.value = textToCopy
            textArea.style.position = 'fixed'
            textArea.style.left = '-9999px'
            textArea.style.top = '-9999px'
            document.body.appendChild(textArea)
            textArea.focus()
            textArea.select()

            const successful = document.execCommand('copy')
            document.body.removeChild(textArea)

            if (successful) {
                isCopied.value = true
                setTimeout(() => {
                    isCopied.value = false
                }, 2000)
            } else {
                console.error('Fallback copy command failed')
            }
        } catch (fallbackErr) {
            console.error('All copy methods failed: ', fallbackErr)
        }
    }
}
</script>

<template>
    <div
        class="backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 group border bg-white/90 dark:bg-gray-800/90 border-gray-200/60 dark:border-gray-700/60">
        <!-- Header -->
        <div
            class="flex items-center justify-between border-b transition-colors duration-300 px-3 sm:px-4 py-2 sm:py-3 bg-gray-50/90 dark:bg-gray-700/70 border-gray-200/60 dark:border-gray-600/50">
            <div class="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <!-- Language Badge -->
                <div class="flex items-center gap-2 flex-shrink-0">
                    <Icon :name="languageInfo.icon" :class="['w-4 h-4 sm:w-5 sm:h-5', languageInfo.color]" />
                    <span class="font-medium text-gray-800 dark:text-gray-200 text-base">
                        {{ languageInfo.name }}
                    </span>
                </div>

                <!-- File Name / Title -->
                <div class="min-w-0 flex-1">
                    <div v-if="isFile && fileName"
                        class="font-mono font-semibold truncate transition-colors duration-300 text-gray-800 dark:text-gray-200 text-base">
                        <Icon name="mdi:file-document"
                            class="w-4 h-4 sm:w-5 sm:h-5 inline mr-2 text-gray-600 dark:text-gray-400" />
                        {{ fileName }}
                    </div>
                    <div v-if="description" :class="[
                        'truncate transition-colors duration-300 text-gray-600 dark:text-gray-400 text-base',
                        { 'text-xs mt-0.5': isFile && fileName }
                    ]">
                        {{ description }}
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <!-- Copy Button -->
                <button @click="copyToClipboard" :class="[
                    'flex items-center justify-center rounded-md transition-all duration-200 w-8 h-8 touch-manipulation active:scale-90',
                    isCopied
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500 text-white hover:scale-105 hover:shadow-lg'
                ]" :title="isCopied ? 'Copied!' : 'Copy code'"
                    :aria-label="isCopied ? 'Code copied to clipboard' : 'Copy code to clipboard'">
                    <Transition name="icon-fade" mode="out-in">
                        <Icon :key="isCopied ? 'check' : 'copy'" :name="isCopied ? 'mdi:check' : 'mdi:content-copy'"
                            class="w-4 h-4" />
                    </Transition>
                </button>
            </div>
        </div>

        <!-- Code Content -->
        <div class="relative" :style="props.maxHeight ? `max-height: ${props.maxHeight}px; overflow: auto;` : ''">
            <div class="overflow-auto scrollbar-code bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <!-- Line Numbers + Code -->
                <div v-if="showLineNumbers && formattedLines.length > 1" class="flex">
                    <!-- Line Numbers -->
                    <div
                        class="select-none border-r border-opacity-20 px-2 sm:px-3 py-2 sm:py-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-6 font-mono bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-5">
                        <div v-for="(line, index) in formattedLines" :key="index" class="text-right">
                            {{ (index + 1).toString().padStart(formattedLines.length.toString().length, ' ') }}
                        </div>
                    </div>

                    <!-- Code Lines -->
                    <div class="flex-1 px-3 sm:px-4 py-2 sm:py-3">
                        <pre
                            class="font-mono leading-relaxed"><code v-for="(line, index) in formattedLines" :key="index" :class="`block text-sm sm:text-base leading-6 ${props.wrapLines ? 'whitespace-pre-wrap' : 'whitespace-pre'}`">{{ line || ' ' }}</code></pre>
                    </div>
                </div>

                <!-- Single Block Code (no line numbers) -->
                <div v-else class="px-3 sm:px-4 py-2 sm:py-3">
                    <pre
                        class="font-mono leading-relaxed"><code :class="`language-${props.language} text-sm sm:text-base leading-6 ${props.wrapLines ? 'whitespace-pre-wrap' : 'whitespace-pre'} block`">{{ contentText }}</code></pre>
                </div>
            </div>

            <!-- Fade overlay for max height -->
            <div v-if="props.maxHeight"
                class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-current to-transparent opacity-20 pointer-events-none">
            </div>
        </div>

        <!-- Note Section -->
        <div v-if="note"
            class="border-t transition-colors duration-300 px-3 sm:px-4 py-2 sm:py-3 bg-amber-50/80 dark:bg-amber-900/20 border-amber-200/60 dark:border-amber-800/40 text-amber-800 dark:text-amber-200">
            <div class="flex items-start gap-2 sm:gap-3">
                <Icon name="mdi:information"
                    class="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                <div class="leading-relaxed text-base">
                    <span class="font-medium">Note:</span>
                    {{ note }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
/* Ensure consistent code formatting */
pre {
    margin: 0 !important;
    padding: 0 !important;
    background: transparent !important;
    border-radius: 0 !important;
    font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'SF Mono', Monaco, 'Cascadia Mono', 'Roboto Mono', Consolas, 'Courier New', monospace !important;
    font-variant-ligatures: common-ligatures;
    font-feature-settings: "liga" on, "calt" on;
}

code {
    font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'SF Mono', Monaco, 'Cascadia Mono', 'Roboto Mono', Consolas, 'Courier New', monospace !important;
    background: transparent !important;
    padding: 0 !important;
    border-radius: 0 !important;
    font-size: inherit !important;
    line-height: inherit !important;
    font-variant-ligatures: common-ligatures;
    font-feature-settings: "liga" on, "calt" on;
}

/* Enhanced selection styling */
pre::selection,
code::selection {
    background: rgba(59, 130, 246, 0.4) !important;
    color: inherit !important;
}

pre::-moz-selection,
code::-moz-selection {
    background: rgba(59, 130, 246, 0.4) !important;
    color: inherit !important;
}

/* Scrollbar styling for code blocks - consistent with global styles */
.scrollbar-code::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.scrollbar-code::-webkit-scrollbar-track {
    background: rgba(156, 163, 175, 0.1);
}

.dark .scrollbar-code::-webkit-scrollbar-track {
    background: rgba(17, 24, 39, 0.5);
}

.scrollbar-code::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.3);
    border-radius: 4px;
}

.dark .scrollbar-code::-webkit-scrollbar-thumb {
    background: rgba(75, 85, 99, 0.5);
}

.scrollbar-code::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.5);
}

.dark .scrollbar-code::-webkit-scrollbar-thumb:hover {
    background: rgba(75, 85, 99, 0.7);
}

/* Enhanced focus styles for accessibility */
button:focus-visible {
    outline: 2px solid theme('colors.blue.500');
    outline-offset: 2px;
    border-radius: 0.5rem;
}

/* Icon transition animation */
.icon-fade-enter-active,
.icon-fade-leave-active {
    transition: all 0.2s ease-in-out;
}

.icon-fade-enter-from {
    opacity: 0;
    transform: scale(0.8) rotate(-10deg);
}

.icon-fade-leave-to {
    opacity: 0;
    transform: scale(0.8) rotate(10deg);
}

.icon-fade-enter-to,
.icon-fade-leave-from {
    opacity: 1;
    transform: scale(1) rotate(0deg);
}
</style>