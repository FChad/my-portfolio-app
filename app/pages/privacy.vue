<script setup lang="ts">
const { t } = useI18n()
const { setSeoMeta } = useSeo()

setSeoMeta({
    title: t('seo.privacy.title'),
    description: t('seo.privacy.description'),
    keywords: t('seo.privacy.keywords')
})

const runtimeConfig = useRuntimeConfig()
const baseUrl = runtimeConfig.public.baseUrl || 'https://www.chad.lu'
</script>

<template>
    <div class="min-h-screen py-16 lg:py-24">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Header -->
            <div class="text-center mb-12">
                <div
                    class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
                    <Icon name="mdi:shield-lock" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {{ $t('privacy.title') }}
                </h1>
                <p class="text-lg text-gray-600 dark:text-gray-400">
                    {{ $t('privacy.lastUpdated') }}: {{ $t('privacy.updateDate') }}
                </p>
            </div>

            <!-- Content -->
            <div class="space-y-10">
                <!-- Introduction -->
                <section
                    class="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                        <Icon name="mdi:information" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        {{ $t('privacy.sections.intro.title') }}
                    </h2>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {{ $t('privacy.sections.intro.content') }}
                    </p>
                </section>

                <!-- Responsible Party -->
                <section
                    class="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                        <Icon name="mdi:account-tie" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        {{ $t('privacy.sections.responsible.title') }}
                    </h2>
                    <div class="text-gray-600 dark:text-gray-400 leading-relaxed space-y-1">
                        <p class="font-medium text-gray-900 dark:text-white">Chad Feierstein</p>
                        <p>{{ $t('privacy.sections.responsible.location') }}</p>
                        <p>
                            <NuxtLinkLocale to="/contact"
                                class="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                                <Icon name="mdi:email-outline" class="w-4 h-4" />
                                {{ $t('privacy.sections.responsible.contact') }}
                            </NuxtLinkLocale>
                        </p>
                    </div>
                </section>

                <!-- Data Collection -->
                <section
                    class="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                        <Icon name="mdi:database" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        {{ $t('privacy.sections.dataCollection.title') }}
                    </h2>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        {{ $t('privacy.sections.dataCollection.content') }}
                    </p>
                    <ul class="space-y-2 text-gray-600 dark:text-gray-400">
                        <li class="flex items-start gap-2">
                            <Icon name="mdi:check-circle" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            {{ $t('privacy.sections.dataCollection.items.noTracking') }}
                        </li>
                        <li class="flex items-start gap-2">
                            <Icon name="mdi:check-circle" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            {{ $t('privacy.sections.dataCollection.items.noAnalytics') }}
                        </li>
                        <li class="flex items-start gap-2">
                            <Icon name="mdi:check-circle" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            {{ $t('privacy.sections.dataCollection.items.noThirdParty') }}
                        </li>
                    </ul>
                </section>

                <!-- Technical Storage -->
                <section
                    class="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                        <Icon name="mdi:cog" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        {{ $t('privacy.sections.technicalStorage.title') }}
                    </h2>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        {{ $t('privacy.sections.technicalStorage.content') }}
                    </p>

                    <!-- localStorage Item -->
                    <div
                        class="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 mb-4 border border-gray-200 dark:border-gray-600">
                        <div class="flex items-center gap-3 mb-2">
                            <Icon name="mdi:theme-light-dark" class="w-5 h-5 text-purple-500" />
                            <h3 class="font-medium text-gray-900 dark:text-white">
                                {{ $t('privacy.sections.technicalStorage.localStorage.title') }}
                            </h3>
                            <span
                                class="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                {{ $t('privacy.sections.technicalStorage.localStorage.badge') }}
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {{ $t('privacy.sections.technicalStorage.localStorage.description') }}
                        </p>
                        <div
                            class="text-xs text-gray-500 dark:text-gray-500 font-mono bg-gray-100 dark:bg-gray-800 rounded px-2 py-1 inline-block">
                            Key: nuxt-color-mode
                        </div>
                    </div>

                    <!-- Turnstile Item -->
                    <div
                        class="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                        <div class="flex items-center gap-3 mb-2">
                            <Icon name="mdi:shield-check" class="w-5 h-5 text-orange-500" />
                            <h3 class="font-medium text-gray-900 dark:text-white">
                                {{ $t('privacy.sections.technicalStorage.turnstile.title') }}
                            </h3>
                            <span
                                class="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                {{ $t('privacy.sections.technicalStorage.turnstile.badge') }}
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            {{ $t('privacy.sections.technicalStorage.turnstile.description') }}
                        </p>
                    </div>
                </section>

                <!-- Contact Form -->
                <section
                    class="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                        <Icon name="mdi:email-outline" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        {{ $t('privacy.sections.contactForm.title') }}
                    </h2>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        {{ $t('privacy.sections.contactForm.content') }}
                    </p>
                    <ul class="space-y-2 text-gray-600 dark:text-gray-400">
                        <li class="flex items-start gap-2">
                            <Icon name="mdi:circle-small" class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            {{ $t('privacy.sections.contactForm.items.name') }}
                        </li>
                        <li class="flex items-start gap-2">
                            <Icon name="mdi:circle-small" class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            {{ $t('privacy.sections.contactForm.items.email') }}
                        </li>
                        <li class="flex items-start gap-2">
                            <Icon name="mdi:circle-small" class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            {{ $t('privacy.sections.contactForm.items.message') }}
                        </li>
                    </ul>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                        {{ $t('privacy.sections.contactForm.legalBasis') }}
                    </p>

                    <!-- Resend Info -->
                    <div
                        class="mt-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                        <div class="flex items-center gap-3 mb-2">
                            <Icon name="mdi:email-fast" class="w-5 h-5 text-blue-500" />
                            <h3 class="font-medium text-gray-900 dark:text-white">
                                {{ $t('privacy.sections.contactForm.resend.title') }}
                            </h3>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {{ $t('privacy.sections.contactForm.resend.description') }}
                        </p>
                        <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer"
                            class="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                            {{ $t('privacy.sections.contactForm.resend.link') }}
                            <Icon name="mdi:open-in-new" class="w-3 h-3" />
                        </a>
                    </div>
                </section>

                <!-- Hosting -->
                <section
                    class="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                        <Icon name="mdi:cloud" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        {{ $t('privacy.sections.hosting.title') }}
                    </h2>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        {{ $t('privacy.sections.hosting.content') }}
                    </p>
                    <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer"
                        class="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                        {{ $t('privacy.sections.hosting.link') }}
                        <Icon name="mdi:open-in-new" class="w-4 h-4" />
                    </a>
                </section>

                <!-- Your Rights -->
                <section
                    class="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                        <Icon name="mdi:scale-balance" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        {{ $t('privacy.sections.rights.title') }}
                    </h2>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        {{ $t('privacy.sections.rights.intro') }}
                    </p>
                    <div
                        class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                        <div class="flex items-start gap-3">
                            <Icon name="mdi:information"
                                class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                    {{ $t('privacy.sections.rights.localStorage') }}
                                </p>
                                <p class="text-sm text-gray-700 dark:text-gray-300">
                                    {{ $t('privacy.sections.rights.contact') }}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- No Cookie Banner Notice -->
                <section
                    class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 sm:p-8 border border-green-200 dark:border-green-800">
                    <div class="flex items-start gap-4">
                        <div
                            class="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                            <Icon name="mdi:cookie-off" class="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {{ $t('privacy.sections.noCookieBanner.title') }}
                            </h2>
                            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {{ $t('privacy.sections.noCookieBanner.content') }}
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <!-- Back to Home -->
            <div class="mt-12 text-center">
                <NuxtLinkLocale to="/"
                    class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium transition-colors">
                    <Icon name="mdi:arrow-left" class="w-5 h-5" />
                    {{ $t('privacy.backToHome') }}
                </NuxtLinkLocale>
            </div>
        </div>
    </div>
</template>
