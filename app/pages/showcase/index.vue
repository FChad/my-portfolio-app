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

</script>

<template>
    <!-- Showcase Section -->
    <section class="py-12 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
                    {{ t('showcase.title') }}
                </h1>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                    {{ t('showcase.subtitle') }}
                </p>
            </div>

            <!-- Filter & Search -->
            <div class="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8 lg:mb-10">
                <!-- Filter Buttons -->
                <div class="flex flex-wrap gap-2 md:gap-3">
                    <UiButton variant="secondary" size="sm" :active="activeFilter === 'all'"
                        @click="activeFilter = 'all'" class="gap-2">
                        <Icon name="mdi:view-grid" class="w-4 h-4 md:w-5 md:h-5" />
                        <span>{{ t('showcase.filters.all') }}</span>
                    </UiButton>
                    <UiButton variant="secondary" size="sm" :active="activeFilter === 'project'"
                        @click="activeFilter = 'project'" class="gap-2">
                        <Icon name="mdi:code-braces" class="w-4 h-4 md:w-5 md:h-5" />
                        <span>{{ t('showcase.filters.projects') }}</span>
                    </UiButton>
                    <UiButton variant="secondary" size="sm" :active="activeFilter === 'documentation'"
                        @click="activeFilter = 'documentation'" class="gap-2">
                        <Icon name="mdi:file-document-outline" class="w-4 h-4 md:w-5 md:h-5" />
                        <span>{{ t('showcase.filters.documentation') }}</span>
                    </UiButton>
                </div>

                <!-- Search Bar -->
                <div class="flex-1 basis-full sm:basis-auto max-w-md sm:ml-auto">
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                            <Icon name="mdi:magnify" class="w-5 h-5 text-neutral-400" />
                        </div>
                        <input v-model="searchTerm" type="text" :placeholder="t('showcase.search.placeholder')"
                            class="w-full pl-11 pr-10 py-2.5 md:py-3 text-sm md:text-base bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-neutral-900 dark:text-white placeholder-neutral-400 transition-all" />
                        <button v-if="searchTerm" @click="searchTerm = ''"
                            class="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                            <Icon name="mdi:close" class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Showcase Items Grid -->
            <div v-if="filteredItems.length" class="grid sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                <UiCard v-for="item in filteredItems" :key="item.id" class="relative">
                    <div class="flex flex-col gap-4 md:gap-5 lg:gap-6 h-full">
                        <!-- Header with icon and type badge -->
                        <div class="flex items-start justify-between gap-3">
                            <div class="flex items-center gap-3 md:gap-4">
                                <UiIconBox
                                    :icon="item.type === 'project' ? 'mdi:code-braces' : 'mdi:file-document-outline'" />
                                <div class="flex flex-col gap-0.5 md:gap-1">
                                    <h3
                                        class="text-lg md:text-xl lg:text-2xl font-bold text-neutral-800 dark:text-white">
                                        {{ t(item.title) }}
                                    </h3>
                                    <span
                                        class="text-xs md:text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                                        {{ t(`showcase.filters.${item.type === 'project' ? 'projects' :
                                            'documentation'}`) }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Description -->
                        <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed flex-1">
                            {{ t(item.description) }}
                        </p>

                        <!-- Action Button -->
                        <div class="mt-auto pt-1">
                            <UiButton variant="secondary" size="sm" :to="item.link">
                                <span class="flex items-center gap-2 sm:gap-3">
                                    {{ t('showcase.labels.viewDetails') }}
                                    <Icon name="mdi:arrow-right"
                                        class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform" />
                                </span>
                            </UiButton>
                        </div>
                    </div>
                </UiCard>
            </div>
            <div v-else class="text-center py-12 md:py-16">
                <div
                    class="w-16 h-16 md:w-20 md:h-20 bg-neutral-200 dark:bg-neutral-700 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <Icon name="mdi:magnify-close"
                        class="w-8 h-8 md:w-10 md:h-10 text-neutral-400 dark:text-neutral-500" />
                </div>
                <h3 class="text-lg md:text-xl lg:text-2xl font-bold text-neutral-800 dark:text-white mb-2">
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
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
                    {{ t('about.cta.title') }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                    {{ t('about.cta.subtitle') }}
                </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center">
                <UiButton variant="primary" to="/contact">
                    <span class="flex items-center gap-2 sm:gap-3">
                        {{ t('about.cta.button') }}
                        <Icon name="mdi:arrow-right"
                            class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                </UiButton>

                <UiButton variant="secondary" to="/about">
                    <span class="flex items-center gap-2 sm:gap-3">
                        <Icon name="mdi:account"
                            class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform" />
                        {{ t('home.about.cta') }}
                    </span>
                </UiButton>
            </div>
        </div>
    </section>
</template>
