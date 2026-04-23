<script setup lang="ts">
/**
 * AnimatedLandscape
 * ------------------
 * Pure-SVG/CSS landscape background with day/night modes driven by the
 * global `.dark` class. No JS animation loop, no canvas — all motion is
 * handled by GPU-friendly CSS keyframes on a handful of elements.
 *
 * Scales via `preserveAspectRatio="xMidYMid slice"` so it always fills
 * its container (mobile portrait → desktop widescreen) without distortion.
 */

interface Props {
    /** Additional classes for the wrapper (e.g. z-index, opacity). */
    wrapperClass?: string
}

withDefaults(defineProps<Props>(), {
    wrapperClass: 'z-0'
})

// Deterministic star positions — computed once, no reactivity needed.
// Keeping this small (20 stars) avoids cluttering the DOM while still
// giving a rich night-sky feel. Positions are hand-tuned to cluster
// in the upper portion of the viewBox.
const stars = [
    { cx: 120, cy: 90, r: 1.4, delay: 0 },
    { cx: 240, cy: 160, r: 1.0, delay: 1.2 },
    { cx: 360, cy: 70, r: 1.6, delay: 2.8 },
    { cx: 480, cy: 200, r: 1.1, delay: 0.6 },
    { cx: 600, cy: 120, r: 1.3, delay: 3.4 },
    { cx: 720, cy: 250, r: 0.9, delay: 1.8 },
    { cx: 880, cy: 80, r: 1.5, delay: 2.2 },
    { cx: 1020, cy: 180, r: 1.2, delay: 0.4 },
    { cx: 1160, cy: 110, r: 1.0, delay: 3.0 },
    { cx: 1320, cy: 220, r: 1.4, delay: 1.0 },
    { cx: 1480, cy: 70, r: 1.1, delay: 2.6 },
    { cx: 1620, cy: 170, r: 1.3, delay: 0.8 },
    { cx: 1780, cy: 100, r: 1.5, delay: 3.2 },
    { cx: 1860, cy: 240, r: 1.0, delay: 1.4 },
    { cx: 80, cy: 300, r: 0.9, delay: 2.4 },
    { cx: 540, cy: 340, r: 1.1, delay: 0.2 },
    { cx: 980, cy: 310, r: 1.2, delay: 3.6 },
    { cx: 1440, cy: 330, r: 1.0, delay: 1.6 },
    { cx: 300, cy: 260, r: 1.3, delay: 2.0 },
    { cx: 1700, cy: 290, r: 1.2, delay: 3.8 }
] as const
</script>

