<template>
    <canvas ref="starsCanvas" class="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in" :class="canvasClass"
        :style="{ opacity: isCanvasVisible ? '' : '0' }" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" />
</template>

<script setup lang="ts">

interface StarParticle {
    x: number
    y: number
    z: number
    opacity: number
    phase: number
    neighbors: number[]
}

interface StarFlare {
    x: number
    y: number
    z: number
    opacity: number
}

interface StarLink {
    verts: number[]
    distances: number[]
    totalDist: number
    progress: number
    finished: boolean
}

interface Props {
    particleCount?: number
    flareCount?: number
    motion?: number
    linkChance?: number
    canvasClass?: string
}

const props = withDefaults(defineProps<Props>(), {
    particleCount: 40,
    flareCount: 10,
    motion: 0.08,
    linkChance: 25,
    canvasClass: 'z-0'
})

const starsCanvas = ref<HTMLCanvasElement>()
const isCanvasVisible = ref(false)

const state = {
    context: null as CanvasRenderingContext2D | null,
    animationFrame: 0,
    resizeTimeout: null as number | null,
    resizeObserver: null as ResizeObserver | null,
    intersectionObserver: null as IntersectionObserver | null,

    isVisible: true,
    isMouseOver: false,
    performanceMode: false,
    lastFrameTime: 0,
    isCanvasReady: false,
    time: 0,

    mouse: { x: 0, y: 0 },
    targetMouse: { x: 0, y: 0 },
    particles: [] as StarParticle[],
    flares: [] as StarFlare[],
    links: [] as StarLink[],
    noiseAngle: 0,

    // Cached values (updated on resize/theme change)
    cachedSizeRatio: 800,
    cachedCanvasWidth: 0,
    cachedCanvasHeight: 0,
    cachedHalfWidth: 0,
    cachedHalfHeight: 0,
    cachedLinkSpeed: 0,
    cachedStarColor: '#60A5FA',
    cachedLinkColor: '#3B82F6',
    cachedFlareColor: '#DBEAFE',
    cachedLinkOpacity: 0.25,
    cachedMotion: 0.08,

    // Reusable position object to avoid allocations
    tempPos: { x: 0, y: 0 },

    // Link object pool for reuse
    linkPool: [] as StarLink[]
}

const FRAME_60 = 1000 / 60
const FRAME_30 = 1000 / 30
const MOUSE_LERP = 0.08
const TWO_PI = Math.PI * 2
const SIZE_DIVISOR = 0.001
const NOISE_RADIUS = 100
const NOISE_SPEED = 0.005
const NOISE_SPEED_LOW = 0.015
const FLICKER_SPEED = 2.5
const ALPHA_BUCKETS = 10
const MAX_DPR = 2
const LINK_FADE_FRAMES = 90

// Color mode integration
const colorMode = useColorMode()
const currentTheme = computed(() => colorMode.value)

const settings = {
    themes: {
        light: {
            starColor: '#1E40AF',
            linkColor: '#2563EB',
            flareColor: '#3B82F6',
            linkOpacity: 0.4,
            flareOpacityMin: 0.01,
            flareOpacityMax: 0.05
        },
        dark: {
            starColor: '#60A5FA',
            linkColor: '#3B82F6',
            flareColor: '#DBEAFE',
            linkOpacity: 0.25,
            flareOpacityMin: 0.002,
            flareOpacityMax: 0.015
        }
    },
    link: {
        lineWidth: 1,
        lengthMin: 5
    }
}

function updateCachedColors(): void {
    const theme = currentTheme.value === 'dark' ? 'dark' : 'light'
    state.cachedStarColor = settings.themes[theme].starColor
    state.cachedLinkColor = settings.themes[theme].linkColor
    state.cachedFlareColor = settings.themes[theme].flareColor
    state.cachedLinkOpacity = settings.themes[theme].linkOpacity
}

