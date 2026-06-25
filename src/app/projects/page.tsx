import type { Metadata } from "next";
import { projectRepository } from "@/repositories/project-repository";
import { ProjectsExplorer } from "@/components/site/projects-explorer";

export const metadata: Metadata = {
  title: "Projects",
  description: "Shipped, instrumented, and accountable engineering projects with architecture and metrics.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await projectRepository.findAll();
  return <ProjectsExplorer projects={projects} />;
}
