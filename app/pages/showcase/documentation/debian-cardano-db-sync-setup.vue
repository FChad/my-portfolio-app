<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from '#imports'

// Layout definieren
definePageMeta({
    layout: 'with-subnav',
    subNav: {
        titleKey: 'documentations.cardanoDbSyncSetup.title',
        showBackButton: true,
        backTo: '/showcase'
    }
})

// Setup composables
const { t } = useI18n()
const { getColorClasses } = useColorMapping()
const { setSeoMeta, getStructuredData } = useSeo()

// SEO Implementation
setSeoMeta({
    title: t('seo.documentation.cardanoDbSync.title'),
    description: t('seo.documentation.cardanoDbSync.description'),
    keywords: t('seo.documentation.cardanoDbSync.keywords'),
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
        color: 'orange'
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
        color: 'cyan'
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
        color: 'pink'
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
        icon: 'mdi:cog',
        color: 'teal'
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
        color: 'indigo'
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
                    Debian 12
                </span>
                <span
                    class="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Cardano DB Sync
                </span>
                <span
                    class="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    PostgreSQL
                </span>
                <span
                    class="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    NIX
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
            {{ t('documentations.cardanoDbSyncSetup.notes.title') }}
        </h2>

        <div class="max-w-4xl mx-auto text-center mb-8">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {{ t('documentations.cardanoDbSyncSetup.notes.subtitle') }}
            </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md">
            <div class="grid md:grid-cols-2 gap-4">
                <div class="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <Icon name="mdi:check-circle" class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span class="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {{ t('documentations.cardanoDbSyncSetup.notes.cardanoNode') }}
                    </span>
                </div>
                <div class="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <Icon name="mdi:check-circle" class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span class="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {{ t('documentations.cardanoDbSyncSetup.notes.diskSpace') }}
                    </span>
                </div>
                <div class="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <Icon name="mdi:check-circle" class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span class="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {{ t('documentations.cardanoDbSyncSetup.notes.ramRequirement') }}
                    </span>
                </div>
                <div class="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <Icon name="mdi:check-circle" class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span class="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {{ t('documentations.cardanoDbSyncSetup.notes.syncTime') }}
                    </span>
                </div>
                <div class="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 md:col-span-2">
                    <Icon name="mdi:check-circle" class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span class="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {{ t('documentations.cardanoDbSyncSetup.notes.rootAccess') }}
                    </span>
                </div>
            </div>
        </div>
    </section>

    <!-- Setup Steps Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ t('documentations.cardanoDbSyncSetup.steps.title') }}
        </h2>

        <div class="max-w-4xl mx-auto text-center mb-8">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {{ t('documentations.cardanoDbSyncSetup.stepsSubtitle') }}
            </p>
        </div>

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
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ t('documentations.cardanoDbSyncSetup.tips.sectionTitle') }}
        </h2>

        <div class="max-w-4xl mx-auto text-center mb-8">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {{ t('documentations.cardanoDbSyncSetup.tips.sectionSubtitle') }}
            </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
            <div v-for="tip in additionalTips" :key="tip.id"
                class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all">
                <div class="flex items-center gap-3 mb-6">
                    <div :class="[
                        'w-12 h-12 rounded-xl flex items-center justify-center shadow-lg',
                        getColorClasses(tip.color).bg
                    ]">
                        <Icon :name="tip.icon" class="w-6 h-6 text-white" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white">
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

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Cardano DB Sync Documentation -->
            <NuxtLink external to="https://github.com/IntersectMBO/cardano-db-sync" target="_blank"
                class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all">
                <div class="flex items-center gap-3 mb-4">
                    <div
                        class="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center">
                        <Icon name="mdi:github" class="w-6 h-6 text-white" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white flex-1">
                        {{ t('documentations.cardanoDbSyncSetup.resources.github.title') }}
                    </h3>
                    <Icon name="mdi:external-link"
                        class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                </div>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {{ t('documentations.cardanoDbSyncSetup.resources.github.description') }}
                </p>
            </NuxtLink>

            <!-- PostgreSQL Documentation -->
            <NuxtLink external to="https://www.postgresql.org/docs/" target="_blank"
                class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all">
                <div class="flex items-center gap-3 mb-4">
                    <div
                        class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center">
                        <Icon name="mdi:database" class="w-6 h-6 text-white" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white flex-1">
                        {{ t('documentations.cardanoDbSyncSetup.resources.postgresql.title') }}
                    </h3>
                    <Icon name="mdi:external-link"
                        class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                </div>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {{ t('documentations.cardanoDbSyncSetup.resources.postgresql.description') }}
                </p>
            </NuxtLink>

            <!-- Cardano Developer Portal -->
            <NuxtLink external to="https://github.com/IntersectMBO/cardano-db-sync/blob/master/doc/running.md"
                target="_blank"
                class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all md:col-span-2 lg:col-span-1">
                <div class="flex items-center gap-3 mb-4">
                    <div
                        class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg flex items-center justify-center">
                        <Icon name="mdi:book-open-variant" class="w-6 h-6 text-white" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white flex-1">
                        {{ t('documentations.cardanoDbSyncSetup.resources.cardanoDocs.title') }}
                    </h3>
                    <Icon name="mdi:external-link"
                        class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                </div>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {{ t('documentations.cardanoDbSyncSetup.resources.cardanoDocs.description') }}
                </p>
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