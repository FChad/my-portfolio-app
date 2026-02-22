<script setup lang="ts">
interface Props {
    url?: string
    favicon?: string
}

const props = withDefaults(defineProps<Props>(), {
    url: 'https://example.com',
    favicon: 'mdi:web'
})
</script>

<template>
    <!-- Project Visual Container with 3D Effect -->
    <div class="relative group">
        <!-- Main Visual Box -->
        <div
            class="relative bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 cursor-pointer">
            <!-- Browser Header with Address Bar -->
            <div class="flex flex-col gap-2 md:gap-3 mb-4 md:mb-5 lg:mb-6">
                <!-- Window Controls -->
                <div class="flex justify-between items-center">
                    <div class="flex gap-1.5 md:gap-2">
                        <div class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400"></div>
                        <div class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-400"></div>
                        <div class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-400"></div>
                    </div>
                </div>
                <!-- Address Bar -->
                <div
                    class="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg md:rounded-xl px-3 py-1.5 md:px-4 md:py-2">
                    <Icon name="mdi:lock"
                        class="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600 dark:text-gray-400 shrink-0" />
                    <span class="text-gray-700 dark:text-gray-300 text-xs md:text-sm font-medium flex-1 truncate">{{ url
                        }}</span>
                    <Icon :name="favicon"
                        class="w-4 h-4 md:w-5 md:h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                </div>
            </div>

            <!-- Content Slot -->
            <slot />
        </div>
    </div>
</template>
