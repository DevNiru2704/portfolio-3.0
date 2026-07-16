# Portfolio 3.0 - Agent Guide

Personal portfolio of Nirmalya Mandal. **Live in production** on Vercel at
https://devniru.in, with PostgreSQL on Supabase (ap-south-1). Next.js App Router site
with content split between the database (projects, blog posts, labs, philosophy
principles, /now sections, contact messages) and static config (identity, experience,
skills).

This site is the website listed on Nirmalya's CV, so recruiters land here: keep it
truthful, working, and free of placeholder content.

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
  `messageRepository.findRecent` and `principleRepository.findBySlug` are
  intentionally unused - reserved for the planned private dashboard.
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
- `src/config/content.ts` - experience timeline and skills by layer. These are
  **static config, not database rows**: they ship with the build and need no
  seeding. **Everything here must stay factually true** - fabricated demo content
  was deliberately removed in 2026-07; do not reintroduce invented metrics,
  testimonials, or fake telemetry.
- `prisma/seed.ts` - projects, blog posts, labs, philosophy principles, and the
  /now sections. Same truthfulness rule. Company projects (DokLink, Glass
  Automation, Vayita Grow, A Fashions) get no GitHub links. `BlogPost.date` is a
  String sorted lexicographically - always use `YYYY-MM-DD`. `Principle.order`
  and `NowItem.order` drive display sequence; keep values contiguous when adding
  or reordering. `NowItem.category` is a Postgres enum (`NowCategory`) - adding a
  category needs a migration, and the `goal` category is rendered as a single item.
- Blog bodies render as plain paragraphs split on blank lines
  (`blog/[slug]/page.tsx`) - no markdown headers, lists, or code blocks.
- `/cms-preview` and `/dashboard` are labeled concept demos - read-only, no writes
  wired up. `cms-preview-view.tsx` contains inline sample telemetry constants; that
  is intentional and labeled, so keep the "sample data" labeling if you touch those
  pages. See **CMS status** below before building on them.

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

Copy `.env.example` to `.env` (local dev). `.env.prod` holds the production values
and is gitignored - never commit either.

- `DATABASE_URL` - PostgreSQL. Locally: any Postgres.
- `RESEND_API_KEY` - contact email (optional; failure is soft, message still persists)
- `CONTACT_FROM_EMAIL` - must be on a Resend-verified domain (`send.devniru.in`).
  Falls back to `onboarding@resend.dev`, which can only deliver to the Resend
  account owner.
- `CONTACT_TO_EMAIL` - where contact notifications land.

### Supabase connection strings (two different ones)

| Use | Port | Why |
| --- | --- | --- |
| Vercel runtime (`DATABASE_URL` env var) | **6543** transaction pooler | serverless-safe; many short-lived function instances |
| `prisma migrate deploy` / `db:seed` from a laptop | **5432** session pooler | the transaction pooler cannot run DDL (no advisory locks) |

Both use the `postgres.<project-ref>` username. **The session pooler needs
`?sslmode=require` appended** - without it Prisma fails with a misleading
`P1001: Can't reach database server`. The direct host (`db.<ref>.supabase.co`)
is IPv6-only and generally not reachable from IPv4 networks; use the pooler.

Applying migrations, without printing secrets:

```bash
export DATABASE_URL="$(grep '^DATABASE_URL=' .env.prod | cut -d'"' -f2 | sed 's|:6543/|:5432/|')?sslmode=require"
npx prisma migrate deploy
```

Seeding works through either pooler (it is DML, not DDL).

### Connection pooling

`src/lib/prisma.ts` sets `max: 3` on the `PrismaPg` adapter. With Prisma 7 driver
adapters, `?connection_limit=` and `?pgbouncer=true` in the URL are **ignored** -
node-postgres owns the pool, so the ceiling must be set in code.

### Row level security

