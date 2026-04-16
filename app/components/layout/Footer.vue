<script setup lang="ts">
import { SOCIAL_LINKS } from '~/utils/constants'

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
</script>

<template>
    <!-- Footer -->
    <footer class="border-t border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-800/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative">
                <!-- Scroll to Top Button -->
                <div class="absolute -top-2 right-0">
                    <UiButton variant="primary" square @click="scrollToTop" aria-label="Scroll to top">
                        <Icon name="mdi:arrow-up" class="w-5 h-5" />
                    </UiButton>
                </div>

                <!-- Brand Section -->
                <div>
                    <h3 class="title text-xl font-bold uppercase text-blue-600 dark:text-blue-400 mb-4">
                        Chad Feierstein
                    </h3>
                    <p class="text-base text-neutral-600 dark:text-neutral-400 mb-4">
                        {{ $t('footer.description') }}
                    </p>
                    <!-- Social Links -->
                    <div class="flex gap-3">
                        <UiButton variant="secondary" square :href="SOCIAL_LINKS.github" external aria-label="GitHub">
                            <Icon name="mdi:github" class="w-5 h-5" />
                        </UiButton>
                        <UiButton variant="secondary" square :href="SOCIAL_LINKS.linkedin" external
                            aria-label="LinkedIn">
                            <Icon name="mdi:linkedin" class="w-5 h-5" />
                        </UiButton>
                    </div>
                </div>

                <!-- Navigation Section -->
                <div>
                    <h4 class="font-semibold text-neutral-900 dark:text-white mb-4">{{ $t('footer.navigation') }}</h4>
                    <ul class="grid grid-cols-2 gap-x-8 gap-y-3">
                        <li>
                            <NuxtLinkLocale to="/"
                                class="text-base text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                {{ $t('nav.home') }}
                            </NuxtLinkLocale>
                        </li>
                        <li>
                            <NuxtLinkLocale to="/about"
                                class="text-base text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                {{ $t('nav.about') }}
                            </NuxtLinkLocale>
                        </li>
                        <li>
                            <NuxtLinkLocale to="/showcase"
                                class="text-base text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                {{ $t('nav.showcase') }}
                            </NuxtLinkLocale>
                        </li>
                        <li>
                            <NuxtLinkLocale to="/contact"
                                class="text-base text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                {{ $t('nav.contact') }}
                            </NuxtLinkLocale>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="pt-8 border-t border-neutral-200 dark:border-neutral-700">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-base text-neutral-600 dark:text-neutral-400 text-center md:text-left">
                        © {{ new Date().getFullYear() }} Chad Feierstein. {{ $t('footer.copyright') }}
                    </p>
                    <div class="flex flex-wrap justify-center md:justify-end items-center gap-4 sm:gap-6">
                        <NuxtLinkLocale to="/privacy"
                            class="text-base text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
                            <Icon name="mdi:shield-lock" class="w-5 h-5" />
                            <span>{{ $t('footer.privacy') }}</span>
                        </NuxtLinkLocale>
                        <a :href="SOCIAL_LINKS.repository" target="_blank" rel="noopener noreferrer"
                            class="text-base text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
                            <Icon name="mdi:github" class="w-5 h-5" />
                            <span>{{ $t('footer.sourceCode') }}</span>
                        </a>
                        <span class="text-base text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
                            <Icon name="mdi:cloud" class="w-5 h-5" />
                            <span>Cloudflare</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
