<script setup lang="ts">
const { title, showBackButton, backTo } = useSubNav()
</script>

<template>
    <div class="w-full min-h-screen flex flex-col">
        <div class="sticky top-0 z-50">
            <LayoutHeader />
            <UiSubNavigation :title="title" :show-back-button="showBackButton" :back-to="backTo" />
        </div>

        <main id="main-content" class="flex-1">
            <slot />
        </main>

        <LayoutFooter />
    </div>
</template>
