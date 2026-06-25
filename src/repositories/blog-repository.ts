import { prisma } from "@/lib/prisma";
import type { BlogPost } from "@/types/content";

export const blogRepository = {
  findAll(): Promise<BlogPost[]> {
    return prisma.blogPost.findMany({ orderBy: { date: "desc" } });
  },

  findBySlug(slug: string): Promise<BlogPost | null> {
    return prisma.blogPost.findUnique({ where: { slug } });
  },
};
