<template>
    <canvas ref="starsCanvas" class="absolute inset-0 w-full h-full block" :class="canvasClass"
        @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" />
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
    render(): void
}

interface StarFlare {
    x: number
    y: number
    z: number
    opacity: number
    render(): void
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
    render(): void
    drawLine(points: [number, number][], alpha?: number): void
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

// Direct theme color access

// Settings configuration
const settings = {
    themes: {
        light: {
            starColor: '#1E40AF',
            linkColor: '#2563EB',
            flareColor: '#3B82F6',
            linkOpacity: 0.4
        },
        dark: {
            starColor: '#60A5FA',
            linkColor: '#3B82F6',
            flareColor: '#DBEAFE',
            linkOpacity: 0.25
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
        length: 1000,
        strength: 1,
        angle: Math.PI * 2 / 1000,
        radius: 100
    }
}

// Simplified neighbor assignment for particle connections
function createNeighbors(): void {
    const maxDistance = 0.3 // Maximum distance for neighbors

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
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < maxDistance) {
                particle.neighbors.push(j)
            }
        }
    }
}

function isDarkMode(): boolean {
    return currentTheme.value === 'dark'
}

function getStarColor(): string {
    const theme = isDarkMode() ? 'dark' : 'light'
    return settings.themes[theme].starColor
}

function getLinkColor(): string {
    const theme = isDarkMode() ? 'dark' : 'light'
    return settings.themes[theme].linkColor
}

function getFlareColor(): string {
    const theme = isDarkMode() ? 'dark' : 'light'
    return settings.themes[theme].flareColor
}

function getCurrentLinkOpacity(): number {
    const theme = isDarkMode() ? 'dark' : 'light'
    return settings.themes[theme].linkOpacity
}

function random(min: number, max: number, float: boolean = false): number {
    return float
        ? Math.random() * (max - min) + min
        : Math.floor(Math.random() * (max - min + 1)) + min
}

function resize(): void {
    if (!starsCanvas.value || !context) return

    const canvas = starsCanvas.value
    const parent = canvas.parentElement
    if (!parent) return

    const parentRect = parent.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    const newWidth = Math.round(parentRect.width)
    const newHeight = Math.round(parentRect.height)

    // Set canvas internal resolution (for drawing)
    const pixelWidth = Math.round(newWidth * dpr)
    const pixelHeight = Math.round(newHeight * dpr)

    canvas.width = pixelWidth
    canvas.height = pixelHeight

    // Set canvas display size (CSS pixels)
    canvas.style.width = newWidth + 'px'
    canvas.style.height = newHeight + 'px'

    // Reset and scale context for high DPI
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.scale(dpr, dpr)

    // Reset mouse position to center
    mouse.x = newWidth / 2
    mouse.y = newHeight / 2
    targetMouse.x = mouse.x
    targetMouse.y = mouse.y

    context.clearRect(0, 0, pixelWidth, pixelHeight)
    
    // Mark canvas as ready after first proper resize
    if (newWidth > 0 && newHeight > 0) {
        isCanvasReady = true
    }
}

function position(x: number, y: number, z: number): { x: number; y: number } {
    if (!starsCanvas.value) return { x: 0, y: 0 }

    const canvas = starsCanvas.value
    return {
        x: (x * canvas.clientWidth) + ((((canvas.clientWidth / 2) - mouse.x + ((nPos.x - 0.5) * settings.noise.strength)) * z) * props.motion),
        y: (y * canvas.clientHeight) + ((((canvas.clientHeight / 2) - mouse.y + ((nPos.y - 0.5) * settings.noise.strength)) * z) * props.motion)
    }
}

function sizeRatio(): number {
    if (!starsCanvas.value) return 800 // Reduced fallback size
    // Use CSS dimensions, not internal canvas resolution for consistent sizing
    const canvas = starsCanvas.value
    const width = canvas.clientWidth || canvas.offsetWidth
    const height = canvas.clientHeight || canvas.offsetHeight
    
    // Return reasonable fallback if dimensions are not yet available
    const calculatedSize = Math.max(width, height)
    return calculatedSize > 0 ? calculatedSize : 800
}

function noisePoint(i: number): { x: number; y: number } {
    const a = settings.noise.angle * i
    const cosA = Math.cos(a)
    const sinA = Math.sin(a)
    const rad = settings.noise.radius
    return {
        x: rad * cosA,
        y: rad * sinA
    }
}

class Particle implements StarParticle {
    x: number
    y: number
    z: number
    opacity: number
    flicker: number
    neighbors: number[]

    constructor() {
        this.x = random(-0.1, 1.1, true)
        this.y = random(-0.1, 1.1, true)
        this.z = random(0.5, 4, true) // Minimum z value of 0.5 so all particles respond to mouse
        this.opacity = random(0.1, 1, true)
        this.flicker = 0
        this.neighbors = []
    }

