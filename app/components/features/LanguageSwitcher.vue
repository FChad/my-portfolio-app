<script setup>
const { locale, locales } = useI18n()

// Verfügbare Sprachen (ohne die aktuelle)
const availableLocales = computed(() => {
    return locales.value.filter(i => i.code !== locale.value)
})

// Reactive state für Dropdown
const isOpen = ref(false)

// Flag mapping für Circle Flags
const flagMap = {
    'en': 'circle-flags:us',
    'de': 'circle-flags:de',
    'fr': 'circle-flags:fr',
    'lb': 'circle-flags:lu'
}

// Aktuelle Sprache Details
const currentLocale = computed(() => {
    return locales.value.find(l => l.code === locale.value)
})

// Flag für Locale Code
const getFlag = (localeCode) => {
    return flagMap[localeCode] || 'circle-flags:un'
}

// Dropdown öffnen/schließen
const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

// Dropdown schließen
const closeDropdown = () => {
    isOpen.value = false
}

// Click außerhalb schließt Dropdown
onMounted(() => {
    document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
    document.removeEventListener('click', closeDropdown)
})
</script>

<template>
    <div class="relative">
        <!-- Dropdown Button -->
        <button @click.stop="toggleDropdown"
            class="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800"
            :aria-expanded="isOpen" aria-haspopup="true">
            <Icon :name="getFlag(locale)" class="w-5 h-5" />

            <Icon name="mdi:chevron-down" class="w-4 h-4 text-gray-700 dark:text-gray-300 transition-transform"
                :class="{ 'rotate-180': isOpen }" />
        </button>

        <!-- Dropdown Menu -->
        <div v-show="isOpen"
            class="absolute top-full right-0 mt-1 flex flex-col gap-1 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-[60] p-2">
            <SwitchLocalePathLink v-for="localeOption in availableLocales" :key="localeOption.code"
                :locale="localeOption.code" @click="closeDropdown"
                class="flex items-center gap-3 w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md no-underline">
                <Icon :name="getFlag(localeOption.code)" class="w-5 h-5" />
                <span>{{ localeOption.name }}</span>
            </SwitchLocalePathLink>
        </div>

        <!-- Overlay zum Schließen -->
        <div v-if="isOpen" @click="closeDropdown" class="fixed inset-0 z-[55]" />
    </div>
</template>
