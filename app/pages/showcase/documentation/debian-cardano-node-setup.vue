<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useI18n } from '#imports'

// Layout definieren
definePageMeta({
    layout: 'with-subnav',
    subNav: {
        titleKey: 'documentations.cardanoNodeSetup.title',
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
        icon: 'mdi:package-variant'
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
        icon: 'mdi:package-down'
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
        icon: 'mdi:cog'
    },
    {
        id: 'user',
        title: 'documentations.cardanoNodeSetup.steps.user.title',
        description: 'documentations.cardanoNodeSetup.steps.user.description',
        commands: [
            {
                command: 'sudo useradd -m -s /bin/bash cardano',
                description: 'documentations.cardanoNodeSetup.commands.user.createUser',
                language: 'bash'
            }
        ],
        icon: 'mdi:account-plus'
    },
    {
        id: 'install',
        title: 'documentations.cardanoNodeSetup.steps.install.title',
        description: 'documentations.cardanoNodeSetup.steps.install.description',
        commands: [
            {
                command: 'sudo -i -u cardano',
                description: 'documentations.cardanoNodeSetup.commands.install.switchUser',
                language: 'bash'
            },
            {
                command: 'git clone https://github.com/IntersectMBO/cardano-node',
                description: 'documentations.cardanoNodeSetup.commands.install.clone',
                language: 'bash'
            },
            {
                command: 'cd cardano-node',
                description: 'documentations.cardanoNodeSetup.commands.install.changeDir',
                language: 'bash'
            },
            {
                command: 'git tag | sort -V',
                description: 'documentations.cardanoNodeSetup.commands.install.listTags',
                language: 'bash'
            },
            {
                command: 'git switch -d tags/10.4.1',
                description: 'documentations.cardanoNodeSetup.commands.install.checkout',
                language: 'bash'
            },
            {
                command: 'nix profile install .#cardano-node .#cardano-cli',
                description: 'documentations.cardanoNodeSetup.commands.install.profileInstall',
                note: 'documentations.cardanoNodeSetup.commands.install.profileNote',
                language: 'bash'
            },
            {
                command: 'nix profile list',
                description: 'documentations.cardanoNodeSetup.commands.install.profileList',
                language: 'bash'
            },
            {
                command: '~/.nix-profile/bin/cardano-node --version',
                description: 'documentations.cardanoNodeSetup.commands.install.checkNode',
                language: 'bash'
            },
            {
                command: '~/.nix-profile/bin/cardano-cli --version',
                description: 'documentations.cardanoNodeSetup.commands.install.checkCli',
                language: 'bash'
            },
            {
                command: 'exit',
                description: 'documentations.cardanoNodeSetup.commands.install.exitUser',
                language: 'bash'
            }
        ],
        icon: 'mdi:hammer-wrench'
    },
    {
        id: 'symlinks',
        title: 'documentations.cardanoNodeSetup.steps.symlinks.title',
        description: 'documentations.cardanoNodeSetup.steps.symlinks.description',
        commands: [
            {
                command: 'sudo ln -sf /home/cardano/.nix-profile/bin/cardano-node /usr/local/bin/cardano-node',
                description: 'documentations.cardanoNodeSetup.commands.symlinks.linkNode',
                language: 'bash'
            },
            {
                command: 'sudo ln -sf /home/cardano/.nix-profile/bin/cardano-cli /usr/local/bin/cardano-cli',
                description: 'documentations.cardanoNodeSetup.commands.symlinks.linkCli',
                language: 'bash'
            },
            {
                command: 'ls -la /usr/local/bin/cardano-*',
                description: 'documentations.cardanoNodeSetup.commands.symlinks.verifyLinks',
                language: 'bash'
            },
            {
                command: 'cardano-node --version',
                description: 'documentations.cardanoNodeSetup.commands.symlinks.testNode',
                language: 'bash'
            },
            {
                command: 'cardano-cli --version',
                description: 'documentations.cardanoNodeSetup.commands.symlinks.testCli',
                language: 'bash'
            }
        ],
        note: 'documentations.cardanoNodeSetup.commands.symlinks.profileNote',
        icon: 'mdi:link'
    },
    {
        id: 'config',
        title: 'documentations.cardanoNodeSetup.steps.config.title',
        description: 'documentations.cardanoNodeSetup.steps.config.description',
        commands: [
            {
                command: 'sudo -i -u cardano',
                description: 'documentations.cardanoNodeSetup.commands.config.switchUser',
                language: 'bash'
            },
            {
                command: 'mkdir -p ~/cardano-config ~/cardano-db',
                description: 'documentations.cardanoNodeSetup.commands.config.createDirs',
                language: 'bash'
            },
            {
                command: 'cd ~/cardano-config',
                description: 'documentations.cardanoNodeSetup.commands.config.changeDir',
                language: 'bash'
            },
            {
                command: 'curl -O -J "https://book.play.dev.cardano.org/environments/mainnet/{config,db-sync-config,submit-api-config,topology,byron-genesis,shelley-genesis,alonzo-genesis,conway-genesis,checkpoints}.json"',
                description: 'documentations.cardanoNodeSetup.commands.config.downloadConfigs',
                language: 'bash'
            },
            {
                command: 'ls -lh *.json',
                description: 'documentations.cardanoNodeSetup.commands.config.listConfigs',
                language: 'bash'
            },
            {
                command: 'head -20 config.json',
                description: 'documentations.cardanoNodeSetup.commands.config.checkConfig',
                language: 'bash'
            },
            {
                command: 'exit',
                description: 'documentations.cardanoNodeSetup.commands.config.exitUser',
                language: 'bash'
            }
        ],
        icon: 'mdi:file-cog'
    },
    {
        id: 'service',
        title: 'documentations.cardanoNodeSetup.steps.service.title',
        description: 'documentations.cardanoNodeSetup.steps.service.description',
        commands: [
            {
                command: 'nano /etc/systemd/system/cardano-node.service',
                description: 'documentations.cardanoNodeSetup.commands.service.createService',
                isFile: true,
                fileName: '/etc/systemd/system/cardano-node.service',
                fileContent: `[Unit]
Description=Cardano Node
After=network.target

[Service]
User=cardano
Group=cardano
WorkingDirectory=/home/cardano/cardano-config
ExecStart=/usr/local/bin/cardano-node run \\
  --topology /home/cardano/cardano-config/topology.json \\
  --database-path /home/cardano/cardano-db \\
  --socket-path /home/cardano/cardano-db/node.socket \\
  --host-addr 0.0.0.0 \\
  --port 3001 \\
  --config /home/cardano/cardano-config/config.json
Restart=on-failure
RestartSec=10
LimitNOFILE=32768

[Install]
WantedBy=multi-user.target`,
                language: 'ini'
            },
            {
                command: 'systemctl daemon-reload',
                description: 'documentations.cardanoNodeSetup.commands.service.reload',
                language: 'bash'
            },
            {
                command: 'systemctl enable cardano-node',
                description: 'documentations.cardanoNodeSetup.commands.service.enable',
                language: 'bash'
            },
            {
                command: 'systemctl start cardano-node',
                description: 'documentations.cardanoNodeSetup.commands.service.start',
                language: 'bash'
            }
        ],
        icon: 'mdi:server'
    },
    {
        id: 'monitor',
        title: 'documentations.cardanoNodeSetup.steps.monitor.title',
        description: 'documentations.cardanoNodeSetup.steps.monitor.description',
        commands: [
            {
                command: 'journalctl -u cardano-node -f',
                description: 'documentations.cardanoNodeSetup.commands.monitor.logs',
                language: 'bash'
            },
            {
                command: 'cardano-cli query tip --socket-path /home/cardano/cardano-db/node.socket --mainnet',
                description: 'documentations.cardanoNodeSetup.commands.monitor.syncProgress',
                language: 'bash'
            }
        ],
        note: 'documentations.cardanoNodeSetup.commands.monitor.syncNote',
        icon: 'mdi:monitor-dashboard'
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

const additionalTips = [
    {
        id: 'sync',
        title: 'documentations.cardanoNodeSetup.tips.sync.title',
        icon: 'mdi:sync',
        color: 'blue',
        commands: [
            {
                command: 'systemctl status cardano-node',
                description: 'documentations.cardanoNodeSetup.commands.tips.syncStatus',
                language: 'bash'
            },
            {
                command: 'du -sh /home/cardano/cardano-db',
                description: 'documentations.cardanoNodeSetup.commands.tips.syncSize',
                language: 'bash'
            }
        ]
    },
    {
        id: 'maintenance',
        title: 'documentations.cardanoNodeSetup.tips.maintenance.title',
        icon: 'mdi:wrench',
        color: 'green',
        commands: [
            {
                command: 'systemctl restart cardano-node',
                description: 'documentations.cardanoNodeSetup.commands.tips.restart',
                language: 'bash'
            },
            {
                command: 'systemctl stop cardano-node',
                description: 'documentations.cardanoNodeSetup.commands.tips.stop',
                language: 'bash'
            }
        ]
    },
    {
        id: 'troubleshooting',
        title: 'documentations.cardanoNodeSetup.tips.troubleshooting.title',
        icon: 'mdi:bug',
        color: 'red',
        commands: [
            {
                command: 'journalctl -u cardano-node --no-pager -l',
                description: 'documentations.cardanoNodeSetup.commands.tips.fullLogs',
                language: 'bash'
            },
            {
                command: 'ps aux | grep cardano',
                description: 'documentations.cardanoNodeSetup.commands.tips.checkProcess',
                language: 'bash'
            }
        ]
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
            {{ t('documentations.cardanoNodeSetup.title') }}
        </h1>

        <!-- Introduction -->
        <div class="max-w-4xl mx-auto text-center">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                {{ t('documentations.cardanoNodeSetup.description') }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 justify-center">
                <span v-for="tag in ['Cardano Node', 'Nix', 'Debian', 'Blockchain']" :key="tag"
                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                    {{ tag }}
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
            {{ t('documentations.cardanoNodeSetup.tips.sectionTitle') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg text-center max-w-4xl mx-auto mb-8">
            {{ t('documentations.cardanoNodeSetup.tips.sectionSubtitle') }}
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
            {{ t('documentations.cardanoNodeSetup.resources.sectionTitle') }}
        </h2>

        <div class="max-w-4xl mx-auto text-center mb-8">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {{ t('documentations.cardanoNodeSetup.resources.sectionSubtitle') }}
            </p>
        </div>

        <div class="flex flex-col gap-6">
            <!-- NIX Official Documentation -->
            <NuxtLink external to="https://nixos.org/download/#nix-install-linux" target="_blank"
                class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-start gap-4">
                <div
                    class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:download" class="w-6 h-6 text-white" />
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                        <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                            {{ t('documentations.cardanoNodeSetup.resources.nixDownload.title') }}
                        </h3>
                        <Icon name="mdi:external-link"
                            class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {{ t('documentations.cardanoNodeSetup.resources.nixDownload.description') }}
                    </p>
                </div>
            </NuxtLink>

            <!-- Cardano Node Installation Guide -->
            <NuxtLink external
                to="https://developers.cardano.org/docs/operate-a-stake-pool/node-operations/installing-cardano-node/"
                target="_blank"
                class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-start gap-4">
                <div
                    class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:book-open-variant" class="w-6 h-6 text-white" />
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                        <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                            {{ t('documentations.cardanoNodeSetup.resources.cardanoInstall.title') }}
                        </h3>
                        <Icon name="mdi:external-link"
                            class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {{ t('documentations.cardanoNodeSetup.resources.cardanoInstall.description') }}
                    </p>
                </div>
            </NuxtLink>

            <!-- Cardano Node Running Guide -->
            <NuxtLink external
                to="https://developers.cardano.org/docs/operate-a-stake-pool/node-operations/running-cardano"
                target="_blank"
                class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-start gap-4">
                <div
                    class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:play-circle" class="w-6 h-6 text-white" />
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                        <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                            {{ t('documentations.cardanoNodeSetup.resources.cardanoRunning.title') }}
                        </h3>
                        <Icon name="mdi:external-link"
                            class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {{ t('documentations.cardanoNodeSetup.resources.cardanoRunning.description') }}
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
                {{ t('documentations.cardanoNodeSetup.completion.title') }}
            </h3>
            <p class="text-emerald-700 dark:text-emerald-200 text-lg max-w-2xl mx-auto">
                {{ t('documentations.cardanoNodeSetup.completion.message') }}
            </p>
        </div>
    </section>
</template>