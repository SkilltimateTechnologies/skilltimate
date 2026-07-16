# Deploying Skilltimate to Railway

This is a Bun + Vite + React + Hono web app. One process serves both the static
site and the `/api/*` routes.

## 1. Set environment variables

Railway → your `skilltimate` service → **Variables** → **Raw Editor** → paste:

```
NODE_ENV=production
WEBSITE_URL=https://skilltimate-production.up.railway.app
DATABASE_URL=libsql://skilltimate-com-skilltimate.aws-ap-south-1.turso.io
DATABASE_AUTH_TOKEN=<your-turso-token>
BETTER_AUTH_SECRET=<openssl rand -base64 32>
ADMIN_EMAIL=skilltimate.studio@gmail.com
ADMIN_PASSWORD=<strong-password>
```

Rules:
- **`WEBSITE_URL`** must match the real deployed URL and have **no trailing slash**.
- **Do NOT set `PORT`** — Railway injects it automatically (usually `8080`); the
  server reads `process.env.PORT`.
- Only these 7 vars matter. `S3_*`, `AI_GATEWAY_*`, `AUTUMN_*`, `APPLICATION_ID`
  are not used by the running server — leave them out (add later only if needed).

## 2. Build & start (already wired in `railway.json`)

- **Build:** `bun install && bun run build`
- **Start:** `bun run start:prod`  →  `bun packages/web/src/server.ts`

No PM2 in production — the server runs in the foreground so Railway can track it.
There's no separate start command to set in the UI; `railway.json` handles it.

## 3. Deploy

Push to `main` (Railway auto-deploys) or click **Deploy** in the Railway UI.
On boot the server:
1. Validates the required env vars (fails loud with a clear message if any is missing).
2. Starts on `0.0.0.0:$PORT`.
3. Auto-creates the admin user from `ADMIN_EMAIL` / `ADMIN_PASSWORD` (idempotent).

## 4. Verify

- `https://<your-domain>/`            → site loads
- `https://<your-domain>/api/health`  → `{"status":"ok"}`
- `https://<your-domain>/api/settings`→ pricing JSON
- `https://<your-domain>/admin`       → admin login

## Troubleshooting

| Symptom | Cause / Fix |
|---|---|
| Crash right after "Build success" with no app logs | A required env var is missing. The server now prints exactly which one. Add it in Variables. |
| "Build output not found" (500) | Build didn't run. Confirm `railway.json` build command ran, or run `bun run build`. |
| Auth/login redirect errors | `WEBSITE_URL` wrong or has a trailing slash. Set it to the exact deployed URL. |
| Can't log in to `/admin` | Check `ADMIN_EMAIL` / `ADMIN_PASSWORD`; the admin is created on first successful boot. |
