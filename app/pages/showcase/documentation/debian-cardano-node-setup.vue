<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from '#imports'

// Layout definieren
definePageMeta({
    layout: 'with-subnav',
    subNav: {
        titleKey: 'documentations.cardanoNodeSetup.title',
        showBackButton: true,
        backTo: '/showcase',
        backLabel: 'Back to Showcase'
    }
})

// Setup composables
const { t } = useI18n()
const { getColorClasses } = useColorMapping()
const { setSeoMeta, getStructuredData } = useSeo()

// SEO Implementation
setSeoMeta({
    title: t('seo.documentation.cardanoNode.title'),
    description: t('seo.documentation.cardanoNode.description'),
    keywords: t('seo.documentation.cardanoNode.keywords'),
    type: 'article'
})

// Add structured data for article
useHead(() => ({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(getStructuredData('Article'))
        }
    ]
}))

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
        title: 'documentations.cardanoNodeSetup.steps.dependencies.title',
        description: 'documentations.cardanoNodeSetup.steps.dependencies.description',
        commands: [
            {
                command: 'sudo apt update && sudo apt install -y git tmux curl',
                description: 'documentations.cardanoNodeSetup.commands.dependencies.installDeps',
                language: 'bash'
            }
        ],
        icon: 'mdi:package-variant',
        color: 'green'
    },
    {
        id: 'nix',
        title: 'documentations.cardanoNodeSetup.steps.nix.title',
        description: 'documentations.cardanoNodeSetup.steps.nix.description',
        commands: [
            {
                command: 'sh <(curl --proto \'=https\' --tlsv1.2 -L https://nixos.org/nix/install) --daemon',
                description: 'documentations.cardanoNodeSetup.commands.nix.install',
                language: 'bash'
            },
            {
                command: 'reboot',
                description: 'documentations.cardanoNodeSetup.commands.nix.reboot',
                language: 'bash'
            },
            {
                command: 'nix --version',
                description: 'documentations.cardanoNodeSetup.commands.nix.verify',
                language: 'bash'
            }
        ],
        note: 'documentations.cardanoNodeSetup.commands.nix.rebootNote',
        icon: 'mdi:package-down',
        color: 'blue'
    },
    {
        id: 'nixconfig',
        title: 'documentations.cardanoNodeSetup.steps.nixconfig.title',
        description: 'documentations.cardanoNodeSetup.steps.nixconfig.description',
        commands: [
            {
                command: 'nano /etc/nix/nix.conf',
                description: 'documentations.cardanoNodeSetup.commands.nixconfig.editConfig',
                isFile: true,
                fileName: '/etc/nix/nix.conf',
                fileContent: 'build-users-group = nixbld\nexperimental-features = nix-command flakes\ntrusted-users = root cardano',
                language: 'config'
            },
            {
                command: 'systemctl restart nix-daemon.service',
                description: 'documentations.cardanoNodeSetup.commands.nixconfig.restart',
                language: 'bash'
            }
        ],
        icon: 'mdi:cog',
        color: 'orange'
    },
    {
        id: 'user',
        title: 'documentations.cardanoNodeSetup.steps.user.title',
        description: 'documentations.cardanoNodeSetup.steps.user.description',
        commands: [
            {
                command: 'sudo useradd -m cardano',
                description: 'documentations.cardanoNodeSetup.commands.user.create',
                language: 'bash'
            },
            {
                command: 'sudo usermod -aG sudo cardano',
                description: 'documentations.cardanoNodeSetup.commands.user.addSudo',
                language: 'bash'
            },
            {
                command: 'sudo passwd cardano',
                description: 'documentations.cardanoNodeSetup.commands.user.setPassword',
                language: 'bash'
            }
        ],
        icon: 'mdi:account-plus',
        color: 'purple'
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
        id: 'nodeRequirements',
        title: 'documentations.cardanoNodeSetup.notes.nodeRequirements.title',
        description: 'documentations.cardanoNodeSetup.notes.nodeRequirements.description',
        icon: 'mdi:server',
        color: 'blue'
    },
    {
        id: 'nixDaemon',
        title: 'documentations.cardanoNodeSetup.notes.nixDaemon.title',
        description: 'documentations.cardanoNodeSetup.notes.nixDaemon.description',
        icon: 'mdi:cog',
        color: 'green'
    },
    {
        id: 'diskSpace',
        title: 'documentations.cardanoNodeSetup.notes.diskSpace.title',
        description: 'documentations.cardanoNodeSetup.notes.diskSpace.description',
        icon: 'mdi:harddisk',
        color: 'purple'
    },
    {
        id: 'syncTime',
        title: 'documentations.cardanoNodeSetup.notes.syncTime.title',
        description: 'documentations.cardanoNodeSetup.notes.syncTime.description',
        icon: 'mdi:timer-sand',
        color: 'orange'
    },
    {
        id: 'networkStability',
        title: 'documentations.cardanoNodeSetup.notes.networkStability.title',
        description: 'documentations.cardanoNodeSetup.notes.networkStability.description',
        icon: 'mdi:wifi-strength-4',
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
                {{ t('documentations.cardanoNodeSetup.title') }}
            </h1>

            <p class="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
                {{ t('documentations.cardanoNodeSetup.description') }}
            </p>

            <div class="flex flex-wrap justify-center gap-2">
                <span
                    class="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Cardano Node
                </span>
                <span
                    class="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Nix
                </span>
                <span
                    class="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Debian
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
                {{ t('documentations.cardanoNodeSetup.completion.title') }}
            </h3>
            <p class="text-emerald-700 dark:text-emerald-200 text-lg max-w-2xl mx-auto">
                {{ t('documentations.cardanoNodeSetup.completion.message') }}
            </p>
        </div>
    </section>
</template>