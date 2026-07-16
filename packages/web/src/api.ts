// Entry re-export for the API app.
//
// The Hono app and its routes live in `./api/` (see `./api/index.ts`).
// Some deploy environments (e.g. Railway's build resolver) resolve
// `import app from "./api"` to a FILE named `api.ts` and do NOT fall back to
// the `api/index.ts` directory index. This thin re-export makes that import
// resolve identically across Bun, Node, and bundlers.
export { default } from "./api/index";
export type { AppType } from "./api/index";
