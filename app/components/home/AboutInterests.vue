<script setup lang="ts">
const interests = [
    { nameKey: 'about.interestsList.tech.title', subtitleKey: 'about.interestsList.tech.subtitle', icon: 'mdi:code-braces' },
    { nameKey: 'about.interestsList.family.title', subtitleKey: 'about.interestsList.family.subtitle', icon: 'mdi:home-heart' },
    { nameKey: 'about.interestsList.gaming.title', subtitleKey: 'about.interestsList.gaming.subtitle', icon: 'mdi:controller' },
    { nameKey: 'about.interestsList.friends.title', subtitleKey: 'about.interestsList.friends.subtitle', icon: 'mdi:account-group' }
] as const
</script>

<template>
    <section class="py-12 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <p class="text-xs font-mono tracking-[0.2em] uppercase text-accent">
                    02 &mdash; Interests
                </p>
                <h3 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-800 dark:text-white">
                    {{ $t('about.interests.title') }}
                </h3>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300">
                    {{ $t('about.interests.subtitle') }}
                </p>
            </div>

            <div class="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <UiCard v-for="interest in interests" :key="interest.icon">
                    <div class="flex flex-col gap-3 md:gap-4">
                        <UiIconBox :icon="interest.icon" />
                        <div class="flex flex-col gap-1 min-w-0">
                            <h4 class="text-base md:text-lg font-display font-semibold text-neutral-800 dark:text-white">
                                {{ $t(interest.nameKey) }}
                            </h4>
                            <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed m-0">
                                {{ $t(interest.subtitleKey) }}
                            </p>
                        </div>
                    </div>
                </UiCard>
            </div>
        </div>
    </section>
</template>
