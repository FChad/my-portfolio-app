<script setup lang="ts">
const { t } = useI18n()
const { setSeoMeta } = useSeo()

setSeoMeta({
    title: t('seo.showcase.title'),
    description: t('seo.showcase.description'),
    keywords: t('seo.showcase.keywords')
})

interface ShowcaseItem {
    id: number;
    title: string;
    description: string;
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
        tags: ["Nuxt3", "Vue3", "TypeScript", "Pinia", "Tailwind", "Ollama", "AI", "Chat", "SSE"],
        link: '/showcase/project/my-chat-bot',
        type: 'project'
    },
    {
        id: 2,
        title: "showcase.projects.myPortfolio.title",
        description: "showcase.projects.myPortfolio.description",
        tags: ["Nuxt3", "TypeScript", "Tailwind", "i18n", "VeeValidate", "Resend", "Iconify"],
        link: '/showcase/project/my-portfolio-website',
        type: 'project'
    },
    {
        id: 3,
        title: "showcase.documentation.debianInitialSetup.title",
        description: "showcase.documentation.debianInitialSetup.description",
        tags: ["Debian 12", "Server Setup", "Linux", "System Administration"],
        link: '/showcase/documentation/debian-12-initial-setup',
        type: 'documentation'
    },
    {
        id: 4,
        title: "showcase.documentation.ollamaSetup.title",
        description: "showcase.documentation.ollamaSetup.description",
        tags: ["Debian 12", "Ollama", "Apache2", "SSL/TLS", "API", "AI"],
        link: '/showcase/documentation/debian-ollama-setup',
        type: 'documentation'
    },
    {
        id: 5,
        title: "showcase.documentation.cardanoNodeSetup.title",
        description: "showcase.documentation.cardanoNodeSetup.description",
        tags: ["Debian 12", "Cardano", "NIX", "Blockchain", "Cryptocurrency", "Node"],
        link: '/showcase/documentation/debian-cardano-node-setup',
        type: 'documentation'
    },
    {
        id: 6,
        title: "showcase.documentation.cardanoDbSyncSetup.title",
        description: "showcase.documentation.cardanoDbSyncSetup.description",
        tags: ["Debian 12", "Cardano DB Sync", "PostgreSQL", "NIX", "Blockchain", "Database"],
        link: '/showcase/documentation/debian-cardano-db-sync-setup',
        type: 'documentation'
    }
];

// Filter functionality
const activeFilter = ref<'all' | 'project' | 'documentation'>('all')
const searchTerm = ref('')

const filteredItems = computed(() => {
    let items = showcaseItems

    // Filter by type
    if (activeFilter.value !== 'all') {
        items = items.filter(item => item.type === activeFilter.value)
    }

    // Filter by search term
    if (searchTerm.value.trim()) {
        const search = searchTerm.value.toLowerCase().trim()
        items = items.filter(item => {
            const title = t(item.title).toLowerCase()
            const description = t(item.description).toLowerCase()
            const tags = item.tags.join(' ').toLowerCase()
            return title.includes(search) || description.includes(search) || tags.includes(search)
        })
    }

    return items
})

// Count items for badges
const projectCount = computed(() => showcaseItems.filter(item => item.type === 'project').length)
const documentationCount = computed(() => showcaseItems.filter(item => item.type === 'documentation').length)
const totalCount = computed(() => showcaseItems.length)

</script>

<template>
    <!-- Hero Section -->
    <section class="py-16 md:py-24 min-h-[calc(100vh-65px)]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
            <h1 class="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400 text-center">
                {{ t('showcase.title') }}
            </h1>

            <!-- Introduction -->
            <div class="max-w-4xl mx-auto text-center">
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {{ t('showcase.subtitle') }}
                </p>
            </div>


            <!-- Filter and Search Bar -->
            <div class="flex flex-col sm:flex-row gap-4">
                <!-- Filter Buttons -->
                <div class="flex flex-col sm:flex-row gap-2">
                    <button @click="activeFilter = 'all'"
                        :class="activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700'"
                        class="px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-sm">
                        <Icon name="mdi:view-grid" class="w-4 h-4" />
                        <span>{{ t('showcase.filters.all') }}</span>
                        <span class="px-2 py-1 text-xs rounded-full"
                            :class="activeFilter === 'all' ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'">
                            {{ totalCount }}
                        </span>
                    </button>
                    <button @click="activeFilter = 'project'"
                        :class="activeFilter === 'project' ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-700'"
                        class="px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-sm">
                        <Icon name="mdi:code-braces" class="w-4 h-4" />
                        <span>{{ t('showcase.filters.projects') }}</span>
                        <span class="px-2 py-1 text-xs rounded-full"
                            :class="activeFilter === 'project' ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'">
                            {{ projectCount }}
                        </span>
                    </button>
                    <button @click="activeFilter = 'documentation'"
                        :class="activeFilter === 'documentation' ? 'bg-amber-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-gray-700'"
                        class="px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-sm">
                        <Icon name="mdi:file-document-outline" class="w-4 h-4" />
                        <span>{{ t('showcase.filters.documentation') }}</span>
                        <span class="px-2 py-1 text-xs rounded-full"
                            :class="activeFilter === 'documentation' ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'">
                            {{ documentationCount }}
                        </span>
                    </button>
                </div>

                <!-- Search Bar -->
                <div class="flex-1 max-w-md ml-auto">
                    <div class="relative">
                        <Icon name="mdi:magnify"
                            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input v-model="searchTerm" type="text" :placeholder="t('showcase.search.placeholder')"
                            class="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400" />
                        <button v-if="searchTerm" @click="searchTerm = ''"
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Icon name="mdi:close" class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Showcase Items Grid -->
            <div class="grid md:grid-cols-2 gap-8">
                <div v-for="item in filteredItems" :key="item.id"
                    class="group bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-lg overflow-hidden flex flex-col">
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
                            <NuxtLinkLocale :to="item.link"
                                class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md hover:shadow-lg">
                                <Icon name="mdi:open-in-new" class="w-5 h-5" />
                                {{ t('showcase.labels.viewDetails') }}
                            </NuxtLinkLocale>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
