<script setup>
defineProps({
  title: { type: String, required: false, default: 'Chad Feierstein' },
  description: { type: String, required: false },
  colorMode: { type: String, required: false, default: 'light' },
})
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-between relative p-16 bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50"
  >
    <!-- Aurora gradient orbs (matching site hero) -->
    <div
      class="absolute top-0 left-0 right-0 bottom-0"
      style="background-image: radial-gradient(ellipse 55% 50% at 15% 15%, rgba(96, 165, 250, 0.30) 0%, transparent 55%);"
    />
    <div
      class="absolute top-0 left-0 right-0 bottom-0"
      style="background-image: radial-gradient(ellipse 60% 55% at 85% 85%, rgba(99, 102, 241, 0.22) 0%, transparent 60%);"
    />
    <div
      class="absolute top-0 left-0 right-0 bottom-0"
      style="background-image: radial-gradient(ellipse 45% 40% at 90% 10%, rgba(125, 211, 252, 0.18) 0%, transparent 55%);"
    />

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
      <span class="text-[30px] font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
        chad.lu
      </span>
    </div>

    <!-- Center: title + description -->
    <div class="flex flex-col gap-5 relative" style="max-width: 1050px;">
      <h1
        class="font-bold m-0"
        style="font-size: 76px; line-height: 1.05; letter-spacing: -0.02em; display: block; text-overflow: ellipsis;"
      >
        {{ title }}
      </h1>
      <p
        v-if="description"
        class="m-0 text-neutral-600 dark:text-neutral-400"
        style="font-size: 30px; line-height: 1.35; display: block; text-overflow: ellipsis;"
      >
        {{ description }}
      </p>
    </div>

    <!-- Bottom row: accent bar + label -->
    <div class="flex items-center gap-4 relative">
      <div
        style="width: 60px; height: 6px; border-radius: 9999px; background-image: linear-gradient(to right, #2563EB, #6366F1);"
      />
      <span
        class="font-medium text-neutral-500 dark:text-neutral-400"
        style="font-size: 22px; letter-spacing: 0.25em; text-transform: uppercase;"
      >
        Portfolio
      </span>
    </div>
  </div>
</template>
