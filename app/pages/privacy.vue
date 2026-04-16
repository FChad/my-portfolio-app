<script setup lang="ts">
const { t } = useI18n()
const { setSeoMeta } = useSeo()

setSeoMeta({
    title: t('seo.privacy.title'),
    description: t('seo.privacy.description'),
    keywords: t('seo.privacy.keywords')
})

// Exclude privacy page from search engine indexing and sitemap
useSeoMeta({
    robots: 'noindex, nofollow'
})
</script>

<template>
    <div class="py-12 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Header -->
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
                    {{ $t('privacy.title') }}
                </h1>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300">
                    {{ $t('privacy.lastUpdated') }}: {{ $t('privacy.updateDate') }}
                </p>
            </div>

            <!-- Privacy Highlights -->
            <UiCard variant="blue" size="md" class="mb-4 md:mb-6">
                <div class="flex items-start gap-3 md:gap-4">
                    <div
                        class="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                        <Icon name="mdi:cookie-off" class="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h2 class="text-base md:text-lg font-bold text-neutral-800 dark:text-white mb-2 md:mb-3">
                            {{ $t('privacy.sections.noCookieBanner.title') }}
                        </h2>
                        <ul class="flex flex-col gap-2 text-sm md:text-base text-neutral-600 dark:text-neutral-300">
                            <li class="flex items-start gap-2">
                                <Icon name="mdi:check-circle" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                                {{ $t('privacy.sections.dataCollection.items.noTracking') }}
                            </li>
                            <li class="flex items-start gap-2">
                                <Icon name="mdi:check-circle" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                                {{ $t('privacy.sections.dataCollection.items.noAnalytics') }}
                            </li>
                            <li class="flex items-start gap-2">
                                <Icon name="mdi:check-circle" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                                {{ $t('privacy.sections.dataCollection.items.noThirdParty') }}
                            </li>
                        </ul>
                    </div>
                </div>
            </UiCard>

            <!-- Content -->
            <div class="flex flex-col gap-4 md:gap-6">
                <!-- Row 1: Data Controller + Data Collection side by side -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <!-- Data Controller -->
                    <UiCard>
                        <h2
                            class="text-lg md:text-xl font-bold text-neutral-800 dark:text-white mb-3 md:mb-4 flex items-center gap-3">
                            <Icon name="mdi:account-tie"
                                class="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                            {{ $t('privacy.sections.responsible.title') }}
                        </h2>
                        <div
                            class="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed flex flex-col gap-1">
                            <p class="font-medium text-neutral-800 dark:text-white">Chad Feierstein</p>
                            <p>{{ $t('privacy.sections.responsible.location') }}</p>
                            <p>
                                <NuxtLinkLocale to="/contact"
                                    class="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                                    <Icon name="mdi:email-outline" class="w-4 h-4" />
                                    {{ $t('privacy.sections.responsible.contact') }}
                                </NuxtLinkLocale>
                            </p>
                        </div>
                    </UiCard>

                    <!-- Your Rights -->
                    <UiCard>
                        <h2
                            class="text-lg md:text-xl font-bold text-neutral-800 dark:text-white mb-3 md:mb-4 flex items-center gap-3">
                            <Icon name="mdi:scale-balance"
                                class="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                            {{ $t('privacy.sections.rights.title') }}
                        </h2>
                        <ul class="flex flex-col gap-3 text-sm md:text-base text-neutral-600 dark:text-neutral-300">
                            <li class="flex items-start gap-2">
                                <Icon name="mdi:theme-light-dark" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                                {{ $t('privacy.sections.rights.localStorage') }}
                            </li>
                            <li class="flex items-start gap-2">
                                <Icon name="mdi:email-outline" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                                {{ $t('privacy.sections.rights.contact') }}
                            </li>
                        </ul>
                    </UiCard>
                </div>

                <!-- What We Process (full width) -->
                <UiCard>
                    <h2
                        class="text-lg md:text-xl font-bold text-neutral-800 dark:text-white mb-3 md:mb-4 flex items-center gap-3">
                        <Icon name="mdi:database" class="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                        {{ $t('privacy.sections.dataCollection.title') }}
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                        <!-- Theme Preference -->
                        <UiCard variant="muted" size="sm">
                            <div class="flex items-center gap-3 mb-2">
                                <Icon name="mdi:theme-light-dark" class="w-5 h-5 text-blue-500" />
                                <h3 class="text-sm md:text-base font-bold text-neutral-800 dark:text-white">
                                    {{ $t('privacy.sections.technicalStorage.localStorage.title') }}
                                </h3>
                            </div>
                            <UiBadge variant="blue" size="sm" class="mb-2">
                                {{ $t('privacy.sections.technicalStorage.localStorage.badge') }}
                            </UiBadge>
                            <p class="text-xs md:text-sm text-neutral-600 dark:text-neutral-300">
                                {{ $t('privacy.sections.technicalStorage.localStorage.description') }}
                            </p>
                        </UiCard>

                        <!-- Contact Form -->
                        <UiCard variant="muted" size="sm">
                            <div class="flex items-center gap-3 mb-2">
                                <Icon name="mdi:email-outline" class="w-5 h-5 text-blue-500" />
                                <h3 class="text-sm md:text-base font-bold text-neutral-800 dark:text-white">
                                    {{ $t('privacy.sections.contactForm.title') }}
                                </h3>
                            </div>
                            <p class="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 mb-2">
                                {{ $t('privacy.sections.contactForm.content') }}
                            </p>
                            <ul class="flex flex-col gap-1 text-xs md:text-sm text-neutral-600 dark:text-neutral-300">
                                <li class="flex items-start gap-2">
                                    <Icon name="mdi:circle-small" class="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                                    {{ $t('privacy.sections.contactForm.items.name') }}
                                </li>
                                <li class="flex items-start gap-2">
                                    <Icon name="mdi:circle-small" class="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                                    {{ $t('privacy.sections.contactForm.items.email') }}
                                </li>
                                <li class="flex items-start gap-2">
                                    <Icon name="mdi:circle-small" class="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                                    {{ $t('privacy.sections.contactForm.items.message') }}
                                </li>
                            </ul>
                        </UiCard>

                        <!-- Turnstile -->
                        <UiCard variant="muted" size="sm">
                            <div class="flex items-center gap-3 mb-2">
                                <Icon name="mdi:shield-check" class="w-5 h-5 text-blue-500" />
                                <h3 class="text-sm md:text-base font-bold text-neutral-800 dark:text-white">
                                    {{ $t('privacy.sections.technicalStorage.turnstile.title') }}
                                </h3>
                            </div>
                            <UiBadge variant="blue" size="sm" class="mb-2">
                                {{ $t('privacy.sections.technicalStorage.turnstile.badge') }}
                            </UiBadge>
                            <p class="text-xs md:text-sm text-neutral-600 dark:text-neutral-300">
                                {{ $t('privacy.sections.technicalStorage.turnstile.description') }}
                            </p>
                        </UiCard>
                    </div>
                    <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-3 md:mt-4">
                        {{ $t('privacy.sections.contactForm.legalBasis') }}
                    </p>
                </UiCard>

                <!-- Row 3: Services side by side -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <!-- Cloudflare Hosting -->
                    <UiCard>
                        <div class="flex items-center gap-3 mb-3 md:mb-4">
                            <Icon name="mdi:cloud" class="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                            <h2 class="text-lg md:text-xl font-bold text-neutral-800 dark:text-white">
                                {{ $t('privacy.sections.hosting.title') }}
                            </h2>
                        </div>
                        <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-300 mb-3">
                            {{ $t('privacy.sections.hosting.content') }}
                        </p>
                        <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer"
                            class="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                            {{ $t('privacy.sections.hosting.link') }}
                            <Icon name="mdi:open-in-new" class="w-3 h-3" />
                        </a>
                    </UiCard>

                    <!-- Resend Email -->
                    <UiCard>
                        <div class="flex items-center gap-3 mb-3 md:mb-4">
                            <Icon name="mdi:email-fast"
                                class="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                            <h2 class="text-lg md:text-xl font-bold text-neutral-800 dark:text-white">
                                {{ $t('privacy.sections.contactForm.resend.title') }}
                            </h2>
                        </div>
                        <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-300 mb-3">
                            {{ $t('privacy.sections.contactForm.resend.description') }}
                        </p>
                        <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer"
                            class="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                            {{ $t('privacy.sections.contactForm.resend.link') }}
                            <Icon name="mdi:open-in-new" class="w-3 h-3" />
                        </a>
                    </UiCard>
                </div>
            </div>

            <!-- Back to Home -->
            <div class="mt-8 md:mt-12 text-center">
                <UiButton variant="primary" to="/">
                    <Icon name="mdi:arrow-left"
                        class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:-translate-x-1 transition-transform" />
                    {{ $t('privacy.backToHome') }}
                </UiButton>
            </div>
        </div>
    </div>
</template>
