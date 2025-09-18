<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from '#imports'

// Layout definieren
definePageMeta({
    layout: 'with-subnav',
    subNav: {
        titleKey: 'documentations.ollamaSetup.title',
        showBackButton: true,
        backTo: '/showcase',
        backLabel: 'Back to Showcase'
    }
})

// Setup composables
const { t } = useI18n()

// Color mapping for consistent theming
const colorMap = {
    blue: {
        gradient: 'from-blue-500 to-blue-600',
        bg: 'bg-blue-500'
    },
    green: {
        gradient: 'from-green-500 to-green-600',
        bg: 'bg-green-500'
    },
    purple: {
        gradient: 'from-purple-500 to-purple-600',
        bg: 'bg-purple-500'
    },
    orange: {
        gradient: 'from-orange-500 to-orange-600',
        bg: 'bg-orange-500'
    },
    red: {
        gradient: 'from-red-500 to-red-600',
        bg: 'bg-red-500'
    },
    emerald: {
        gradient: 'from-emerald-500 to-emerald-600',
        bg: 'bg-emerald-500'
    }
} as const

const getColorClasses = (color: string) => {
    return (colorMap as any)[color] || colorMap.blue
}

interface Command {
    command: string
    description: string
    note?: string
    isFile?: boolean
    fileName?: string
    fileContent?: string
    language?: string
}

interface SetupStep {
    id: string
    title: string
    description: string
    commands: Command[]
    note?: string
    icon: string
    color: string
}

const setupSteps: SetupStep[] = [
    {
        id: 'dependencies',
        title: 'documentations.ollamaSetup.steps.dependencies.title',
        description: 'documentations.ollamaSetup.steps.dependencies.description',
        commands: [
            {
                command: 'apt update -y && apt upgrade -y',
                description: 'documentations.ollamaSetup.commands.dependencies.updateAgain',
                language: 'bash'
            },
            {
                command: 'apt install sudo curl',
                description: 'documentations.ollamaSetup.commands.dependencies.installBasic',
                language: 'bash'
            }
        ],
        icon: 'mdi:package-variant',
        color: 'green'
    },
    {
        id: 'ollama',
        title: 'documentations.ollamaSetup.steps.ollama.title',
        description: 'documentations.ollamaSetup.steps.ollama.description',
        commands: [
            {
                command: 'curl -fsSL https://ollama.com/install.sh | sh',
                description: 'documentations.ollamaSetup.commands.ollama.install',
                language: 'bash'
            },
            {
                command: 'ollama run gemma2:2b',
                description: 'documentations.ollamaSetup.commands.ollama.testModel',
                language: 'bash'
            },
            {
                command: 'systemctl edit ollama.service',
                description: 'documentations.ollamaSetup.commands.ollama.configureService',
                isFile: true,
                fileName: '/etc/systemd/system/ollama.service.d/override.conf',
                fileContent: `[Service]
Environment="OLLAMA_NUM_PARALLEL=6"
Environment="OLLAMA_MAX_QUEUE=512"
Environment="OLLAMA_MAX_LOADED_MODELS=3"`,
                language: 'ini'
            },
            {
                command: 'sudo systemctl daemon-reexec',
                description: 'documentations.ollamaSetup.commands.ollama.reexec',
                language: 'bash'
            },
            {
                command: 'sudo systemctl daemon-reload',
                description: 'documentations.ollamaSetup.commands.ollama.reload',
                language: 'bash'
            },
            {
                command: 'sudo systemctl restart ollama',
                description: 'documentations.ollamaSetup.commands.ollama.restart',
                language: 'bash'
            }
        ],
        icon: 'mdi:robot-outline',
        color: 'purple'
    },
    {
        id: 'testing',
        title: 'documentations.ollamaSetup.steps.testing.title',
        description: 'documentations.ollamaSetup.steps.testing.description',
        commands: [
            {
                command: 'ollama list',
                description: 'documentations.ollamaSetup.commands.testing.listModels',
                language: 'bash'
            },
            {
                command: 'ollama ps',
                description: 'documentations.ollamaSetup.commands.testing.showRunning',
                language: 'bash'
            },
            {
                command: 'systemctl status ollama',
                description: 'documentations.ollamaSetup.commands.testing.checkService',
                language: 'bash'
            }
        ],
        icon: 'mdi:test-tube',
        color: 'blue'
    },
    {
        id: 'models',
        title: 'documentations.ollamaSetup.steps.models.title',
        description: 'documentations.ollamaSetup.steps.models.description',
        commands: [
            {
                command: 'ollama pull llama3.2:1b',
                description: 'documentations.ollamaSetup.commands.models.pullLlama',
                language: 'bash'
            },
            {
                command: 'ollama pull gemma2:2b',
                description: 'documentations.ollamaSetup.commands.models.pullGemma',
                language: 'bash'
            },
            {
                command: 'ollama pull codegemma:2b',
                description: 'documentations.ollamaSetup.commands.models.pullCodegemma',
                language: 'bash'
            }
        ],
        note: 'documentations.ollamaSetup.commands.models.sizeNote',
        icon: 'mdi:brain',
        color: 'orange'
    }
]

