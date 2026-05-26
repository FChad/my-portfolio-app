<script setup lang="ts">
import { validateContactForm, type ContactFormErrors } from '~/utils/validation'
import { SOCIAL_LINKS } from '~/utils/constants'

const { t } = useI18n()
const { setSeoMeta } = useSeo()

setSeoMeta({
    title: t('seo.contact.title'),
    description: t('seo.contact.description'),
    keywords: t('seo.contact.keywords')
})

const initialForm = () => ({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: ''
})

const form = ref(initialForm())

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const submitError = ref<string>('')
const errors = ref<ContactFormErrors>({})
let successTimeout: ReturnType<typeof setTimeout> | null = null

const contactMethods = computed(() => [
    { titleKey: 'contact.methods.linkedin.title', icon: 'mdi:linkedin', href: SOCIAL_LINKS.linkedin },
    { titleKey: 'contact.methods.github.title', icon: 'mdi:github', href: SOCIAL_LINKS.github },
])

const errorText = (field: keyof ContactFormErrors) => {
    const key = errors.value[field]
    return key ? t(`contact.form.errors.${key}`) : ''
}

const submitForm = async () => {
    submitError.value = ''
    const result = validateContactForm(form.value)
    if (!result.ok) {
        errors.value = result.errors
        return
    }
    errors.value = {}

    isSubmitting.value = true

    try {
        await $fetch<{ success: boolean; message: string }>('/api/contact', {
            method: 'POST',
            body: { ...result.data, website: form.value.website }
        })

        isSubmitted.value = true
        form.value = initialForm()

        if (successTimeout) clearTimeout(successTimeout)
        successTimeout = setTimeout(() => {
            isSubmitted.value = false
            successTimeout = null
        }, 10000)
    } catch (error) {
        const err = error as { status?: number }
        const errorMap: Record<number, string> = {
            429: t('contact.form.errors.rateLimited'),
            400: t('contact.form.errors.invalidData'),
            500: t('contact.form.errors.serverError'),
        }
        submitError.value = (err?.status !== undefined && errorMap[err.status]) || t('contact.form.errors.serverError')
    } finally {
        isSubmitting.value = false
    }
}

onBeforeUnmount(() => {
    if (successTimeout) clearTimeout(successTimeout)
})

definePageMeta({
    layout: 'default'
})
</script>

<template>
    <section class="py-12 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <UiSectionHeader number="01" :label="$t('common.sections.labels.contact')" :title="$t('contact.title')"
                :subtitle="$t('contact.subtitle')" />

            <div id="contact-form" class="scroll-mt-18 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

                <!-- Left: Social Links -->
                <div class="w-full lg:w-1/4 flex flex-col gap-4 md:gap-5">
                    <UiButton v-for="method in contactMethods" :key="method.titleKey" variant="secondary"
                        :href="method.href" external>
                        <span class="flex items-center gap-2 sm:gap-3">
                            <Icon :name="method.icon" class="w-4 h-4 sm:w-5 sm:h-5" />
                            {{ $t(method.titleKey) }}
                        </span>
                    </UiButton>
                </div>

                <!-- Right: Contact Form -->
                <div class="w-full lg:w-3/4">
                    <div
                        class="relative bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md border border-neutral-300 dark:border-neutral-700/60 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10">

                        <h2
                            class="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-neutral-800 dark:text-white mb-2 md:mb-3">
                            {{ $t('contact.form.title') }}
                        </h2>
                        <p
                            class="text-sm md:text-base text-neutral-600 dark:text-neutral-300 mb-6 md:mb-8 leading-relaxed">
                            {{ $t('contact.form.description') }}
                        </p>

                        <Transition name="overlay-fade">
                            <div v-if="isSubmitted"
                                class="absolute inset-0 z-10 flex items-center justify-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm rounded-2xl md:rounded-3xl">
                                <div class="flex flex-col items-center gap-4 text-center px-6">
                                    <div
                                        class="w-16 h-16 md:w-20 md:h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                                        <Icon name="mdi:check-circle" class="w-8 h-8 md:w-10 md:h-10 text-green-500" />
                                    </div>
                                    <p class="text-lg md:text-xl font-bold text-green-800 dark:text-green-200">
                                        {{ $t('contact.form.success') }}
                                    </p>
                                </div>
                            </div>
                        </Transition>

                        <Transition name="overlay-fade">
                            <div v-if="submitError"
                                class="absolute inset-0 z-10 flex items-center justify-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm rounded-2xl md:rounded-3xl">
                                <div class="flex flex-col items-center gap-4 text-center px-6">
                                    <div
                                        class="w-16 h-16 md:w-20 md:h-20 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center">
                                        <Icon name="mdi:alert-circle" class="w-8 h-8 md:w-10 md:h-10 text-red-500" />
                                    </div>
                                    <p class="text-lg md:text-xl font-bold text-red-800 dark:text-red-200">
                                        {{ submitError }}
                                    </p>
                                    <UiButton variant="danger" @click="submitError = ''" class="mt-2">
                                        {{ $t('contact.form.tryAgain') }}
                                    </UiButton>
                                </div>
                            </div>
                        </Transition>

                        <form @submit.prevent="submitForm" class="flex flex-col gap-4 md:gap-6">
                            <!-- Honeypot: must stay empty. Hidden from users, baited for bots. -->
                            <div aria-hidden="true" class="absolute -left-[9999px] w-0 h-0 overflow-hidden">
                                <label for="website">Website</label>
                                <input v-model="form.website" type="text" id="website" name="website" tabindex="-1"
                                    autocomplete="off" />
                            </div>

                            <div class="grid sm:grid-cols-2 gap-4 md:gap-6">
                                <UiFormField id="name" v-model="form.name" :label="$t('contact.form.name')"
                                    :placeholder="$t('contact.form.namePlaceholder')" autocomplete="name" required
                                    :error="errorText('name')" />
                                <UiFormField id="email" v-model="form.email" type="email"
                                    :label="$t('contact.form.email')"
                                    :placeholder="$t('contact.form.emailPlaceholder')" autocomplete="email" required
                                    :error="errorText('email')" />
                            </div>

                            <UiFormField id="subject" v-model="form.subject" :label="$t('contact.form.subject')"
                                :placeholder="$t('contact.form.subjectPlaceholder')" required
                                :error="errorText('subject')" />

                            <UiFormField id="message" v-model="form.message" type="textarea"
                                :label="$t('contact.form.message')"
                                :placeholder="$t('contact.form.messagePlaceholder')" required
                                :error="errorText('message')" />

                            <div class="flex justify-end">
                                <UiButton variant="primary" type="submit" :disabled="isSubmitting"
                                    class="gap-2 sm:gap-3">
                                    <Icon v-if="isSubmitting" name="mdi:refresh"
                                        class="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                    <Icon v-else name="mdi:send" class="w-4 h-4 sm:w-5 sm:h-5" />
                                    {{ isSubmitting ? $t('contact.form.sending') : $t('contact.form.submit') }}
                                </UiButton>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<style scoped>
.overlay-fade-enter-active,
.overlay-fade-leave-active {
    transition: opacity 0.3s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
    opacity: 0;
}
</style>
