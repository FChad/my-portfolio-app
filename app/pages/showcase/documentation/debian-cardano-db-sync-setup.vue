<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from '#imports'

// Layout definieren
definePageMeta({
    layout: 'with-subnav',
    subNav: {
        titleKey: 'documentations.cardanoDbSyncSetup.title',
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
        id: 'postgresql',
        title: 'documentations.cardanoDbSyncSetup.steps.postgresql.title',
        description: 'documentations.cardanoDbSyncSetup.steps.postgresql.description',
        commands: [
            {
                command: 'sudo apt install postgresql postgresql-contrib',
                description: 'documentations.cardanoDbSyncSetup.commands.postgresql.install',
                language: 'bash'
            },
            {
                command: 'sudo systemctl enable postgresql',
                description: 'documentations.cardanoDbSyncSetup.commands.postgresql.enable',
                language: 'bash'
            },
            {
                command: 'sudo systemctl start postgresql',
                description: 'documentations.cardanoDbSyncSetup.commands.postgresql.start',
                language: 'bash'
            }
        ],
        icon: 'mdi:database',
        color: 'blue'
    },
    {
        id: 'database',
        title: 'documentations.cardanoDbSyncSetup.steps.database.title',
        description: 'documentations.cardanoDbSyncSetup.steps.database.description',
        commands: [
            {
                command: 'sudo -u postgres psql',
                description: 'documentations.cardanoDbSyncSetup.commands.database.connect',
                language: 'bash'
            },
            {
                command: "CREATE USER cardano WITH PASSWORD 'PASSWORD';",
                description: 'documentations.cardanoDbSyncSetup.commands.database.createUser',
                note: 'documentations.cardanoDbSyncSetup.commands.database.passwordNote',
                language: 'sql'
            },
            {
                command: 'CREATE DATABASE cexplorer OWNER cardano;',
                description: 'documentations.cardanoDbSyncSetup.commands.database.createDatabase',
                language: 'sql'
            },
            {
                command: 'GRANT ALL PRIVILEGES ON DATABASE cexplorer TO cardano;',
                description: 'documentations.cardanoDbSyncSetup.commands.database.grantPrivileges',
                language: 'sql'
            },
            {
                command: '\\q',
                description: 'documentations.cardanoDbSyncSetup.commands.database.quit',
                language: 'sql'
            }
        ],
        icon: 'mdi:database-settings',
        color: 'green'
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
        id: 'prerequisite',
        title: 'documentations.cardanoDbSyncSetup.notes.prerequisite.title',
        description: 'documentations.cardanoDbSyncSetup.notes.prerequisite.description',
        icon: 'mdi:check-circle',
        color: 'blue'
    },
    {
        id: 'databaseSecurity',
        title: 'documentations.cardanoDbSyncSetup.notes.databaseSecurity.title',
        description: 'documentations.cardanoDbSyncSetup.notes.databaseSecurity.description',
        icon: 'mdi:shield-lock',
        color: 'green'
    },
    {
        id: 'syncTime',
        title: 'documentations.cardanoDbSyncSetup.notes.syncTime.title',
        description: 'documentations.cardanoDbSyncSetup.notes.syncTime.description',
        icon: 'mdi:timer-sand',
        color: 'purple'
    },
    {
        id: 'diskSpace',
        title: 'documentations.cardanoDbSyncSetup.notes.diskSpace.title',
        description: 'documentations.cardanoDbSyncSetup.notes.diskSpace.description',
        icon: 'mdi:harddisk',
        color: 'orange'
    },
    {
        id: 'cardanoNode',
        title: 'documentations.cardanoDbSyncSetup.notes.cardanoNode.title',
        description: 'documentations.cardanoDbSyncSetup.notes.cardanoNode.description',
        icon: 'mdi:cube-outline',
        color: 'red'
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
                {{ t('documentations.cardanoDbSyncSetup.title') }}
            </h1>

            <p class="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
                {{ t('documentations.cardanoDbSyncSetup.description') }}
            </p>

            <div class="flex flex-wrap justify-center gap-2">
                <span
                    class="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Cardano
                </span>
                <span
                    class="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    PostgreSQL
                </span>
                <span
                    class="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Database
                </span>
                <span
                    class="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Blockchain
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

    <!-- Completion Message -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <div
            class="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-700/50 rounded-2xl p-8 text-center">
            <div
                class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Icon name="mdi:check-circle" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">
                {{ t('documentations.cardanoDbSyncSetup.completion.title') }}
            </h3>
            <p class="text-emerald-700 dark:text-emerald-200 text-lg max-w-2xl mx-auto">
                {{ t('documentations.cardanoDbSyncSetup.completion.message') }}
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