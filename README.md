# Portfolio 3.0

Personal portfolio of Nirmalya Mandal - live at [devniru.in](https://devniru.in).

## Stack

- Next.js 16 (App Router) + React 19, TypeScript
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)
- PostgreSQL via Prisma 7 (pg driver adapter), Supabase in production
- Server Actions + Zod for the contact form, Resend for email
- Deployed on Vercel

## Local setup

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL (any local Postgres works)
npm run db:push        # create tables
npm run db:seed        # load projects, blog posts, labs
npm run dev
```

The build never needs a live database (DB pages are `force-dynamic`), so
`npm run build` works without one.

## Content

- Projects, blog posts, and labs live in PostgreSQL, seeded from `prisma/seed.ts`.
- Identity, experience, skills, and philosophy live in `src/config/owner.ts` and
  `src/config/content.ts`.

See `AGENTS.md` for architecture details and deployment notes.
