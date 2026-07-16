import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { blogRepository } from "@/repositories/blog-repository";
import { GridBg } from "@/components/site/grid-bg";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog",
  description: "Long-form technical writing about systems, AI, and engineering.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await blogRepository.findAll();

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border">
        <GridBg />
        <div className="container relative py-16">
          <SectionHeading
            eyebrow="Blog"
            title="Technical writing about systems, AI, and engineering."
            description="Long-form pieces on the things I learn while building. No quick tips, no listicles - actual engineering writing."
          />
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-5">
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-foreground/20 md:p-8"
            >
              <div className="pointer-events-none absolute inset-0 bg-grid-sm opacity-[0.04]" />
              <div className="relative grid gap-6 md:grid-cols-[1fr_220px] md:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em]">post 0{i + 1}</span>
                  </div>
                  <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight md:text-3xl">{post.title}</h2>
                  <p className="mt-2 max-w-prose text-balance text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="rounded-md bg-secondary/50 font-mono text-[10px] font-normal text-muted-foreground"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="hidden flex-col items-end gap-2 md:flex">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-border bg-background transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">read</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
