import { Hono } from "hono";
import { cors } from "hono/cors";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "./database";
import * as schema from "./database/schema";
import { auth } from "./auth";
import { authMiddleware, requireAuth } from "./middleware/auth";

type Variables = {
  user: typeof schema.user.$inferSelect | null;
  session: typeof schema.session.$inferSelect | null;
};

const VALID_SOURCES = ["demo", "enroll", "contact", "register"];
const VALID_STATUS = ["new", "contacted", "converted", "closed"];

const clampInt = (v: unknown, min: number, max: number, fallback: number) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
};

type SettingsRow = typeof schema.siteSettings.$inferSelect;

/** Lazily create the settings table + default row, then return it (id = 1). */
async function ensureSettings(): Promise<SettingsRow> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS site_settings (
    id integer PRIMARY KEY,
    currency text NOT NULL DEFAULT '₹',
    original_price integer NOT NULL DEFAULT 3691,
    discount_percent integer NOT NULL DEFAULT 15,
    gst_percent integer NOT NULL DEFAULT 18,
    offer_enabled integer NOT NULL DEFAULT 1,
    offer_hours integer NOT NULL DEFAULT 48,
    updated_at integer NOT NULL DEFAULT 0
  )`);
  const rows = await db.select().from(schema.siteSettings).where(eq(schema.siteSettings.id, 1));
  if (rows[0]) return rows[0];
  const [row] = await db
    .insert(schema.siteSettings)
    .values({ id: 1 })
    .returning();
  return row;
}

/** Public shape sent to the site — includes the derived deal price. */
function toPublicSettings(s: SettingsRow) {
  const dealPrice = Math.max(0, Math.round(s.originalPrice * (1 - s.discountPercent / 100)));
  return {
    currency: s.currency,
    originalPrice: s.originalPrice,
    dealPrice,
    discountPercent: s.discountPercent,
    gstPercent: s.gstPercent,
    offerEnabled: s.offerEnabled,
    offerHours: s.offerHours,
  };
}

const app = new Hono<{ Variables: Variables }>()
  .use(
    cors({
      origin: (origin) => origin ?? "*",
      credentials: true,
      exposeHeaders: ["set-auth-token"],
    }),
  )
  .on(["GET", "POST"], "/api/auth/*", (c) => auth.handler(c.req.raw))
  .basePath("api")
  .use("*", authMiddleware)
  .get("/health", (c) => c.json({ status: "ok" }, 200))

  // ---------------- Lead capture (public) ----------------
  .post("/leads", async (c) => {
    const body = await c.req.json<{
      name?: string;
      email?: string;
      phone?: string;
      course?: string;
      message?: string;
      source?: string;
    }>();
    const src = VALID_SOURCES.includes(body.source ?? "") ? body.source! : "register";
    const [lead] = await db
      .insert(schema.leads)
      .values({
        name: body.name?.trim() || null,
        email: body.email?.trim() || null,
        phone: body.phone?.trim() || null,
        course: body.course?.trim() || null,
        message: body.message?.trim() || null,
        source: src,
      })
      .returning();
    return c.json({ lead }, 201);
  })

  // ---------------- Site settings: pricing & offer ----------------
  .get("/settings", async (c) => {
    const s = await ensureSettings();
    return c.json({ settings: toPublicSettings(s) }, 200);
  })
  .put("/admin/settings", requireAuth, async (c) => {
    const current = await ensureSettings();
    const body = await c.req.json<{
      currency?: string;
      originalPrice?: number;
      discountPercent?: number;
      gstPercent?: number;
      offerEnabled?: boolean;
      offerHours?: number;
    }>();
    const next = {
      currency: (body.currency ?? current.currency).toString().trim().slice(0, 4) || "₹",
      originalPrice: clampInt(body.originalPrice ?? current.originalPrice, 0, 10_000_000, current.originalPrice),
      discountPercent: clampInt(body.discountPercent ?? current.discountPercent, 0, 100, current.discountPercent),
      gstPercent: clampInt(body.gstPercent ?? current.gstPercent, 0, 100, current.gstPercent),
      offerEnabled: typeof body.offerEnabled === "boolean" ? body.offerEnabled : current.offerEnabled,
      offerHours: clampInt(body.offerHours ?? current.offerHours, 1, 720, current.offerHours),
      updatedAt: new Date(),
    };
    const [row] = await db
      .update(schema.siteSettings)
      .set(next)
      .where(eq(schema.siteSettings.id, 1))
      .returning();
    return c.json({ settings: toPublicSettings(row) }, 200);
  })

  // ---------------- Admin: session ----------------
  .get("/admin/me", requireAuth, (c) => {
    const user = c.get("user")!;
    return c.json({ user: { id: user.id, email: user.email, name: user.name } }, 200);
  })
  .post("/admin/change-password", requireAuth, async (c) => {
    const body = await c.req.json<{ currentPassword: string; newPassword: string }>();
    try {
      await auth.api.changePassword({
        body: {
          currentPassword: body.currentPassword,
          newPassword: body.newPassword,
          revokeOtherSessions: false,
        },
        headers: c.req.raw.headers,
      });
      return c.json({ ok: true }, 200);
    } catch {
      return c.json({ ok: false, message: "Current password is incorrect" }, 400);
    }
  })

  // ---------------- Admin: leads ----------------
  .get("/admin/leads", requireAuth, async (c) => {
    const rows = await db
      .select()
      .from(schema.leads)
      .orderBy(desc(schema.leads.createdAt));
    return c.json({ leads: rows }, 200);
  })
  .patch("/admin/leads/:id", requireAuth, async (c) => {
    const id = Number(c.req.param("id"));
    const body = await c.req.json<{ status?: string; notes?: string }>();
    const patch: Record<string, unknown> = {};
    if (body.status && VALID_STATUS.includes(body.status)) patch.status = body.status;
    if (body.notes !== undefined) patch.notes = body.notes;
    const [row] = await db
      .update(schema.leads)
      .set(patch)
      .where(eq(schema.leads.id, id))
      .returning();
    return c.json({ lead: row }, 200);
  })
  .delete("/admin/leads/:id", requireAuth, async (c) => {
    await db.delete(schema.leads).where(eq(schema.leads.id, Number(c.req.param("id"))));
    return c.json({ ok: true }, 200);
  })
  .get("/admin/leads/export", requireAuth, async (c) => {
    const rows = await db
      .select()
      .from(schema.leads)
      .orderBy(desc(schema.leads.createdAt));
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const header = [
      "id",
      "name",
      "email",
      "phone",
      "course",
      "message",
      "source",
      "status",
      "notes",
      "createdAt",
    ];
    const lines = [header.join(",")];
    for (const r of rows) {
      lines.push(
        [
          r.id,
          r.name,
          r.email,
          r.phone,
          r.course,
          r.message,
          r.source,
          r.status,
          r.notes,
          r.createdAt?.toISOString?.() ?? "",
        ]
          .map(esc)
          .join(","),
      );
    }
    return new Response(lines.join("\n"), {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="skilltimate-leads.csv"',
      },
    });
  });

export type AppType = typeof app;
export default app;
