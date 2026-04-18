/**
 * Central place for external links and other values
 * used across multiple components.
 */

export const SITE_AUTHOR = 'Chad Feierstein'
export const SITE_NAME = `${SITE_AUTHOR} - Portfolio`

export const SOCIAL_LINKS = {
  github: 'https://github.com/FChad',
  linkedin: 'https://www.linkedin.com/in/chad-feierstein/',
  repository: 'https://github.com/FChad/my-portfolio-app',
} as const

export const NAV_LINKS = [
  { to: '/', key: 'home', icon: 'mdi:home' },
  { to: '/about', key: 'about', icon: 'mdi:account' },
  { to: '/showcase', key: 'showcase', icon: 'mdi:eye' },
  { to: '/contact', key: 'contact', icon: 'mdi:email' }
] as const
