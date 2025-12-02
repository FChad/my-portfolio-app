<script setup lang="ts">
definePageMeta({
    layout: 'hero'
})

const { t } = useI18n()
const { setSeoMeta, getStructuredData } = useSeo()

setSeoMeta({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    keywords: t('seo.home.keywords')
})

useHead(() => ({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(getStructuredData('Person'))
        },
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(getStructuredData('WebSite'))
        }
    ]
}))
</script>

<template>
    <HomeHeroSection />
    <HomeAboutPreview />
    <HomeServicesSection />
    <HomeFeaturedProject />
</template>