// Initialize expanded state
const getInitialExpandedState = () => {
    const initialState: Record<string, boolean> = {}
    setupSteps.forEach(step => {
        initialState[step.id] = true
    })
    return initialState
}
const isExpanded = ref<Record<string, boolean>>(getInitialExpandedState())

const importantNotes = [
    {
        id: 'hardware',
        title: 'documentations.ollamaSetup.notes.hardware.title',
        description: 'documentations.ollamaSetup.notes.hardware.description',
        icon: 'mdi:chip',
        color: 'blue'
    },
    {
        id: 'diskSpace',
        title: 'documentations.ollamaSetup.notes.diskSpace.title',
        description: 'documentations.ollamaSetup.notes.diskSpace.description',
        icon: 'mdi:harddisk',
        color: 'green'
    },
    {
        id: 'internetConnection',
        title: 'documentations.ollamaSetup.notes.internetConnection.title',
        description: 'documentations.ollamaSetup.notes.internetConnection.description',
        icon: 'mdi:wifi',
        color: 'purple'
    },
    {
        id: 'modelSizes',
        title: 'documentations.ollamaSetup.notes.modelSizes.title',
        description: 'documentations.ollamaSetup.notes.modelSizes.description',
        icon: 'mdi:weight',
        color: 'orange'
    },
    {
        id: 'performance',
        title: 'documentations.ollamaSetup.notes.performance.title',
        description: 'documentations.ollamaSetup.notes.performance.description',
        icon: 'mdi:speedometer',
        color: 'red'
    }
]

const additionalTips = [
    {
        id: 'optimization',
        title: 'documentations.ollamaSetup.tips.optimization.title',
        icon: 'mdi:tune',
        color: 'green',
        commands: [
            {
                command: 'ollama serve',
                description: 'documentations.ollamaSetup.commands.tips.serveManually',
                language: 'bash'
            }
        ]
    },
    {
        id: 'monitoring',
        title: 'documentations.ollamaSetup.tips.monitoring.title',
        icon: 'mdi:monitor-dashboard',
        color: 'blue',
        commands: [
            {
                command: 'htop',
                description: 'documentations.ollamaSetup.commands.tips.monitorResources',
                language: 'bash'
            },
            {
                command: 'journalctl -u ollama -f',
                description: 'documentations.ollamaSetup.commands.tips.followLogs',
                language: 'bash'
            }
        ]
    },
    {
        id: 'maintenance',
        title: 'documentations.ollamaSetup.tips.maintenance.title',
        icon: 'mdi:wrench',
        color: 'orange',
        commands: [
            {
                command: 'ollama rm <model-name>',
                description: 'documentations.ollamaSetup.commands.tips.removeModel',
                language: 'bash'
            }
        ]
    }
]

// Toggle step expansion
const toggleExpanded = (stepId: string) => {
    isExpanded.value[stepId] = !isExpanded.value[stepId]
}
</script>

