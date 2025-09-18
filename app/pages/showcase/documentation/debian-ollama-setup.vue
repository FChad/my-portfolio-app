<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'
import { useI18n, useColorMode } from '#imports'

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
const colorMode = useColorMode()
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
        color: 'from-green-500 to-emerald-600'
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
                command: 'ollama run gemma3:4b',
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
            },
            {
                command: 'sudo ss -tulpen | grep 11434',
                description: 'documentations.ollamaSetup.commands.ollama.checkPort',
                language: 'bash'
            }
        ],
        icon: 'mdi:robot',
        color: 'from-purple-500 to-violet-600'
    },
    {
        id: 'apache',
        title: 'documentations.ollamaSetup.steps.apache.title',
        description: 'documentations.ollamaSetup.steps.apache.description',
        commands: [
            {
                command: 'sudo apt update && sudo apt install apache2 apache2-utils -y',
                description: 'documentations.ollamaSetup.commands.apache.install',
                language: 'bash'
            },
            {
                command: 'sudo a2enmod proxy proxy_http ssl headers rewrite',
                description: 'documentations.ollamaSetup.commands.apache.enableModules',
                language: 'bash'
            },
            {
                command: 'sudo systemctl restart apache2',
                description: 'documentations.ollamaSetup.commands.apache.restart',
                language: 'bash'
            }
        ],
        icon: 'mdi:web',
        color: 'from-orange-500 to-red-600'
    },
    {
        id: 'ssl',
        title: 'documentations.ollamaSetup.steps.ssl.title',
        description: 'documentations.ollamaSetup.steps.ssl.description',
        commands: [
            {
                command: 'sudo apt install certbot python3-certbot-apache -y',
                description: 'documentations.ollamaSetup.commands.ssl.installCertbot',
                language: 'bash'
            },
            {
                command: 'sudo certbot --apache -d server.chad.lu --register-unsafely-without-email',
                description: 'documentations.ollamaSetup.commands.ssl.getCertificate',
                language: 'bash'
            }
        ],
        icon: 'mdi:shield-lock',
        color: 'from-teal-500 to-cyan-600'
    },
    {
        id: 'authentication',
        title: 'documentations.ollamaSetup.steps.authentication.title',
        description: 'documentations.ollamaSetup.steps.authentication.description',
        commands: [
            {
                command: 'sudo mkdir -p /etc/apache2/htpasswd',
                description: 'documentations.ollamaSetup.commands.authentication.createDirectory',
                language: 'bash'
            },
            {
                command: 'sudo htpasswd -c /etc/apache2/htpasswd/ollama-api.htpasswd apiuser',
                description: 'documentations.ollamaSetup.commands.authentication.createUser',
                note: 'documentations.ollamaSetup.commands.authentication.passwordNote',
                language: 'bash'
            }
        ],
        icon: 'mdi:key',
        color: 'from-amber-500 to-orange-600'
    },
    {
        id: 'virtualhost',
        title: 'documentations.ollamaSetup.steps.virtualhost.title',
        description: 'documentations.ollamaSetup.steps.virtualhost.description',
        commands: [
            {
                command: 'sudo nano /etc/apache2/sites-available/server.chad.lu.conf',
                description: 'documentations.ollamaSetup.commands.virtualhost.createConfig',
                isFile: true,
                fileName: '/etc/apache2/sites-available/server.chad.lu.conf',
                fileContent: `<VirtualHost *:80>
    ServerName server.chad.lu
    Redirect permanent / https://server.chad.lu/
</VirtualHost>

<VirtualHost *:443>
    ServerName server.chad.lu
    DocumentRoot /var/www/server.chad.lu

    <Directory /var/www/server.chad.lu>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Rewrite-Rule for redirect outside of /ollama/
    RewriteEngine On
    RewriteCond %{REQUEST_URI} !^/ollama/
    RewriteRule ^ https://www.chad.lu%{REQUEST_URI} [R=301,L]

    # Proxy Ollama API
    ProxyPreserveHost On
    ProxyPass "/ollama/" "http://localhost:11434/"
    ProxyPassReverse "/ollama/" "http://localhost:11434/"

    <Location "/ollama/">
        AuthType Basic
        AuthName "Ollama API"
        AuthUserFile /etc/apache2/htpasswd/ollama-api.htpasswd
        Require valid-user
    </Location>

    # SSL configuration
    Include /etc/letsencrypt/options-ssl-apache.conf
    SSLCertificateFile /etc/letsencrypt/live/server.chad.lu/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/server.chad.lu/privkey.pem

    # Security headers
    Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "DENY"
    Header always set X-XSS-Protection "1; mode=block"
</VirtualHost>`,
                language: 'apache'
            },
            {
                command: 'sudo a2ensite server.chad.lu.conf',
                description: 'documentations.ollamaSetup.commands.virtualhost.enableSite',
                language: 'bash'
            },
            {
                command: 'sudo a2dissite 000-default.conf',
                description: 'documentations.ollamaSetup.commands.virtualhost.disableDefault',
                language: 'bash'
            },
            {
                command: 'sudo a2dissite 000-default-le-ssl.conf',
                description: 'documentations.ollamaSetup.commands.virtualhost.disableDefaultSSL',
                language: 'bash'
            },
            {
                command: 'sudo systemctl reload apache2',
                description: 'documentations.ollamaSetup.commands.virtualhost.reloadApache',
                language: 'bash'
            }
        ],
        icon: 'mdi:server',
        color: 'from-indigo-500 to-purple-600'
    },
    {
        id: 'testing',
        title: 'documentations.ollamaSetup.steps.testing.title',
        description: 'documentations.ollamaSetup.steps.testing.description',
        commands: [
            {
                command: 'curl -u apiuser https://server.chad.lu/ollama/api/generate -H "Content-Type: application/json" -d \'{"model": "gemma3:4b", "prompt": "Erzähl mir eine Geschichte.", "stream": true}\'',
                description: 'documentations.ollamaSetup.commands.testing.testApi',
                note: 'documentations.ollamaSetup.commands.testing.testNote',
                language: 'bash'
            }
        ],
        icon: 'mdi:test-tube',
        color: 'from-blue-500 to-indigo-600'
    }
];