function createNeighbors(): void {
    const maxDistanceSq = 0.09

    for (let i = 0; i < state.particles.length; i++) {
        const particle = state.particles[i]
        if (!particle) continue

        particle.neighbors = []

        for (let j = 0; j < state.particles.length; j++) {
            if (i === j) continue

            const other = state.particles[j]
            if (!other) continue

            const dx = particle.x - other.x
            const dy = particle.y - other.y

            if (dx * dx + dy * dy < maxDistanceSq) {
                particle.neighbors.push(j)
            }
        }
    }
}

function getFlareOpacityRange(): { min: number, max: number } {
    const theme = currentTheme.value === 'dark' ? 'dark' : 'light'
    return {
        min: settings.themes[theme].flareOpacityMin,
        max: settings.themes[theme].flareOpacityMax
    }
}

function updateFlareOpacities(): void {
    const range = getFlareOpacityRange()
    for (let i = 0; i < state.flares.length; i++) {
        const flare = state.flares[i]
        if (flare) {
            flare.opacity = Math.random() * (range.max - range.min) + range.min
        }
    }
}

function resize(): void {
    if (!starsCanvas.value || !state.context) return

    const canvas = starsCanvas.value
    const parent = canvas.parentElement
    if (!parent) return

    const parentRect = parent.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)

    const newWidth = parentRect.width | 0
    const newHeight = parentRect.height | 0

    canvas.width = (newWidth * dpr) | 0
    canvas.height = (newHeight * dpr) | 0
    canvas.style.width = newWidth + 'px'
    canvas.style.height = newHeight + 'px'

    state.context.setTransform(1, 0, 0, 1, 0, 0)
    state.context.scale(dpr, dpr)

    state.cachedCanvasWidth = newWidth
    state.cachedCanvasHeight = newHeight
    state.cachedHalfWidth = newWidth * 0.5
    state.cachedHalfHeight = newHeight * 0.5
    state.cachedSizeRatio = Math.max(newWidth, newHeight) || 800
    state.cachedLinkSpeed = 0.00001 * newWidth

    state.mouse.x = newWidth * 0.5
    state.mouse.y = newHeight * 0.5
    state.targetMouse.x = state.mouse.x
    state.targetMouse.y = state.mouse.y

    state.context.clearRect(0, 0, canvas.width, canvas.height)

    if (newWidth > 0 && newHeight > 0) {
        state.isCanvasReady = true
        setTimeout(() => { isCanvasVisible.value = true }, 100)
    }
}

// Position calculation — writes to state.tempPos in place
function positionInline(x: number, y: number, z: number): void {
    const noiseX = NOISE_RADIUS * Math.cos(state.noiseAngle) - 0.5
    const noiseY = NOISE_RADIUS * Math.sin(state.noiseAngle) - 0.5

    state.tempPos.x = (x * state.cachedCanvasWidth) + (((state.cachedHalfWidth - state.mouse.x + noiseX) * z) * state.cachedMotion)
    state.tempPos.y = (y * state.cachedCanvasHeight) + (((state.cachedHalfHeight - state.mouse.y + noiseY) * z) * state.cachedMotion)
}

function createParticle(): StarParticle {
    return {
        x: Math.random() * 1.2 - 0.1,
        y: Math.random() * 1.2 - 0.1,
        z: Math.random() * 3.5 + 0.5,
        opacity: Math.random() * 0.9 + 0.1,
        phase: Math.random() * TWO_PI,
        neighbors: []
    }
}

function createFlare(): StarFlare {
    const range = getFlareOpacityRange()
    return {
        x: Math.random() * 1.5 - 0.25,
        y: Math.random() * 1.5 - 0.25,
        z: Math.random() * 1.7 + 0.3,
        opacity: Math.random() * (range.max - range.min) + range.min
    }
}

