<script setup lang="ts">
// Global titleTemplate für alle Seiten
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `Chad Feierstein - ${titleChunk}` : 'Chad Feierstein - Portfolio'
    }
})

// @nuxtjs/i18n SEO Integration
// Generiert automatisch: lang attr, hreflang links, og:locale, canonical links
const i18nHead = useLocaleHead()

useHead(() => ({
    htmlAttrs: {
        lang: i18nHead.value.htmlAttrs!.lang
    },
    link: [...(i18nHead.value.link || [])],
    meta: [...(i18nHead.value.meta || [])]
}))
</script>

<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors ">
        <NuxtRouteAnnouncer />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
