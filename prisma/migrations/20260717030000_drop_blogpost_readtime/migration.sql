-- readTime was a stored string, typed by hand and independent of the body, so
-- it could claim "8 min" for a three minute post. It is now derived from the
-- text in blogRepository (see src/lib/reading-time.ts), which cannot go stale.

-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "readTime";
