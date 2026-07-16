import { prisma } from "@/lib/prisma";
import type { NowItem } from "@/types/content";

export const nowRepository = {
  findAll(): Promise<NowItem[]> {
    return prisma.nowItem.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
  },

  count(): Promise<number> {
    return prisma.nowItem.count();
  },
};
