-- Align indexes with the repository query patterns.

-- DropIndex
DROP INDEX IF EXISTS "Project_featured_idx";

-- CreateIndex
CREATE INDEX "Project_featured_year_idx" ON "Project"("featured", "year");

-- CreateIndex
CREATE INDEX "BlogPost_date_idx" ON "BlogPost"("date");

-- CreateIndex
CREATE INDEX "Lab_createdAt_idx" ON "Lab"("createdAt");

-- ---------------------------------------------------------------------------
-- Row level security.
--
-- Supabase publishes every table in the `public` schema through its
-- PostgREST API, reachable with the publishable anon key. This app never
-- uses that API: it talks to Postgres directly through Prisma as the table
-- owner, and owners bypass RLS. So enabling RLS with no policies closes the
-- REST surface completely while leaving the app untouched.
--
-- This matters most for "Message", which stores contact form submissions
-- (names and email addresses) that must never be publicly readable.
--
-- These statements are idempotent and safe on a plain local Postgres, where
-- the Supabase roles do not exist.
-- ---------------------------------------------------------------------------

ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogPost" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lab" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Message" ENABLE ROW LEVEL SECURITY;

-- Defence in depth: drop the table grants Supabase hands to the public roles
-- by default, so access fails on privileges before RLS is even consulted.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    REVOKE ALL ON TABLE "Project", "BlogPost", "Lab", "Message" FROM anon;
  END IF;

  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    REVOKE ALL ON TABLE "Project", "BlogPost", "Lab", "Message" FROM authenticated;
  END IF;
END
$$;
