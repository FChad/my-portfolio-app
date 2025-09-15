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

const keyFeatures = [
    {
        id: 'aiChat',
        title: 'projects.myChatBot.features.aiChat.title',
        description: 'projects.myChatBot.features.aiChat.description',
        icon: 'mdi:robot'
    },
    {
        id: 'conversationManagement',
        title: 'projects.myChatBot.features.conversationManagement.title',
        description: 'projects.myChatBot.features.conversationManagement.description',
        icon: 'mdi:chat-processing'
    },
    {
        id: 'modelSelection',
        title: 'projects.myChatBot.features.modelSelection.title',
        description: 'projects.myChatBot.features.modelSelection.description',
        icon: 'mdi:brain'
    },
    {
        id: 'streaming',
        title: 'projects.myChatBot.features.streaming.title',
        description: 'projects.myChatBot.features.streaming.description',
        icon: 'mdi:lightning-bolt'
    },
    {
        id: 'localStorage',
        title: 'projects.myChatBot.features.localStorage.title',
        description: 'projects.myChatBot.features.localStorage.description',
        icon: 'mdi:content-save'
    },
    {
        id: 'modernUI',
        title: 'projects.myChatBot.features.modernUI.title',
        description: 'projects.myChatBot.features.modernUI.description',
        icon: 'mdi:palette'
    }
];

const technologies = [
    {
        id: 'nuxt3',
        name: 'projects.myChatBot.technologies.nuxt3.name',
        tech: 'projects.myChatBot.technologies.nuxt3.tech',
        icon: 'mdi:nuxt',
        description: 'projects.myChatBot.technologies.nuxt3.description'
    },
    {
        id: 'vue3',
        name: 'projects.myChatBot.technologies.vue3.name',
        tech: 'projects.myChatBot.technologies.vue3.tech',
        icon: 'mdi:vuejs',
        description: 'projects.myChatBot.technologies.vue3.description'
    },
    {
        id: 'typescript',
        name: 'projects.myChatBot.technologies.typescript.name',
        tech: 'projects.myChatBot.technologies.typescript.tech',
        icon: 'mdi:language-typescript',
        description: 'projects.myChatBot.technologies.typescript.description'
    },
    {
        id: 'pinia',
        name: 'projects.myChatBot.technologies.pinia.name',
        tech: 'projects.myChatBot.technologies.pinia.tech',
        icon: 'mdi:database',
        description: 'projects.myChatBot.technologies.pinia.description'
    },
    {
        id: 'tailwind',
        name: 'projects.myChatBot.technologies.tailwind.name',
        tech: 'projects.myChatBot.technologies.tailwind.tech',
        icon: 'mdi:tailwind',
        description: 'projects.myChatBot.technologies.tailwind.description'
    },
    {
        id: 'ollama',
        name: 'projects.myChatBot.technologies.ollama.name',
        tech: 'projects.myChatBot.technologies.ollama.tech',
        icon: 'mdi:robot',
        description: 'projects.myChatBot.technologies.ollama.description'
    },
    {
        id: 'highlight',
        name: 'projects.myChatBot.technologies.highlight.name',
        tech: 'projects.myChatBot.technologies.highlight.tech',
        icon: 'mdi:code-tags',
        description: 'projects.myChatBot.technologies.highlight.description'
    },
    {
        id: 'marked',
        name: 'projects.myChatBot.technologies.marked.name',
        tech: 'projects.myChatBot.technologies.marked.tech',
        icon: 'mdi:language-markdown',
        description: 'projects.myChatBot.technologies.marked.description'
    }
];


</script>

<template>
    <!-- Hero Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-12">
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
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-12">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ t('projects.myChatBot.keyFeatures.title') }}
        </h2>

        <div class="max-w-4xl mx-auto text-center mb-8">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {{ t('projects.myChatBot.keyFeatures.subtitle') }}
            </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="feature in keyFeatures" :key="feature.id"
                class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-500">
                <div class="flex items-center gap-3 mb-4">
                    <div
                        class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
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
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-12">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ t('projects.myChatBot.builtWith.title') }}
        </h2>

        <div class="max-w-4xl mx-auto text-center mb-8">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {{ t('projects.myChatBot.builtWith.subtitle') }}
            </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="tech in technologies" :key="tech.id"
                class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div class="flex items-center gap-3 mb-3">
                    <div
                        class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
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
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-12">
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
