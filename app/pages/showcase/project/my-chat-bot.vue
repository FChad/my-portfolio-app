<script lang="ts" setup>
// Layout definieren
definePageMeta({
    layout: 'with-subnav'
})

// Subnavigation konfigurieren
const { t } = useI18n()
const { configure } = useSubNavigation()

onMounted(() => {
    configure({
        title: t('showcase.projects.myChatBot.title'),
        showBackButton: true,
        backTo: '/showcase',
        backLabel: 'Back to Showcase'
    })
})

// Color mapping for consistent theming
const colorMap = {
    blue: {
        bg: 'bg-blue-500',
        bgLight: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-800 dark:text-blue-300',
        textAccent: 'text-blue-600 dark:text-blue-400',
        hover: 'bg-blue-600 hover:bg-blue-700'
    },
    green: {
        bg: 'bg-green-500',
        bgLight: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-800 dark:text-green-300',
        textAccent: 'text-green-600 dark:text-green-400',
        hover: 'bg-green-600 hover:bg-green-700'
    },
    purple: {
        bg: 'bg-purple-500',
        bgLight: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-800 dark:text-purple-300',
        textAccent: 'text-purple-600 dark:text-purple-400',
        hover: 'bg-purple-600 hover:bg-purple-700'
    },
    orange: {
        bg: 'bg-orange-500',
        bgLight: 'bg-orange-100 dark:bg-orange-900/30',
        text: 'text-orange-800 dark:text-orange-300',
        textAccent: 'text-orange-600 dark:text-orange-400',
        hover: 'bg-orange-600 hover:bg-orange-700'
    },
    red: {
        bg: 'bg-red-500',
        bgLight: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-800 dark:text-red-300',
        textAccent: 'text-red-600 dark:text-red-400',
        hover: 'bg-red-600 hover:bg-red-700'
    }
} as const

// Helper function to get color classes
const getColorClasses = (color: string) => {
    return (colorMap as any)[color] || colorMap.blue
}

const keyFeatures = [
    {
        id: 'aiChat',
        title: 'projects.myChatBot.features.aiChat.title',
        description: 'projects.myChatBot.features.aiChat.description',
        icon: 'mdi:robot',
        color: 'blue'
    },
    {
        id: 'conversationManagement',
        title: 'projects.myChatBot.features.conversationManagement.title',
        description: 'projects.myChatBot.features.conversationManagement.description',
        icon: 'mdi:chat-processing',
        color: 'green'
    },
    {
        id: 'modelSelection',
        title: 'projects.myChatBot.features.modelSelection.title',
        description: 'projects.myChatBot.features.modelSelection.description',
        icon: 'mdi:brain',
        color: 'purple'
    },
    {
        id: 'streaming',
        title: 'projects.myChatBot.features.streaming.title',
        description: 'projects.myChatBot.features.streaming.description',
        icon: 'mdi:lightning-bolt',
        color: 'orange'
    },
    {
        id: 'localStorage',
        title: 'projects.myChatBot.features.localStorage.title',
        description: 'projects.myChatBot.features.localStorage.description',
        icon: 'mdi:content-save',
        color: 'red'
    },
    {
        id: 'modernUI',
        title: 'projects.myChatBot.features.modernUI.title',
        description: 'projects.myChatBot.features.modernUI.description',
        icon: 'mdi:palette',
        color: 'blue'
    }
];

