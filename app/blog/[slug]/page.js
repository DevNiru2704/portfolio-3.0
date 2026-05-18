import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { seedBlog } from '@/config/seed';
import { GridBg } from '@/components/site/grid-bg';
import { Badge } from '@/components/ui/badge';

export async function generateStaticParams() {
  return seedBlog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = seedBlog.find((x) => x.slug === params.slug);
  if (!p) return {};
  return { title: p.title, description: p.excerpt };
}

function Page({ params }) {
  const post = seedBlog.find((p) => p.slug === params.slug);
  if (!post) notFound();
  const others = seedBlog.filter((p) => p.slug !== post.slug);
  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border">
        <GridBg />
        <div className="container relative py-14">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to blog
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-3 w-3" />{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3" />{post.readTime}</span>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-md bg-secondary/50 font-mono text-[10px] font-normal text-muted-foreground">{t}</Badge>
              ))}
            </div>
          </div>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            <span className="text-gradient">{post.title}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-lg text-muted-foreground">{post.excerpt}</p>
        </div>
      </section>

      <section className="container grid gap-10 py-14 lg:grid-cols-[1fr_260px]">
        <article className="prose prose-invert max-w-prose dark:prose-invert">
          {post.body.split(/\n\n+/).map((para, i) => (
            <p key={i} className="mb-5 text-balance leading-relaxed text-foreground/90">
              {para.trim()}
            </p>
          ))}
          <div className="mt-10 rounded-2xl border border-border bg-card/60 p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">end of article</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Found this useful? <Link href="/contact" className="text-foreground underline">Send me a note</Link> or follow along on <a href="https://twitter.com/nirmalya" target="_blank" rel="noreferrer" className="text-foreground underline">Twitter/X</a>.
            </p>
          </div>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card/60 p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Related posts</div>
            <ul className="mt-3 space-y-2">
              {others.map((p) => (
                <li key={p.id}>
                  <Link href={`/blog/${p.slug}`} className="group flex items-start gap-3 rounded-md border border-border bg-background px-3 py-2 transition-colors hover:border-foreground/20">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[hsl(var(--glow-cyan))]" />
                    <span className="text-sm leading-tight">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
export default Page;
