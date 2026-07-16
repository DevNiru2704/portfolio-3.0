import { prisma } from "@/lib/prisma";
import type { Principle } from "@/types/content";

export const principleRepository = {
  findAll(): Promise<Principle[]> {
    return prisma.principle.findMany({ orderBy: { order: "asc" } });
  },

  findBySlug(slug: string): Promise<Principle | null> {
    return prisma.principle.findUnique({ where: { slug } });
  },

  count(): Promise<number> {
    return prisma.principle.count();
  },
};
