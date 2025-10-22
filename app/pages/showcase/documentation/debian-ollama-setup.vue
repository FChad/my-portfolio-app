<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useI18n } from '#imports'

// Layout definieren
definePageMeta({
    layout: 'with-subnav',
    subNav: {
        titleKey: 'documentations.ollamaSetup.title',
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
    title: t('seo.documentation.ollama.title'),
    description: t('seo.documentation.ollama.description'),
    keywords: t('seo.documentation.ollama.keywords'),
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
        color: 'green'
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
                description: 'documentations.ollamaSetup.commands.ollama.editService',
                language: 'bash'
            },
            {
                command: '',
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
        color: 'purple'
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
        color: 'orange'
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
        color: 'teal'
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
        color: 'amber'
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
        color: 'indigo'
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
        color: 'blue'
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

// Initialize expanded state for troubleshooting
const getInitialTroubleshootingExpandedState = () => {
    const initialState: Record<string, boolean> = {}
    troubleshooting.forEach(issue => {
        initialState[issue.id] = false
    })
    return initialState
}
const isTroubleshootingExpanded = ref<Record<string, boolean>>({})

// Toggle troubleshooting expansion
const toggleTroubleshootingExpanded = (issueId: string) => {
    isTroubleshootingExpanded.value[issueId] = !isTroubleshootingExpanded.value[issueId]
}

const importantNotes = [
    {
        id: 'rootAccess',
        title: 'documentations.ollamaSetup.notes.rootAccess.title',
        description: 'documentations.ollamaSetup.notes.rootAccess.description',
        icon: 'mdi:shield-account',
        color: 'blue'
    },
    {
        id: 'domainRequired',
        title: 'documentations.ollamaSetup.notes.domainRequired.title',
        description: 'documentations.ollamaSetup.notes.domainRequired.description',
        icon: 'mdi:dns',
        color: 'green'
    },
    {
        id: 'firewallConfig',
        title: 'documentations.ollamaSetup.notes.firewallConfig.title',
        description: 'documentations.ollamaSetup.notes.firewallConfig.description',
        icon: 'mdi:firewall',
        color: 'purple'
    },
    {
        id: 'securePassword',
        title: 'documentations.ollamaSetup.notes.securePassword.title',
        description: 'documentations.ollamaSetup.notes.securePassword.description',
        icon: 'mdi:lock',
        color: 'orange'
    },
    {
        id: 'backupConfig',
        title: 'documentations.ollamaSetup.notes.backupConfig.title',
        description: 'documentations.ollamaSetup.notes.backupConfig.description',
        icon: 'mdi:backup-restore',
        color: 'red'
    },
    {
        id: 'resourceRequirements',
        title: 'documentations.ollamaSetup.notes.resourceRequirements.title',
        description: 'documentations.ollamaSetup.notes.resourceRequirements.description',
        icon: 'mdi:memory',
        color: 'blue'
    }
]

interface TroubleshootingIssue {
    id: string
    title: string
    commands: Command[]
}

const troubleshooting: TroubleshootingIssue[] = [
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
]

// Initialize troubleshooting expanded state on mount
onMounted(() => {
    isTroubleshootingExpanded.value = getInitialTroubleshootingExpandedState()
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
            {{ t('documentations.ollamaSetup.title') }}
        </h1>

        <!-- Introduction -->
        <div class="max-w-4xl mx-auto text-center">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                {{ t('documentations.ollamaSetup.description') }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 justify-center">
                <span v-for="tag in ['Debian 12', 'Ollama', 'Apache2', 'SSL/TLS', 'API']" :key="tag"
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

    <!-- Troubleshooting Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ t('documentations.ollamaSetup.troubleshooting.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg text-center max-w-4xl mx-auto mb-8">
            {{ t('documentations.ollamaSetup.troubleshooting.subtitle') }}
        </p>

        <div class="flex flex-col gap-6">
            <div v-for="(issue, issueIndex) in troubleshooting" :key="issue.id"
                class="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">

                <button @click="toggleTroubleshootingExpanded(issue.id)"
                    class="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-2xl">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                            <span class="text-white font-bold text-lg">{{ issueIndex + 1 }}</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                            {{ t(issue.title) }}
                        </h3>
                    </div>
                    <Icon :name="isTroubleshootingExpanded[issue.id] ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                        class="w-6 h-6 text-gray-400 transition-transform" />
                </button>

                <Transition name="expand">
                    <div v-show="isTroubleshootingExpanded[issue.id]" class="pt-4 px-6 pb-6">
                        <div class="space-y-4">
                            <div v-for="(cmd, cmdIndex) in issue.commands" :key="cmdIndex">
                                <UiCodeBlock :command="cmd.command" :description="t(cmd.description)"
                                    :language="cmd.language" />
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
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
                {{ t('documentations.ollamaSetup.completion.title') }}
            </h3>
            <p class="text-emerald-700 dark:text-emerald-200 text-lg max-w-2xl mx-auto">
                {{ t('documentations.ollamaSetup.completion.description') }}
            </p>
        </div>
    </section>
</template>