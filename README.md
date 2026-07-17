# Portfolio 3.0

Personal portfolio of Nirmalya Mandal - live at [devniru.in](https://devniru.in).

## Stack

- Next.js 16 (App Router) + React 19, TypeScript
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`), dark only
- PostgreSQL via Prisma 7 (pg driver adapter), Supabase in production
- Server Actions + Zod for the contact form, Resend for email
- Deployed on Vercel

## Local setup

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL (any local Postgres works)
npm run db:push        # create tables
npm run db:seed        # load content
npm run dev
```

The build never needs a live database (content pages are `force-dynamic`), so
`npm run build` works without one.

## Content

Projects, blog posts, labs, philosophy principles, and the `/now` sections live in
PostgreSQL and are seeded from `prisma/seed.ts`. Identity, the experience timeline,
and the skills list live in `src/config/owner.ts` and `src/config/content.ts`.

Editing content currently means updating the seed and re-running `npm run db:seed`.
An authenticated CMS is planned - `/cms-preview` is a read-only interface concept
for now.

See `AGENTS.md` for architecture, deployment, database, and CMS notes.
