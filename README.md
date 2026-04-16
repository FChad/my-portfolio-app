# My Portfolio Website

[![Nuxt](https://img.shields.io/badge/Nuxt-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com)
[![Vue](https://img.shields.io/badge/Vue-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

A modern multilingual portfolio website built with Nuxt and Vue, featuring projects showcase, technical documentation, and contact functionality.

🚀 **Live**: [https://www.chad.lu](https://www.chad.lu)

## Features

- Multilingual support (Luxembourgish, German, French, English)
- Dark/Light mode with system preference detection
- Responsive design
- Project showcase
- Technical documentation
- Contact form with Turnstile captcha

## Tech Stack

**Core**: Nuxt, Vue, TypeScript, TailwindCSS  
**Features**: i18n, Dark Mode, SEO (robots, sitemap)  
**Services**: Resend (email), Cloudflare Turnstile (captcha)

## Getting Started

```bash
git clone https://github.com/FChad/my-portfolio-app.git
cd my-portfolio-app
npm install
cp .env.example .env
npm run dev
```

## Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run generate  # Generate static site
npm run preview   # Preview production build
```

## Environment Variables

Create a `.env` file with the following:

```env
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_FROM_NAME=Contact Form
EMAIL_TO=your@email.com
TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```

## License

MIT License with Content Restrictions - See [LICENSE](./LICENSE) for details.

**You can use**: Code structure, components, styling patterns, and technical implementation.  
**You cannot use**: Personal content, project descriptions, documentation articles, and personal media.

Replace all personal content with your own when using this as a template.
