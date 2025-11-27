# My Portfolio Website

[![Nuxt 4](https://img.shields.io/badge/Nuxt-4.2.1-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3.5.25-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

🚀 **Live Demo**: [https://www.chad.lu](https://www.chad.lu)

Multilingual portfolio website with projects, documentation, and professional experience.

## ✨ Features

- **4 Languages**: Luxembourgish, German, French, English
- **Dark/Light Mode**: Theme switching with system preference detection
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Type Safety**: Full TypeScript support
- **Projects Showcase**: Interactive project presentations
- **Technical Documentation**: Debian, Ollama, Cardano guides
- **Contact Form**: Resend integration with Turnstile captcha

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Nuxt 4.2.1, Vue 3.5.25 |
| **Language** | TypeScript 5.7.2 |
| **Styling** | TailwindCSS 3.4.17, @nuxtjs/color-mode |
| **Icons** | @nuxt/icon with Circle Flags & MDI sets |
| **i18n** | @nuxtjs/i18n 10.2.1 |
| **Email** | Resend 6.5.2 |
| **SEO** | @nuxtjs/robots, @nuxtjs/sitemap |

## 📦 Installation

```bash
git clone https://github.com/FChad/my-portfolio-app.git
cd my-portfolio-app
npm install
cp .env.example .env  # Configure environment variables
npm run dev  # Runs on http://localhost:3000
```

## 🚀 Scripts

```bash
npm run dev       # Development server
npm run build     # Production build
npm run generate  # Static site generation
npm run preview   # Preview production build
```

## 🌐 Environment Variables

| Variable | Description | Required | Default/Example |
|----------|-------------|----------|-----------------|
| `BASE_URL` | The base URL of your portfolio website | No | `https://www.chad.lu` |
| `RESEND_API_KEY` | Resend API key for contact form functionality | Yes | `re_xxxxxxxxxxxxxxxxxx` |
| `EMAIL_FROM` | Sender email address (must be from verified Resend domain) | Yes | `your-system@email.com` |
| `EMAIL_FROM_NAME` | Display name for the sender | Yes | `Contact Form` |
| `EMAIL_TO` | Your email address where contact form messages are sent | Yes | `your@email.com` |
| `TURNSTILE_SITE_KEY` | Cloudflare Turnstile public site key | Yes | `0x4AAAAAAA...` |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile private secret key | Yes | `0x4AAAAAAA...` |

## 📝 License

This project is licensed under the **MIT License with Content Restrictions**.

### ✅ What You Can Use

- **Code Structure**: Components, layouts, composables, and technical implementation
- **Styling & Design Patterns**: TailwindCSS configurations and design approaches
- **Technical Features**: i18n setup, dark mode, routing patterns, and animations
- **Learning**: Study the codebase and use it as inspiration for your own projects

### ❌ What You Cannot Copy

- **Personal Content**: My name, biographical information, and personal data
- **Projects & Portfolio Items**: Descriptions of my projects and achievements
- **Documentation Content**: Articles and guides I've written
- **Translations**: All personal content in i18n locale files (de.json, en.json, fr.json, lb.json)
- **Personal Media**: Images and graphics representing my personal brand

### 💡 How to Use This Repository

1. Fork or clone the repository
2. **Replace all personal content** with your own information
3. Create your own project descriptions and portfolio items
4. Write your own translations and textual content
5. Customize the design and features to match your style

**Important**: This is a template for building your own portfolio. Use the code structure and technical implementation, but create your own unique content!

See the [LICENSE](./LICENSE) file for full details.

<div align="center">
  Made with ❤️
</div>
