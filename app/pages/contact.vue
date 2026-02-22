<script setup lang="ts">
const { t, locale } = useI18n()
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
        href: 'https://www.linkedin.com/in/chad-feierstein/',
        color: 'bg-[#0077B5] hover:bg-[#005885]',
        descriptionKey: 'contact.methods.linkedin.description',
        isExternal: true
    },
    {
        titleKey: 'contact.methods.github.title',
        icon: 'mdi:github',
        href: 'https://github.com/FChad',
        color: 'bg-neutral-800 hover:bg-neutral-900 dark:bg-neutral-700 dark:hover:bg-neutral-600',
        descriptionKey: 'contact.methods.github.description',
        isExternal: true
    },
    {
        titleKey: 'contact.methods.email.title',
        icon: 'mdi:email',
        href: '#contact-form',
        color: 'bg-blue-500 hover:bg-blue-600',
        descriptionKey: 'contact.methods.email.description',
        isExternal: false
    }
])

const scrollToContactForm = () => {
    document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' })
}

const validateForm = () => {
    errors.value = {}
    submitError.value = ''

    const rules: [string, () => string | null][] = [
        ['name', () => {
            if (!form.value.name.trim()) return t('contact.form.errors.nameRequired')
            if (form.value.name.length < 2 || form.value.name.length > 100) return t('contact.form.errors.nameLength')
            return null
        }],
        ['email', () => {
            if (!form.value.email.trim()) return t('contact.form.errors.emailRequired')
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email) || form.value.email.length > 254) return t('contact.form.errors.emailInvalid')
            return null
        }],
        ['subject', () => {
            if (!form.value.subject.trim()) return t('contact.form.errors.subjectRequired')
            if (form.value.subject.length < 5 || form.value.subject.length > 200) return t('contact.form.errors.subjectLength')
            return null
        }],
        ['message', () => {
            if (!form.value.message.trim()) return t('contact.form.errors.messageRequired')
            if (form.value.message.length < 10) return t('contact.form.errors.messageMinLength')
            if (form.value.message.length > 2000) return t('contact.form.errors.messageMaxLength')
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
        const response = await $fetch<{ success: boolean; message: string; id?: string }>('/api/contact', {
            method: 'POST',
            body: {
                ...form.value,
                turnstileToken: turnstileToken.value,
                locale: locale.value
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
    <!-- Single Compact Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden py-12 sm:py-16 md:py-20">

        <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div class="space-y-8 md:space-y-12">
                <!-- Header -->
                <div class="text-center space-y-4">
                    <h1 class="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-800 dark:text-white">
                        {{ $t('contact.title') }}
                    </h1>
                    <p class="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                        {{ $t('contact.subtitle') }}
                    </p>
                </div>

                <!-- Contact Methods Grid -->
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <div v-for="method in contactMethods" :key="method.titleKey"
                        class="group bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

                        <!-- External links -->
                        <NuxtLink v-if="method.isExternal" :to="method.href" external target="_blank" class="block">
                            <div class="flex flex-col items-center gap-3 md:gap-4 text-center">
                                <!-- Icon Container -->
                                <div :class="[
                                    'w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg',
                                    method.color
                                ]">
                                    <Icon :name="method.icon" class="w-7 h-7 md:w-8 md:h-8 text-white" />
                                </div>

                                <!-- Content -->
                                <div class="flex flex-col gap-1 md:gap-2">
                                    <h3
                                        class="font-black text-lg md:text-xl text-neutral-800 dark:text-white flex items-center justify-center gap-2">
                                        {{ $t(method.titleKey) }}
                                        <Icon name="mdi:external-link"
                                            class="w-4 h-4 text-neutral-400 group-hover:text-blue-500" />
                                    </h3>
                                    <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-300">
                                        {{ $t(method.descriptionKey) }}
                                    </p>
                                </div>
                            </div>
                        </NuxtLink>

                        <!-- Internal scroll action (Email) -->
                        <button v-else @click="scrollToContactForm" class="block w-full">
                            <div class="flex flex-col items-center gap-3 md:gap-4 text-center">
                                <!-- Icon Container -->
                                <div :class="[
                                    'w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg',
                                    method.color
                                ]">
                                    <Icon :name="method.icon" class="w-7 h-7 md:w-8 md:h-8 text-white" />
                                </div>

                                <!-- Content -->
                                <div class="flex flex-col gap-1 md:gap-2">
                                    <h3
                                        class="font-black text-lg md:text-xl text-neutral-800 dark:text-white flex items-center justify-center gap-2">
                                        {{ $t(method.titleKey) }}
                                        <Icon name="mdi:arrow-down"
                                            class="w-4 h-4 text-neutral-400 group-hover:text-blue-500" />
                                    </h3>
                                    <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-300">
                                        {{ $t(method.descriptionKey) }}
                                    </p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- Contact Form -->
                <div id="contact-form"
                    class="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <h2
                        class="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-800 dark:text-white text-center mb-6 md:mb-8">
                        {{ $t('contact.form.title') }}
                    </h2>
                    <!-- Success Message -->
                    <div v-if="isSubmitted"
                        class="mb-4 md:mb-6 p-3 md:p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                        <div class="flex items-center gap-2 md:gap-3">
                            <Icon name="mdi:check-circle" class="w-5 h-5 md:w-6 md:h-6 text-green-500 shrink-0" />
                            <p class="text-sm md:text-base text-green-800 dark:text-green-200 font-medium">
                                {{ $t('contact.form.success') }}
                            </p>
                        </div>
                    </div>

                    <!-- Error Message -->
                    <div v-if="submitError"
                        class="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                        <div class="flex items-center gap-2 md:gap-3">
                            <Icon name="mdi:alert-circle" class="w-5 h-5 md:w-6 md:h-6 text-red-500 shrink-0" />
                            <p class="text-sm md:text-base text-red-800 dark:text-red-200 font-medium">
                                {{ submitError }}
                            </p>
                        </div>
                    </div>

                    <div class="text-center mb-4 md:mb-6">
                        <p class="text-sm md:text-base lg:text-lg text-neutral-600 dark:text-neutral-300">{{
                            $t('contact.form.description') }}</p>
                    </div>

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
                                    'w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border text-sm md:text-base',
                                    errors.name
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-neutral-300 dark:border-neutral-600 focus:border-blue-500 focus:ring-blue-500'
                                ]" class="bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                                    :placeholder="$t('contact.form.namePlaceholder')" />
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
                                    'w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border text-sm md:text-base',
                                    errors.email
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-neutral-300 dark:border-neutral-600 focus:border-blue-500 focus:ring-blue-500'
                                ]" class="bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                                    placeholder="your@email.com" />
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
                                'w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border text-sm md:text-base',
                                errors.subject
                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                    : 'border-neutral-300 dark:border-neutral-600 focus:border-blue-500 focus:ring-blue-500'
                            ]" class="bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                                :placeholder="$t('contact.form.subjectPlaceholder')" />
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
                                'w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border resize-none text-sm md:text-base',
                                errors.message
                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                    : 'border-neutral-300 dark:border-neutral-600 focus:border-blue-500 focus:ring-blue-500'
                            ]" class="bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                                :placeholder="$t('contact.form.messagePlaceholder')"></textarea>
                            <p v-if="errors.message" class="text-xs md:text-sm text-red-600 dark:text-red-400">
                                {{ errors.message }}
                            </p>
                        </div>

                        <!-- Turnstile Widget and Submit Button -->
                        <div class="flex flex-col sm:flex-row items-center justify-end gap-4">
                            <!-- Turnstile Widget -->
                            <div v-if="runtimeConfig.public.turnstileSiteKey" class="flex flex-col items-center">
                                <FeaturesTurnstileWidget v-model="turnstileToken"
                                    :site-key="runtimeConfig.public.turnstileSiteKey" @verified="onTurnstileVerified"
                                    @expired="onTurnstileExpired" @error="onTurnstileError" ref="turnstileRef" />
                                <p v-if="showTurnstileError || errors.turnstile"
                                    class="text-xs md:text-sm text-red-600 dark:text-red-400 text-center mt-2">
                                    {{ errors.turnstile }}
                                </p>
                            </div>

                            <!-- Submit Button -->
                            <button type="submit" :disabled="isSubmitting" :class="[
                                'px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-sm md:text-base flex items-center gap-2 md:gap-3 transition-all duration-300',
                                isSubmitting
                                    ? 'bg-neutral-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl hover:-translate-y-1'
                            ]" class="text-white">
                                <Icon v-if="isSubmitting" name="mdi:refresh"
                                    class="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                                <Icon v-else name="mdi:send" class="w-4 h-4 md:w-5 md:h-5" />
                                {{ isSubmitting ? $t('contact.form.sending') : $t('contact.form.submit') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
