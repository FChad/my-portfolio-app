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
        title: 'Email',
        value: 'chad.feierstein@gmail.com',
        icon: 'heroicons:envelope',
        href: 'mailto:chad.feierstein@gmail.com',
        color: 'blue'
    },
    {
        title: 'LinkedIn',
        value: 'LinkedIn Profil',
        icon: 'heroicons:briefcase',
        href: 'https://www.linkedin.com/in/chad-feierstein/',
        color: 'blue'
    },
    {
        title: 'GitHub',
        value: 'GitHub Profil',
        icon: 'heroicons:code-bracket',
        href: 'https://github.com/FChad',
        color: 'gray'
    }
]

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
    <main class="overflow-hidden">
        <!-- Hero Section -->
        <section
            class="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>

            <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h1 class="text-5xl md:text-6xl font-black mb-6">
                        <span class="uppercase block text-gray-700 dark:text-gray-300">
                            {{ $t('contact.title') }}
                        </span>
                    </h1>
                    <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        {{ $t('contact.subtitle') }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Contact Information Section -->
        <section class="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h2 class="text-4xl font-bold mb-6">{{ $t('contact.info.title') }}</h2>
                    <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {{ $t('contact.info.description') }}
                    </p>
                </div>

                <!-- Contact Methods Grid -->
                <div class="grid md:grid-cols-3 gap-6 mb-12">
                    <div v-for="method in contactMethods" :key="method.title"
                        class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                        <a :href="method.href" target="_blank" rel="noopener noreferrer" class="block group">
                            <div :class="[
                                'w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300',
                                method.color === 'blue' ? 'bg-blue-500 group-hover:bg-blue-600' : 'bg-gray-500 group-hover:bg-gray-600'
                            ]">
                                <Icon :name="method.icon" class="w-8 h-8 text-white" />
                            </div>
                            <h3 class="font-semibold text-lg mb-2">{{ method.title }}</h3>
                            <p
                                class="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-all">
                                {{ method.value }}
                            </p>
                            <Icon name="heroicons:arrow-top-right-on-square"
                                class="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 mx-auto mt-2 transition-colors" />
                        </a>
                    </div>
                </div>

                <!-- Availability Info -->
                <div
                    class="max-w-2xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl text-center">
                    <h3 class="text-xl font-bold mb-3 flex items-center justify-center gap-3">
                        <Icon name="heroicons:clock" class="w-6 h-6 text-blue-500" />
                        {{ $t('contact.availability.title') }}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300">{{ $t('contact.availability.description') }}</p>
                </div>
            </div>
        </section>

        <!-- Contact Form Section -->
        <section class="py-20">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
                    <!-- Success Message -->
                    <div v-if="isSubmitted"
                        class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                        <div class="flex items-center gap-3">
                            <Icon name="heroicons:check-circle" class="w-6 h-6 text-green-500" />
                            <p class="text-green-800 dark:text-green-200 font-medium">
                                {{ $t('contact.form.success') }}
                            </p>
                        </div>
                    </div>

                    <div class="text-center mb-8">
                        <h2 class="text-3xl font-bold mb-4">{{ $t('contact.form.title') }}</h2>
                        <p class="text-gray-600 dark:text-gray-300">{{ $t('contact.form.description') }}</p>
                    </div>

                    <form @submit.prevent="submitForm" class="space-y-6">
                        <!-- Name and Email Fields -->
                        <div class="grid md:grid-cols-2 gap-6">
                            <!-- Name Field -->
                            <div>
                                <label for="name"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {{ $t('contact.form.name') }} *
                                </label>
                                <input v-model="form.name" type="text" id="name" :class="[
                                    'w-full px-4 py-3 rounded-xl border transition-colors duration-300',
                                    errors.name
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                                ]" class="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                    :placeholder="$t('contact.form.namePlaceholder')" />
                                <p v-if="errors.name" class="mt-2 text-sm text-red-600 dark:text-red-400">
                                    {{ errors.name }}
                                </p>
                            </div>

                            <!-- Email Field -->
                            <div>
                                <label for="email"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {{ $t('contact.form.email') }} *
                                </label>
                                <input v-model="form.email" type="email" id="email" :class="[
                                    'w-full px-4 py-3 rounded-xl border transition-colors duration-300',
                                    errors.email
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                                ]" class="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                    :placeholder="$t('contact.form.emailPlaceholder')" />
                                <p v-if="errors.email" class="mt-2 text-sm text-red-600 dark:text-red-400">
                                    {{ errors.email }}
                                </p>
                            </div>
                        </div>

                        <!-- Subject Field -->
                        <div>
                            <label for="subject"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {{ $t('contact.form.subject') }} *
                            </label>
                            <input v-model="form.subject" type="text" id="subject" :class="[
                                'w-full px-4 py-3 rounded-xl border transition-colors duration-300',
                                errors.subject
                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                            ]" class="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                :placeholder="$t('contact.form.subjectPlaceholder')" />
                            <p v-if="errors.subject" class="mt-2 text-sm text-red-600 dark:text-red-400">
                                {{ errors.subject }}
                            </p>
                        </div>

                        <!-- Message Field -->
                        <div>
                            <label for="message"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {{ $t('contact.form.message') }} *
                            </label>
                            <textarea v-model="form.message" id="message" rows="6" :class="[
                                'w-full px-4 py-3 rounded-xl border transition-colors duration-300 resize-none',
                                errors.message
                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                            ]" class="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                :placeholder="$t('contact.form.messagePlaceholder')"></textarea>
                            <p v-if="errors.message" class="mt-2 text-sm text-red-600 dark:text-red-400">
                                {{ errors.message }}
                            </p>
                        </div>

                        <!-- Submit Button -->
                        <div class="flex justify-end">
                            <button type="submit" :disabled="isSubmitting" :class="[
                                'px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3',
                                isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                            ]" class="text-white">
                                <Icon v-if="isSubmitting" name="heroicons:arrow-path" class="w-5 h-5 animate-spin" />
                                <Icon v-else name="heroicons:paper-airplane" class="w-5 h-5" />
                                {{ isSubmitting ? $t('contact.form.sending') : $t('contact.form.submit') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 bg-blue-600 text-white">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-4xl font-bold mb-6">{{ $t('contact.cta.title') }}</h2>
                <p class="text-xl text-blue-100 mb-8">
                    {{ $t('contact.cta.subtitle') }}
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <NuxtLinkLocale to="/showcase"
                        class="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                        {{ $t('contact.cta.showcase') }}
                        <Icon name="heroicons:eye" class="w-5 h-5" />
                    </NuxtLinkLocale>
                    <NuxtLinkLocale to="/about"
                        class="inline-flex items-center gap-3 px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl">
                        {{ $t('contact.cta.about') }}
                        <Icon name="heroicons:user" class="w-5 h-5" />
                    </NuxtLinkLocale>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
.bg-grid-pattern {
    background-image: radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 24px 24px;
}
</style>