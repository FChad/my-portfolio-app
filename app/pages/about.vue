<script setup lang="ts">
const { t } = useI18n()

// Skills data organized by categories
const programmingSkills = [
    { name: 'Python', icon: 'devicon:python' },
    { name: 'JavaScript', icon: 'devicon:javascript' },
    { name: 'TypeScript', icon: 'devicon:typescript' },
    { name: 'HTML5', icon: 'devicon:html5' },
    { name: 'CSS3', icon: 'devicon:css3' },
    { name: 'PHP', icon: 'devicon:php' },
    { name: 'SQL', icon: 'devicon:mysql' },
    { name: 'PowerShell', icon: 'devicon:powershell' },
    { name: 'Bash', icon: 'devicon:bash' }
]

const operatingSystems = [
    { name: 'Windows 10/11', icon: 'devicon:windows11' },
    { name: 'Windows Server', icon: 'devicon:windows8' },
    { name: 'Ubuntu', icon: 'devicon:ubuntu' },
    { name: 'Debian', icon: 'devicon:debian' },
    { name: 'Kali Linux', icon: 'simple-icons:kalilinux' }
]

const virtualization = [
    { name: 'VMware ESXi', icon: 'simple-icons:vmware' },
    { name: 'Proxmox', icon: 'simple-icons:proxmox' },
    { name: 'Docker', icon: 'devicon:docker' },
    { name: 'Kubernetes', icon: 'devicon:kubernetes' },
    { name: 'VirtualBox', icon: 'simple-icons:virtualbox' }
]

const languages = [
    { name: 'Luxemburgisch', level: 'C2', native: true, flag: 'circle-flags:lu' },
    { name: 'Deutsch', level: 'C1', flag: 'circle-flags:de' },
    { name: 'Englisch', level: 'B2', flag: 'circle-flags:gb' },
    { name: 'Französisch', level: 'B1', flag: 'circle-flags:fr' }
]

const certifications = [
    {
        title: 'Die allgemeine Eignungsprüfung',
        year: '2023',
        description: 'Staatlicher Sektor (Verwaltung)',
        icon: 'heroicons:academic-cap'
    },
    {
        title: 'Cisco Certified CyberOps Associate',
        year: '2021',
        description: 'Cybersecurity Operations',
        icon: 'heroicons:shield-check'
    },
    {
        title: 'Cisco Certified Network Associate',
        year: '2020-2021',
        description: 'Enterprise-Netzwerke, Sicherheit und Automatisierung',
        icon: 'heroicons:server'
    },
    {
        title: 'Microsoft Office Specialist 2016',
        year: '2020',
        description: 'PowerPoint, Word, Excel, Outlook',
        icon: 'simple-icons:microsoft'
    }
]

const timeline = [
    {
        year: '2024',
        title: 'Web-Entwickler bei Rotyre SARL',
        description: 'Verantwortlich für die Wartung und Weiterentwicklung der Webseite mullerpneus.lu',
        icon: 'heroicons:code-bracket',
        type: 'work'
    },
    {
        year: '2023',
        title: 'Zertifizierung: Allgemeine Eignungsprüfung',
        description: 'Erfolgreicher Abschluss der staatlichen Prüfung für den öffentlichen Sektor',
        icon: 'heroicons:academic-cap',
        type: 'education'
    },
    {
        year: '2021',
        title: 'Diplom in Cloud Computing (BTS)',
        description: 'Höherer technischer Abschluss im Bereich Cloud Computing am Lycée Guillaume Kroll',
        icon: 'heroicons:cloud',
        type: 'education'
    },
    {
        year: '2020',
        title: 'Ferienjob als IT-Techniker',
        description: 'Tätigkeit am Lycée Guillaume Kroll: Installation von MIXvoip-Telefonen, Netzwerkmanagement',
        icon: 'heroicons:wrench-screwdriver',
        type: 'work'
    },
    {
        year: '2019',
        title: 'Diplom als IT-Techniker',
        description: 'Abschluss am Lycée Guillaume Kroll in Esch-sur-Alzette mit der Bewertung "Gut"',
        icon: 'heroicons:academic-cap',
        type: 'education'
    }
]