// Build link with all vertices resolved upfront
function createLink(startVertex: number, numPoints: number): StarLink | null {
    const maxLen = Math.min(numPoints, 4)
    const verts = [startVertex]

    // Walk neighbors to collect vertices
    for (let step = 0; step < maxLen - 1; step++) {
        const lastIdx = verts[verts.length - 1]
        if (lastIdx === undefined) break
        const last = state.particles[lastIdx]
        if (!last || !last.neighbors.length) break

        const neighbor = last.neighbors[(Math.random() * last.neighbors.length) | 0]
        if (neighbor !== undefined && verts.indexOf(neighbor) === -1) {
            verts.push(neighbor)
        }
    }

    if (verts.length < 2) return null

    // Pre-compute segment distances
    const distances: number[] = []
    let totalDist = 0
    for (let i = 0; i < verts.length - 1; i++) {
        const p1 = state.particles[verts[i]!]
        const p2 = state.particles[verts[i + 1]!]
        if (p1 && p2) {
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const d = Math.sqrt(dx * dx + dy * dy)
            distances.push(d)
            totalDist += d
        }
    }

    if (distances.length === 0) return null

    // Try to reuse from pool
    let link = state.linkPool.pop()
    if (link) {
        link.verts = verts
        link.distances = distances
        link.totalDist = totalDist
        link.progress = 0
        link.finished = false
    } else {
        link = { verts, distances, totalDist, progress: 0, finished: false }
    }
    return link
}

function renderLink(link: StarLink): void {
    if (!state.context || state.cachedCanvasWidth === 0) return

    link.progress += state.cachedLinkSpeed
    const drawDist = link.totalDist
    const fadeDist = drawDist + (LINK_FADE_FRAMES * state.cachedLinkSpeed)

    if (link.progress >= fadeDist) {
        link.finished = true
        return
    }

    // Determine alpha: full during draw phase, fading after
    let alpha: number
    if (link.progress <= drawDist) {
        alpha = state.cachedLinkOpacity
    } else {
        alpha = (1 - (link.progress - drawDist) / (fadeDist - drawDist)) * state.cachedLinkOpacity
    }

    if (alpha <= 0) { link.finished = true; return }

    state.context.globalAlpha = alpha
    state.context.beginPath()

    // How far along the path we've drawn
    const drawLen = Math.min(link.progress, drawDist)
    let remaining = drawLen
    let started = false

    for (let i = 0; i < link.verts.length - 1; i++) {
        const pIdx = link.verts[i]!
        const p = state.particles[pIdx]
        if (!p) break

        if (!started) {
            positionInline(p.x, p.y, p.z)
            state.context.moveTo(state.tempPos.x, state.tempPos.y)
            started = true
        }

        const segDist = link.distances[i]
        if (segDist === undefined) break

        if (remaining >= segDist) {
            // Full segment
            const nextP = state.particles[link.verts[i + 1]!]
            if (!nextP) break
            positionInline(nextP.x, nextP.y, nextP.z)
            state.context.lineTo(state.tempPos.x, state.tempPos.y)
            remaining -= segDist
        } else {
            // Partial segment — interpolate endpoint
            const a = state.particles[pIdx]
            const bIdx = link.verts[i + 1]!
            const b = state.particles[bIdx]
            if (!a || !b) break
            const t = remaining / segDist
            positionInline(
                a.x + (b.x - a.x) * t,
                a.y + (b.y - a.y) * t,
                a.z + (b.z - a.z) * t
            )
            state.context.lineTo(state.tempPos.x, state.tempPos.y)
            break
        }
    }

    // If in fade phase, also draw any remaining full segments
    if (link.progress > drawDist) {
        for (let i = link.distances.length; i < link.verts.length; i++) {
            const p = state.particles[link.verts[i]!]
            if (p) {
                positionInline(p.x, p.y, p.z)
                state.context.lineTo(state.tempPos.x, state.tempPos.y)
            }
        }
    }

    state.context.stroke()
}

