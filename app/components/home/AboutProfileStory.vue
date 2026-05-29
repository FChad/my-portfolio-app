<script setup lang="ts">
interface ProfileInfo {
    icon: string
    label: string
    value: string
}

defineProps<{
    profileInfo: ProfileInfo[]
    age: number
}>()
</script>

<template>
    <section id="about-section" class="scroll-mt-18 py-12 md:py-16 lg:py-24 relative overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <UiSectionHeader number="01" label="About" :title="$t('about.header.title')"
                :subtitle="$t('about.header.subtitle')" as="h2" />

            <!-- Profile sidebar + Story -->
            <div class="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 md:gap-8 lg:gap-10 items-start">
                <!-- Left: Profile sidebar -->
                <aside class="lg:sticky lg:top-24">
                    <UiCard>
                        <div class="flex items-center gap-4 mb-5 pb-5 border-b border-neutral-200 dark:border-neutral-700">
                            <div class="w-16 h-16 rounded-xl grid place-items-center font-display text-white font-bold text-xl tracking-tight bg-brand shrink-0">
                                CF
                            </div>
                            <div class="min-w-0">
                                <div class="font-display font-semibold text-base md:text-lg leading-tight text-neutral-800 dark:text-white">
                                    Chad Feierstein
                                </div>
                                <div class="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                                    {{ $t('about.story.introHighlights.role') }}
                                </div>
                            </div>
                        </div>

                        <dl class="grid gap-3 md:gap-4">
                            <div v-for="info in profileInfo" :key="info.icon"
                                class="relative flex flex-col justify-center gap-0.5 min-w-0 min-h-10 md:min-h-12 lg:min-h-14 pl-13 md:pl-16 lg:pl-18">
                                <dt class="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                    <UiIconBox :icon="info.icon" class="absolute left-0 top-1/2 -translate-y-1/2" />
                                    {{ info.label }}
                                </dt>
                                <dd class="text-sm md:text-base font-semibold text-neutral-800 dark:text-white truncate m-0">
                                    {{ info.value }}
                                </dd>
                            </div>
                        </dl>
                    </UiCard>
                </aside>

                <!-- Right: Story article -->
                <article>
                    <UiCard>
                        <h3 class="font-display font-semibold text-xl md:text-2xl tracking-tight m-0 mb-4 text-neutral-800 dark:text-white">
                            {{ $t('about.story.title') }}
                        </h3>
                        <i18n-t keypath="about.story.intro" tag="p" scope="global"
                            class="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                            <template #age>
                                <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{ age }}</strong>
                            </template>
                            <template #role>
                                <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                    $t('about.story.introHighlights.role') }}</strong>
                            </template>
                            <template #admin>
                                <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                    $t('about.story.introHighlights.admin') }}</strong>
                            </template>
                            <template #location>
                                <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                    $t('about.story.introHighlights.location') }}</strong>
                            </template>
                            <template #cloud>
                                <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                    $t('about.story.introHighlights.cloud') }}</strong>
                            </template>
                            <template #webapps>
                                <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                    $t('about.story.introHighlights.webapps') }}</strong>
                            </template>
                            <template #servers>
                                <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                    $t('about.story.introHighlights.servers') }}</strong>
                            </template>
                            <template #positions>
                                <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                    $t('about.story.introHighlights.positions') }}</strong>
                            </template>
                            <template #langCount>
                                <strong class="font-semibold text-neutral-800 dark:text-neutral-100">{{
                                    $t('about.story.introHighlights.langCount') }}</strong>
                            </template>
                        </i18n-t>
                    </UiCard>
                </article>
            </div>
        </div>
    </section>
</template>
