import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export * from "./auth-schema";

/**
 * Leads captured from the Register popup, enroll and contact forms.
 * This is the single source of truth for the leads CMS at /admin.
 */
export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  course: text("course"),
  message: text("message"),
  source: text("source").notNull().default("contact"), // "demo" | "enroll" | "contact"
  status: text("status").notNull().default("new"), // "new" | "contacted" | "converted" | "closed"
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

/**
 * Single-row site settings — pricing & offer controls editable from /admin.
 * Always id = 1. Deal price is derived from originalPrice + discountPercent.
 */
export const siteSettings = sqliteTable("site_settings", {
  id: integer("id").primaryKey(), // always 1
  currency: text("currency").notNull().default("₹"),
  originalPrice: integer("original_price").notNull().default(3691),
  discountPercent: integer("discount_percent").notNull().default(15),
  gstPercent: integer("gst_percent").notNull().default(18),
  offerEnabled: integer("offer_enabled", { mode: "boolean" }).notNull().default(true),
  offerHours: integer("offer_hours").notNull().default(48),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
