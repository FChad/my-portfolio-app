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

// Turnstile verification function
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.error('❌ TURNSTILE_SECRET_KEY is not configured')
    return false
  }

  console.log('🔐 Verifying Turnstile token from IP:', ip)

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
    console.log('🔐 Turnstile verification result:', result.success ? '✅ Success' : '❌ Failed', result)

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
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    // Parse and validate request body
    const body = await readBody(event)
    console.log('📨 Contact form submission received')

    const validatedData = validateContactForm(body)

    if (!validatedData) {
      console.error('❌ Form validation failed')
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid form data'
      })
    }

    console.log('✅ Form data validated')

    // Get client IP for Turnstile verification
    const clientIP = getHeader(event, 'cf-connecting-ip') ||
      getHeader(event, 'x-forwarded-for') ||
      getHeader(event, 'x-real-ip') ||
      event.node.req.socket.remoteAddress ||
      'unknown'

    console.log('🌐 Client IP:', clientIP)

    // Verify Turnstile token
    const isTurnstileValid = await verifyTurnstile(validatedData.turnstileToken, clientIP)

    if (!isTurnstileValid) {
      console.error('❌ Turnstile verification failed')
      throw createError({
        statusCode: 400,
        statusMessage: 'CAPTCHA verification failed. Please try again.'
      })
    }

    console.log('✅ Turnstile verification successful')

    // Check environment variables
    if (!process.env.EMAIL_FROM || !process.env.EMAIL_TO) {
      console.error('❌ Email configuration incomplete')
      throw createError({
        statusCode: 500,
        statusMessage: 'Email configuration incomplete'
      })
    }

    console.log('📧 Sending email via Resend...')

    // Send email using Resend REST API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${process.env.EMAIL_FROM_NAME || 'Portfolio'} <${process.env.EMAIL_FROM}>`,
        to: [process.env.EMAIL_TO],
        reply_to: validatedData.email,
        subject: `Portfolio Contact: ${validatedData.name} - ${validatedData.subject}`,
        html: `
          <h2>New Contact Request</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Resend API error:', data);
      throw new Error(data.message || 'Failed to send email');
    }

    console.log('✅ Email sent successfully:', data.id)

    return {
      success: true,
      message: 'Email sent successfully',
      id: data.id
    };

  } catch (error) {
    console.error('Contact form error:', error)

    // Re-throw createError instances
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    // Handle Resend API errors (throw error instead of returning)
    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : 'Failed to send email. Please try again.'
    })
  }
});