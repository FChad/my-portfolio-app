import type { DocumentationConfig } from '~/composables/useDocumentation'

export const debianCardanoNodeSetupConfig: DocumentationConfig = {
    slug: 'debian-cardano-node-setup',
    titleKey: 'documentations.cardanoNodeSetup.title',
    descriptionKey: 'documentations.cardanoNodeSetup.description',
    tags: ['Debian 12', 'Cardano', 'NIX', 'Blockchain', 'Cryptocurrency', 'Node'],
    seo: {
        titleKey: 'seo.documentation.cardanoNode.title',
        descriptionKey: 'seo.documentation.cardanoNode.description',
        keywordsKey: 'seo.documentation.cardanoNode.keywords'
    },
    subNav: {
        titleKey: 'documentations.cardanoNodeSetup.title',
        showBackButton: true,
        backTo: '/showcase'
    },
    notes: [
        {
            id: 'nodeRequirements',
            title: 'documentations.cardanoNodeSetup.notes.nodeRequirements.title',
            description: 'documentations.cardanoNodeSetup.notes.nodeRequirements.description',
            icon: 'mdi:server',
        },
        {
            id: 'nixDaemon',
            title: 'documentations.cardanoNodeSetup.notes.nixDaemon.title',
            description: 'documentations.cardanoNodeSetup.notes.nixDaemon.description',
            icon: 'mdi:cog',
        },
        {
            id: 'diskSpace',
            title: 'documentations.cardanoNodeSetup.notes.diskSpace.title',
            description: 'documentations.cardanoNodeSetup.notes.diskSpace.description',
            icon: 'mdi:harddisk',
        },
        {
            id: 'syncTime',
            title: 'documentations.cardanoNodeSetup.notes.syncTime.title',
            description: 'documentations.cardanoNodeSetup.notes.syncTime.description',
            icon: 'mdi:timer-sand',
        },
        {
            id: 'networkStability',
            title: 'documentations.cardanoNodeSetup.notes.networkStability.title',
            description: 'documentations.cardanoNodeSetup.notes.networkStability.description',
            icon: 'mdi:wifi-strength-4',
        }
    ],
    steps: [
        {
            id: 'dependencies',
            title: 'Install System Dependencies',
            description: 'Installation of required system packages for the NIX package manager installation.',
            icon: 'mdi:package-variant',
            commands: [
                {
                    command: 'sudo apt update && sudo apt install -y git tmux curl',
                    description: 'Install system dependencies',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'nix',
            title: 'Install NIX Package Manager',
            description: 'Installation of the NIX package manager for managing Cardano Node dependencies.',
            icon: 'mdi:package-down',
            note: 'A restart is required after NIX installation',
            commands: [
                {
                    command: 'sh <(curl --proto \'=https\' --tlsv1.2 -L https://nixos.org/nix/install) --daemon',
                    description: 'Install NIX package manager',
                    language: 'bash'
                },
                {
                    command: 'reboot',
                    description: 'Restart system',
                    language: 'bash'
                },
                {
                    command: 'nix --version',
                    description: 'Verify NIX installation',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'nixconfig',
            title: 'Configure NIX for Cardano',
            description: 'Configuration of the NIX package manager with official IOHK binary caches for optimized downloads.',
            icon: 'mdi:cog',
            commands: [
                {
                    command: 'nano /etc/nix/nix.conf',
                    description: 'Edit NIX configuration',
                    isFile: true,
                    fileName: '/etc/nix/nix.conf',
                    fileContent: 'build-users-group = nixbld\nexperimental-features = nix-command flakes\ntrusted-users = root cardano',
                    language: 'config'
                },
                {
                    command: 'systemctl restart nix-daemon.service',
                    description: 'Restart NIX daemon',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'user',
            title: 'Create Cardano User',
            description: 'Creating a dedicated user for Cardano Node operation.',
            icon: 'mdi:account-plus',
            commands: [
                {
                    command: 'sudo useradd -m -s /bin/bash cardano',
                    description: 'Create Cardano user',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'install',
            title: 'Install Cardano Node',
            description: 'Installation of Cardano Node and CLI tools via the NIX system.',
            icon: 'mdi:hammer-wrench',
            commands: [
                {
                    command: 'sudo -i -u cardano',
                    description: 'Switch to Cardano user',
                    language: 'bash'
                },
                {
                    command: 'git clone https://github.com/IntersectMBO/cardano-node',
                    description: 'Clone Cardano Node repository',
                    language: 'bash'
                },
                {
                    command: 'cd cardano-node',
                    description: 'Change to Cardano Node directory',
                    language: 'bash'
                },
                {
                    command: 'git tag | sort -V',
                    description: 'Display available versions',
                    language: 'bash'
                },
                {
                    command: 'git switch -d tags/10.4.1',
                    description: 'Checkout current stable version',
                    language: 'bash'
                },
                {
                    command: 'nix profile install .#cardano-node .#cardano-cli',
                    description: 'Install Cardano Node and CLI in NIX profile',
                    note: 'This can take 30-60 minutes as all dependencies are compiled',
                    language: 'bash'
                },
                {
                    command: 'nix profile list',
                    description: 'List installed profiles',
                    language: 'bash'
                },
                {
                    command: '~/.nix-profile/bin/cardano-node --version',
                    description: 'Check Cardano Node version',
                    language: 'bash'
                },
                {
                    command: '~/.nix-profile/bin/cardano-cli --version',
                    description: 'Check Cardano CLI version',
                    language: 'bash'
                },
                {
                    command: 'exit',
                    description: 'Switch back to root user',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'symlinks',
            title: 'Create System Symlinks',
            description: 'Creating symlinks for system-wide access to Cardano tools.',
            icon: 'mdi:link',
            note: 'Adjust the path according to your NIX profile',
            commands: [
                {
                    command: 'sudo ln -sf /home/cardano/.nix-profile/bin/cardano-node /usr/local/bin/cardano-node',
                    description: 'Create symlink for Cardano Node',
                    language: 'bash'
                },
                {
                    command: 'sudo ln -sf /home/cardano/.nix-profile/bin/cardano-cli /usr/local/bin/cardano-cli',
                    description: 'Create symlink for Cardano CLI',
                    language: 'bash'
                },
                {
                    command: 'ls -la /usr/local/bin/cardano-*',
                    description: 'Verify symlinks',
                    language: 'bash'
                },
                {
                    command: 'cardano-node --version',
                    description: 'Test Cardano Node system-wide',
                    language: 'bash'
                },
                {
                    command: 'cardano-cli --version',
                    description: 'Test Cardano CLI system-wide',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'config',
            title: 'Download Node Configuration',
            description: 'Download of official Cardano network configuration files.',
            icon: 'mdi:file-cog',
            commands: [
                {
                    command: 'sudo -i -u cardano',
                    description: 'Switch to Cardano user',
                    language: 'bash'
                },
                {
                    command: 'mkdir -p ~/cardano-config ~/cardano-db',
                    description: 'Create configuration directories',
                    language: 'bash'
                },
                {
                    command: 'cd ~/cardano-config',
                    description: 'Change to configuration directory',
                    language: 'bash'
                },
                {
                    command: 'curl -O -J "https://book.play.dev.cardano.org/environments/mainnet/{config,db-sync-config,submit-api-config,topology,byron-genesis,shelley-genesis,alonzo-genesis,conway-genesis,checkpoints}.json"',
                    description: 'Download official configuration files',
                    language: 'bash'
                },
                {
                    command: 'ls -lh *.json',
                    description: 'List downloaded configuration files',
                    language: 'bash'
                },
                {
                    command: 'head -20 config.json',
                    description: 'Check genesis configuration',
                    language: 'bash'
                },
                {
                    command: 'exit',
                    description: 'Switch back to root user',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'service',
            title: 'Setup Systemd Service',
            description: 'Configuration of Cardano Node as systemd service for automatic startup.',
            icon: 'mdi:server',
            commands: [
                {
                    command: 'nano /etc/systemd/system/cardano-node.service',
                    description: 'Create systemd service file',
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
                    description: 'Reload systemd manager',
                    language: 'bash'
                },
                {
                    command: 'systemctl enable cardano-node',
                    description: 'Enable Cardano Node service',
                    language: 'bash'
                },
                {
                    command: 'systemctl start cardano-node',
                    description: 'Start Cardano Node service',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'monitor',
            title: 'Setup Node Monitoring',
            description: 'Monitoring node logs and synchronization process.',
            icon: 'mdi:monitor-dashboard',
            note: 'Initial blockchain synchronization can take 24-48 hours',
            commands: [
                {
                    command: 'journalctl -u cardano-node -f',
                    description: 'Follow service logs',
                    language: 'bash'
                },
                {
                    command: 'cardano-cli query tip --socket-path /home/cardano/cardano-db/node.socket --mainnet',
                    description: 'Check synchronization progress',
                    language: 'bash'
                }
            ]
        }
    ],
    tips: [
        {
            id: 'sync',
            title: 'Synchronization Monitoring',
            icon: 'mdi:sync',
            commands: [
                {
                    command: 'systemctl status cardano-node',
                    description: 'Check synchronization status',
                    language: 'bash'
                },
                {
                    command: 'du -sh /home/cardano/cardano-db',
                    description: 'Display current blockchain size',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'maintenance',
            title: 'Service Management',
            icon: 'mdi:wrench',
            commands: [
                {
                    command: 'systemctl restart cardano-node',
                    description: 'Restart Cardano Node service',
                    language: 'bash'
                },
                {
                    command: 'systemctl stop cardano-node',
                    description: 'Stop Cardano Node service',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'troubleshooting',
            title: 'Troubleshooting',
            icon: 'mdi:bug',
            commands: [
                {
                    command: 'journalctl -u cardano-node --no-pager -l',
                    description: 'Display full logs',
                    language: 'bash'
                },
                {
                    command: 'ps aux | grep cardano',
                    description: 'Check Cardano Node process',
                    language: 'bash'
                }
            ]
        }
    ],
    resources: [
        {
            id: 'nixDownload',
            title: 'NIX Download',
            description: 'Official NIX package manager website with installation guides',
            url: 'https://nixos.org/download/#nix-install-linux',
            icon: 'mdi:download',
        },
        {
            id: 'cardanoInstall',
            title: 'Cardano Installation Guide',
            description: 'Official Cardano Node installation documentation',
            url: 'https://developers.cardano.org/docs/operate-a-stake-pool/node-operations/installing-cardano-node/',
            icon: 'mdi:book-open-variant',
        },
        {
            id: 'cardanoRunning',
            title: 'Running a Node',
            description: 'Official guide for operating a Cardano Node',
            url: 'https://developers.cardano.org/docs/operate-a-stake-pool/node-operations/running-cardano',
            icon: 'mdi:play-circle',
        }
    ],
    completion: {
        title: 'documentations.cardanoNodeSetup.completion.title',
        message: 'documentations.cardanoNodeSetup.completion.message'
    }
}
