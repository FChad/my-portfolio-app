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

# dumb-init forwards SIGTERM/SIGINT to Node so the container stops cleanly
RUN apk add --no-cache dumb-init

# Run as the unprivileged "node" user shipped with the base image
COPY --from=builder --chown=node:node /app/.output ./.output

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO /dev/null http://127.0.0.1:3000/ || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", ".output/server/index.mjs"]
