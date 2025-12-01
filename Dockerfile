
# ===============================================
# Stage 1: Builder
# ===============================================
FROM node:20-alpine AS builder

# Install dependencies for Prisma and native modules
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy package files first (better caching)
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else npm install; \
  fi

# Copy prisma schema first
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the source code
COPY . .

# Build Next.js app
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ===============================================
# Stage 2: Production Runner
# ===============================================
FROM node:20-alpine AS runner

# Install runtime dependencies for Prisma
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy built application
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/prisma ./prisma

# Copy .env if it exists (be careful with secrets in production!)
COPY --from=builder /app/.env* ./

EXPOSE 8080

ENV PORT=8080

CMD ["npm", "start"]