// Domain types for content. Decoupled from Prisma so UI never imports the ORM.

export interface ProjectMetrics {
  stars?: number;
  forks?: number;
  users?: string;
  uptime?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  overview: string | null;
  featured: boolean;
  github: string | null;
  live: string | null;
  status: string;
  year: number;
  metrics: ProjectMetrics | null;
  features: string[];
  architecture: string | null;
  challenges: string | null;
  tradeoffs: string | null;
  performance: string | null;
  accent: string | null;
  cover: string | null;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  date: string;
  status: string;
  body: string;
}

export interface Lab {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: string;
  tags: string[];
  progress: number;
}

export interface Principle {
  id: string;
  slug: string;
  title: string;
  body: string;
  order: number;
}

export type NowCategory = "building" | "learning" | "experimenting" | "stack" | "goal";

export interface NowItem {
  id: string;
  slug: string;
  category: NowCategory;
  body: string;
  order: number;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: Date;
}
