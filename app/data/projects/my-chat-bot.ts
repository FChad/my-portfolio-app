import type { ProjectConfig } from '~/composables/useProjects'

export const myChatBotConfig: ProjectConfig = {
    slug: 'my-chat-bot',
    titleKey: 'projects.myChatBot.title',
    descriptionKey: 'projects.myChatBot.description',
    tags: ['Nuxt3', 'Vue3', 'TypeScript', 'Pinia', 'Tailwind', 'OpenRouter', 'AI', 'Chat'],
    links: [
        {
            type: 'demo',
            url: 'https://ai.chad.lu'
        },
        {
            type: 'source',
            url: 'https://github.com/FChad/nuxt-ollama-chat'
        }
    ],
    seo: {
        titleKey: 'seo.projects.chatbot.title',
        descriptionKey: 'seo.projects.chatbot.description',
        keywordsKey: 'seo.projects.chatbot.keywords'
    },
    subNav: {
        titleKey: 'projects.myChatBot.title',
        showBackButton: true,
        backTo: '/showcase'
    },
    features: [
        {
            id: 'aiChat',
            title: 'projects.myChatBot.features.aiChat.title',
            description: 'projects.myChatBot.features.aiChat.description',
            icon: 'mdi:robot',
        },
        {
            id: 'conversationManagement',
            title: 'projects.myChatBot.features.conversationManagement.title',
            description: 'projects.myChatBot.features.conversationManagement.description',
            icon: 'mdi:chat-processing',
        },
        {
            id: 'modelSelection',
            title: 'projects.myChatBot.features.modelSelection.title',
            description: 'projects.myChatBot.features.modelSelection.description',
            icon: 'mdi:brain',
        },
        {
            id: 'streaming',
            title: 'projects.myChatBot.features.streaming.title',
            description: 'projects.myChatBot.features.streaming.description',
            icon: 'mdi:lightning-bolt',
        },
        {
            id: 'localStorage',
            title: 'projects.myChatBot.features.localStorage.title',
            description: 'projects.myChatBot.features.localStorage.description',
            icon: 'mdi:content-save',
        },
        {
            id: 'modernUI',
            title: 'projects.myChatBot.features.modernUI.title',
            description: 'projects.myChatBot.features.modernUI.description',
            icon: 'mdi:palette',
        }
    ],
    technologies: [
        {
            id: 'nuxt3',
            name: 'projects.myChatBot.technologies.nuxt3.name',
            tech: 'projects.myChatBot.technologies.nuxt3.tech',
            icon: 'mdi:nuxt',
            description: 'projects.myChatBot.technologies.nuxt3.description',
        },
        {
            id: 'vue3',
            name: 'projects.myChatBot.technologies.vue3.name',
            tech: 'projects.myChatBot.technologies.vue3.tech',
            icon: 'mdi:vuejs',
            description: 'projects.myChatBot.technologies.vue3.description',
        },
        {
            id: 'typescript',
            name: 'projects.myChatBot.technologies.typescript.name',
            tech: 'projects.myChatBot.technologies.typescript.tech',
            icon: 'mdi:language-typescript',
            description: 'projects.myChatBot.technologies.typescript.description',
        },
        {
            id: 'pinia',
            name: 'projects.myChatBot.technologies.pinia.name',
            tech: 'projects.myChatBot.technologies.pinia.tech',
            icon: 'mdi:database',
            description: 'projects.myChatBot.technologies.pinia.description',
        },
        {
            id: 'tailwind',
            name: 'projects.myChatBot.technologies.tailwind.name',
            tech: 'projects.myChatBot.technologies.tailwind.tech',
            icon: 'mdi:tailwind',
            description: 'projects.myChatBot.technologies.tailwind.description',
        },
        {
            id: 'ollama',
            name: 'projects.myChatBot.technologies.ollama.name',
            tech: 'projects.myChatBot.technologies.ollama.tech',
            icon: 'mdi:robot',
            description: 'projects.myChatBot.technologies.ollama.description',
        },
        {
            id: 'highlight',
            name: 'projects.myChatBot.technologies.highlight.name',
            tech: 'projects.myChatBot.technologies.highlight.tech',
            icon: 'mdi:code-tags',
            description: 'projects.myChatBot.technologies.highlight.description',
        },
        {
            id: 'marked',
            name: 'projects.myChatBot.technologies.marked.name',
            tech: 'projects.myChatBot.technologies.marked.tech',
            icon: 'mdi:language-markdown',
            description: 'projects.myChatBot.technologies.marked.description',
        }
    ],
    callToAction: {
        titleKey: 'projects.myChatBot.callToAction.title',
        subtitleKey: 'projects.myChatBot.callToAction.subtitle',
        buttonKey: 'projects.myChatBot.callToAction.button',
        buttonUrl: 'https://ai.chad.lu'
    }
}
