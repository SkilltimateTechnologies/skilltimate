/**
 * Seed helper — creates the single admin user from ADMIN_EMAIL / ADMIN_PASSWORD.
 *
 * Runs automatically on server startup (guarded + idempotent) and can also be
 * invoked directly:  cd packages/web && bun --env-file=../../.env run src/api/seed.ts
 */
import { db } from "./database/index";
import * as schema from "./database/schema";
import { auth } from "./auth";
import { eq } from "drizzle-orm";

export async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn("⚠️  ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin creation.");
    return;
  }
  const existing = await db.select().from(schema.user).where(eq(schema.user.email, email));
  if (existing.length > 0) {
    console.log(`✓ Admin already exists: ${email}`);
    return;
  }
  await auth.api.signUpEmail({
    body: { email, password, name: "Skilltimate Admin" },
  });
  console.log(`✓ Admin created: ${email}`);
}

// When run directly as a script (not imported), execute + exit.
if (import.meta.main) {
  seedAdmin()
    .then(() => {
      console.log("✅ Seed complete");
      process.exit(0);
    })
    .catch((e) => {
      console.error("Seed failed:", e);
      process.exit(1);
    });
}
