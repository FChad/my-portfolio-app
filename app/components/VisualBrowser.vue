<script setup lang="ts">
interface Props {
    url?: string
    favicon?: string
    showFloatingIcons?: boolean
    floatingIcons?: Array<{
        name: string
        color: string
    }>
}

const props = withDefaults(defineProps<Props>(), {
    url: 'https://example.com',
    favicon: 'mdi:web',
    showFloatingIcons: false,
    floatingIcons: () => []
})
</script>

<template>
    <!-- Project Visual Container with 3D Effect -->
    <div class="relative group">
        <!-- Main Visual Box -->
        <div class="relative bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-2xl">
            <!-- Browser Header with Address Bar -->
            <div class="flex flex-col gap-3 mb-6">
                <!-- Window Controls -->
                <div class="flex justify-between items-center">
                    <div class="flex gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-400"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div class="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                </div>
                <!-- Address Bar -->
                <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2">
                    <Icon name="mdi:lock" class="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span class="text-gray-700 dark:text-gray-300 text-sm font-medium flex-1 truncate">{{ url }}</span>
                    <Icon :name="favicon" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
            </div>

            <!-- Content Slot -->
            <slot />

            <!-- Floating Tech Icons (Optional) -->
            <div v-if="showFloatingIcons && floatingIcons.length > 0" class="absolute -bottom-4 -right-4 flex gap-2">
                <div v-for="(icon, index) in floatingIcons" :key="index"
                    class="w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg flex items-center justify-center">
                    <Icon :name="icon.name" :class="`w-6 h-6 ${icon.color}`" />
                </div>
            </div>
        </div>
    </div>
</template>
