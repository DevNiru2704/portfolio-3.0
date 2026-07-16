-- Prisma creates "_prisma_migrations" itself, before any migration runs, so it
-- picks up Supabase's default grants for the public API roles. The table only
-- holds migration names and checksums, and RLS already denies these roles, but
-- there is no reason for the REST API to see it at all.
--
-- Guarded so this is a no-op on a plain local Postgres.

ALTER TABLE "_prisma_migrations" ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    REVOKE ALL ON TABLE "_prisma_migrations" FROM anon;
  END IF;

  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    REVOKE ALL ON TABLE "_prisma_migrations" FROM authenticated;
  END IF;
END
$$;
