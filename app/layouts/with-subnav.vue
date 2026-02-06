<template>
    <div class="w-full h-full flex flex-col">
        <!-- Header (Fixed at top) -->
        <LayoutHeader />

        <!-- SubNavigation (Fixed below header) - always reserve height -->
        <div class="sticky z-40" style="top: var(--header-height); min-height: var(--subnav-height);">
            <UiSubNavigation v-bind="subNavConfig" />
        </div>

        <!-- Main Content with padding to account for fixed headers -->
        <main id="main-content">
            <slot />
        </main>

        <LayoutFooter />
    </div>
</template>

<script setup lang="ts">
const { subNavConfig } = useSubNav()
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
