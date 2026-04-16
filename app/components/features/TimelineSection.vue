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
    linkLabel?: string
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
            <div class="flex flex-col gap-6 sm:gap-8 md:gap-0">
                <div v-for="(item, index) in items" :key="`${item.category}-${item.year}-${index}`" class="relative"
                    :style="{ zIndex: items.length - index }" :class="index > 0 ? 'md:-mt-16 lg:-mt-20' : ''">

                    <!-- Timeline line segment (CSS-only, starts at first icon) -->
                    <div class="pointer-events-none hidden md:block absolute left-1/2 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-700 -translate-x-1/2"
                        :class="index === 0 ? 'top-1/2' : 'top-0'">
                    </div>

                    <!-- Timeline node (dot only) -->
                    <div
                        class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-3 h-3 bg-neutral-300 dark:bg-neutral-600 rounded-full hidden md:flex border-2 border-transparent">
                    </div>

                    <!-- Horizontal connector line (desktop: alternating) -->
                    <div class="pointer-events-none hidden md:block absolute top-1/2 -translate-y-1/2" :class="index % 2 === 0
                        ? 'right-[calc(50%+0.375rem)] w-[2.625rem]'
                        : 'left-[calc(50%+0.375rem)] w-[2.625rem]'">
                        <div class="h-0.5 w-full bg-neutral-200 dark:bg-neutral-700"></div>
                    </div>

                    <!-- Content card -->
                    <div :class="index % 2 === 0 ? 'md:mr-[calc(50%+3rem)]' : 'md:ml-[calc(50%+3rem)]'">
                        <UiCard>
                            <div class="relative flex flex-col gap-3 sm:gap-4">
                                <!-- 1. Badges row: Year + Type/Grade -->
                                <div class="flex flex-wrap items-center gap-2">
                                    <UiBadge>{{ item.year }}</UiBadge>
                                    <UiBadge v-if="item.type" variant="blue">
                                        {{ item.type }}
                                    </UiBadge>
                                    <UiBadge v-if="item.grade" variant="blue">
                                        {{ item.grade }}
                                    </UiBadge>
                                </div>

                                <!-- 2. Title -->
                                <h3 class="text-lg md:text-xl lg:text-2xl font-bold text-neutral-800 dark:text-white">
                                    {{ item.title }}
                                </h3>

                                <!-- 3. Subtitle: Company or School -->
                                <div v-if="item.company || item.school" class="flex items-center gap-2 -mt-2">
                                    <span class="text-sm md:text-base font-medium text-blue-600 dark:text-blue-400">
                                        {{ item.company || item.school }}
                                    </span>
                                </div>

                                <!-- 4. Description -->
                                <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                    {{ item.description }}
                                </p>

                                <!-- 5. Action button -->
                                <UiButton v-if="item.category === 'work'" variant="secondary" size="sm"
                                    @click="handleOpenDetails(item)" class="self-start">
                                    <span class="flex items-center gap-2 sm:gap-3">
                                        {{ $t('about.work.viewDetails') }}
                                        <Icon name="mdi:eye-outline"
                                            class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform" />
                                    </span>
                                </UiButton>
                                <UiButton v-else-if="item.link" variant="secondary" size="sm" :href="item.link" external
                                    class="self-start">
                                    <span class="flex items-center gap-2 sm:gap-3">
                                        {{ item.linkLabel || $t('about.education.title') }}
                                        <Icon name="mdi:open-in-new"
                                            class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform" />
                                    </span>
                                </UiButton>
                            </div>
                        </UiCard>
                    </div>
                </div>
            </div>
        </div>

        <!-- Work Experience Details Modal -->
        <UiModal v-model="isModalOpen" max-width="2xl">
            <template #header>
                <div v-if="selectedWorkItem" class="flex flex-col gap-3 w-full">
                    <h3 class="text-lg md:text-xl lg:text-2xl font-bold text-neutral-900 dark:text-white leading-tight">
                        {{ selectedWorkItem.title }}
                    </h3>
                    <div class="flex flex-wrap items-center gap-2">
                        <div v-if="selectedWorkItem.company" class="flex items-center gap-2">
                            <Icon name="mdi:office-building"
                                class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                            <span class="text-sm md:text-base font-medium text-blue-600 dark:text-blue-400">{{
                                selectedWorkItem.company }}</span>
                        </div>
                        <span v-if="selectedWorkItem.company && (selectedWorkItem.type || selectedWorkItem.year)"
                            class="text-neutral-300 dark:text-neutral-600">·</span>
                        <UiBadge v-if="selectedWorkItem.type" variant="blue">
                            {{ selectedWorkItem.type }}
                        </UiBadge>
                        <UiBadge>{{ selectedWorkItem.year }}</UiBadge>
                    </div>
                </div>
            </template>

            <div v-if="selectedWorkItem" class="flex flex-col gap-5 sm:gap-6">
                <!-- Description -->
                <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {{ selectedWorkItem.description }}
                </p>

                <!-- Tasks -->
                <div v-if="selectedWorkItem.tasks && selectedWorkItem.tasks.length > 0" class="flex flex-col gap-3">
                    <h4 class="text-sm md:text-base lg:text-lg font-bold text-neutral-800 dark:text-white">
                        {{ $t('about.work.modal.tasks') }}
                    </h4>
                    <ul class="flex flex-col gap-2">
                        <li v-for="(task, taskIndex) in selectedWorkItem.tasks" :key="taskIndex"
                            class="flex items-start gap-2 sm:gap-3">
                            <Icon name="mdi:check-circle" class="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 shrink-0 mt-0.5" />
                            <span class="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                {{ task }}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </UiModal>
    </div>
</template>
