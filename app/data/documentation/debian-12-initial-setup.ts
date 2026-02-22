import type { DocumentationConfig } from '~/composables/useDocumentation'

export const debianInitialSetupConfig: DocumentationConfig = {
    slug: 'debian-12-initial-setup',
    titleKey: 'documentations.debianInitialSetup.title',
    descriptionKey: 'documentations.debianInitialSetup.description',
    tags: ['Debian 12', 'Server Setup', 'Linux', 'System Administration'],
    seo: {
        titleKey: 'seo.documentation.debian12.title',
        descriptionKey: 'seo.documentation.debian12.description',
        keywordsKey: 'seo.documentation.debian12.keywords'
    },
    subNav: {
        titleKey: 'documentations.debianInitialSetup.title',
        showBackButton: true,
        backTo: '/showcase'
    },
    notes: [
        {
            id: 'rootAccess',
            title: 'documentations.debianInitialSetup.notes.rootAccess.title',
            description: 'documentations.debianInitialSetup.notes.rootAccess.description',
            icon: 'mdi:shield-account',
        },
        {
            id: 'networkConnection',
            title: 'documentations.debianInitialSetup.notes.networkConnection.title',
            description: 'documentations.debianInitialSetup.notes.networkConnection.description',
            icon: 'mdi:wifi',
        },
        {
            id: 'backupImportant',
            title: 'documentations.debianInitialSetup.notes.backupImportant.title',
            description: 'documentations.debianInitialSetup.notes.backupImportant.description',
            icon: 'mdi:backup-restore',
        },
        {
            id: 'timeRequired',
            title: 'documentations.debianInitialSetup.notes.timeRequired.title',
            description: 'documentations.debianInitialSetup.notes.timeRequired.description',
            icon: 'mdi:clock-outline',
        },
        {
            id: 'securityConsiderations',
            title: 'documentations.debianInitialSetup.notes.securityConsiderations.title',
            description: 'documentations.debianInitialSetup.notes.securityConsiderations.description',
            icon: 'mdi:security',
        },
        {
            id: 'documentChanges',
            title: 'documentations.debianInitialSetup.notes.documentChanges.title',
            description: 'documentations.debianInitialSetup.notes.documentChanges.description',
            icon: 'mdi:file-document-edit',
        }
    ],
    steps: [
        {
            id: 'language',
            title: 'Configure Language and Locale',
            description: 'Configuration of system language and locale settings for correct character display.',
            icon: 'mdi:translate',
            note: 'A restart may be required to fully apply the changes',
            commands: [
                {
                    command: 'locale -a',
                    description: 'List available locales',
                    language: 'bash'
                },
                {
                    command: 'locale-gen C.UTF-8',
                    description: 'Generate UTF-8 locale',
                    language: 'bash'
                },
                {
                    command: 'update-locale LANG=C.utf8 LC_ALL=C.utf8',
                    description: 'Update system locale',
                    language: 'bash'
                },
                {
                    command: 'locale',
                    description: 'Check current locale configuration',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'timezone',
            title: 'Set Timezone',
            description: 'Setting the correct timezone for accurate time and date information.',
            icon: 'mdi:clock',
            commands: [
                {
                    command: 'date',
                    description: 'Display current date and time',
                    language: 'bash'
                },
                {
                    command: 'timedatectl',
                    description: 'Check timezone configuration',
                    language: 'bash'
                },
                {
                    command: 'timedatectl list-timezones',
                    description: 'List all available timezones',
                    language: 'bash'
                },
                {
                    command: 'timedatectl set-timezone Europe/Berlin',
                    description: 'Set timezone to Europe/Berlin',
                    language: 'bash'
                },
                {
                    command: 'timedatectl status',
                    description: 'Confirm new timezone configuration',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'sources',
            title: 'Update Package Sources',
            description: 'Updating APT package sources and the system to the latest state.',
            icon: 'mdi:package-variant',
            note: 'More information can be found in the Debian Wiki on APT configuration',
            commands: [
                {
                    command: 'apt update && apt upgrade -y && apt autoremove -y && apt autoclean -y',
                    description: 'Update, upgrade and cleanup system',
                    language: 'bash'
                },
                {
                    command: 'cat /etc/apt/sources.list',
                    description: 'Display main package sources',
                    language: 'bash'
                },
                {
                    command: 'ls -la /etc/apt/sources.list.d/',
                    description: 'Check additional package sources',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'hostname',
            title: 'Configure Hostname',
            description: 'Setting a unique hostname for server identification in the network.',
            icon: 'mdi:server',
            commands: [
                {
                    command: 'nano /etc/cloud/cloud.cfg',
                    description: 'Edit cloud-init configuration (if present)',
                    note: 'Only required in virtualized environments with cloud-init',
                    isFile: true,
                    fileName: '/etc/cloud/cloud.cfg',
                    fileContent: '# This will cause the set+update hostname module to not operate (if true)\npreserve_hostname: true',
                    language: 'yaml'
                },
                {
                    command: 'sudo hostnamectl set-hostname server.chad.lu',
                    description: 'Set new hostname',
                    language: 'bash'
                },
                {
                    command: 'hostname',
                    description: 'Check hostname configuration',
                    language: 'bash'
                },
                {
                    command: 'reboot',
                    description: 'Restart system for full application',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'motd',
            title: 'Clean MOTD',
            description: 'Removing the default welcome message for clean login.',
            icon: 'mdi:message-text',
            commands: [
                {
                    command: 'sudo truncate -s 0 /etc/motd',
                    description: 'Clear default MOTD file',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'hardware',
            title: 'Show Hardware Information',
            description: 'Checking and displaying available hardware resources of the server.',
            icon: 'mdi:chip',
            commands: [
                {
                    command: 'apt install inxi -y',
                    description: 'Install hardware information tool',
                    language: 'bash'
                },
                {
                    command: 'inxi -Faz',
                    description: 'Display complete hardware information',
                    language: 'bash'
                },
                {
                    command: 'lscpu',
                    description: 'Display CPU information',
                    language: 'bash'
                },
                {
                    command: 'free -h',
                    description: 'Display memory information',
                    language: 'bash'
                },
                {
                    command: 'df -h',
                    description: 'Display disk information',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'verification',
            title: 'System Verification',
            description: 'Final verification of all configurations and system status.',
            icon: 'mdi:check-circle',
            commands: [
                {
                    command: 'lsb_release -a',
                    description: 'Display system version information',
                    language: 'bash'
                },
                {
                    command: 'uname -a',
                    description: 'Display kernel information',
                    language: 'bash'
                },
                {
                    command: 'systemctl status',
                    description: 'Check systemd status',
                    language: 'bash'
                },
                {
                    command: 'apt list --upgradable',
                    description: 'Check available updates',
                    language: 'bash'
                }
            ]
        }
    ],
    tips: [
        {
            id: 'security',
            title: 'Security Measures',
            icon: 'mdi:shield-check',
            commands: [
                {
                    command: 'apt install ufw -y',
                    description: 'Install UFW firewall',
                    language: 'bash'
                },
                {
                    command: 'ufw enable',
                    description: 'Enable firewall',
                    language: 'bash'
                },
                {
                    command: 'apt install fail2ban -y',
                    description: 'Install Fail2Ban for enhanced security',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'essentials',
            title: 'Essential Tools',
            icon: 'mdi:tools',
            commands: [
                {
                    command: 'apt install sudo curl wget git nano htop tree -y',
                    description: 'Install important system tools',
                    language: 'bash'
                },
                {
                    command: 'apt install build-essential -y',
                    description: 'Install build tools for compilation',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'updates',
            title: 'Automatic Updates',
            icon: 'mdi:update',
            commands: [
                {
                    command: 'apt install unattended-upgrades -y',
                    description: 'Install automatic updates',
                    language: 'bash'
                },
                {
                    command: 'dpkg-reconfigure unattended-upgrades',
                    description: 'Configure automatic updates',
                    language: 'bash'
                }
            ]
        }
    ],
    completion: {
        title: 'documentations.debianInitialSetup.completion.title',
        message: 'documentations.debianInitialSetup.completion.message'
    }
}
