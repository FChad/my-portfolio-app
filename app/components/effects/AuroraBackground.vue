<template>
    <div class="aurora-bg" aria-hidden="true">
        <div class="aurora-bg__dots"></div>
        <div class="aurora-bg__orb aurora-bg__orb--1"></div>
        <div class="aurora-bg__orb aurora-bg__orb--2"></div>
        <div class="aurora-bg__orb aurora-bg__orb--3"></div>
        <div class="aurora-bg__orb aurora-bg__orb--4"></div>
        <div class="aurora-bg__vignette"></div>
    </div>
</template>

<style>
.aurora-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
    -webkit-mask-image: linear-gradient(to bottom, #000 35%, transparent 78%);
    mask-image: linear-gradient(to bottom, #000 35%, transparent 78%);
}

.aurora-bg__dots {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle at center, rgba(59, 130, 246, 0.22) 1px, transparent 1px);
    background-size: 28px 28px;
    -webkit-mask-image: radial-gradient(ellipse 80% 60% at center, #000 25%, transparent 90%);
    mask-image: radial-gradient(ellipse 80% 60% at center, #000 25%, transparent 90%);
    opacity: 0.55;
}

.dark .aurora-bg__dots {
    background-image: radial-gradient(circle at center, rgba(96, 165, 250, 0.18) 1px, transparent 1px);
    opacity: 0.4;
}

.aurora-bg__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.55;
    will-change: transform;
}

.aurora-bg__orb--1 {
    background: radial-gradient(circle, #93c5fd 0%, transparent 70%);
    width: 50vw;
    height: 50vw;
    top: -12%;
    left: -10%;
    animation: aurora-bg-drift-1 24s ease-in-out infinite alternate;
}

.aurora-bg__orb--2 {
    background: radial-gradient(circle, #c7d2fe 0%, transparent 70%);
    width: 42vw;
    height: 42vw;
    top: 18%;
    right: -10%;
    animation: aurora-bg-drift-2 30s ease-in-out infinite alternate;
}

.aurora-bg__orb--3 {
    background: radial-gradient(circle, #bae6fd 0%, transparent 70%);
    width: 46vw;
    height: 46vw;
    top: 30%;
    left: 15%;
    animation: aurora-bg-drift-3 28s ease-in-out infinite alternate;
}

.aurora-bg__orb--4 {
    background: radial-gradient(circle, #ddd6fe 0%, transparent 70%);
    width: 36vw;
    height: 36vw;
    top: 15%;
    right: 18%;
    animation: aurora-bg-drift-4 32s ease-in-out infinite alternate;
}

.dark .aurora-bg__orb {
    opacity: 0.4;
    mix-blend-mode: screen;
    filter: blur(110px);
}

.dark .aurora-bg__orb--1 {
    background: radial-gradient(circle, #2563eb 0%, transparent 70%);
}

.dark .aurora-bg__orb--2 {
    background: radial-gradient(circle, #4f46e5 0%, transparent 70%);
}

.dark .aurora-bg__orb--3 {
    background: radial-gradient(circle, #0284c7 0%, transparent 70%);
}

.dark .aurora-bg__orb--4 {
    background: radial-gradient(circle, #6366f1 0%, transparent 70%);
}

@keyframes aurora-bg-drift-1 {
    0% {
        transform: translate3d(0, 0, 0) scale(1);
    }

    100% {
        transform: translate3d(14vw, 9vh, 0) scale(1.15);
    }
}

@keyframes aurora-bg-drift-2 {
    0% {
        transform: translate3d(0, 0, 0) scale(1.1);
    }

    100% {
        transform: translate3d(-12vw, 7vh, 0) scale(0.95);
    }
}

@keyframes aurora-bg-drift-3 {
    0% {
        transform: translate3d(0, 0, 0) scale(0.95);
    }

    100% {
        transform: translate3d(8vw, -10vh, 0) scale(1.12);
    }
}

@keyframes aurora-bg-drift-4 {
    0% {
        transform: translate3d(0, 0, 0) scale(1);
    }

    100% {
        transform: translate3d(-10vw, -8vh, 0) scale(1.2);
    }
}

.aurora-bg__vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 75% 60% at center, transparent 35%, rgba(250, 250, 250, 0.4) 100%);
}

.dark .aurora-bg__vignette {
    background: radial-gradient(ellipse 75% 60% at center, transparent 35%, rgba(23, 23, 23, 0.4) 100%);
}

@media (prefers-reduced-motion: reduce) {
    .aurora-bg__orb {
        animation: none !important;
    }
}
</style>
