<template>
    <div class="w-full h-full flex flex-col">
        <Header />

        <!-- Main Content for Hero Pages (no padding) -->
        <main class="overflow-hidden flex flex-col gap-20 pb-20">
            <slot />
        </main>

        <Footer />
    </div>
</template>

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