# Multi-stage Dockerfile for a Node.js application (example)
ARG NODE_VERSION=18-alpine
FROM node:${NODE_VERSION} AS builder
LABEL stage=builder

WORKDIR /app
# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Copy source and build (if present)
COPY . .
RUN npm run build --if-present

# Runtime image
FROM node:${NODE_VERSION} AS runner
LABEL maintainer="you@example.com"
ENV NODE_ENV=production
WORKDIR /app

# create non-root user
RUN addgroup -S app && adduser -S app -G app
# Install a tiny HTTP client for healthchecks
RUN apk add --no-cache curl

# Copy runtime artifacts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

USER app
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Default command (adjust entry point as needed)
CMD ["node", "dist/index.js"]