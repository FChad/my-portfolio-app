import { Resend } from 'resend'
import { renderContactEmailTemplate, renderContactEmailText, type ContactEmailData } from '../utils/emailTemplates'

// Contact form data interface
interface ContactFormData {
    name: string
    email: string
    subject: string
    message: string
    locale?: string
    turnstileToken: string
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, '')
}

// Add Turnstile verification function
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
    const secretKey = process.env.TURNSTILE_SECRET_KEY

    if (!secretKey) {
        console.error('❌ TURNSTILE_SECRET_KEY is not configured')
        return false
    }

    try {
        console.log('🔒 Verifying Turnstile token for IP:', ip)

        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                secret: secretKey,
                response: token,
                remoteip: ip
            })
        })

        const result = await response.json()
        console.log('🔒 Turnstile verification result:', result.success ? '✅ Success' : '❌ Failed')

        return result.success === true
    } catch (error) {
        console.error('❌ Turnstile verification failed:', error)
        return false
    }
}

function validateContactForm(data: any): ContactFormData | null {
    if (!data || typeof data !== 'object') {
        return null
    }

    const { name, email, subject, message, locale, turnstileToken } = data

    // Required field validation (including Turnstile token)
    if (!name || !email || !subject || !message || !turnstileToken) {
        return null
    }

    // Type and length validation
    if (typeof name !== 'string' || name.length < 2 || name.length > 100) {
        return null
    }

    if (typeof email !== 'string' || !EMAIL_REGEX.test(email) || email.length > 254) {
        return null
    }

    if (typeof subject !== 'string' || subject.length < 5 || subject.length > 200) {
        return null
    }

    if (typeof message !== 'string' || message.length < 10 || message.length > 2000) {
        return null
    }

    // Validate Turnstile token
    if (typeof turnstileToken !== 'string' || turnstileToken.length === 0) {
        return null
    }

    return {
        name: sanitizeInput(name),
        email: email.toLowerCase().trim(),
        subject: sanitizeInput(subject),
        message: sanitizeInput(message),
        locale: locale || 'de',
        turnstileToken: turnstileToken.trim()
    }
}

export default defineEventHandler(async (event) => {
    // Only allow POST requests
    if (event.node.req.method !== 'POST') {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method Not Allowed'
        })
    }

    try {
        // Parse and validate request body
        const body = await readBody(event)
        const validatedData = validateContactForm(body)

        if (!validatedData) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid form data'
            })
        }

        // Get client IP for Turnstile verification
        const clientIP = getHeader(event, 'cf-connecting-ip') ||
            getHeader(event, 'x-forwarded-for') ||
            getHeader(event, 'x-real-ip') ||
            event.node.req.socket.remoteAddress ||
            'unknown'

        // Verify Turnstile token
        const isTurnstileValid = await verifyTurnstile(validatedData.turnstileToken, clientIP)

        if (!isTurnstileValid) {
            console.log('❌ Turnstile verification failed for IP:', clientIP)
            throw createError({
                statusCode: 400,
                statusMessage: 'CAPTCHA verification failed. Please try again.'
            })
        }

        console.log('✅ Turnstile verification passed for IP:', clientIP)

        // Initialize Resend
        const resendApiKey = process.env.RESEND_API_KEY
        if (!resendApiKey) {
            console.error('❌ RESEND_API_KEY is not configured')
            throw createError({
                statusCode: 500,
                statusMessage: 'Email service not configured'
            })
        }

        console.log('🔑 Resend API key found:', resendApiKey.substring(0, 10) + '...')

        const resend = new Resend(resendApiKey)

        // Email configuration from environment
        const emailFrom = process.env.EMAIL_FROM
        const emailFromName = process.env.EMAIL_FROM_NAME
        const emailTo = process.env.EMAIL_TO

        // Check if all required email configuration is present
        if (!emailFrom) {
            console.error('EMAIL_FROM is not configured')
            throw createError({
                statusCode: 500,
                statusMessage: 'Email configuration incomplete'
            })
        }

        if (!emailFromName) {
            console.error('EMAIL_FROM_NAME is not configured')
            throw createError({
                statusCode: 500,
                statusMessage: 'Email configuration incomplete'
            })
        }

        if (!emailTo) {
            console.error('EMAIL_TO is not configured')
            throw createError({
                statusCode: 500,
                statusMessage: 'Email configuration incomplete'
            })
        }

        // Create email templates using our new template utility
        const emailData: ContactEmailData = {
            name: validatedData.name,
            email: validatedData.email,
            message: `${validatedData.subject}\n\n${validatedData.message}`
        }

        const htmlTemplate = renderContactEmailTemplate(emailData)
        const textTemplate = renderContactEmailText(emailData)

        // Send email
        const { data, error } = await resend.emails.send({
            from: `${emailFromName} <${emailFrom}>`,
            to: [emailTo],
            replyTo: validatedData.email,
            subject: `Portfolio Kontakt: ${validatedData.name} - ${validatedData.subject}`,
            html: htmlTemplate,
            text: textTemplate
        })

        if (error) {
            console.error('Resend API error:', error)
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to send email'
            })
        }

        // Log success for monitoring
        console.log('Email sent successfully:', data?.id)

        return {
            success: true,
            message: 'Email sent successfully',
            id: data?.id
        }

    } catch (error) {
        // Log error for monitoring
        console.error('Contact form error:', error)

        // Re-throw createError instances
        if (error && typeof error === 'object' && 'statusCode' in error) {
            throw error
        }

        // Generic error for unexpected issues
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error'
        })
    }
})