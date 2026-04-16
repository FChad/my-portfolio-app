import { EMAIL_REGEX, CONTACT_FORM_LIMITS } from '~~/app/utils/validation'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  turnstileToken: string
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function verifyTurnstile(token: string, ip: string, secret: string): Promise<boolean> {
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    })
    return ((await res.json()) as { success: boolean }).success === true
  } catch {
    return false
  }
}

function validateContactForm(body: unknown): ContactFormData {
  if (!body || typeof body !== 'object') throw createError({ status: 400, statusText: 'Invalid form data' })

  const { name, email, subject, message, turnstileToken } = body as Record<string, unknown>

  const fields: [unknown, number, number][] = [
    [name, CONTACT_FORM_LIMITS.name.min, CONTACT_FORM_LIMITS.name.max],
    [subject, CONTACT_FORM_LIMITS.subject.min, CONTACT_FORM_LIMITS.subject.max],
    [message, CONTACT_FORM_LIMITS.message.min, CONTACT_FORM_LIMITS.message.max],
  ]

  if (fields.some(([v, min, max]) => typeof v !== 'string' || v.length < min || v.length > max))
    throw createError({ status: 400, statusText: 'Invalid form data' })

  if (typeof email !== 'string' || !EMAIL_REGEX.test(email) || email.length > CONTACT_FORM_LIMITS.email.max)
    throw createError({ status: 400, statusText: 'Invalid form data' })

  if (typeof turnstileToken !== 'string' || !turnstileToken)
    throw createError({ status: 400, statusText: 'Invalid form data' })

  return {
    name: (name as string).trim(),
    email: (email as string).toLowerCase().trim(),
    subject: (subject as string).trim(),
    message: (message as string).trim(),
    turnstileToken: (turnstileToken as string).trim(),
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const data = validateContactForm(body)

  const clientIP = getHeader(event, 'cf-connecting-ip')
    || getHeader(event, 'x-forwarded-for')
    || getHeader(event, 'x-real-ip')
    || event.node.req.socket.remoteAddress
    || 'unknown'

  if (!await verifyTurnstile(data.turnstileToken, clientIP, config.turnstileSecretKey))
    throw createError({ status: 400, statusText: 'CAPTCHA verification failed. Please try again.' })

  if (!config.emailFrom || !config.emailTo)
    throw createError({ status: 500, statusText: 'Internal server error' })

  const safe = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    subject: escapeHtml(data.subject),
    message: escapeHtml(data.message).replace(/\n/g, '<br>'),
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${config.emailFromName || 'Portfolio'} <${config.emailFrom}>`,
      to: [config.emailTo],
      reply_to: data.email,
      subject: `Portfolio Contact: ${data.name} - ${data.subject}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Subject:</strong> ${safe.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${safe.message}</p>
      `,
    }),
  })

  const result = await res.json()

  if (!res.ok)
    throw createError({ status: 500, statusText: 'Failed to send email. Please try again.' })

  return { success: true, message: 'Email sent successfully', id: result.id }
})