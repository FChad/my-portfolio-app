<script setup lang="ts">
interface TimelineItem {
    year: string
    title: string
    description: string
    icon: string
    category: 'work' | 'education'
    company?: string
    type?: string
    tasks?: string[]
    school?: string
    grade?: string
    link?: string
}

interface Props {
    items: TimelineItem[]
}

defineProps<Props>()

const emit = defineEmits<{
    openDetails: [item: TimelineItem]
}>()

const handleOpenDetails = (item: TimelineItem) => {
    if (item.category === 'work') {
        emit('openDetails', item)
    }
}
</script>

<template>
    <div class="relative max-w-7xl mx-auto">
        <!-- Central timeline line -->
        <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-blue-500 transform -translate-x-1/2">
        </div>

        <div class="space-y-6 sm:space-y-8 md:space-y-12">
            <div v-for="(item, index) in items" :key="`${item.category}-${item.year}-${index}`" class="relative">

                <!-- Timeline node -->
                <div class="absolute left-4 md:left-1/2 w-5 h-5 bg-gray-50 dark:bg-gray-900 rounded-full border-4 transform -translate-x-1/2 z-10"
                    :class="item.category === 'work' ? 'border-blue-500' : 'border-pink-500'">
                </div>

                <!-- Content card -->
                <div class="ml-10 sm:ml-12 md:ml-0"
                    :class="index % 2 === 0 ? 'md:mr-[calc(50%+3rem)]' : 'md:ml-[calc(50%+3rem)]'">
                    <div
                        class="group relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                        <!-- Hover gradient -->
                        <div class="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity"
                            :class="item.category === 'work' ? 'from-blue-500 to-blue-600' : 'from-pink-500 to-pink-600'">
                        </div>

                        <!-- Work Experience Content -->
                        <div v-if="item.category === 'work'" class="relative space-y-3 sm:space-y-4">
                            <!-- Year badge -->
                            <div
                                class="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full font-bold text-white shadow-md text-sm sm:text-base">
                                <Icon name="mdi:calendar" class="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>{{ item.year }}</span>
                            </div>

                            <!-- Title and company -->
                            <div class="space-y-2">
                                <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                                    {{ item.title }}
                                </h3>
                                <div v-if="item.company" class="flex items-center gap-2">
                                    <Icon name="mdi:office-building"
                                        class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                                    <span class="text-sm sm:text-base font-medium text-blue-600 dark:text-blue-400">
                                        {{ item.company }}
                                    </span>
                                </div>
                                <span v-if="item.type"
                                    class="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                                    <Icon name="mdi:briefcase" class="w-3 h-3 sm:w-4 sm:h-4" />
                                    {{ item.type }}
                                </span>
                            </div>

                            <!-- Description -->
                            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                {{ item.description }}
                            </p>

                            <!-- View details button -->
                            <button @click="handleOpenDetails(item)"
                                class="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group/btn text-sm sm:text-base">
                                <span>{{ $t('about.work.viewDetails') }}</span>
                                <Icon name="mdi:arrow-right"
                                    class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <!-- Education Content -->
                        <div v-else-if="item.category === 'education'" class="relative space-y-3 sm:space-y-4">
                            <!-- Year badge -->
                            <div
                                class="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full font-bold text-white shadow-md text-sm sm:text-base">
                                <Icon name="mdi:calendar" class="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>{{ item.year }}</span>
                            </div>

                            <!-- School -->
                            <div v-if="item.school"
                                class="flex items-center gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                <Icon name="mdi:school" class="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>{{ item.school }}</span>
                            </div>

                            <!-- Title and description -->
                            <div class="space-y-2">
                                <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                                    {{ item.title }}
                                </h3>
                                <p class="text-base sm:text-lg font-medium text-pink-600 dark:text-pink-400">
                                    {{ item.description }}
                                </p>
                            </div>

                            <!-- Grade -->
                            <div v-if="item.grade"
                                class="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                                <Icon name="mdi:trophy"
                                    class="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                                <span class="text-sm sm:text-base font-semibold text-green-700 dark:text-green-300">
                                    {{ item.grade }}
                                </span>
                            </div>

                            <!-- Link -->
                            <div v-if="item.link" class="pt-2">
                                <a :href="item.link" target="_blank"
                                    class="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group/link text-sm sm:text-base">
                                    <span>{{ $t('about.education.viewMore') }}</span>
                                    <Icon name="mdi:arrow-right"
                                        class="w-4 h-4 sm:w-5 sm:h-5 group-hover/link:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
