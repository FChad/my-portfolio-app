<script setup lang="ts">
interface Props {
    variant?: 'coding' | 'robot' | 'chatbot' | 'portfolio'
    bubbleText?: string
}

withDefaults(defineProps<Props>(), {
    variant: 'coding',
    bubbleText: ''
})
</script>

<template>
    <!-- Browser variant: AI Chat Bot preview -->
    <div v-if="variant === 'chatbot'" class="relative">
        <ProjectsIllustrationsChatBotPreview />
    </div>

    <!-- Portfolio variant: Portfolio website preview -->
    <div v-else-if="variant === 'portfolio'" class="relative">
        <ProjectsIllustrationsPortfolioPreview />
    </div>

    <!-- Character illustration variants -->
    <div v-else class="flex flex-col items-center select-none">
        <!-- Speech bubble above character -->
        <div v-if="bubbleText"
            class="relative bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-2xl px-5 py-3 shadow-md mb-4 min-w-50">
            <div class="flex items-center justify-center gap-2">
                <Icon :name="variant === 'robot' ? 'mdi:robot-excited' : 'mdi:code-braces'" class="w-5 h-5 text-blue-500" />
                <p class="text-base md:text-lg font-bold text-neutral-800 dark:text-neutral-100 text-center">
                    {{ bubbleText }}
                </p>
            </div>
            <!-- Tail pointing down -->
            <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white dark:bg-neutral-800 border-r border-b border-neutral-200 dark:border-neutral-700"></div>
        </div>

        <!-- Coding variant: Character at laptop -->
        <svg v-if="variant === 'coding'" viewBox="0 0 280 340" class="w-48 h-auto md:w-56 lg:w-64" xmlns="http://www.w3.org/2000/svg">

            <!-- Desk -->
            <rect x="30" y="260" width="220" height="8" rx="4" fill="#D1D5DB" class="dark-desk" />
            <rect x="60" y="268" width="8" height="50" rx="2" fill="#9CA3AF" />
            <rect x="212" y="268" width="8" height="50" rx="2" fill="#9CA3AF" />
            <rect x="50" y="314" width="28" height="6" rx="3" fill="#9CA3AF" />
            <rect x="202" y="314" width="28" height="6" rx="3" fill="#9CA3AF" />

            <!-- Laptop base -->
            <rect x="80" y="240" width="120" height="22" rx="4" fill="#374151" />
            <rect x="82" y="242" width="116" height="18" rx="3" fill="#4B5563" />

            <!-- Laptop screen back -->
            <rect x="78" y="148" width="124" height="94" rx="6" fill="#1F2937" />

            <!-- Laptop screen -->
            <rect x="84" y="153" width="112" height="80" rx="3" fill="#0F172A" />

            <!-- Code lines on screen -->
            <g class="code-lines">
                <rect x="92" y="162" width="40" height="3" rx="1.5" fill="#3B82F6" opacity="0.8" />
                <rect x="92" y="170" width="60" height="3" rx="1.5" fill="#10B981" opacity="0.6" />
                <rect x="100" y="178" width="45" height="3" rx="1.5" fill="#F59E0B" opacity="0.7" />
                <rect x="100" y="186" width="55" height="3" rx="1.5" fill="#8B5CF6" opacity="0.6" />
                <rect x="92" y="194" width="30" height="3" rx="1.5" fill="#3B82F6" opacity="0.8" />
                <rect x="92" y="202" width="50" height="3" rx="1.5" fill="#EF4444" opacity="0.5" />
                <rect x="100" y="210" width="35" height="3" rx="1.5" fill="#10B981" opacity="0.7" />
                <rect x="92" y="218" width="25" height="3" rx="1.5" fill="#F59E0B" opacity="0.6" />
            </g>

            <!-- Cursor blink on screen -->
            <rect x="117" y="218" width="2" height="7" rx="1" fill="#3B82F6" class="cursor-blink" />

            <!-- Body (behind laptop) -->
            <path d="M110 110 C80 110, 68 125, 68 140 L68 200 C68 200, 68 210, 78 210 L78 180 C78 170, 80 160, 90 155"
                fill="#1E293B" />
            <path d="M170 110 C200 110, 212 125, 212 140 L212 200 C212 200, 212 210, 202 210 L202 180 C202 170, 200 160, 190 155"
                fill="#1E293B" />
            <!-- Body center -->
            <path d="M90 108 C90 98, 105 90, 140 90 C175 90, 190 98, 190 108 L190 155 L90 155 Z" fill="#1E293B" />
            <!-- Shirt collar -->
            <path d="M126 94 L140 108 L154 94" fill="none" stroke="#334155" stroke-width="2" stroke-linecap="round" />

            <!-- Left arm (reaching to keyboard) -->
            <path d="M90 120 C72 130, 60 155, 82 248" stroke="#FBBF7C" stroke-width="18" stroke-linecap="round" fill="none" />
            <circle cx="82" cy="246" r="9" fill="#FBBF7C" />

            <!-- Right arm (reaching to keyboard) -->
            <path d="M190 120 C208 130, 220 155, 198 248" stroke="#FBBF7C" stroke-width="18" stroke-linecap="round" fill="none" />
            <circle cx="198" cy="246" r="9" fill="#FBBF7C" />

            <!-- Neck -->
            <rect x="128" y="72" width="24" height="22" rx="10" fill="#FBBF7C" />

            <!-- Head -->
            <ellipse cx="140" cy="42" rx="42" ry="44" fill="#FBBF7C" />
            <!-- Ears -->
            <ellipse cx="98" cy="44" rx="6" ry="10" fill="#FBBF7C" />
            <ellipse cx="182" cy="44" rx="6" ry="10" fill="#FBBF7C" />
            <ellipse cx="98" cy="44" rx="3.5" ry="6" fill="#E8A86C" opacity="0.4" />
            <ellipse cx="182" cy="44" rx="3.5" ry="6" fill="#E8A86C" opacity="0.4" />

            <!-- Hair -->
            <ellipse cx="140" cy="10" rx="40" ry="22" fill="#5C3A1E" />
            <ellipse cx="112" cy="18" rx="14" ry="18" fill="#5C3A1E" />
            <ellipse cx="168" cy="18" rx="14" ry="18" fill="#5C3A1E" />
            <ellipse cx="140" cy="2" rx="26" ry="12" fill="#6B4423" />
            <ellipse cx="122" cy="0" rx="10" ry="9" fill="#6B4423" transform="rotate(-12 122 0)" />
            <ellipse cx="158" cy="0" rx="10" ry="9" fill="#6B4423" transform="rotate(12 158 0)" />
            <ellipse cx="140" cy="-6" rx="12" ry="6" fill="#7A5231" />

            <!-- Headband -->
            <rect x="98" y="16" width="84" height="10" rx="5" fill="#1E293B" />
            <circle cx="140" cy="21" r="4" fill="#D4A843" />
            <circle cx="124" cy="21" r="2.5" fill="#D4A843" opacity="0.6" />
            <circle cx="156" cy="21" r="2.5" fill="#D4A843" opacity="0.6" />
            <circle cx="110" cy="21" r="1.5" fill="#D4A843" opacity="0.4" />
            <circle cx="170" cy="21" r="1.5" fill="#D4A843" opacity="0.4" />

            <!-- Eyes (focused, looking at screen) -->
            <ellipse cx="124" cy="42" rx="7" ry="8" fill="white" />
            <ellipse cx="156" cy="42" rx="7" ry="8" fill="white" />
            <!-- Pupils looking down at laptop -->
            <circle cx="125" cy="46" r="4.5" fill="#2D1B0E" />
            <circle cx="157" cy="46" r="4.5" fill="#2D1B0E" />
            <circle cx="126.5" cy="44.5" r="1.8" fill="white" />
            <circle cx="158.5" cy="44.5" r="1.8" fill="white" />

            <!-- Eyebrows (concentrated) -->
            <path d="M116 34 Q124 30 132 34" stroke="#5C3A1E" stroke-width="2.5" fill="none" stroke-linecap="round" />
            <path d="M148 34 Q156 30 164 34" stroke="#5C3A1E" stroke-width="2.5" fill="none" stroke-linecap="round" />

            <!-- Nose -->
            <ellipse cx="140" cy="54" rx="3.5" ry="3" fill="#E8A86C" />

            <!-- Mouth (slight focused smile) -->
            <path d="M130 63 Q140 70 150 63" stroke="#B5543A" stroke-width="2" fill="none" stroke-linecap="round" />

            <!-- Floating code symbols -->
            <g class="float-symbols">
                <text x="40" y="140" font-size="16" font-family="monospace" fill="#3B82F6" opacity="0.4">&lt;/&gt;</text>
                <text x="220" y="130" font-size="14" font-family="monospace" fill="#10B981" opacity="0.3">{}</text>
                <text x="30" y="170" font-size="12" font-family="monospace" fill="#8B5CF6" opacity="0.3">( )</text>
            </g>
        </svg>

        <!-- Robot/AI variant: Character with robot companion -->
        <svg v-else viewBox="0 0 280 340" class="w-48 h-auto md:w-56 lg:w-64" xmlns="http://www.w3.org/2000/svg">

            <!-- Floor shadow -->
            <ellipse cx="140" cy="318" rx="90" ry="8" fill="#D1D5DB" opacity="0.3" />

            <!-- Left leg -->
            <rect x="112" y="254" width="18" height="50" rx="9" fill="#3B82F6" />
            <!-- Right leg -->
            <rect x="148" y="254" width="18" height="50" rx="9" fill="#3B82F6" />
            <!-- Left shoe -->
            <ellipse cx="121" cy="306" rx="13" ry="6" fill="#1E3A5F" />
            <!-- Right shoe -->
            <ellipse cx="157" cy="306" rx="13" ry="6" fill="#1E3A5F" />

            <!-- Body -->
            <path d="M100 180 C100 168, 110 158, 139 158 C168 158, 178 168, 178 180 L178 258 C178 266, 172 272, 162 272 L116 272 C106 272, 100 266, 100 258 Z" fill="#1E293B" />
            <!-- Shirt collar -->
            <path d="M126 162 L139 174 L152 162" fill="none" stroke="#334155" stroke-width="2" stroke-linecap="round" />

            <!-- Left arm (raised, presenting robot) -->
            <path d="M102 184 C88 186, 74 190, 62 196" stroke="#FBBF7C" stroke-width="18" stroke-linecap="round" fill="none" />
            <circle cx="62" cy="196" r="9" fill="#FBBF7C" />

            <!-- Right arm (relaxed) -->
            <path d="M176 184 C190 192, 198 210, 196 230" stroke="#FBBF7C" stroke-width="18" stroke-linecap="round" fill="none" />
            <circle cx="196" cy="228" r="9" fill="#FBBF7C" />

            <!-- Neck -->
            <rect x="127" y="142" width="24" height="20" rx="10" fill="#FBBF7C" />

            <!-- Head -->
            <ellipse cx="139" cy="106" rx="44" ry="46" fill="#FBBF7C" />
            <!-- Ears -->
            <ellipse cx="95" cy="108" rx="6" ry="10" fill="#FBBF7C" />
            <ellipse cx="183" cy="108" rx="6" ry="10" fill="#FBBF7C" />

            <!-- Hair -->
            <ellipse cx="139" cy="72" rx="42" ry="22" fill="#5C3A1E" />
            <ellipse cx="111" cy="80" rx="14" ry="18" fill="#5C3A1E" />
            <ellipse cx="167" cy="80" rx="14" ry="18" fill="#5C3A1E" />
            <ellipse cx="139" cy="62" rx="26" ry="12" fill="#6B4423" />
            <ellipse cx="121" cy="60" rx="10" ry="9" fill="#6B4423" transform="rotate(-12 121 60)" />
            <ellipse cx="157" cy="60" rx="10" ry="9" fill="#6B4423" transform="rotate(12 157 60)" />
            <ellipse cx="139" cy="55" rx="12" ry="6" fill="#7A5231" />

            <!-- Headband -->
            <rect x="95" y="78" width="88" height="10" rx="5" fill="#1E293B" />
            <circle cx="139" cy="83" r="4" fill="#D4A843" />
            <circle cx="123" cy="83" r="2.5" fill="#D4A843" opacity="0.6" />
            <circle cx="155" cy="83" r="2.5" fill="#D4A843" opacity="0.6" />

            <!-- Eyes (happy, looking at robot) -->
            <ellipse cx="123" cy="106" rx="7" ry="8" fill="white" />
            <ellipse cx="155" cy="106" rx="7" ry="8" fill="white" />
            <circle cx="121" cy="107" r="4.5" fill="#2D1B0E" />
            <circle cx="153" cy="107" r="4.5" fill="#2D1B0E" />
            <circle cx="122.5" cy="105.5" r="1.8" fill="white" />
            <circle cx="154.5" cy="105.5" r="1.8" fill="white" />

            <!-- Eyebrows -->
            <path d="M115 97 Q123 93 131 97" stroke="#5C3A1E" stroke-width="2.5" fill="none" stroke-linecap="round" />
            <path d="M147 97 Q155 93 163 97" stroke="#5C3A1E" stroke-width="2.5" fill="none" stroke-linecap="round" />

            <!-- Nose -->
            <ellipse cx="139" cy="118" rx="3.5" ry="3" fill="#E8A86C" />

            <!-- Mouth (big smile) -->
            <path d="M124 127 Q139 142 154 127" stroke="#B5543A" stroke-width="2.5" fill="#FF8A80" stroke-linecap="round" />
            <path d="M128 128 Q139 136 150 128" fill="white" />

            <!-- Small floating robot companion -->
            <g class="robot-float">
                <!-- Robot body -->
                <rect x="22" y="150" width="50" height="42" rx="10" fill="#3B82F6" />
                <rect x="26" y="154" width="42" height="34" rx="7" fill="#2563EB" />

                <!-- Robot face screen -->
                <rect x="30" y="158" width="34" height="22" rx="5" fill="#0F172A" />

                <!-- Robot eyes -->
                <circle cx="40" cy="167" r="4" fill="#3B82F6" />
                <circle cx="54" cy="167" r="4" fill="#3B82F6" />
                <circle cx="40" cy="167" r="2" fill="#93C5FD" />
                <circle cx="54" cy="167" r="2" fill="#93C5FD" />

                <!-- Robot mouth (smile) -->
                <path d="M39 174 Q47 179 55 174" stroke="#3B82F6" stroke-width="1.5" fill="none" stroke-linecap="round" />

                <!-- Robot antenna -->
                <line x1="47" y1="150" x2="47" y2="138" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" />
                <circle cx="47" cy="136" r="4" fill="#60A5FA" class="antenna-glow" />

                <!-- Robot arms -->
                <path d="M22 165 L12 172" stroke="#3B82F6" stroke-width="4" stroke-linecap="round" />
                <path d="M72 165 L82 158" stroke="#3B82F6" stroke-width="4" stroke-linecap="round" />
                <circle cx="12" cy="172" r="3" fill="#60A5FA" />
                <circle cx="82" cy="158" r="3" fill="#60A5FA" />

                <!-- Floating particles around robot -->
                <circle cx="18" cy="148" r="2" fill="#3B82F6" opacity="0.4" />
                <circle cx="78" cy="144" r="1.5" fill="#3B82F6" opacity="0.3" />
                <circle cx="10" cy="162" r="1.5" fill="#60A5FA" opacity="0.4" />
            </g>

            <!-- Chat bubbles floating -->
            <g class="chat-bubbles">
                <rect x="8" y="112" width="36" height="18" rx="8" fill="#E0E7FF" opacity="0.6" />
                <rect x="12" y="117" width="18" height="3" rx="1.5" fill="#3B82F6" opacity="0.4" />
                <rect x="12" y="122" width="12" height="3" rx="1.5" fill="#3B82F6" opacity="0.3" />
            </g>
        </svg>
    </div>
</template>

<style scoped>
.cursor-blink {
    animation: blink 1s step-end infinite;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

.float-symbols {
    animation: float-code 4s ease-in-out infinite;
}

@keyframes float-code {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
}

.code-lines rect {
    animation: code-type 3s ease-in-out infinite;
}

.code-lines rect:nth-child(odd) {
    animation-delay: 0.5s;
}

@keyframes code-type {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
}

.robot-float {
    animation: robot-hover 3s ease-in-out infinite;
}

@keyframes robot-hover {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
}

.antenna-glow {
    animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
    0%, 100% { opacity: 0.6; r: 4; }
    50% { opacity: 1; r: 5; }
}

.chat-bubbles {
    animation: chat-float 4s ease-in-out infinite;
}

@keyframes chat-float {
    0%, 100% { transform: translateY(0); opacity: 0.6; }
    50% { transform: translateY(-6px); opacity: 1; }
}
</style>
