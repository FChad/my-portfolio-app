<script lang="ts" setup>
const route = useRoute()
const { t } = useI18n()
const { setSeoMeta } = useSeo()

// Get the slug from the route - use direct access for initial check
const slugParam = route.params.slug as string

// Handle 404 if documentation not found
if (!slugParam || !getDocumentationBySlug(slugParam)) {
    throw createError({
        status: 404,
        statusText: 'Documentation not found'
    })
}

// Get the documentation config - synchronous for SSR
const config = getDocumentationBySlug(slugParam)!

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

// Compute sequential section numbers (Hero is 01, then conditional sections get 02, 03, ...).
// Even numbers get the alternating neutral background.
const sectionMeta = computed(() => {
    let n = 2
    const next = () => {
        const number = String(n).padStart(2, '0')
        const altBg = n % 2 === 0
        n++
        return { number, altBg }
    }
    return {
        steps: config.steps?.length ? next() : null,
        tips: config.tips?.length ? next() : null,
        troubleshooting: config.troubleshooting?.length ? next() : null,
        resources: config.resources?.length ? next() : null,
    }
})
</script>

<template>
    <div>
        <!-- Hero Section -->
        <DocumentationHeroSection :title="t(config.titleKey)" :description="t(config.descriptionKey)"
            :tags="config.tags" />

        <!-- Setup Steps Section -->
        <DocumentationStepsList v-if="sectionMeta.steps" :title="t('common.sections.setupSteps')"
            :steps="config.steps!" :number="sectionMeta.steps.number"
            :label="t('common.sections.labels.setupSteps')" :alt-bg="sectionMeta.steps.altBg" />

        <!-- Tips Section (if available) -->
        <DocumentationTipsSection v-if="sectionMeta.tips" :title="t('common.sections.additionalTips')"
            :subtitle="t('common.sections.additionalTipsSubtitle')" :items="config.tips!"
            :number="sectionMeta.tips.number" :label="t('common.sections.labels.tips')"
            :alt-bg="sectionMeta.tips.altBg" />

        <!-- Troubleshooting Section (if available) -->
        <DocumentationTipsSection v-if="sectionMeta.troubleshooting" :title="t('common.sections.troubleshooting')"
            :subtitle="t('common.sections.troubleshootingSubtitle')" :items="config.troubleshooting!"
            :number="sectionMeta.troubleshooting.number" :label="t('common.sections.labels.troubleshooting')"
            :alt-bg="sectionMeta.troubleshooting.altBg" />

        <!-- Resources Section (if available) -->
        <DocumentationResourcesSection v-if="sectionMeta.resources"
            :title="t('common.sections.additionalResources')"
            :subtitle="t('common.sections.additionalResourcesSubtitle')" :resources="config.resources!"
            :number="sectionMeta.resources.number" :label="t('common.sections.labels.resources')"
            :alt-bg="sectionMeta.resources.altBg" />

    </div>
</template>
