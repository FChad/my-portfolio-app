<script setup lang="ts">
const { t } = useI18n()
const { setSeoMeta } = useSeo()

setSeoMeta({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    keywords: t('seo.home.keywords')
})
</script>

<template>
    <HomeHeroSection />
    <HomeAboutSection />
    <HomeFinalCta />
</template>
