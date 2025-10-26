export default defineEventHandler((event) => {
    // Only set CSP for HTML pages, not for API routes or assets
    const path = event.node.req.url || ''

    // Skip API routes and static assets
    if (path.startsWith('/api/') ||
        path.startsWith('/_nuxt/') ||
        path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
        return
    }

    // Set proper CSP for Turnstile
    setHeader(event, 'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; " +
        "frame-src 'self' https://challenges.cloudflare.com; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: https:; " +
        "font-src 'self' data:; " +
        "connect-src 'self' https://challenges.cloudflare.com; " +
        "worker-src 'self' blob:; " +
        "child-src 'self' https://challenges.cloudflare.com blob:;"
    )

    // Additional security headers
    setHeader(event, 'X-Frame-Options', 'SAMEORIGIN')
    setHeader(event, 'X-Content-Type-Options', 'nosniff')
    setHeader(event, 'Referrer-Policy', 'strict-origin-when-cross-origin')
})
