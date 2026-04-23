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
 *
 * Mobile framing: on narrow portrait screens only the centre ~500 units of
 * the 1920-wide viewBox is visible. Feature elements (celestial body, lake,
 * key trees, reeds) are concentrated between x≈670..1250 so mobile users
 * still see a complete scene rather than empty hills.
 */

interface Props {
    /** Additional classes for the wrapper (e.g. z-index, opacity). */
    wrapperClass?: string
}

withDefaults(defineProps<Props>(), {
    wrapperClass: 'z-0'
})

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

type TreeType = 'pine' | 'broadleaf'
interface Tree { x: number; y: number; scale: number; type: TreeType }

// Tree distribution is deliberately centre-heavy so the mobile crop still
// frames a forest rather than open hillside.
const trees: readonly Tree[] = [
    { x: 140, y: 900, scale: 1.00, type: 'pine' },
    { x: 260, y: 910, scale: 0.85, type: 'pine' },
    { x: 430, y: 918, scale: 0.75, type: 'broadleaf' },
    { x: 730, y: 908, scale: 0.90, type: 'pine' },
    { x: 805, y: 924, scale: 0.65, type: 'broadleaf' },
    { x: 1150, y: 924, scale: 0.70, type: 'broadleaf' },
    { x: 1225, y: 906, scale: 0.95, type: 'pine' },
    { x: 1490, y: 918, scale: 0.80, type: 'broadleaf' },
    { x: 1640, y: 905, scale: 1.10, type: 'pine' },
    { x: 1760, y: 912, scale: 0.90, type: 'broadleaf' }
] as const

const shrubs = [
    { cx: 520, cy: 912, rx: 26, ry: 14 },
    { cx: 1060, cy: 920, rx: 22, ry: 11 },
    { cx: 1380, cy: 916, rx: 28, ry: 13 }
] as const

// Reeds cluster at the two visible lake edges. Rotation adds organic variety.
const reeds = [
    { x: 678, h: 16, rot: -6 },
    { x: 690, h: 22, rot: 3 },
    { x: 702, h: 14, rot: -2 },
    { x: 714, h: 19, rot: 5 },
    { x: 1212, h: 15, rot: -5 },
    { x: 1224, h: 21, rot: 2 },
    { x: 1236, h: 17, rot: -3 },
    { x: 1248, h: 13, rot: 6 }
] as const

// Fireflies drift over the lake at night; delays stagger the glow pulse.
const fireflies = [
    { cx: 770, cy: 948, delay: 0 },
    { cx: 840, cy: 935, delay: 1.4 },
    { cx: 905, cy: 950, delay: 0.6 },
    { cx: 975, cy: 930, delay: 2.2 },
    { cx: 1035, cy: 944, delay: 1.0 },
    { cx: 1095, cy: 936, delay: 2.8 },
    { cx: 1155, cy: 948, delay: 0.3 }
] as const

// Reflection streak bands on the lake surface — stacked thin ellipses with
// varying width/opacity create the classic shimmering light path a sun or
// moon casts on water, much more realistic than a single radial blob.
interface ReflectionBand { dy: number; rx: number; opacity: number }
const reflectionBands: readonly ReflectionBand[] = [
    { dy: -7, rx: 40, opacity: 0.35 },
    { dy: -5, rx: 70, opacity: 0.55 },
    { dy: -3, rx: 85, opacity: 0.75 },
    { dy: -1, rx: 95, opacity: 0.9 },
    { dy: 1, rx: 90, opacity: 0.8 },
    { dy: 3, rx: 75, opacity: 0.6 },
    { dy: 5, rx: 55, opacity: 0.45 },
    { dy: 7, rx: 35, opacity: 0.3 }
] as const
</script>

