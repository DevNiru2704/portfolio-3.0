import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const projects: Prisma.ProjectCreateInput[] = [
  {
    slug: "devsync",
    title: "DevSync",
    category: "Full Stack",
    tags: ["Next.js", "TypeScript", "Supabase", "WebSockets", "Tailwind"],
    description:
      "A real-time developer collaboration platform for modern teams. Built for speed, designed for engineers.",
    overview:
      "DevSync is a real-time collaboration platform that enables distributed engineering teams to work together on code, deploy together, and monitor together. Built with Next.js, Supabase Realtime, and WebSockets.",
    featured: true,
    github: "https://github.com/nirmalya/devsync",
    live: "https://devsync.dev",
    status: "published",
    year: 2025,
    metrics: { stars: 142, forks: 28, users: "500+", uptime: "99.98%" },
    features: [
      "Real-time collaboration with presence awareness",
      "CI/CD automation and deployment monitoring",
      "Role-based access control",
      "Monitoring and analytics dashboard",
    ],
    architecture:
      "Next.js App Router frontend. Supabase for database and realtime subscriptions. Clerk for auth. Deployed on Vercel with edge functions.",
    challenges:
      "Handling real-time state synchronization across 100+ concurrent users without conflicts. Solved using CRDT-inspired merge strategies and Supabase Realtime channels.",
    tradeoffs:
      "Prioritized realtime fidelity over offline support in v1. Offline-first edits planned for v2 via Yjs integration.",
    performance:
      "p95 latency under 80ms for collaborative edits. Tree-shaken bundle: 142KB initial JS. LCP under 1.2s on cold cache.",
    accent: "199 89% 74%",
    cover: "/images/projects/devsync.png",
  },
  {
    slug: "ai-study-buddy",
    title: "AI Study Buddy",
    category: "AI/ML",
    tags: ["Next.js", "OpenAI", "LangChain", "PostgreSQL", "Tailwind"],
    description:
      "An AI-powered study assistant with content generation, quiz creation, and intelligent summarization.",
    overview:
      "AI Study Buddy helps students and engineers learn faster using AI. It generates summaries, creates quizzes, explains concepts, and tracks learning progress — all powered by LangChain and OpenAI.",
    featured: true,
    github: "https://github.com/nirmalya/ai-study-buddy",
    live: "https://ai-study-buddy.vercel.app",
    status: "published",
    year: 2024,
    metrics: { stars: 87, forks: 14, users: "1.2K+", uptime: "99.95%" },
    features: [
      "AI-powered content summarization",
      "Automatic quiz generation from notes",
      "Concept explanation with Socratic dialogue",
      "Learning progress tracking",
    ],
    architecture:
      "Next.js frontend with Server Actions. LangChain orchestration layer. OpenAI GPT-4 for generation. PostgreSQL via Supabase for user data and history.",
    challenges:
      "Keeping generation latency under 2s while maintaining quality. Used streaming responses and prompt caching to achieve 1.4s average response time.",
    tradeoffs:
      "Chose OpenAI over self-hosted models for v1 to ship fast. Local-model fallback (Ollama) is the v2 roadmap item.",
    performance:
      "1.4s average first token. Streaming UI keeps perceived latency under 600ms. Token caching saves 38% on cost.",
    accent: "250 91% 85%",
    cover: "/images/projects/ai-study-buddy.png",
  },
  {
    slug: "infrapilot",
    title: "InfraPilot",
    category: "DevOps",
    tags: ["Go", "Terraform", "AWS", "Docker", "CLI"],
    description:
      "An infrastructure automation tool for deploying and managing cloud resources using natural language commands.",
    overview:
      "InfraPilot translates natural language infrastructure requests into Terraform plans and executes them safely. Engineers describe what they want — InfraPilot figures out the how.",
    featured: true,
    github: "https://github.com/nirmalya/infrapilot",
    live: "https://infrapilot.dev",
    status: "published",
    year: 2025,
    metrics: { stars: 203, forks: 41, users: "active", uptime: "—" },
    features: [
      "Natural language to Terraform conversion",
      "Safe plan + apply workflow with human approval",
      "Multi-cloud support (AWS, GCP, Azure)",
      "Deployment history and rollback",
    ],
    architecture:
      "Go CLI tool. LangChain for NL-to-Terraform translation. Terraform for actual infrastructure management. Docker for sandboxed execution. AWS SDK for resource management.",
    challenges:
      "Preventing hallucinated Terraform configs from causing real infrastructure damage. Solved with a mandatory plan-review step and a static analysis layer before any apply.",
    tradeoffs:
      "Forced human-in-the-loop for all applies. Slower than full auto, but zero accidental destruction in 6 months of internal use.",
    performance:
      "Plan generation under 4s on average. Static analysis adds 200ms. Cold start of sandboxed runner: 1.1s.",
    accent: "213 94% 78%",
    cover: "/images/projects/infrapilot.png",
  },
];

