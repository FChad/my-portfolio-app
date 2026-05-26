import nodemailer from 'nodemailer'
import { EMAIL_REGEX, CONTACT_FORM_LIMITS } from '~~/app/utils/validation'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function validateContactForm(body: unknown): ContactFormData {
  if (!body || typeof body !== 'object') throw createError({ status: 400, statusText: 'Invalid form data' })

  const { name, email, subject, message } = body as Record<string, unknown>

  const fields: [unknown, number, number][] = [
    [name, CONTACT_FORM_LIMITS.name.min, CONTACT_FORM_LIMITS.name.max],
    [subject, CONTACT_FORM_LIMITS.subject.min, CONTACT_FORM_LIMITS.subject.max],
    [message, CONTACT_FORM_LIMITS.message.min, CONTACT_FORM_LIMITS.message.max],
  ]

  if (fields.some(([v, min, max]) => typeof v !== 'string' || v.length < min || v.length > max))
    throw createError({ status: 400, statusText: 'Invalid form data' })

  if (typeof email !== 'string' || !EMAIL_REGEX.test(email) || email.length > CONTACT_FORM_LIMITS.email.max)
    throw createError({ status: 400, statusText: 'Invalid form data' })

  return {
    name: (name as string).trim(),
    email: (email as string).toLowerCase().trim(),
    subject: (subject as string).trim(),
    message: (message as string).trim(),
  }
}

async function checkRateLimit(ip: string): Promise<void> {
  const storage = useStorage('cache')
  const key = `contact:rl:${ip}`
  const now = Date.now()
  const cutoff = now - RATE_LIMIT_WINDOW_MS

  const previous = (await storage.getItem<number[]>(key)) ?? []
  const recent = previous.filter((ts) => ts > cutoff)

  if (recent.length >= RATE_LIMIT_MAX)
    throw createError({ status: 429, statusText: 'Too many requests' })

  recent.push(now)
  await storage.setItem(key, recent, { ttl: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000) })
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const origin = getRequestHeader(event, 'origin')
  const baseUrl = config.public.baseUrl
  if (origin && baseUrl && !origin.startsWith(baseUrl))
    throw createError({ status: 403, statusText: 'Forbidden' })

  const ip = getRequestIP(event, { xForwardedFor: true })
  if (ip) await checkRateLimit(ip)

  const body = await readBody(event)

  // Honeypot: bots fill hidden fields. Pretend success so they don't retry.
  if (body && typeof body === 'object' && (body as Record<string, unknown>).website)
    return { success: true, message: 'Email sent successfully' }

  const data = validateContactForm(body)

  if (!config.emailFrom || !config.emailTo || !config.smtpHost || !config.smtpUser || !config.smtpPass)
    throw createError({ status: 500, statusText: 'Internal server error' })

  const safe = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    subject: escapeHtml(data.subject),
    message: escapeHtml(data.message).replace(/\n/g, '<br>'),
  }

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort) || 587,
    secure: Number(config.smtpPort) === 465,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  })

  await transporter.sendMail({
    from: `${config.emailFromName || 'Portfolio'} <${config.emailFrom}>`,
    to: config.emailTo,
    replyTo: data.email,
    subject: `Portfolio Contact: ${data.name} - ${data.subject}`,
    html: `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${safe.name}</p>
      <p><strong>Email:</strong> ${safe.email}</p>
      <p><strong>Subject:</strong> ${safe.subject}</p>
      <p><strong>Message:</strong></p>

      <p>${safe.message}</p>
    `,
  }).catch((err) => {
    console.error('[contact] SMTP error:', err)
    throw createError({ status: 500, statusText: 'Failed to send email. Please try again.' })
  })

  return { success: true, message: 'Email sent successfully' }
})