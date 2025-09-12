<template>
    <div class="w-full h-full flex flex-col">
        <!-- Header - Fixed at top -->
        <Header class="fixed top-0 left-0 right-0 z-50" />

        <!-- SubNavigation - Fixed below header -->
        <div class="fixed top-[64px] left-0 right-0 z-40">
            <UiSubNavigation v-if="subNavProps" v-bind="subNavProps" />
        </div>

        <!-- Main Content with padding to account for fixed headers -->
        <main class="overflow-hidden flex flex-col gap-20 pt-[168px] pb-20">
            <slot />
        </main>

        <Footer />
    </div>
</template>

<script setup lang="ts">
interface SubNavProps {
    title: string
}

// Props for the subnav
const subNavProps = ref<SubNavProps | null>(null)

// Provide a function to set subnav props from child components
provide('setSubNav', (props: SubNavProps | null) => {
    subNavProps.value = props
})
</script>

<style lang="postcss">
/* Custom scrollbar styles */
::-webkit-scrollbar {
    @apply w-2;
}

::-webkit-scrollbar-track {
    @apply bg-gray-100 dark:bg-gray-900;
}

::-webkit-scrollbar-thumb {
    @apply bg-gray-300 dark:bg-gray-700;
}

::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-500 dark:bg-gray-600;
}
</style>