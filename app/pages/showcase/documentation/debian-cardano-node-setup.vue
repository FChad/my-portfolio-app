<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useLocalePath, useI18n } from '#imports'

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

const setupSteps: SetupStep[] = [
    {
        id: 'dependencies',
        title: 'projects.cardanoNodeSetup.steps.dependencies.title',
        description: 'projects.cardanoNodeSetup.steps.dependencies.description',
        commands: [
            {
                command: 'sudo apt update && sudo apt install -y git tmux curl',
                description: 'projects.cardanoNodeSetup.commands.dependencies.installDeps',
                language: 'bash'
            }
        ],
        icon: 'mdi:package-variant',
        color: 'from-green-500 to-emerald-600'
    },
    {
        id: 'nix',
        title: 'projects.cardanoNodeSetup.steps.nix.title',
        description: 'projects.cardanoNodeSetup.steps.nix.description',
        commands: [
            {
                command: 'sh <(curl --proto \'=https\' --tlsv1.2 -L https://nixos.org/nix/install) --daemon',
                description: 'projects.cardanoNodeSetup.commands.nix.install',
                language: 'bash'
            },
            {
                command: 'reboot',
                description: 'projects.cardanoNodeSetup.commands.nix.reboot',
                language: 'bash'
            },
            {
                command: 'nix --version',
                description: 'projects.cardanoNodeSetup.commands.nix.verify',
                language: 'bash'
            }
        ],
        note: 'projects.cardanoNodeSetup.commands.nix.rebootNote',
        icon: 'mdi:package-down',
        color: 'from-blue-500 to-indigo-600'
    },
    {
        id: 'nixconfig',
        title: 'projects.cardanoNodeSetup.steps.nixconfig.title',
        description: 'projects.cardanoNodeSetup.steps.nixconfig.description',
        commands: [
            {
                command: 'nano /etc/nix/nix.conf',
                description: 'projects.cardanoNodeSetup.commands.nixconfig.editConfig',
                isFile: true,
                fileName: '/etc/nix/nix.conf',
                fileContent: 'build-users-group = nixbld\nexperimental-features = nix-command flakes\ntrusted-users = root cardano',
                language: 'config'
            },
            {
                command: 'systemctl restart nix-daemon.service',
                description: 'projects.cardanoNodeSetup.commands.nixconfig.restart',
                language: 'bash'
            }
        ],
        icon: 'mdi:cog',
        color: 'from-orange-500 to-red-600'
    },
    {
        id: 'user',
        title: 'projects.cardanoNodeSetup.steps.user.title',
        description: 'projects.cardanoNodeSetup.steps.user.description',
        commands: [
            {
                command: 'sudo useradd -m -s /bin/bash cardano',
                description: 'projects.cardanoNodeSetup.commands.user.createUser',
                language: 'bash'
            }
        ],
        icon: 'mdi:account-plus',
        color: 'from-purple-500 to-violet-600'
    },
    {
        id: 'install',
        title: 'projects.cardanoNodeSetup.steps.install.title',
        description: 'projects.cardanoNodeSetup.steps.install.description',
        commands: [
            {
                command: 'sudo -i -u cardano',
                description: 'projects.cardanoNodeSetup.commands.install.switchUser',
                language: 'bash'
            },
            {
                command: 'git clone https://github.com/IntersectMBO/cardano-node',
                description: 'projects.cardanoNodeSetup.commands.install.clone',
                language: 'bash'
            },
            {
                command: 'cd cardano-node',
                description: 'projects.cardanoNodeSetup.commands.install.changeDir',
                language: 'bash'
            },
            {
                command: 'git tag | sort -V',
                description: 'projects.cardanoNodeSetup.commands.install.listTags',
                language: 'bash'
            },
            {
                command: 'git switch -d tags/10.4.1',
                description: 'projects.cardanoNodeSetup.commands.install.checkout',
                language: 'bash'
            },
            {
                command: 'nix profile install .#cardano-node .#cardano-cli',
                description: 'projects.cardanoNodeSetup.commands.install.profileInstall',
                note: 'projects.cardanoNodeSetup.commands.install.profileNote',
                language: 'bash'
            },
            {
                command: 'nix profile list',
                description: 'projects.cardanoNodeSetup.commands.install.profileList',
                language: 'bash'
            },
            {
                command: '~/.nix-profile/bin/cardano-node --version',
                description: 'projects.cardanoNodeSetup.commands.install.checkNode',
                language: 'bash'
            },
            {
                command: '~/.nix-profile/bin/cardano-cli --version',
                description: 'projects.cardanoNodeSetup.commands.install.checkCli',
                language: 'bash'
            },
            {
                command: 'exit',
                description: 'projects.cardanoNodeSetup.commands.install.exitUser',
                language: 'bash'
            }
        ],
        icon: 'mdi:hammer-wrench',
        color: 'from-cyan-500 to-blue-600'
    },
    {
        id: 'symlinks',
        title: 'projects.cardanoNodeSetup.steps.symlinks.title',
        description: 'projects.cardanoNodeSetup.steps.symlinks.description',
        commands: [
            {
                command: 'sudo ln -sf /home/cardano/.nix-profile/bin/cardano-node /usr/local/bin/cardano-node',
                description: 'projects.cardanoNodeSetup.commands.symlinks.linkNode',
                language: 'bash'
            },
            {
                command: 'sudo ln -sf /home/cardano/.nix-profile/bin/cardano-cli /usr/local/bin/cardano-cli',
                description: 'projects.cardanoNodeSetup.commands.symlinks.linkCli',
                language: 'bash'
            },
            {
                command: 'ls -la /usr/local/bin/cardano-*',
                description: 'projects.cardanoNodeSetup.commands.symlinks.verifyLinks',
                language: 'bash'
            },
            {
                command: 'cardano-node --version',
                description: 'projects.cardanoNodeSetup.commands.symlinks.testNode',
                language: 'bash'
            },
            {
                command: 'cardano-cli --version',
                description: 'projects.cardanoNodeSetup.commands.symlinks.testCli',
                language: 'bash'
            }
        ],
        note: 'projects.cardanoNodeSetup.commands.symlinks.profileNote',
        icon: 'mdi:link',
        color: 'from-pink-500 to-rose-600'
    },
    {
        id: 'config',
        title: 'projects.cardanoNodeSetup.steps.config.title',
        description: 'projects.cardanoNodeSetup.steps.config.description',
        commands: [
            {
                command: 'sudo -i -u cardano',
                description: 'projects.cardanoNodeSetup.commands.config.switchUser',
                language: 'bash'
            },
            {
                command: 'mkdir -p ~/cardano-config ~/cardano-db',
                description: 'projects.cardanoNodeSetup.commands.config.createDirs',
                language: 'bash'
            },
            {
                command: 'cd ~/cardano-config',
                description: 'projects.cardanoNodeSetup.commands.config.changeDir',
                language: 'bash'
            },
            {
                command: 'curl -O -J "https://book.play.dev.cardano.org/environments/mainnet/{config,db-sync-config,submit-api-config,topology,byron-genesis,shelley-genesis,alonzo-genesis,conway-genesis,checkpoints}.json"',
                description: 'projects.cardanoNodeSetup.commands.config.downloadConfigs',
                language: 'bash'
            },
            {
                command: 'ls -lh *.json',
                description: 'projects.cardanoNodeSetup.commands.config.listConfigs',
                language: 'bash'
            },
            {
                command: 'head -20 config.json',
                description: 'projects.cardanoNodeSetup.commands.config.checkConfig',
                language: 'bash'
            },
            {
                command: 'exit',
                description: 'projects.cardanoNodeSetup.commands.config.exitUser',
                language: 'bash'
            }
        ],
        icon: 'mdi:file-cog',
        color: 'from-teal-500 to-cyan-600'
    },
    {
        id: 'service',
        title: 'projects.cardanoNodeSetup.steps.service.title',
        description: 'projects.cardanoNodeSetup.steps.service.description',
        commands: [
            {
                command: 'nano /etc/systemd/system/cardano-node.service',
                description: 'projects.cardanoNodeSetup.commands.service.createService',
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
                description: 'projects.cardanoNodeSetup.commands.service.reload',
                language: 'bash'
            },
            {
                command: 'systemctl enable cardano-node',
                description: 'projects.cardanoNodeSetup.commands.service.enable',
                language: 'bash'
            },
            {
                command: 'systemctl start cardano-node',
                description: 'projects.cardanoNodeSetup.commands.service.start',
                language: 'bash'
            }
        ],
        icon: 'mdi:server',
        color: 'from-amber-500 to-orange-600'
    },
    {
        id: 'monitor',
        title: 'projects.cardanoNodeSetup.steps.monitor.title',
        description: 'projects.cardanoNodeSetup.steps.monitor.description',
        commands: [
            {
                command: 'journalctl -u cardano-node -f',
                description: 'projects.cardanoNodeSetup.commands.monitor.logs',
                language: 'bash'
            },
            {
                command: 'cardano-cli query tip --socket-path /home/cardano/cardano-db/node.socket --mainnet',
                description: 'projects.cardanoNodeSetup.commands.monitor.syncProgress',
                language: 'bash'
            }
        ],
        note: 'projects.cardanoNodeSetup.commands.monitor.syncNote',
        icon: 'mdi:monitor-dashboard',
        color: 'from-indigo-500 to-purple-600'
    }
]

