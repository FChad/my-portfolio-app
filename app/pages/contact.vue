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
        color: 'bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600',
        descriptionKey: 'contact.methods.github.description',
        isExternal: true
    },
    {
        titleKey: 'contact.methods.email.title',
        icon: 'mdi:email',
        href: '#contact-form',
        color: 'bg-red-500 hover:bg-red-600',
        descriptionKey: 'contact.methods.email.description',
        isExternal: false
    }
])

// Scroll to contact form function
const scrollToContactForm = () => {
    const element = document.querySelector('#contact-form') as HTMLElement
    if (element) {
        const elementPosition = element.offsetTop;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        })
    }
}

// Form validation
const validateForm = () => {
    errors.value = {}
    submitError.value = ''

    // Name validation
    if (!form.value.name.trim()) {
        errors.value.name = t('contact.form.errors.nameRequired')
    } else if (form.value.name.length < 2 || form.value.name.length > 100) {
        errors.value.name = t('contact.form.errors.nameLength')
    }

    // Email validation
    if (!form.value.email.trim()) {
        errors.value.email = t('contact.form.errors.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email) || form.value.email.length > 254) {
        errors.value.email = t('contact.form.errors.emailInvalid')
    }

    // Subject validation
    if (!form.value.subject.trim()) {
        errors.value.subject = t('contact.form.errors.subjectRequired')
    } else if (form.value.subject.length < 5 || form.value.subject.length > 200) {
        errors.value.subject = t('contact.form.errors.subjectLength')
    }

    // Message validation
    if (!form.value.message.trim()) {
        errors.value.message = t('contact.form.errors.messageRequired')
    } else if (form.value.message.length < 10) {
        errors.value.message = t('contact.form.errors.messageMinLength')
    } else if (form.value.message.length > 2000) {
        errors.value.message = t('contact.form.errors.messageMaxLength')
    }

    // Turnstile validation (check if token exists and is a string)
    if (!turnstileToken.value || typeof turnstileToken.value !== 'string' || !turnstileToken.value.trim()) {
        errors.value.turnstile = t('contact.form.errors.captchaRequired')
        showTurnstileError.value = true
    } else {
        showTurnstileError.value = false
    }

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
        // Handle different error types
        if (error?.statusCode === 429) {
            submitError.value = t('contact.form.errors.rateLimited')
        } else if (error?.statusCode === 400) {
            // Check if it's a CAPTCHA error
            if (error?.statusMessage?.toLowerCase().includes('captcha') ||
                error?.statusMessage?.toLowerCase().includes('verification')) {
                submitError.value = t('contact.form.errors.captchaFailed')
                turnstileRef.value?.reset()
                turnstileToken.value = ''
            } else {
                submitError.value = t('contact.form.errors.invalidData')
            }
        } else if (error?.statusCode === 500) {
            submitError.value = t('contact.form.errors.serverError')
        } else {
            submitError.value = error?.statusMessage || t('contact.form.errors.serverError')
        }
    } finally {
        isSubmitting.value = false
    }
}

// Turnstile event handlers
const onTurnstileVerified = (token: string) => {
    turnstileToken.value = token
    showTurnstileError.value = false
    submitError.value = ''
    // Clear turnstile error from errors object
    if (errors.value.turnstile) {
        delete errors.value.turnstile
    }
}

const onTurnstileExpired = () => {
    turnstileToken.value = ''
    showTurnstileError.value = true
    submitError.value = t('contact.form.errors.captchaExpired')
}

const onTurnstileError = (errorMessage: string) => {
    turnstileToken.value = ''
    showTurnstileError.value = true
    submitError.value = t('contact.form.errors.captchaError')
}

definePageMeta({
    layout: 'default'
})
</script>

