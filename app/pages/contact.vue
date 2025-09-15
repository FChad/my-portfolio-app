<script setup lang="ts">
const { t } = useI18n()

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

    if (!form.value.name.trim()) {
        errors.value.name = 'Name ist erforderlich'
    }

    if (!form.value.email.trim()) {
        errors.value.email = 'E-Mail ist erforderlich'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        errors.value.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
    }

    if (!form.value.subject.trim()) {
        errors.value.subject = 'Betreff ist erforderlich'
    }

    if (!form.value.message.trim()) {
        errors.value.message = 'Nachricht ist erforderlich'
    } else if (form.value.message.length < 10) {
        errors.value.message = 'Nachricht muss mindestens 10 Zeichen lang sein'
    }

    return Object.keys(errors.value).length === 0
}

// Submit form
const submitForm = async () => {
    if (!validateForm()) return

    isSubmitting.value = true

    try {
        // Hier würde normalerweise eine API-Anfrage stehen
        // Für Demo-Zwecke simulieren wir nur eine Verzögerung
        await new Promise(resolve => setTimeout(resolve, 2000))

        isSubmitted.value = true

        // Form zurücksetzen
        form.value = {
            name: '',
            email: '',
            subject: '',
            message: ''
        }
    } catch (error) {
        console.error('Fehler beim Senden der Nachricht:', error)
    } finally {
        isSubmitting.value = false
    }
}

// Reset success message after 5 seconds
watch(isSubmitted, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            isSubmitted.value = false
        }, 5000)
    }
})
</script>

<template>
    <!-- Hero Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:gap-6">
        <h1 class="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ $t('contact.title') }}
        </h1>

        <!-- Introduction -->
        <div class="max-w-4xl mx-auto text-center">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {{ $t('contact.subtitle') }}
            </p>
        </div>
    </section>

    <!-- Contact Methods Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-12">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ $t('contact.methods.title') || 'Kontaktmöglichkeiten' }}
        </h2>

        <div class="grid md:grid-cols-3 gap-6">
            <div v-for="method in contactMethods" :key="method.title"
                class="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-500">

                <!-- External links -->
                <NuxtLink v-if="method.isExternal" :to="method.href" external target="_blank" class="block">
                    <div class="flex flex-col items-center gap-4 text-center">
                        <!-- Icon Container -->
                        <div :class="[
                            'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg',
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
                                    class="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
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
                            'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg',
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
                                    class="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
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
    <section id="contact-form" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-12">
        <h2 class="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 text-center">
            {{ $t('contact.form.title') }}
        </h2>

        <div class="max-w-4xl mx-auto">
            <div
                class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
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
                                'w-full px-4 py-3 rounded-xl border transition-colors duration-300',
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
                                'w-full px-4 py-3 rounded-xl border transition-colors duration-300',
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
                            'w-full px-4 py-3 rounded-xl border transition-colors duration-300',
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
                            'w-full px-4 py-3 rounded-xl border transition-colors duration-300 resize-none',
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
                            'px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3',
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
        </div>
    </section>
</template>