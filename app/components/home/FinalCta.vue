<template>
    <section class="py-12 md:py-16 lg:py-24 bg-neutral-100 dark:bg-neutral-900">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <UiSectionHeader number="07" label="Next" :title="$t('home.finalCta.title')"
                :subtitle="$t('home.finalCta.subtitle')" as="h2" />

            <div class="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center">
                <UiButton variant="primary" to="/showcase">
                    {{ $t('home.finalCta.viewProjects') }}
                </UiButton>

                <UiButton variant="secondary" to="/contact">
                    {{ $t('home.finalCta.contact') }}
                </UiButton>
            </div>
        </div>
    </section>
</template>
