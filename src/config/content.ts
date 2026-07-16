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

export interface NowSnapshot {
  building: string[];
  learning: string[];
  experimenting: string[];
  stack: string[];
  goal: string;
}

export const experience: ExperienceItem[] = [
  {
    year: "2023",
    title: "Started B.Tech CSE",
    description:
      "Began Computer Science and Engineering at Amity University Kolkata. Built my first full stack applications with React and Django.",
  },
  {
    year: "2025",
    title: "CTO at DokLink",
    description:
      "Joined DokLink Services to build an emergency healthcare platform and took over as CTO - sole developer across the React Native app, Django backend, and infrastructure. Published on the Google Play Store.",
  },
  {
    year: "2025",
    title: "No Strategy Studios",
    description:
      "Shipped a premium e-commerce platform for an international leather goods brand: 100 Lighthouse SEO score, hardened security, and Linux VPS deployment behind Nginx.",
  },
  {
    year: "2025",
    title: "Research + FloatChat",
    description:
      "Co-authored two peer-reviewed publications on XR and pedestrian-autonomous vehicle interaction. Built FloatChat, an AI conversational analytics platform for oceanographic data.",
  },
  {
    year: "2026",
    title: "Freelance and agency work",
    description:
      "Built a glass manufacturing workflow automation platform for Modern Mahal and a B2B corporate platform with an internal management system for Vayita Grow.",
  },
];

export const stack: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "Python", "Java", "C++", "SQL"],
  Frontend: ["React", "Next.js", "React Native", "Tailwind CSS"],
  Backend: ["Node.js", "Express.js", "Django", "DRF", "FastAPI"],
  Databases: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
  DevOps: ["Docker", "Nginx", "Linux", "Git", "CI/CD"],
};

export const now: NowSnapshot = {
  building: [
    "DokLink - emergency healthcare platform. CTO and sole developer: React Native app, Django backend, deployment pipeline.",
    "This portfolio - Next.js 16, Prisma 7, PostgreSQL on Supabase, deployed on Vercel.",
  ],
  learning: [
    "System design and distributed systems fundamentals",
    "Java ecosystem beyond DSA - build tools and frameworks",
    "Compiler internals, by building one",
  ],
  experimenting: [
    "CONTEXT - a custom programming language interpreter written in Python",
    "Hyprland configuration and dotfiles automation on Arch Linux",
    "Local LLM workflows for development tooling",
  ],
  stack: ["Next.js", "React Native", "Django", "PostgreSQL", "Docker"],
  goal: "Ship DokLink's next release and keep raising the bar on every system I own.",
};

export const philosophy: PhilosophyPrinciple[] = [
  {
    title: "Automation First",
    body: "If I do something twice, I automate it the third time. Repetition is a signal that a system is missing.",
  },
  {
    title: "Architecture Over Features",
    body: "A well-designed system can absorb new features gracefully. A poorly designed one collapses under them.",
  },
  {
    title: "Performance Is Respect",
    body: "Fast software respects the user's time. Every unnecessary millisecond is a form of disrespect.",
  },
  {
    title: "Tools Shape Thinking",
    body: "The tools you use define how you think about problems. Choose them carefully. Build them when necessary.",
  },
  {
    title: "Linux Is Freedom",
    body: "Running your own stack, knowing your system, owning your environment - this is engineering, not just usage.",
  },
  {
    title: "Simplicity Is Hard",
    body: "Complex solutions are easy. Simple, elegant, maintainable systems are where real engineering lives.",
  },
  {
    title: "Ownership",
    body: "If it's deployed, it's mine. If it breaks, I fix it. No blame, no handoffs. Full ownership.",
  },
];
