<template>
    <div class="w-full h-full flex flex-col">
        <!-- Header (Fixed at top) -->
        <Header />

        <!-- SubNavigation (Fixed below header) -->
        <div class="sticky z-40" style="top: var(--header-height);">
            <UiSubNavigation v-if="subNavConfig" v-bind="subNavConfig" />
        </div>

        <!-- Main Content with padding to account for fixed headers -->
        <main>
            <slot />
        </main>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import { getDocumentationBySlug } from '~/data/documentation'

const route = useRoute()
const { t } = useI18n()

// Compute SubNav config directly based on route - SSR compatible
const subNavConfig = computed(() => {
    // Check if this is a documentation page
    const pathMatch = route.path.match(/\/showcase\/documentation\/([^/]+)$/)
    if (pathMatch && pathMatch[1]) {
        const slug = pathMatch[1]
        const config = getDocumentationBySlug(slug)
        if (config) {
            return {
                title: t(config.subNav.titleKey),
                showBackButton: config.subNav.showBackButton,
                backTo: config.subNav.backTo
            }
        }
    }

    // Fallback: route.meta.subNav (for static pages like my-chat-bot, my-portfolio-website)
    const meta = route.meta.subNav as any
    if (meta) {
        return {
            title: typeof meta.titleKey === 'string' ? t(meta.titleKey) : meta.title,
            showBackButton: meta.showBackButton ?? false,
            backTo: meta.backTo
        }
    }

    return null
})
</script>

<style lang="postcss">
/* Layout spacing variables */
:root {
    --header-height: 65px;
    --subnav-height: 65px;
    --content-spacing: 40px;
    --total-header-offset: calc(var(--header-height) + var(--subnav-height) + var(--content-spacing));
}
</style>