function render(): void {
    if (!state.context || !state.isVisible || !state.isCanvasReady) return

    const ctx = state.context
    const isLowPower = state.performanceMode && !state.isMouseOver

    // Smooth mouse interpolation
    state.mouse.x += (state.targetMouse.x - state.mouse.x) * MOUSE_LERP
    state.mouse.y += (state.targetMouse.y - state.mouse.y) * MOUSE_LERP

    // Advance noise angle (replaces 1000-entry lookup table)
    state.noiseAngle += isLowPower ? NOISE_SPEED_LOW : NOISE_SPEED
    state.time += isLowPower ? 0.06 : 0.02

    ctx.clearRect(0, 0, state.cachedCanvasWidth, state.cachedCanvasHeight)

    // --- Batched particle rendering (quantized alpha → fewer draw calls) ---
    ctx.fillStyle = state.cachedStarColor
    const particleCount = isLowPower ? Math.max(10, props.particleCount >> 1) : props.particleCount
    const pLen = Math.min(particleCount, state.particles.length)
    const sizeRatio = state.cachedSizeRatio

    // Collect particles into alpha buckets
    const buckets: { x: number; y: number; r: number }[][] = new Array(ALPHA_BUCKETS)
    for (let i = 0; i < pLen; i++) {
        const p = state.particles[i]
        if (!p) continue

        positionInline(p.x, p.y, p.z)
        const r = ((p.z * 0.5) + 1) * sizeRatio * SIZE_DIVISOR

        // Deterministic flicker via sine wave (replaces per-frame Math.random)
        const flicker = Math.sin(state.time * FLICKER_SPEED + p.phase) * 0.5
        let o = p.opacity + flicker
        if (o < 0) o = 0
        else if (o > 1) o = 1

        const bucket = Math.min((o * ALPHA_BUCKETS) | 0, ALPHA_BUCKETS - 1)
        if (!buckets[bucket]) buckets[bucket] = []
        buckets[bucket].push({ x: state.tempPos.x, y: state.tempPos.y, r })
    }

    // Draw each alpha bucket as a single path
    for (let b = 0; b < ALPHA_BUCKETS; b++) {
        const items = buckets[b]
        if (!items || items.length === 0) continue

        ctx.globalAlpha = (b + 0.5) / ALPHA_BUCKETS
        ctx.beginPath()
        for (let i = 0; i < items.length; i++) {
            const item = items[i]!
            if (item.r < 1.5) {
                // fillRect for tiny particles (faster than arc)
                ctx.rect(item.x - item.r, item.y - item.r, item.r * 2, item.r * 2)
            } else {
                ctx.moveTo(item.x + item.r, item.y)
                ctx.arc(item.x, item.y, item.r, 0, TWO_PI)
            }
        }
        ctx.fill()
    }

    // --- Links ---
    ctx.strokeStyle = state.cachedLinkColor
    ctx.lineWidth = settings.link.lineWidth

    const linkChance = isLowPower ? props.linkChance << 1 : props.linkChance
    if (((Math.random() * (linkChance + 1)) | 0) === linkChance && state.links.length < 5) {
        const length = ((Math.random() * 3) | 0) + settings.link.lengthMin
        const link = createLink((Math.random() * state.particles.length) | 0, length)
        if (link) state.links.push(link)
    }

    let writeIdx = 0
    for (let i = 0; i < state.links.length; i++) {
        const link = state.links[i]
        if (link) {
            if (!link.finished) {
                renderLink(link)
                state.links[writeIdx++] = link
            } else if (state.linkPool.length < 20) {
                state.linkPool.push(link)
            }
        }
    }
    state.links.length = writeIdx

    // --- Flares (few enough to render individually) ---
    ctx.fillStyle = state.cachedFlareColor
    const flareCount = isLowPower ? Math.max(2, props.flareCount >> 2) : props.flareCount
    const fLen = Math.min(flareCount, state.flares.length)
    for (let j = 0; j < fLen; j++) {
        const f = state.flares[j]
        if (!f) continue
        positionInline(f.x, f.y, f.z)
        const r = ((f.z * 100) + 100) * sizeRatio * SIZE_DIVISOR
        ctx.globalAlpha = f.opacity
        ctx.beginPath()
        ctx.arc(state.tempPos.x, state.tempPos.y, r, 0, TWO_PI)
        ctx.fill()
    }

    ctx.globalAlpha = 1
}