const technologies = [
    {
        id: 'nuxt3',
        name: 'projects.myChatBot.technologies.nuxt3.name',
        tech: 'projects.myChatBot.technologies.nuxt3.tech',
        icon: 'mdi:nuxt',
        description: 'projects.myChatBot.technologies.nuxt3.description',
        color: 'green'
    },
    {
        id: 'vue3',
        name: 'projects.myChatBot.technologies.vue3.name',
        tech: 'projects.myChatBot.technologies.vue3.tech',
        icon: 'mdi:vuejs',
        description: 'projects.myChatBot.technologies.vue3.description',
        color: 'green'
    },
    {
        id: 'typescript',
        name: 'projects.myChatBot.technologies.typescript.name',
        tech: 'projects.myChatBot.technologies.typescript.tech',
        icon: 'mdi:language-typescript',
        description: 'projects.myChatBot.technologies.typescript.description',
        color: 'blue'
    },
    {
        id: 'pinia',
        name: 'projects.myChatBot.technologies.pinia.name',
        tech: 'projects.myChatBot.technologies.pinia.tech',
        icon: 'mdi:database',
        description: 'projects.myChatBot.technologies.pinia.description',
        color: 'purple'
    },
    {
        id: 'tailwind',
        name: 'projects.myChatBot.technologies.tailwind.name',
        tech: 'projects.myChatBot.technologies.tailwind.tech',
        icon: 'mdi:tailwind',
        description: 'projects.myChatBot.technologies.tailwind.description',
        color: 'blue'
    },
    {
        id: 'ollama',
        name: 'projects.myChatBot.technologies.ollama.name',
        tech: 'projects.myChatBot.technologies.ollama.tech',
        icon: 'mdi:robot',
        description: 'projects.myChatBot.technologies.ollama.description',
        color: 'orange'
    },
    {
        id: 'highlight',
        name: 'projects.myChatBot.technologies.highlight.name',
        tech: 'projects.myChatBot.technologies.highlight.tech',
        icon: 'mdi:code-tags',
        description: 'projects.myChatBot.technologies.highlight.description',
        color: 'red'
    },
    {
        id: 'marked',
        name: 'projects.myChatBot.technologies.marked.name',
        tech: 'projects.myChatBot.technologies.marked.tech',
        icon: 'mdi:language-markdown',
        description: 'projects.myChatBot.technologies.marked.description',
        color: 'green'
    }
];


</script>

<template>
    <!-- Hero Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6">
        <h1 class="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ t('showcase.projects.myChatBot.title') }}
        </h1>

        <!-- Introduction -->
        <div class="max-w-4xl mx-auto text-center">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                {{ t('showcase.projects.myChatBot.description') }}
            </p>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a href="https://ai.chad.lu" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <Icon name="mdi:rocket-launch" class="w-5 h-5" />
                    Live Demo
                    <Icon name="mdi:open-in-new" class="w-4 h-4" />
                </a>

                <a href="https://github.com/FChad/nuxt-ollama-chat" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-600 dark:border-blue-400">
                    <Icon name="mdi:github" class="w-5 h-5" />
                    View Source
                    <Icon name="mdi:open-in-new" class="w-4 h-4" />
                </a>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 justify-center">
                <span v-for="tag in ['Nuxt3', 'Vue3', 'TypeScript', 'Pinia', 'Tailwind', 'Ollama', 'AI', 'Chat']"
                    :key="tag"
                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                    {{ tag }}
                </span>
            </div>
        </div>
    </section>

    <!-- Key Features Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ t('projects.myChatBot.keyFeatures.title') }}
        </h2>

        <div class="max-w-4xl mx-auto text-center">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {{ t('projects.myChatBot.keyFeatures.subtitle') }}
            </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="feature in keyFeatures" :key="feature.id"
                class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-500">
                <div class="flex items-center gap-3 mb-4">
                    <div :class="[
                        'w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300',
                        getColorClasses(feature.color).bg
                    ]">
                        <Icon :name="feature.icon" class="w-6 h-6 text-white" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                        {{ t(feature.title) }}
                    </h3>
                </div>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {{ t(feature.description) }}
                </p>
            </div>
        </div>
    </section>

    <!-- Technologies Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ t('projects.myChatBot.builtWith.title') }}
        </h2>

        <div class="max-w-4xl mx-auto text-center">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {{ t('projects.myChatBot.builtWith.subtitle') }}
            </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="tech in technologies" :key="tech.id"
                class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div class="flex items-center gap-3 mb-3">
                    <div :class="[
                        'w-8 h-8 rounded-lg flex items-center justify-center',
                        getColorClasses(tech.color).bg
                    ]">
                        <Icon :name="tech.icon" class="w-4 h-4 text-white" />
                    </div>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ t(tech.name) }}</span>
                </div>
                <h4 class="text-lg font-bold text-gray-800 dark:text-white mb-2">{{ t(tech.tech) }}</h4>
                <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{{ t(tech.description) }}</p>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ t('projects.myChatBot.callToAction.title') }}
        </h2>

        <div class="max-w-4xl mx-auto text-center">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                {{ t('projects.myChatBot.callToAction.subtitle') }}
            </p>

            <div class="flex justify-center">
                <a href="https://ai.chad.lu" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    {{ t('projects.myChatBot.callToAction.button') }}
                    <Icon name="mdi:arrow-right" class="w-5 h-5" />
                </a>
            </div>
        </div>
    </section>
</template>
