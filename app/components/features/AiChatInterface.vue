<script setup lang="ts">
// Can be extended with props for custom messages in the future
</script>

<template>
    <!-- Simulated Chat Interface -->
    <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 space-y-4">
        <!-- First User Message -->
        <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:account" class="w-5 h-5 text-white" />
            </div>
            <div class="flex-1 bg-blue-100 dark:bg-blue-900/40 rounded-2xl rounded-tl-none p-3">
                <p class="text-gray-800 dark:text-gray-200 text-sm">Was ist Vue.js?</p>
            </div>
        </div>
        <!-- First AI Response -->
        <div class="flex items-start gap-3 justify-end">
            <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-2xl rounded-tr-none p-3">
                <p class="text-gray-800 dark:text-gray-200 text-sm">Vue.js ist ein
                    progressives Framework für den
                    Aufbau von Benutzeroberflächen.</p>
            </div>
            <div
                class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:robot" class="w-5 h-5 text-white" />
            </div>
        </div>
        <!-- Second User Message -->
        <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:account" class="w-5 h-5 text-white" />
            </div>
            <div class="flex-1 bg-blue-100 dark:bg-blue-900/40 rounded-2xl rounded-tl-none p-3">
                <p class="text-gray-800 dark:text-gray-200 text-sm">Erkläre TypeScript</p>
            </div>
        </div>
        <!-- Second AI Response with typing indicator -->
        <div class="flex items-start gap-3 justify-end">
            <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-2xl rounded-tr-none p-3">
                <p class="text-gray-800 dark:text-gray-200 text-sm">TypeScript ist eine
                    typisierte Obermenge von
                    JavaScript...</p>
                <div class="mt-2 flex gap-1">
                    <div class="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce"
                        style="animation-delay: 0ms"></div>
                    <div class="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce"
                        style="animation-delay: 150ms"></div>
                    <div class="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce"
                        style="animation-delay: 300ms"></div>
                </div>
            </div>
            <div
                class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:robot" class="w-5 h-5 text-white" />
            </div>
        </div>
    </div>
</template>
