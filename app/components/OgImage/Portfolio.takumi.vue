<script setup>
defineProps({
  // Page subject. On the homepage this is the name; on sub-pages it's the
  // clean page title (without the "Chad Feierstein - " SEO prefix).
  title: { type: String, required: false, default: 'Chad Feierstein' },
  // Always-present identity line (the roles), independent of the page.
  eyebrow: { type: String, required: false, default: 'Full-Stack Developer · IT Administrator' },
  description: { type: String, required: false },
})

// Static "network constellation" echoing the homepage hero canvas.
// Coordinates sit on a 1200x630 grid, clustered in the corners so the
// centred text stays clean. Edges connect nearby nodes only.
const nodes = [
  [90, 110], [210, 70], [300, 180], [150, 250],
  [1050, 90], [1130, 200], [980, 160],
  [1080, 470], [1150, 560], [980, 540],
  [120, 520], [240, 560], [60, 430],
]
const edges = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [4, 6], [6, 5],
  [7, 8], [7, 9], [9, 8],
  [10, 11], [10, 12], [12, 11],
]
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-between relative p-16 bg-white text-neutral-900"
  >
    <!-- Aurora gradient orbs (matching site hero) -->
    <div
      class="absolute top-0 left-0 right-0 bottom-0"
      style="background-image: radial-gradient(ellipse 55% 50% at 15% 15%, rgba(96, 165, 250, 0.28) 0%, transparent 55%);"
    />
    <div
      class="absolute top-0 left-0 right-0 bottom-0"
      style="background-image: radial-gradient(ellipse 60% 55% at 85% 85%, rgba(99, 102, 241, 0.20) 0%, transparent 60%);"
    />

    <!-- Network constellation (echoes the homepage hero background) -->
    <svg
      class="absolute top-0 left-0"
      width="1200"
      height="600"
      viewBox="0 0 1200 600"
    >
      <g stroke="rgba(59, 130, 246, 0.18)" stroke-width="1.5">
        <line
          v-for="(e, i) in edges"
          :key="`e-${i}`"
          :x1="nodes[e[0]][0]"
          :y1="nodes[e[0]][1]"
          :x2="nodes[e[1]][0]"
          :y2="nodes[e[1]][1]"
        />
      </g>
      <g fill="rgba(99, 102, 241, 0.38)">
        <circle v-for="(n, i) in nodes" :key="`n-${i}`" :cx="n[0]" :cy="n[1]" r="5" />
      </g>
    </svg>

    <!-- Top row: brand mark -->
    <div class="flex items-center gap-5 relative">
      <svg viewBox="0 0 32 32" width="72" height="72">
        <defs>
          <linearGradient id="ogBrand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#60A5FA" />
            <stop offset="100%" stop-color="#4F46E5" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="7" fill="url(#ogBrand)" />
        <g fill="none" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15.5 11.24 A 5.5 5.5 0 1 0 15.5 20.76" />
          <path d="M18.75 11 L 18.75 21 M 18.75 11 L 24.75 11 M 18.75 15.5 L 22.75 15.5" />
        </g>
      </svg>
      <span class="text-[30px] font-medium tracking-wide text-neutral-500">
        chad.lu
      </span>
    </div>

    <!-- Center: roles eyebrow + title + description -->
    <div class="flex flex-col gap-4 relative" style="max-width: 1050px;">
      <span
        class="font-semibold"
        style="font-size: 24px; letter-spacing: 0.12em; text-transform: uppercase; color: #4F46E5;"
      >
        {{ eyebrow }}
      </span>
      <h1
        class="font-bold m-0"
        style="font-size: 70px; line-height: 1.05; letter-spacing: -0.02em;"
      >
        {{ title }}
      </h1>
      <p
        v-if="description"
        class="m-0 text-neutral-600"
        style="font-size: 28px; line-height: 1.35;"
      >
        {{ description }}
      </p>
    </div>

    <!-- Bottom row: accent bar + location -->
    <div class="flex items-center gap-4 relative">
      <div
        style="width: 60px; height: 6px; border-radius: 9999px; background-image: linear-gradient(to right, #2563EB, #6366F1);"
      />
      <span
        class="font-medium text-neutral-500"
        style="font-size: 22px; letter-spacing: 0.2em; text-transform: uppercase;"
      >
        Rumelange · Luxembourg
      </span>
    </div>
  </div>
</template>