const additionalTips = [
    {
        id: 'sync',
        title: 'projects.cardanoNodeSetup.tips.sync.title',
        icon: 'mdi:sync',
        color: 'from-blue-500 to-indigo-600',
        commands: [
            {
                command: 'systemctl status cardano-node',
                description: 'projects.cardanoNodeSetup.commands.tips.syncStatus',
                language: 'bash'
            },
            {
                command: 'du -sh /home/cardano/cardano-db',
                description: 'projects.cardanoNodeSetup.commands.tips.syncSize',
                language: 'bash'
            }
        ]
    },
    {
        id: 'maintenance',
        title: 'projects.cardanoNodeSetup.tips.maintenance.title',
        icon: 'mdi:wrench',
        color: 'from-green-500 to-emerald-600',
        commands: [
            {
                command: 'systemctl restart cardano-node',
                description: 'projects.cardanoNodeSetup.commands.tips.restart',
                language: 'bash'
            },
            {
                command: 'systemctl stop cardano-node',
                description: 'projects.cardanoNodeSetup.commands.tips.stop',
                language: 'bash'
            }
        ]
    },
    {
        id: 'troubleshooting',
        title: 'projects.cardanoNodeSetup.tips.troubleshooting.title',
        icon: 'mdi:bug',
        color: 'from-red-500 to-pink-600',
        commands: [
            {
                command: 'journalctl -u cardano-node --no-pager -l',
                description: 'projects.cardanoNodeSetup.commands.tips.fullLogs',
                language: 'bash'
            },
            {
                command: 'ps aux | grep cardano',
                description: 'projects.cardanoNodeSetup.commands.tips.checkProcess',
                language: 'bash'
            }
        ]
    }
]

