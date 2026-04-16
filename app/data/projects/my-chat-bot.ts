import type { ProjectConfig } from '~/composables/useProjects'

export const myChatBotConfig: ProjectConfig = {
    slug: 'my-chat-bot',
    titleKey: 'projects.myChatBot.title',
    descriptionKey: 'projects.myChatBot.description',
    tags: ['Nuxt', 'Vue', 'TypeScript', 'Pinia', 'Tailwind', 'OpenRouter', 'AI', 'Chat'],
    illustrationVariant: 'chatbot',
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
    callToAction: {
        titleKey: 'projects.myChatBot.callToAction.title',
        subtitleKey: 'projects.myChatBot.callToAction.subtitle',
        buttonKey: 'projects.myChatBot.callToAction.button',
        buttonUrl: 'https://ai.chad.lu'
    }
}
