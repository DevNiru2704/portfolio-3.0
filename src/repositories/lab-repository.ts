import { prisma } from "@/lib/prisma";
import type { Lab } from "@/types/content";

export const labRepository = {
  findAll(): Promise<Lab[]> {
    return prisma.lab.findMany({ orderBy: { createdAt: "asc" } });
  },
};
