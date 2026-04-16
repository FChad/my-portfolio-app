<script setup lang="ts">
const { t } = useI18n()

interface Certification {
    title: string
    year: string
    description: string
    icon: string
}

defineProps<{
    certifications: Certification[]
}>()
</script>

<template>
    <div class="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">

        <!-- Character illustration holding diploma -->
        <div class="flex flex-col items-center select-none lg:order-2">
            <!-- Speech bubble above character -->
            <div
                class="relative bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-2xl px-5 py-3 shadow-md mb-4 min-w-50">
                <div class="flex items-center justify-center gap-2">
                    <Icon name="mdi:certificate" class="w-5 h-5 text-blue-500" />
                    <p class="text-base md:text-lg font-bold text-neutral-800 dark:text-neutral-100 text-center">
                        {{ certifications.length }} {{ t('about.certifications.title') }}
                    </p>
                </div>
                <!-- Tail pointing down -->
                <div
                    class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white dark:bg-neutral-800 border-r border-b border-neutral-200 dark:border-neutral-700">
                </div>
            </div>

            <!-- Character SVG (same base as LanguageIllustration, with graduation cap + diploma) -->
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

                <!-- Yellow certificate document (held in front of body, between both hands) -->
                <g transform="translate(78, 192)">
                    <!-- Paper -->
                    <rect x="0" y="0" width="64" height="50" rx="3" fill="#FEF3C7" stroke="#F59E0B"
                        stroke-width="1.5" />
                    <!-- Text lines -->
                    <line x1="8" y1="10" x2="56" y2="10" stroke="#FCD34D" stroke-width="2" />
                    <line x1="8" y1="16" x2="50" y2="16" stroke="#FCD34D" stroke-width="2" />
                    <line x1="8" y1="22" x2="54" y2="22" stroke="#FCD34D" stroke-width="2" />
                    <line x1="8" y1="28" x2="48" y2="28" stroke="#FCD34D" stroke-width="2" />
                    <!-- Gold seal/stamp -->
                    <circle cx="46" cy="40" r="6" fill="#F59E0B" opacity="0.85" />
                    <circle cx="46" cy="40" r="3.5" fill="#FDE68A" opacity="0.6" />
                    <!-- Ribbon from seal -->
                    <path d="M43 45 L40 54 M49 45 L52 54" stroke="#D97706" stroke-width="1.5" stroke-linecap="round"
                        fill="none" />
                </g>

                <!-- Left arm (bent inward, holding certificate from left) -->
                <path d="M72 170 C60 178, 56 194, 68 210 C74 218, 78 220, 80 218" stroke="#FBBF7C" stroke-width="20"
                    stroke-linecap="round" fill="none" />
                <circle cx="80" cy="216" r="10" fill="#FBBF7C" />

                <!-- Right arm (bent inward, holding certificate from right) -->
                <path d="M148 170 C160 178, 164 194, 152 210 C146 218, 142 220, 140 218" stroke="#FBBF7C"
                    stroke-width="20" stroke-linecap="round" fill="none" />
                <circle cx="140" cy="216" r="10" fill="#FBBF7C" />

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

                <!-- Graduation cap (sits on top of the head) -->
                <g>
                    <!-- Mortarboard flat top -->
                    <polygon points="58,42 110,26 162,42 110,58" fill="#1E293B" />
                    <polygon points="66,42 110,30 154,42 110,54" fill="#334155" />
                    <!-- Cap skull part (wraps around top of head) -->
                    <path
                        d="M76 48 C76 48, 88 58, 110 58 C132 58, 144 48, 144 48 L144 64 C144 64, 132 68, 110 68 C88 68, 76 64, 76 64 Z"
                        fill="#1E293B" />
                    <!-- Tassel button -->
                    <circle cx="110" cy="30" r="3.5" fill="#D4A843" />
                    <!-- Tassel string -->
                    <path d="M110 30 C116 30, 150 24, 160 36" stroke="#D4A843" stroke-width="2" fill="none"
                        stroke-linecap="round" />
                    <!-- Tassel end -->
                    <g class="tassel-swing">
                        <line x1="160" y1="36" x2="157" y2="48" stroke="#D4A843" stroke-width="1.8"
                            stroke-linecap="round" />
                        <line x1="160" y1="36" x2="160" y2="49" stroke="#D4A843" stroke-width="1.8"
                            stroke-linecap="round" />
                        <line x1="160" y1="36" x2="163" y2="48" stroke="#D4A843" stroke-width="1.8"
                            stroke-linecap="round" />
                    </g>
                </g>

                <!-- Eyes (looking down at certificate) -->
                <ellipse cx="92" cy="96" rx="7.5" ry="8.5" fill="white" />
                <ellipse cx="128" cy="96" rx="7.5" ry="8.5" fill="white" />
                <!-- Pupils shifted down -->
                <circle cx="93" cy="101" r="5" fill="#2D1B0E" />
                <circle cx="129" cy="101" r="5" fill="#2D1B0E" />
                <!-- Highlights -->
                <circle cx="94.5" cy="99" r="2" fill="white" />
                <circle cx="130.5" cy="99" r="2" fill="white" />
                <!-- Half-closed eyelids (looking down) -->
                <path d="M84 89 Q92 85 100 89 L100 93 Q92 89 84 93 Z" fill="#FBBF7C" />
                <path d="M120 89 Q128 85 136 89 L136 93 Q128 89 120 93 Z" fill="#FBBF7C" />

                <!-- Eyebrows (relaxed, slightly lowered) -->
                <path d="M84 84 Q92 80 100 84" stroke="#5C3A1E" stroke-width="2.5" fill="none" stroke-linecap="round" />
                <path d="M120 84 Q128 80 136 84" stroke="#5C3A1E" stroke-width="2.5" fill="none"
                    stroke-linecap="round" />

                <!-- Nose -->
                <ellipse cx="110" cy="108" rx="4" ry="3.5" fill="#E8A86C" />

                <!-- Mouth (gentle proud smile) -->
                <path d="M96 120 Q110 130 124 120" stroke="#B5543A" stroke-width="2.5" fill="none"
                    stroke-linecap="round" />
            </svg>
        </div>

        <!-- Certificate cards -->
        <div class="flex flex-col gap-3 md:gap-4 lg:order-1">
            <UiCard v-for="cert in certifications" :key="cert.title">
                <div class="flex gap-2 flex-wrap">
                    <h3 class="text-sm md:text-base lg:text-xl font-bold text-neutral-800 dark:text-white">
                        {{ cert.title }}
                    </h3>
                    <UiBadge variant="neutral" size="md">{{ cert.year }}</UiBadge>
                </div>
                <p class="text-sm md:text-base text-neutral-500 dark:text-neutral-400 mt-1">{{ cert.description }}</p>
            </UiCard>
        </div>
    </div>
</template>

<style scoped>
/* Tassel swing */
.tassel-swing {
    animation: tassel 3s ease-in-out infinite;
    transform-origin: 160px 36px;
}

@keyframes tassel {

    0%,
    100% {
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(5deg);
    }

    75% {
        transform: rotate(-5deg);
    }
}
</style>
