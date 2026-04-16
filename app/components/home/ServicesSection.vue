<script setup lang="ts">
const services = computed(() => [
    {
        key: 'webdev',
        icon: 'mdi:web',
        features: ['spa', 'ssr', 'pwa']
    },
    {
        key: 'cloud',
        icon: 'mdi:cloud',
        features: ['aws', 'azure', 'gcp']
    },
    {
        key: 'itadmin',
        icon: 'mdi:server',
        features: ['linux', 'networks', 'security']
    }
])
</script>

<template>
    <section class="py-12 md:py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center flex flex-col gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
                    {{ $t('home.services.title') }}
                </h2>
                <p
                    class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto px-2">
                    {{ $t('home.services.subtitle') }}
                </p>
            </div>

            <!-- Services Grid -->
            <div class="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                <UiCard v-for="service in services" :key="service.key">
                    <div class="flex flex-col gap-4 md:gap-5 lg:gap-6 h-full">
                        <div class="flex items-center gap-3 md:gap-4">
                            <UiIconBox :icon="service.icon" />
                            <h3 class="text-lg md:text-xl lg:text-2xl font-bold text-neutral-800 dark:text-white">
                                {{ $t(`home.services.${service.key}.title`) }}
                            </h3>
                        </div>
                        <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed flex-1">
                            {{ $t(`home.services.${service.key}.description`) }}
                        </p>
                        <ul class="flex flex-col gap-2 md:gap-3">
                            <li v-for="feature in service.features" :key="feature"
                                class="flex items-center gap-2 md:gap-3 text-neutral-600 dark:text-neutral-400">
                                <Icon name="mdi:check-circle" class="w-4 h-4 md:w-5 md:h-5 text-blue-500 shrink-0" />
                                <span class="font-medium text-sm md:text-base">{{
                                    $t(`home.services.${service.key}.features.${feature}`)
                                    }}</span>
                            </li>
                        </ul>
                    </div>
                </UiCard>
            </div>
        </div>
    </section>
</template>
