<script setup lang="ts">
const { t } = useI18n()

const greetings = [
    { text: 'Moien!', flag: 'circle-flags:lu' },
    { text: 'Hallo!', flag: 'circle-flags:de' },
    { text: 'Hello!', flag: 'circle-flags:gb' },
    { text: 'Bonjour!', flag: 'circle-flags:fr' }
] as const

const languages = [
    { nameKey: 'about.languageNames.luxemburgish', flag: 'circle-flags:lu', level: 'C2', native: true, progress: 100 },
    { nameKey: 'about.languageNames.german', flag: 'circle-flags:de', level: 'C1', native: false, progress: 85 },
    { nameKey: 'about.languageNames.english', flag: 'circle-flags:gb', level: 'B2', native: false, progress: 70 },
    { nameKey: 'about.languageNames.french', flag: 'circle-flags:fr', level: 'B1', native: false, progress: 55 }
] as const

const currentGreeting = ref(0)
const isVisible = ref(true)

let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
    interval = setInterval(() => {
        isVisible.value = false
        setTimeout(() => {
            currentGreeting.value = (currentGreeting.value + 1) % greetings.length
            isVisible.value = true
        }, 300)
    }, 2500)
})

onUnmounted(() => {
    if (interval) clearInterval(interval)
})
</script>

