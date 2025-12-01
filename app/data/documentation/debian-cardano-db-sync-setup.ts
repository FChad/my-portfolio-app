import type { DocumentationConfig } from '~/composables/useDocumentation'

export const debianCardanoDbSyncSetupConfig: DocumentationConfig = {
    slug: 'debian-cardano-db-sync-setup',
    titleKey: 'documentations.cardanoDbSyncSetup.title',
    descriptionKey: 'documentations.cardanoDbSyncSetup.description',
    tags: ['Debian 12', 'Cardano DB Sync', 'PostgreSQL', 'NIX', 'Blockchain', 'Database'],
    seo: {
        titleKey: 'seo.documentation.cardanoDbSync.title',
        descriptionKey: 'seo.documentation.cardanoDbSync.description',
        keywordsKey: 'seo.documentation.cardanoDbSync.keywords'
    },
    subNav: {
        titleKey: 'documentations.cardanoDbSyncSetup.title',
        showBackButton: true,
        backTo: '/showcase'
    },
    notes: [
        {
            id: 'cardanoNode',
            title: 'documentations.cardanoDbSyncSetup.notes.cardanoNodeTitle',
            description: 'documentations.cardanoDbSyncSetup.notes.cardanoNode',
            icon: 'mdi:server',
            color: 'blue'
        },
        {
            id: 'diskSpace',
            title: 'documentations.cardanoDbSyncSetup.notes.diskSpaceTitle',
            description: 'documentations.cardanoDbSyncSetup.notes.diskSpace',
            icon: 'mdi:harddisk',
            color: 'purple'
        },
        {
            id: 'ramRequirement',
            title: 'documentations.cardanoDbSyncSetup.notes.ramRequirementTitle',
            description: 'documentations.cardanoDbSyncSetup.notes.ramRequirement',
            icon: 'mdi:memory',
            color: 'green'
        },
        {
            id: 'syncTime',
            title: 'documentations.cardanoDbSyncSetup.notes.syncTimeTitle',
            description: 'documentations.cardanoDbSyncSetup.notes.syncTime',
            icon: 'mdi:clock-outline',
            color: 'orange'
        },
        {
            id: 'rootAccess',
            title: 'documentations.cardanoDbSyncSetup.notes.rootAccessTitle',
            description: 'documentations.cardanoDbSyncSetup.notes.rootAccess',
            icon: 'mdi:shield-account',
            color: 'red'
        }
    ],
    steps: [
        {
            id: 'postgresql',
            title: 'Install PostgreSQL',
            description: 'Installation and configuration of PostgreSQL database for Cardano DB Sync.',
            icon: 'mdi:database',
            commands: [
                {
                    command: 'sudo apt install postgresql postgresql-contrib',
                    description: 'Install PostgreSQL and additional extensions',
                    language: 'bash'
                },
                {
                    command: 'sudo systemctl enable postgresql',
                    description: 'Enable PostgreSQL service for automatic startup',
                    language: 'bash'
                },
                {
                    command: 'sudo systemctl start postgresql',
                    description: 'Start PostgreSQL service',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'database',
            title: 'Setup Database',
            description: 'Creating database user and database with appropriate permissions.',
            icon: 'mdi:database-settings',
            commands: [
                {
                    command: 'sudo -u postgres psql',
                    description: 'Connect to PostgreSQL console as postgres user',
                    language: 'bash'
                },
                {
                    command: "CREATE USER cardano WITH PASSWORD 'PASSWORD';",
                    description: 'Create Cardano database user with password',
                    note: 'Use a strong, secure password',
                    language: 'sql'
                },
                {
                    command: 'CREATE DATABASE cexplorer OWNER cardano;',
                    description: 'Create Cardano Explorer database',
                    language: 'sql'
                },
                {
                    command: 'GRANT ALL PRIVILEGES ON DATABASE cexplorer TO cardano;',
                    description: 'Grant all privileges for the database',
                    language: 'sql'
                },
                {
                    command: '\\q',
                    description: 'Exit PostgreSQL console',
                    language: 'sql'
                }
            ]
        },
        {
            id: 'clone-install',
            title: 'Clone Repository and Install DB Sync',
            description: 'Cloning the official Cardano DB Sync repository from GitHub and installation with NIX.',
            icon: 'mdi:git',
            commands: [
                {
                    command: 'sudo -i -u cardano',
                    description: 'Switch to cardano user account',
                    language: 'bash'
                },
                {
                    command: 'git clone https://github.com/IntersectMBO/cardano-db-sync.git',
                    description: 'Clone Cardano DB Sync repository',
                    language: 'bash'
                },
                {
                    command: 'ls -al',
                    description: 'List files in cardano directory',
                    language: 'bash'
                },
                {
                    command: 'cd cardano-db-sync/',
                    description: 'Change to cardano-db-sync directory',
                    language: 'bash'
                },
                {
                    command: 'git tag | sort -V',
                    description: 'List available version tags',
                    language: 'bash'
                },
                {
                    command: 'git switch -d tags/13.6.0.5',
                    description: 'Switch to specific version tag',
                    language: 'bash'
                },
                {
                    command: 'nix profile install .',
                    description: 'Install Cardano DB Sync with NIX',
                    note: 'This installation may take some time',
                    language: 'bash'
                },
                {
                    command: 'cardano-db-sync --version',
                    description: 'Verify installation by checking version',
                    language: 'bash'
                },
                {
                    command: 'nix profile list',
                    description: 'List installed NIX profiles',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'pgpass',
            title: 'Database Authentication',
            description: 'Setting up PostgreSQL authentication with .pgpass file.',
            icon: 'mdi:key',
            commands: [
                {
                    command: 'nano ~/cardano-config/.pgpass',
                    description: 'Create PostgreSQL password file',
                    isFile: true,
                    fileName: '~/cardano-config/.pgpass',
                    fileContent: 'localhost:5432:cexplorer:cardano:PASSWORD',
                    language: 'config'
                },
                {
                    command: 'chmod 600 ~/cardano-config/.pgpass',
                    description: 'Set file permissions for security',
                    language: 'bash'
                },
                {
                    command: 'exit',
                    description: 'Exit cardano user account',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'symlink',
            title: 'System Integration',
            description: 'Creating system-wide symbolic links for Cardano DB Sync.',
            icon: 'mdi:link',
            commands: [
                {
                    command: 'sudo ln -sf /home/cardano/.nix-profile/bin/cardano-db-sync /usr/local/bin/cardano-db-sync',
                    description: 'Create system-wide symbolic link',
                    language: 'bash'
                },
                {
                    command: 'cardano-db-sync --version',
                    description: 'Test symbolic link by checking version',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'service',
            title: 'Systemd Service',
            description: 'Configuring systemd service for automatic startup and management.',
            icon: 'mdi:cog',
            commands: [
                {
                    command: 'nano /etc/systemd/system/cardano-db-sync.service',
                    description: 'Create systemd service configuration file',
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
                    description: 'Reload systemd for new service',
                    language: 'bash'
                },
                {
                    command: 'sudo systemctl enable cardano-db-sync',
                    description: 'Enable service for automatic startup',
                    language: 'bash'
                },
                {
                    command: 'sudo systemctl start cardano-db-sync',
                    description: 'Start Cardano DB Sync service',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'monitoring',
            title: 'Monitoring',
            description: 'Checking service status and setting up log monitoring.',
            icon: 'mdi:monitor-eye',
            commands: [
                {
                    command: 'sudo systemctl status cardano-db-sync',
                    description: 'Check service status',
                    language: 'bash'
                },
                {
                    command: 'journalctl -u cardano-db-sync -f',
                    description: 'Follow service logs in real-time',
                    language: 'bash'
                }
            ]
        }
    ],
    tips: [
        {
            id: 'sync-status',
            title: 'Synchronization Status',
            icon: 'mdi:database-sync',
            color: 'blue',
            commands: [
                {
                    command: 'sudo -u postgres psql -d cexplorer -c "SELECT * FROM meta;"',
                    description: 'Query metadata table for synchronization status',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'troubleshooting',
            title: 'Troubleshooting',
            icon: 'mdi:wrench',
            color: 'green',
            commands: [
                {
                    command: 'sudo systemctl restart cardano-db-sync',
                    description: 'Restart Cardano DB Sync service',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'disk-space',
            title: 'Disk Space',
            icon: 'mdi:harddisk',
            color: 'red',
            commands: [
                {
                    command: 'df -h /home/cardano/',
                    description: 'Check available disk space',
                    language: 'bash'
                }
            ]
        }
    ],
    resources: [
        {
            id: 'github',
            title: 'Cardano DB Sync Repository',
            description: 'Official GitHub repository with source code and documentation',
            url: 'https://github.com/IntersectMBO/cardano-db-sync',
            icon: 'mdi:github',
            gradient: 'bg-gradient-to-br from-purple-500 to-indigo-600'
        },
        {
            id: 'postgresql',
            title: 'PostgreSQL Documentation',
            description: 'Official PostgreSQL documentation for database administration',
            url: 'https://www.postgresql.org/docs/',
            icon: 'mdi:database',
            gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600'
        },
        {
            id: 'cardanoDocs',
            title: 'Cardano Developer Portal',
            description: 'Official Cardano developer portal with DB Sync documentation',
            url: 'https://github.com/IntersectMBO/cardano-db-sync/blob/master/doc/running.md',
            icon: 'mdi:book-open-variant',
            gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600'
        }
    ],
    completion: {
        title: 'documentations.cardanoDbSyncSetup.completion.title',
        message: 'documentations.cardanoDbSyncSetup.completion.message'
    }
}