const troubleshooting = [
    {
        id: 'ollama-issues',
        title: 'documentations.ollamaSetup.troubleshooting.ollamaIssues.title',
        commands: [
            {
                command: 'sudo ss -tulpen | grep 11434',
                description: 'documentations.ollamaSetup.commands.troubleshooting.checkPort',
                language: 'bash'
            },
            {
                command: 'sudo systemctl status ollama',
                description: 'documentations.ollamaSetup.commands.troubleshooting.checkStatus',
                language: 'bash'
            },
            {
                command: 'sudo journalctl -u ollama -f',
                description: 'documentations.ollamaSetup.commands.troubleshooting.checkLogs',
                language: 'bash'
            }
        ]
    },
    {
        id: 'apache-issues',
        title: 'documentations.ollamaSetup.troubleshooting.apacheIssues.title',
        commands: [
            {
                command: 'sudo apache2ctl configtest',
                description: 'documentations.ollamaSetup.commands.troubleshooting.testConfig',
                language: 'bash'
            },
            {
                command: 'sudo systemctl status apache2',
                description: 'documentations.ollamaSetup.commands.troubleshooting.checkApache',
                language: 'bash'
            },
            {
                command: 'sudo tail -f /var/log/apache2/error.log',
                description: 'documentations.ollamaSetup.commands.troubleshooting.checkApacheLogs',
                language: 'bash'
            }
        ]
    },
    {
        id: 'ssl-issues',
        title: 'documentations.ollamaSetup.troubleshooting.sslIssues.title',
        commands: [
            {
                command: 'sudo certbot certificates',
                description: 'documentations.ollamaSetup.commands.troubleshooting.listCertificates',
                language: 'bash'
            },
            {
                command: 'sudo certbot renew --dry-run',
                description: 'documentations.ollamaSetup.commands.troubleshooting.testRenewal',
                language: 'bash'
            },
            {
                command: 'openssl s_client -connect server.chad.lu:443',
                description: 'documentations.ollamaSetup.commands.troubleshooting.testSSL',
                language: 'bash'
            }
        ]
    }
];

const importantNotes = [
    'rootAccess',
    'domainRequired',
    'firewallConfig',
    'securePassword',
    'backupConfig',
    'resourceRequirements'
];

