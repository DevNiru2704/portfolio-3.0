-- Projects each carried their own accent hue (cyan, blue, purple, orange, two
-- greens) - the exact rainbow removed when the site moved to a single amber
-- accent. A per-project colour column that must always hold the same colour is
-- dead data, so the accent now lives once in CSS as --signal.

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "accent";
