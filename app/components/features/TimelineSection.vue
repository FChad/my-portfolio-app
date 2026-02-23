<script setup lang="ts">
interface TimelineItem {
    year: string
    title: string
    description: string
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
            <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-700 -translate-x-1/2">
            </div>

            <div class="space-y-6 sm:space-y-8 md:space-y-12">
                <div v-for="(item, index) in items" :key="`${item.category}-${item.year}-${index}`" class="relative">

                    <!-- Timeline node with icon -->
                    <div class="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 w-9 h-9 md:w-11 md:h-11 bg-blue-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-md">
                        <Icon :name="item.category === 'work' ? 'mdi:briefcase' : 'mdi:school'" class="w-4.5 h-4.5 md:w-5.5 md:h-5.5 text-white" />
                    </div>

                    <!-- Horizontal connector line (mobile: left, desktop: alternating) -->
                    <div class="absolute top-3.5 md:top-4 left-8.25 h-0.5 w-4 sm:w-5 bg-neutral-200 dark:bg-neutral-700 md:hidden"></div>
                    <div class="hidden md:block absolute top-4"
                        :class="index % 2 === 0
                            ? 'right-[calc(50%+1.375rem)] w-6.5'
                            : 'left-[calc(50%+1.375rem)] w-6.5'">
                        <div class="h-0.5 w-full bg-neutral-200 dark:bg-neutral-700"></div>
                    </div>

                    <!-- Content card -->
                    <div class="ml-14 sm:ml-16 md:ml-0"
                        :class="index % 2 === 0 ? 'md:mr-[calc(50%+3rem)]' : 'md:ml-[calc(50%+3rem)]'">
                        <div
                            class="group relative bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div class="relative space-y-3 sm:space-y-4">
                                <!-- 1. Badges row: Year + Type/Grade -->
                                <div class="flex flex-wrap items-center gap-2">
                                    <span class="px-2.5 py-1 sm:px-3 sm:py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-300">
                                        {{ item.year }}
                                    </span>
                                    <span v-if="item.type"
                                        class="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">
                                        <Icon name="mdi:briefcase" class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                        {{ item.type }}
                                    </span>
                                    <span v-if="item.grade"
                                        class="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">
                                        <Icon name="mdi:trophy" class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                        {{ item.grade }}
                                    </span>
                                </div>

                                <!-- 2. Title -->
                                <h3 class="text-lg sm:text-xl md:text-2xl font-black text-neutral-800 dark:text-white">
                                    {{ item.title }}
                                </h3>

                                <!-- 3. Subtitle: Company or School -->
                                <div v-if="item.company || item.school" class="flex items-center gap-2">
                                    <Icon :name="item.company ? 'mdi:office-building' : 'mdi:school'"
                                        class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                                    <span class="text-sm sm:text-base font-medium text-blue-600 dark:text-blue-400">
                                        {{ item.company || item.school }}
                                    </span>
                                </div>

                                <!-- 4. Description -->
                                <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                    {{ item.description }}
                                </p>

                                <!-- 5. Action button -->
                                <button v-if="item.category === 'work'" @click="handleOpenDetails(item)"
                                    class="group/btn cursor-pointer inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-lg hover:shadow-2xl transition-all duration-300">
                                    <span class="flex items-center gap-2 sm:gap-3">
                                        {{ $t('about.work.viewDetails') }}
                                        <Icon name="mdi:arrow-right"
                                            class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                                <a v-else-if="item.link" :href="item.link" target="_blank"
                                    class="group/link cursor-pointer inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-lg hover:shadow-2xl transition-all duration-300">
                                    <span class="flex items-center gap-2 sm:gap-3">
                                        {{ $t('about.education.title') }}
                                        <Icon name="mdi:arrow-right"
                                            class="w-4 h-4 sm:w-5 sm:h-5 group-hover/link:translate-x-1 transition-transform" />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Work Experience Details Modal -->
        <UiModal v-model="isModalOpen" max-width="2xl">
            <template #header>
                <div v-if="selectedWorkItem" class="flex flex-col gap-3 w-full">
                    <h3 class="text-xl sm:text-2xl md:text-3xl font-black text-neutral-900 dark:text-white leading-tight">
                        {{ selectedWorkItem.title }}
                    </h3>
                    <div class="flex flex-wrap items-center gap-2">
                        <div v-if="selectedWorkItem.company" class="flex items-center gap-2">
                            <Icon name="mdi:office-building" class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                            <span class="text-sm sm:text-base font-medium text-blue-600 dark:text-blue-400">{{ selectedWorkItem.company }}</span>
                        </div>
                        <span v-if="selectedWorkItem.company && (selectedWorkItem.type || selectedWorkItem.year)" class="text-neutral-300 dark:text-neutral-600">·</span>
                        <span v-if="selectedWorkItem.type" class="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">
                            {{ selectedWorkItem.type }}
                        </span>
                        <span class="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-300">
                            {{ selectedWorkItem.year }}
                        </span>
                    </div>
                </div>
            </template>

            <div v-if="selectedWorkItem" class="flex flex-col gap-5 sm:gap-6">
                <!-- Description -->
                <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {{ selectedWorkItem.description }}
                </p>

                <!-- Tasks -->
                <div v-if="selectedWorkItem.tasks && selectedWorkItem.tasks.length > 0" class="flex flex-col gap-3">
                    <h4 class="text-base sm:text-lg font-black text-neutral-800 dark:text-white">
                        {{ $t('about.work.modal.tasks') }}
                    </h4>
                    <ul class="flex flex-col gap-2">
                        <li v-for="(task, taskIndex) in selectedWorkItem.tasks" :key="taskIndex"
                            class="flex items-start gap-3">
                            <Icon name="mdi:check-circle" class="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <span class="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                {{ task }}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </UiModal>
    </div>
</template>
