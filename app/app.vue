<script setup lang="ts">
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
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <a href="#main-content"
            class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none">
            {{ $t('common.skipToContent') }}
        </a>
        <NuxtRouteAnnouncer />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
