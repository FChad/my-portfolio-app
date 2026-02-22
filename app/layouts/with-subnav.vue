<template>
    <div class="w-full min-h-screen flex flex-col">
        <!-- Sticky group: Header + SubNav stick together as one unit -->
        <div class="sticky top-0 z-50">
            <LayoutHeader />
            <UiSubNavigation v-bind="subNavConfig" />
        </div>

        <!-- Main Content -->
        <main id="main-content" class="flex-1">
            <slot />
        </main>

        <LayoutFooter />
    </div>
</template>

<script setup lang="ts">
const { subNavConfig } = useSubNav()
</script>
