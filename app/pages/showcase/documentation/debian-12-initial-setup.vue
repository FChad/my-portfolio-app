<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'
import { useLocalePath, useI18n, useColorMode } from '#imports'

const localePath = useLocalePath()
const { t } = useI18n()
const colorMode = useColorMode()

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
        id: 'language',
        title: 'projects.debianInitialSetup.steps.language.title',
        description: 'projects.debianInitialSetup.steps.language.description',
        commands: [
            {
                command: 'locale -a',
                description: 'projects.debianInitialSetup.commands.language.listLocales',
                language: 'bash'
            },
            {
                command: 'locale-gen C.UTF-8',
                description: 'projects.debianInitialSetup.commands.language.generateLocale',
                language: 'bash'
            },
            {
                command: 'update-locale LANG=C.utf8 LC_ALL=C.utf8',
                description: 'projects.debianInitialSetup.commands.language.updateLocale',
                language: 'bash'
            },
            {
                command: 'locale',
                description: 'projects.debianInitialSetup.commands.language.checkLocale',
                language: 'bash'
            }
        ],
        note: 'projects.debianInitialSetup.commands.language.restartNote',
        icon: 'mdi:translate',
        color: 'from-blue-500 to-indigo-600'
    },
    {
        id: 'timezone',
        title: 'projects.debianInitialSetup.steps.timezone.title',
        description: 'projects.debianInitialSetup.steps.timezone.description',
        commands: [
            {
                command: 'date',
                description: 'projects.debianInitialSetup.commands.timezone.checkDate',
                language: 'bash'
            },
            {
                command: 'timedatectl',
                description: 'projects.debianInitialSetup.commands.timezone.checkTimezone',
                language: 'bash'
            },
            {
                command: 'timedatectl list-timezones',
                description: 'projects.debianInitialSetup.commands.timezone.listTimezones',
                language: 'bash'
            },
            {
                command: 'timedatectl set-timezone Europe/Luxembourg',
                description: 'projects.debianInitialSetup.commands.timezone.setTimezone',
                language: 'bash'
            },
            {
                command: 'timedatectl status',
                description: 'projects.debianInitialSetup.commands.timezone.verifyTimezone',
                language: 'bash'
            }
        ],
        icon: 'mdi:clock',
        color: 'from-green-500 to-emerald-600'
    },
    {
        id: 'sources',
        title: 'projects.debianInitialSetup.steps.sources.title',
        description: 'projects.debianInitialSetup.steps.sources.description',
        commands: [
            {
                command: 'apt update',
                description: 'projects.debianInitialSetup.commands.sources.updatePackages',
                language: 'bash'
            },
            {
                command: 'apt upgrade -y',
                description: 'projects.debianInitialSetup.commands.sources.upgradeSystem',
                language: 'bash'
            },
            {
                command: 'apt autoremove -y',
                description: 'projects.debianInitialSetup.commands.sources.autoremove',
                language: 'bash'
            },
            {
                command: 'apt autoclean -y',
                description: 'projects.debianInitialSetup.commands.sources.autoclean',
                language: 'bash'
            },
            {
                command: 'cat /etc/apt/sources.list',
                description: 'projects.debianInitialSetup.commands.sources.verifySources',
                language: 'bash'
            },
            {
                command: 'ls -la /etc/apt/sources.list.d/',
                description: 'projects.debianInitialSetup.commands.sources.checkAdditionalSources',
                language: 'bash'
            }
        ],
        note: 'projects.debianInitialSetup.commands.sources.wikiReference',
        icon: 'mdi:package-variant',
        color: 'from-orange-500 to-red-600'
    },
    {
        id: 'hostname',
        title: 'projects.debianInitialSetup.steps.hostname.title',
        description: 'projects.debianInitialSetup.steps.hostname.description',
        commands: [
            {
                command: 'nano /etc/cloud/cloud.cfg',
                description: 'projects.debianInitialSetup.commands.hostname.editCloudConfig',
                note: 'projects.debianInitialSetup.commands.hostname.virtualizationNote',
                isFile: true,
                fileName: '/etc/cloud/cloud.cfg',
                fileContent: '# This will cause the set+update hostname module to not operate (if true)\npreserve_hostname: true',
                language: 'yaml'
            },
            {
                command: 'sudo hostnamectl set-hostname server.chad.lu',
                description: 'projects.debianInitialSetup.commands.hostname.setHostname',
                language: 'bash'
            },
            {
                command: 'hostname',
                description: 'projects.debianInitialSetup.commands.hostname.verifyHostname',
                language: 'bash'
            },
            {
                command: 'reboot',
                description: 'projects.debianInitialSetup.commands.hostname.reboot',
                language: 'bash'
            }
        ],
        icon: 'mdi:server',
        color: 'from-cyan-500 to-blue-600'
    },
    {
        id: 'motd',
        title: 'projects.debianInitialSetup.steps.motd.title',
        description: 'projects.debianInitialSetup.steps.motd.description',
        commands: [
            {
                command: 'sudo truncate -s 0 /etc/motd',
                description: 'projects.debianInitialSetup.commands.motd.clearMotd',
                language: 'bash'
            }
        ],
        icon: 'mdi:message-text',
        color: 'from-pink-500 to-rose-600'
    },
    {
        id: 'hardware',
        title: 'projects.debianInitialSetup.steps.hardware.title',
        description: 'projects.debianInitialSetup.steps.hardware.description',
        commands: [
            {
                command: 'apt install inxi -y',
                description: 'projects.debianInitialSetup.commands.hardware.installInxi',
                language: 'bash'
            },
            {
                command: 'inxi -Faz',
                description: 'projects.debianInitialSetup.commands.hardware.showHardwareInfo',
                language: 'bash'
            },
            {
                command: 'lscpu',
                description: 'projects.debianInitialSetup.commands.hardware.showCpuInfo',
                language: 'bash'
            },
            {
                command: 'free -h',
                description: 'projects.debianInitialSetup.commands.hardware.showMemoryInfo',
                language: 'bash'
            },
            {
                command: 'df -h',
                description: 'projects.debianInitialSetup.commands.hardware.showDiskInfo',
                language: 'bash'
            }
        ],
        icon: 'mdi:chip',
        color: 'from-purple-500 to-violet-600'
    },
    {
        id: 'verification',
        title: 'projects.debianInitialSetup.steps.verification.title',
        description: 'projects.debianInitialSetup.steps.verification.description',
        commands: [
            {
                command: 'lsb_release -a',
                description: 'projects.debianInitialSetup.commands.verification.systemInfo',
                language: 'bash'
            },
            {
                command: 'uname -a',
                description: 'projects.debianInitialSetup.commands.verification.kernelInfo',
                language: 'bash'
            },
            {
                command: 'systemctl status',
                description: 'projects.debianInitialSetup.commands.verification.systemStatus',
                language: 'bash'
            },
            {
                command: 'apt list --upgradable',
                description: 'projects.debianInitialSetup.commands.verification.checkUpdates',
                language: 'bash'
            }
        ],
        icon: 'mdi:check-circle',
        color: 'from-teal-500 to-cyan-600'
    }
];