<template>
    <div class="landscape-wrapper absolute inset-0 overflow-hidden" :class="wrapperClass" aria-hidden="true">
        <svg class="landscape-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg">

            <defs>
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

                <linearGradient id="mist-day" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0.35" />
                </linearGradient>
                <linearGradient id="mist-night" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#3b82f6" stop-opacity="0" />
                    <stop offset="100%" stop-color="#1e3a8a" stop-opacity="0.25" />
                </linearGradient>

                <!-- Lake water — top reflects sky, deepens toward the viewer. -->
                <linearGradient id="lake-day" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#a8cfe6" />
                    <stop offset="55%" stop-color="#5a97c9" />
                    <stop offset="100%" stop-color="#2c5f9e" />
                </linearGradient>
                <linearGradient id="lake-night" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#1e2a5e" />
                    <stop offset="55%" stop-color="#0c1638" />
                    <stop offset="100%" stop-color="#040818" />
                </linearGradient>

                <!-- Vertical beam of celestial light reflected onto the water. -->
                <radialGradient id="sunpath" cx="50%" cy="0%" r="80%" fx="50%" fy="0%">
                    <stop offset="0%" stop-color="#fde68a" stop-opacity="0.9" />
                    <stop offset="100%" stop-color="#fbbf24" stop-opacity="0" />
                </radialGradient>
                <radialGradient id="moonpath" cx="50%" cy="0%" r="80%" fx="50%" fy="0%">
                    <stop offset="0%" stop-color="#f1f5f9" stop-opacity="0.85" />
                    <stop offset="100%" stop-color="#f1f5f9" stop-opacity="0" />
                </radialGradient>

                <!-- Soft bloom around fireflies. Kept tight so it doesn't hog fill rate. -->
                <filter id="firefly-glow" x="-200%" y="-200%" width="500%" height="500%">
                    <feGaussianBlur stdDeviation="2.5" />
                </filter>

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

            <g class="shooting-star">
                <line x1="0" y1="0" x2="120" y2="40" stroke="#f8fafc" stroke-width="1.5" stroke-linecap="round"
                    opacity="0.8" />
                <line x1="0" y1="0" x2="80" y2="27" stroke="#dbeafe" stroke-width="2.5" stroke-linecap="round"
                    opacity="0.4" />
            </g>

            <!-- ============ CELESTIAL BODY ============
                 Sun and moon share identical coordinates (cx=960, cy=200).
                 Centered in viewBox so they stay in the mobile crop. -->
            <g class="sun celestial">
                <circle cx="960" cy="200" r="180" fill="url(#sun-glow)" class="celestial-glow" />
                <circle cx="960" cy="200" r="62" fill="#fde68a" />
                <circle cx="960" cy="200" r="56" fill="#fcd34d" />
            </g>

            <g class="moon celestial">
                <circle cx="960" cy="200" r="190" fill="url(#moon-glow)" class="celestial-glow" />
                <circle cx="960" cy="200" r="58" fill="#f1f5f9" />
                <circle cx="945" cy="188" r="7" fill="#cbd5e1" opacity="0.55" />
                <circle cx="975" cy="210" r="5" fill="#cbd5e1" opacity="0.55" />
                <circle cx="954" cy="218" r="4" fill="#cbd5e1" opacity="0.45" />
                <circle cx="980" cy="190" r="3" fill="#cbd5e1" opacity="0.5" />
            </g>

            <!-- ============ CLOUDS (day only) ============ -->
            <g class="clouds" fill="#ffffff" opacity="0.85">
                <use href="#cloud" class="cloud cloud-1" x="-200" y="180" width="260" height="70" />
                <use href="#cloud" class="cloud cloud-2" x="-200" y="340" width="200" height="55" />
                <use href="#cloud" class="cloud cloud-3" x="-200" y="110" width="170" height="48" />
            </g>

            <!-- ============ BIRDS (day only, animated flock) ============ -->
            <g class="birds" stroke="#475569" stroke-width="2.5" stroke-linecap="round" fill="none">
                <g class="bird-flock">
                    <path d="M0,0 Q6,-6 12,0 Q18,-6 24,0" />
                    <path transform="translate(42,10)" d="M0,0 Q5,-5 10,0 Q15,-5 20,0" />
                    <path transform="translate(78,-4)" d="M0,0 Q4,-4 8,0 Q12,-4 16,0" />
                </g>
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

            <!-- ============ TREES & SHRUBS ============
                 Rendered before the lake so the water surface clips the trunks
                 of far-shore trees, making them sit naturally on the shoreline.
                 Two parallel groups (day/night) with different fills; shapes are
                 identical so the theme toggle is a simple opacity crossfade. -->
            <g class="trees trees-day" fill="#1e293b">
                <g v-for="(t, i) in trees" :key="`td-${i}`"
                    :transform="`translate(${t.x}, ${t.y}) scale(${t.scale})`">
                    <template v-if="t.type === 'pine'">
                        <path
                            d="M0,-80 L-14,-55 L-8,-55 L-22,-30 L-12,-30 L-28,0 L28,0 L12,-30 L22,-30 L8,-55 L14,-55 Z" />
                        <rect x="-4" y="0" width="8" height="14" />
                    </template>
                    <template v-else>
                        <circle cx="0" cy="-28" r="28" />
                        <circle cx="-22" cy="-22" r="20" />
                        <circle cx="20" cy="-24" r="22" />
                        <circle cx="-4" cy="-48" r="20" />
                        <rect x="-3" y="0" width="6" height="14" />
                    </template>
                </g>
                <ellipse v-for="(s, i) in shrubs" :key="`sd-${i}`" :cx="s.cx" :cy="s.cy" :rx="s.rx" :ry="s.ry" />
            </g>

            <g class="trees trees-night" fill="#020617">
                <g v-for="(t, i) in trees" :key="`tn-${i}`"
                    :transform="`translate(${t.x}, ${t.y}) scale(${t.scale})`">
                    <template v-if="t.type === 'pine'">
                        <path
                            d="M0,-80 L-14,-55 L-8,-55 L-22,-30 L-12,-30 L-28,0 L28,0 L12,-30 L22,-30 L8,-55 L14,-55 Z" />
                        <rect x="-4" y="0" width="8" height="14" />
                    </template>
                    <template v-else>
                        <circle cx="0" cy="-28" r="28" />
                        <circle cx="-22" cy="-22" r="20" />
                        <circle cx="20" cy="-24" r="22" />
                        <circle cx="-4" cy="-48" r="20" />
                        <rect x="-3" y="0" width="6" height="14" />
                    </template>
                </g>
                <ellipse v-for="(s, i) in shrubs" :key="`sn-${i}`" :cx="s.cx" :cy="s.cy" :rx="s.rx" :ry="s.ry" />
            </g>

            <!-- ============ LAKE ============
                 Centred pond inside the hills. Reflection beam aligns with
                 sun/moon at cx=960. Shimmer lines hint at water surface. -->
            <g class="lake lake-day">
                <ellipse cx="960" cy="945" rx="300" ry="20" fill="url(#lake-day)" />
                <g class="lake-reflection">
                    <ellipse v-for="(b, i) in reflectionBands" :key="`rfd-${i}`" :cx="960" :cy="945 + b.dy"
                        :rx="b.rx" ry="0.9" fill="#fde68a" :opacity="b.opacity" />
                </g>
                <ellipse class="lake-shine lake-shine-1" cx="960" cy="937" rx="250" ry="1.2" fill="#ffffff"
                    opacity="0.45" />
                <ellipse class="lake-shine lake-shine-2" cx="960" cy="953" rx="180" ry="0.9" fill="#ffffff"
                    opacity="0.25" />
            </g>
            <g class="lake lake-night">
                <ellipse cx="960" cy="945" rx="300" ry="20" fill="url(#lake-night)" />
                <g class="lake-reflection">
                    <ellipse v-for="(b, i) in reflectionBands" :key="`rfn-${i}`" :cx="960" :cy="945 + b.dy"
                        :rx="b.rx * 0.75" ry="0.8" fill="#f1f5f9" :opacity="b.opacity * 0.75" />
                </g>
                <ellipse class="lake-shine lake-shine-1" cx="960" cy="937" rx="250" ry="1" fill="#f1f5f9"
                    opacity="0.28" />
                <ellipse class="lake-shine lake-shine-2" cx="960" cy="953" rx="180" ry="0.7" fill="#93c5fd"
                    opacity="0.2" />
            </g>

            <!-- ============ REEDS AT LAKE EDGE ============ -->
            <g class="reeds reeds-day" stroke="#1e293b" stroke-width="2" stroke-linecap="round">
                <line v-for="(r, i) in reeds" :key="`rd-${i}`" :x1="r.x" :y1="938" :x2="r.x" :y2="938 - r.h"
                    :transform="`rotate(${r.rot} ${r.x} 938)`" />
            </g>
            <g class="reeds reeds-night" stroke="#020617" stroke-width="2" stroke-linecap="round">
                <line v-for="(r, i) in reeds" :key="`rn-${i}`" :x1="r.x" :y1="938" :x2="r.x" :y2="938 - r.h"
                    :transform="`rotate(${r.rot} ${r.x} 938)`" />
            </g>

            <!-- ============ FIREFLIES (night only) ============ -->
            <g class="fireflies" filter="url(#firefly-glow)">
                <circle v-for="(f, i) in fireflies" :key="i" class="firefly" :cx="f.cx" :cy="f.cy" r="2.6"
                    fill="#fde68a" :style="{ animationDelay: `${f.delay}s` }" />
            </g>
        </svg>
    </div>
