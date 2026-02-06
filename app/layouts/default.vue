<template>
    <div class="w-full h-full flex flex-col">
        <LayoutHeader />

        <!-- Main Content -->
        <main id="main-content">
            <slot />
        </main>

        <LayoutFooter />
    </div>
</template>
