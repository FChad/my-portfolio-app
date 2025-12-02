<template>
    <canvas ref="starsCanvas" class="absolute inset-0 w-full h-full transition-opacity " :class="canvasClass"
        :style="{ opacity: isCanvasVisible ? '' : '0' }" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from 'vue'

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
let context: CanvasRenderingContext2D | null = null
let animationFrame: number
let resizeTimeout: number | null = null
let resizeObserver: ResizeObserver | null = null

// Canvas and performance state
let isVisible = true
let isMouseOver = false
let performanceMode = false
let lastFrameTime = 0
let isCanvasReady = false
const frameInterval = 1000 / 60 // 60 FPS

// Color mode integration
const colorMode = useColorMode()
const currentTheme = computed(() => colorMode.value)

// Animation state
const mouse = { x: 0, y: 0 }
const targetMouse = { x: 0, y: 0 }
const mouseLerp = 0.08 // Smoothing factor (0.01 = very smooth, 0.1 = responsive)
let particles: StarParticle[] = []
let flares: StarFlare[] = []
let links: StarLink[] = []
let n = 0
let nPos = { x: 0, y: 0 }

// Pre-computed values (updated on resize/theme change)
let cachedSizeRatio = 800
let cachedCanvasWidth = 0
let cachedCanvasHeight = 0
let cachedHalfWidth = 0
let cachedHalfHeight = 0
let cachedLinkSpeed = 0
let cachedStarColor = '#60A5FA'
let cachedLinkColor = '#3B82F6'
let cachedFlareColor = '#DBEAFE'
let cachedLinkOpacity = 0.25

// Reusable position object to avoid allocations
const tempPos = { x: 0, y: 0 }

// Pre-computed noise table for better performance
const noiseTable: { x: number; y: number }[] = []
const NOISE_TABLE_SIZE = 1000

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
    particle: {
        sizeBase: 1,
        sizeMultiplier: 0.5,
        flickerSmoothing: 15
    },
    flare: {
        sizeBase: 100,
        sizeMultiplier: 100
    },
    link: {
        lineWidth: 1,
        lengthMin: 5,
        lengthMax: 7,
        fade: 90,
        speed: 1
    },
    noise: {
        strength: 1,
        radius: 100
    }
}

// Initialize noise table once
function initNoiseTable(): void {
    const angleStep = Math.PI * 2 / NOISE_TABLE_SIZE
    for (let i = 0; i < NOISE_TABLE_SIZE; i++) {
        const a = angleStep * i
        noiseTable[i] = {
            x: settings.noise.radius * Math.cos(a),
            y: settings.noise.radius * Math.sin(a)
        }
    }
}

// Update cached theme colors
function updateCachedColors(): void {
    const theme = currentTheme.value === 'dark' ? 'dark' : 'light'
    cachedStarColor = settings.themes[theme].starColor
    cachedLinkColor = settings.themes[theme].linkColor
    cachedFlareColor = settings.themes[theme].flareColor
    cachedLinkOpacity = settings.themes[theme].linkOpacity
}

// Simplified neighbor assignment for particle connections
function createNeighbors(): void {
    const maxDistanceSq = 0.09 // 0.3 squared - avoid sqrt

    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i]
        if (!particle) continue

        particle.neighbors = []

        for (let j = 0; j < particles.length; j++) {
            if (i === j) continue

            const other = particles[j]
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
    for (let i = 0; i < flares.length; i++) {
        const flare = flares[i]
        if (flare) {
            flare.opacity = Math.random() * (opacityRange.max - opacityRange.min) + opacityRange.min
        }
    }
}

function resize(): void {
    if (!starsCanvas.value || !context) return

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
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.scale(dpr, dpr)

    // Update cached dimensions
    cachedCanvasWidth = newWidth
    cachedCanvasHeight = newHeight
    cachedHalfWidth = newWidth * 0.5
    cachedHalfHeight = newHeight * 0.5
    cachedSizeRatio = Math.max(newWidth, newHeight) || 800
    cachedLinkSpeed = settings.link.speed * 0.00001 * newWidth

    // Reset mouse position to center
    mouse.x = newWidth * 0.5
    mouse.y = newHeight * 0.5
    targetMouse.x = mouse.x
    targetMouse.y = mouse.y

    context.clearRect(0, 0, pixelWidth, pixelHeight)

    // Mark canvas as ready after first proper resize
    if (newWidth > 0 && newHeight > 0) {
        isCanvasReady = true
        // Start fade-in animation with a small delay to ensure smooth transition
        setTimeout(() => {
            isCanvasVisible.value = true
        }, 100)
    }
}

