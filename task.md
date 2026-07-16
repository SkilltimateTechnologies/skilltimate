# Skilltimate — Leads CMS (simplified scope)

## Final direction (user decided)
- DROP page-builder / content CMS entirely. Public pages stay code-managed (static data files).
- KEEP: `/admin` = professional LEADS CMS only (login + leads table/filter/status/notes/CSV/delete).
- Book-a-demo WhatsApp REMOVED. Replace with **Register popup form**:
  Full Name, Contact Number, Email ID, Additional Details → saves lead (source="register").
- DB = user's own Turso (skilltimate-com). Tables: leads + better-auth only. CMS tables dropped.

## Done
- [x] Point .env to user's Turso + save GITHUB_REPO/GITHUB_TOKEN/ADMIN creds; verified DB connect
- [x] Trim schema to leads(+email,notes) + auth-schema; created tables via raw SQL (drizzle-kit flaky)
- [x] Dropped leftover CMS tables (courses/articles/testimonials/settings/seo_pages/pages)
- [x] Rewrote api/index.ts: auth + POST /leads(register) + admin leads CRUD/CSV; removed content routes
- [x] Rewrote seed.ts → admin only; ran seed → admin created (skilltimate.studio@gmail.com)
- [x] use-lead.ts updated (email field, register source)
- [x] register-modal.tsx (global popup) + RegisterButton primitive + wired RegisterProvider in main.tsx

## Done (final pass)
- [x] Replaced all WAButton/WA_DEMO/FloatingWA → RegisterButton across landing/blog/course/etc.
- [x] Confirmed NO content.tsx / bootstrap fetch remains (grep clean)
- [x] Course enquiry (course.tsx) → RegisterButton
- [x] Built /admin: login + leads dashboard (stats, filter status/source/date, search, status dropdown, notes drawer, CSV export, delete). Navy+gold.
- [x] Added /admin route in app.tsx
- [x] Fixed stale "Book-a-Demo" comment in schema.ts → "Register popup"
- [x] Register-button hover comet ring + text vertical centering VERIFIED via screenshots
- [x] Cleanup Claude upload files + temp screenshots
- [x] End-to-end verified: POST /leads 201; admin sign-in/me; leads GET; PATCH status+notes; CSV export; DELETE; unauth 401
- [x] tsc --noEmit clean; bun run build PASSED then deliver

## Notes
- Brand: navy #04091A, gold #E7B94C, azure #2E8FFF. Fonts Bricolage/Inter/JetBrains/Playfair/Noticia.
- Admin token stored localStorage st_admin_token; api client sends Bearer.
- Course price ₹3,500 + GST; pass 700/1000.
