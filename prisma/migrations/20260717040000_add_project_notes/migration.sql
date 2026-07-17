-- Company work has no public repo and sometimes no public URL yet. Rather than
-- silently showing nothing, projects can explain why: NDA-bound source, or a
-- launch date still ahead.

-- AlterTable
ALTER TABLE "Project" ADD COLUMN "sourceNote" TEXT;
ALTER TABLE "Project" ADD COLUMN "liveNote" TEXT;
