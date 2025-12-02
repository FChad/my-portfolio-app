<template>
    <div class="w-full h-full flex flex-col">
        <LayoutHeader />

        <!-- Main Content -->
        <main>
            <slot />
        </main>

        <LayoutFooter />
    </div>
</template>
