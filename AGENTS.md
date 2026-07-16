# Portfolio 3.0 - Agent Guide

Personal portfolio of Nirmalya Mandal, served at https://devniru.in. Next.js App Router
site with content split between PostgreSQL (projects, blog posts, labs, contact messages)
and static config files (identity, experience, skills, philosophy).

## Stack

- Next.js 16 (App Router, Turbopack) + React 19, strict TypeScript
- Tailwind CSS v4, CSS-first config (no tailwind.config.js - see Styling below)
- Prisma 7 with the `@prisma/adapter-pg` driver adapter on PostgreSQL (Supabase in prod)
- Server Actions + Zod + React Hook Form for the contact flow; Resend for email
- framer-motion, lucide-react, next-themes, sonner, cmdk

## Commands

- `npm run dev` - dev server
- `npm run build` - `prisma generate && next build` (does NOT need a live DB, see below)
- `npm run lint` - eslint 9 flat config
- `npm run db:push` - push schema to the DB pointed at by `DATABASE_URL`
- `npm run db:seed` - upsert real content from `prisma/seed.ts` (also deletes rows whose
  slugs are no longer in the seed, so it is safe to re-run after content edits)
- `npm run db:studio` - Prisma Studio
- `npx tsc --noEmit` - typecheck

## Architecture rules

- **Repository pattern**: UI never imports Prisma. All data access goes through
  `src/repositories/*` which return domain types from `src/types/content.ts`.
  `messageRepository.findRecent` is intentionally unused - reserved for the planned
  private dashboard.
- **Prisma 7 driver adapter**: `prisma/schema.prisma` has NO `url` on the datasource.
  The runtime client (`src/lib/prisma.ts`) connects through `new PrismaPg({...})`;
  the CLI (push/migrate/seed/studio) reads the URL from `prisma.config.ts`. Do not
  add `url` back to the schema.
- **force-dynamic**: every DB-backed page exports `dynamic = "force-dynamic"` so
  `next build` never needs a database. Keep this for new DB pages, or switch to ISR
  only once the build environment can reach the DB.
- **Node runtime only**: Prisma + `pg` cannot run on the edge. Never add
  `runtime = "edge"` to DB pages or actions. `next.config.ts` lists
  `@prisma/client`, `@prisma/adapter-pg`, `pg` in `serverExternalPackages` - keep it.
- **Detail pages fetch all rows on purpose**: `/projects/[slug]` and `/blog/[slug]`
  call `findAll()` and filter, because the sidebar needs the full list anyway
  (`generateMetadata` uses `findBySlug`). Datasets are small; do not "optimize" this
  into two queries unless the content grows significantly.

## Content model - where truth lives

- `src/config/owner.ts` - identity: name, role, contact links, domain (`owner.url`
  drives metadataBase, sitemap, robots, OG). Change the domain here and nowhere else.
- `src/config/content.ts` - experience timeline, skills by layer, now snapshot,
  philosophy principles. **Everything here must stay factually true** - fabricated
  demo content was deliberately removed in 2026-07; do not reintroduce invented
  metrics, testimonials, or fake telemetry.
- `prisma/seed.ts` - projects, blog posts, labs. Same truthfulness rule. Company
  projects (DokLink, Glass Automation, Vayita Grow, A Fashions) get no GitHub links.
  `BlogPost.date` is a String sorted lexicographically - always use `YYYY-MM-DD`.
- Blog bodies render as plain paragraphs split on blank lines
  (`blog/[slug]/page.tsx`) - no markdown headers, lists, or code blocks.
- `/cms-preview` and `/dashboard` are labeled concept demos. `cms-preview-view.tsx`
  contains inline sample telemetry constants - that is intentional and labeled;
  keep the "sample data" labeling if you touch those pages.

## Styling

Tailwind v4: all design tokens, custom utilities (`container`, `glass`,
`text-gradient`, `glow-cyan`, `bg-grid`, `animate-marquee`, ...) and the dark
variant live in `src/app/globals.css` via `@theme inline` and `@utility`. There is
no JS config. Dynamic per-project accent colors use inline `style={{...}}` with HSL
triplets (e.g. `"199 89% 74%"`) - this is the accepted pattern (webhint inline-style
warnings are silenced in `.hintrc`).

Writing style rule (applies to all content and code written for this repo): never
use em dashes or en dashes; use plain hyphens.

## Environment

Copy `.env.example` to `.env`. Variables:

- `DATABASE_URL` - PostgreSQL. Locally: any Postgres. Production runtime (Vercel):
  Supabase **pooled** connection string (pgBouncer, port 6543). For `prisma migrate
  deploy` / `db:push` / `db:seed` use the **session/direct** string (port 5432) -
  pgBouncer breaks migrations.
- `RESEND_API_KEY` - contact email (optional; failure is soft, message still persists)
- `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` - contact routing

## Deployment (Vercel + Supabase)

- GitHub integration on `main` of DevNiru2704/portfolio-3.0; custom domain devniru.in.
- Build command is the default `npm run build`; `postinstall` runs `prisma generate`.
- Migrations/seed are NOT run by the build - run them manually against Supabase:
  `npx prisma migrate deploy` then `npm run db:seed` (with the direct URL).
- Static assets: `public/og.png` (1200x630, regenerate via a PIL script if branding
  changes), `public/resume.pdf` (copy of the current resume - keep in sync with the
  Resume repo), `src/app/icon.svg` (favicon).
