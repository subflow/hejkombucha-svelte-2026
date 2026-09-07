# syntax=docker/dockerfile:1

# --- Build stage: install all deps and build the adapter-node output ---
FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build
# Migrations + första-admin-seed som en fristående fil, så runtime-imagen slipper src/ och dev-deps.
RUN bun build scripts/migrate.ts --target=bun --outfile build/migrate.js

# --- Runtime stage: production deps + build output only ---
FROM oven/bun:1
WORKDIR /app
ENV NODE_ENV=production
# adapter-node listens on 0.0.0.0:3000 by default; honors PORT/HOST/ORIGIN env vars.
ENV PORT=3000
# Krävs bakom proxy: SvelteKit CSRF-skyddet jämför formulär-POST mot ORIGIN. Coolify kan skriva över.
ENV ORIGIN=https://hejkombucha.se
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production
COPY --from=builder /app/build ./build
COPY drizzle ./drizzle
EXPOSE 3000
# Migrera (och seeda första admin om tomt) innan servern startar. Misslyckas migrationen startar inte servern.
CMD ["sh", "-c", "bun ./build/migrate.js && bun ./build/index.js"]