// Initialize expanded state to prevent hydration mismatch  
const getInitialExpandedState = () => {
    const initialState: Record<string, boolean> = {}
    setupSteps.forEach(step => {
        initialState[step.id] = true
    })
    return initialState
}
const isExpanded = ref<Record<string, boolean>>(getInitialExpandedState())

const additionalTips = [
    {
        id: 'security',
        title: 'projects.debianInitialSetup.tips.security.title',
        icon: 'mdi:shield-check',
        color: 'from-red-500 to-pink-600',
        commands: [
            {
                command: 'apt install ufw -y',
                description: 'projects.debianInitialSetup.commands.tips.installFirewall',
                language: 'bash'
            },
            {
                command: 'ufw enable',
                description: 'projects.debianInitialSetup.commands.tips.enableFirewall',
                language: 'bash'
            },
            {
                command: 'apt install fail2ban -y',
                description: 'projects.debianInitialSetup.commands.tips.installFail2ban',
                language: 'bash'
            }
        ]
    },
    {
        id: 'essentials',
        title: 'projects.debianInitialSetup.tips.essentials.title',
        icon: 'mdi:tools',
        color: 'from-amber-500 to-orange-600',
        commands: [
            {
                command: 'apt install sudo curl wget git nano htop tree -y',
                description: 'projects.debianInitialSetup.commands.tips.installEssentials',
                language: 'bash'
            },
            {
                command: 'apt install build-essential -y',
                description: 'projects.debianInitialSetup.commands.tips.installBuildTools',
                language: 'bash'
            }
        ]
    },
    {
        id: 'updates',
        title: 'projects.debianInitialSetup.tips.updates.title',
        icon: 'mdi:update',
        color: 'from-emerald-500 to-teal-600',
        commands: [
            {
                command: 'apt install unattended-upgrades -y',
                description: 'projects.debianInitialSetup.commands.tips.installAutoUpdates',
                language: 'bash'
            },
            {
                command: 'dpkg-reconfigure unattended-upgrades',
                description: 'projects.debianInitialSetup.commands.tips.configureAutoUpdates',
                language: 'bash'
            }
        ]
    }
];

