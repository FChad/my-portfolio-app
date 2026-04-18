interface AnimationCycleOptions {
    holdDuration?: number
    fadeoutDuration?: number
    pauseDuration?: number
    staggerDuration?: number
}

export function useAnimationCycle(options: AnimationCycleOptions = {}) {
    const {
        holdDuration = 3400,
        fadeoutDuration = 600,
        pauseDuration = 800,
        staggerDuration = 2600
    } = options

    const visible = ref(false)
    const fading = ref(false)

    let loopTimer: ReturnType<typeof setTimeout> | null = null

    const runCycle = () => {
        fading.value = false
        visible.value = true

        loopTimer = setTimeout(() => {
            fading.value = true
            visible.value = false

            loopTimer = setTimeout(() => {
                loopTimer = setTimeout(runCycle, pauseDuration)
            }, fadeoutDuration)
        }, staggerDuration + holdDuration)
    }

    onMounted(runCycle)

    onUnmounted(() => {
        if (loopTimer) clearTimeout(loopTimer)
    })

    return { visible, fading }
}
