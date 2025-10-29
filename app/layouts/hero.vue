<template>
    <div class="w-full h-full flex flex-col">
        <Header />

        <!-- Main Content for Hero Pages (no padding top) -->
        <main>
            <slot />
        </main>

        <Footer />
    </div>
</template>
