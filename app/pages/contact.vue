<script setup lang="ts">
import { EMAIL_REGEX, CONTACT_FORM_LIMITS } from '~/utils/validation'
import { SOCIAL_LINKS } from '~/utils/constants'

const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const { setSeoMeta } = useSeo()

setSeoMeta({
    title: t('seo.contact.title'),
    description: t('seo.contact.description'),
    keywords: t('seo.contact.keywords')
})

// Load Turnstile script only on this page
useHead({
    script: [
        {
            src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
            defer: true
        }
    ]
})

// Form state
const form = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
})

// Turnstile state
const turnstileToken = ref('')
const turnstileRef = ref()

// Form validation and submission states
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const submitError = ref<string>('')
const errors = ref<Record<string, string>>({})
const showTurnstileError = ref(false)

// Contact methods with i18n keys
const contactMethods = computed(() => [
    {
        titleKey: 'contact.methods.linkedin.title',
        icon: 'mdi:linkedin',
        href: SOCIAL_LINKS.linkedin
    },
    {
        titleKey: 'contact.methods.github.title',
        icon: 'mdi:github',
        href: SOCIAL_LINKS.github
    }
])

const validateForm = () => {
    errors.value = {}
    submitError.value = ''

    const rules: [string, () => string | null][] = [
        ['name', () => {
            if (!form.value.name.trim()) return t('contact.form.errors.nameRequired')
            if (form.value.name.length < CONTACT_FORM_LIMITS.name.min || form.value.name.length > CONTACT_FORM_LIMITS.name.max) return t('contact.form.errors.nameLength')
            return null
        }],
        ['email', () => {
            if (!form.value.email.trim()) return t('contact.form.errors.emailRequired')
            if (!EMAIL_REGEX.test(form.value.email) || form.value.email.length > CONTACT_FORM_LIMITS.email.max) return t('contact.form.errors.emailInvalid')
            return null
        }],
        ['subject', () => {
            if (!form.value.subject.trim()) return t('contact.form.errors.subjectRequired')
            if (form.value.subject.length < CONTACT_FORM_LIMITS.subject.min || form.value.subject.length > CONTACT_FORM_LIMITS.subject.max) return t('contact.form.errors.subjectLength')
            return null
        }],
        ['message', () => {
            if (!form.value.message.trim()) return t('contact.form.errors.messageRequired')
            if (form.value.message.length < CONTACT_FORM_LIMITS.message.min) return t('contact.form.errors.messageMinLength')
            if (form.value.message.length > CONTACT_FORM_LIMITS.message.max) return t('contact.form.errors.messageMaxLength')
            return null
        }],
        ['turnstile', () => {
            if (!turnstileToken.value?.trim()) return t('contact.form.errors.captchaRequired')
            return null
        }],
    ]

    for (const [field, validate] of rules) {
        const error = validate()
        if (error) errors.value[field] = error
    }

    showTurnstileError.value = !!errors.value.turnstile
    return Object.keys(errors.value).length === 0
}

// Submit form
const submitForm = async () => {
    if (!validateForm()) {
        return
    }

    isSubmitting.value = true
    submitError.value = ''

    try {
        await $fetch<{ success: boolean; message: string; id?: string }>('/api/contact', {
            method: 'POST',
            body: {
                ...form.value,
                turnstileToken: turnstileToken.value
            }
        })

        // Success
        isSubmitted.value = true

        // Form zurücksetzen
        form.value = {
            name: '',
            email: '',
            subject: '',
            message: ''
        }
        turnstileToken.value = ''
        turnstileRef.value?.reset()

        // Auto-hide success message after 10 seconds
        setTimeout(() => {
            isSubmitted.value = false
        }, 10000)
    } catch (error: any) {
        const isCaptchaError = /captcha|verification/i.test(error?.statusText || '')

        if (isCaptchaError) {
            turnstileRef.value?.reset()
            turnstileToken.value = ''
        }

        const errorMap: Record<number, string> = {
            429: t('contact.form.errors.rateLimited'),
            400: isCaptchaError ? t('contact.form.errors.captchaFailed') : t('contact.form.errors.invalidData'),
            500: t('contact.form.errors.serverError'),
        }

        submitError.value = errorMap[error?.status] || t('contact.form.errors.serverError')
    } finally {
        isSubmitting.value = false
    }
}

const onTurnstileVerified = (token: string) => {
    turnstileToken.value = token
    showTurnstileError.value = false
    submitError.value = ''
    delete errors.value.turnstile
}

const resetTurnstile = (errorKey: string) => {
    turnstileToken.value = ''
    showTurnstileError.value = true
    submitError.value = t(errorKey)
}

const onTurnstileExpired = () => resetTurnstile('contact.form.errors.captchaExpired')
const onTurnstileError = () => resetTurnstile('contact.form.errors.captchaError')

