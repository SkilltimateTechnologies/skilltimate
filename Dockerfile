# --- Skilltimate web app (Bun + Vite + React + Hono) ------------------------
# Reproducible Docker build for Railway (avoids flaky Nixpacks nix builds).
FROM oven/bun:1.3.14

WORKDIR /app

# Don't download the Electron binary during install — the web server never uses it.
ENV ELECTRON_SKIP_BINARY_DOWNLOAD=1 \
    HUSKY=0 \
    NODE_ENV=production

# --- Install dependencies (cached layer) ------------------------------------
# Copy manifests first so `bun install` is only re-run when deps change.
COPY package.json bun.lock ./
COPY packages/web/package.json ./packages/web/
COPY packages/desktop/package.json ./packages/desktop/
COPY packages/mobile/package.json ./packages/mobile/
RUN bun install

# --- Build the web bundle ---------------------------------------------------
COPY . .
RUN bun run build:web

# --- Run --------------------------------------------------------------------
# Railway injects PORT automatically; the server binds 0.0.0.0:$PORT.
EXPOSE 8080
CMD ["bun", "run", "start:prod"]
