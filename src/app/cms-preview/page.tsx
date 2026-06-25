import type { Metadata } from "next";
import { projectRepository } from "@/repositories/project-repository";
import { blogRepository } from "@/repositories/blog-repository";
import { labRepository } from "@/repositories/lab-repository";
import { CmsPreviewView } from "@/components/site/cms-preview-view";

export const metadata: Metadata = {
  title: "CMS Preview",
  description: "A public, read-only preview of the CMS powering this portfolio.",
};

export const dynamic = "force-dynamic";

export default async function CmsPreviewPage() {
  const [projects, posts, labs] = await Promise.all([
    projectRepository.findAll(),
    blogRepository.findAll(),
    labRepository.findAll(),
  ]);
  return <CmsPreviewView projects={projects} posts={posts} labs={labs} />;
}