<template>
    <div class="landscape-wrapper absolute inset-0 overflow-hidden" :class="wrapperClass" aria-hidden="true">
        <svg class="landscape-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg">

            <defs>
                <!-- Sky gradients (day + night). Both always rendered;
                     CSS opacity toggles which one is visible per theme. -->
                <linearGradient id="sky-day" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#c7e1f5" />
                    <stop offset="55%" stop-color="#e5efde" />
                    <stop offset="100%" stop-color="#fde9cf" />
                </linearGradient>

                <linearGradient id="sky-night" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#0a1028" />
                    <stop offset="60%" stop-color="#131e47" />
                    <stop offset="100%" stop-color="#1d2a5b" />
                </linearGradient>

                <!-- Radial glow around the celestial body -->
                <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#fde68a" stop-opacity="0.85" />
                    <stop offset="45%" stop-color="#fbbf24" stop-opacity="0.25" />
                    <stop offset="100%" stop-color="#fbbf24" stop-opacity="0" />
                </radialGradient>

                <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#dbeafe" stop-opacity="0.55" />
                    <stop offset="50%" stop-color="#93c5fd" stop-opacity="0.15" />
                    <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
                </radialGradient>

                <!-- Mountain gradients — gives depth vs flat silhouettes -->
                <linearGradient id="mountain-far-day" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#93a8bf" />
                    <stop offset="100%" stop-color="#b7c3d2" />
                </linearGradient>
                <linearGradient id="mountain-far-night" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#1e2a52" />
                    <stop offset="100%" stop-color="#2a3869" />
                </linearGradient>

                <linearGradient id="mountain-mid-day" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#6b83a0" />
                    <stop offset="100%" stop-color="#8096b0" />
                </linearGradient>
                <linearGradient id="mountain-mid-night" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#141e40" />
                    <stop offset="100%" stop-color="#1c2950" />
                </linearGradient>

                <linearGradient id="hills-day" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#4a6075" />
                    <stop offset="100%" stop-color="#5f7691" />
                </linearGradient>
                <linearGradient id="hills-night" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#0c1330" />
                    <stop offset="100%" stop-color="#131c3f" />
                </linearGradient>

                <!-- Soft mist above the far mountains for atmospheric depth -->
                <linearGradient id="mist-day" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0.35" />
                </linearGradient>
                <linearGradient id="mist-night" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#3b82f6" stop-opacity="0" />
                    <stop offset="100%" stop-color="#1e3a8a" stop-opacity="0.25" />
                </linearGradient>

                <!-- Cloud shape reused twice with different transforms -->
                <symbol id="cloud" viewBox="0 0 200 60" overflow="visible">
                    <ellipse cx="50" cy="40" rx="50" ry="18" />
                    <ellipse cx="95" cy="28" rx="40" ry="22" />
                    <ellipse cx="140" cy="38" rx="45" ry="18" />
                    <ellipse cx="170" cy="42" rx="28" ry="14" />
                </symbol>
            </defs>

            <!-- ============ SKY ============ -->
            <rect class="sky sky-day" width="1920" height="1080" fill="url(#sky-day)" />
            <rect class="sky sky-night" width="1920" height="1080" fill="url(#sky-night)" />

            <!-- ============ STARS (night only) ============ -->
            <g class="stars">
                <circle v-for="(s, i) in stars" :key="i" :cx="s.cx" :cy="s.cy" :r="s.r" fill="#f8fafc"
                    :style="{ animationDelay: `${s.delay}s` }" />
            </g>

            <!-- Shooting star — subtle, periodic. Single path, GPU-transformed. -->
            <g class="shooting-star">
                <line x1="0" y1="0" x2="120" y2="40" stroke="#f8fafc" stroke-width="1.5" stroke-linecap="round"
                    opacity="0.8" />
                <line x1="0" y1="0" x2="80" y2="27" stroke="#dbeafe" stroke-width="2.5" stroke-linecap="round"
                    opacity="0.4" />
            </g>

            <!-- ============ CELESTIAL BODY ============ -->
            <!-- Sun -->
            <g class="sun celestial">
                <circle cx="1480" cy="240" r="180" fill="url(#sun-glow)" class="celestial-glow" />
                <circle cx="1480" cy="240" r="62" fill="#fde68a" />
                <circle cx="1480" cy="240" r="56" fill="#fcd34d" />
            </g>

            <!-- Moon -->
            <g class="moon celestial">
                <circle cx="1480" cy="240" r="190" fill="url(#moon-glow)" class="celestial-glow" />
                <circle cx="1480" cy="240" r="58" fill="#f1f5f9" />
                <!-- Craters for character -->
                <circle cx="1465" cy="228" r="7" fill="#cbd5e1" opacity="0.55" />
                <circle cx="1495" cy="250" r="5" fill="#cbd5e1" opacity="0.55" />
                <circle cx="1474" cy="258" r="4" fill="#cbd5e1" opacity="0.45" />
                <circle cx="1500" cy="230" r="3" fill="#cbd5e1" opacity="0.5" />
            </g>

            <!-- ============ CLOUDS (day only) ============ -->
            <g class="clouds" fill="#ffffff" opacity="0.85">
                <use href="#cloud" class="cloud cloud-1" x="-200" y="180" width="260" height="70" />
                <use href="#cloud" class="cloud cloud-2" x="-200" y="340" width="200" height="55" />
                <use href="#cloud" class="cloud cloud-3" x="-200" y="110" width="170" height="48" />
            </g>

            <!-- ============ ATMOSPHERIC MIST ============ -->
            <rect class="mist mist-day" x="0" y="600" width="1920" height="220" fill="url(#mist-day)" />
            <rect class="mist mist-night" x="0" y="600" width="1920" height="220" fill="url(#mist-night)" />

            <!-- ============ FAR MOUNTAINS ============ -->
            <path class="mountain-far mountain-far-day"
                d="M0,720 L160,560 L280,640 L420,500 L560,600 L720,470 L880,580 L1040,490 L1200,600 L1360,520 L1520,610 L1680,530 L1840,620 L1920,580 L1920,1080 L0,1080 Z"
                fill="url(#mountain-far-day)" />
            <path class="mountain-far mountain-far-night"
                d="M0,720 L160,560 L280,640 L420,500 L560,600 L720,470 L880,580 L1040,490 L1200,600 L1360,520 L1520,610 L1680,530 L1840,620 L1920,580 L1920,1080 L0,1080 Z"
                fill="url(#mountain-far-night)" />

            <!-- ============ MID MOUNTAINS ============ -->
            <path class="mountain-mid mountain-mid-day"
                d="M0,820 L120,720 L260,780 L400,660 L540,750 L700,640 L860,740 L1040,680 L1220,760 L1400,690 L1580,770 L1760,700 L1920,780 L1920,1080 L0,1080 Z"
                fill="url(#mountain-mid-day)" />
            <path class="mountain-mid mountain-mid-night"
                d="M0,820 L120,720 L260,780 L400,660 L540,750 L700,640 L860,740 L1040,680 L1220,760 L1400,690 L1580,770 L1760,700 L1920,780 L1920,1080 L0,1080 Z"
                fill="url(#mountain-mid-night)" />

            <!-- ============ HILLS (near) ============ -->
            <path class="hills hills-day"
                d="M0,920 C240,860 480,900 720,880 C960,860 1200,910 1440,880 C1640,860 1820,900 1920,890 L1920,1080 L0,1080 Z"
                fill="url(#hills-day)" />
            <path class="hills hills-night"
                d="M0,920 C240,860 480,900 720,880 C960,860 1200,910 1440,880 C1640,860 1820,900 1920,890 L1920,1080 L0,1080 Z"
                fill="url(#hills-night)" />

            <!-- ============ TREE SILHOUETTES ============ -->
            <g class="trees trees-day" fill="#1e293b">
                <!-- Pine tree helper: triangular layered conifers -->
                <g transform="translate(140, 900)">
                    <path d="M0,0 L-28,-30 L-14,-30 L-20,-55 L-8,-55 L0,-80 L8,-55 L20,-55 L14,-30 L28,-30 Z" />
                    <rect x="-4" y="0" width="8" height="14" />
                </g>
                <g transform="translate(260, 910) scale(0.85)">
                    <path d="M0,0 L-28,-30 L-14,-30 L-20,-55 L-8,-55 L0,-80 L8,-55 L20,-55 L14,-30 L28,-30 Z" />
                    <rect x="-4" y="0" width="8" height="14" />
                </g>
                <g transform="translate(1640, 905) scale(1.1)">
                    <path d="M0,0 L-28,-30 L-14,-30 L-20,-55 L-8,-55 L0,-80 L8,-55 L20,-55 L14,-30 L28,-30 Z" />
                    <rect x="-4" y="0" width="8" height="14" />
                </g>
                <g transform="translate(1760, 912) scale(0.9)">
                    <path d="M0,0 L-28,-30 L-14,-30 L-20,-55 L-8,-55 L0,-80 L8,-55 L20,-55 L14,-30 L28,-30 Z" />
                    <rect x="-4" y="0" width="8" height="14" />
                </g>
                <!-- Smaller shrubs scattered -->
                <ellipse cx="520" cy="912" rx="26" ry="14" />
                <ellipse cx="880" cy="918" rx="20" ry="10" />
                <ellipse cx="1200" cy="910" rx="32" ry="16" />
            </g>

            <g class="trees trees-night" fill="#020617">
                <g transform="translate(140, 900)">
                    <path d="M0,0 L-28,-30 L-14,-30 L-20,-55 L-8,-55 L0,-80 L8,-55 L20,-55 L14,-30 L28,-30 Z" />
                    <rect x="-4" y="0" width="8" height="14" />
                </g>
                <g transform="translate(260, 910) scale(0.85)">
                    <path d="M0,0 L-28,-30 L-14,-30 L-20,-55 L-8,-55 L0,-80 L8,-55 L20,-55 L14,-30 L28,-30 Z" />
                    <rect x="-4" y="0" width="8" height="14" />
                </g>
                <g transform="translate(1640, 905) scale(1.1)">
                    <path d="M0,0 L-28,-30 L-14,-30 L-20,-55 L-8,-55 L0,-80 L8,-55 L20,-55 L14,-30 L28,-30 Z" />
                    <rect x="-4" y="0" width="8" height="14" />
                </g>
                <g transform="translate(1760, 912) scale(0.9)">
                    <path d="M0,0 L-28,-30 L-14,-30 L-20,-55 L-8,-55 L0,-80 L8,-55 L20,-55 L14,-30 L28,-30 Z" />
                    <rect x="-4" y="0" width="8" height="14" />
                </g>
                <ellipse cx="520" cy="912" rx="26" ry="14" />
                <ellipse cx="880" cy="918" rx="20" ry="10" />
                <ellipse cx="1200" cy="910" rx="32" ry="16" />
            </g>
        </svg>
    </div>
