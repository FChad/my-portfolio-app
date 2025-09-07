<template>
    <canvas ref="starsCanvas" class="absolute inset-0 w-full h-full block" :class="canvasClass"
        style="width: 100% !important; height: 100% !important;"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'

interface StarParticle {
    x: number
    y: number
    z: number
    color: string
    opacity: number
    flicker: number
    neighbors: number[]
    render(): void
}

interface StarFlare {
    x: number
    y: number
    z: number
    color: string
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
    tilt?: number
    linkChance?: number
    canvasClass?: string
}

const props = withDefaults(defineProps<Props>(), {
    particleCount: 40,
    flareCount: 10,
    motion: 0.05,
    tilt: 0.05,
    linkChance: 75,
    canvasClass: 'z-0'
})

const starsCanvas = ref<HTMLCanvasElement>()
let context: CanvasRenderingContext2D | null = null
let animationFrame: number
let resizeTimeout: number | null = null
let resizeObserver: ResizeObserver | null = null

// Color mode integration
const colorMode = useColorMode()
const currentTheme = computed(() => colorMode.value)

// Animation variables
let mouse = { x: 0, y: 0 }
let particles: StarParticle[] = []
let flares: StarFlare[] = []
let links: StarLink[] = []
let vertices: number[] = []
let triangles: number[][] = []
let points: [number, number][] = []
let n = 0
let nPos = { x: 0, y: 0 }

// Settings - adapted to your color scheme with theme support
const settings = {
    light: {
        starColor: '#1E40AF',      // blue-800 - viel dunkler für bessere Sichtbarkeit
        linkColor: '#2563EB',      // blue-600 - dunkler für Kontrast
        flareColor: '#3B82F6',     // blue-500 - dunkler als vorher
        backgroundColor: 'rgba(30, 64, 175, 0.08)', // stärkere blaue Tönung
        linkOpacity: 0.4           // höhere Opacity für bessere Sichtbarkeit
    },
    dark: {
        starColor: '#60A5FA',      // blue-400
        linkColor: '#3B82F6',      // blue-500
        flareColor: '#DBEAFE',     // blue-100
        backgroundColor: 'rgba(59, 130, 246, 0.05)', // slightly more visible blue tint
        linkOpacity: 0.25          // ursprüngliche Opacity für dark mode
    },
    particleSizeBase: 1,
    particleSizeMultiplier: 0.5,
    flareSizeBase: 100,
    flareSizeMultiplier: 100,
    lineWidth: 1,
    linkLengthMin: 5,
    linkLengthMax: 7,
    linkOpacity: 0.25,
    linkFade: 90,
    linkSpeed: 1,
    glareAngle: -60,
    glareOpacityMultiplier: 0.01,
    flickerSmoothing: 15,
    noiseLength: 1000,
    noiseStrength: 1,
    nAngle: (Math.PI * 2) / 1000,
    nRad: 100,
    nScale: 0.5
}

// Delaunay triangulation implementation (simplified)
const Delaunay = {
    triangulate(points: [number, number][]): number[] {
        // Simplified triangulation - in a real implementation, you'd use a proper Delaunay algorithm
        const vertices: number[] = []
        for (let i = 0; i < points.length - 2; i++) {
            vertices.push(i, i + 1, i + 2)
        }
        return vertices
    }
}

function isDarkMode(): boolean {
    return currentTheme.value === 'dark'
}

function getCurrentColors() {
    return isDarkMode() ? settings.dark : settings.light
}

function getStarColor(): string {
    return getCurrentColors().starColor
}

function getLinkColor(): string {
    return getCurrentColors().linkColor
}

function getFlareColor(): string {
    return getCurrentColors().flareColor
}

function getCurrentLinkOpacity(): number {
    return getCurrentColors().linkOpacity
}

function random(min: number, max: number, float: boolean = false): number {
    return float
        ? Math.random() * (max - min) + min
        : Math.floor(Math.random() * (max - min + 1)) + min
}

function resize(): void {
    if (!starsCanvas.value || !context) return

    const canvas = starsCanvas.value

    // Force the canvas to take the full container size
    const parent = canvas.parentElement
    if (!parent) return

    const parentRect = parent.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    // Set canvas internal resolution (for drawing)
    canvas.width = parentRect.width * dpr
    canvas.height = parentRect.height * dpr

    // Set canvas display size (CSS pixels)
    canvas.style.width = parentRect.width + 'px'
    canvas.style.height = parentRect.height + 'px'

    // Reset and scale context for high DPI
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.scale(dpr, dpr)

    // Reset mouse position to center of new canvas size
    mouse.x = parentRect.width / 2
    mouse.y = parentRect.height / 2

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)

    console.log('Canvas resized to:', parentRect.width + 'x' + parentRect.height)
}

