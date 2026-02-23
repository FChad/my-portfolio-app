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
    <div class="relative group">
        <div
            class="relative bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md border border-neutral-200 dark:border-neutral-700">
            <!-- Browser Chrome -->
            <div class="flex items-center gap-3 bg-neutral-100 dark:bg-neutral-800 px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-700">
                <div class="flex gap-1.5">
                    <div class="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div class="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div class="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <div class="flex items-center gap-2 flex-1 bg-white dark:bg-neutral-700 rounded-lg px-3 py-1.5">
                    <Icon name="mdi:lock" class="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                    <span class="text-neutral-500 dark:text-neutral-400 text-sm font-medium flex-1 truncate">{{ url }}</span>
                    <Icon :name="favicon" class="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0" />
                </div>
            </div>
            <!-- Content -->
            <slot />
        </div>
    </div>
</template>
