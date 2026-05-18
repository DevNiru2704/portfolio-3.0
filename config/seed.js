// Fallback / seed data. Used when DB is empty or unavailable, and powers
// /cms-preview entirely. All data shapes should mirror what the API returns.

export const seedProjects = [
  {
    id: 'p_devsync',
    slug: 'devsync',
    title: 'DevSync',
    category: 'Full Stack',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'WebSockets', 'Tailwind'],
    description:
      'A real-time developer collaboration platform for modern teams. Built for speed, designed for engineers.',
    overview:
      'DevSync is a real-time collaboration platform that enables distributed engineering teams to work together on code, deploy together, and monitor together. Built with Next.js, Supabase Realtime, and WebSockets.',
    featured: true,
    github: 'https://github.com/nirmalya/devsync',
    live: 'https://devsync.dev',
    status: 'published',
    year: 2025,
    metrics: { stars: 142, forks: 28, users: '500+', uptime: '99.98%' },
    features: [
      'Real-time collaboration with presence awareness',
      'CI/CD automation and deployment monitoring',
      'Role-based access control',
      'Monitoring and analytics dashboard',
    ],
    architecture:
      'Next.js App Router frontend. Supabase for database and realtime subscriptions. Clerk for auth. Deployed on Vercel with edge functions.',
    challenges:
      'Handling real-time state synchronization across 100+ concurrent users without conflicts. Solved using CRDT-inspired merge strategies and Supabase Realtime channels.',
    tradeoffs:
      'Prioritized realtime fidelity over offline support in v1. Offline-first edits planned for v2 via Yjs integration.',
    performance:
      'p95 latency under 80ms for collaborative edits. Tree-shaken bundle: 142KB initial JS. LCP under 1.2s on cold cache.',
    accent: '199 89% 74%',
    cover: '/images/projects/devsync.png',
  },
  {
    id: 'p_ai_study_buddy',
    slug: 'ai-study-buddy',
    title: 'AI Study Buddy',
    category: 'AI/ML',
    tags: ['Next.js', 'OpenAI', 'LangChain', 'PostgreSQL', 'Tailwind'],
    description:
      'An AI-powered study assistant with content generation, quiz creation, and intelligent summarization.',
    overview:
      'AI Study Buddy helps students and engineers learn faster using AI. It generates summaries, creates quizzes, explains concepts, and tracks learning progress — all powered by LangChain and OpenAI.',
    featured: true,
    github: 'https://github.com/nirmalya/ai-study-buddy',
    live: 'https://ai-study-buddy.vercel.app',
    status: 'published',
    year: 2024,
    metrics: { stars: 87, forks: 14, users: '1.2K+', uptime: '99.95%' },
    features: [
      'AI-powered content summarization',
      'Automatic quiz generation from notes',
      'Concept explanation with Socratic dialogue',
      'Learning progress tracking',
    ],
    architecture:
      'Next.js frontend with Server Actions. LangChain orchestration layer. OpenAI GPT-4 for generation. PostgreSQL via Supabase for user data and history.',
    challenges:
      'Keeping generation latency under 2s while maintaining quality. Used streaming responses and prompt caching to achieve 1.4s average response time.',
    tradeoffs:
      'Chose OpenAI over self-hosted models for v1 to ship fast. Local-model fallback (Ollama) is the v2 roadmap item.',
    performance:
      '1.4s average first token. Streaming UI keeps perceived latency under 600ms. Token caching saves 38% on cost.',
    accent: '250 91% 85%',
    cover: '/images/projects/ai-study-buddy.png',
  },
  {
    id: 'p_infrapilot',
    slug: 'infrapilot',
    title: 'InfraPilot',
    category: 'DevOps',
    tags: ['Go', 'Terraform', 'AWS', 'Docker', 'CLI'],
    description:
      'An infrastructure automation tool for deploying and managing cloud resources using natural language commands.',
    overview:
      'InfraPilot translates natural language infrastructure requests into Terraform plans and executes them safely. Engineers describe what they want — InfraPilot figures out the how.',
    featured: true,
    github: 'https://github.com/nirmalya/infrapilot',
    live: 'https://infrapilot.dev',
    status: 'published',
    year: 2025,
    metrics: { stars: 203, forks: 41, users: 'active', uptime: '—' },
    features: [
      'Natural language to Terraform conversion',
      'Safe plan + apply workflow with human approval',
      'Multi-cloud support (AWS, GCP, Azure)',
      'Deployment history and rollback',
    ],
    architecture:
      'Go CLI tool. LangChain for NL-to-Terraform translation. Terraform for actual infrastructure management. Docker for sandboxed execution. AWS SDK for resource management.',
    challenges:
      'Preventing hallucinated Terraform configs from causing real infrastructure damage. Solved with a mandatory plan-review step and a static analysis layer before any apply.',
    tradeoffs:
      'Forced human-in-the-loop for all applies. Slower than full auto, but zero accidental destruction in 6 months of internal use.',
    performance:
      'Plan generation under 4s on average. Static analysis adds 200ms. Cold start of sandboxed runner: 1.1s.',
    accent: '213 94% 78%',
    cover: '/images/projects/infrapilot.png',
  },
];

