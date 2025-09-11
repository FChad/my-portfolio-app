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
    <main class="overflow-hidden">
        <section class="relative py-20 min-h-[calc(100vh-65px)] bg-gray-50 dark:bg-gray-800/50">
            <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>

            <div class="relative flex flex-col gap-8 z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col gap-6 justify-center items-center">
                    <h1 class="text-5xl md:text-6xl font-black">
                        <span class="uppercase block text-gray-700 dark:text-gray-300">
                            {{ t('showcase.title') }}
                        </span>
                    </h1>
                    <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        {{ t('showcase.subtitle') }}
                    </p>
                </div>

                <div class="flex flex-col gap-8">

                    <!-- Mobile-Optimized Filter Tabs -->
                    <div class="flex justify-center px-4">
                        <div
                            class="w-full max-w-md sm:max-w-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1 shadow-md">
                            <!-- Mobile: Vertical Stack, Desktop: Horizontal -->
                            <div class="flex flex-col sm:flex-row gap-1">
                                <button @click="activeFilter = 'all'"
                                    :class="activeFilter === 'all' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700'"
                                    class="w-full sm:flex-1 px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2">
                                    <Icon name="mdi:view-grid" class="w-4 h-4 sm:hidden" />
                                    <span class="text-sm sm:text-base">{{ t('showcase.filters.all') }}</span>
                                    <span class="px-2 py-1 text-xs rounded-full ml-auto sm:ml-2"
                                        :class="activeFilter === 'all' ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'">
                                        {{ totalCount }}
                                    </span>
                                </button>
                                <button @click="activeFilter = 'project'"
                                    :class="activeFilter === 'project' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700'"
                                    class="w-full sm:flex-1 px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2">
                                    <Icon name="mdi:code-braces" class="w-4 h-4 sm:hidden" />
                                    <span class="text-sm sm:text-base">{{ t('showcase.filters.projects') }}</span>
                                    <span class="px-2 py-1 text-xs rounded-full ml-auto sm:ml-2"
                                        :class="activeFilter === 'project' ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'">
                                        {{ projectCount }}
                                    </span>
                                </button>
                                <button @click="activeFilter = 'documentation'"
                                    :class="activeFilter === 'documentation' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700'"
                                    class="w-full sm:flex-1 px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2">
                                    <Icon name="mdi:file-document-outline" class="w-4 h-4 sm:hidden" />
                                    <span class="text-sm sm:text-base">{{ t('showcase.filters.documentation') }}</span>
                                    <span class="px-2 py-1 text-xs rounded-full ml-auto sm:ml-2"
                                        :class="activeFilter === 'documentation' ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'">
                                        {{ documentationCount }}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Showcase Items Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                        <div v-for="item in filteredItems" :key="item.id"
                            class="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform flex flex-col w-full hover:shadow-2xl">
                            <!-- Image -->
                            <div class="h-56 bg-gray-200 dark:bg-gray-900 relative overflow-hidden">
                                <img v-if="item.image" :src="item.image" :alt="t(item.title)"
                                    class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
                            </div>

                            <!-- Content -->
                            <div class="p-6 flex flex-col gap-4">
                                <div class="flex-1 flex flex-col gap-4">
                                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                                        {{ t(item.title) }}
                                    </h3>
                                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                                        {{ t(item.description) }}
                                    </p>

                                    <!-- Tags -->
                                    <div class="flex flex-wrap gap-2">
                                        <span v-for="tag in item.tags.slice(0, 3)" :key="tag"
                                            class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                                            {{ tag }}
                                        </span>
                                        <span v-if="item.tags.length > 3"
                                            class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full text-xs">
                                            +{{ item.tags.length - 3 }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <!-- Action Button -->
                            <div class="flex-1 flex justify-between items-end p-6 pt-0">
                                <!-- Type Badge -->
                                <span
                                    :class="item.type === 'project' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'"
                                    class="px-3 py-1 rounded-full text-sm font-medium capitalize">
                                    <Icon
                                        :name="item.type === 'project' ? 'mdi:code-braces' : 'mdi:file-document-outline'"
                                        class="w-4 h-4 inline mr-1" />
                                    {{ t(`showcase.filters.${item.type === 'project' ? 'projects' : 'documentation'}`)
                                    }}
                                </span>

                                <!-- Details Button -->
                                <NuxtLink :to="item.link"
                                    class="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform">
                                    <Icon name="mdi:arrow-right" class="w-4 h-4" />
                                    {{ t('showcase.labels.viewDetails') }}
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