const experiences = [
    {
        title: 'Helikopterrundflug',
        description: 'Ein unvergessliches Erlebnis über die Landschaften Luxemburgs',
        icon: 'heroicons:paper-airplane'
    },
    {
        title: 'Fallschirmsprung über Luxemburg',
        description: 'Adrenalinstoß aus 4000 Metern Höhe',
        icon: 'heroicons:arrow-down-circle'
    },
    {
        title: 'Tomorrowland Belgien 2025',
        description: 'Das ultimative elektronische Musikfestival-Erlebnis',
        icon: 'heroicons:musical-note'
    }
]
</script>

<template>
    <main class="overflow-hidden">
        <!-- Hero Section -->
        <section
            class="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>

            <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h1 class="text-5xl md:text-6xl font-black mb-6">
                        <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {{ $t('about.hero.title') }}
                        </span>
                    </h1>
                    <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        {{ $t('about.hero.subtitle') }}
                    </p>
                </div>

                <!-- Profile Card -->
                <div class="max-w-4xl mx-auto">
                    <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
                        <div class="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 class="text-3xl font-bold mb-6">{{ $t('about.profile.title') }}</h2>
                                <div class="space-y-4">
                                    <div class="flex items-center gap-4">
                                        <Icon name="heroicons:map-pin" class="w-5 h-5 text-blue-600" />
                                        <span>{{ $t('about.profile.location') }}</span>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <Icon name="heroicons:flag" class="w-5 h-5 text-blue-600" />
                                        <span>{{ $t('about.profile.nationality') }}</span>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <Icon name="heroicons:cake" class="w-5 h-5 text-blue-600" />
                                        <span>{{ $t('about.profile.age') }}</span>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <Icon name="heroicons:heart" class="w-5 h-5 text-blue-600" />
                                        <span>{{ $t('about.profile.status') }}</span>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <Icon name="heroicons:academic-cap" class="w-5 h-5 text-blue-600" />
                                        <span>{{ $t('about.profile.driving') }}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="text-center">
                                <div
                                    class="w-48 h-48 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                                    <Icon name="heroicons:user" class="w-24 h-24 text-white" />
                                </div>
                                <h3 class="text-2xl font-bold mb-2">Chad Feierstein</h3>
                                <p class="text-gray-600 dark:text-gray-400">{{ $t('about.profile.role') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Me Section -->
        <section class="py-20">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    <div>
                        <h2 class="text-4xl font-bold mb-6">{{ $t('about.story.title') }}</h2>
                        <div class="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            <p>{{ $t('about.story.intro') }}</p>
                            <p>{{ $t('about.story.journey') }}</p>
                            <p>{{ $t('about.story.passion') }}</p>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <div
                            class="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
                            <h3 class="text-xl font-bold mb-3 flex items-center gap-3">
                                <Icon name="heroicons:heart" class="w-6 h-6 text-red-500" />
                                {{ $t('about.passion.title') }}
                            </h3>
                            <p class="text-gray-600 dark:text-gray-300">{{ $t('about.passion.description') }}</p>
                        </div>

                        <div
                            class="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl">
                            <h3 class="text-xl font-bold mb-3 flex items-center gap-3">
                                <Icon name="heroicons:puzzle-piece" class="w-6 h-6 text-green-500" />
                                {{ $t('about.hobbies.title') }}
                            </h3>
                            <p class="text-gray-600 dark:text-gray-300">{{ $t('about.hobbies.description') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Languages Section -->
        <section class="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl font-bold text-center mb-16">{{ $t('about.languages.title') }}</h2>

                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="lang in languages" :key="lang.name"
                        class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                        <div class="flex items-center gap-3 mb-4">
                            <Icon :name="lang.flag" class="w-8 h-8" />
                            <h3 class="font-bold">{{ lang.name }}</h3>
                        </div>
                        <div class="text-center">
                            <span
                                class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xl rounded-full">
                                {{ lang.level }}
                            </span>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                {{ $t(`about.languages.levels.${lang.level}`) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Timeline Section -->
        <section class="py-20">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl font-bold text-center mb-16">{{ $t('about.timeline.title') }}</h2>

                <div class="relative">
                    <!-- Timeline line -->
                    <div
                        class="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-500 h-full">
                    </div>

                    <div class="space-y-12">
                        <div v-for="(item, index) in timeline" :key="item.year" :class="[
                            'relative flex items-center',
                            index % 2 === 0 ? 'justify-start' : 'justify-end'
                        ]">
                            <!-- Timeline dot -->
                            <div
                                class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 z-10 flex items-center justify-center">
                                <div class="w-3 h-3 bg-white rounded-full"></div>
                            </div>

                            <!-- Content card -->
                            <div :class="[
                                'w-5/12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg',
                                index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                            ]">
                                <div class="flex items-center gap-3 mb-3">
                                    <Icon :name="item.icon" :class="[
                                        'w-6 h-6',
                                        item.type === 'work' ? 'text-blue-600' : 'text-purple-600'
                                    ]" />
                                    <span class="text-sm font-medium text-gray-500">{{ item.year }}</span>
                                </div>
                                <h3 class="text-xl font-bold mb-2">{{ item.title }}</h3>
                                <p class="text-gray-600 dark:text-gray-300">{{ item.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Skills Section -->
        <section class="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl font-bold text-center mb-16">{{ $t('about.skills.title') }}</h2>

                <div class="space-y-12">
                    <!-- Programming Skills -->
                    <div>
                        <h3 class="text-2xl font-bold mb-6 text-center">{{ $t('about.skills.programming') }}</h3>
                        <div class="grid md:grid-cols-4 lg:grid-cols-6 gap-3">
                            <div v-for="skill in programmingSkills" :key="skill.name"
                                class="p-3 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                                <div class="text-center">
                                    <Icon :name="skill.icon" class="w-8 h-8 mx-auto mb-2" />
                                    <h4 class="font-medium text-sm">{{ skill.name }}</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Operating Systems -->
                    <div>
                        <h3 class="text-2xl font-bold mb-6 text-center">{{ $t('about.skills.os') }}</h3>
                        <div class="grid md:grid-cols-4 lg:grid-cols-6 gap-3">
                            <div v-for="os in operatingSystems" :key="os.name"
                                class="p-3 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                                <div class="text-center">
                                    <Icon :name="os.icon" class="w-8 h-8 mx-auto mb-2" />
                                    <h4 class="font-medium text-sm">{{ os.name }}</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Virtualization -->
                    <div>
                        <h3 class="text-2xl font-bold mb-6 text-center">{{ $t('about.skills.virtualization') }}</h3>
                        <div class="grid md:grid-cols-4 lg:grid-cols-6 gap-3">
                            <div v-for="virt in virtualization" :key="virt.name"
                                class="p-3 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                                <div class="text-center">
                                    <Icon :name="virt.icon" class="w-8 h-8 mx-auto mb-2" />
                                    <h4 class="font-medium text-sm">{{ virt.name }}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Certifications Section -->
        <section class="py-20">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl font-bold text-center mb-16">{{ $t('about.certifications.title') }}</h2>

                <div class="grid md:grid-cols-2 gap-8">
                    <div v-for="cert in certifications" :key="cert.title"
                        class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <div class="flex items-start gap-4">
                            <div
                                class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <Icon :name="cert.icon" class="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div class="flex items-center gap-3 mb-2">
                                    <h3 class="font-bold text-lg">{{ cert.title }}</h3>
                                    <span
                                        class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full">
                                        {{ cert.year }}
                                    </span>
                                </div>
                                <p class="text-gray-600 dark:text-gray-300">{{ cert.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Special Experiences Section -->
        <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl font-bold text-center mb-16">{{ $t('about.experiences.title') }}</h2>

                <div class="grid md:grid-cols-3 gap-8">
                    <div v-for="experience in experiences" :key="experience.title"
                        class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300">
                        <div class="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                            <Icon :name="experience.icon" class="w-8 h-8" />
                        </div>
                        <h3 class="text-xl font-bold mb-3">{{ experience.title }}</h3>
                        <p class="text-white/80">{{ experience.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-4xl font-bold mb-6">{{ $t('about.cta.title') }}</h2>
                <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
                    {{ $t('about.cta.subtitle') }}
                </p>
                <NuxtLink to="/contact"
                    class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                    {{ $t('about.cta.button') }}
                    <Icon name="heroicons:arrow-right" class="w-5 h-5" />
                </NuxtLink>
            </div>
        </section>
    </main>
</template>

<style scoped>
.bg-grid-pattern {
    background-image: radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 24px 24px;
}
</style>