<template>
    <!-- Hero Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4 md:gap-6">
        <div class="space-y-4">
            <h1 class="text-4xl md:text-6xl font-black text-gray-800 dark:text-white">
                {{ t('documentations.ollamaSetup.title') }}
            </h1>

            <p class="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
                {{ t('documentations.ollamaSetup.description') }}
            </p>

            <div class="flex flex-wrap justify-center gap-2">
                <span
                    class="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Ollama
                </span>
                <span
                    class="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    AI Models
                </span>
                <span
                    class="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    LLM
                </span>
                <span
                    class="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Debian
                </span>
            </div>
        </div>
    </section>

    <!-- Important Notes Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            Wichtige Hinweise
        </h2>

        <div class="max-w-4xl mx-auto text-center mb-8">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                Beachten Sie diese wichtigen Punkte vor dem Setup
            </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="note in importantNotes" :key="note.id"
                class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all">
                <div class="flex items-center gap-3 mb-4">
                    <div :class="[
                        'w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform',
                        getColorClasses(note.color).bg
                    ]">
                        <Icon :name="note.icon" class="w-6 h-6 text-white" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                        {{ t(note.title) }}
                    </h3>
                </div>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {{ t(note.description) }}
                </p>
            </div>
        </div>
    </section>

    <!-- Setup Steps Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center mb-8">
            Setup Schritte
        </h2>

        <div class="space-y-6">
            <div v-for="(step, index) in setupSteps" :key="step.id"
                class="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">

                <!-- Step Header -->
                <button @click="toggleExpanded(step.id)"
                    class="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl transition-colors">
                    <div class="flex items-center gap-4">
                        <div
                            :class="`w-12 h-12 bg-gradient-to-br ${getColorClasses(step.color).gradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`">
                            <span class="text-white font-bold text-lg">{{ index + 1 }}</span>
                        </div>
                        <div>
                            <div class="flex items-center gap-3 mb-1">
                                <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                                    {{ t(step.title) }}
                                </h3>
                            </div>
                            <p class="text-gray-600 dark:text-gray-300">
                                {{ t(step.description) }}
                            </p>
                        </div>
                    </div>
                    <Icon name="mdi:chevron-down"
                        :class="`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded[step.id] ? 'rotate-180' : ''}`" />
                </button>

                <!-- Step Content -->
                <div v-show="isExpanded[step.id]" class="px-6 pb-6">
                    <div class="pt-4">
                        <div class="space-y-4">
                            <div v-for="(cmd, cmdIndex) in step.commands" :key="cmdIndex">
                                <template v-if="!cmd.isFile">
                                    <UiCodeBlock :command="cmd.command" :description="t(cmd.description)"
                                        :note="cmd.note ? t(cmd.note) : undefined" :language="cmd.language" />
                                </template>
                                <template v-else>
                                    <UiCodeBlock :file-content="cmd.fileContent" :file-name="cmd.fileName"
                                        :language="cmd.language" is-file />
                                </template>
                            </div>
                        </div>
                        <div v-if="step.note"
                            class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl">
                            <div class="flex items-start gap-3">
                                <Icon name="mdi:information"
                                    class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <p class="text-blue-800 dark:text-blue-300 text-sm">
                                    {{ t(step.note) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Additional Tips Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ t('documentations.ollamaSetup.tips.sectionTitle') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg text-center max-w-4xl mx-auto mb-8">
            {{ t('documentations.ollamaSetup.tips.sectionSubtitle') }}
        </p>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(tip, tipIndex) in additionalTips" :key="tip.id"
                class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300">

                <div class="flex items-center gap-4 mb-4">
                    <div
                        :class="`w-12 h-12 bg-gradient-to-br ${getColorClasses(tip.color).gradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`">
                        <span class="text-white font-bold text-lg">{{ tipIndex + 1 }}</span>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                        {{ t(tip.title) }}
                    </h3>
                </div>

                <div class="space-y-4">
                    <div v-for="(cmd, cmdIndex) in tip.commands" :key="cmdIndex">
                        <UiCodeBlock :command="cmd.command" :description="t(cmd.description)"
                            :language="cmd.language" />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Completion Message -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <div
            class="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-700/50 rounded-2xl p-8 text-center">
            <div
                class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Icon name="mdi:check-circle" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">
                {{ t('documentations.ollamaSetup.completion.title') }}
            </h3>
            <p class="text-emerald-700 dark:text-emerald-200 text-lg max-w-2xl mx-auto">
                {{ t('documentations.ollamaSetup.completion.message') }}
            </p>
        </div>
    </section>
</template>

<style scoped>
/* Code block styling */
pre {
    margin: 0 !important;
    padding: 0 !important;
    background: transparent !important;
    border-radius: 0 !important;
    font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, 'Courier New', monospace !important;
    line-height: 1.5 !important;
}

code {
    font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, 'Courier New', monospace !important;
    background: transparent !important;
    padding: 0 !important;
    border-radius: 0 !important;
    font-size: inherit !important;
    line-height: inherit !important;
}

/* Better selection styles for code */
pre::selection {
    background: rgba(59, 130, 246, 0.3) !important;
}
</style>