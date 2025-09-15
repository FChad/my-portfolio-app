<template>
    <div class="w-full h-full flex flex-col">
        <Header />

        <!-- Main Content for Hero Pages (no padding) -->
        <main class="overflow-hidden flex flex-col gap-20 pb-20">
            <slot />
        </main>

        <Footer />
    </div>
</template>