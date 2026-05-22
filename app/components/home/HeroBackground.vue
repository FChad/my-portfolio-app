<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

// Network constellation: drifting nodes connected by lines when within range.
// Pure canvas, no dependencies. Theme-reactive via useColorMode.
const canvasRef = ref<HTMLCanvasElement | null>(null)
const colorMode = useColorMode()

let rafId: number | null = null
let resizeObserver: ResizeObserver | null = null
let nodes: Array<{ x: number; y: number; vx: number; vy: number }> = []
let dpr = 1
let widthCss = 0
let heightCss = 0
let prefersReducedMotion = false

const CONNECT_DISTANCE = 140
const NODE_RADIUS = 1.6
const NODE_SPEED = 0.15
const DENSITY = 1 / 18000 // ~1 node per 18000 px²; capped below.

// Hard-coded to match Tailwind's blue-500 (light) and blue-300 (dark) — these
// align with --accent in main.css. Update both together if the accent changes.
function nodeRgb(): string {
    return colorMode.value === 'dark' ? '147, 197, 253' : '59, 130, 246'
}

function resize(canvas: HTMLCanvasElement) {
    const parent = canvas.parentElement
    if (!parent) return
    const rect = parent.getBoundingClientRect()
    widthCss = rect.width
    heightCss = rect.height
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.floor(widthCss * dpr)
    canvas.height = Math.floor(heightCss * dpr)
    canvas.style.width = `${widthCss}px`
    canvas.style.height = `${heightCss}px`
}

function initNodes() {
    const count = Math.max(20, Math.min(80, Math.floor(widthCss * heightCss * DENSITY)))
    nodes = []
    for (let i = 0; i < count; i++) {
        nodes.push({
            x: Math.random() * widthCss,
            y: Math.random() * heightCss,
            vx: (Math.random() - 0.5) * NODE_SPEED,
            vy: (Math.random() - 0.5) * NODE_SPEED,
        })
    }
}

function draw(ctx: CanvasRenderingContext2D) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, widthCss, heightCss)
    const rgb = nodeRgb()

    // Connections first (rendered behind nodes).
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i]!
            const b = nodes[j]!
            const dx = a.x - b.x
            const dy = a.y - b.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < CONNECT_DISTANCE) {
                const alpha = (1 - dist / CONNECT_DISTANCE) * 0.25
                ctx.strokeStyle = `rgba(${rgb}, ${alpha})`
                ctx.lineWidth = 0.8
                ctx.beginPath()
                ctx.moveTo(a.x, a.y)
                ctx.lineTo(b.x, b.y)
                ctx.stroke()
            }
        }
    }

    // Nodes.
    ctx.fillStyle = `rgba(${rgb}, 0.7)`
    for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, NODE_RADIUS, 0, Math.PI * 2)
        ctx.fill()
    }
}

function tick(ctx: CanvasRenderingContext2D) {
    for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > widthCss) n.vx *= -1
        if (n.y < 0 || n.y > heightCss) n.vy *= -1
    }
    draw(ctx)
    rafId = requestAnimationFrame(() => tick(ctx))
}

onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    resize(canvas)
    initNodes()

    if (prefersReducedMotion) {
        draw(ctx)
    } else {
        rafId = requestAnimationFrame(() => tick(ctx))
    }

    // Re-init on container resize (responsive / orientation change).
    resizeObserver = new ResizeObserver(() => {
        resize(canvas)
        initNodes()
        if (prefersReducedMotion) draw(ctx)
    })
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement)

    // Animated mode redraws every frame anyway; only the static case needs
    // an explicit repaint when the theme toggles.
    watch(() => colorMode.value, () => {
        if (prefersReducedMotion) draw(ctx)
    })
})

onBeforeUnmount(() => {
    if (rafId !== null) cancelAnimationFrame(rafId)
    if (resizeObserver) resizeObserver.disconnect()
})
</script>

<template>
    <canvas
        ref="canvasRef"
        class="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
    ></canvas>
</template>