definePageMeta({
    layout: 'default'
})
</script>

<template>
    <!-- Contact Section -->
    <section class="py-12 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
                    {{ $t('contact.title') }}
                </h1>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                    {{ $t('contact.subtitle') }}
                </p>
            </div>

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
                        class="relative bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10">

                        <h2
                            class="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-white mb-2 md:mb-3">
                            {{ $t('contact.form.title') }}
                        </h2>
                        <p
                            class="text-sm md:text-base text-neutral-600 dark:text-neutral-300 mb-6 md:mb-8 leading-relaxed">
                            {{ $t('contact.form.description') }}
                        </p>

                        <!-- Overlay: Success Message -->
                        <Transition name="overlay-fade">
                            <div v-if="isSubmitted"
                                class="absolute inset-0 z-10 flex items-center justify-center bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl md:rounded-3xl">
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

                        <!-- Overlay: Error Message -->
                        <Transition name="overlay-fade">
                            <div v-if="submitError"
                                class="absolute inset-0 z-10 flex items-center justify-center bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl md:rounded-3xl">
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
                            <!-- Name and Email Fields -->
                            <div class="grid sm:grid-cols-2 gap-4 md:gap-6">
                                <!-- Name Field -->
                                <div class="flex flex-col gap-1.5 md:gap-2">
                                    <label for="name"
                                        class="block text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        {{ $t('contact.form.name') }} *
                                    </label>
                                    <input v-model="form.name" type="text" id="name" :class="[
                                        'w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl md:rounded-2xl border text-sm md:text-base bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 outline-none transition-all',
                                        errors.name
                                            ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                                            : 'border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    ]" :placeholder="$t('contact.form.namePlaceholder')" />
                                    <p v-if="errors.name" class="text-xs md:text-sm text-red-600 dark:text-red-400">
                                        {{ errors.name }}
                                    </p>
                                </div>

                                <!-- Email Field -->
                                <div class="flex flex-col gap-1.5 md:gap-2">
                                    <label for="email"
                                        class="block text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        {{ $t('contact.form.email') }} *
                                    </label>
                                    <input v-model="form.email" type="email" id="email" :class="[
                                        'w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl md:rounded-2xl border text-sm md:text-base bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 outline-none transition-all',
                                        errors.email
                                            ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                                            : 'border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    ]" placeholder="your@email.com" />
                                    <p v-if="errors.email" class="text-xs md:text-sm text-red-600 dark:text-red-400">
                                        {{ errors.email }}
                                    </p>
                                </div>
                            </div>

                            <!-- Subject Field -->
                            <div class="flex flex-col gap-1.5 md:gap-2">
                                <label for="subject"
                                    class="block text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                    {{ $t('contact.form.subject') }} *
                                </label>
                                <input v-model="form.subject" type="text" id="subject" :class="[
                                    'w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl md:rounded-2xl border text-sm md:text-base bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 outline-none transition-all',
                                    errors.subject
                                        ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                                        : 'border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                ]" :placeholder="$t('contact.form.subjectPlaceholder')" />
                                <p v-if="errors.subject" class="text-xs md:text-sm text-red-600 dark:text-red-400">
                                    {{ errors.subject }}
                                </p>
                            </div>

                            <!-- Message Field -->
                            <div class="flex flex-col gap-1.5 md:gap-2">
                                <label for="message"
                                    class="block text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                    {{ $t('contact.form.message') }} *
                                </label>
                                <textarea v-model="form.message" id="message" rows="5" :class="[
                                    'w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl md:rounded-2xl border resize-none text-sm md:text-base bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 outline-none transition-all',
                                    errors.message
                                        ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                                        : 'border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                ]" :placeholder="$t('contact.form.messagePlaceholder')"></textarea>
                                <p v-if="errors.message" class="text-xs md:text-sm text-red-600 dark:text-red-400">
                                    {{ errors.message }}
                                </p>
                            </div>

                            <!-- Turnstile Widget and Submit Button -->
                            <div class="flex flex-col sm:flex-row items-center justify-end gap-4">
                                <!-- Turnstile Widget -->
                                <div v-if="runtimeConfig.public.turnstileSiteKey" class="flex flex-col items-center">
                                    <FeaturesTurnstileWidget v-model="turnstileToken"
                                        :site-key="runtimeConfig.public.turnstileSiteKey"
                                        @verified="onTurnstileVerified" @expired="onTurnstileExpired"
                                        @error="onTurnstileError" ref="turnstileRef" />
                                    <p v-if="showTurnstileError || errors.turnstile"
                                        class="text-xs md:text-sm text-red-600 dark:text-red-400 text-center mt-2">
                                        {{ errors.turnstile }}
                                    </p>
                                </div>

                                <!-- Submit Button -->
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