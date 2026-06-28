# syntax=docker/dockerfile:1

# --- Build stage: install all deps and build the adapter-node output ---
FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# --- Runtime stage: production deps + build output only ---
FROM oven/bun:1
WORKDIR /app
ENV NODE_ENV=production
# adapter-node listens on 0.0.0.0:3000 by default; honors PORT/HOST/ORIGIN env vars.
ENV PORT=3000
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["bun", "./build/index.js"]
