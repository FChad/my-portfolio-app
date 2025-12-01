<script setup lang="ts">
const { t } = useI18n()
const { setSeoMeta } = useSeo()
const { getAllConfigs } = useDocumentation()

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

// Static project items
const projectItems: ShowcaseItem[] = [
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
    }
]

// Generate documentation items from centralized registry
const documentationItems = computed<ShowcaseItem[]>(() => {
    const configs = getAllConfigs()
    return configs.map((config, index) => ({
        id: projectItems.length + index + 1,
        title: config.titleKey,
        description: config.descriptionKey,
        tags: config.tags,
        link: `/showcase/documentation/${config.slug}`,
        type: 'documentation' as const
    }))
})

// Combine all items
const showcaseItems = computed<ShowcaseItem[]>(() => [
    ...projectItems,
    ...documentationItems.value
])

// Filter functionality
const activeFilter = ref<'all' | 'project' | 'documentation'>('all')
const searchTerm = ref('')

const filteredItems = computed(() => {
    let items = showcaseItems.value

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
const projectCount = computed(() => showcaseItems.value.filter(item => item.type === 'project').length)
const documentationCount = computed(() => showcaseItems.value.filter(item => item.type === 'documentation').length)
const totalCount = computed(() => showcaseItems.value.length)

</script>

<template>
    <!-- Single Compact Section -->
    <section class="relative min-h-screen overflow-hidden py-12 sm:py-16 md:py-20">
        <!-- Animated gradient background -->
        <div
            class="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div class="space-y-6 md:space-y-8">
                <!-- Header -->
                <div class="text-center space-y-3 md:space-y-4">
                    <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 dark:text-white">
                        {{ t('showcase.title') }}
                    </h1>
                    <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        {{ t('showcase.subtitle') }}
                    </p>
                </div>

                <!-- Filter and Search Bar -->
                <div class="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <!-- Filter Buttons -->
                    <div class="flex flex-col sm:flex-row gap-2">
                        <button @click="activeFilter = 'all'"
                            :class="activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700'"
                            class="px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium text-sm md:text-base flex items-center justify-center gap-2 shadow-sm transition-all">
                            <Icon name="mdi:view-grid" class="w-4 h-4" />
                            <span>{{ t('showcase.filters.all') }}</span>
                            <span class="px-2 py-0.5 text-xs rounded-full"
                                :class="activeFilter === 'all' ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'">
                                {{ totalCount }}
                            </span>
                        </button>
                        <button @click="activeFilter = 'project'"
                            :class="activeFilter === 'project' ? 'bg-green-600 text-white' : 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-700'"
                            class="px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium text-sm md:text-base flex items-center justify-center gap-2 shadow-sm transition-all">
                            <Icon name="mdi:code-braces" class="w-4 h-4" />
                            <span>{{ t('showcase.filters.projects') }}</span>
                            <span class="px-2 py-0.5 text-xs rounded-full"
                                :class="activeFilter === 'project' ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'">
                                {{ projectCount }}
                            </span>
                        </button>
                        <button @click="activeFilter = 'documentation'"
                            :class="activeFilter === 'documentation' ? 'bg-amber-600 text-white' : 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-gray-700'"
                            class="px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium text-sm md:text-base flex items-center justify-center gap-2 shadow-sm transition-all">
                            <Icon name="mdi:file-document-outline" class="w-4 h-4" />
                            <span>{{ t('showcase.filters.documentation') }}</span>
                            <span class="px-2 py-0.5 text-xs rounded-full"
                                :class="activeFilter === 'documentation' ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'">
                                {{ documentationCount }}
                            </span>
                        </button>
                    </div>

                    <!-- Search Bar -->
                    <div class="flex-1 max-w-md sm:ml-auto">
                        <div class="relative flex items-center gap-2">
                            <Icon name="mdi:magnify" class="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <input v-model="searchTerm" type="text" :placeholder="t('showcase.search.placeholder')"
                                class="w-full px-4 py-2 text-sm md:text-base bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400" />
                            <button v-if="searchTerm" @click="searchTerm = ''"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <Icon name="mdi:close" class="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Showcase Items Grid -->
                <div class="grid sm:grid-cols-2 gap-4 md:gap-6">
                    <div v-for="item in filteredItems" :key="item.id"
                        class="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1">
                        <!-- Content -->
                        <div class="p-5 md:p-6 flex flex-col gap-3 md:gap-4 flex-1">
                            <div class="flex items-start justify-between gap-2">
                                <h3
                                    class="text-lg sm:text-xl md:text-2xl font-black text-gray-800 dark:text-white flex-1">
                                    {{ t(item.title) }}
                                </h3>
                                <span
                                    :class="item.type === 'project' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'"
                                    class="px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium flex items-center gap-1 flex-shrink-0">
                                    <Icon
                                        :name="item.type === 'project' ? 'mdi:code-braces' : 'mdi:file-document-outline'"
                                        class="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    <span class="hidden sm:inline">{{ t(`showcase.filters.${item.type === 'project' ?
                                        'projects' : 'documentation'}`) }}</span>
                                </span>
                            </div>

                            <p class="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
                                {{ t(item.description) }}
                            </p>

                            <!-- Tags -->
                            <div class="flex flex-wrap gap-1.5 md:gap-2">
                                <span v-for="tag in item.tags.slice(0, 4)" :key="tag"
                                    class="px-2 py-0.5 md:px-3 md:py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs md:text-sm font-medium">
                                    {{ tag }}
                                </span>
                                <span v-if="item.tags.length > 4"
                                    class="px-2 py-0.5 md:px-3 md:py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full text-xs md:text-sm">
                                    +{{ item.tags.length - 4 }}
                                </span>
                            </div>

                            <!-- Action Button -->
                            <div class="mt-auto">
                                <NuxtLinkLocale :to="item.link"
                                    class="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-blue-600 text-white rounded-lg md:rounded-xl font-bold text-sm md:text-base hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                                    <Icon name="mdi:open-in-new" class="w-4 h-4 md:w-5 md:h-5" />
                                    {{ t('showcase.labels.viewDetails') }}
                                </NuxtLinkLocale>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
