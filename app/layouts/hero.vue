<template>
    <div class="w-full min-h-screen flex flex-col">
        <LayoutHeader />

        <!-- Main Content for Hero Pages -->
        <main id="main-content" class="flex-1">
            <slot />
        </main>

        <LayoutFooter />
    </div>
</template>