    render(): void {
        if (!context || !starsCanvas.value) return

        const pos = position(this.x, this.y, this.z)
        const r = ((this.z * settings.particle.sizeMultiplier) + settings.particle.sizeBase) * (sizeRatio() / 1000)
        let o = this.opacity

        // Flicker effect
        const flickerRate = performanceMode ? settings.particle.flickerSmoothing * 2 : settings.particle.flickerSmoothing
        const newVal = random(-0.5, 0.5, true)
        this.flicker += (newVal - this.flicker) / flickerRate
        this.flicker = Math.max(-0.5, Math.min(0.5, this.flicker))
        o = Math.max(0, Math.min(1, o + this.flicker))

        context.fillStyle = getStarColor()
        context.globalAlpha = o
        context.beginPath()
        context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false)
        context.fill()

        context.globalAlpha = 1
    }
}

class Flare implements StarFlare {
    x: number
    y: number
    z: number
    opacity: number

    constructor() {
        this.x = random(-0.25, 1.25, true)
        this.y = random(-0.25, 1.25, true)
        this.z = random(0.3, 2, true) // Minimum z value so flares also respond to mouse
        this.opacity = random(0.001, 0.01, true)
    }

    render(): void {
        if (!context) return

        const pos = position(this.x, this.y, this.z)
        const r = ((this.z * settings.flare.sizeMultiplier) + settings.flare.sizeBase) * (sizeRatio() / 1000)

        context.fillStyle = getFlareColor()
        context.globalAlpha = this.opacity
        context.beginPath()
        context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false)
        context.fill()
        context.globalAlpha = 1
    }
}

class Link implements StarLink {
    length: number
    verts: number[]
    stage: number
    linked: number[]
    distances: number[]
    traveled: number
    fade: number
    finished: boolean

    constructor(startVertex: number, numPoints: number) {
        this.length = Math.min(numPoints, 4) // Limit complexity
        this.verts = [startVertex]
        this.stage = 0
        this.linked = [startVertex]
        this.distances = []
        this.traveled = 0
        this.fade = 0
        this.finished = false
    }

    render(): void {
        if (!context || !starsCanvas.value) return

        switch (this.stage) {
            case 0: // Vertex collection
                const lastIndex = this.verts[this.verts.length - 1]
                if (lastIndex !== undefined) {
                    const last = particles[lastIndex]
                    if (last && last.neighbors && last.neighbors.length > 0) {
                        const neighbor = last.neighbors[random(0, last.neighbors.length - 1)]
                        if (neighbor !== undefined && this.verts.indexOf(neighbor) === -1) {
                            this.verts.push(neighbor)
                        }
                    } else {
                        this.stage = 3
                        this.finished = true
                    }
                } else {
                    this.stage = 3
                    this.finished = true
                }

                if (this.verts.length >= this.length) {
                    // Calculate distances
                    for (let i = 0; i < this.verts.length - 1; i++) {
                        const p1Index = this.verts[i]
                        const p2Index = this.verts[i + 1]
                        if (p1Index !== undefined && p2Index !== undefined) {
                            const p1 = particles[p1Index]
                            const p2 = particles[p2Index]
                            if (p1 && p2) {
                                const dx = p1.x - p2.x
                                const dy = p1.y - p2.y
                                const dist = Math.sqrt(dx * dx + dy * dy)
                                this.distances.push(dist)
                            }
                        }
                    }
                    this.stage = 1
                }
                break

            case 1: // Render line animation
                if (this.distances.length > 0) {
                    const linkPoints: [number, number][] = []

                    // Gather linked points
                    for (let i = 0; i < this.linked.length; i++) {
                        const pIndex = this.linked[i]
                        if (pIndex !== undefined) {
                            const p = particles[pIndex]
                            if (p) {
                                const pos = position(p.x, p.y, p.z)
                                linkPoints.push([pos.x, pos.y])
                            }
                        }
                    }

                    const linkSpeedRel = settings.link.speed * 0.00001 * starsCanvas.value.width
                    this.traveled += linkSpeedRel
                    const d = this.distances[this.linked.length - 1]

                    if (d !== undefined && this.traveled >= d) {
                        this.traveled = 0
                        const nextVertIndex = this.verts[this.linked.length]
                        if (nextVertIndex !== undefined) {
                            this.linked.push(nextVertIndex)
                            const pIndex = this.linked[this.linked.length - 1]
                            if (pIndex !== undefined) {
                                const p = particles[pIndex]
                                if (p) {
                                    const pos = position(p.x, p.y, p.z)
                                    linkPoints.push([pos.x, pos.y])
                                }
                            }
                        }

                        if (this.linked.length >= this.verts.length) {
                            this.stage = 2
                        }
                    } else if (d !== undefined) {
                        // Interpolate position
                        const aIndex = this.linked[this.linked.length - 1]
                        const bIndex = this.verts[this.linked.length]
                        if (aIndex !== undefined && bIndex !== undefined) {
                            const a = particles[aIndex]
                            const b = particles[bIndex]
                            if (a && b) {
                                const t = d - this.traveled
                                const x = ((this.traveled * b.x) + (t * a.x)) / d
                                const y = ((this.traveled * b.y) + (t * a.y)) / d
                                const z = ((this.traveled * b.z) + (t * a.z)) / d

                                const pos = position(x, y, z)
                                linkPoints.push([pos.x, pos.y])
                            }
                        }
                    }

                    this.drawLine(linkPoints)
                } else {
                    this.stage = 3
                    this.finished = true
                }
                break

            case 2: // Fade out
                if (this.verts.length > 1) {
                    if (this.fade < settings.link.fade) {
                        this.fade++
                        const linkPoints: [number, number][] = []
                        const alpha = (1 - (this.fade / settings.link.fade)) * getCurrentLinkOpacity()

                        for (let i = 0; i < this.verts.length; i++) {
                            const pIndex = this.verts[i]
                            if (pIndex !== undefined) {
                                const p = particles[pIndex]
                                if (p) {
                                    const pos = position(p.x, p.y, p.z)
                                    linkPoints.push([pos.x, pos.y])
                                }
                            }
                        }
                        this.drawLine(linkPoints, alpha)
                    } else {
                        this.stage = 3
                        this.finished = true
                    }
                } else {
                    this.stage = 3
                    this.finished = true
                }
                break

            default:
                this.finished = true
                break
        }
    }