export const seedBlog = [
  {
    id: 'b_arch_hyprland',
    slug: 'arch-linux-hyprland-setup',
    title: 'Why I Switched to Arch Linux + Hyprland (And Never Looked Back)',
    excerpt:
      "After years on Ubuntu and macOS, I rebuilt my entire dev environment from scratch on Arch Linux with Hyprland. Here's what I learned, what broke, and why it was worth it.",
    tags: ['Linux', 'DevOps', 'Workflow'],
    readTime: '8 min',
    date: '2025-03-12',
    status: 'published',
    body: `Moving to Arch Linux was not a weekend project. It was a month-long process of breaking things, learning why they broke, and rebuilding them better. But what I got at the end was a system I completely understood — and that's worth more than any convenience.

Hyprland gives me dynamic tiling, smooth animations, and a workflow that feels native to how I think about windows and workspaces. Combined with Neovim, tmux, and a custom dotfiles setup, I now have a development environment that gets out of my way.

The real value of Arch isn't the rolling release or the AUR — it's the process of building it from scratch. You learn your system. You stop being a user and start being an operator.`,
  },
  {
    id: 'b_terraform_pipelines',
    slug: 'terraform-github-actions-pipeline',
    title: 'Building Production-Grade Terraform Pipelines with GitHub Actions',
    excerpt:
      "Most Terraform tutorials stop at 'terraform apply'. Here's how I build actual production pipelines with plan reviews, drift detection, and rollback strategies.",
    tags: ['DevOps', 'Terraform', 'CI/CD'],
    readTime: '12 min',
    date: '2025-04-01',
    status: 'published',
    body: `Terraform is easy to start and hard to scale safely. The internet is full of tutorials that show you how to write a main.tf and run terraform apply. Almost none of them show you what a production pipeline actually looks like.

In this post I'll walk through the pipeline I use on InfraPilot and several client projects: plan on PR, human approval gate, apply on merge, drift detection on schedule, and automated rollback on failure.

The key insight is that Terraform pipelines should be boring. If something exciting happens in your infra pipeline, that's a bad sign.`,
  },
  {
    id: 'b_lora_finetune',
    slug: 'llm-fine-tuning-lora-guide',
    title: 'Fine-Tuning LLMs with LoRA: A Practical Guide for Engineers',
    excerpt:
      "LoRA changed what's possible for engineers who want to fine-tune large models without a GPU cluster. Here's a practical, no-nonsense guide to actually doing it.",
    tags: ['AI/ML', 'LLMs', 'Python'],
    readTime: '15 min',
    date: '2025-04-28',
    status: 'published',
    body: `Full fine-tuning a 7B parameter model requires hardware most engineers don't have. LoRA (Low-Rank Adaptation) changes that by training only a small set of adapter weights while the base model stays frozen.

The result: you can fine-tune a meaningful model on a single consumer GPU in a few hours. I've done this for code generation, infrastructure description tasks, and document summarization.

This guide covers the full pipeline: dataset preparation, training with Hugging Face PEFT, evaluation, and serving with Ollama.`,
  },
];

