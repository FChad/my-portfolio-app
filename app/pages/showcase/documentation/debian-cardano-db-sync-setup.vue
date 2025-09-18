<script lang="ts" setup>
import { ref } from 'vue'
import { useLocalePath, useI18n } from '#imports'

// Layout definieren
definePageMeta({
    layout: 'with-subnav',
    subNav: {
        titleKey: 'documentations.debianCardanoDbSyncSetup.title',
        showBackButton: true,
        backTo: '/showcase',
        backLabel: 'Back to Showcase'
    }
})

// Setup composables
const localePath = useLocalePath()
const { t } = useI18n()
const isExpanded = ref<Record<string, boolean>>({})

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
        icon: 'mdi:database',
        color: 'from-blue-500 to-indigo-600'
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
        color: 'from-green-500 to-emerald-600'
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
        icon: 'mdi:git',
        color: 'from-orange-500 to-red-600'
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
        icon: 'mdi:key',
        color: 'from-cyan-500 to-blue-600'
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
        icon: 'mdi:link',
        color: 'from-pink-500 to-rose-600'
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
                language: 'systemd'
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
        icon: 'mdi:cog',
        color: 'from-teal-500 to-green-600'
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
        icon: 'mdi:monitor-eye',
        color: 'from-indigo-500 to-purple-600'
    }
]

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
        color: 'from-blue-500 to-indigo-600'
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
        color: 'from-amber-500 to-orange-600'
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
        color: 'from-emerald-500 to-teal-600'
    }
]

const toggleExpanded = (stepId: string) => {
    isExpanded.value[stepId] = !isExpanded.value[stepId]
}

onMounted(() => {
    // Initialize all steps as expanded
    setupSteps.forEach(step => {
        isExpanded.value[step.id] = true
    })
})
</script>

