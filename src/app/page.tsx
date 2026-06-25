import { projectRepository } from "@/repositories/project-repository";
import { labRepository } from "@/repositories/lab-repository";
import { HomeView } from "@/components/site/home-view";

// Content is sourced from Postgres at request time.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featured, labs] = await Promise.all([projectRepository.findFeatured(), labRepository.findAll()]);
  return <HomeView projects={featured} labs={labs} />;
}