export const seedLab = [
  {
    id: 'l_local_ai_agent',
    slug: 'local-ai-agent',
    title: 'Local AI Agent with Ollama + LangChain',
    description:
      'A fully local AI agent that can browse files, run shell commands, and answer questions about a codebase. No API keys. No cloud.',
    status: 'In Progress',
    tags: ['AI', 'LangChain', 'Ollama', 'Python'],
    progress: 65,
  },
  {
    id: 'l_hyprland_shaders',
    slug: 'hyprland-shaders',
    title: 'Hyprland Shader Collection',
    description:
      'A collection of GLSL shaders for Hyprland — including a CRT scanline effect, a subtle film grain overlay, and a chromatic aberration shader for focused windows.',
    status: 'Done',
    tags: ['Linux', 'GLSL', 'Hyprland'],
    progress: 100,
  },
  {
    id: 'l_terminal_dashboard',
    slug: 'terminal-dashboard-go',
    title: 'Terminal Dashboard in Go (bubbletea)',
    description:
      'A custom TUI dashboard built with Go and bubbletea that shows system stats, git status, active Docker containers, and a Pomodoro timer.',
    status: 'In Progress',
    tags: ['Go', 'CLI', 'TUI'],
    progress: 40,
  },
  {
    id: 'l_posture_cv',
    slug: 'posture-monitor-cv',
    title: 'CV-Powered Posture Monitor',
    description:
      'A computer vision tool using MediaPipe that monitors posture during coding sessions and sends desktop notifications when bad posture is detected for more than 30 seconds.',
    status: 'Done',
    tags: ['Python', 'Computer Vision', 'MediaPipe'],
    progress: 100,
  },
  {
    id: 'l_dotfiles_sync',
    slug: 'dotfiles-sync',
    title: 'Automated Dotfiles Sync System',
    description:
      'A zero-dependency bash system that syncs dotfiles across machines using a private Git repo, with conflict detection and rollback. Used across 3 machines daily.',
    status: 'Done',
    tags: ['Bash', 'Linux', 'Automation'],
    progress: 100,
  },
];

export const seedExperience = [
  {
    year: '2021',
    title: 'Started programming',
    description: 'Built first Django + React app. Learned the fundamentals of full-stack engineering.',
  },
  {
    year: '2022',
    title: 'First production deployment',
    description: 'Shipped a real product to real users. Learned Docker, CI/CD, and cloud infrastructure.',
  },
  {
    year: '2023',
    title: 'Moved to Arch Linux + Hyprland',
    description: 'Went deep into DevOps, Terraform, PostgreSQL. Rebuilt my entire workflow from the ground up.',
  },
  {
    year: '2024',
    title: 'Shifted focus to AI/ML',
    description: 'Started building AI-powered developer tools. Got serious about LLM orchestration and RAG.',
  },
  {
    year: '2025',
    title: 'Building InfraPilot',
    description: 'Exploring LLM fine-tuning, autonomous agents, and infrastructure-as-language systems.',
  },
];

export const seedStack = {
  Frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  Backend: ['Django', 'Go', 'PostgreSQL', 'Supabase', 'REST APIs'],
  DevOps: ['Docker', 'Terraform', 'GitHub Actions', 'Vercel', 'AWS'],
  'AI/ML': ['LangChain', 'Ollama', 'OpenAI API', 'HuggingFace', 'Vector DBs'],
  Tools: ['Neovim', 'Arch Linux', 'Hyprland', 'Git', 'tmux'],
};

export const seedNow = {
  building: [
    'InfraPilot — infrastructure automation tool for deploying and managing cloud resources using natural language commands and Terraform under the hood.',
  ],
  learning: [
    'LLM fine-tuning with LoRA and QLoRA',
    'Rust (for systems-level CLI tooling)',
    'Kubernetes internals and operator patterns',
  ],
  experimenting: [
    'Local AI agents with Ollama + LangChain',
    'Hyprland shader customizations',
    'Custom terminal dashboard using Go + bubbletea',
  ],
  stack: ['Go', 'Rust', 'Terraform', 'Kubernetes', 'Supabase', 'Next.js 15'],
  goal: 'Ship InfraPilot v1 publicly. Get first 100 GitHub stars.',
};

