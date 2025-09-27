# Chad Feierstein - Portfolio Website

[![Nuxt 4](https://img.shields.io/badge/Nuxt-4.1.2-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3.5.20-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

🚀 **Live Demo**: [https://www.chad.lu](https://www.chad.lu)

A modern, multilingual portfolio website showcasing projects, technical documentation, and professional experience. Built with cutting-edge web technologies focusing on performance, accessibility, and exceptional user experience.

## ✨ Features

### 🌍 Internationalization (i18n)
- **4 Languages**: Luxembourgish (lb), German (de), French (fr), English (en)
- **Smart Routing**: Clean URLs with `prefix_except_default` strategy
- **SEO Optimized**: Language-specific meta tags and structured data

### 🎨 Design & UI
- **Dark/Light Mode**: Elegant theme switching with system preference detection
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Performance-optimized with `requestAnimationFrame`
- **Icon System**: 100,000+ icons via Iconify with on-demand loading

### 🚀 Performance
- **Server-Side Rendering**: Nuxt 4 SSR for optimal SEO and initial load
- **Type Safety**: Full TypeScript support with strict type checking
- **Optimized Assets**: SVG graphics and lazy loading
- **Hydration Safety**: Skeleton loaders during client-side hydration

### 📂 Content Sections
- **Projects Showcase**: Interactive project presentations with live demos
- **Technical Documentation**: Comprehensive guides (Debian, Ollama, Cardano)
- **About Section**: Professional background and experience timeline
- **Contact Form**: Functional contact with VeeValidate and Resend integration

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Nuxt 4.1.2, Vue 3.5.20 |
| **Language** | TypeScript 5.7.2 |
| **Styling** | TailwindCSS 3.4.17, @nuxtjs/color-mode |
| **Icons** | @nuxt/icon with Circle Flags & MDI sets |
| **i18n** | @nuxtjs/i18n 10.0.6 |
| **Email** | Resend 6.1.0 |
| **SEO** | @nuxtjs/robots, @nuxtjs/sitemap |

## 📦 Installation

### Prerequisites
- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Windows** with PowerShell (for development scripts)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/FChad/my-portfolio-app.git
cd my-portfolio-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment variables**
```bash
# Copy example env file
cp .env.example .env

# Configure your Resend API key for contact form
RESEND_API_KEY=your_resend_api_key
```

4. **Run development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🚀 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate

# Preview production build
npm run preview

# Windows setup script (PowerShell)
./setup-project.cmd
```

### Project Structure

```
my-portfolio-app/
├── app/
│   ├── components/        # Reusable Vue components
│   ├── composables/       # Vue composables (hooks)
│   ├── layouts/           # Layout templates
│   ├── pages/            # File-based routing
│   │   ├── showcase/     # Showcase section
│   │   │   ├── project/ # Individual projects
│   │   │   └── documentation/ # Technical docs
│   │   ├── index.vue     # Homepage
│   │   ├── about.vue     # About page
│   │   └── contact.vue   # Contact page
│   └── utils/            # Utility functions
├── i18n/
│   └── locales/          # Translation files (JSON)
├── public/
│   └── img/              # Static images and SVGs
├── server/
│   └── api/              # Server API routes
├── nuxt.config.ts        # Nuxt configuration
├── tailwind.config.js    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

### Key Development Patterns

#### Component Naming
- **PascalCase**: `TypingEffect.vue`, `ThemeSwitcher.vue`
- **Prefixed utilities**: `UiSubNavigation.vue`

#### i18n Best Practices
```typescript
// Always use computed for reactive translations
const texts = computed(() => [
    t('home.roles.fullstack'),
    t('home.roles.serveradmin')
])
```

#### Navigation
```vue
<!-- Internal links - always use NuxtLinkLocale -->
<NuxtLinkLocale to="/showcase">View Projects</NuxtLinkLocale>

<!-- External links -->
<NuxtLink external target="_blank" href="https://example.com">
  External Link
</NuxtLink>
```

## 🎨 Theming

The application supports automatic dark/light mode switching:

```vue
<!-- Tailwind dark mode classes -->
<div class="bg-white dark:bg-gray-800">
  <h1 class="text-gray-900 dark:text-white">Title</h1>
</div>
```

## 🌐 Deployment

### Production Build

```bash
# Generate static site
npm run generate

# The output will be in .output/public/
```

### Environment Variables

Create a `.env` file in the root directory and configure the following variables:

| Variable | Description | Required | Default/Example |
|----------|-------------|----------|-----------------|
| `BASE_URL` | The base URL of your portfolio website | No | `https://www.chad.lu` |
| `RESEND_API_KEY` | Resend API key for contact form functionality | Yes | `re_xxxxxxxxxxxxxxxxxx` |
| `EMAIL_FROM` | Sender email address (must be from verified Resend domain) | Yes | `your-system@email.com` |
| `EMAIL_FROM_NAME` | Display name for the sender | Yes | `Contact Form` |
| `EMAIL_TO` | Your email address where contact form messages are sent | Yes | `your@email.com` |
| `TURNSTILE_SITE_KEY` | Cloudflare Turnstile public site key | Yes | `0x4AAAAAAA...` |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile private secret key | Yes | `0x4AAAAAAA...` |

#### Setup Instructions

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Configure Resend (Email Service):**
   - Sign up at [Resend.com](https://resend.com)
   - Get your API key from [API Keys page](https://resend.com/api-keys)
   - Verify your domain in Resend dashboard
   - Set `EMAIL_FROM` to an address from your verified domain

3. **Configure Cloudflare Turnstile (CAPTCHA):**
   - Go to [Cloudflare Dashboard > Turnstile](https://dash.cloudflare.com/profile/api-tokens)
   - Create a new site with your domain
   - Copy the Site Key (public) and Secret Key (private)

4. **Update contact recipient:**
   - Set `EMAIL_TO` to your personal email address where you want to receive contact form submissions

## 📝 License

This project is licensed under the [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

You are free to use, modify, and distribute this code for any purpose, including commercial use, as long as you provide appropriate attribution to Chad Feierstein and link back to the original source.

## 🤝 Contributing

This is a personal portfolio project and is not open for direct contributions. However, you are welcome to fork it, learn from it, and adapt it for your own use under the CC BY 4.0 license terms!

## 📧 Contact

**Chad Feierstein**  
📍 Rumelange, Luxembourg  
🌐 [www.chad.lu](https://www.chad.lu)  
💼 Full-Stack Developer & IT Administrator

---

<div align="center">
  Made with ❤️ using Nuxt 4, Vue 3, and TypeScript
</div>