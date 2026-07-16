import { projectRepository } from "@/repositories/project-repository";
import { labRepository } from "@/repositories/lab-repository";
import { blogRepository } from "@/repositories/blog-repository";
import { messageRepository } from "@/repositories/message-repository";
import { HomeView } from "@/components/site/home-view";

// Content is sourced from Postgres at request time.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featured, labs, projectCount, postCount, messageCount] = await Promise.all([
    projectRepository.findFeatured(),
    labRepository.findAll(),
    projectRepository.count(),
    blogRepository.count(),
    messageRepository.count(),
  ]);
  return (
    <HomeView
      projects={featured}
      labs={labs}
      counts={{ projects: projectCount, posts: postCount, messages: messageCount }}
    />
  );
}
