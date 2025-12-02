<template>
    <div class="w-full h-full flex flex-col">
        <LayoutHeader />

        <!-- Main Content for Hero Pages (no padding top) -->
        <main>
            <slot />
        </main>

        <LayoutFooter />
    </div>
</template>
