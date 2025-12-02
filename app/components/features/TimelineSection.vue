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

// Modal state for work experience details
const isModalOpen = ref(false)
const selectedWorkItem = ref<TimelineItem | null>(null)

const handleOpenDetails = (item: TimelineItem) => {
    if (item.category === 'work') {
        selectedWorkItem.value = item
        isModalOpen.value = true
    }
}
</script>

<template>
    <div>
        <!-- Timeline -->
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
                                        <span>{{ $t('about.education.title') }}</span>
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

        <!-- Work Experience Details Modal -->
        <UiModal v-model="isModalOpen" max-width="2xl">
            <template #header>
                <div v-if="selectedWorkItem" class="flex flex-col gap-2 w-full">
                    <!-- Title -->
                    <h3 class="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                        {{ selectedWorkItem.title }}
                    </h3>
                    <!-- Company with icon -->
                    <div v-if="selectedWorkItem.company"
                        class="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                        <Icon name="mdi:office-building" class="w-5 h-5" />
                        <span class="text-base sm:text-lg font-semibold">{{ selectedWorkItem.company }}</span>
                    </div>
                </div>
            </template>

            <div v-if="selectedWorkItem" class="flex flex-col gap-5 sm:gap-6">
                <!-- Info Badges in modern card style -->
                <div class="flex flex-wrap items-center gap-3">
                    <!-- Type Badge -->
                    <div v-if="selectedWorkItem.type"
                        class="group relative inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border-2 border-purple-200 dark:border-purple-700/50 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-lg hover:scale-105">
                        <div
                            class="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-800/50 flex items-center justify-center group-hover:rotate-6 transition-transform">
                            <Icon name="mdi:briefcase" class="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span class="text-purple-900 dark:text-purple-200 font-bold text-sm sm:text-base">{{
                            selectedWorkItem.type }}</span>
                    </div>

                    <!-- Year Badge -->
                    <div
                        class="group relative inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl border-2 border-green-200 dark:border-green-700/50 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 hover:shadow-lg hover:scale-105">
                        <div
                            class="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-800/50 flex items-center justify-center group-hover:rotate-6 transition-transform">
                            <Icon name="mdi:calendar" class="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span class="text-green-900 dark:text-green-200 font-bold text-sm sm:text-base">{{
                            selectedWorkItem.year }}</span>
                    </div>
                </div>

                <!-- Description Section in modern card -->
                <div
                    class="group relative bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800/50 dark:to-gray-800/30 rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
                    <div class="flex items-center gap-3 mb-4">
                        <div
                            class="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Icon name="mdi:text-box-outline" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h4 class="text-lg sm:text-xl font-black text-gray-900 dark:text-white">
                            {{ $t('about.work.modal.description') }}
                        </h4>
                    </div>
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base ml-13">
                        {{ selectedWorkItem.description }}
                    </p>
                </div>

                <!-- Tasks Section in modern card with enhanced styling -->
                <div v-if="selectedWorkItem.tasks && selectedWorkItem.tasks.length > 0"
                    class="group relative bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800/50 dark:to-blue-900/10 rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
                    <div class="flex items-center gap-3 mb-4">
                        <div
                            class="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Icon name="mdi:format-list-checks" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h4 class="text-lg sm:text-xl font-black text-gray-900 dark:text-white">
                            {{ $t('about.work.modal.tasks') }}
                        </h4>
                    </div>
                    <ul class="flex flex-col gap-2">
                        <li v-for="(task, taskIndex) in selectedWorkItem.tasks" :key="taskIndex"
                            class="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/30 transition-all duration-200">
                            <!-- Number Badge with modern styling -->
                            <div
                                class="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md group-hover/item:scale-110 transition-transform">
                                <span class="text-white font-bold text-xs sm:text-sm">
                                    {{ taskIndex + 1 }}
                                </span>
                            </div>
                            <!-- Task Text -->
                            <span
                                class="flex-1 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed pt-0.5">
                                {{ task }}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </UiModal>
    </div>
</template>