Supabase publishes every `public` table through its PostgREST API. This app never
uses that API (Prisma connects as the table owner, which bypasses RLS), so the
migration `20260717000000_indexes_and_rls` enables RLS with **no policies** and
revokes `anon` / `authenticated` grants - closing the REST surface entirely.
`Message` holds contact-form PII and must never become publicly readable. If a
future feature needs supabase-js, add explicit policies then; do not disable RLS.

## Deployment (live)

Deployed and serving since 2026-07-17.

- **Hosting**: Vercel, GitHub integration on `main` of `DevNiru2704/portfolio-3.0`.
  Every push to `main` deploys; branches get preview deployments. Build command is
  the default `npm run build`; `postinstall` runs `prisma generate`.
- **Database**: Supabase PostgreSQL (ap-south-1), reached through the transaction
  pooler. Vercel env vars: `DATABASE_URL`, `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`,
  `CONTACT_TO_EMAIL`.
- **Email**: Resend on the verified sending subdomain `send.devniru.in` (SPF + DKIM
  at GoDaddy; Tokyo region). Contact notifications go to the Outlook address with
  the visitor's address as reply-to.
- **DNS**: GoDaddy. The apex `devniru.in` 308-redirects to `www.devniru.in`, which
  is the domain Vercel actually serves. **Known inconsistency**: `owner.url` is the
  apex, so `sitemap.xml`, `og:url` and canonical tags advertise `devniru.in` while
  the served canonical is `www`. Everything resolves through the redirect, but if
  this is ever tidied, either make the apex primary in Vercel or set
  `owner.url = "https://www.devniru.in"` - do not change one without the other.

### Shipping a content change

Migrations and seeding are **not** part of the build, on purpose (the build must not
depend on a live DB). After changing `prisma/seed.ts` or the schema:

1. Local: `npx prisma migrate deploy && npm run db:seed`
2. Production: `migrate deploy` with the **5432** session pooler URL (see above),
   then seed with either pooler.
3. Push to `main` only if app code changed - content-only edits take effect as soon
   as the DB is seeded, because every content page is `force-dynamic`.

### Static assets

`public/og.png` (1200x630, generated with a PIL script; regenerate if branding
changes), `public/resume.pdf` (copy of the current CV - keep in sync with the Resume
project), `src/app/icon.svg` (favicon).

## CMS status (next piece of work)

Content is fully database-backed, but **editing it still means changing
`prisma/seed.ts` and re-seeding**. Writing a real CMS is the next planned task.

What exists today:

- `/cms-preview` - a **read-only concept UI**, public and `force-dynamic`. Panels for
  Projects, Blog, Philosophy, and Now render real rows from Postgres; Overview,
  Media, Messages, Analytics, Deployments, AI Assistant and Settings render inline
  **sample data** that is clearly labeled as such. Every write control (New entry,
  Save, Upload) is deliberately `disabled`.
- `/dashboard` - a stub that says "coming soon", `robots: noindex`. There is **no
  auth library installed**; earlier copy claiming Clerk was removed as untrue.
- Unused-but-ready repository methods: `messageRepository.findRecent` / `.count`,
  `principleRepository.findBySlug`, `projectRepository.count`, `blogRepository.count`,
  `nowRepository.count`.

What a real CMS needs:

1. **Auth** on `/dashboard` (nothing is installed yet - pick a library first).
2. **Write paths**: Server Actions per model, Zod-validated, mirroring
   `src/actions/contact.ts`. Keep the repository pattern - actions call repositories,
   never Prisma directly.
3. **Ordering**: `Principle.order` and `NowItem.order` need reorder handling; slugs
   are the stable upsert keys the seed relies on, so keep them unique and stable.
4. **Seed coexistence**: `npm run db:seed` **deletes rows whose slugs are not in the
   seed file**. Once content is edited through a CMS, that behaviour will destroy
   CMS-created rows - change the seed to upsert-only, or stop running it against
   production, before shipping writes.
5. Decide whether `/cms-preview` stays a public showcase (it is a portfolio piece)
   or becomes the authenticated editor.
