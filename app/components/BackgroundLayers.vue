<script setup lang="ts">
// Pure-CSS animated mesh gradient — no scroll listener needed.
// prefers-reduced-motion is honored via a CSS media query below.
</script>

<template>
    <div aria-hidden="true" class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <!-- Mesh gradient: four large blurred radial blobs that drift independently -->
        <div class="mesh-blob mesh-blob-1"></div>
        <div class="mesh-blob mesh-blob-2"></div>
        <div class="mesh-blob mesh-blob-3"></div>
        <div class="mesh-blob mesh-blob-4"></div>

        <!-- SVG fractal noise grain, overlay-blended -->
        <div class="absolute inset-0 mix-blend-overlay opacity-[0.035] dark:opacity-[0.06]
                    bg-[image:var(--grain-bg)]"></div>
    </div>
</template>

<style scoped>
.mesh-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    will-change: transform;
}

.mesh-blob-1 {
    top: -20%;
    left: -10%;
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, var(--mesh-color-1), transparent 70%);
    animation: drift-1 22s ease-in-out infinite alternate;
}

.mesh-blob-2 {
    top: 5%;
    right: -15%;
    width: 55vw;
    height: 55vw;
    background: radial-gradient(circle, var(--mesh-color-2), transparent 70%);
    animation: drift-2 28s ease-in-out infinite alternate;
}

.mesh-blob-3 {
    bottom: -25%;
    left: 15%;
    width: 65vw;
    height: 65vw;
    background: radial-gradient(circle, var(--mesh-color-3), transparent 70%);
    animation: drift-3 32s ease-in-out infinite alternate;
}

.mesh-blob-4 {
    bottom: 5%;
    right: 0%;
    width: 50vw;
    height: 50vw;
    background: radial-gradient(circle, var(--mesh-color-4), transparent 70%);
    animation: drift-4 26s ease-in-out infinite alternate;
}

@keyframes drift-1 {
    0% { transform: translate3d(0, 0, 0) scale(1); }
    100% { transform: translate3d(8%, 6%, 0) scale(1.15); }
}
@keyframes drift-2 {
    0% { transform: translate3d(0, 0, 0) scale(1); }
    100% { transform: translate3d(-6%, 9%, 0) scale(1.1); }
}
@keyframes drift-3 {
    0% { transform: translate3d(0, 0, 0) scale(1); }
    100% { transform: translate3d(5%, -7%, 0) scale(1.2); }
}
@keyframes drift-4 {
    0% { transform: translate3d(0, 0, 0) scale(1); }
    100% { transform: translate3d(-9%, -5%, 0) scale(1.15); }
}

@media (prefers-reduced-motion: reduce) {
    .mesh-blob {
        animation: none;
    }
}
</style>
