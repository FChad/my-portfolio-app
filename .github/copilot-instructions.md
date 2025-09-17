# Nuxt Portfolio Application - AI Coding Instructions

This is a multilingual portfolio website built with Nuxt 4, Vue 3, and TypeScript. The project emphasizes internationalization, dark/light theming, and performant animations.

## Development Environment

### Platform & Tools
- **OS**: Windows (use PowerShell commands and Windows file paths)
- **Editor**: Visual Studio Code
- **Terminal**: PowerShell - use `;` for command chaining, Windows-style paths
- **Package Manager**: npm (prefer npm over other package managers)

## Project Architecture

### Tech Stack
- **Framework**: Nuxt 4 with Vue 3 Composition API and TypeScript
- **Styling**: TailwindCSS with dark mode support (`@nuxtjs/color-mode`)
- **Icons**: Nuxt Icon with Circle Flags and MDI icon sets
- **Routing**: File-based routing with nested showcase structure
- **Build**: ES modules (type: "module" in package.json)

### Key Modules & Configuration
- **SEO**: Robots.txt disabled (`disallow: '/'`), sitemap disabled (dev mode)
- **Color Mode**: Uses `classSuffix: ''` for Tailwind dark mode integration
- **Base URL**: Production site at `https://www.chad.lu`

## Internationalization (i18n) Patterns

### Language Configuration
- **Default locale**: German (`de`) 
- **Strategy**: `prefix_except_default` - German URLs have no prefix, others do
- **Locales**: Luxembourgish (lb), German (de), French (fr), English (en)
- **Detection**: Browser language detection disabled

### Translation Patterns
```typescript
// Always use reactive computed for dynamic translations
const texts = computed(() => [
    t('home.roles.fullstack'),
    t('home.roles.serveradmin')
])
```

### Flag Icons
Use Circle Flags with specific mapping:
```javascript
const flagMap = {
    'en': 'circle-flags:us',  // US flag for English
    'de': 'circle-flags:de',
    'fr': 'circle-flags:fr',
    'lb': 'circle-flags:lu'   // Luxembourg flag for Luxembourgish
}
```

## Component Patterns

### Naming Conventions
- **PascalCase** for components: `TypingEffect.vue`, `ThemeSwitcher.vue`
- **Prefixed utilities**: `UiSubNavigation.vue` for UI components

### Performance Optimizations
- **Hydration safety**: Use `isReady` flags and `onMounted()` for client-side features
- **Animation**: Prefer `requestAnimationFrame` over intervals for smooth performance
- **Loading states**: Show skeleton loaders during hydration (see `ThemeSwitcher.vue`)

### TypeScript Props Pattern
```typescript
interface Props {
    texts: string[]
    typingSpeed?: number
}

const props = withDefaults(defineProps<Props>(), {
    typingSpeed: 100
})
```

## Layout System

### Layout Types
- **hero**: No top padding for full-screen hero sections (`pages/index.vue`)
- **default**: Standard layout with padding (`pt-10`)
- **with-subnav**: Includes sub-navigation for nested pages

### Layout Assignment
```typescript
// In page components
definePageMeta({
    layout: 'hero'
})
```

## Navigation & Sub-Navigation

### Sub-Navigation Composable
Use `useSubNavigation()` composable for pages needing back buttons:
```typescript
const { configure } = useSubNavigation()

configure({
    title: 'Project Details',
    showBackButton: true,
    backTo: '/showcase',
    backLabel: 'Back to Showcase'
})
```

## Showcase Structure

### File Organization
- **Projects**: `/pages/showcase/project/[slug].vue`
- **Documentation**: Separate from projects in showcase listings
- **Assets**: SVG covers in `/public/img/showcase/project/`

### Showcase Data Pattern
```typescript
interface ShowcaseItem {
    id: number
    title: string        // i18n key
    description: string  // i18n key  
    image: string       // SVG path
    tags: string[]      // Tech stack tags
    link: string        // localePath() result
    type: 'project' | 'documentation'
}
```

## Development Commands

```bash
# Development
npm run dev          # Start dev server on localhost:3000

# Production
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build
```

## Theme & Styling

### Dark Mode Classes
- Use Tailwind's `dark:` prefix consistently
- Implement gradient backgrounds: `bg-gradient-radial from-gray-50 dark:from-blue-950/90`
- Include transition classes for smooth theme switching

### Responsive Design
- Mobile-first approach with `md:` and larger breakpoints
- Use `gap-16 md:gap-24` patterns for consistent spacing

## Key Files to Reference
- `nuxt.config.ts` - Core configuration and module setup
- `app/components/TypingEffect.vue` - Performance-optimized animation example  
- `app/composables/useSubNavigation.ts` - Navigation state management
- `i18n/locales/*.json` - Translation key structure and patterns