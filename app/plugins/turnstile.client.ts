export default defineNuxtPlugin(() => {
    // Only run on client side
    if (import.meta.client) {
        // Check if script is already loaded
        if (document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')) {
            return
        }

        // Dynamically load Turnstile script
        const script = document.createElement('script')
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
        script.async = true
        script.defer = true
        script.crossOrigin = 'anonymous'

        // Add to head
        document.head.appendChild(script)
    }
})
