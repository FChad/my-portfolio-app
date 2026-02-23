<template>
    <canvas ref="starsCanvas" class="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in" :class="canvasClass"
        :style="{ opacity: isCanvasVisible ? '' : '0' }" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'

interface StarParticle {
    x: number
    y: number
    z: number
    opacity: number
    flicker: number
    neighbors: number[]
}

interface StarFlare {
    x: number
    y: number
    z: number
    opacity: number
}

interface StarLink {
    length: number
    verts: number[]
    stage: number
    linked: number[]
    distances: number[]
    traveled: number
    fade: number
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

// All instance-specific state (previously module-level - caused bugs with multiple instances)
const state = {
    context: null as CanvasRenderingContext2D | null,
    animationFrame: 0,
    resizeTimeout: null as number | null,
    resizeObserver: null as ResizeObserver | null,
    intersectionObserver: null as IntersectionObserver | null,

    // Canvas and performance state
    isVisible: true,
    isMouseOver: false,
    performanceMode: false,
    lastFrameTime: 0,
    isCanvasReady: false,

    // Animation state
    mouse: { x: 0, y: 0 },
    targetMouse: { x: 0, y: 0 },
    particles: [] as StarParticle[],
    flares: [] as StarFlare[],
    links: [] as StarLink[],
    n: 0,
    nPos: { x: 0, y: 0 },

    // Pre-computed values (updated on resize/theme change)
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

    // Pre-computed noise table for better performance
    noiseTable: [] as { x: number; y: number }[],

    // Cached rect for mouse position calculation
    cachedRect: null as DOMRect | null,
    cachedScaleX: 1,
    cachedScaleY: 1,

    // Reusable arrays for link points to avoid allocations
    linkPointsBuffer: [] as [number, number][],

    // Link object pool for reuse
    linkPool: [] as StarLink[]
}

const frameInterval = 1000 / 60 // 60 FPS
const mouseLerp = 0.08 // Smoothing factor (0.01 = very smooth, 0.1 = responsive)
const NOISE_TABLE_SIZE = 1000

// Color mode integration
const colorMode = useColorMode()
const currentTheme = computed(() => colorMode.value)

// Settings configuration
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
    },
    noise: {
        radius: 100
    }
}

// Initialize noise table once
function initNoiseTable(): void {
    const angleStep = Math.PI * 2 / NOISE_TABLE_SIZE
    for (let i = 0; i < NOISE_TABLE_SIZE; i++) {
        const a = angleStep * i
        state.noiseTable[i] = {
            x: settings.noise.radius * Math.cos(a),
            y: settings.noise.radius * Math.sin(a)
        }
    }
}

// Update cached theme colors
function updateCachedColors(): void {
    const theme = currentTheme.value === 'dark' ? 'dark' : 'light'
    state.cachedStarColor = settings.themes[theme].starColor
    state.cachedLinkColor = settings.themes[theme].linkColor
    state.cachedFlareColor = settings.themes[theme].flareColor
    state.cachedLinkOpacity = settings.themes[theme].linkOpacity
}