const toggleExpanded = (id: string) => {
    isExpanded.value[id] = !isExpanded.value[id]
}

onMounted(() => {
    setupSteps.forEach(step => {
        isExpanded.value[step.id] = true;
    });
});
</script>

<template>
    <div class="w-full">
        <!-- Navigation -->
        <UiSubNavigation :title="t('projects.cardanoNodeSetup.title')" />

        <!-- Content Area -->
        <div class="w-full">
            <!-- Hero Section -->
            <div class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8 md:pb-12">
                <div class="text-center mb-6 sm:mb-8 md:mb-12">
                    <!-- Main Icon -->
                    <div
                        class="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 mb-4 sm:mb-5 md:mb-6">
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl animate-pulse">
                        </div>
                        <div
                            class="relative w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl flex items-center justify-center">
                            <Icon name="mdi:server"
                                class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 text-white" />
                        </div>
                    </div>

                    <!-- Title -->
                    <h1
                        class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
                        {{ t('projects.cardanoNodeSetup.title') }}
                    </h1>

                    <!-- Description -->
                    <p
                        class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
                        {{ t('projects.cardanoNodeSetup.description') }}
                    </p>

                    <!-- Tags -->
                    <div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-4">
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            Debian 12
                        </span>
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            Cardano
                        </span>
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            NIX
                        </span>
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            Blockchain
                        </span>
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            Node
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
                                {{ t('projects.cardanoNodeSetup.notes.title') }}
                            </h2>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                            <div
                                class="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/60 dark:border-gray-600/40">
                                <Icon name="mdi:check-circle"
                                    class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {{ t('projects.cardanoNodeSetup.notes.rootAccess') }}
                                </span>
                            </div>
                            <div
                                class="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/60 dark:border-gray-600/40">
                                <Icon name="mdi:check-circle"
                                    class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {{ t('projects.cardanoNodeSetup.notes.networkConnection') }}
                                </span>
                            </div>
                            <div
                                class="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/60 dark:border-gray-600/40">
                                <Icon name="mdi:check-circle"
                                    class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {{ t('projects.cardanoNodeSetup.notes.diskSpace') }}
                                </span>
                            </div>
                            <div
                                class="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/60 dark:border-gray-600/40">
                                <Icon name="mdi:check-circle"
                                    class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {{ t('projects.cardanoNodeSetup.notes.timeRequired') }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Steps Overview -->
                <div class="max-w-7xl mx-auto mb-8 sm:mb-12">
                    <div class="text-center mb-6 sm:mb-8">
                        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {{ t('projects.cardanoNodeSetup.steps.title') }}
                        </h2>
                        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4">
                            {{ t('projects.cardanoNodeSetup.stepsSubtitle') }}
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
                            {{ t('projects.cardanoNodeSetup.tips.sectionTitle') }}
                        </h2>
                        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4">
                            {{ t('projects.cardanoNodeSetup.tips.sectionSubtitle') }}
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
                            {{ t('projects.cardanoNodeSetup.resources.sectionTitle') }}
                        </h2>
                        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4">
                            {{ t('projects.cardanoNodeSetup.resources.sectionSubtitle') }}
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                        <!-- NIX Official Documentation -->
                        <a href="https://nixos.org/download/#nix-install-linux" target="_blank"
                            rel="noopener noreferrer"
                            class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200/60 dark:border-gray-700/60 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                            <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <div
                                    class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                                    <Icon name="mdi:download" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                                    {{ t('projects.cardanoNodeSetup.resources.nixDownload.title') }}
                                </h3>
                                <Icon name="mdi:external-link"
                                    class="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                            </div>
                            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                {{ t('projects.cardanoNodeSetup.resources.nixDownload.description') }}
                            </p>
                        </a>

                        <!-- Cardano Node Installation Guide -->
                        <a href="https://developers.cardano.org/docs/get-started/cardano-node/installing-cardano-node"
                            target="_blank" rel="noopener noreferrer"
                            class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200/60 dark:border-gray-700/60 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                            <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <div
                                    class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                                    <Icon name="mdi:book-open-variant"
                                        class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                                    {{ t('projects.cardanoNodeSetup.resources.cardanoInstall.title') }}
                                </h3>
                                <Icon name="mdi:external-link"
                                    class="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                            </div>
                            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                {{ t('projects.cardanoNodeSetup.resources.cardanoInstall.description') }}
                            </p>
                        </a>

                        <!-- Cardano Node Running Guide -->
                        <a href="https://developers.cardano.org/docs/get-started/cardano-node/running-cardano"
                            target="_blank" rel="noopener noreferrer"
                            class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200/60 dark:border-gray-700/60 shadow-xl hover:shadow-2xl transition-all duration-300 group md:col-span-2 lg:col-span-1">
                            <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <div
                                    class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                                    <Icon name="mdi:play-circle"
                                        class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                                    {{ t('projects.cardanoNodeSetup.resources.cardanoRunning.title') }}
                                </h3>
                                <Icon name="mdi:external-link"
                                    class="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                            </div>
                            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                {{ t('projects.cardanoNodeSetup.resources.cardanoRunning.description') }}
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
                            {{ t('projects.cardanoNodeSetup.completion.title') }}
                        </h3>
                        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                            {{ t('projects.cardanoNodeSetup.completion.message') }}
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