const importantNotes = [
    'rootAccess',
    'networkConnection',
    'backupImportant',
    'timeRequired',
    'securityConsiderations',
    'documentChanges'
];

// Toggle step expansion
const toggleExpanded = (stepId: string) => {
    isExpanded.value[stepId] = !isExpanded.value[stepId];
};
</script>

<template>
    <div class="w-full">
        <!-- Navigation -->
        <UiSubNavigation :title="t('projects.debianInitialSetup.title')" />

        <!-- Content Area -->
        <div class="w-full">
            <!-- Hero Section -->
            <div class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8 md:pb-12">
                <div class="text-center mb-6 sm:mb-8 md:mb-12">
                    <!-- Main Icon -->
                    <div
                        class="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 mb-4 sm:mb-5 md:mb-6">
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-2xl blur-xl animate-pulse">
                        </div>
                        <div
                            class="relative w-full h-full bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl shadow-xl flex items-center justify-center">
                            <Icon name="mdi:server"
                                class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 text-white" />
                        </div>
                    </div>

                    <!-- Title -->
                    <h1
                        class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
                        {{ t('projects.debianInitialSetup.title') }}
                    </h1>

                    <!-- Description -->
                    <p
                        class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
                        {{ t('projects.debianInitialSetup.description') }}
                    </p>

                    <!-- Tags -->
                    <div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-4">
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            Debian 12
                        </span>
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            Server Setup
                        </span>
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            Linux
                        </span>
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            System Administration
                        </span>
                    </div>
                </div>

                <!-- Important Notes Section -->
                <div class="mb-6 sm:mb-8 md:mb-12">
                    <div
                        class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-200/60 dark:border-gray-700/60 shadow-xl">
                        <div class="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                            <div
                                class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                                <Icon name="mdi:alert-circle" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                                {{ t('projects.debianInitialSetup.notes.title') }}
                            </h2>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                            <div v-for="note in importantNotes" :key="note"
                                class="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/60 dark:border-gray-600/40">
                                <Icon name="mdi:check-circle"
                                    class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {{ t(`projects.debianInitialSetup.notes.${note}`) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Setup Steps -->
                <div class="space-y-4 sm:space-y-6 md:space-y-8 mb-8 sm:mb-10 md:mb-12">
                    <div class="text-center mb-6 sm:mb-8">
                        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 px-4">
                            {{ t('projects.debianInitialSetup.steps.title') }}
                        </h2>
                        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4">
                            {{ t('projects.debianInitialSetup.steps.subtitle') }}
                        </p>
                    </div>

                    <div v-for="(step, index) in setupSteps" :key="step.id" class="group relative">
                        <!-- Step Card -->
                        <div
                            class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-gray-200/60 dark:border-gray-700/60 shadow-md overflow-hidden transition-all duration-300 touch-manipulation">

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
                                                <span class="text-white font-bold text-sm sm:text-base md:text-lg">{{
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
                                                :note="cmd.note ? t(cmd.note) : undefined" :language="cmd.language" />
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

                <!-- Additional Tips Section -->
                <div class="mb-8 sm:mb-12">
                    <div class="text-center mb-6 sm:mb-8">
                        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {{ t('projects.debianInitialSetup.tips.sectionTitle') }}
                        </h2>
                        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4">
                            {{ t('projects.debianInitialSetup.tips.sectionSubtitle') }}
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

                <!-- Completion Message -->
                <div class="text-center">
                    <div
                        class="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-emerald-200/60 dark:border-emerald-700/60">
                        <div
                            class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg sm:rounded-xl shadow-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <Icon name="mdi:check-circle" class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                        </div>
                        <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {{ t('projects.debianInitialSetup.completion.title') }}
                        </h3>
                        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                            {{ t('projects.debianInitialSetup.completion.message') }}
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