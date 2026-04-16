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
