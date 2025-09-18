<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'
import { useI18n, useColorMode } from '#imports'

// Layout definieren
definePageMeta({
    layout: 'with-subnav',
    subNav: {
        titleKey: 'documentations.debianInitialSetup.title',
        showBackButton: true,
        backTo: '/showcase',
        backLabel: 'Back to Showcase'
    }
})

// Setup composables
const { t } = useI18n()
const colorMode = useColorMode()
const { getColorClasses } = useColorMapping()

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
        title: 'documentations.debianInitialSetup.steps.language.title',
        description: 'documentations.debianInitialSetup.steps.language.description',
        commands: [
            {
                command: 'locale -a',
                description: 'documentations.debianInitialSetup.commands.language.listLocales',
                language: 'bash'
            },
            {
                command: 'locale-gen C.UTF-8',
                description: 'documentations.debianInitialSetup.commands.language.generateLocale',
                language: 'bash'
            },
            {
                command: 'update-locale LANG=C.utf8 LC_ALL=C.utf8',
                description: 'documentations.debianInitialSetup.commands.language.updateLocale',
                language: 'bash'
            },
            {
                command: 'locale',
                description: 'documentations.debianInitialSetup.commands.language.checkLocale',
                language: 'bash'
            }
        ],
        note: 'documentations.debianInitialSetup.commands.language.restartNote',
        icon: 'mdi:translate',
        color: 'blue'
    },
    {
        id: 'timezone',
        title: 'documentations.debianInitialSetup.steps.timezone.title',
        description: 'documentations.debianInitialSetup.steps.timezone.description',
        commands: [
            {
                command: 'date',
                description: 'documentations.debianInitialSetup.commands.timezone.checkDate',
                language: 'bash'
            },
            {
                command: 'timedatectl',
                description: 'documentations.debianInitialSetup.commands.timezone.checkTimezone',
                language: 'bash'
            },
            {
                command: 'timedatectl list-timezones',
                description: 'documentations.debianInitialSetup.commands.timezone.listTimezones',
                language: 'bash'
            },
            {
                command: 'timedatectl set-timezone Europe/Luxembourg',
                description: 'documentations.debianInitialSetup.commands.timezone.setTimezone',
                language: 'bash'
            },
            {
                command: 'timedatectl status',
                description: 'documentations.debianInitialSetup.commands.timezone.verifyTimezone',
                language: 'bash'
            }
        ],
        icon: 'mdi:clock',
        color: 'green'
    },
    {
        id: 'sources',
        title: 'documentations.debianInitialSetup.steps.sources.title',
        description: 'documentations.debianInitialSetup.steps.sources.description',
        commands: [
            {
                command: 'apt update',
                description: 'documentations.debianInitialSetup.commands.sources.updatePackages',
                language: 'bash'
            },
            {
                command: 'apt upgrade -y',
                description: 'documentations.debianInitialSetup.commands.sources.upgradeSystem',
                language: 'bash'
            },
            {
                command: 'apt autoremove -y',
                description: 'documentations.debianInitialSetup.commands.sources.autoremove',
                language: 'bash'
            },
            {
                command: 'apt autoclean -y',
                description: 'documentations.debianInitialSetup.commands.sources.autoclean',
                language: 'bash'
            },
            {
                command: 'cat /etc/apt/sources.list',
                description: 'documentations.debianInitialSetup.commands.sources.verifySources',
                language: 'bash'
            },
            {
                command: 'ls -la /etc/apt/sources.list.d/',
                description: 'documentations.debianInitialSetup.commands.sources.checkAdditionalSources',
                language: 'bash'
            }
        ],
        note: 'documentations.debianInitialSetup.commands.sources.wikiReference',
        icon: 'mdi:package-variant',
        color: 'purple'
    },
    {
        id: 'hostname',
        title: 'documentations.debianInitialSetup.steps.hostname.title',
        description: 'documentations.debianInitialSetup.steps.hostname.description',
        commands: [
            {
                command: 'nano /etc/cloud/cloud.cfg',
                description: 'documentations.debianInitialSetup.commands.hostname.editCloudConfig',
                note: 'documentations.debianInitialSetup.commands.hostname.virtualizationNote',
                isFile: true,
                fileName: '/etc/cloud/cloud.cfg',
                fileContent: '# This will cause the set+update hostname module to not operate (if true)\npreserve_hostname: true',
                language: 'yaml'
            },
            {
                command: 'sudo hostnamectl set-hostname server.chad.lu',
                description: 'documentations.debianInitialSetup.commands.hostname.setHostname',
                language: 'bash'
            },
            {
                command: 'hostname',
                description: 'documentations.debianInitialSetup.commands.hostname.verifyHostname',
                language: 'bash'
            },
            {
                command: 'reboot',
                description: 'documentations.debianInitialSetup.commands.hostname.reboot',
                language: 'bash'
            }
        ],
        icon: 'mdi:server',
        color: 'blue'
    },
    {
        id: 'motd',
        title: 'documentations.debianInitialSetup.steps.motd.title',
        description: 'documentations.debianInitialSetup.steps.motd.description',
        commands: [
            {
                command: 'sudo truncate -s 0 /etc/motd',
                description: 'documentations.debianInitialSetup.commands.motd.clearMotd',
                language: 'bash'
            }
        ],
        icon: 'mdi:message-text',
        color: 'red'
    },
    {
        id: 'hardware',
        title: 'documentations.debianInitialSetup.steps.hardware.title',
        description: 'documentations.debianInitialSetup.steps.hardware.description',
        commands: [
            {
                command: 'apt install inxi -y',
                description: 'documentations.debianInitialSetup.commands.hardware.installInxi',
                language: 'bash'
            },
            {
                command: 'inxi -Faz',
                description: 'documentations.debianInitialSetup.commands.hardware.showHardwareInfo',
                language: 'bash'
            },
            {
                command: 'lscpu',
                description: 'documentations.debianInitialSetup.commands.hardware.showCpuInfo',
                language: 'bash'
            },
            {
                command: 'free -h',
                description: 'documentations.debianInitialSetup.commands.hardware.showMemoryInfo',
                language: 'bash'
            },
            {
                command: 'df -h',
                description: 'documentations.debianInitialSetup.commands.hardware.showDiskInfo',
                language: 'bash'
            }
        ],
        icon: 'mdi:chip',
        color: 'purple'
    },
    {
        id: 'verification',
        title: 'documentations.debianInitialSetup.steps.verification.title',
        description: 'documentations.debianInitialSetup.steps.verification.description',
        commands: [
            {
                command: 'lsb_release -a',
                description: 'documentations.debianInitialSetup.commands.verification.systemInfo',
                language: 'bash'
            },
            {
                command: 'uname -a',
                description: 'documentations.debianInitialSetup.commands.verification.kernelInfo',
                language: 'bash'
            },
            {
                command: 'systemctl status',
                description: 'documentations.debianInitialSetup.commands.verification.systemStatus',
                language: 'bash'
            },
            {
                command: 'apt list --upgradable',
                description: 'documentations.debianInitialSetup.commands.verification.checkUpdates',
                language: 'bash'
            }
        ],
        icon: 'mdi:check-circle',
        color: 'emerald'
    }
];

