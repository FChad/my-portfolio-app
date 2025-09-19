<script setup lang="ts">
const { t, locale } = useI18n()

// Form state
const form = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
})

// Form validation and submission states
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const submitError = ref<string>('')
const errors = ref<Record<string, string>>({})

// Contact methods
const contactMethods = [
    {
        title: 'LinkedIn',
        icon: 'mdi:linkedin',
        href: 'https://www.linkedin.com/in/chad-feierstein/',
        color: 'bg-[#0077B5] hover:bg-[#005885]',
        description: 'Berufliches Netzwerk',
        isExternal: true
    },
    {
        title: 'GitHub',
        icon: 'mdi:github',
        href: 'https://github.com/FChad',
        color: 'bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600',
        description: 'Code Repository',
        isExternal: true
    },
    {
        title: 'Email',
        icon: 'mdi:email',
        href: '#contact-form',
        color: 'bg-red-500 hover:bg-red-600',
        description: 'Direkte Kontaktaufnahme',
        isExternal: false
    }
]

// Scroll to contact form function
const scrollToContactForm = () => {
    const element = document.querySelector('#contact-form') as HTMLElement
    if (element) {
        const elementPosition = element.offsetTop - 65 - 10 // Account for navbar height and extra padding
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

    return Object.keys(errors.value).length === 0
}

// Submit form
const submitForm = async () => {
    if (!validateForm()) return

    isSubmitting.value = true
    submitError.value = ''

    try {
        const response = await $fetch<{ success: boolean; message: string; id?: string }>('/api/contact', {
            method: 'POST',
            body: {
                ...form.value,
                locale: locale.value
            }
        })

        if (response.success) {
            isSubmitted.value = true
            
            // Form zurücksetzen
            form.value = {
                name: '',
                email: '',
                subject: '',
                message: ''
            }
            
            // Auto-hide success message after 10 seconds
            setTimeout(() => {
                isSubmitted.value = false
            }, 10000)
        }
    } catch (error: any) {
        console.error('Error submitting contact form:', error)
        
        // Handle different error types
        if (error?.statusCode === 429) {
            submitError.value = t('contact.form.errors.rateLimited')
        } else if (error?.statusCode === 400) {
            submitError.value = t('contact.form.errors.invalidData')
        } else {
            submitError.value = t('contact.form.errors.serverError')
        }
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6 w-full">
        <h1 class="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ $t('contact.title') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg text-center max-w-4xl mx-auto">
            {{ $t('contact.subtitle') }}
        </p>
    </section>

    <!-- Contact Methods Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-12 w-full">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ $t('contact.methods.title') || 'Kontaktmöglichkeiten' }}
        </h2>

        <div class="grid md:grid-cols-3 gap-6">
            <div v-for="method in contactMethods" :key="method.title"
                class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all">

                <!-- External links -->
                <NuxtLink v-if="method.isExternal" :to="method.href" external target="_blank" class="block">
                    <div class="flex flex-col items-center gap-4 text-center">
                        <!-- Icon Container -->
                        <div :class="[
                            'w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-lg',
                            method.color
                        ]">
                            <Icon :name="method.icon" class="w-8 h-8 text-white" />
                        </div>

                        <!-- Content -->
                        <div class="flex flex-col gap-2">
                            <h3
                                class="font-bold text-xl text-gray-800 dark:text-white flex items-center justify-center gap-2">
                                {{ method.title }}
                                <Icon name="mdi:external-link"
                                    class="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            </h3>
                            <p class="text-gray-600 dark:text-gray-300">
                                {{ method.description }}
                            </p>
                        </div>
                    </div>
                </NuxtLink>

                <!-- Internal scroll action (Email) -->
                <button v-else @click="scrollToContactForm" class="block w-full">
                    <div class="flex flex-col items-center gap-4 text-center">
                        <!-- Icon Container -->
                        <div :class="[
                            'w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-lg',
                            method.color
                        ]">
                            <Icon :name="method.icon" class="w-8 h-8 text-white" />
                        </div>

                        <!-- Content -->
                        <div class="flex flex-col gap-2">
                            <h3
                                class="font-bold text-xl text-gray-800 dark:text-white flex items-center justify-center gap-2">
                                {{ method.title }}
                                <Icon name="mdi:arrow-down"
                                    class="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            </h3>
                            <p class="text-gray-600 dark:text-gray-300">
                                {{ method.description }}
                            </p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </section>

    <!-- Contact Form Section -->
    <section id="contact-form" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-12 w-full">
        <div class="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-md hover:shadow-lg transition-all">
            <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center mb-8">
                {{ $t('contact.form.title') }}
            </h2>
            <!-- Success Message -->
            <div v-if="isSubmitted"
                class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                <div class="flex items-center gap-3">
                    <Icon name="mdi:check-circle" class="w-6 h-6 text-green-500" />
                    <p class="text-green-800 dark:text-green-200 font-medium">
                        {{ $t('contact.form.success') }}
                    </p>
                </div>
            </div>

            <!-- Error Message -->
            <div v-if="submitError"
                class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <div class="flex items-center gap-3">
                    <Icon name="mdi:alert-circle" class="w-6 h-6 text-red-500" />
                    <p class="text-red-800 dark:text-red-200 font-medium">
                        {{ submitError }}
                    </p>
                </div>
            </div>

            <div class="text-center mb-6">
                <p class="text-gray-600 dark:text-gray-300 text-lg">{{ $t('contact.form.description') }}</p>
            </div>

            <form @submit.prevent="submitForm" class="flex flex-col gap-6">
                <!-- Name and Email Fields -->
                <div class="grid md:grid-cols-2 gap-6">
                    <!-- Name Field -->
                    <div class="flex flex-col gap-2">
                        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {{ $t('contact.form.name') }} *
                        </label>
                        <input v-model="form.name" type="text" id="name" :class="[
                            'w-full px-4 py-3 rounded-xl border transition-colors',
                            errors.name
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                        ]" class="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            :placeholder="$t('contact.form.namePlaceholder')" />
                        <p v-if="errors.name" class="text-sm text-red-600 dark:text-red-400">
                            {{ errors.name }}
                        </p>
                    </div>

                    <!-- Email Field -->
                    <div class="flex flex-col gap-2">
                        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {{ $t('contact.form.email') }} *
                        </label>
                        <input v-model="form.email" type="email" id="email" :class="[
                            'w-full px-4 py-3 rounded-xl border transition-colors',
                            errors.email
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                        ]" class="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            placeholder="your@email.com" />
                        <p v-if="errors.email" class="text-sm text-red-600 dark:text-red-400">
                            {{ errors.email }}
                        </p>
                    </div>
                </div>

                <!-- Subject Field -->
                <div class="flex flex-col gap-2">
                    <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {{ $t('contact.form.subject') }} *
                    </label>
                    <input v-model="form.subject" type="text" id="subject" :class="[
                        'w-full px-4 py-3 rounded-xl border transition-colors',
                        errors.subject
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                    ]" class="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        :placeholder="$t('contact.form.subjectPlaceholder')" />
                    <p v-if="errors.subject" class="text-sm text-red-600 dark:text-red-400">
                        {{ errors.subject }}
                    </p>
                </div>

                <!-- Message Field -->
                <div class="flex flex-col gap-2">
                    <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {{ $t('contact.form.message') }} *
                    </label>
                    <textarea v-model="form.message" id="message" rows="6" :class="[
                        'w-full px-4 py-3 rounded-xl border transition-colors resize-none',
                        errors.message
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                    ]" class="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        :placeholder="$t('contact.form.messagePlaceholder')"></textarea>
                    <p v-if="errors.message" class="text-sm text-red-600 dark:text-red-400">
                        {{ errors.message }}
                    </p>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-center">
                    <button type="submit" :disabled="isSubmitting" :class="[
                        'px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-3',
                        isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    ]" class="text-white">
                        <Icon v-if="isSubmitting" name="mdi:refresh" class="w-5 h-5 animate-spin" />
                        <Icon v-else name="mdi:send" class="w-5 h-5" />
                        {{ isSubmitting ? $t('contact.form.sending') : $t('contact.form.submit') }}
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>
