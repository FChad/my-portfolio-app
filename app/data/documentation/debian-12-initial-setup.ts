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
    steps: [
        {
            id: 'language',
            title: 'Configure Language and Locale',
            description: 'Configuration of system language and locale settings for correct character display.',
            note: 'A restart may be required to fully apply the changes',
            commands: [
                {
                    command: 'locale-gen C.UTF-8',
                    description: 'Generate UTF-8 locale',
                    language: 'bash'
                },
                {
                    command: 'update-locale LANG=C.utf8 LC_ALL=C.utf8',
                    description: 'Update system locale',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'timezone',
            title: 'Set Timezone',
            description: 'Setting the correct timezone for accurate time and date information.',
            commands: [
                {
                    command: 'timedatectl set-timezone Europe/Berlin',
                    description: 'Set timezone to Europe/Berlin',
                    note: 'Use timedatectl list-timezones to see all available options',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'sources',
            title: 'Update Package Sources',
            description: 'Updating APT package sources and the system to the latest state.',
            note: 'More information can be found in the Debian Wiki on APT configuration',
            commands: [
                {
                    command: 'apt update && apt upgrade -y && apt autoremove -y && apt autoclean -y',
                    description: 'Update, upgrade and cleanup system',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'hostname',
            title: 'Configure Hostname',
            description: 'Setting a unique hostname for server identification in the network.',
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
}
