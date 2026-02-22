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
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-800 dark:text-white">
                    {{ $t('home.services.title') }}
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto px-2">
                    {{ $t('home.services.subtitle') }}
                </p>
            </div>

            <!-- Services Grid -->
            <div class="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                <div v-for="service in services" :key="service.key"
                    class="group relative bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div class="flex flex-col gap-4 md:gap-5 lg:gap-6 h-full">
                        <div class="flex items-center gap-3 md:gap-4">
                            <div
                                class="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 bg-blue-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                                <Icon :name="service.icon" class="w-6 h-6 md:w-6.5 md:h-6.5 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <h3 class="text-lg md:text-xl lg:text-2xl font-black text-neutral-800 dark:text-white">
                                {{ $t(`home.services.${service.key}.title`) }}
                            </h3>
                        </div>
                        <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed flex-1">
                            {{ $t(`home.services.${service.key}.description`) }}
                        </p>
                        <ul class="flex flex-col gap-2 md:gap-3">
                            <li v-for="feature in service.features" :key="feature"
                                class="flex items-center gap-2 md:gap-3 text-neutral-600 dark:text-neutral-400">
                                <Icon name="mdi:check-circle"
                                    class="w-4 h-4 md:w-5 md:h-5 text-blue-500 shrink-0" />
                                <span class="font-medium text-sm md:text-base">{{
                                    $t(`home.services.${service.key}.features.${feature}`)
                                    }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