function animate(currentTime = 0): void {
    if (!state.isVisible) return

    const elapsed = currentTime - state.lastFrameTime
    // 30fps idle baseline, 60fps when mouse is over
    const targetInterval = (state.performanceMode && !state.isMouseOver) ? FRAME_30 : FRAME_60

    if (elapsed >= targetInterval) {
        render()
        state.lastFrameTime = currentTime
    }

    state.animationFrame = requestAnimationFrame(animate)
}

function handleMouseMove(e: MouseEvent): void {
    if (!starsCanvas.value) return
    const rect = starsCanvas.value.getBoundingClientRect()
    const scaleX = starsCanvas.value.clientWidth / rect.width
    const scaleY = starsCanvas.value.clientHeight / rect.height
    state.targetMouse.x = (e.clientX - rect.left) * scaleX
    state.targetMouse.y = (e.clientY - rect.top) * scaleY
}

function onMouseEnter(): void {
    state.isMouseOver = true
    state.performanceMode = false
}

function onMouseLeave(): void {
    state.isMouseOver = false
    setTimeout(() => {
        if (!state.isMouseOver) {
            state.performanceMode = true
        }
    }, 2000)
}

function handleResize(): void {
    if (state.resizeTimeout) clearTimeout(state.resizeTimeout)

    state.resizeTimeout = window.setTimeout(() => {
        resize()
        render()
        state.resizeTimeout = null
    }, 50)
}

function handleVisibilityChange(): void {
    state.isVisible = !document.hidden

    if (state.isVisible) {
        state.lastFrameTime = performance.now()
        animate()
    } else if (state.animationFrame) {
        cancelAnimationFrame(state.animationFrame)
    }
}

function init(): void {
    if (!starsCanvas.value) return

    state.context = starsCanvas.value.getContext('2d', { alpha: true })
    if (!state.context) return

    updateCachedColors()
    state.cachedMotion = props.motion

    setTimeout(() => {
        resize()
        if (state.isCanvasReady) animate()
    }, 50)

    setTimeout(() => {
        if (!state.animationFrame && starsCanvas.value && starsCanvas.value.clientWidth > 0) {
            state.isCanvasReady = true
            animate()
        }
    }, 200)

    state.mouse.x = starsCanvas.value.clientWidth * 0.5
    state.mouse.y = starsCanvas.value.clientHeight * 0.5
    state.targetMouse.x = state.mouse.x
    state.targetMouse.y = state.mouse.y

    state.particles = []
    for (let i = 0; i < props.particleCount; i++) {
        state.particles.push(createParticle())
    }
    createNeighbors()

    state.flares = []
    for (let i = 0; i < props.flareCount; i++) {
        state.flares.push(createFlare())
    }
}

watch(currentTheme, () => {
    updateCachedColors()
    updateFlareOpacities()
    render()
}, { immediate: false })

onMounted(() => {
    if (!starsCanvas.value) return

    init()

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true })

    if (window.ResizeObserver && starsCanvas.value.parentElement) {
        state.resizeObserver = new ResizeObserver(() => { handleResize() })
        state.resizeObserver.observe(starsCanvas.value.parentElement)
    }

    state.performanceMode = (navigator.hardwareConcurrency || 4) < 4

    if (window.IntersectionObserver) {
        state.intersectionObserver = new IntersectionObserver((entries) => {
            const entry = entries[0]
            if (!entry) return

            const wasVisible = state.isVisible
            state.isVisible = entry.isIntersecting

            if (state.isVisible && !wasVisible) {
                state.lastFrameTime = performance.now()
                animate()
            }
        }, { threshold: 0.1 })

        state.intersectionObserver.observe(starsCanvas.value)
    }
})

onUnmounted(() => {
    state.isVisible = false
    isCanvasVisible.value = false

    if (state.animationFrame) cancelAnimationFrame(state.animationFrame)
    if (state.resizeTimeout) clearTimeout(state.resizeTimeout)

    state.resizeObserver?.disconnect()
    state.intersectionObserver?.disconnect()

    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', handleResize)
    document.removeEventListener('visibilitychange', handleVisibilityChange)

    state.particles.length = 0
    state.flares.length = 0
    state.links.length = 0
    state.linkPool.length = 0
    state.context = null
})
</script>