function position(x: number, y: number, z: number): { x: number; y: number } {
    if (!starsCanvas.value) return { x: 0, y: 0 }

    const canvas = starsCanvas.value
    return {
        x: (x * canvas.clientWidth) + ((((canvas.clientWidth / 2) - mouse.x + ((nPos.x - 0.5) * settings.noiseStrength)) * z) * props.motion),
        y: (y * canvas.clientHeight) + ((((canvas.clientHeight / 2) - mouse.y + ((nPos.y - 0.5) * settings.noiseStrength)) * z) * props.motion)
    }
}

function sizeRatio(): number {
    if (!starsCanvas.value) return 1000
    return starsCanvas.value.width >= starsCanvas.value.height ? starsCanvas.value.width : starsCanvas.value.height
}

function noisePoint(i: number): { x: number; y: number } {
    const a = settings.nAngle * i
    const cosA = Math.cos(a)
    const sinA = Math.sin(a)
    const rad = settings.nRad
    return {
        x: rad * cosA,
        y: rad * sinA
    }
}

class Particle implements StarParticle {
    x: number
    y: number
    z: number
    color: string
    opacity: number
    flicker: number
    neighbors: number[]

    constructor() {
        this.x = random(-0.1, 1.1, true)
        this.y = random(-0.1, 1.1, true)
        this.z = random(0, 4)
        this.color = getStarColor()
        this.opacity = random(0.1, 1, true)
        this.flicker = 0
        this.neighbors = []
    }

    render(): void {
        if (!context || !starsCanvas.value) return

        const pos = position(this.x, this.y, this.z)
        const r = ((this.z * settings.particleSizeMultiplier) + settings.particleSizeBase) * (sizeRatio() / 1000)
        let o = this.opacity

        // Flicker effect
        const newVal = random(-0.5, 0.5, true)
        this.flicker += (newVal - this.flicker) / settings.flickerSmoothing
        this.flicker = Math.max(-0.5, Math.min(0.5, this.flicker))
        o = Math.max(0, Math.min(1, o + this.flicker))

        // Update color for theme changes
        this.color = getStarColor()

        context.fillStyle = this.color
        context.globalAlpha = o
        context.beginPath()
        context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false)
        context.fill()
        context.closePath()

        // Particle glare
        context.globalAlpha = o * settings.glareOpacityMultiplier
        context.beginPath()
        context.ellipse(pos.x, pos.y, r * 100, r, (settings.glareAngle - ((nPos.x - 0.5) * settings.noiseStrength * props.motion)) * (Math.PI / 180), 0, 2 * Math.PI, false)
        context.fill()
        context.closePath()

        context.globalAlpha = 1
    }
}

class Flare implements StarFlare {
    x: number
    y: number
    z: number
    color: string
    opacity: number

    constructor() {
        this.x = random(-0.25, 1.25, true)
        this.y = random(-0.25, 1.25, true)
        this.z = random(0, 2)
        this.color = getFlareColor()
        this.opacity = random(0.001, 0.01, true)
    }

    render(): void {
        if (!context) return

        const pos = position(this.x, this.y, this.z)
        const r = ((this.z * settings.flareSizeMultiplier) + settings.flareSizeBase) * (sizeRatio() / 1000)

        // Update color for theme changes
        this.color = getFlareColor()

        context.beginPath()
        context.globalAlpha = this.opacity
        context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false)
        context.fillStyle = this.color
        context.fill()
        context.closePath()
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
        this.length = numPoints
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

                    const linkSpeedRel = settings.linkSpeed * 0.00001 * starsCanvas.value.width
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
                    if (this.fade < settings.linkFade) {
                        this.fade++
                        const linkPoints: [number, number][] = []
                        const alpha = (1 - (this.fade / settings.linkFade)) * getCurrentLinkOpacity()

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
        context.lineWidth = settings.lineWidth
        context.stroke()
        context.closePath()
        context.globalAlpha = 1
    }
}

function startLink(vertex: number, length: number): void {
    links.push(new Link(vertex, length))
}