<template>
    <div class="w-full">
        <!-- Content Area -->
        <div class="w-full">
            <!-- Hero Section -->
            <div class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8 md:pb-12">
                <div class="text-center mb-6 sm:mb-8 md:mb-12">
                    <!-- Main Icon -->
                    <div
                        class="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 mb-4 sm:mb-5 md:mb-6">
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl blur-xl animate-pulse">
                        </div>
                        <div
                            class="relative w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl flex items-center justify-center">
                            <Icon name="mdi:database-sync"
                                class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 text-white" />
                        </div>
                    </div>

                    <!-- Title -->
                    <h1
                        class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
                        {{ t('documentations.cardanoDbSyncSetup.title') }}
                    </h1>

                    <!-- Description -->
                    <p
                        class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
                        {{ t('documentations.cardanoDbSyncSetup.description') }}
                    </p>

                    <!-- Tags -->
                    <div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-4">
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            Debian 12
                        </span>
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            Cardano DB Sync
                        </span>
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            PostgreSQL
                        </span>
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            NIX
                        </span>
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            Blockchain
                        </span>
                    </div>
                </div>

                <!-- Important Notes Section -->
                <div class="mb-8 sm:mb-12">
                    <div
                        class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-200/60 dark:border-gray-700/60 shadow-xl">
                        <div class="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                            <div
                                class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                                <Icon name="mdi:alert-circle" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                                {{ t('documentations.cardanoDbSyncSetup.notes.title') }}
                            </h2>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                            <div
                                class="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/60 dark:border-gray-600/40">
                                <Icon name="mdi:check-circle"
                                    class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {{ t('documentations.cardanoDbSyncSetup.notes.cardanoNode') }}
                                </span>
                            </div>
                            <div
                                class="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/60 dark:border-gray-600/40">
                                <Icon name="mdi:check-circle"
                                    class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {{ t('documentations.cardanoDbSyncSetup.notes.diskSpace') }}
                                </span>
                            </div>
                            <div
                                class="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/60 dark:border-gray-600/40">
                                <Icon name="mdi:check-circle"
                                    class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {{ t('documentations.cardanoDbSyncSetup.notes.ramRequirement') }}
                                </span>
                            </div>
                            <div
                                class="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/60 dark:border-gray-600/40">
                                <Icon name="mdi:check-circle"
                                    class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {{ t('documentations.cardanoDbSyncSetup.notes.syncTime') }}
                                </span>
                            </div>
                            <div
                                class="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/60 dark:border-gray-600/40">
                                <Icon name="mdi:check-circle"
                                    class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {{ t('documentations.cardanoDbSyncSetup.notes.rootAccess') }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Steps Overview -->
                <div class="max-w-7xl mx-auto mb-8 sm:mb-12">
                    <div class="text-center mb-6 sm:mb-8">
                        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {{ t('documentations.cardanoDbSyncSetup.steps.title') }}
                        </h2>
                        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4">
                            {{ t('documentations.cardanoDbSyncSetup.stepsSubtitle') }}
                        </p>
                    </div>

                    <!-- Steps List -->
                    <div class="space-y-4 sm:space-y-6 md:space-y-8">
                        <div v-for="(step, index) in setupSteps" :key="step.id" class="group relative">
                            <!-- Step Card -->
                            <div
                                class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-gray-200/60 dark:border-gray-700/60 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl touch-manipulation">

                                <!-- Step Header -->
                                <div class="p-4 sm:p-6 md:p-8 pb-4 sm:pb-5 md:pb-6">
                                    <div class="flex items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                        <!-- Step Number -->
                                        <div class="flex items-center gap-3 sm:gap-4">
                                            <div class="relative flex-shrink-0">
                                                <div
                                                    :class="`absolute inset-0 bg-gradient-to-r ${step.color} rounded-lg sm:rounded-xl blur-lg opacity-30 animate-pulse`">
                                                </div>
                                                <div
                                                    :class="`relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${step.color} rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center`">
                                                    <span
                                                        class="text-white font-bold text-sm sm:text-base md:text-lg">{{
                                                            index + 1 }}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Step Title -->
                                        <div class="flex-1 min-w-0">
                                            <h3
                                                class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                                                {{ t(step.title) }}
                                            </h3>
                                            <p
                                                class="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                                {{ t(step.description) }}
                                            </p>
                                        </div>

                                        <!-- Toggle Button -->
                                        <button @click="toggleExpanded(step.id)"
                                            class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-all duration-300 group-hover:scale-105 touch-manipulation flex-shrink-0">
                                            <Icon name="mdi:chevron-down"
                                                :class="`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${isExpanded[step.id] ? 'rotate-180' : ''}`" />
                                        </button>
                                    </div>
                                </div>

                                <!-- Commands Section -->
                                <div v-show="isExpanded[step.id]"
                                    class="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 transition-all duration-300 ease-in-out">
                                    <!-- Step Note if exists -->
                                    <div v-if="step.note" class="mb-4 sm:mb-6">
                                        <div
                                            class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-lg sm:rounded-xl p-3 sm:p-4">
                                            <div class="flex items-start gap-2 sm:gap-3">
                                                <Icon name="mdi:information"
                                                    class="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                                                <p
                                                    class="text-xs sm:text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                                                    {{ t(step.note) }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-4 sm:space-y-6">
                                        <div v-for="(cmd, cmdIndex) in step.commands" :key="cmdIndex">
                                            <!-- Regular Command -->
                                            <template v-if="!cmd.isFile">
                                                <UiCodeBlock :command="cmd.command" :description="t(cmd.description)"
                                                    :note="cmd.note ? t(cmd.note) : undefined"
                                                    :language="cmd.language" />
                                            </template>

                                            <!-- File Content -->
                                            <template v-else>
                                                <UiCodeBlock :file-content="cmd.fileContent" :file-name="cmd.fileName"
                                                    :language="cmd.language" is-file />
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Additional Tips Section -->
                <div class="mb-8 sm:mb-12">
                    <div class="text-center mb-6 sm:mb-8">
                        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {{ t('documentations.cardanoDbSyncSetup.tips.sectionTitle') }}
                        </h2>
                        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4">
                            {{ t('documentations.cardanoDbSyncSetup.tips.sectionSubtitle') }}
                        </p>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                        <div v-for="tip in additionalTips" :key="tip.id"
                            class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200/60 dark:border-gray-700/60 shadow-xl hover:shadow-2xl transition-all duration-300">

                            <!-- Tip Header -->
                            <div class="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div
                                    :class="`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br ${tip.color} rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center flex-shrink-0`">
                                    <Icon :name="tip.icon" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                                    {{ t(tip.title) }}
                                </h3>
                            </div>

                            <!-- Commands -->
                            <div class="space-y-3 sm:space-y-4">
                                <div v-for="(cmd, cmdIndex) in tip.commands" :key="cmdIndex">
                                    <UiCodeBlock :command="cmd.command" :description="t(cmd.description)"
                                        :language="cmd.language" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Additional Resources Section -->
                <div class="mb-8 sm:mb-12">
                    <div class="text-center mb-6 sm:mb-8">
                        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {{ t('documentations.cardanoDbSyncSetup.resources.sectionTitle') }}
                        </h2>
                        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4">
                            {{ t('documentations.cardanoDbSyncSetup.resources.sectionSubtitle') }}
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                        <!-- Cardano DB Sync Documentation -->
                        <a href="https://github.com/IntersectMBO/cardano-db-sync" target="_blank"
                            rel="noopener noreferrer"
                            class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200/60 dark:border-gray-700/60 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                            <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <div
                                    class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                                    <Icon name="mdi:github" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                                    {{ t('documentations.cardanoDbSyncSetup.resources.github.title') }}
                                </h3>
                                <Icon name="mdi:external-link"
                                    class="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                            </div>
                            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                {{ t('documentations.cardanoDbSyncSetup.resources.github.description') }}
                            </p>
                        </a>

                        <!-- PostgreSQL Documentation -->
                        <a href="https://www.postgresql.org/docs/" target="_blank" rel="noopener noreferrer"
                            class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200/60 dark:border-gray-700/60 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                            <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <div
                                    class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                                    <Icon name="mdi:database" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                                    {{ t('documentations.cardanoDbSyncSetup.resources.postgresql.title') }}
                                </h3>
                                <Icon name="mdi:external-link"
                                    class="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                            </div>
                            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                {{ t('documentations.cardanoDbSyncSetup.resources.postgresql.description') }}
                            </p>
                        </a>

                        <!-- Cardano Developer Portal -->
                        <a href="https://github.com/IntersectMBO/cardano-db-sync/blob/master/doc/running.md"
                            target="_blank" rel="noopener noreferrer"
                            class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200/60 dark:border-gray-700/60 shadow-xl hover:shadow-2xl transition-all duration-300 group md:col-span-2 lg:col-span-1">
                            <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <div
                                    class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                                    <Icon name="mdi:book-open-variant"
                                        class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                                    {{ t('documentations.cardanoDbSyncSetup.resources.cardanoDocs.title') }}
                                </h3>
                                <Icon name="mdi:external-link"
                                    class="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                            </div>
                            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                {{ t('documentations.cardanoDbSyncSetup.resources.cardanoDocs.description') }}
                            </p>
                        </a>
                    </div>
                </div>

                <!-- Completion Message -->
                <div class="text-center">
                    <div
                        class="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-emerald-200/60 dark:border-emerald-700/60">
                        <div
                            class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg sm:rounded-xl shadow-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <Icon name="mdi:check-circle" class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                        </div>
                        <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {{ t('documentations.cardanoDbSyncSetup.completion.title') }}
                        </h3>
                        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                            {{ t('documentations.cardanoDbSyncSetup.completion.message') }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
/* Code block styling without HighlightJS */
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