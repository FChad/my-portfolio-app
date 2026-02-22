import type { DocumentationConfig } from '~/composables/useDocumentation'

export const debianOllamaSetupConfig: DocumentationConfig = {
    slug: 'debian-ollama-setup',
    titleKey: 'documentations.ollamaSetup.title',
    descriptionKey: 'documentations.ollamaSetup.description',
    tags: ['Debian 12', 'Ollama', 'Apache2', 'SSL/TLS', 'API'],
    seo: {
        titleKey: 'seo.documentation.ollama.title',
        descriptionKey: 'seo.documentation.ollama.description',
        keywordsKey: 'seo.documentation.ollama.keywords'
    },
    subNav: {
        titleKey: 'documentations.ollamaSetup.title',
        showBackButton: true,
        backTo: '/showcase'
    },
    notes: [
        {
            id: 'rootAccess',
            title: 'documentations.ollamaSetup.notes.rootAccess.title',
            description: 'documentations.ollamaSetup.notes.rootAccess.description',
            icon: 'mdi:shield-account',
        },
        {
            id: 'domainRequired',
            title: 'documentations.ollamaSetup.notes.domainRequired.title',
            description: 'documentations.ollamaSetup.notes.domainRequired.description',
            icon: 'mdi:dns',
        },
        {
            id: 'firewallConfig',
            title: 'documentations.ollamaSetup.notes.firewallConfig.title',
            description: 'documentations.ollamaSetup.notes.firewallConfig.description',
            icon: 'mdi:firewall',
        },
        {
            id: 'securePassword',
            title: 'documentations.ollamaSetup.notes.securePassword.title',
            description: 'documentations.ollamaSetup.notes.securePassword.description',
            icon: 'mdi:lock',
        },
        {
            id: 'backupConfig',
            title: 'documentations.ollamaSetup.notes.backupConfig.title',
            description: 'documentations.ollamaSetup.notes.backupConfig.description',
            icon: 'mdi:backup-restore',
        },
        {
            id: 'resourceRequirements',
            title: 'documentations.ollamaSetup.notes.resourceRequirements.title',
            description: 'documentations.ollamaSetup.notes.resourceRequirements.description',
            icon: 'mdi:memory',
        }
    ],
    steps: [
        {
            id: 'dependencies',
            title: 'Install Dependencies',
            description: 'Installation of required system packages and dependencies for Ollama and Apache2.',
            icon: 'mdi:package-variant',
            commands: [
                {
                    command: 'apt update -y && apt upgrade -y',
                    description: 'Update package lists again',
                    language: 'bash'
                },
                {
                    command: 'apt install sudo curl',
                    description: 'Install basic packages',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'ollama',
            title: 'Install Ollama',
            description: 'Installation of Ollama and initial configuration with a test model.',
            icon: 'mdi:robot',
            commands: [
                {
                    command: 'curl -fsSL https://ollama.com/install.sh | sh',
                    description: 'Download and install Ollama',
                    language: 'bash'
                },
                {
                    command: 'ollama run gemma3:4b',
                    description: 'Download and test small test model',
                    language: 'bash'
                },
                {
                    command: 'systemctl edit ollama.service',
                    description: 'Open Ollama service configuration',
                    language: 'bash'
                },
                {
                    command: '',
                    description: 'Add the following environment variables',
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
                    description: 'Reload systemd manager',
                    language: 'bash'
                },
                {
                    command: 'sudo systemctl daemon-reload',
                    description: 'Reload Ollama service',
                    language: 'bash'
                },
                {
                    command: 'sudo systemctl restart ollama',
                    description: 'Restart Ollama service',
                    language: 'bash'
                },
                {
                    command: 'sudo ss -tulpen | grep 11434',
                    description: 'Check if Ollama is listening on port 11434',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'apache',
            title: 'Configure Apache2',
            description: 'Installation and configuration of Apache2 as reverse proxy for Ollama.',
            icon: 'mdi:web',
            commands: [
                {
                    command: 'sudo apt update && sudo apt install apache2 apache2-utils -y',
                    description: 'Install Apache2 and SSL modules',
                    language: 'bash'
                },
                {
                    command: 'sudo a2enmod proxy proxy_http ssl headers rewrite',
                    description: 'Enable required Apache modules',
                    language: 'bash'
                },
                {
                    command: 'sudo systemctl restart apache2',
                    description: 'Restart Apache2',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'ssl',
            title: 'Setup SSL Certificate',
            description: 'Setting up Let\'s Encrypt SSL certificates for secure HTTPS connections.',
            icon: 'mdi:shield-lock',
            commands: [
                {
                    command: 'sudo apt install certbot python3-certbot-apache -y',
                    description: 'Install Certbot for Let\'s Encrypt',
                    language: 'bash'
                },
                {
                    command: 'sudo certbot --apache -d server.chad.lu --register-unsafely-without-email',
                    description: 'Request SSL certificate for domain',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'authentication',
            title: 'HTTP Basic Authentication',
            description: 'Configuration of HTTP Basic Authentication for secure API access.',
            icon: 'mdi:key',
            commands: [
                {
                    command: 'sudo mkdir -p /etc/apache2/htpasswd',
                    description: 'Create directory for auth files',
                    language: 'bash'
                },
                {
                    command: 'sudo htpasswd -c /etc/apache2/htpasswd/ollama-api.htpasswd apiuser',
                    description: 'Create user with password for HTTP Basic Auth',
                    note: 'Enter a secure password when prompted',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'virtualhost',
            title: 'Enable Virtual Host',
            description: 'Enabling the Virtual Host and restarting Apache services.',
            icon: 'mdi:server',
            commands: [
                {
                    command: 'sudo nano /etc/apache2/sites-available/server.chad.lu.conf',
                    description: 'Create the Apache Virtual Host configuration file',
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
                    description: 'Enable new site configuration',
                    language: 'bash'
                },
                {
                    command: 'sudo a2dissite 000-default.conf',
                    description: 'Disable default Apache site',
                    language: 'bash'
                },
                {
                    command: 'sudo a2dissite 000-default-le-ssl.conf',
                    description: 'Disable default SSL site',
                    language: 'bash'
                },
                {
                    command: 'sudo systemctl reload apache2',
                    description: 'Reload Apache configuration',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'testing',
            title: 'Test Installation',
            description: 'Verification of the installation and testing API functionality.',
            icon: 'mdi:test-tube',
            commands: [
                {
                    command: 'curl -u apiuser https://server.chad.lu/ollama/api/generate -H "Content-Type: application/json" -d \'{"model": "gemma3:4b", "prompt": "ErzÃ¤hl mir eine Geschichte.", "stream": true}\'',
                    description: 'Test API endpoint with curl',
                    note: 'You will be prompted for the \'apiuser\' password. On successful test, you will receive JSON responses with generated text fragments.',
                    language: 'bash'
                }
            ]
        }
    ],
    troubleshooting: [
        {
            id: 'ollama-issues',
            title: 'Ollama Issues',
            icon: 'mdi:robot-angry',
            commands: [
                {
                    command: 'sudo ss -tulpen | grep 11434',
                    description: 'Check which service is running on port 11434',
                    language: 'bash'
                },
                {
                    command: 'sudo systemctl status ollama',
                    description: 'Check Ollama service status',
                    language: 'bash'
                },
                {
                    command: 'sudo journalctl -u ollama -f',
                    description: 'Show Ollama service logs',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'apache-issues',
            title: 'Apache Issues',
            icon: 'mdi:web-off',
            commands: [
                {
                    command: 'sudo apache2ctl configtest',
                    description: 'Test Apache configuration',
                    language: 'bash'
                },
                {
                    command: 'sudo systemctl status apache2',
                    description: 'Check Apache service status',
                    language: 'bash'
                },
                {
                    command: 'sudo tail -f /var/log/apache2/error.log',
                    description: 'Show Apache error logs',
                    language: 'bash'
                }
            ]
        },
        {
            id: 'ssl-issues',
            title: 'SSL Issues',
            icon: 'mdi:shield-alert',
            commands: [
                {
                    command: 'sudo certbot certificates',
                    description: 'List all Certbot certificates',
                    language: 'bash'
                },
                {
                    command: 'sudo certbot renew --dry-run',
                    description: 'Test certificate renewal',
                    language: 'bash'
                },
                {
                    command: 'openssl s_client -connect server.chad.lu:443',
                    description: 'Test SSL connection with OpenSSL',
                    language: 'bash'
                }
            ]
        }
    ],
    completion: {
        title: 'documentations.ollamaSetup.completion.title',
        message: 'documentations.ollamaSetup.completion.description'
    }
}