<template>
    <!-- Single Compact Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden py-12 sm:py-16 md:py-20">
        <!-- Animated gradient background -->
        <div
            class="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        </div>

        <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div class="space-y-8 md:space-y-12">
                <!-- Header -->
                <div class="text-center space-y-4">
                    <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 dark:text-white">
                        {{ $t('contact.title') }}
                    </h1>
                    <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        {{ $t('contact.subtitle') }}
                    </p>
                </div>

                <!-- Contact Methods Grid -->
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <div v-for="method in contactMethods" :key="method.titleKey"
                        class="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

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
                                        class="font-black text-lg md:text-xl text-gray-800 dark:text-white flex items-center justify-center gap-2">
                                        {{ $t(method.titleKey) }}
                                        <Icon name="mdi:external-link"
                                            class="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                                    </h3>
                                    <p class="text-sm md:text-base text-gray-600 dark:text-gray-300">
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
                                        class="font-black text-lg md:text-xl text-gray-800 dark:text-white flex items-center justify-center gap-2">
                                        {{ $t(method.titleKey) }}
                                        <Icon name="mdi:arrow-down"
                                            class="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                                    </h3>
                                    <p class="text-sm md:text-base text-gray-600 dark:text-gray-300">
                                        {{ $t(method.descriptionKey) }}
                                    </p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- Contact Form -->
                <div id="contact-form"
                    class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <h2
                        class="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 dark:text-white text-center mb-6 md:mb-8">
                        {{ $t('contact.form.title') }}
                    </h2>
                    <!-- Success Message -->
                    <div v-if="isSubmitted"
                        class="mb-4 md:mb-6 p-3 md:p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                        <div class="flex items-center gap-2 md:gap-3">
                            <Icon name="mdi:check-circle" class="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0" />
                            <p class="text-sm md:text-base text-green-800 dark:text-green-200 font-medium">
                                {{ $t('contact.form.success') }}
                            </p>
                        </div>
                    </div>

                    <!-- Error Message -->
                    <div v-if="submitError"
                        class="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                        <div class="flex items-center gap-2 md:gap-3">
                            <Icon name="mdi:alert-circle" class="w-5 h-5 md:w-6 md:h-6 text-red-500 flex-shrink-0" />
                            <p class="text-sm md:text-base text-red-800 dark:text-red-200 font-medium">
                                {{ submitError }}
                            </p>
                        </div>
                    </div>

                    <div class="text-center mb-4 md:mb-6">
                        <p class="text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300">{{
                            $t('contact.form.description') }}</p>
                    </div>

                    <form @submit.prevent="submitForm" class="flex flex-col gap-4 md:gap-6">
                        <!-- Name and Email Fields -->
                        <div class="grid sm:grid-cols-2 gap-4 md:gap-6">
                            <!-- Name Field -->
                            <div class="flex flex-col gap-1.5 md:gap-2">
                                <label for="name"
                                    class="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {{ $t('contact.form.name') }} *
                                </label>
                                <input v-model="form.name" type="text" id="name" :class="[
                                    'w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border text-sm md:text-base',
                                    errors.name
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                                ]" class="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                    :placeholder="$t('contact.form.namePlaceholder')" />
                                <p v-if="errors.name" class="text-xs md:text-sm text-red-600 dark:text-red-400">
                                    {{ errors.name }}
                                </p>
                            </div>

                            <!-- Email Field -->
                            <div class="flex flex-col gap-1.5 md:gap-2">
                                <label for="email"
                                    class="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {{ $t('contact.form.email') }} *
                                </label>
                                <input v-model="form.email" type="email" id="email" :class="[
                                    'w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border text-sm md:text-base',
                                    errors.email
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                                ]" class="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                    placeholder="your@email.com" />
                                <p v-if="errors.email" class="text-xs md:text-sm text-red-600 dark:text-red-400">
                                    {{ errors.email }}
                                </p>
                            </div>
                        </div>

                        <!-- Subject Field -->
                        <div class="flex flex-col gap-1.5 md:gap-2">
                            <label for="subject"
                                class="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                                {{ $t('contact.form.subject') }} *
                            </label>
                            <input v-model="form.subject" type="text" id="subject" :class="[
                                'w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border text-sm md:text-base',
                                errors.subject
                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                            ]" class="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                :placeholder="$t('contact.form.subjectPlaceholder')" />
                            <p v-if="errors.subject" class="text-xs md:text-sm text-red-600 dark:text-red-400">
                                {{ errors.subject }}
                            </p>
                        </div>

                        <!-- Message Field -->
                        <div class="flex flex-col gap-1.5 md:gap-2">
                            <label for="message"
                                class="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                                {{ $t('contact.form.message') }} *
                            </label>
                            <textarea v-model="form.message" id="message" rows="5" :class="[
                                'w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border resize-none text-sm md:text-base',
                                errors.message
                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                            ]" class="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
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
                                    ? 'bg-gray-400 cursor-not-allowed'
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
