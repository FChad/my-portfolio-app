<template>
    <section class="py-12 md:py-16 lg:py-24">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="flex flex-col gap-3 md:gap-4 mb-6 md:mb-8">
                <p class="text-xs font-mono tracking-[0.2em] uppercase text-accent">
                    08 &mdash; Next
                </p>
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-800 dark:text-white">
                    {{ $t('home.finalCta.title') }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                    {{ $t('home.finalCta.subtitle') }}
                </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center">
                <UiButton variant="primary" to="/showcase">
                    <span class="flex items-center gap-2 sm:gap-3">
                        <Icon name="mdi:eye"
                            class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform" />
                        {{ $t('home.finalCta.viewProjects') }}
                    </span>
                </UiButton>

                <UiButton variant="secondary" to="/contact">
                    <span class="flex items-center gap-2 sm:gap-3">
                        {{ $t('home.finalCta.contact') }}
                        <Icon name="mdi:arrow-right"
                            class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                </UiButton>
            </div>
        </div>
    </section>
</template>
