// Contact form data interface
interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  turnstileToken: string
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

/** Encode user input for safe HTML embedding (prevents XSS) */
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Turnstile verification function
async function verifyTurnstile(token: string, ip: string, secretKey: string): Promise<boolean> {
  if (!secretKey) {
    return false
  }

  try {
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
    return result.success === true
  } catch {
    return false
  }
}

function validateContactForm(data: unknown): ContactFormData | null {
  if (!data || typeof data !== 'object') {
    return null
  }

  const { name, email, subject, message, turnstileToken } = data

  // Required field validation
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

  if (typeof turnstileToken !== 'string' || turnstileToken.length === 0) {
    return null
  }

  return {
    name: sanitizeInput(name),
    email: email.toLowerCase().trim(),
    subject: sanitizeInput(subject),
    message: sanitizeInput(message),
    turnstileToken: turnstileToken.trim()
  }
}

export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (event.node.req.method !== 'POST') {
    throw createError({
      status: 405,
      statusText: 'Method Not Allowed'
    })
  }

  const config = useRuntimeConfig()

  try {
    // Parse and validate request body
    const body = await readBody(event)

    const validatedData = validateContactForm(body)

    if (!validatedData) {
      throw createError({
        status: 400,
        statusText: 'Invalid form data'
      })
    }

    // Get client IP for Turnstile verification
    const clientIP = getHeader(event, 'cf-connecting-ip') ||
      getHeader(event, 'x-forwarded-for') ||
      getHeader(event, 'x-real-ip') ||
      event.node.req.socket.remoteAddress ||
      'unknown'

    // Verify Turnstile token
    const isTurnstileValid = await verifyTurnstile(
      validatedData.turnstileToken,
      clientIP,
      config.turnstileSecretKey
    )

    if (!isTurnstileValid) {
      throw createError({
        status: 400,
        statusText: 'CAPTCHA verification failed. Please try again.'
      })
    }

    // Check runtime config
    if (!config.emailFrom || !config.emailTo) {
      throw createError({
        status: 500,
        statusText: 'Internal server error'
      })
    }

    // HTML-encode user inputs for safe email embedding
    const safeName = escapeHtml(validatedData.name)
    const safeEmail = escapeHtml(validatedData.email)
    const safeSubject = escapeHtml(validatedData.subject)
    const safeMessage = escapeHtml(validatedData.message).replace(/\n/g, '<br>')

    // Send email using Resend REST API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${config.emailFromName || 'Portfolio'} <${config.emailFrom}>`,
        to: [config.emailTo],
        reply_to: validatedData.email,
        subject: `Portfolio Contact: ${validatedData.name} - ${validatedData.subject}`,
        html: `
          <h2>New Contact Request</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Email delivery failed');
    }

    return {
      success: true,
      message: 'Email sent successfully',
      id: data.id
    };

  } catch (error) {
    // Re-throw createError instances
    if (error && typeof error === 'object' && 'status' in error) {
      throw error
    }

    // Generic error message — never expose internal details to the client
    throw createError({
      status: 500,
      statusText: 'Failed to send email. Please try again.'
    })
  }
});