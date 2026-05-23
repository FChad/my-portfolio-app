<script setup lang="ts">
interface Props {
    title: string
    subtitle: string
    buttonText: string
    buttonUrl: string
}

defineProps<Props>()

const { t } = useI18n()
</script>

<template>
    <section class="py-12 md:py-16 lg:py-24">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <UiSectionHeader number="03" :label="t('common.sections.labels.next')" :title="title" :subtitle="subtitle" />

            <div class="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center">
                <UiButton variant="primary" :href="buttonUrl" external>
                    <span class="flex items-center gap-2 sm:gap-3">
                        {{ buttonText }}
                        <Icon name="mdi:arrow-right"
                            class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                </UiButton>

                <UiButton variant="secondary" to="/showcase">
                    <span class="flex items-center gap-2 sm:gap-3">
                        <Icon name="mdi:eye"
                            class="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform" />
                        {{ t('home.cta.primary') }}
                    </span>
                </UiButton>
            </div>
        </div>
    </section>
</template>