</template>

<style scoped>
.landscape-wrapper {
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
   the `.dark` class flips.
   --------------------------------------------------------- */
.sky,
.mist,
.mountain-far,
.mountain-mid,
.hills,
.trees,
.lake,
.reeds,
.celestial,
.stars,
.shooting-star,
.clouds,
.birds,
.fireflies {
    transition: opacity 600ms ease-in-out;
}

.sky-day,
.mist-day,
.mountain-far-day,
.mountain-mid-day,
.hills-day,
.trees-day,
.lake-day,
.reeds-day,
.sun,
.clouds,
.birds {
    opacity: 1;
}

.sky-night,
.mist-night,
.mountain-far-night,
.mountain-mid-night,
.hills-night,
.trees-night,
.lake-night,
.reeds-night,
.moon,
.stars,
.shooting-star,
.fireflies {
    opacity: 0;
}

:where(.dark) .sky-day,
:where(.dark) .mist-day,
:where(.dark) .mountain-far-day,
:where(.dark) .mountain-mid-day,
:where(.dark) .hills-day,
:where(.dark) .trees-day,
:where(.dark) .lake-day,
:where(.dark) .reeds-day,
:where(.dark) .sun,
:where(.dark) .clouds,
:where(.dark) .birds {
    opacity: 0;
}

:where(.dark) .sky-night,
:where(.dark) .mist-night,
:where(.dark) .mountain-far-night,
:where(.dark) .mountain-mid-night,
:where(.dark) .hills-night,
:where(.dark) .trees-night,
:where(.dark) .lake-night,
:where(.dark) .reeds-night,
:where(.dark) .moon,
:where(.dark) .stars,
:where(.dark) .fireflies {
    opacity: 1;
}

/* ---------------------------------------------------------
   Animations — opacity / transform only (compositor-friendly).
   --------------------------------------------------------- */
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
        transform: translateX(2120px);
    }
}

