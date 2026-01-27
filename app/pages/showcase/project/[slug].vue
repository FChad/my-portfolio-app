<script lang="ts" setup>
const route = useRoute()
const { t } = useI18n()
const { getProject, hasProject } = useProjects()
const { setSeoMeta } = useSeo()
const { setSubNav } = useSubNav()

// Get the slug from the route - use direct access for initial check
const slugParam = route.params.slug as string

// Handle 404 if project not found
if (!slugParam || !hasProject(slugParam)) {
    throw createError({
        status: 404,
        statusText: 'Project not found'
    })
}

// Get the project config - synchronous for SSR
const config = getProject(slugParam)!

// Set SubNav configuration
setSubNav({
    title: t(config.subNav.titleKey),
    showBackButton: config.subNav.showBackButton,
    backTo: config.subNav.backTo
})

// Set page meta dynamically
definePageMeta({
    layout: 'with-subnav'
})

// Use useHead for dynamic page configuration
useHead(() => ({
    title: t(config.seo.titleKey)
}))

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
        <ProjectsHeroSection :title="t(config.titleKey)" :description="t(config.descriptionKey)" :tags="config.tags"
            :links="config.links" />

        <!-- Key Features Section -->
        <ProjectsFeaturesGrid v-if="config.features && config.features.length > 0"
            :title="t('common.sections.keyFeatures')" :subtitle="t('common.sections.keyFeaturesSubtitle')"
            :features="config.features" />

        <!-- Tech Stack Section -->
        <ProjectsTechStack v-if="config.technologies && config.technologies.length > 0"
            :title="t('common.sections.builtWith')" :subtitle="t('common.sections.builtWithSubtitle')"
            :technologies="config.technologies" />

        <!-- CTA Section -->
        <ProjectsCallToAction :title="t(config.callToAction.titleKey)" :subtitle="t(config.callToAction.subtitleKey)"
            :button-text="t(config.callToAction.buttonKey)" :button-url="config.callToAction.buttonUrl" />
    </div>
</template>