</template>

<style scoped>
.landscape-wrapper {
    /* Promote the SVG to its own compositor layer for smoother animations */
    isolation: isolate;
    transform: translateZ(0);
}

.landscape-svg {
    width: 100%;
    height: 100%;
    display: block;
}

/* ---------------------------------------------------------
   Theme switching — all day/night elements coexist in the
   DOM; we simply fade one set out and the other in when
   the `.dark` class flips. This lets Nuxt color-mode drive
   the whole scene with zero re-render cost.
   --------------------------------------------------------- */
.sky,
.mist,
.mountain-far,
.mountain-mid,
.hills,
.trees,
.celestial,
.stars,
.shooting-star,
.clouds {
    transition: opacity 600ms ease-in-out;
}

/* Day is the default (light mode). Night elements hidden. */
.sky-day,
.mist-day,
.mountain-far-day,
.mountain-mid-day,
.hills-day,
.trees-day,
.sun,
.clouds {
    opacity: 1;
}

.sky-night,
.mist-night,
.mountain-far-night,
.mountain-mid-night,
.hills-night,
.trees-night,
.moon,
.stars,
.shooting-star {
    opacity: 0;
}

/* Flip the scene in dark mode. The `:where()` keeps specificity
   low so the transitions above still apply. */
:where(.dark) .sky-day,
:where(.dark) .mist-day,
:where(.dark) .mountain-far-day,
:where(.dark) .mountain-mid-day,
:where(.dark) .hills-day,
:where(.dark) .trees-day,
:where(.dark) .sun,
:where(.dark) .clouds {
    opacity: 0;
}

