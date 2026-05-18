import { owner } from '@/config/owner';

export default function sitemap() {
  const base = owner.url;
  const paths = ['/', '/projects', '/lab', '/blog', '/about', '/now', '/philosophy', '/contact', '/cms-preview'];
  const now = new Date();
  return paths.map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: 'weekly', priority: p === '/' ? 1 : 0.7 }));
}
