<script setup lang="ts">
const currentYear = new Date().getFullYear()

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
</script>

<template>
    <!-- Footer -->
    <footer class="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative">
                <!-- Scroll to Top Button -->
                <button @click="scrollToTop"
                    class="absolute -top-2 right-0 w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                    aria-label="Scroll to top">
                    <Icon name="mdi:arrow-up" class="w-5 h-5" />
                </button>

                <!-- Brand Section -->
                <div>
                    <h3 class="title text-xl font-bold uppercase text-blue-600 dark:text-blue-400 mb-4">
                        Chad Feierstein
                    </h3>
                    <p class="text-base text-gray-600 dark:text-gray-400 mb-4">
                        {{ $t('footer.description') }}
                    </p>
                    <!-- Social Links -->
                    <div class="flex gap-3">
                        <NuxtLink to="https://github.com/FChad" external target="_blank"
                            class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-blue-500 text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white transition-all duration-300">
                            <Icon name="mdi:github" class="w-5 h-5" />
                        </NuxtLink>
                        <NuxtLink to="https://www.linkedin.com/in/chad-feierstein/" external target="_blank"
                            class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-blue-500 text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white transition-all duration-300">
                            <Icon name="mdi:linkedin" class="w-5 h-5" />
                        </NuxtLink>
                    </div>
                </div>

                <!-- Navigation Section -->
                <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white mb-4">{{ $t('footer.navigation') }}</h4>
                    <ul class="grid grid-cols-2 gap-x-8 gap-y-3">
                        <li>
                            <NuxtLinkLocale to="/"
                                class="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-2">
                                <Icon name="mdi:home" class="w-5 h-5" />
                                {{ $t('nav.home') }}
                            </NuxtLinkLocale>
                        </li>
                        <li>
                            <NuxtLinkLocale to="/about"
                                class="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-2">
                                <Icon name="mdi:account" class="w-5 h-5" />
                                {{ $t('nav.about') }}
                            </NuxtLinkLocale>
                        </li>
                        <li>
                            <NuxtLinkLocale to="/showcase"
                                class="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-2">
                                <Icon name="mdi:briefcase" class="w-5 h-5" />
                                {{ $t('nav.showcase') }}
                            </NuxtLinkLocale>
                        </li>
                        <li>
                            <NuxtLinkLocale to="/contact"
                                class="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-2">
                                <Icon name="mdi:email-outline" class="w-5 h-5" />
                                {{ $t('nav.contact') }}
                            </NuxtLinkLocale>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="pt-8 border-t border-gray-200 dark:border-gray-700">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-base text-gray-600 dark:text-gray-400 text-center md:text-left">
                        {{ $t('footer.copyright').replace('2025', currentYear.toString()) }}
                    </p>
                    <div class="flex items-center gap-6">
                        <a href="https://github.com/FChad/my-portfolio-app" target="_blank" rel="noopener noreferrer"
                            class="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
                            <Icon name="mdi:github" class="w-5 h-5" />
                            <span>Source Code</span>
                        </a>
                        <span class="text-base text-gray-600 dark:text-gray-400 flex items-center gap-1">
                            <Icon name="mdi:cloud" class="w-5 h-5" />
                            <span>Cloudflare</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