<template>
    <div class="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">

        <!-- Left: Character illustration with speech bubble -->
        <div class="flex flex-col items-center select-none">
            <!-- Cycling speech bubble above character -->
            <div
                class="relative bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-2xl px-5 py-3 shadow-md mb-4 min-w-50">
                <div class="flex items-center justify-center gap-2 transition-opacity duration-300"
                    :class="isVisible ? 'opacity-100' : 'opacity-0'">
                    <Icon :name="greetings[currentGreeting].flag" class="w-5 h-5 rounded-full shrink-0" />
                    <p
                        class="text-sm md:text-base lg:text-lg font-bold text-neutral-800 dark:text-neutral-100 text-center whitespace-nowrap">
                        {{ greetings[currentGreeting].text }}
                    </p>
                </div>
                <!-- Tail pointing down -->
                <div
                    class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white dark:bg-neutral-800 border-r border-b border-neutral-200 dark:border-neutral-700">
                </div>
            </div>

            <!-- Character SVG -->
            <svg viewBox="0 0 220 340" class="w-40 h-auto md:w-48 lg:w-56" xmlns="http://www.w3.org/2000/svg">
                <!-- Left leg -->
                <rect x="82" y="244" width="20" height="56" rx="10" fill="#3B82F6" />
                <!-- Right leg -->
                <rect x="118" y="244" width="20" height="56" rx="10" fill="#3B82F6" />
                <!-- Left shoe -->
                <ellipse cx="92" cy="302" rx="15" ry="7" fill="#1E3A5F" />
                <!-- Right shoe -->
                <ellipse cx="128" cy="302" rx="15" ry="7" fill="#1E3A5F" />
                <!-- Body -->
                <path
                    d="M70 172 C70 158, 82 148, 110 148 C138 148, 150 158, 150 172 L150 248 C150 258, 142 264, 130 264 L90 264 C78 264, 70 258, 70 248 Z"
                    fill="#1E293B" />
                <!-- Shirt collar -->
                <path d="M96 152 L110 166 L124 152" fill="none" stroke="#334155" stroke-width="2"
                    stroke-linecap="round" />
                <!-- Left arm (resting) -->
                <path d="M72 170 C58 174, 48 190, 46 210 C44 224, 48 234, 52 234" stroke="#FBBF7C" stroke-width="20"
                    stroke-linecap="round" fill="none" />
                <circle cx="52" cy="232" r="10" fill="#FBBF7C" />
                <!-- Right arm (waving up) -->
                <g class="waving-arm" style="transform-origin: 148px 170px;">
                    <path d="M148 170 C162 166, 172 150, 178 130 C182 118, 180 108, 176 104" stroke="#FBBF7C"
                        stroke-width="20" stroke-linecap="round" fill="none" />
                    <ellipse cx="175" cy="102" rx="12" ry="13" fill="#FBBF7C" />
                    <path d="M164 106 C160 110, 156 108, 154 104" stroke="#FBBF7C" stroke-width="5"
                        stroke-linecap="round" fill="none" />
                    <line x1="168" y1="92" x2="164" y2="80" stroke="#FBBF7C" stroke-width="4.5"
                        stroke-linecap="round" />
                    <line x1="174" y1="90" x2="173" y2="77" stroke="#FBBF7C" stroke-width="4.5"
                        stroke-linecap="round" />
                    <line x1="180" y1="91" x2="181" y2="79" stroke="#FBBF7C" stroke-width="4.5"
                        stroke-linecap="round" />
                    <line x1="185" y1="94" x2="189" y2="83" stroke="#FBBF7C" stroke-width="4" stroke-linecap="round" />
                    <g class="wave-lines">
                        <line x1="194" y1="92" x2="204" y2="86" stroke="#3B82F6" stroke-width="2.5"
                            stroke-linecap="round" />
                        <line x1="196" y1="102" x2="208" y2="102" stroke="#3B82F6" stroke-width="2.5"
                            stroke-linecap="round" />
                        <line x1="194" y1="112" x2="204" y2="118" stroke="#3B82F6" stroke-width="2.5"
                            stroke-linecap="round" />
                    </g>
                </g>
                <!-- Neck -->
                <rect x="98" y="132" width="24" height="20" rx="10" fill="#FBBF7C" />
                <!-- Head -->
                <ellipse cx="110" cy="96" rx="46" ry="48" fill="#FBBF7C" />
                <!-- Ears -->
                <ellipse cx="64" cy="98" rx="7" ry="11" fill="#FBBF7C" />
                <ellipse cx="156" cy="98" rx="7" ry="11" fill="#FBBF7C" />
                <ellipse cx="64" cy="98" rx="4" ry="7" fill="#E8A86C" opacity="0.4" />
                <ellipse cx="156" cy="98" rx="4" ry="7" fill="#E8A86C" opacity="0.4" />
                <!-- Hair -->
                <ellipse cx="110" cy="60" rx="44" ry="24" fill="#5C3A1E" />
                <ellipse cx="80" cy="68" rx="16" ry="20" fill="#5C3A1E" />
                <ellipse cx="140" cy="68" rx="16" ry="20" fill="#5C3A1E" />
                <ellipse cx="110" cy="50" rx="28" ry="14" fill="#6B4423" />
                <ellipse cx="90" cy="48" rx="12" ry="10" fill="#6B4423" transform="rotate(-12 90 48)" />
                <ellipse cx="130" cy="48" rx="12" ry="10" fill="#6B4423" transform="rotate(12 130 48)" />
                <ellipse cx="110" cy="42" rx="14" ry="7" fill="#7A5231" />
                <!-- Headband -->
                <rect x="64" y="66" width="92" height="11" rx="5.5" fill="#1E293B" />
                <circle cx="110" cy="71.5" r="4.5" fill="#D4A843" />
                <circle cx="92" cy="71.5" r="2.5" fill="#D4A843" opacity="0.6" />
                <circle cx="128" cy="71.5" r="2.5" fill="#D4A843" opacity="0.6" />
                <circle cx="78" cy="71.5" r="1.5" fill="#D4A843" opacity="0.4" />
                <circle cx="142" cy="71.5" r="1.5" fill="#D4A843" opacity="0.4" />
                <!-- Eyes -->
                <ellipse cx="92" cy="96" rx="7.5" ry="8.5" fill="white" />
                <ellipse cx="128" cy="96" rx="7.5" ry="8.5" fill="white" />
                <circle cx="94" cy="97" r="5" fill="#2D1B0E" />
                <circle cx="130" cy="97" r="5" fill="#2D1B0E" />
                <circle cx="95.5" cy="95" r="2" fill="white" />
                <circle cx="131.5" cy="95" r="2" fill="white" />
                <!-- Eyebrows -->
                <path d="M83 85 Q92 79 101 85" stroke="#5C3A1E" stroke-width="2.5" fill="none" stroke-linecap="round" />
                <path d="M119 85 Q128 79 137 85" stroke="#5C3A1E" stroke-width="2.5" fill="none"
                    stroke-linecap="round" />
                <!-- Nose -->
                <ellipse cx="110" cy="108" rx="4" ry="3.5" fill="#E8A86C" />
                <!-- Mouth -->
                <path d="M93 118 Q110 136 127 118" stroke="#B5543A" stroke-width="2.5" fill="#FF8A80"
                    stroke-linecap="round" />
                <path d="M97 119 Q110 128 123 119" fill="white" />
            </svg>
        </div>

        <!-- Right: Language cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <UiCard v-for="lang in languages" :key="lang.flag">
                <div class="flex flex-col gap-2.5">
                    <!-- Flag + Level code -->
                    <div class="flex items-center justify-between">
                        <Icon :name="lang.flag" class="w-9 h-9 md:w-10 md:h-10" />
                        <span class="text-sm font-bold text-blue-600 dark:text-blue-400">{{ lang.level }}</span>
                    </div>
                    <!-- Name + Badge + Level label -->
                    <div class="flex flex-col gap-1">
                        <div class="flex items-center gap-1.5 flex-wrap">
                            <p class="text-base md:text-lg font-bold text-neutral-800 dark:text-white leading-tight">
                                {{ t(lang.nameKey) }}
                            </p>
                        </div>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400">
                            {{ t(`about.languages.levels.${lang.level}`) }}
                        </p>
                    </div>
                    <!-- Progress bar -->
                    <div class="h-1 w-full bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <div class="h-full bg-blue-500 rounded-full transition-all duration-700"
                            :style="{ width: `${lang.progress}%` }" />
                    </div>
                </div>
            </UiCard>
        </div>
    </div>
</template>

<style scoped>
.waving-arm {
    animation: wave 2.2s ease-in-out infinite;
}

.wave-lines {
    animation: wave-pulse 2.2s ease-in-out infinite;
}

@keyframes wave {
    0% {
        transform: rotate(0deg);
    }

    15% {
        transform: rotate(12deg);
    }

    30% {
        transform: rotate(-6deg);
    }

    45% {
        transform: rotate(10deg);
    }

    60% {
        transform: rotate(-4deg);
    }

    75% {
        transform: rotate(6deg);
    }

    100% {
        transform: rotate(0deg);
    }
}

@keyframes wave-pulse {

    0%,
    100% {
        opacity: 0.2;
    }

    30% {
        opacity: 0.7;
    }

    60% {
        opacity: 0.4;
    }
}
</style>
