// --- Startup env validation (runs BEFORE importing the app) -----------------
// The DB client throws at import time if DATABASE_URL is missing, so we must
// validate + fail loud here first, then dynamically import the app.
const REQUIRED_ENV = [
  "DATABASE_URL",
  "DATABASE_AUTH_TOKEN",
  "BETTER_AUTH_SECRET",
  "WEBSITE_URL",
] as const;

const missing = REQUIRED_ENV.filter((k) => !process.env[k]?.trim());
if (missing.length > 0) {
  console.error(
    `\n❌ Cannot start: missing required environment variable(s): ${missing.join(", ")}.\n` +
      `   Set them in your host (Railway → Variables) or a local .env file.\n` +
      `   See RAILWAY_SETUP.md for the full list.\n`,
  );
  process.exit(1);
}

// Dynamic imports so the checks above run before any DB client is constructed.
const { default: app } = await import("./api");
const { seedAdmin } = await import("./api/seed");

const port = Number(process.env.PORT ?? 3000);
const distDir = `${import.meta.dir}/../dist`;
const indexPath = `${distDir}/index.html`;

const server = Bun.serve({
  port,
  // Bind to all interfaces so Railway / containers can route to the process.
  hostname: "0.0.0.0",
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api")) {
      try {
        return await app.fetch(request);
      } catch (err) {
        console.error("API error:", err);
        return new Response(
          JSON.stringify({ error: "Internal Server Error" }),
          { status: 500, headers: { "Content-Type": "application/json" } },
        );
      }
    }

    const filePath = getStaticFilePath(url.pathname);
    const file = Bun.file(filePath);

    if (await file.exists()) {
      return new Response(file);
    }

    const index = Bun.file(indexPath);
    if (await index.exists()) {
      return new Response(index, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    return new Response(
      "Build output not found. Run `bun run build` before starting the server.",
      {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      },
    );
  },
});

console.log(`✓ Web server listening on http://0.0.0.0:${server.port}`);

// Ensure the admin user exists. Non-blocking + fully guarded so a DB hiccup
// can never take the container down at boot.
seedAdmin().catch((err: unknown) => console.error("Admin seed skipped:", err));

// Never let an unexpected async error silently kill the container.
process.on("uncaughtException", (err) => console.error("uncaughtException:", err));
process.on("unhandledRejection", (err) => console.error("unhandledRejection:", err));

function getStaticFilePath(pathname: string) {
  const cleanPath = decodeURIComponent(pathname)
    .replace(/^\/+/, "")
    .replaceAll("..", "");

  return cleanPath ? `${distDir}/${cleanPath}` : indexPath;
}
