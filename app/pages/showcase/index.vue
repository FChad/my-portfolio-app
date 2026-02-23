<script setup lang="ts">
const { t } = useI18n()
const { setSeoMeta } = useSeo()
const { getAllConfigs: getAllDocConfigs } = useDocumentation()
const { getAllConfigs: getAllProjectConfigs } = useProjects()

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

// Generate project items from centralized registry
const projectItems = computed<ShowcaseItem[]>(() => {
    const configs = getAllProjectConfigs()
    return configs.map((config, index) => ({
        id: index + 1,
        title: config.titleKey,
        description: config.descriptionKey,
        tags: config.tags,
        link: `/showcase/project/${config.slug}`,
        type: 'project' as const
    }))
})

// Generate documentation items from centralized registry
const documentationItems = computed<ShowcaseItem[]>(() => {
    const configs = getAllDocConfigs()
    return configs.map((config, index) => ({
        id: projectItems.value.length + index + 1,
        title: config.titleKey,
        description: config.descriptionKey,
        tags: config.tags,
        link: `/showcase/documentation/${config.slug}`,
        type: 'documentation' as const
    }))
})

// Combine all items
const showcaseItems = computed<ShowcaseItem[]>(() => [
    ...projectItems.value,
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
    <!-- Showcase Section -->
    <section class="py-12 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-800 dark:text-white">
                    {{ t('showcase.title') }}
                </h1>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                    {{ t('showcase.subtitle') }}
                </p>
            </div>

            <!-- Filter & Search -->
            <div class="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <!-- Filter Buttons -->
                <div class="flex flex-col sm:flex-row gap-2 md:gap-3">
                    <button @click="activeFilter = 'all'"
                        :class="activeFilter === 'all' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 hover:shadow-xl shadow-md'"
                        class="cursor-pointer px-4 py-2.5 md:px-5 md:py-3 rounded-xl md:rounded-2xl font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5">
                        <Icon name="mdi:view-grid" class="w-4 h-4 md:w-5 md:h-5" />
                        <span>{{ t('showcase.filters.all') }}</span>
                        <span class="px-2 py-0.5 text-xs rounded-full font-medium"
                            :class="activeFilter === 'all' ? 'bg-white/20' : 'bg-neutral-200 dark:bg-neutral-700'">
                            {{ totalCount }}
                        </span>
                    </button>
                    <button @click="activeFilter = 'project'"
                        :class="activeFilter === 'project' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 hover:shadow-xl shadow-md'"
                        class="cursor-pointer px-4 py-2.5 md:px-5 md:py-3 rounded-xl md:rounded-2xl font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5">
                        <Icon name="mdi:code-braces" class="w-4 h-4 md:w-5 md:h-5" />
                        <span>{{ t('showcase.filters.projects') }}</span>
                        <span class="px-2 py-0.5 text-xs rounded-full font-medium"
                            :class="activeFilter === 'project' ? 'bg-white/20' : 'bg-neutral-200 dark:bg-neutral-700'">
                            {{ projectCount }}
                        </span>
                    </button>
                    <button @click="activeFilter = 'documentation'"
                        :class="activeFilter === 'documentation' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 hover:shadow-xl shadow-md'"
                        class="cursor-pointer px-4 py-2.5 md:px-5 md:py-3 rounded-xl md:rounded-2xl font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5">
                        <Icon name="mdi:file-document-outline" class="w-4 h-4 md:w-5 md:h-5" />
                        <span>{{ t('showcase.filters.documentation') }}</span>
                        <span class="px-2 py-0.5 text-xs rounded-full font-medium"
                            :class="activeFilter === 'documentation' ? 'bg-white/20' : 'bg-neutral-200 dark:bg-neutral-700'">
                            {{ documentationCount }}
                        </span>
                    </button>
                </div>

                <!-- Search Bar -->
                <div class="flex-1 max-w-md sm:ml-auto">
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                            <Icon name="mdi:magnify" class="w-5 h-5 text-neutral-400" />
                        </div>
                        <input v-model="searchTerm" type="text" :placeholder="t('showcase.search.placeholder')"
                            class="w-full pl-11 pr-10 py-2.5 md:py-3 text-sm md:text-base bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-neutral-900 dark:text-white placeholder-neutral-400 shadow-md transition-all" />
                        <button v-if="searchTerm" @click="searchTerm = ''"
                            class="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                            <Icon name="mdi:close" class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Showcase Items Grid -->
            <div v-if="filteredItems.length" class="grid sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                <div v-for="item in filteredItems" :key="item.id"
                    class="group relative bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div class="flex flex-col gap-4 md:gap-5 lg:gap-6 h-full">
                        <!-- Header with icon and type badge -->
                        <div class="flex items-start justify-between gap-3">
                            <div class="flex items-center gap-3 md:gap-4">
                                <div
                                    class="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 bg-blue-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                                    <Icon :name="item.type === 'project' ? 'mdi:code-braces' : 'mdi:file-document-outline'"
                                        class="w-6 h-6 md:w-6.5 md:h-6.5 lg:w-7 lg:h-7 text-white" />
                                </div>
                                <div class="space-y-0.5 md:space-y-1">
                                    <h3 class="text-lg md:text-xl lg:text-2xl font-black text-neutral-800 dark:text-white">
                                        {{ t(item.title) }}
                                    </h3>
                                    <span class="text-xs md:text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                                        {{ t(`showcase.filters.${item.type === 'project' ? 'projects' : 'documentation'}`) }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Description -->
                        <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed flex-1">
                            {{ t(item.description) }}
                        </p>

                        <!-- Tags -->
                        <div class="flex flex-wrap gap-1.5 md:gap-2">
                            <span v-for="tag in item.tags.slice(0, 4)" :key="tag"
                                class="px-2.5 py-1 sm:px-3 sm:py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-300">
                                {{ tag }}
                            </span>
                            <span v-if="item.tags.length > 4"
                                class="px-2.5 py-1 sm:px-3 sm:py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 rounded-full text-xs sm:text-sm font-medium">
                                +{{ item.tags.length - 4 }}
                            </span>
                        </div>

                        <!-- Action Button -->
                        <div class="mt-auto pt-1">
                            <NuxtLinkLocale :to="item.link"
                                class="group/btn inline-flex items-center justify-center px-5 sm:px-7 py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                <span class="flex items-center gap-2 sm:gap-3">
                                    <Icon name="mdi:eye" class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform" />
                                    {{ t('showcase.labels.viewDetails') }}
                                </span>
                            </NuxtLinkLocale>
                        </div>
                    </div>
                </div>
            </div>

            <!-- No Results -->
            <div v-else class="text-center py-12 md:py-16">
                <div class="w-16 h-16 md:w-20 md:h-20 bg-neutral-200 dark:bg-neutral-700 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <Icon name="mdi:magnify-close" class="w-8 h-8 md:w-10 md:h-10 text-neutral-400 dark:text-neutral-500" />
                </div>
                <h3 class="text-lg md:text-xl lg:text-2xl font-black text-neutral-800 dark:text-white mb-2">
                    {{ t('showcase.noResults.title') }}
                </h3>
                <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-300">
                    {{ t('showcase.noResults.description') }}
                </p>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-12 md:py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-900">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="flex flex-col gap-3 md:gap-4 mb-6 md:mb-8">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-800 dark:text-white">
                    {{ t('about.cta.title') }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                    {{ t('about.cta.subtitle') }}
                </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center">
                <NuxtLinkLocale to="/contact"
                    class="group w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center hover:-translate-y-1">
                    <span class="flex items-center gap-2 sm:gap-3">
                        {{ t('about.cta.button') }}
                        <Icon name="mdi:arrow-right"
                            class="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                </NuxtLinkLocale>

                <NuxtLinkLocale to="/about"
                    class="group w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center hover:-translate-y-1">
                    <span class="flex items-center gap-2 sm:gap-3">
                        <Icon name="mdi:account"
                            class="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                        {{ t('home.about.cta') }}
                    </span>
                </NuxtLinkLocale>
            </div>
        </div>
    </section>
</template>
