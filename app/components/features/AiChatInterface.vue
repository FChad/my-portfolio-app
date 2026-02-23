<script setup lang="ts">
// Can be extended with props for custom messages in the future
</script>

<template>
    <div class="bg-neutral-50 dark:bg-neutral-900 p-5 md:p-6 space-y-4">
        <!-- User Message -->
        <div class="flex items-start gap-2">
            <div class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="mdi:account" class="w-3.5 h-3.5 text-white" />
            </div>
            <div class="bg-blue-100 dark:bg-blue-900/40 rounded-xl rounded-tl-none px-3 py-2">
                <p class="text-neutral-800 dark:text-neutral-200 text-sm">Was ist Vue.js?</p>
            </div>
        </div>
        <!-- AI Response -->
        <div class="flex items-start gap-2 justify-end">
            <div class="bg-neutral-200 dark:bg-neutral-700 rounded-xl rounded-tr-none px-3 py-2">
                <p class="text-neutral-800 dark:text-neutral-200 text-sm">Vue.js ist ein progressives Framework für den Aufbau von Benutzeroberflächen.</p>
            </div>
            <div class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="mdi:robot" class="w-3.5 h-3.5 text-white" />
            </div>
        </div>
        <!-- Second User Message -->
        <div class="flex items-start gap-2">
            <div class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="mdi:account" class="w-3.5 h-3.5 text-white" />
            </div>
            <div class="bg-blue-100 dark:bg-blue-900/40 rounded-xl rounded-tl-none px-3 py-2">
                <p class="text-neutral-800 dark:text-neutral-200 text-sm">Erkläre TypeScript</p>
            </div>
        </div>
        <!-- Second AI Response -->
        <div class="flex items-start gap-2 justify-end">
            <div class="bg-neutral-200 dark:bg-neutral-700 rounded-xl rounded-tr-none px-3 py-2">
                <p class="text-neutral-800 dark:text-neutral-200 text-sm">TypeScript ist eine typisierte Obermenge von JavaScript, die statische Typen hinzufügt.</p>
            </div>
            <div class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="mdi:robot" class="w-3.5 h-3.5 text-white" />
            </div>
        </div>
        <!-- Third User Message -->
        <div class="flex items-start gap-2">
            <div class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="mdi:account" class="w-3.5 h-3.5 text-white" />
            </div>
            <div class="bg-blue-100 dark:bg-blue-900/40 rounded-xl rounded-tl-none px-3 py-2">
                <p class="text-neutral-800 dark:text-neutral-200 text-sm">Was ist Nuxt?</p>
            </div>
        </div>
        <!-- Third AI Response with typing -->
        <div class="flex items-start gap-2 justify-end">
            <div class="bg-neutral-200 dark:bg-neutral-700 rounded-xl rounded-tr-none px-3 py-2">
                <p class="text-neutral-800 dark:text-neutral-200 text-sm">Nuxt ist ein Full-Stack-Framework basierend auf Vue.js...</p>
                <div class="mt-1.5 flex gap-1">
                    <div class="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce" style="animation-delay: 0ms"></div>
                    <div class="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce" style="animation-delay: 150ms"></div>
                    <div class="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce" style="animation-delay: 300ms"></div>
                </div>
            </div>
            <div class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="mdi:robot" class="w-3.5 h-3.5 text-white" />
            </div>
        </div>
    </div>
</template>
