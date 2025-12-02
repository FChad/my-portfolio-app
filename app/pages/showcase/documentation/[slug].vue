<script lang="ts" setup>
import { useI18n } from '#imports'

const route = useRoute()
const { t } = useI18n()
const { getDocumentation, hasDocumentation } = useDocumentation()
const { setSeoMeta } = useSeo()

// Get the slug from the route - use direct access for initial check
const slugParam = route.params.slug as string

// Handle 404 if documentation not found
if (!slugParam || !hasDocumentation(slugParam)) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Documentation not found'
    })
}

// Get the documentation config - synchronous for SSR
const config = getDocumentation(slugParam)!

// SubNav is set by the global middleware (subNav.global.ts) before layout renders

// Set page meta dynamically
definePageMeta({
    layout: 'with-subnav'
})

// Use useHead for dynamic page configuration
useHead({
    title: t(config.seo.titleKey)
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

        <!-- Important Notes Section -->
        <DocumentationNotesGrid v-if="config.notes && config.notes.length > 0"
            :title="t('common.sections.importantNotes')" :subtitle="t('common.sections.importantNotesSubtitle')"
            :notes="config.notes" />

        <!-- Setup Steps Section -->
        <DocumentationStepsList v-if="config.steps && config.steps.length > 0" :title="t('common.sections.setupSteps')"
            :steps="config.steps" />

        <!-- Tips Section (if available) -->
        <DocumentationTipsSection v-if="config.tips && config.tips.length > 0"
            :title="t('common.sections.additionalTips')" :subtitle="t('common.sections.additionalTipsSubtitle')"
            :items="config.tips" type="tips" />

        <!-- Troubleshooting Section (if available) -->
        <DocumentationTipsSection v-if="config.troubleshooting && config.troubleshooting.length > 0"
            :title="t('common.sections.troubleshooting')" :subtitle="t('common.sections.troubleshootingSubtitle')"
            :items="config.troubleshooting" type="troubleshooting" />

        <!-- Resources Section (if available) -->
        <DocumentationResourcesSection v-if="config.resources && config.resources.length > 0"
            :title="t('common.sections.additionalResources')"
            :subtitle="t('common.sections.additionalResourcesSubtitle')" :resources="config.resources" />

        <!-- Completion Message -->
        <DocumentationCompletion :title="t(config.completion.title)" :message="t(config.completion.message)" />
    </div>
</template>
