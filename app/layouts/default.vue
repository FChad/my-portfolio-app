<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <NuxtRouteAnnouncer />
        <Header />
        <NuxtPage />
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