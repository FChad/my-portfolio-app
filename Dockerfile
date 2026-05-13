# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# BASE_URL is required at build time (used in nuxt.config.ts for site.url and i18n.baseUrl)
ARG BASE_URL
ENV BASE_URL=$BASE_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:24-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.output ./.output

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
