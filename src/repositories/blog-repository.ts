import { prisma } from "@/lib/prisma";
import { readingTime } from "@/lib/reading-time";
import type { BlogPost } from "@/types/content";
import type { BlogPost as PrismaBlogPost } from "@prisma/client";

// readTime is computed from the body rather than stored, so it can never
// disagree with the text.
function toPost(row: PrismaBlogPost): BlogPost {
  return { ...row, readTime: readingTime(row.body) };
}

export const blogRepository = {
  async findAll(): Promise<BlogPost[]> {
    const rows = await prisma.blogPost.findMany({ orderBy: { date: "desc" } });
    return rows.map(toPost);
  },

  async findBySlug(slug: string): Promise<BlogPost | null> {
    const row = await prisma.blogPost.findUnique({ where: { slug } });
    return row ? toPost(row) : null;
  },

  count(): Promise<number> {
    return prisma.blogPost.count();
  },
};