export const seedPhilosophy = [
  {
    title: 'Automation First',
    body: 'If I do something twice, I automate it the third time. Repetition is a signal that a system is missing.',
  },
  {
    title: 'Architecture Over Features',
    body: 'A well-designed system can absorb new features gracefully. A poorly designed one collapses under them.',
  },
  {
    title: 'Performance Is Respect',
    body: "Fast software respects the user's time. Every unnecessary millisecond is a form of disrespect.",
  },
  {
    title: 'Tools Shape Thinking',
    body: 'The tools you use define how you think about problems. Choose them carefully. Build them when necessary.',
  },
  {
    title: 'Linux Is Freedom',
    body: 'Running your own stack, knowing your system, owning your environment — this is engineering, not just usage.',
  },
  {
    title: 'Simplicity Is Hard',
    body: 'Complex solutions are easy. Simple, elegant, maintainable systems are where real engineering lives.',
  },
  {
    title: 'Ownership',
    body: "If it's deployed, it's mine. If it breaks, I fix it. No blame, no handoffs. Full ownership.",
  },
];

export const seedSystemStatus = {
  services: [
    { name: 'Portfolio', state: 'operational', label: 'Online' },
    { name: 'API', state: 'operational', label: 'Operational' },
    { name: 'Database', state: 'operational', label: 'Operational' },
    { name: 'Edge Network', state: 'operational', label: 'Operational' },
  ],
  metrics: {
    lastDeploy: '2 hours ago',
    activeProjects: 3,
    activeExperiments: 5,
    uptime90d: '99.98%',
    p95Latency: '74ms',
    buildSuccess: '98.4%',
  },
  deploys: [
    { ref: 'main', sha: 'a4f9d12', status: 'success', when: '2h ago', duration: '38s', message: 'feat(home): add command palette teaser' },
    { ref: 'feat/lab', sha: '7be2c01', status: 'success', when: '9h ago', duration: '42s', message: 'lab: add posture monitor case study' },
    { ref: 'main', sha: 'e1c83d4', status: 'success', when: '1d ago', duration: '36s', message: 'chore: tune Lenis easing and motion timings' },
    { ref: 'main', sha: 'f00ab12', status: 'success', when: '2d ago', duration: '40s', message: 'refactor(dashboard): split widgets into atoms' },
  ],
};

export const seedGitHubStats = {
  username: 'nirmalya',
  followers: 412,
  publicRepos: 38,
  totalStars: 1247,
  totalCommits: 2890,
  totalPRs: 184,
  topLanguages: [
    { name: 'TypeScript', percentage: 32, color: '199 89% 74%' },
    { name: 'Go', percentage: 22, color: '213 94% 78%' },
    { name: 'Python', percentage: 18, color: '250 91% 85%' },
    { name: 'Rust', percentage: 12, color: '30 80% 65%' },
    { name: 'Shell', percentage: 9, color: '160 60% 55%' },
    { name: 'Other', percentage: 7, color: '0 0% 60%' },
  ],
  // 52 weeks x 7 days heatmap (deterministic pseudo-random)
};

export const seedTestimonials = [
  {
    name: 'Ananya Sharma',
    role: 'Engineering Lead, FintechCo',
    quote:
      'Nirmalya thinks in systems. He shipped our infra automation in two weeks — what our previous vendor quoted six months for.',
  },
  {
    name: 'Marcus Lee',
    role: 'Founder, DevTools startup',
    quote:
      'Rare blend of taste and depth. The kind of engineer who designs the API you wish you had written.',
  },
  {
    name: 'Priya Iyer',
    role: 'CTO, AI infra company',
    quote:
      'Pragmatic, fast, and unusually disciplined about architecture. We hired him on the spot.',
  },
];
