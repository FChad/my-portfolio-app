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
    ],
    technologies: [
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
    ],
    callToAction: {
        titleKey: 'projects.myChatBot.callToAction.title',
        subtitleKey: 'projects.myChatBot.callToAction.subtitle',
        buttonKey: 'projects.myChatBot.callToAction.button',
        buttonUrl: 'https://ai.chad.lu'
    }
}
