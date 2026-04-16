<script lang="ts" setup>
const route = useRoute()
const { t } = useI18n()
const { getDocumentation, hasDocumentation } = useDocumentation()
const { setSeoMeta } = useSeo()

// Get the slug from the route - use direct access for initial check
const slugParam = route.params.slug as string

// Handle 404 if documentation not found
if (!slugParam || !hasDocumentation(slugParam)) {
    throw createError({
        status: 404,
        statusText: 'Documentation not found'
    })
}

// Get the documentation config - synchronous for SSR
const config = getDocumentation(slugParam)!

// Provide SubNav configuration - fully SSR compatible
provideSubNav(
    t(config.subNav.titleKey),
    config.subNav.showBackButton,
    config.subNav.backTo
)

// Set page meta dynamically
definePageMeta({
    layout: 'with-subnav'
})

// Set SEO meta synchronously for SSR
setSeoMeta({
    title: t(config.seo.titleKey),
    description: t(config.seo.descriptionKey),
    keywords: t(config.seo.keywordsKey)
})
</script>

<template>
    <div>
        <!-- Hero Section -->
        <DocumentationHeroSection :title="t(config.titleKey)" :description="t(config.descriptionKey)"
            :tags="config.tags" />

        <!-- Setup Steps Section -->
        <DocumentationStepsList v-if="config.steps && config.steps.length > 0" :title="t('common.sections.setupSteps')"
            :steps="config.steps" />

        <!-- Tips Section (if available) -->
        <DocumentationTipsSection v-if="config.tips && config.tips.length > 0"
            :title="t('common.sections.additionalTips')" :subtitle="t('common.sections.additionalTipsSubtitle')"
            :items="config.tips" />

        <!-- Troubleshooting Section (if available) -->
        <DocumentationTipsSection v-if="config.troubleshooting && config.troubleshooting.length > 0"
            :title="t('common.sections.troubleshooting')" :subtitle="t('common.sections.troubleshootingSubtitle')"
            :items="config.troubleshooting" />

        <!-- Resources Section (if available) -->
        <DocumentationResourcesSection v-if="config.resources && config.resources.length > 0"
            :title="t('common.sections.additionalResources')"
            :subtitle="t('common.sections.additionalResourcesSubtitle')" :resources="config.resources" />

    </div>
</template>
