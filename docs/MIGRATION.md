# Migration Notes — Portfolio 3.0

This project was regenerated from a fresh `create-next-app` (TypeScript, App Router,
`src/` directory, Tailwind v4) and refactored off the original Emergent scaffold.

## Stack

| Area     | Before                          | After                                   |
| -------- | ------------------------------- | --------------------------------------- |
| Language | JavaScript (.js/.jsx)           | TypeScript (.ts/.tsx), strict           |
| Next.js  | 14.2.3 (Pages-era config)       | 16.2.9 (App Router, Turbopack)          |
| React    | 18                              | 19                                      |
| Styling  | Tailwind CSS v3 (JS config)     | Tailwind CSS v4 (CSS `@theme`)          |
| Database | MongoDB (`mongodb`, catch-all API route) | PostgreSQL via Prisma          |
| Forms    | `fetch('/api/contact')`         | Server Action + Zod + React Hook Form   |
| Email    | —                               | Resend                                  |

## Tailwind v3 → v4

- `tailwind.config.js` and `postcss.config.js` were removed.
- The design tokens, container, and custom utilities now live in `src/app/globals.css`
  using `@import "tailwindcss"`, `@theme inline`, `@custom-variant dark`, and `@utility`.
- `tailwindcss-animate` was replaced by `tw-animate-css` (imported in `globals.css`).

## Data layer

- `prisma/schema.prisma` — `Project`, `BlogPost`, `Lab`, `Message`.
- `prisma/seed.ts` — seeds projects/blog/lab (run `npm run db:seed`).
- `src/repositories/*` — data access; UI never imports Prisma directly.
- DB-backed pages use `export const dynamic = "force-dynamic"` so the build does not
  require a live database. Switch to ISR (`export const revalidate = N`) once the DB is
  reachable at build time if you prefer prerendering.

## Packages removed (present before, unused by the actual site)

`mongodb`, `uuid`, `axios`, `@tanstack/react-table`, `recharts`, `date-fns`,
`embla-carousel-react`, `input-otp`, `react-day-picker`, `react-resizable-panels`,
`vaul`, `cmdk`'s unused siblings, `tailwindcss-animate`, `autoprefixer`, `globals`,
and ~25 unused `@radix-ui/*` packages (only `@radix-ui/react-dialog` is used, by the
command palette). The dead shadcn/ui components that depended on them were deleted —
only `badge`, `command`, `dialog`, and `sonner` remain.

## Packages kept / added

Kept: `framer-motion`, `lucide-react`, `next-themes`, `sonner`, `cmdk`,
`@radix-ui/react-dialog`, `class-variance-authority`, `clsx`, `tailwind-merge`,
`react-hook-form`, `@hookform/resolvers`, `zod`.

Added: `@prisma/client` + `prisma`, `resend`, `tw-animate-css`, `tsx`.

## Environment

Copy `.env.example` to `.env` and fill in `DATABASE_URL`, `RESEND_API_KEY`,
`CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`.

## Local setup

```bash
npm install
npm run db:push   # create tables
npm run db:seed   # load projects/blog/lab
npm run dev
```