function render(): void {
    if (!context || !starsCanvas.value) return

    // Update noise position
    n++
    if (n >= settings.noiseLength) {
        n = 0
    }
    nPos = noisePoint(n)

    // Clear canvas with proper dimensions
    const canvas = starsCanvas.value
    context.clearRect(0, 0, canvas.width, canvas.height)

    // Render particles
    for (let i = 0; i < props.particleCount; i++) {
        const particle = particles[i]
        if (particle) {
            particle.render()
        }
    }

    // Start new links randomly
    if (random(0, props.linkChance) === props.linkChance) {
        const length = random(settings.linkLengthMin, settings.linkLengthMax)
        const start = random(0, particles.length - 1)
        startLink(start, length)
    }

    // Render existing links
    for (let l = links.length - 1; l >= 0; l--) {
        const link = links[l]
        if (link && !link.finished) {
            link.render()
        } else {
            links.splice(l, 1)
        }
    }

    // Render flares
    for (let j = 0; j < props.flareCount; j++) {
        const flare = flares[j]
        if (flare) {
            flare.render()
        }
    }
}

function animate(): void {
    render()
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
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
}

function handleResize(): void {
    // Immediate resize for responsive feel
    resize()

    // Debounced resize for performance (in case of rapid resizing)
    if (resizeTimeout) {
        clearTimeout(resizeTimeout)
    }

    resizeTimeout = window.setTimeout(() => {
        resize()
        forceRender() // Force a render after resize
        resizeTimeout = null
    }, 150) // 150ms debounce
}

function init(): void {
    if (!starsCanvas.value) return

    context = starsCanvas.value.getContext('2d')
    if (!context) return

    // Progressive resize attempts to ensure proper sizing
    const attemptResize = (attempts = 0) => {
        resize()

        // If canvas still has wrong size and we haven't tried too many times
        if (attempts < 5 && starsCanvas.value) {
            const canvas = starsCanvas.value
            const parent = canvas.parentElement
            if (parent) {
                const parentRect = parent.getBoundingClientRect()
                // If parent has size but canvas doesn't match, try again
                if (parentRect.width > 0 && parentRect.height > 0) {
                    if (canvas.width !== parentRect.width * (window.devicePixelRatio || 1)) {
                        setTimeout(() => attemptResize(attempts + 1), 100)
                    }
                }
            }
        }
    }

    // Start attempting to resize
    setTimeout(() => attemptResize(), 10)

    mouse.x = starsCanvas.value.clientWidth / 2
    mouse.y = starsCanvas.value.clientHeight / 2

    // Create particles
    particles = []
    points = []
    for (let i = 0; i < props.particleCount; i++) {
        const p = new Particle()
        particles.push(p)
        points.push([p.x * 1000, p.y * 1000])
    }

    // Delaunay triangulation
    vertices = Delaunay.triangulate(points)

    // Create triangles
    triangles = []
    const tri: number[] = []
    for (let i = 0; i < vertices.length; i++) {
        if (tri.length === 3) {
            triangles.push([...tri])
            tri.length = 0
        }
        const vertex = vertices[i]
        if (vertex !== undefined) {
            tri.push(vertex)
        }
    }

    // Set up particle neighbors
    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i]
        if (!particle) continue

        for (let j = 0; j < triangles.length; j++) {
            const triangle = triangles[j]
            if (!triangle) continue

            const k = triangle.indexOf(i)
            if (k !== -1) {
                triangle.forEach((value) => {
                    if (value !== i && particle.neighbors.indexOf(value) === -1) {
                        particle.neighbors.push(value)
                    }
                })
            }
        }
    }

    // Create flares
    flares = []
    for (let i = 0; i < props.flareCount; i++) {
        flares.push(new Flare())
    }

    // Start animation
    animate()
}

// Watch for theme changes and update colors
watch(currentTheme, (newTheme) => {
    // Update all particle colors when theme changes
    particles.forEach(particle => {
        particle.color = getStarColor()
    })

    flares.forEach(flare => {
        flare.color = getFlareColor()
    })
}, { immediate: false })

onMounted(() => {
    if (starsCanvas.value) {
        init()
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('resize', handleResize)

        // ResizeObserver for more responsive canvas resizing
        if ('ResizeObserver' in window) {
            resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    if (entry.target === starsCanvas.value) {
                        handleResize()
                        break
                    }
                }
            })

            resizeObserver.observe(starsCanvas.value)
        }
    }
})

onUnmounted(() => {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame)
    }

    if (resizeTimeout) {
        clearTimeout(resizeTimeout)
    }

    if (resizeObserver) {
        resizeObserver.disconnect()
    }

    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', handleResize)
})
</script>
