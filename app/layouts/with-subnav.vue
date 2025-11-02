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
interface SubNavProps {
    title: string
    showBackButton?: boolean
    backTo?: string
}

// Get subnav configuration from page meta
const route = useRoute()
const { t } = useI18n()

// Extract subnav configuration from page meta
const subNavConfig = computed((): SubNavProps | null => {
    const meta = route.meta.subNav as any
    if (!meta) return null

    return {
        title: typeof meta.titleKey === 'string' ? t(meta.titleKey) : meta.title,
        showBackButton: meta.showBackButton ?? false,
        backTo: meta.backTo
    }
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