    drawLine(linkPoints: [number, number][], alpha: number = getCurrentLinkOpacity()): void {
        if (!context || linkPoints.length <= 1 || alpha <= 0) return

        context.globalAlpha = alpha
        context.beginPath()
        for (let i = 0; i < linkPoints.length - 1; i++) {
            const current = linkPoints[i]
            const next = linkPoints[i + 1]
            if (current && next) {
                context.moveTo(current[0], current[1])
                context.lineTo(next[0], next[1])
            }
        }
        context.strokeStyle = getLinkColor()
        context.lineWidth = settings.link.lineWidth
        context.stroke()
        context.closePath()
        context.globalAlpha = 1
    }
}

function startLink(vertex: number, length: number): void {
    links.push(new Link(vertex, length))
}

function updateMousePosition(): void {
    // Smooth interpolation between current and target mouse position
    mouse.x += (targetMouse.x - mouse.x) * mouseLerp
    mouse.y += (targetMouse.y - mouse.y) * mouseLerp
}

function render(): void {
    if (!context || !starsCanvas.value || !isVisible || !isCanvasReady) return

    const isLowPower = performanceMode && !isMouseOver

    // Update smooth mouse position
    updateMousePosition()

    // Update noise position
    n += isLowPower ? 3 : 1
    if (n >= settings.noise.length) n = 0
    nPos = noisePoint(n)

    const canvas = starsCanvas.value
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    // Render particles
    const particleCount = isLowPower ? Math.max(10, props.particleCount >> 1) : props.particleCount
    for (let i = 0; i < particleCount && i < particles.length; i++) {
        particles[i]?.render()
    }

    // Create new links
    const linkChance = isLowPower ? props.linkChance << 1 : props.linkChance
    if (random(0, linkChance) === linkChance && links.length < 5) {
        const length = random(settings.link.lengthMin, settings.link.lengthMax)
        startLink(random(0, particles.length - 1), length)
    }

    // Render and clean up links
    links = links.filter(link => {
        if (!link.finished) {
            link.render()
            return true
        }
        return false
    })

    // Render flares
    const flareCount = isLowPower ? Math.max(2, props.flareCount >> 2) : props.flareCount
    for (let j = 0; j < flareCount && j < flares.length; j++) {
        flares[j]?.render()
    }
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

    context = starsCanvas.value.getContext('2d')
    if (!context) return

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

    mouse.x = starsCanvas.value.clientWidth / 2
    mouse.y = starsCanvas.value.clientHeight / 2
    targetMouse.x = mouse.x
    targetMouse.y = mouse.y

    // Create particles
    particles = []
    for (let i = 0; i < props.particleCount; i++) {
        particles.push(new Particle())
    }

    // Set up particle neighbors with simplified algorithm
    createNeighbors()

    // Create flares
    flares = []
    for (let i = 0; i < props.flareCount; i++) {
        flares.push(new Flare())
    }

    // Animation will be started after resize in setTimeout above
}

// Watch for theme changes and force re-render
watch(currentTheme, () => {
    nextTick(() => {
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