// Optimized position calculation using cached values - modifies tempPos in place
function positionInline(x: number, y: number, z: number): void {
    const noiseX = (nPos.x - 0.5) * settings.noise.strength
    const noiseY = (nPos.y - 0.5) * settings.noise.strength

    tempPos.x = (x * cachedCanvasWidth) + (((cachedHalfWidth - mouse.x + noiseX) * z) * props.motion)
    tempPos.y = (y * cachedCanvasHeight) + (((cachedHalfHeight - mouse.y + noiseY) * z) * props.motion)
}

// Pre-computed constants
const TWO_PI = Math.PI * 2
const SIZE_DIVISOR = 0.001

// Render a single particle - optimized to avoid class method overhead
function renderParticle(p: StarParticle): void {
    if (!context) return

    positionInline(p.x, p.y, p.z)
    const r = ((p.z * settings.particle.sizeMultiplier) + settings.particle.sizeBase) * cachedSizeRatio * SIZE_DIVISOR

    // Flicker effect - simplified
    const flickerRate = performanceMode ? 30 : 15
    const newVal = Math.random() - 0.5
    p.flicker += (newVal - p.flicker) / flickerRate

    // Clamp flicker and calculate final opacity
    if (p.flicker < -0.5) p.flicker = -0.5
    else if (p.flicker > 0.5) p.flicker = 0.5

    let o = p.opacity + p.flicker
    if (o < 0) o = 0
    else if (o > 1) o = 1

    context.globalAlpha = o
    context.beginPath()
    context.arc(tempPos.x, tempPos.y, r, 0, TWO_PI)
    context.fill()
}

