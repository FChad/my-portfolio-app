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
                    {{ buttonText }}
                </UiButton>

                <UiButton variant="secondary" to="/showcase">
                    {{ t('home.cta.primary') }}
                </UiButton>
            </div>
        </div>
    </section>
</template>