.shooting-star {
    transform-origin: 0 0;
    animation: shoot 14s ease-out infinite;
    will-change: transform, opacity;
}

@keyframes shoot {

    0%,
    90%,
    100% {
        transform: translate(750px, 80px) rotate(0deg);
        opacity: 0;
    }

    91% {
        transform: translate(750px, 80px) rotate(0deg);
        opacity: 0;
    }

    92% {
        opacity: 1;
    }

    99% {
        transform: translate(1150px, 280px) rotate(0deg);
        opacity: 0;
    }
}

:where(.dark) .shooting-star {
    opacity: 1;
}

/* Bird flock drifts across the sky at a leisurely pace. */
.bird-flock {
    will-change: transform;
    animation: bird-fly 55s linear infinite;
}

@keyframes bird-fly {
    from {
        transform: translate(-120px, 220px);
    }

    to {
        transform: translate(2100px, 140px);
    }
}

/* Lake surface — subtle horizontal shimmer. */
.lake-shine {
    transform-box: fill-box;
    transform-origin: center;
    will-change: transform, opacity;
}

.lake-shine-1 {
    animation: lake-shimmer 5s ease-in-out infinite;
}

.lake-shine-2 {
    animation: lake-shimmer 7s ease-in-out infinite;
    animation-delay: -2s;
}

@keyframes lake-shimmer {

    0%,
    100% {
        transform: scaleX(1);
        opacity: 0.35;
    }

    50% {
        transform: scaleX(1.06);
        opacity: 0.7;
    }
}

/* Fireflies — small drifting glow that pulses. */
.firefly {
    transform-box: fill-box;
    transform-origin: center;
    animation: firefly 5s ease-in-out infinite;
    will-change: transform, opacity;
}

@keyframes firefly {

    0%,
    100% {
        transform: translate(0, 0);
        opacity: 0.25;
    }

    25% {
        transform: translate(-4px, -5px);
        opacity: 1;
    }

    50% {
        transform: translate(3px, -8px);
        opacity: 0.55;
    }

    75% {
        transform: translate(-2px, -3px);
        opacity: 0.9;
    }
}

/* ---------------------------------------------------------
   Accessibility — honour user motion preferences.
   --------------------------------------------------------- */
@media (prefers-reduced-motion: reduce) {

    .celestial-glow,
    .stars circle,
    .cloud,
    .shooting-star,
    .bird-flock,
    .lake-shine,
    .firefly {
        animation: none;
    }

    .shooting-star {
        display: none;
    }
}
</style>
