import { prisma } from "@/lib/prisma";
import type { Message } from "@/types/content";

export interface NewMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const messageRepository = {
  create(data: NewMessage): Promise<Message> {
    return prisma.message.create({ data });
  },

  findRecent(limit = 100): Promise<Message[]> {
    return prisma.message.findMany({ orderBy: { createdAt: "desc" }, take: limit });
  },

  count(): Promise<number> {
    return prisma.message.count();
  },
};
