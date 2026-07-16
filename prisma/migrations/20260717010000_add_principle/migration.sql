-- Philosophy principles move from static config into the database so they can
-- be managed like projects, posts, and labs.

-- CreateTable
CREATE TABLE "Principle" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Principle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Principle_slug_key" ON "Principle"("slug");

-- CreateIndex
CREATE INDEX "Principle_order_idx" ON "Principle"("order");

-- Same lockdown as every other table: Supabase publishes the public schema over
-- PostgREST, and this app only reaches Postgres through Prisma as the table
-- owner (which bypasses RLS). See 20260717000000_indexes_and_rls.
ALTER TABLE "Principle" ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    REVOKE ALL ON TABLE "Principle" FROM anon;
  END IF;

  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    REVOKE ALL ON TABLE "Principle" FROM authenticated;
  END IF;
END
$$;