// Render a single flare - optimized
function renderFlare(f: StarFlare): void {
    if (!context) return

    positionInline(f.x, f.y, f.z)
    const r = ((f.z * settings.flare.sizeMultiplier) + settings.flare.sizeBase) * cachedSizeRatio * SIZE_DIVISOR

    context.globalAlpha = f.opacity
    context.beginPath()
    context.arc(tempPos.x, tempPos.y, r, 0, TWO_PI)
    context.fill()
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

// Reusable arrays for link points to avoid allocations
const linkPointsBuffer: [number, number][] = []

// Link object pool for reuse
const linkPool: StarLink[] = []

function createLink(startVertex: number, numPoints: number): StarLink {
    // Try to reuse from pool
    let link = linkPool.pop()
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
    if (linkPool.length < 20) { // Cap pool size
        linkPool.push(link)
    }
}

function renderLink(link: StarLink): void {
    if (!context || cachedCanvasWidth === 0) return

    switch (link.stage) {
        case 0: // Vertex collection
            const lastIndex = link.verts[link.verts.length - 1]
            if (lastIndex !== undefined) {
                const last = particles[lastIndex]
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
                        const p1 = particles[p1Index]
                        const p2 = particles[p2Index]
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
                linkPointsBuffer.length = 0

                // Gather linked points
                for (let i = 0; i < link.linked.length; i++) {
                    const pIndex = link.linked[i]
                    if (pIndex !== undefined) {
                        const p = particles[pIndex]
                        if (p) {
                            positionInline(p.x, p.y, p.z)
                            linkPointsBuffer.push([tempPos.x, tempPos.y])
                        }
                    }
                }

                link.traveled += cachedLinkSpeed
                const d = link.distances[link.linked.length - 1]

                if (d !== undefined && link.traveled >= d) {
                    link.traveled = 0
                    const nextVertIndex = link.verts[link.linked.length]
                    if (nextVertIndex !== undefined) {
                        link.linked.push(nextVertIndex)
                        const pIndex = link.linked[link.linked.length - 1]
                        if (pIndex !== undefined) {
                            const p = particles[pIndex]
                            if (p) {
                                positionInline(p.x, p.y, p.z)
                                linkPointsBuffer.push([tempPos.x, tempPos.y])
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
                        const a = particles[aIndex]
                        const b = particles[bIndex]
                        if (a && b) {
                            const t = d - link.traveled
                            const invD = 1 / d
                            const x = (link.traveled * b.x + t * a.x) * invD
                            const y = (link.traveled * b.y + t * a.y) * invD
                            const z = (link.traveled * b.z + t * a.z) * invD

                            positionInline(x, y, z)
                            linkPointsBuffer.push([tempPos.x, tempPos.y])
                        }
                    }
                }

                drawLinkLine(linkPointsBuffer, cachedLinkOpacity)
            } else {
                link.stage = 3
                link.finished = true
            }
            break

        case 2: // Fade out
            if (link.verts.length > 1) {
                if (link.fade < settings.link.fade) {
                    link.fade++
                    linkPointsBuffer.length = 0
                    const alpha = (1 - (link.fade / settings.link.fade)) * cachedLinkOpacity

                    for (let i = 0; i < link.verts.length; i++) {
                        const pIndex = link.verts[i]
                        if (pIndex !== undefined) {
                            const p = particles[pIndex]
                            if (p) {
                                positionInline(p.x, p.y, p.z)
                                linkPointsBuffer.push([tempPos.x, tempPos.y])
                            }
                        }
                    }
                    drawLinkLine(linkPointsBuffer, alpha)
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
    if (!context || points.length <= 1 || alpha <= 0) return

    context.globalAlpha = alpha
    context.beginPath()

    // Use a single path for all line segments
    const first = points[0]
    if (first) {
        context.moveTo(first[0], first[1])
        for (let i = 1; i < points.length; i++) {
            const point = points[i]
            if (point) {
                context.lineTo(point[0], point[1])
            }
        }
    }

    context.stroke()
}

function startLink(vertex: number, length: number): void {
    links.push(createLink(vertex, length))
}

function updateMousePosition(): void {
    // Smooth interpolation between current and target mouse position
    mouse.x += (targetMouse.x - mouse.x) * mouseLerp
    mouse.y += (targetMouse.y - mouse.y) * mouseLerp
}

function render(): void {
    if (!context || !isVisible || !isCanvasReady) return

    const isLowPower = performanceMode && !isMouseOver

    // Update smooth mouse position
    updateMousePosition()

    // Update noise position using pre-computed table
    n += isLowPower ? 3 : 1
    if (n >= NOISE_TABLE_SIZE) n = 0
    nPos = noiseTable[n] || { x: 0, y: 0 }

    context.clearRect(0, 0, cachedCanvasWidth, cachedCanvasHeight)

    // Set fill style once for all particles
    context.fillStyle = cachedStarColor

    // Render particles
    const particleCount = isLowPower ? Math.max(10, props.particleCount >> 1) : props.particleCount
    const pLen = Math.min(particleCount, particles.length)
    for (let i = 0; i < pLen; i++) {
        const particle = particles[i]
        if (particle) renderParticle(particle)
    }

    // Set stroke style once for all links
    context.strokeStyle = cachedLinkColor
    context.lineWidth = settings.link.lineWidth

    // Create new links
    const linkChance = isLowPower ? props.linkChance << 1 : props.linkChance
    if (((Math.random() * (linkChance + 1)) | 0) === linkChance && links.length < 5) {
        const length = ((Math.random() * 3) | 0) + settings.link.lengthMin
        startLink((Math.random() * particles.length) | 0, length)
    }

    // Render and clean up links - avoid filter() allocation
    let writeIdx = 0
    for (let i = 0; i < links.length; i++) {
        const link = links[i]
        if (link) {
            if (!link.finished) {
                renderLink(link)
                links[writeIdx++] = link
            } else {
                returnLinkToPool(link)
            }
        }
    }
    links.length = writeIdx

    // Set fill style for flares
    context.fillStyle = cachedFlareColor

    // Render flares
    const flareCount = isLowPower ? Math.max(2, props.flareCount >> 2) : props.flareCount
    const fLen = Math.min(flareCount, flares.length)
    for (let j = 0; j < fLen; j++) {
        const flare = flares[j]
        if (flare) renderFlare(flare)
    }

    // Reset globalAlpha at end
    context.globalAlpha = 1
}

function animate(currentTime = 0): void {
    if (!isVisible) return

    // Throttle animation based on performance and visibility
    const elapsed = currentTime - lastFrameTime
    const targetInterval = (performanceMode && !isMouseOver) ? frameInterval << 1 : frameInterval

    if (elapsed >= targetInterval) {
        render()
        lastFrameTime = currentTime
    }

    animationFrame = requestAnimationFrame(animate)
}

function forceRender(): void {
    if (context && starsCanvas.value) {
        render()
    }
}

function handleMouseMove(e: MouseEvent): void {
    if (!starsCanvas.value) return
    const rect = starsCanvas.value.getBoundingClientRect()
    const scaleX = starsCanvas.value.clientWidth / rect.width
    const scaleY = starsCanvas.value.clientHeight / rect.height
    // Set target position instead of directly updating mouse position
    targetMouse.x = (e.clientX - rect.left) * scaleX
    targetMouse.y = (e.clientY - rect.top) * scaleY
}

function onMouseEnter(): void {
    isMouseOver = true
    performanceMode = false
}

function onMouseLeave(): void {
    isMouseOver = false
    setTimeout(() => {
        if (!isMouseOver) {
            performanceMode = true
        }
    }, 2000)
}

function handleResize(): void {
    if (resizeTimeout) {
        clearTimeout(resizeTimeout)
    }

    resizeTimeout = window.setTimeout(() => {
        resize()
        forceRender()
        resizeTimeout = null
    }, 50)
}



function handleVisibilityChange(): void {
    isVisible = !document.hidden

    if (isVisible) {
        // Resume animation when tab becomes visible
        lastFrameTime = performance.now()
        animate()
    } else {
        // Pause animation when tab is hidden
        if (animationFrame) {
            cancelAnimationFrame(animationFrame)
        }
    }
}

function init(): void {
    if (!starsCanvas.value) return

    // Use alpha: false for better performance if we always clear the canvas
    context = starsCanvas.value.getContext('2d', { alpha: true })
    if (!context) return

    // Initialize noise table
    initNoiseTable()

    // Initialize cached colors
    updateCachedColors()

    // Initial resize with a small delay to ensure DOM is ready
    setTimeout(() => {
        resize()
        // Start animation only after canvas is properly sized
        if (isCanvasReady) {
            animate()
        }
    }, 50)

    // Fallback: ensure animation starts after a longer delay
    setTimeout(() => {
        if (!animationFrame && starsCanvas.value && starsCanvas.value.clientWidth > 0) {
            isCanvasReady = true
            animate()
        }
    }, 200)

    mouse.x = starsCanvas.value.clientWidth * 0.5
    mouse.y = starsCanvas.value.clientHeight * 0.5
    targetMouse.x = mouse.x
    targetMouse.y = mouse.y

    // Create particles using factory function
    particles = []
    for (let i = 0; i < props.particleCount; i++) {
        particles.push(createParticle())
    }

    // Set up particle neighbors with simplified algorithm
    createNeighbors()

    // Create flares using factory function
    flares = []
    for (let i = 0; i < props.flareCount; i++) {
        flares.push(createFlare())
    }

    // Animation will be started after resize in setTimeout above
}

// Watch for theme changes and force re-render
watch(currentTheme, () => {
    nextTick(() => {
        updateCachedColors()
        updateFlareOpacities()
        forceRender()
    })
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
        resizeObserver = new ResizeObserver(() => {
            handleResize() // Use the debounced resize function
        })

        resizeObserver.observe(starsCanvas.value.parentElement)
    }

    // Auto-detect performance mode based on device capabilities
    performanceMode = (navigator.hardwareConcurrency || 4) < 4

    // Visibility observer
    if (window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0]
            if (!entry) return

            const wasVisible = isVisible
            isVisible = entry.isIntersecting

            if (isVisible && !wasVisible) {
                lastFrameTime = performance.now()
                animate()
            }
        }, { threshold: 0.1 })

        observer.observe(starsCanvas.value)
            ; (starsCanvas.value as any).__observer = observer
    }
})

onUnmounted(() => {
    isVisible = false
    isCanvasVisible.value = false

    // Cleanup animation and timers
    if (animationFrame) cancelAnimationFrame(animationFrame)
    if (resizeTimeout) clearTimeout(resizeTimeout)

    // Cleanup observers
    resizeObserver?.disconnect()

    const canvas = starsCanvas.value
    if (canvas) {
        const observer = (canvas as any).__observer
        observer?.disconnect()
    }

    // Remove event listeners
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', handleResize)
    document.removeEventListener('visibilitychange', handleVisibilityChange)

    // Clear memory
    particles.length = 0
    flares.length = 0
    links.length = 0
})
</script>
