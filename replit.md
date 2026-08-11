# [Project name]

_Replace the heading above with the project's name, and this line with one sentence describing what this app does for users._

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Architecture decisions

- **FloatAnim uses CSS keyframes, not Framer Motion** — The hero renders 20+ insect instances simultaneously. Framer Motion animates on the JS main thread, creating per-frame overhead that compounds at that count. CSS keyframe animations run on the compositor thread with zero JS cost per frame. Do not replace FloatAnim with `<motion.div>` or `useAnimate()`; doing so reintroduces the compositor pressure that was deliberately removed. Per-instance parameters (y-range, rotation) are passed as CSS custom properties (`--base-rot`, `--y-neg`, `--rot-pos`, `--rot-neg`) consumed by `@keyframes insect-float` in `index.css`. The rest of the page (FadeIn, ParallaxImage, StickyNav) continues to use Framer Motion normally.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
