FROM node:lts-alpine3.17 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY prisma ./prisma

COPY . .

# IMPORTANT: Generate Prisma Client with correct binary inside Docker
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# --- Production Image ---
FROM node:lts-alpine3.17 AS runner

WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/prisma ./prisma

EXPOSE 8080

CMD ["npm", "start"]
