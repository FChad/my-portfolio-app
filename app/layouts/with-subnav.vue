<template>
    <div class="w-full h-full flex flex-col">
        <!-- Header - Fixed at top -->
        <Header />

        <!-- SubNavigation - Fixed below header -->
        <div class="sticky z-50" style="top: var(--header-height);">
            <UiSubNavigation v-if="subNavProps" v-bind="subNavProps" />
        </div>

        <!-- Main Content with padding to account for fixed headers -->
        <main class="overflow-hidden flex flex-col gap-24 md:gap-32 lg:gap-40 pb-20"
            style="padding-top: var(--total-header-offset);">
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
    backLabel?: string
}

// Props for the subnav
const subNavProps = ref<SubNavProps | null>(null)

// Provide a function to set subnav props from child components
provide('setSubNav', (props: SubNavProps | null) => {
    subNavProps.value = props
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