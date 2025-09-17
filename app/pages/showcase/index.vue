<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()

interface ShowcaseItem {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
    type: 'project' | 'documentation';
    icon?: string;
}

const showcaseItems: ShowcaseItem[] = [
    {
        id: 1,
        title: "showcase.projects.myChatBot.title",
        description: "showcase.projects.myChatBot.description",
        image: "/img/showcase/project/my-chat-bot-cover.svg",
        tags: ["Nuxt3", "Vue3", "TypeScript", "Pinia", "Tailwind", "Ollama", "AI", "Chat", "SSE"],
        link: localePath('/showcase/project/my-chat-bot'),
        type: 'project'
    },
    {
        id: 2,
        title: "showcase.projects.myPortfolio.title",
        description: "showcase.projects.myPortfolio.description",
        image: "/img/showcase/project/my-portfolio-website-cover.svg",
        tags: ["Nuxt3", "TypeScript", "Tailwind", "i18n", "VeeValidate", "Resend", "Iconify"],
        link: localePath('/showcase/project/my-portfolio-website'),
        type: 'project'
    },
    {
        id: 3,
        title: "showcase.documentation.debianInitialSetup.title",
        description: "showcase.documentation.debianInitialSetup.description",
        image: "/img/showcase/documentation/debian-12-initial-setup-cover.svg",
        tags: ["Debian 12", "Server Setup", "Linux", "System Administration"],
        link: localePath('/showcase/documentation/debian-12-initial-setup'),
        type: 'documentation'
    },
    {
        id: 4,
        title: "showcase.documentation.ollamaSetup.title",
        description: "showcase.documentation.ollamaSetup.description",
        image: "/img/showcase/documentation/ollama-debian-setup-cover.svg",
        tags: ["Debian 12", "Ollama", "Apache2", "SSL/TLS", "API", "AI"],
        link: localePath('/showcase/documentation/ollama-debian-setup'),
        type: 'documentation'
    },
    {
        id: 5,
        title: "showcase.documentation.cardanoNodeSetup.title",
        description: "showcase.documentation.cardanoNodeSetup.description",
        image: "/img/showcase/documentation/cardano-node-debian-setup-cover.svg",
        tags: ["Debian 12", "Cardano", "NIX", "Blockchain", "Cryptocurrency", "Node"],
        link: localePath('/showcase/documentation/cardano-node-debian-setup'),
        type: 'documentation'
    },
    {
        id: 6,
        title: "showcase.documentation.cardanoDbSyncSetup.title",
        description: "showcase.documentation.cardanoDbSyncSetup.description",
        image: "/img/showcase/documentation/cardano-db-sync-debian-setup-cover.svg",
        tags: ["Debian 12", "Cardano DB Sync", "PostgreSQL", "NIX", "Blockchain", "Database"],
        link: localePath('/showcase/documentation/cardano-db-sync-debian-setup'),
        type: 'documentation'
    }
];

// Filter functionality
const activeFilter = ref<'all' | 'project' | 'documentation'>('all')

const filteredItems = computed(() => {
    if (activeFilter.value === 'all') {
        return showcaseItems
    }
    return showcaseItems.filter(item => item.type === activeFilter.value)
})

// Count items for badges
const projectCount = computed(() => showcaseItems.filter(item => item.type === 'project').length)
const documentationCount = computed(() => showcaseItems.filter(item => item.type === 'documentation').length)
const totalCount = computed(() => showcaseItems.length)

</script>

<template>
    <!-- Hero Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6">
        <h1 class="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ t('showcase.title') }}
        </h1>

        <!-- Introduction -->
        <div class="max-w-4xl mx-auto text-center">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {{ t('showcase.subtitle') }}
            </p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex justify-center">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-md w-full">
                <div class="flex flex-col sm:flex-row gap-2">
                    <button @click="activeFilter = 'all'"
                        :class="activeFilter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700'"
                        class="flex-1 px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                        <Icon name="mdi:view-grid" class="w-4 h-4" />
                        <span>{{ t('showcase.filters.all') }}</span>
                        <span class="px-2 py-1 text-xs rounded-full"
                            :class="activeFilter === 'all' ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'">
                            {{ totalCount }}
                        </span>
                    </button>
                    <button @click="activeFilter = 'project'"
                        :class="activeFilter === 'project' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'text-gray-600 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'"
                        class="flex-1 px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                        <Icon name="mdi:code-braces" class="w-4 h-4" />
                        <span>{{ t('showcase.filters.projects') }}</span>
                        <span class="px-2 py-1 text-xs rounded-full"
                            :class="activeFilter === 'project' ? 'bg-green-200/50 dark:bg-green-800/50' : 'bg-gray-200 dark:bg-gray-700'">
                            {{ projectCount }}
                        </span>
                    </button>
                    <button @click="activeFilter = 'documentation'"
                        :class="activeFilter === 'documentation' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 'text-gray-600 dark:text-gray-300 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20'"
                        class="flex-1 px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                        <Icon name="mdi:file-document-outline" class="w-4 h-4" />
                        <span>{{ t('showcase.filters.documentation') }}</span>
                        <span class="px-2 py-1 text-xs rounded-full"
                            :class="activeFilter === 'documentation' ? 'bg-amber-200/50 dark:bg-amber-800/50' : 'bg-gray-200 dark:bg-gray-700'">
                            {{ documentationCount }}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Showcase Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-12">
        <!-- Showcase Items Grid -->
        <div class="grid md:grid-cols-2 gap-8">
            <div v-for="item in filteredItems" :key="item.id"
                class="group bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col">
                <!-- Image -->
                <div class="h-48 bg-gray-100 dark:bg-gray-900/50 relative overflow-hidden">
                    <img v-if="item.image" :src="item.image" :alt="t(item.title)"
                        class="w-full h-full object-cover transition-transform " />
                </div>

                <!-- Content -->
                <div class="p-6 flex flex-col gap-4 flex-1">
                    <div class="flex items-center justify-between">
                        <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                            {{ t(item.title) }}
                        </h3>
                        <span
                            :class="item.type === 'project' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'"
                            class="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                            <Icon :name="item.type === 'project' ? 'mdi:code-braces' : 'mdi:file-document-outline'"
                                class="w-4 h-4" />
                            {{ t(`showcase.filters.${item.type === 'project' ? 'projects' : 'documentation'}`) }}
                        </span>
                    </div>

                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
                        {{ t(item.description) }}
                    </p>

                    <!-- Tags -->
                    <div class="flex flex-wrap gap-2">
                        <span v-for="tag in item.tags.slice(0, 4)" :key="tag"
                            class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                            {{ tag }}
                        </span>
                        <span v-if="item.tags.length > 4"
                            class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full text-sm">
                            +{{ item.tags.length - 4 }}
                        </span>
                    </div>

                    <!-- Action Button -->
                    <div class="mt-auto ml-auto">
                        <NuxtLink :to="item.link"
                            class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
                            <Icon name="mdi:open-in-new" class="w-5 h-5" />
                            {{ t('showcase.labels.viewDetails') }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
