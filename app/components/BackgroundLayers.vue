<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const scrollY = ref(0)
let rafId: number | null = null
let listenerActive = false

function onScroll() {
    if (rafId !== null) return
    rafId = requestAnimationFrame(() => {
        scrollY.value = window.scrollY
        rafId = null
    })
}

onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    window.addEventListener('scroll', onScroll, { passive: true })
    listenerActive = true
})

onBeforeUnmount(() => {
    if (listenerActive) window.removeEventListener('scroll', onScroll)
    if (rafId !== null) cancelAnimationFrame(rafId)
})

const glowTopStyle = computed(() => ({
    transform: `translate3d(0, ${-scrollY.value * 0.25}px, 0)`,
}))

const glowBottomStyle = computed(() => ({
    transform: `translate3d(0, ${-scrollY.value * 0.15}px, 0)`,
}))
</script>

<template>
    <div aria-hidden="true">
        <!-- Grid lines, masked by a soft radial to fade toward the edges -->
        <div class="fixed inset-0 pointer-events-none z-0 bg-[size:60px_60px]
                    bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)]
                    [mask-image:var(--grid-mask)]"></div>

        <!-- Top-right brand-blue glow (drifts upward at 25% of scroll speed) -->
        <div class="fixed -top-[350px] -right-[350px] w-[700px] h-[700px] pointer-events-none z-0 blur-[80px] will-change-transform
                    bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-blue-500)_4%,transparent),transparent_70%)]
                    dark:bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-blue-400)_8%,transparent),transparent_70%)]"
            :style="glowTopStyle"></div>

        <!-- Bottom-left brand-cyan glow (drifts upward at 15% of scroll speed) -->
        <div class="fixed -bottom-[400px] -left-[350px] w-[600px] h-[600px] pointer-events-none z-0 blur-[90px] will-change-transform
                    bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-cyan-400)_3%,transparent),transparent_70%)]
                    dark:bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-cyan-300)_5%,transparent),transparent_70%)]"
            :style="glowBottomStyle"></div>

        <!-- SVG fractal noise grain, overlay-blended -->
        <div class="fixed inset-0 pointer-events-none z-0 mix-blend-overlay opacity-[0.035] dark:opacity-[0.06]
                    bg-[image:var(--grain-bg)]"></div>
    </div>
</template>
