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

function createEmailTemplate(data: ContactFormData): { html: string; text: string } {
    // Translations based on locale
    const translations = {
        de: {
            title: 'Kontaktanfrage',
            name: 'Name:',
            email: 'E-Mail:',
            subject: 'Betreff:',
            message: 'Nachricht:',
            language: 'Sprache:',
            submitted: 'Gesendet:',
            footer: 'Diese E-Mail wurde über das Kontaktformular auf chad.lu gesendet',
            website: 'www.chad.lu',
            textHeader: 'Kontaktanfrage'
        },
        en: {
            title: 'Contact Request',
            name: 'Name:',
            email: 'Email:',
            subject: 'Subject:',
            message: 'Message:',
            language: 'Language:',
            submitted: 'Submitted:',
            footer: 'This email was sent from the contact form on chad.lu',
            website: 'www.chad.lu',
            textHeader: 'Contact Request'
        },
        fr: {
            title: 'Demande de Contact',
            name: 'Nom:',
            email: 'Email:',
            subject: 'Sujet:',
            message: 'Message:',
            language: 'Langue:',
            submitted: 'Soumis:',
            footer: 'Cet email a été envoyé depuis le formulaire de contact sur chad.lu',
            website: 'www.chad.lu',
            textHeader: 'Demande de Contact'
        },
        lb: {
            title: 'Kontakt-Ufro',
            name: 'Numm:',
            email: 'E-Mail:',
            subject: 'Sujet:',
            message: 'Message:',
            language: 'Sprooch:',
            submitted: 'Geschéckt:',
            footer: 'Dëse E-Mail gouf iwwer de Kontakt-Formulaire op chad.lu geschéckt',
            website: 'www.chad.lu',
            textHeader: 'Kontakt-Ufro'
        }
    }

    const locale = data.locale || 'de'
    const t = translations[locale as keyof typeof translations] || translations.de

    // Language names mapping
    const languageNames = {
        de: { de: 'Deutsch', en: 'German', fr: 'Allemand', lb: 'Däitsch' },
        en: { de: 'Englisch', en: 'English', fr: 'Anglais', lb: 'Englesch' },
        fr: { de: 'Französisch', en: 'French', fr: 'Français', lb: 'Franséisch' },
        lb: { de: 'Luxemburgisch', en: 'Luxembourgish', fr: 'Luxembourgeois', lb: 'Lëtzebuergesch' }
    }

    const languageName = languageNames[locale as keyof typeof languageNames]?.[locale as keyof typeof languageNames] || locale

    // Date formatting with full written format based on locale
    const dateFormatOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }

    const localeMap = {
        de: 'de-DE',
        en: 'en-US',
        fr: 'fr-FR',
        lb: 'de-LU' // Luxembourg uses German formatting
    }

    const dateLocale = localeMap[locale as keyof typeof localeMap] || 'de-DE'
    const formattedDate = new Date().toLocaleString(dateLocale, dateFormatOptions)

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${t.title} [${data.email}]</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border: 1px solid #e9ecef; }
          .field { margin-bottom: 20px; }
          .label { font-weight: 600; color: #495057; display: block; margin-bottom: 5px; }
          .value { background: white; padding: 12px; border-radius: 4px; border: 1px solid #ced4da; }
          .message { min-height: 100px; }
          .footer { text-align: center; padding: 20px; color: #6c757d; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">${t.title}</h1>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="label">${t.name}</span>
              <div class="value">${data.name}</div>
            </div>
            
            <div class="field">
              <span class="label">${t.email}</span>
              <div class="value">${data.email}</div>
            </div>
            
            <div class="field">
              <span class="label">${t.subject}</span>
              <div class="value">${data.subject}</div>
            </div>
            
            <div class="field">
              <span class="label">${t.message}</span>
              <div class="value message">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>${t.footer}</p>
            <p style="margin-top: 10px; font-size: 12px; color: #8c95a6;">
              ${t.submitted} ${formattedDate}
            </p>
            <p style="margin-top: 5px; font-size: 12px;">
              <a href="https://www.chad.lu" style="color: #2563eb; text-decoration: none;">${t.website}</a>
            </p>
          </div>
          </div>
        </div>
      </body>
    </html>
  `

    const text = `
${t.textHeader}

${t.name} ${data.name}
${t.email} ${data.email}
${t.subject} ${data.subject}

${t.message}
${data.message}

${t.submitted} ${formattedDate}

---
${t.footer}
${t.website}
  `

    return { html, text }
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

        // Use dynamic import to avoid bundling issues
        const { Resend } = await import('resend')
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

        // Create email templates
        const { html, text } = createEmailTemplate(validatedData)

        // Send email
        const { data, error } = await resend.emails.send({
            from: `${emailFromName} <${emailFrom}>`,
            to: [emailTo],
            replyTo: validatedData.email,
            subject: `Contact Form: ${validatedData.subject}`,
            html,
            text
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