// Simplified neighbor assignment for particle connections
function createNeighbors(): void {
    const maxDistanceSq = 0.09 // 0.3 squared - avoid sqrt

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
            const distanceSq = dx * dx + dy * dy

            if (distanceSq < maxDistanceSq) {
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
    const opacityRange = getFlareOpacityRange()
    for (let i = 0; i < state.flares.length; i++) {
        const flare = state.flares[i]
        if (flare) {
            flare.opacity = Math.random() * (opacityRange.max - opacityRange.min) + opacityRange.min
        }
    }
}

function resize(): void {
    if (!starsCanvas.value || !state.context) return

    const canvas = starsCanvas.value
    const parent = canvas.parentElement
    if (!parent) return

    const parentRect = parent.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    const newWidth = parentRect.width | 0
    const newHeight = parentRect.height | 0

    // Set canvas internal resolution (for drawing)
    const pixelWidth = (newWidth * dpr) | 0
    const pixelHeight = (newHeight * dpr) | 0

    canvas.width = pixelWidth
    canvas.height = pixelHeight

    // Set canvas display size (CSS pixels)
    canvas.style.width = newWidth + 'px'
    canvas.style.height = newHeight + 'px'

    // Reset and scale context for high DPI
    state.context.setTransform(1, 0, 0, 1, 0, 0)
    state.context.scale(dpr, dpr)

    // Update cached dimensions
    state.cachedCanvasWidth = newWidth
    state.cachedCanvasHeight = newHeight
    state.cachedHalfWidth = newWidth * 0.5
    state.cachedHalfHeight = newHeight * 0.5
    state.cachedSizeRatio = Math.max(newWidth, newHeight) || 800
    state.cachedLinkSpeed = 0.00001 * newWidth

    // Reset mouse position to center
    state.mouse.x = newWidth * 0.5
    state.mouse.y = newHeight * 0.5
    state.targetMouse.x = state.mouse.x
    state.targetMouse.y = state.mouse.y

    state.context.clearRect(0, 0, pixelWidth, pixelHeight)

    // Mark canvas as ready after first proper resize
    if (newWidth > 0 && newHeight > 0) {
        state.isCanvasReady = true
        // Start fade-in animation with a small delay to ensure smooth transition
        setTimeout(() => {
            isCanvasVisible.value = true
        }, 100)
    }
}

// Optimized position calculation using cached values - modifies tempPos in place
function positionInline(x: number, y: number, z: number): void {
    const noiseX = state.nPos.x - 0.5
    const noiseY = state.nPos.y - 0.5

    state.tempPos.x = (x * state.cachedCanvasWidth) + (((state.cachedHalfWidth - state.mouse.x + noiseX) * z) * state.cachedMotion)
    state.tempPos.y = (y * state.cachedCanvasHeight) + (((state.cachedHalfHeight - state.mouse.y + noiseY) * z) * state.cachedMotion)
}

// Pre-computed constants
const TWO_PI = Math.PI * 2
const SIZE_DIVISOR = 0.001

// Render a single particle - optimized to avoid class method overhead
function renderParticle(p: StarParticle): void {
    if (!state.context) return

    positionInline(p.x, p.y, p.z)
    const r = ((p.z * 0.5) + 1) * state.cachedSizeRatio * SIZE_DIVISOR

    // Flicker effect - simplified
    const flickerRate = state.performanceMode ? 30 : 15
    const newVal = Math.random() - 0.5
    p.flicker += (newVal - p.flicker) / flickerRate

    // Clamp flicker and calculate final opacity
    if (p.flicker < -0.5) p.flicker = -0.5
    else if (p.flicker > 0.5) p.flicker = 0.5

    let o = p.opacity + p.flicker
    if (o < 0) o = 0
    else if (o > 1) o = 1

    state.context.globalAlpha = o
    state.context.beginPath()
    state.context.arc(state.tempPos.x, state.tempPos.y, r, 0, TWO_PI)
    state.context.fill()
}

// Render a single flare - optimized
function renderFlare(f: StarFlare): void {
    if (!state.context) return

    positionInline(f.x, f.y, f.z)
    const r = ((f.z * 100) + 100) * state.cachedSizeRatio * SIZE_DIVISOR

    state.context.globalAlpha = f.opacity
    state.context.beginPath()
    state.context.arc(state.tempPos.x, state.tempPos.y, r, 0, TWO_PI)
    state.context.fill()
}

// Create a particle object (plain object instead of class for better performance)
function createParticle(): StarParticle {
    return {
        x: Math.random() * 1.2 - 0.1,
        y: Math.random() * 1.2 - 0.1,
        z: Math.random() * 3.5 + 0.5,
        opacity: Math.random() * 0.9 + 0.1,
        flicker: 0,
        neighbors: []
    }
}

// Create a flare object
function createFlare(): StarFlare {
    const opacityRange = getFlareOpacityRange()
    return {
        x: Math.random() * 1.5 - 0.25,
        y: Math.random() * 1.5 - 0.25,
        z: Math.random() * 1.7 + 0.3,
        opacity: Math.random() * (opacityRange.max - opacityRange.min) + opacityRange.min
    }
}

function createLink(startVertex: number, numPoints: number): StarLink {
    // Try to reuse from pool
    let link = state.linkPool.pop()
    if (link) {
        link.length = Math.min(numPoints, 4)
        link.verts.length = 0
        link.verts.push(startVertex)
        link.stage = 0
        link.linked.length = 0
        link.linked.push(startVertex)
        link.distances.length = 0
        link.traveled = 0
        link.fade = 0
        link.finished = false
    } else {
        link = {
            length: Math.min(numPoints, 4),
            verts: [startVertex],
            stage: 0,
            linked: [startVertex],
            distances: [],
            traveled: 0,
            fade: 0,
            finished: false
        }
    }
    return link
}

function returnLinkToPool(link: StarLink): void {
    if (state.linkPool.length < 20) { // Cap pool size
        state.linkPool.push(link)
    }
}

function renderLink(link: StarLink): void {
    if (!state.context || state.cachedCanvasWidth === 0) return

    switch (link.stage) {
        case 0: // Vertex collection
            const lastIndex = link.verts[link.verts.length - 1]
            if (lastIndex !== undefined) {
                const last = state.particles[lastIndex]
                if (last && last.neighbors && last.neighbors.length > 0) {
                    const neighbor = last.neighbors[(Math.random() * last.neighbors.length) | 0]
                    if (neighbor !== undefined && link.verts.indexOf(neighbor) === -1) {
                        link.verts.push(neighbor)
                    }
                } else {
                    link.stage = 3
                    link.finished = true
                }
            } else {
                link.stage = 3
                link.finished = true
            }

            if (link.verts.length >= link.length) {
                // Calculate distances - use squared distance where possible
                for (let i = 0; i < link.verts.length - 1; i++) {
                    const p1Index = link.verts[i]
                    const p2Index = link.verts[i + 1]
                    if (p1Index !== undefined && p2Index !== undefined) {
                        const p1 = state.particles[p1Index]
                        const p2 = state.particles[p2Index]
                        if (p1 && p2) {
                            const dx = p1.x - p2.x
                            const dy = p1.y - p2.y
                            link.distances.push(Math.sqrt(dx * dx + dy * dy))
                        }
                    }
                }
                link.stage = 1
            }
            break

        case 1: // Render line animation
            if (link.distances.length > 0) {
                state.linkPointsBuffer.length = 0

                // Gather linked points
                for (let i = 0; i < link.linked.length; i++) {
                    const pIndex = link.linked[i]
                    if (pIndex !== undefined) {
                        const p = state.particles[pIndex]
                        if (p) {
                            positionInline(p.x, p.y, p.z)
                            state.linkPointsBuffer.push([state.tempPos.x, state.tempPos.y])
                        }
                    }
                }

                link.traveled += state.cachedLinkSpeed
                const d = link.distances[link.linked.length - 1]

                if (d !== undefined && link.traveled >= d) {
                    link.traveled = 0
                    const nextVertIndex = link.verts[link.linked.length]
                    if (nextVertIndex !== undefined) {
                        link.linked.push(nextVertIndex)
                        const pIndex = link.linked[link.linked.length - 1]
                        if (pIndex !== undefined) {
                            const p = state.particles[pIndex]
                            if (p) {
                                positionInline(p.x, p.y, p.z)
                                state.linkPointsBuffer.push([state.tempPos.x, state.tempPos.y])
                            }
                        }
                    }

                    if (link.linked.length >= link.verts.length) {
                        link.stage = 2
                    }
                } else if (d !== undefined) {
                    // Interpolate position
                    const aIndex = link.linked[link.linked.length - 1]
                    const bIndex = link.verts[link.linked.length]
                    if (aIndex !== undefined && bIndex !== undefined) {
                        const a = state.particles[aIndex]
                        const b = state.particles[bIndex]
                        if (a && b) {
                            const t = d - link.traveled
                            const invD = 1 / d
                            const x = (link.traveled * b.x + t * a.x) * invD
                            const y = (link.traveled * b.y + t * a.y) * invD
                            const z = (link.traveled * b.z + t * a.z) * invD

                            positionInline(x, y, z)
                            state.linkPointsBuffer.push([state.tempPos.x, state.tempPos.y])
                        }
                    }
                }

                drawLinkLine(state.linkPointsBuffer, state.cachedLinkOpacity)
            } else {
                link.stage = 3
                link.finished = true
            }
            break

        case 2: // Fade out
            if (link.verts.length > 1) {
                if (link.fade < 90) {
                    link.fade++
                    state.linkPointsBuffer.length = 0
                    const alpha = (1 - (link.fade / 90)) * state.cachedLinkOpacity

                    for (let i = 0; i < link.verts.length; i++) {
                        const pIndex = link.verts[i]
                        if (pIndex !== undefined) {
                            const p = state.particles[pIndex]
                            if (p) {
                                positionInline(p.x, p.y, p.z)
                                state.linkPointsBuffer.push([state.tempPos.x, state.tempPos.y])
                            }
                        }
                    }
                    drawLinkLine(state.linkPointsBuffer, alpha)
                } else {
                    link.stage = 3
                    link.finished = true
                }
            } else {
                link.stage = 3
                link.finished = true
            }
            break

        default:
            link.finished = true
            break
    }
}

function drawLinkLine(points: [number, number][], alpha: number): void {
    if (!state.context || points.length <= 1 || alpha <= 0) return

    state.context.globalAlpha = alpha
    state.context.beginPath()

    // Use a single path for all line segments
    const first = points[0]
    if (first) {
        state.context.moveTo(first[0], first[1])
        for (let i = 1; i < points.length; i++) {
            const point = points[i]
            if (point) {
                state.context.lineTo(point[0], point[1])
            }
        }
    }

    state.context.stroke()
}

function updateMousePosition(): void {
    // Smooth interpolation between current and target mouse position
    state.mouse.x += (state.targetMouse.x - state.mouse.x) * mouseLerp
    state.mouse.y += (state.targetMouse.y - state.mouse.y) * mouseLerp
}

function render(): void {
    if (!state.context || !state.isVisible || !state.isCanvasReady) return

    const isLowPower = state.performanceMode && !state.isMouseOver

    // Update smooth mouse position
    updateMousePosition()

    // Update noise position using pre-computed table
    state.n += isLowPower ? 3 : 1
    if (state.n >= NOISE_TABLE_SIZE) state.n = 0
    state.nPos = state.noiseTable[state.n] || { x: 0, y: 0 }

    state.context.clearRect(0, 0, state.cachedCanvasWidth, state.cachedCanvasHeight)

    // Set fill style once for all particles
    state.context.fillStyle = state.cachedStarColor

    // Render particles
    const particleCount = isLowPower ? Math.max(10, props.particleCount >> 1) : props.particleCount
    const pLen = Math.min(particleCount, state.particles.length)
    for (let i = 0; i < pLen; i++) {
        const particle = state.particles[i]
        if (particle) renderParticle(particle)
    }

    // Set stroke style once for all links
    state.context.strokeStyle = state.cachedLinkColor
    state.context.lineWidth = settings.link.lineWidth

    // Create new links
    const linkChance = isLowPower ? props.linkChance << 1 : props.linkChance
    if (((Math.random() * (linkChance + 1)) | 0) === linkChance && state.links.length < 5) {
        const length = ((Math.random() * 3) | 0) + settings.link.lengthMin
        state.links.push(createLink((Math.random() * state.particles.length) | 0, length))
    }

    // Render and clean up links - avoid filter() allocation
    let writeIdx = 0
    for (let i = 0; i < state.links.length; i++) {
        const link = state.links[i]
        if (link) {
            if (!link.finished) {
                renderLink(link)
                state.links[writeIdx++] = link
            } else {
                returnLinkToPool(link)
            }
        }
    }
    state.links.length = writeIdx

    // Set fill style for flares
    state.context.fillStyle = state.cachedFlareColor

    // Render flares
    const flareCount = isLowPower ? Math.max(2, props.flareCount >> 2) : props.flareCount
    const fLen = Math.min(flareCount, state.flares.length)
    for (let j = 0; j < fLen; j++) {
        const flare = state.flares[j]
        if (flare) renderFlare(flare)
    }

    // Reset globalAlpha at end
    state.context.globalAlpha = 1
}

function animate(currentTime = 0): void {
    if (!state.isVisible) return

    // Throttle animation based on performance and visibility
    const elapsed = currentTime - state.lastFrameTime
    const targetInterval = (state.performanceMode && !state.isMouseOver) ? frameInterval << 1 : frameInterval

    if (elapsed >= targetInterval) {
        render()
        state.lastFrameTime = currentTime
    }

    state.animationFrame = requestAnimationFrame(animate)
}

function updateCachedRect(): void {
    if (!starsCanvas.value) return
    state.cachedRect = starsCanvas.value.getBoundingClientRect()
    state.cachedScaleX = starsCanvas.value.clientWidth / state.cachedRect.width
    state.cachedScaleY = starsCanvas.value.clientHeight / state.cachedRect.height
}

function handleMouseMove(e: MouseEvent): void {
    if (!state.cachedRect) return
    // Set target position instead of directly updating mouse position
    state.targetMouse.x = (e.clientX - state.cachedRect.left) * state.cachedScaleX
    state.targetMouse.y = (e.clientY - state.cachedRect.top) * state.cachedScaleY
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
    if (state.resizeTimeout) {
        clearTimeout(state.resizeTimeout)
    }

    state.resizeTimeout = window.setTimeout(() => {
        resize()
        updateCachedRect()
        render()
        state.resizeTimeout = null
    }, 50)
}

function handleVisibilityChange(): void {
    state.isVisible = !document.hidden

    if (state.isVisible) {
        // Resume animation when tab becomes visible
        state.lastFrameTime = performance.now()
        animate()
    } else {
        // Pause animation when tab is hidden
        if (state.animationFrame) {
            cancelAnimationFrame(state.animationFrame)
        }
    }
}

function init(): void {
    if (!starsCanvas.value) return

    state.context = starsCanvas.value.getContext('2d', { alpha: true })
    if (!state.context) return

    // Initialize noise table and cached colors
    initNoiseTable()
    updateCachedColors()
    state.cachedMotion = props.motion

    // Initial resize with a small delay to ensure DOM is ready
    setTimeout(() => {
        resize()
        updateCachedRect()
        if (state.isCanvasReady) animate()
    }, 50)

    // Fallback: ensure animation starts after a longer delay
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

    // Create particles
    state.particles = []
    for (let i = 0; i < props.particleCount; i++) {
        state.particles.push(createParticle())
    }
    createNeighbors()

    // Create flares
    state.flares = []
    for (let i = 0; i < props.flareCount; i++) {
        state.flares.push(createFlare())
    }
}

// Watch for theme changes
watch(currentTheme, () => {
    updateCachedColors()
    updateFlareOpacities()
    render()
}, { immediate: false })

onMounted(() => {
    if (!starsCanvas.value) return

    init()

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true })

    // Enhanced resize observer that handles zoom better
    if (window.ResizeObserver && starsCanvas.value.parentElement) {
        state.resizeObserver = new ResizeObserver(() => {
            handleResize() // Use the debounced resize function
        })

        state.resizeObserver.observe(starsCanvas.value.parentElement)
    }

    // Auto-detect performance mode based on device capabilities
    state.performanceMode = (navigator.hardwareConcurrency || 4) < 4

    // Visibility observer
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

    // Cleanup animation and timers
    if (state.animationFrame) cancelAnimationFrame(state.animationFrame)
    if (state.resizeTimeout) clearTimeout(state.resizeTimeout)

    // Cleanup observers
    state.resizeObserver?.disconnect()
    state.intersectionObserver?.disconnect()

    // Remove event listeners
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', handleResize)
    document.removeEventListener('visibilitychange', handleVisibilityChange)

    // Clear memory
    state.particles.length = 0
    state.flares.length = 0
    state.links.length = 0
    state.linkPool.length = 0
    state.noiseTable.length = 0
    state.context = null
    state.cachedRect = null
})
</script>
