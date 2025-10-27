<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useI18n } from '#imports'

definePageMeta({
    layout: 'with-subnav',
    subNav: {
        titleKey: 'documentations.cardanoDbSyncSetup.title',
        showBackButton: true,
        backTo: '/showcase'
    }
})

const { t } = useI18n()
const { getColorClasses } = useColorMapping()
const { setSeoMeta } = useSeo()

setSeoMeta({
    title: t('seo.documentation.cardanoDbSync.title'),
    description: t('seo.documentation.cardanoDbSync.description'),
    keywords: t('seo.documentation.cardanoDbSync.keywords')
})

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
}

interface AdditionalTip {
    id: string
    title: string
    commands: Command[]
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
        icon: 'mdi:database'
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
        icon: 'mdi:database-settings'
    },
    {
        id: 'clone-install',
        title: 'documentations.cardanoDbSyncSetup.steps.cloneInstall.title',
        description: 'documentations.cardanoDbSyncSetup.steps.cloneInstall.description',
        commands: [
            {
                command: 'sudo -i -u cardano',
                description: 'documentations.cardanoDbSyncSetup.commands.clone.switchUser',
                language: 'bash'
            },
            {
                command: 'git clone https://github.com/IntersectMBO/cardano-db-sync.git',
                description: 'documentations.cardanoDbSyncSetup.commands.clone.clone',
                language: 'bash'
            },
            {
                command: 'ls -al',
                description: 'documentations.cardanoDbSyncSetup.commands.clone.listFiles',
                language: 'bash'
            },
            {
                command: 'cd cardano-db-sync/',
                description: 'documentations.cardanoDbSyncSetup.commands.clone.changeDir',
                language: 'bash'
            },
            {
                command: 'git tag | sort -V',
                description: 'documentations.cardanoDbSyncSetup.commands.install.listTags',
                language: 'bash'
            },
            {
                command: 'git switch -d tags/13.6.0.5',
                description: 'documentations.cardanoDbSyncSetup.commands.install.checkout',
                language: 'bash'
            },
            {
                command: 'nix profile install .',
                description: 'documentations.cardanoDbSyncSetup.commands.install.nixInstall',
                note: 'documentations.cardanoDbSyncSetup.commands.install.nixNote',
                language: 'bash'
            },
            {
                command: 'cardano-db-sync --version',
                description: 'documentations.cardanoDbSyncSetup.commands.install.checkVersion',
                language: 'bash'
            },
            {
                command: 'nix profile list',
                description: 'documentations.cardanoDbSyncSetup.commands.install.listProfiles',
                language: 'bash'
            }
        ],
        icon: 'mdi:git'
    },
    {
        id: 'pgpass',
        title: 'documentations.cardanoDbSyncSetup.steps.pgpass.title',
        description: 'documentations.cardanoDbSyncSetup.steps.pgpass.description',
        commands: [
            {
                command: 'nano ~/cardano-config/.pgpass',
                description: 'documentations.cardanoDbSyncSetup.commands.pgpass.create',
                isFile: true,
                fileName: '~/cardano-config/.pgpass',
                fileContent: 'localhost:5432:cexplorer:cardano:PASSWORD',
                language: 'config'
            },
            {
                command: 'chmod 600 ~/cardano-config/.pgpass',
                description: 'documentations.cardanoDbSyncSetup.commands.pgpass.chmod',
                language: 'bash'
            },
            {
                command: 'exit',
                description: 'documentations.cardanoDbSyncSetup.commands.pgpass.exit',
                language: 'bash'
            }
        ],
        icon: 'mdi:key'
    },
    {
        id: 'symlink',
        title: 'documentations.cardanoDbSyncSetup.steps.symlink.title',
        description: 'documentations.cardanoDbSyncSetup.steps.symlink.description',
        commands: [
            {
                command: 'sudo ln -sf /home/cardano/.nix-profile/bin/cardano-db-sync /usr/local/bin/cardano-db-sync',
                description: 'documentations.cardanoDbSyncSetup.commands.symlink.create',
                language: 'bash'
            },
            {
                command: 'cardano-db-sync --version',
                description: 'documentations.cardanoDbSyncSetup.commands.symlink.verify',
                language: 'bash'
            }
        ],
        icon: 'mdi:link'
    },
    {
        id: 'service',
        title: 'documentations.cardanoDbSyncSetup.steps.service.title',
        description: 'documentations.cardanoDbSyncSetup.steps.service.description',
        commands: [
            {
                command: 'nano /etc/systemd/system/cardano-db-sync.service',
                description: 'documentations.cardanoDbSyncSetup.commands.service.create',
                isFile: true,
                fileName: '/etc/systemd/system/cardano-db-sync.service',
                fileContent: `[Unit]
Description=Cardano DB Sync
After=network.target cardano-node.service
Requires=cardano-node.service

[Service]
User=cardano
Group=cardano
WorkingDirectory=/home/cardano/cardano-config
Environment="PGPASSFILE=/home/cardano/cardano-config/.pgpass"
ExecStart=/usr/local/bin/cardano-db-sync \\
  --config /home/cardano/cardano-config/db-sync-config.json \\
  --socket-path /home/cardano/cardano-db/node.socket \\
  --state-dir /home/cardano/cardano-db-sync-state \\
  --schema-dir /home/cardano/cardano-db-sync/schema

Restart=on-failure
RestartSec=10
LimitNOFILE=32768

[Install]
WantedBy=multi-user.target`,
                language: 'ini'
            },
            {
                command: 'sudo systemctl daemon-reload',
                description: 'documentations.cardanoDbSyncSetup.commands.service.reload',
                language: 'bash'
            },
            {
                command: 'sudo systemctl enable cardano-db-sync',
                description: 'documentations.cardanoDbSyncSetup.commands.service.enable',
                language: 'bash'
            },
            {
                command: 'sudo systemctl start cardano-db-sync',
                description: 'documentations.cardanoDbSyncSetup.commands.service.start',
                language: 'bash'
            }
        ],
        icon: 'mdi:cog'
    },
    {
        id: 'monitoring',
        title: 'documentations.cardanoDbSyncSetup.steps.monitoring.title',
        description: 'documentations.cardanoDbSyncSetup.steps.monitoring.description',
        commands: [
            {
                command: 'sudo systemctl status cardano-db-sync',
                description: 'documentations.cardanoDbSyncSetup.commands.monitoring.status',
                language: 'bash'
            },
            {
                command: 'journalctl -u cardano-db-sync -f',
                description: 'documentations.cardanoDbSyncSetup.commands.monitoring.logs',
                language: 'bash'
            }
        ],
        icon: 'mdi:monitor-eye'
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

// Initialize expanded state for additional tips
const getInitialTipsExpandedState = () => {
    const initialState: Record<string, boolean> = {}
    additionalTips.forEach(tip => {
        initialState[tip.id] = false
    })
    return initialState
}
const isTipsExpanded = ref<Record<string, boolean>>({})

// Toggle tips expansion
const toggleTipsExpanded = (tipId: string) => {
    isTipsExpanded.value[tipId] = !isTipsExpanded.value[tipId]
}

const additionalTips: AdditionalTip[] = [
    {
        id: 'sync-status',
        title: 'documentations.cardanoDbSyncSetup.tips.syncStatus.title',
        commands: [
            {
                command: 'sudo -u postgres psql -d cexplorer -c "SELECT * FROM meta;"',
                description: 'documentations.cardanoDbSyncSetup.tips.syncStatus.checkMeta',
                language: 'bash'
            }
        ],
        icon: 'mdi:database-sync',
        color: 'blue'
    },
    {
        id: 'troubleshooting',
        title: 'documentations.cardanoDbSyncSetup.tips.troubleshooting.title',
        commands: [
            {
                command: 'sudo systemctl restart cardano-db-sync',
                description: 'documentations.cardanoDbSyncSetup.tips.troubleshooting.restart',
                language: 'bash'
            }
        ],
        icon: 'mdi:wrench',
        color: 'green'
    },
    {
        id: 'disk-space',
        title: 'documentations.cardanoDbSyncSetup.tips.diskSpace.title',
        commands: [
            {
                command: 'df -h /home/cardano/',
                description: 'documentations.cardanoDbSyncSetup.tips.diskSpace.check',
                language: 'bash'
            }
        ],
        icon: 'mdi:harddisk',
        color: 'red'
    }
]

// Initialize tips expanded state on mount
onMounted(() => {
    isTipsExpanded.value = getInitialTipsExpandedState()
})

// Toggle step expansion
const toggleExpanded = (stepId: string) => {
    isExpanded.value[stepId] = !isExpanded.value[stepId]
}
</script>

<template>
    <!-- Hero Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6">
        <h1 class="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ t('documentations.cardanoDbSyncSetup.title') }}
        </h1>

        <!-- Introduction -->
        <div class="max-w-4xl mx-auto text-center">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                {{ t('documentations.cardanoDbSyncSetup.description') }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 justify-center">
                <span v-for="tag in ['Debian 12', 'Cardano DB Sync', 'PostgreSQL', 'NIX', 'Blockchain']" :key="tag"
                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                    {{ tag }}
                </span>
            </div>
        </div>
    </section>

    <!-- Important Notes Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ t('documentations.cardanoDbSyncSetup.notes.title') }}
        </h2>

        <div class="max-w-4xl mx-auto text-center mb-8">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {{ t('documentations.cardanoDbSyncSetup.notes.subtitle') }}
            </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all">
                <div class="flex items-center gap-3 mb-4">
                    <div
                        class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform bg-blue-500">
                        <Icon name="mdi:server" class="w-6 h-6 text-white" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                        Cardano Node
                    </h3>
                </div>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {{ t('documentations.cardanoDbSyncSetup.notes.cardanoNode') }}
                </p>
            </div>
            <div class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all">
                <div class="flex items-center gap-3 mb-4">
                    <div
                        class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform bg-purple-500">
                        <Icon name="mdi:harddisk" class="w-6 h-6 text-white" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                        Speicherplatz
                    </h3>
                </div>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {{ t('documentations.cardanoDbSyncSetup.notes.diskSpace') }}
                </p>
            </div>
            <div class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all">
                <div class="flex items-center gap-3 mb-4">
                    <div
                        class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform bg-green-500">
                        <Icon name="mdi:memory" class="w-6 h-6 text-white" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                        RAM-Bedarf
                    </h3>
                </div>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {{ t('documentations.cardanoDbSyncSetup.notes.ramRequirement') }}
                </p>
            </div>
            <div class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all">
                <div class="flex items-center gap-3 mb-4">
                    <div
                        class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform bg-orange-500">
                        <Icon name="mdi:clock-outline" class="w-6 h-6 text-white" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                        Synchronisationszeit
                    </h3>
                </div>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {{ t('documentations.cardanoDbSyncSetup.notes.syncTime') }}
                </p>
            </div>
            <div class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all">
                <div class="flex items-center gap-3 mb-4">
                    <div
                        class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform bg-red-500">
                        <Icon name="mdi:shield-account" class="w-6 h-6 text-white" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                        Root-Zugriff
                    </h3>
                </div>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {{ t('documentations.cardanoDbSyncSetup.notes.rootAccess') }}
                </p>
            </div>
        </div>
    </section>

    <!-- Setup Steps Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
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
                            class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
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
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ t('documentations.cardanoDbSyncSetup.tips.sectionTitle') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg text-center max-w-4xl mx-auto mb-8">
            {{ t('documentations.cardanoDbSyncSetup.tips.sectionSubtitle') }}
        </p>

        <div class="flex flex-col gap-6">
            <div v-for="(tip, tipIndex) in additionalTips" :key="tip.id"
                class="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">

                <button @click="toggleTipsExpanded(tip.id)"
                    class="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-2xl">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                            <Icon :name="tip.icon" class="w-6 h-6 text-white" />
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                            {{ t(tip.title) }}
                        </h3>
                    </div>
                    <Icon :name="isTipsExpanded[tip.id] ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                        class="w-6 h-6 text-gray-400 transition-transform" />
                </button>

                <Transition name="expand">
                    <div v-show="isTipsExpanded[tip.id]" class="pt-4 px-6 pb-6">
                        <div class="space-y-4">
                            <div v-for="(cmd, cmdIndex) in tip.commands" :key="cmdIndex">
                                <UiCodeBlock :command="cmd.command" :description="t(cmd.description)"
                                    :language="cmd.language" />
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </section>

    <!-- Additional Resources Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ t('documentations.cardanoDbSyncSetup.resources.sectionTitle') }}
        </h2>

        <div class="max-w-4xl mx-auto text-center mb-8">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {{ t('documentations.cardanoDbSyncSetup.resources.sectionSubtitle') }}
            </p>
        </div>

        <div class="flex flex-col gap-6">
            <!-- Cardano DB Sync Documentation -->
            <NuxtLink external to="https://github.com/IntersectMBO/cardano-db-sync" target="_blank"
                class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-start gap-4">
                <div
                    class="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:github" class="w-6 h-6 text-white" />
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                        <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                            {{ t('documentations.cardanoDbSyncSetup.resources.github.title') }}
                        </h3>
                        <Icon name="mdi:external-link"
                            class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {{ t('documentations.cardanoDbSyncSetup.resources.github.description') }}
                    </p>
                </div>
            </NuxtLink>

            <!-- PostgreSQL Documentation -->
            <NuxtLink external to="https://www.postgresql.org/docs/" target="_blank"
                class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-start gap-4">
                <div
                    class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:database" class="w-6 h-6 text-white" />
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                        <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                            {{ t('documentations.cardanoDbSyncSetup.resources.postgresql.title') }}
                        </h3>
                        <Icon name="mdi:external-link"
                            class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {{ t('documentations.cardanoDbSyncSetup.resources.postgresql.description') }}
                    </p>
                </div>
            </NuxtLink>

            <!-- Cardano Developer Portal -->
            <NuxtLink external to="https://github.com/IntersectMBO/cardano-db-sync/blob/master/doc/running.md"
                target="_blank"
                class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-start gap-4">
                <div
                    class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:book-open-variant" class="w-6 h-6 text-white" />
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                        <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                            {{ t('documentations.cardanoDbSyncSetup.resources.cardanoDocs.title') }}
                        </h3>
                        <Icon name="mdi:external-link"
                            class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {{ t('documentations.cardanoDbSyncSetup.resources.cardanoDocs.description') }}
                    </p>
                </div>
            </NuxtLink>
        </div>
    </section>

    <!-- Completion Message -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
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