const posts: Prisma.BlogPostCreateInput[] = [
  {
    slug: "arch-linux-hyprland-setup",
    title: "Why I Switched to Arch Linux + Hyprland (And Never Looked Back)",
    excerpt:
      "After years on Ubuntu and macOS, I rebuilt my entire dev environment from scratch on Arch Linux with Hyprland. Here's what I learned, what broke, and why it was worth it.",
    tags: ["Linux", "DevOps", "Workflow"],
    readTime: "8 min",
    date: "2025-03-12",
    status: "published",
    body: `Moving to Arch Linux was not a weekend project. It was a month-long process of breaking things, learning why they broke, and rebuilding them better. But what I got at the end was a system I completely understood — and that's worth more than any convenience.

Hyprland gives me dynamic tiling, smooth animations, and a workflow that feels native to how I think about windows and workspaces. Combined with Neovim, tmux, and a custom dotfiles setup, I now have a development environment that gets out of my way.

The real value of Arch isn't the rolling release or the AUR — it's the process of building it from scratch. You learn your system. You stop being a user and start being an operator.`,
  },
  {
    slug: "terraform-github-actions-pipeline",
    title: "Building Production-Grade Terraform Pipelines with GitHub Actions",
    excerpt:
      "Most Terraform tutorials stop at 'terraform apply'. Here's how I build actual production pipelines with plan reviews, drift detection, and rollback strategies.",
    tags: ["DevOps", "Terraform", "CI/CD"],
    readTime: "12 min",
    date: "2025-04-01",
    status: "published",
    body: `Terraform is easy to start and hard to scale safely. The internet is full of tutorials that show you how to write a main.tf and run terraform apply. Almost none of them show you what a production pipeline actually looks like.

In this post I'll walk through the pipeline I use on InfraPilot and several client projects: plan on PR, human approval gate, apply on merge, drift detection on schedule, and automated rollback on failure.

The key insight is that Terraform pipelines should be boring. If something exciting happens in your infra pipeline, that's a bad sign.`,
  },
  {
    slug: "llm-fine-tuning-lora-guide",
    title: "Fine-Tuning LLMs with LoRA: A Practical Guide for Engineers",
    excerpt:
      "LoRA changed what's possible for engineers who want to fine-tune large models without a GPU cluster. Here's a practical, no-nonsense guide to actually doing it.",
    tags: ["AI/ML", "LLMs", "Python"],
    readTime: "15 min",
    date: "2025-04-28",
    status: "published",
    body: `Full fine-tuning a 7B parameter model requires hardware most engineers don't have. LoRA (Low-Rank Adaptation) changes that by training only a small set of adapter weights while the base model stays frozen.

The result: you can fine-tune a meaningful model on a single consumer GPU in a few hours. I've done this for code generation, infrastructure description tasks, and document summarization.

This guide covers the full pipeline: dataset preparation, training with Hugging Face PEFT, evaluation, and serving with Ollama.`,
  },
];

const labs: Prisma.LabCreateInput[] = [
  { slug: "local-ai-agent", title: "Local AI Agent with Ollama + LangChain", description: "A fully local AI agent that can browse files, run shell commands, and answer questions about a codebase. No API keys. No cloud.", status: "In Progress", tags: ["AI", "LangChain", "Ollama", "Python"], progress: 65 },
  { slug: "hyprland-shaders", title: "Hyprland Shader Collection", description: "A collection of GLSL shaders for Hyprland — including a CRT scanline effect, a subtle film grain overlay, and a chromatic aberration shader for focused windows.", status: "Done", tags: ["Linux", "GLSL", "Hyprland"], progress: 100 },
  { slug: "terminal-dashboard-go", title: "Terminal Dashboard in Go (bubbletea)", description: "A custom TUI dashboard built with Go and bubbletea that shows system stats, git status, active Docker containers, and a Pomodoro timer.", status: "In Progress", tags: ["Go", "CLI", "TUI"], progress: 40 },
  { slug: "posture-monitor-cv", title: "CV-Powered Posture Monitor", description: "A computer vision tool using MediaPipe that monitors posture during coding sessions and sends desktop notifications when bad posture is detected for more than 30 seconds.", status: "Done", tags: ["Python", "Computer Vision", "MediaPipe"], progress: 100 },
  { slug: "dotfiles-sync", title: "Automated Dotfiles Sync System", description: "A zero-dependency bash system that syncs dotfiles across machines using a private Git repo, with conflict detection and rollback. Used across 3 machines daily.", status: "Done", tags: ["Bash", "Linux", "Automation"], progress: 100 },
];

async function main() {
  for (const data of projects) {
    await prisma.project.upsert({ where: { slug: data.slug }, update: data, create: data });
  }
  for (const data of posts) {
    await prisma.blogPost.upsert({ where: { slug: data.slug }, update: data, create: data });
  }
  for (const data of labs) {
    await prisma.lab.upsert({ where: { slug: data.slug }, update: data, create: data });
  }
  console.log(`Seeded ${projects.length} projects, ${posts.length} posts, ${labs.length} labs.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
