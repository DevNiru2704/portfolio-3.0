import { prisma } from "@/lib/prisma";
import type { Project, ProjectMetrics } from "@/types/content";
import type { Project as PrismaProject } from "@prisma/client";

function toProject(row: PrismaProject): Project {
  return { ...row, metrics: (row.metrics as ProjectMetrics | null) ?? null };
}

export const projectRepository = {
  async findAll(): Promise<Project[]> {
    const rows = await prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { year: "desc" }],
    });
    return rows.map(toProject);
  },

  async findFeatured(): Promise<Project[]> {
    const rows = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { year: "desc" },
    });
    return rows.map(toProject);
  },

  async findBySlug(slug: string): Promise<Project | null> {
    const row = await prisma.project.findUnique({ where: { slug } });
    return row ? toProject(row) : null;
  },

  count(): Promise<number> {
    return prisma.project.count();
  },
};