:where(.dark) .sky-night,
:where(.dark) .mist-night,
:where(.dark) .mountain-far-night,
:where(.dark) .mountain-mid-night,
:where(.dark) .hills-night,
:where(.dark) .trees-night,
:where(.dark) .moon {
    opacity: 1;
}

:where(.dark) .stars {
    opacity: 1;
}

/* ---------------------------------------------------------
   Animations — kept minimal. Only opacity / transform
   (both compositor-only properties). No layout thrash.
   --------------------------------------------------------- */

/* Subtle sun/moon glow pulse */
.celestial-glow {
    transform-box: fill-box;
    transform-origin: center;
    animation: celestial-pulse 6s ease-in-out infinite;
    will-change: transform, opacity;
}

@keyframes celestial-pulse {

    0%,
    100% {
        transform: scale(1);
        opacity: 1;
    }

    50% {
        transform: scale(1.08);
        opacity: 0.85;
    }
}

/* Star twinkle — staggered via inline animation-delay */
.stars circle {
    animation: star-twinkle 4s ease-in-out infinite;
    transform-box: fill-box;
    transform-origin: center;
}

@keyframes star-twinkle {

    0%,
    100% {
        opacity: 0.3;
    }

    50% {
        opacity: 1;
    }
}

/* Clouds drift left → right. Translate only, no repaint. */
.cloud {
    will-change: transform;
}

.cloud-1 {
    animation: cloud-drift 80s linear infinite;
}

.cloud-2 {
    animation: cloud-drift 120s linear infinite;
    animation-delay: -40s;
}

.cloud-3 {
    animation: cloud-drift 100s linear infinite;
    animation-delay: -70s;
}

@keyframes cloud-drift {
    from {
        transform: translateX(0);
    }

    to {
        /* 2120 = viewBox width (1920) + cloud width buffer so it exits cleanly */
        transform: translateX(2120px);
    }
}

/* Shooting star — dramatic but rare. Long delay between runs. */
.shooting-star {
    transform-origin: 0 0;
    animation: shoot 14s ease-out infinite;
    will-change: transform, opacity;
}

@keyframes shoot {

    0%,
    90%,
    100% {
        transform: translate(200px, 60px) rotate(0deg);
        opacity: 0;
    }

    91% {
        transform: translate(200px, 60px) rotate(0deg);
        opacity: 0;
    }

    92% {
        opacity: 1;
    }

    99% {
        transform: translate(900px, 360px) rotate(0deg);
        opacity: 0;
    }
}

/* Shooting star only visible at night */
:where(.dark) .shooting-star {
    opacity: 1;
}

/* ---------------------------------------------------------
   Accessibility — honour user motion preferences.
   --------------------------------------------------------- */
@media (prefers-reduced-motion: reduce) {

    .celestial-glow,
    .stars circle,
    .cloud,
    .shooting-star {
        animation: none;
    }

    /* Keep shooting star hidden if motion is disabled */
    .shooting-star {
        display: none;
    }
}
</style>