// Toggle step expansion
const toggleExpanded = (stepId: string) => {
    isExpanded.value[stepId] = !isExpanded.value[stepId];
};

// Initialize all steps as expanded
onMounted(() => {
    setupSteps.forEach(step => {
        isExpanded.value[step.id] = true;
    });
});
</script>

<template>
    <div class="w-full">
        <!-- Content Area -->
        <div class="w-full">
            <!-- Hero Section -->
            <div class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-12">
                <div class="text-center mb-8 sm:mb-12">
                    <!-- Main Icon -->
                    <div class="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-4 sm:mb-6">
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl sm:rounded-2xl blur-xl animate-pulse">
                        </div>
                        <div
                            class="relative w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl sm:rounded-2xl shadow-xl flex items-center justify-center">
                            <Icon name="mdi:robot" class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                        </div>
                    </div>

                    <!-- Title -->
                    <h1
                        class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2">
                        {{ t('documentations.ollamaSetup.title') }}
                    </h1>

                    <!-- Description -->
                    <p
                        class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
                        {{ t('documentations.ollamaSetup.description') }}
                    </p>

                    <!-- Tags -->
                    <div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-4">
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            Debian 12
                        </span>
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            Ollama
                        </span>
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            Apache2
                        </span>
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            SSL/TLS
                        </span>
                        <span
                            class="px-2 sm:px-3 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-gray-200/60 dark:border-gray-600/60">
                            API
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
                                {{ t('documentations.ollamaSetup.notes.title') }}
                            </h2>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                            <div v-for="note in importantNotes" :key="note"
                                class="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/60 dark:border-gray-600/40">
                                <Icon name="mdi:check-circle"
                                    class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {{ t(`documentations.ollamaSetup.notes.${note}`) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Setup Steps -->
                <div class="space-y-4 sm:space-y-6 md:space-y-8 mb-8 sm:mb-12">
                    <div class="text-center mb-6 sm:mb-8">
                        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {{ t('documentations.ollamaSetup.steps.title') }}
                        </h2>
                        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4">
                            {{ t('documentations.ollamaSetup.stepsSubtitle') }}
                        </p>
                    </div>

                    <div v-for="(step, index) in setupSteps" :key="step.id" class="group relative">
                        <!-- Step Card -->
                        <div
                            class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-gray-200/60 dark:border-gray-700/60 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">

                            <!-- Step Header -->
                            <div class="p-4 sm:p-6 md:p-8 pb-3 sm:pb-4 md:pb-6">
                                <div class="flex items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                    <!-- Step Number -->
                                    <div class="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                                        <div class="relative">
                                            <div
                                                :class="`absolute inset-0 bg-gradient-to-r ${step.color} rounded-lg sm:rounded-xl blur-lg opacity-30 animate-pulse`">
                                            </div>
                                            <div
                                                :class="`relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${step.color} rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center`">
                                                <span class="text-white font-bold text-base sm:text-lg">{{ index + 1
                                                }}</span>
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
                                        class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-all duration-300 group-hover:scale-105 touch-manipulation flex-shrink-0">
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

                <!-- Troubleshooting Section -->
                <div class="mb-8 sm:mb-12">
                    <div class="text-center mb-6 sm:mb-8">
                        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {{ t('documentations.ollamaSetup.troubleshooting.title') }}
                        </h2>
                        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4">
                            {{ t('documentations.ollamaSetup.troubleshooting.subtitle') }}
                        </p>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                        <div v-for="issue in troubleshooting" :key="issue.id"
                            class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200/60 dark:border-gray-700/60 shadow-xl hover:shadow-2xl transition-all duration-300">

                            <!-- Issue Header -->
                            <div class="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div
                                    class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center flex-shrink-0">
                                    <Icon name="mdi:wrench" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                                    {{ t(issue.title) }}
                                </h3>
                            </div>

                            <!-- Commands -->
                            <div class="space-y-3 sm:space-y-4">
                                <div v-for="(cmd, cmdIndex) in issue.commands" :key="cmdIndex">
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
                            {{ t('documentations.ollamaSetup.completion.title') }}
                        </h3>
                        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                            {{ t('documentations.ollamaSetup.completion.description') }}
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