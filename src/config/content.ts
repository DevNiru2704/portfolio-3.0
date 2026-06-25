// Static presentational content (not stored in the database).

export interface ExperienceItem {
  year: string;
  title: string;
  description: string;
}

export interface PhilosophyPrinciple {
  title: string;
  body: string;
}

export interface ServiceStatus {
  name: string;
  state: string;
  label: string;
}

export interface SystemStatus {
  services: ServiceStatus[];
  metrics: {
    lastDeploy: string;
    activeProjects: number;
    activeExperiments: number;
    uptime90d: string;
    p95Latency: string;
    buildSuccess: string;
  };
  deploys: {
    ref: string;
    sha: string;
    status: string;
    when: string;
    duration: string;
    message: string;
  }[];
}

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

export interface GithubStats {
  username: string;
  followers: number;
  publicRepos: number;
  totalStars: number;
  totalCommits: number;
  totalPRs: number;
  topLanguages: LanguageStat[];
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export interface NowSnapshot {
  building: string[];
  learning: string[];
  experimenting: string[];
  stack: string[];
  goal: string;
}

export const experience: ExperienceItem[] = [
  { year: "2021", title: "Started programming", description: "Built first Django + React app. Learned the fundamentals of full-stack engineering." },
  { year: "2022", title: "First production deployment", description: "Shipped a real product to real users. Learned Docker, CI/CD, and cloud infrastructure." },
  { year: "2023", title: "Moved to Arch Linux + Hyprland", description: "Went deep into DevOps, Terraform, PostgreSQL. Rebuilt my entire workflow from the ground up." },
  { year: "2024", title: "Shifted focus to AI/ML", description: "Started building AI-powered developer tools. Got serious about LLM orchestration and RAG." },
  { year: "2025", title: "Building InfraPilot", description: "Exploring LLM fine-tuning, autonomous agents, and infrastructure-as-language systems." },
];

export const stack: Record<string, string[]> = {
  Frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  Backend: ["Django", "Go", "PostgreSQL", "Supabase", "REST APIs"],
  DevOps: ["Docker", "Terraform", "GitHub Actions", "Vercel", "AWS"],
  "AI/ML": ["LangChain", "Ollama", "OpenAI API", "HuggingFace", "Vector DBs"],
  Tools: ["Neovim", "Arch Linux", "Hyprland", "Git", "tmux"],
};

export const now: NowSnapshot = {
  building: [
    "InfraPilot — infrastructure automation tool for deploying and managing cloud resources using natural language commands and Terraform under the hood.",
  ],
  learning: [
    "LLM fine-tuning with LoRA and QLoRA",
    "Rust (for systems-level CLI tooling)",
    "Kubernetes internals and operator patterns",
  ],
  experimenting: [
    "Local AI agents with Ollama + LangChain",
    "Hyprland shader customizations",
    "Custom terminal dashboard using Go + bubbletea",
  ],
  stack: ["Go", "Rust", "Terraform", "Kubernetes", "Supabase", "Next.js 15"],
  goal: "Ship InfraPilot v1 publicly. Get first 100 GitHub stars.",
};

export const philosophy: PhilosophyPrinciple[] = [
  { title: "Automation First", body: "If I do something twice, I automate it the third time. Repetition is a signal that a system is missing." },
  { title: "Architecture Over Features", body: "A well-designed system can absorb new features gracefully. A poorly designed one collapses under them." },
  { title: "Performance Is Respect", body: "Fast software respects the user's time. Every unnecessary millisecond is a form of disrespect." },
  { title: "Tools Shape Thinking", body: "The tools you use define how you think about problems. Choose them carefully. Build them when necessary." },
  { title: "Linux Is Freedom", body: "Running your own stack, knowing your system, owning your environment — this is engineering, not just usage." },
  { title: "Simplicity Is Hard", body: "Complex solutions are easy. Simple, elegant, maintainable systems are where real engineering lives." },
  { title: "Ownership", body: "If it's deployed, it's mine. If it breaks, I fix it. No blame, no handoffs. Full ownership." },
];

export const systemStatus: SystemStatus = {
  services: [
    { name: "Portfolio", state: "operational", label: "Online" },
    { name: "API", state: "operational", label: "Operational" },
    { name: "Database", state: "operational", label: "Operational" },
    { name: "Edge Network", state: "operational", label: "Operational" },
  ],
  metrics: {
    lastDeploy: "2 hours ago",
    activeProjects: 3,
    activeExperiments: 5,
    uptime90d: "99.98%",
    p95Latency: "74ms",
    buildSuccess: "98.4%",
  },
  deploys: [
    { ref: "main", sha: "a4f9d12", status: "success", when: "2h ago", duration: "38s", message: "feat(home): add command palette teaser" },
    { ref: "feat/lab", sha: "7be2c01", status: "success", when: "9h ago", duration: "42s", message: "lab: add posture monitor case study" },
    { ref: "main", sha: "e1c83d4", status: "success", when: "1d ago", duration: "36s", message: "chore: tune Lenis easing and motion timings" },
    { ref: "main", sha: "f00ab12", status: "success", when: "2d ago", duration: "40s", message: "refactor(dashboard): split widgets into atoms" },
  ],
};

export const githubStats: GithubStats = {
  username: "nirmalya",
  followers: 412,
  publicRepos: 38,
  totalStars: 1247,
  totalCommits: 2890,
  totalPRs: 184,
  topLanguages: [
    { name: "TypeScript", percentage: 32, color: "199 89% 74%" },
    { name: "Go", percentage: 22, color: "213 94% 78%" },
    { name: "Python", percentage: 18, color: "250 91% 85%" },
    { name: "Rust", percentage: 12, color: "30 80% 65%" },
    { name: "Shell", percentage: 9, color: "160 60% 55%" },
    { name: "Other", percentage: 7, color: "0 0% 60%" },
  ],
};

export const testimonials: Testimonial[] = [
  { name: "Ananya Sharma", role: "Engineering Lead, FintechCo", quote: "Nirmalya thinks in systems. He shipped our infra automation in two weeks — what our previous vendor quoted six months for." },
  { name: "Marcus Lee", role: "Founder, DevTools startup", quote: "Rare blend of taste and depth. The kind of engineer who designs the API you wish you had written." },
  { name: "Priya Iyer", role: "CTO, AI infra company", quote: "Pragmatic, fast, and unusually disciplined about architecture. We hired him on the spot." },
];
