// Single source of truth for the portfolio owner. Propagates to meta tags,
// Open Graph, structured data, footer, contact, etc.

export interface NavItem {
  label: string;
  href: string;
}

export const owner = {
  name: "Nirmalya",
  fullName: "Nirmalya",
  role: "Full Stack Engineer · Systems Developer · AI + Infrastructure",
  shortRole: "Full Stack · Systems · AI/Infra",
  tagline:
    "I build scalable web applications, intelligent systems, and developer tools with a focus on performance, automation and thoughtful design.",
  bio: "Nirmalya is a full stack engineer and systems developer based in Kolkata, India. He builds scalable web applications, intelligent developer tools, and infrastructure automation systems.",
  email: "nirmalya@example.com",
  github: "https://github.com/nirmalya",
  githubUser: "nirmalya",
  linkedin: "https://linkedin.com/in/nirmalya",
  twitter: "https://twitter.com/nirmalya",
  twitterHandle: "@nirmalya",
  location: "Kolkata, India",
  timezone: "IST (UTC+5:30)",
  availability: "Available for freelance and full-time opportunities",
  resumeUrl: "/resume.pdf",

  brand: {
    name: "NIRMALYA",
    initials: "NM",
    productLine: "Neural Command Interface",
  },

  url: "https://nirmalya.dev",
  ogImage: "/og.png",
  keywords: [
    "Nirmalya",
    "Full Stack Engineer",
    "Systems Developer",
    "Next.js",
    "Infrastructure",
    "DevOps",
    "AI Engineer",
    "Terraform",
    "Kolkata",
  ],
} as const;

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Lab", href: "/lab" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Now", href: "/now" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "Contact", href: "/contact" },
];

export const secondaryNav: NavItem[] = [
  { label: "CMS Preview", href: "/cms-preview" },
  { label: "Dashboard", href: "/dashboard" },
];
