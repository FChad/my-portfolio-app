<script setup lang="ts">
const { t } = useI18n()

const interests = [
    { nameKey: 'about.interestsList.tech.title', subtitleKey: 'about.interestsList.tech.subtitle', icon: 'mdi:code-braces' },
    { nameKey: 'about.interestsList.family.title', subtitleKey: 'about.interestsList.family.subtitle', icon: 'mdi:home-heart' },
    { nameKey: 'about.interestsList.gaming.title', subtitleKey: 'about.interestsList.gaming.subtitle', icon: 'mdi:controller' },
    { nameKey: 'about.interestsList.friends.title', subtitleKey: 'about.interestsList.friends.subtitle', icon: 'mdi:account-group' }
] as const
</script>

<template>
    <div class="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">

        <!-- Left: Character illustration with headphones -->
        <div class="flex flex-col items-center select-none">
            <!-- Speech bubble above character -->
            <div
                class="relative bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-2xl px-5 py-3 shadow-md mb-4 min-w-50">
                <div class="flex items-center justify-center gap-2">
                    <Icon name="mdi:headphones" class="w-5 h-5 text-blue-500" />
                    <p class="text-base md:text-lg font-bold text-neutral-800 dark:text-neutral-100 text-center">
                        {{ t('about.interests.bubble') }}
                    </p>
                </div>
                <!-- Tail pointing down -->
                <div
                    class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white dark:bg-neutral-800 border-r border-b border-neutral-200 dark:border-neutral-700">
                </div>
            </div>

            <!-- Character SVG (relaxed pose with headphones, listening to music) -->
            <svg viewBox="0 0 220 340" class="w-40 h-auto md:w-48 lg:w-56" xmlns="http://www.w3.org/2000/svg">

                <!-- Left leg (crossed/relaxed) -->
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

                <!-- Left arm (relaxed, hanging down with slight bend) -->
                <path d="M72 170 C58 178, 50 196, 50 216 C50 228, 52 234, 54 236" stroke="#FBBF7C" stroke-width="20"
                    stroke-linecap="round" fill="none" />
                <circle cx="54" cy="234" r="10" fill="#FBBF7C" />

                <!-- Right arm (holding controller/phone up) -->
                <g>
                    <path d="M148 170 C162 174, 168 190, 166 206 C164 218, 160 224, 158 226" stroke="#FBBF7C"
                        stroke-width="20" stroke-linecap="round" fill="none" />
                    <circle cx="158" cy="224" r="10" fill="#FBBF7C" />

                    <!-- Game controller -->
                    <g transform="translate(140, 210)">
                        <rect x="0" y="0" width="36" height="20" rx="8" fill="#4B5563" />
                        <rect x="2" y="2" width="32" height="16" rx="6" fill="#374151" />
                        <!-- D-pad -->
                        <rect x="7" y="7" width="8" height="3" rx="1" fill="#6B7280" />
                        <rect x="9.5" y="4.5" width="3" height="8" rx="1" fill="#6B7280" />
                        <!-- Buttons -->
                        <circle cx="26" cy="7" r="2" fill="#3B82F6" />
                        <circle cx="30" cy="10" r="2" fill="#EF4444" />
                        <!-- Joysticks -->
                        <circle cx="14" cy="14" r="2.5" fill="#6B7280" />
                        <circle cx="24" cy="14" r="2.5" fill="#6B7280" />
                    </g>
                </g>

                <!-- Neck -->
                <rect x="98" y="132" width="24" height="20" rx="10" fill="#FBBF7C" />

                <!-- Head -->
                <ellipse cx="110" cy="96" rx="46" ry="48" fill="#FBBF7C" />
                <!-- Ears (hidden behind headphones) -->
                <ellipse cx="64" cy="98" rx="7" ry="11" fill="#FBBF7C" />
                <ellipse cx="156" cy="98" rx="7" ry="11" fill="#FBBF7C" />

                <!-- Hair -->
                <ellipse cx="110" cy="60" rx="44" ry="24" fill="#5C3A1E" />
                <ellipse cx="80" cy="68" rx="16" ry="20" fill="#5C3A1E" />
                <ellipse cx="140" cy="68" rx="16" ry="20" fill="#5C3A1E" />
                <ellipse cx="110" cy="50" rx="28" ry="14" fill="#6B4423" />
                <ellipse cx="90" cy="48" rx="12" ry="10" fill="#6B4423" transform="rotate(-12 90 48)" />
                <ellipse cx="130" cy="48" rx="12" ry="10" fill="#6B4423" transform="rotate(12 130 48)" />
                <ellipse cx="110" cy="42" rx="14" ry="7" fill="#7A5231" />

                <!-- Headband (same as language illustration) -->
                <rect x="64" y="66" width="92" height="11" rx="5.5" fill="#1E293B" />
                <circle cx="110" cy="71.5" r="4.5" fill="#D4A843" />
                <circle cx="92" cy="71.5" r="2.5" fill="#D4A843" opacity="0.6" />
                <circle cx="128" cy="71.5" r="2.5" fill="#D4A843" opacity="0.6" />
                <circle cx="78" cy="71.5" r="1.5" fill="#D4A843" opacity="0.4" />
                <circle cx="142" cy="71.5" r="1.5" fill="#D4A843" opacity="0.4" />

                <!-- Headphones -->
                <!-- Headband arc -->
                <path d="M58 82 C58 50, 82 32, 110 32 C138 32, 162 50, 162 82" stroke="#3B82F6" stroke-width="6"
                    fill="none" stroke-linecap="round" />
                <!-- Left ear cup -->
                <rect x="48" y="82" width="18" height="28" rx="8" fill="#3B82F6" />
                <rect x="50" y="86" width="14" height="20" rx="6" fill="#2563EB" />
                <rect x="53" y="90" width="8" height="12" rx="4" fill="#1D4ED8" />
                <!-- Right ear cup -->
                <rect x="154" y="82" width="18" height="28" rx="8" fill="#3B82F6" />
                <rect x="156" y="86" width="14" height="20" rx="6" fill="#2563EB" />
                <rect x="159" y="90" width="8" height="12" rx="4" fill="#1D4ED8" />

                <!-- Eyes (happy, slightly closed - vibing to music) -->
                <ellipse cx="92" cy="96" rx="7.5" ry="8.5" fill="white" />
                <ellipse cx="128" cy="96" rx="7.5" ry="8.5" fill="white" />
                <circle cx="93" cy="97" r="5" fill="#2D1B0E" />
                <circle cx="129" cy="97" r="5" fill="#2D1B0E" />
                <circle cx="94.5" cy="95" r="2" fill="white" />
                <circle cx="130.5" cy="95" r="2" fill="white" />
                <!-- Half-closed eyelids (relaxed vibing) -->
                <path d="M84 89 Q92 85 100 89 L100 93 Q92 90 84 93 Z" fill="#FBBF7C" />
                <path d="M120 89 Q128 85 136 89 L136 93 Q128 90 120 93 Z" fill="#FBBF7C" />

                <!-- Eyebrows (relaxed) -->
                <path d="M84 84 Q92 80 100 84" stroke="#5C3A1E" stroke-width="2.5" fill="none" stroke-linecap="round" />
                <path d="M120 84 Q128 80 136 84" stroke="#5C3A1E" stroke-width="2.5" fill="none"
                    stroke-linecap="round" />

                <!-- Nose -->
                <ellipse cx="110" cy="108" rx="4" ry="3.5" fill="#E8A86C" />

                <!-- Mouth (big happy smile) -->
                <path d="M93 118 Q110 136 127 118" stroke="#B5543A" stroke-width="2.5" fill="#FF8A80"
                    stroke-linecap="round" />
                <path d="M97 119 Q110 128 123 119" fill="white" />

                <!-- Music notes floating around (animated) -->
                <g class="music-notes">
                    <text x="36" y="72" font-size="14" fill="#3B82F6" opacity="0.7">&#9835;</text>
                    <text x="170" y="66" font-size="12" fill="#3B82F6" opacity="0.5">&#9834;</text>
                    <text x="30" y="56" font-size="10" fill="#3B82F6" opacity="0.4">&#9833;</text>
                </g>
            </svg>
        </div>

        <!-- Right: Interest cards (matching language/certification cards pattern) -->
        <div class="flex flex-col gap-3 md:gap-4">
            <UiCard v-for="interest in interests" :key="interest.icon">
                <div class="flex items-center gap-3 md:gap-4">
                    <!-- Icon box -->
                    <UiIconBox :icon="interest.icon" />
                    <div class="flex-1 min-w-0">
                        <h3 class="text-sm md:text-base lg:text-xl font-bold text-neutral-800 dark:text-white truncate">
                            {{ t(interest.nameKey) }}
                        </h3>
                        <span class="text-sm md:text-base text-neutral-500 dark:text-neutral-400">{{
                            t(interest.subtitleKey) }}</span>
                    </div>
                </div>
            </UiCard>
        </div>
    </div>
</template>

<style scoped>
.music-notes {
    animation: float-notes 3s ease-in-out infinite;
}

@keyframes float-notes {

    0%,
    100% {
        transform: translateY(0);
        opacity: 0.7;
    }

    50% {
        transform: translateY(-6px);
        opacity: 1;
    }
}
</style>
