<template>
    <div class="w-full h-full flex flex-col">
        <Header />

        <!-- Main Content -->
        <main class="overflow-hidden flex flex-col gap-24 md:gap-32 lg:gap-40 pt-10 pb-20">
            <slot />
        </main>

        <Footer />
    </div>
</template>