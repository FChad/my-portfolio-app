<template>
    <div class="w-full h-full flex flex-col">
        <Header />

        <!-- Main Content -->
        <main class="overflow-hidden flex flex-col gap-16 md:gap-24 pt-10 pb-20">
            <slot />
        </main>

        <Footer />
    </div>
</template>