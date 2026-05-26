/**
 * Shared validation rules for client and server.
 * Single source of truth — keep both sides in sync.
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const CONTACT_FORM_LIMITS = {
  name:    { min: 2,  max: 100  },
  email:   { max: 254 },
  subject: { min: 5,  max: 200  },
  message: { min: 10, max: 2000 },
} as const

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactFormErrorKey =
  | 'nameRequired' | 'nameLength'
  | 'emailRequired' | 'emailInvalid'
  | 'subjectRequired' | 'subjectLength'
  | 'messageRequired' | 'messageMinLength' | 'messageMaxLength'

export type ContactFormErrors = Partial<Record<keyof ContactFormData, ContactFormErrorKey>>

export type ContactFormValidation =
  | { ok: true; data: ContactFormData }
  | { ok: false; errors: ContactFormErrors }

const asString = (v: unknown): string => (typeof v === 'string' ? v : '')

export function validateContactForm(input: unknown): ContactFormValidation {
  const src = (input && typeof input === 'object') ? input as Record<string, unknown> : {}
  const name = asString(src.name).trim()
  const email = asString(src.email).trim().toLowerCase()
  const subject = asString(src.subject).trim()
  const message = asString(src.message).trim()

  const errors: ContactFormErrors = {}

  if (!name) errors.name = 'nameRequired'
  else if (name.length < CONTACT_FORM_LIMITS.name.min || name.length > CONTACT_FORM_LIMITS.name.max) errors.name = 'nameLength'

  if (!email) errors.email = 'emailRequired'
  else if (!EMAIL_REGEX.test(email) || email.length > CONTACT_FORM_LIMITS.email.max) errors.email = 'emailInvalid'

  if (!subject) errors.subject = 'subjectRequired'
  else if (subject.length < CONTACT_FORM_LIMITS.subject.min || subject.length > CONTACT_FORM_LIMITS.subject.max) errors.subject = 'subjectLength'

  if (!message) errors.message = 'messageRequired'
  else if (message.length < CONTACT_FORM_LIMITS.message.min) errors.message = 'messageMinLength'
  else if (message.length > CONTACT_FORM_LIMITS.message.max) errors.message = 'messageMaxLength'

  if (Object.keys(errors).length > 0) return { ok: false, errors }
  return { ok: true, data: { name, email, subject, message } }
}
