// Single source of truth for the portfolio owner. Propagates to meta tags,
// Open Graph, structured data, footer, contact, etc.

export interface NavItem {
  label: string;
  href: string;
}

export const owner = {
  name: "Nirmalya Mandal",
  fullName: "Nirmalya Mandal",
  // `role` is split on "·" to render the hero chips - keep the separator.
  role: "Full Stack Developer · Web & Mobile Applications · AI Integrations",
  // Used for the page title: the full role runs ~83 chars with the name and
  // would truncate in search results.
  shortRole: "Full Stack Developer",
  tagline:
    "I build production web and mobile applications end to end - from design and APIs to deployment and monitoring - with a focus on performance, security and thoughtful design.",
  bio: "Nirmalya Mandal is a full stack developer based in Kolkata, India - CTO at DokLink Services, building production web and mobile applications, secure backend systems, and AI-integrated platforms.",
  email: "nirmalya.mandal@outlook.com",
  github: "https://github.com/DevNiru2704",
  githubUser: "DevNiru2704",
  linkedin: "https://www.linkedin.com/in/nirmalya-mandal-9b2475313",
  location: "Kolkata, India",
  timezone: "IST (UTC+5:30)",
  availability: "Open to full-time roles and freelance work",
  // Served from public/resume.pdf. resumeFileName is what the visitor's browser
  // saves it as, so keep it recognisable rather than "resume.pdf".
  resumeUrl: "/resume.pdf",
  resumeFileName: "Nirmalya_Mandal_Resume.pdf",

  brand: {
    name: "NIRMALYA",
    initials: "NM",
    productLine: "Neural Command Interface",
  },

  url: "https://devniru.in",
  ogImage: "/og.png",
  keywords: [
    "Nirmalya Mandal",
    "Full Stack Developer",
    "React",
    "Next.js",
    "React Native",
    "Django",
    "AI Integrations",
    "Kolkata",
  ],
} as const;

// Order matters: this drives the desktop nav, the mobile drawer, and the
// command palette's Navigation group. Keep those three in sync.
export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Lab", href: "/lab" },
  { label: "Blog", href: "/blog" },
  { label: "Now", href: "/now" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "Contact", href: "/contact" },
];

export const secondaryNav: NavItem[] = [
  { label: "CMS Preview", href: "/cms-preview" },
  { label: "Dashboard", href: "/dashboard" },
];
