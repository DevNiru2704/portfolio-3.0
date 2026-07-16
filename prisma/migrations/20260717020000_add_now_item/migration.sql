-- The /now page moves from static config into the database so its sections can
-- be managed like the rest of the content.

-- CreateEnum
CREATE TYPE "NowCategory" AS ENUM ('building', 'learning', 'experimenting', 'stack', 'goal');

-- CreateTable
CREATE TABLE "NowItem" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "NowCategory" NOT NULL,
    "body" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NowItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NowItem_slug_key" ON "NowItem"("slug");

-- CreateIndex
CREATE INDEX "NowItem_category_order_idx" ON "NowItem"("category", "order");

-- Same lockdown as every other table: Supabase publishes the public schema over
-- PostgREST, and this app only reaches Postgres through Prisma as the table
-- owner (which bypasses RLS). See 20260717000000_indexes_and_rls.
ALTER TABLE "NowItem" ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    REVOKE ALL ON TABLE "NowItem" FROM anon;
  END IF;

  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    REVOKE ALL ON TABLE "NowItem" FROM authenticated;
  END IF;
END
$$;
