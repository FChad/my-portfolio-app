<script setup lang="ts">
interface Experience {
    title: string
    description: string
    image: string
    alt: string
}

defineProps<{
    experiences: Experience[]
}>()

const expandedExperience = ref<number | null>(null)

const toggleExperience = (index: number) => {
    expandedExperience.value = expandedExperience.value === index ? null : index
}
</script>

<template>
    <section class="py-12 md:py-16 lg:py-24 bg-neutral-100 dark:bg-neutral-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <p class="text-xs font-mono tracking-[0.2em] uppercase text-accent">
                    05 &mdash; Highlights
                </p>
                <h3 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-800 dark:text-white">
                    {{ $t('about.experiences.title') }}
                </h3>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300">
                    {{ $t('about.experiences.subtitle') }}
                </p>
            </div>

            <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div v-for="(experience, index) in experiences" :key="experience.title"
                    class="group relative rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer md:cursor-default"
                    @click="toggleExperience(index)">

                    <div class="absolute inset-0">
                        <NuxtImg :src="`/img/about/${experience.image}`" :alt="experience.alt"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            :class="{ 'scale-110': expandedExperience === index }" loading="lazy"
                            sizes="sm:50vw md:33vw" />
                        <div class="absolute inset-0 bg-linear-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                            :class="{ 'opacity-20': expandedExperience === index }">
                        </div>
                    </div>

                    <div class="relative h-full min-h-64 sm:min-h-72 md:min-h-80 flex flex-col justify-end">
                        <div
                            class="flex flex-col gap-1.5 md:gap-2 lg:gap-3 bg-linear-to-t from-black/70 via-black/50 to-transparent p-5 md:p-6 lg:p-8 pt-12 md:pt-16">
                            <h4 class="text-lg md:text-xl lg:text-2xl font-bold text-white drop-shadow-lg transition-all">
                                {{ experience.title }}
                            </h4>
                            <p class="text-sm md:text-base text-white/90 leading-relaxed drop-shadow-md max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-300 overflow-hidden"
                                :class="{ 'max-h-40 opacity-100': expandedExperience === index }">
                                {{ experience.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
