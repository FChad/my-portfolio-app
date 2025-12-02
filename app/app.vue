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
        <NuxtRouteAnnouncer />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
