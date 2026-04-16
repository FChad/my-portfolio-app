<script setup lang="ts">
const i18nHead = useLocaleHead()
const colorMode = useColorMode()

const themeColor = computed(() => colorMode.value === 'dark' ? '#171717' : '#fafafa')

useHead(() => ({
    htmlAttrs: {
        lang: i18nHead.value.htmlAttrs!.lang
    },
    link: [...(i18nHead.value.link || [])],
    meta: [
        ...(i18nHead.value.meta || []),
        { name: 'theme-color', content: themeColor.value }
    ]
}))
</script>

<template>
    <div class="bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white">
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