const additionalTips = [
    {
        id: 'security',
        title: 'documentations.debianInitialSetup.tips.security.title',
        icon: 'mdi:shield-check',
        color: 'red',
        commands: [
            {
                command: 'apt install ufw -y',
                description: 'documentations.debianInitialSetup.commands.tips.installFirewall',
                language: 'bash'
            },
            {
                command: 'ufw enable',
                description: 'documentations.debianInitialSetup.commands.tips.enableFirewall',
                language: 'bash'
            },
            {
                command: 'apt install fail2ban -y',
                description: 'documentations.debianInitialSetup.commands.tips.installFail2ban',
                language: 'bash'
            }
        ]
    },
    {
        id: 'essentials',
        title: 'documentations.debianInitialSetup.tips.essentials.title',
        icon: 'mdi:tools',
        color: 'orange',
        commands: [
            {
                command: 'apt install sudo curl wget git nano htop tree -y',
                description: 'documentations.debianInitialSetup.commands.tips.installEssentials',
                language: 'bash'
            },
            {
                command: 'apt install build-essential -y',
                description: 'documentations.debianInitialSetup.commands.tips.installBuildTools',
                language: 'bash'
            }
        ]
    },
    {
        id: 'updates',
        title: 'documentations.debianInitialSetup.tips.updates.title',
        icon: 'mdi:update',
        color: 'emerald',
        commands: [
            {
                command: 'apt install unattended-upgrades -y',
                description: 'documentations.debianInitialSetup.commands.tips.installAutoUpdates',
                language: 'bash'
            },
            {
                command: 'dpkg-reconfigure unattended-upgrades',
                description: 'documentations.debianInitialSetup.commands.tips.configureAutoUpdates',
                language: 'bash'
            }
        ]
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

const importantNotes = [
    {
        id: 'rootAccess',
        title: 'documentations.debianInitialSetup.notes.rootAccess.title',
        description: 'documentations.debianInitialSetup.notes.rootAccess.description',
        icon: 'mdi:shield-account',
        color: 'blue'
    },
    {
        id: 'networkConnection',
        title: 'documentations.debianInitialSetup.notes.networkConnection.title',
        description: 'documentations.debianInitialSetup.notes.networkConnection.description',
        icon: 'mdi:wifi',
        color: 'green'
    },
    {
        id: 'backupImportant',
        title: 'documentations.debianInitialSetup.notes.backupImportant.title',
        description: 'documentations.debianInitialSetup.notes.backupImportant.description',
        icon: 'mdi:backup-restore',
        color: 'purple'
    },
    {
        id: 'timeRequired',
        title: 'documentations.debianInitialSetup.notes.timeRequired.title',
        description: 'documentations.debianInitialSetup.notes.timeRequired.description',
        icon: 'mdi:clock-outline',
        color: 'orange'
    },
    {
        id: 'securityConsiderations',
        title: 'documentations.debianInitialSetup.notes.securityConsiderations.title',
        description: 'documentations.debianInitialSetup.notes.securityConsiderations.description',
        icon: 'mdi:security',
        color: 'red'
    },
    {
        id: 'documentChanges',
        title: 'documentations.debianInitialSetup.notes.documentChanges.title',
        description: 'documentations.debianInitialSetup.notes.documentChanges.description',
        icon: 'mdi:file-document-edit',
        color: 'blue'
    }
];

// Toggle step expansion
const toggleExpanded = (stepId: string) => {
    isExpanded.value[stepId] = !isExpanded.value[stepId];
};
</script>

<template>
    <!-- Hero Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6">
        <h1 class="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ t('documentations.debianInitialSetup.title') }}
        </h1>

        <!-- Introduction -->
        <div class="max-w-4xl mx-auto text-center">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                {{ t('documentations.debianInitialSetup.description') }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 justify-center">
                <span v-for="tag in ['Debian 12', 'Server Setup', 'Linux', 'System Administration']" :key="tag"
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
            {{ t('documentations.debianInitialSetup.tips.sectionTitle') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg text-center max-w-4xl mx-auto mb-8">
            {{ t('documentations.debianInitialSetup.tips.sectionSubtitle') }}
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
                {{ t('documentations.debianInitialSetup.completion.title') }}
            </h3>
            <p class="text-emerald-700 dark:text-emerald-200 text-lg max-w-2xl mx-auto">
                {{ t('documentations.debianInitialSetup.completion.message') }}
            </p>
        </div>
    </section>
</template>