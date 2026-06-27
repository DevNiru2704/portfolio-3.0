You are a senior frontend architect, product designer, systems UI engineer, motion designer, and full-stack Next.js developer.
Your task is to generate a COMPLETE, production-ready, award-winning developer portfolio platform with a built-in CMS system that can directly run after: npm install npm run dev
The portfolio must feel like:
a premium engineering operating system
a futuristic developer workstation
a real software platform
an elite SaaS dashboard experience
The final result should feel inspired by:
Vercel
Linear
Raycast
Stripe
Framer
Apple design language
BUT it must remain fully original.

⚠️ STRICT RULES (VERY IMPORTANT)
Output FULL working code
NO summaries
NO pseudo code
NO placeholders for important logic
NO skipped files
NO truncated components
Ensure zero TypeScript errors
Ensure zero import errors
Ensure all routes work
Ensure all pages are responsive
Maintain clean scalable architecture
Use reusable components
Follow a production-grade folder structure
Use latest syntax and best practices
Optimize for performance
Ensure accessibility
Ensure consistency across the ENTIRE project

👤 PORTFOLIO OWNER
Name: Nirmalya Role: Full Stack Engineer · Systems Developer · AI + Infrastructure Tagline: "I build scalable web applications, intelligent systems, and developer tools with a focus on performance, automation and thoughtful design." Email: nirmalya@example.com GitHub: https://github.com/nirmalya LinkedIn: https://linkedin.com/in/nirmalya Twitter/X: https://twitter.com/nirmalya Availability: Currently available for freelance and full-time opportunities Location: Kolkata, India · IST (UTC+5:30)
Use these values everywhere: hero text, footer, about page, contact page, meta tags, Open Graph, structured data. If the owner updates these later, they live in a single config file: config/owner.ts

🧠 CORE PRODUCT VISION
This is NOT a portfolio template.
This is:
a developer operating system
a cinematic engineering platform
a futuristic personal infrastructure hub
The portfolio should communicate:
systems thinking
engineering maturity
infrastructure knowledge
product design ability
AI/ML interest
DevOps capability
platform engineering mindset
The experience should feel:
premium
restrained
intelligent
cinematic
minimal
highly engineered
software-first

🎨 VISUAL DIRECTION
IMPORTANT: Analyze the provided reference image carefully.
The attached image represents the EXACT level of polish, layout quality, spacing, UI layering, glow treatment, and visual atmosphere expected.
Adopt:
the premium cinematic workstation aesthetic
the matte-black futuristic dashboard feel
the subtle glow treatment
the large typography hierarchy
the clean engineering dashboard composition
the layered glass UI depth
the soft volumetric lighting
the futuristic systems interface feel
BUT: Do NOT directly copy the design.
Use it only as inspiration.

🎨 DESIGN LANGUAGE
Theme Name: "Neural Command Interface"
Style:
cinematic minimalism
futuristic workstation UI
premium operating system aesthetic
engineering dashboard feel
sophisticated SaaS interface
subtle cyberpunk influence
precision-based UI system
Mood:
intelligent
calm
technical
futuristic
immersive
premium
highly engineered
Avoid:
RGB gamer aesthetics
excessive neon
cartoonish visuals
overuse of glassmorphism
clutter
random gradients
excessive particles
generic cyberpunk clichés
over-animated interfaces

🎨 COLOR SYSTEM
IMPORTANT: Create a COMPLETE semantic design token system.
DO NOT hardcode colors directly throughout components.
Use semantic CSS variables and Tailwind tokens.

🌑 DARK MODE
Primary Colors:
#090909
#111111
#171717
Surfaces:
rgba(255,255,255,0.03)
rgba(255,255,255,0.05)
rgba(255,255,255,0.07)
Borders:
rgba(255,255,255,0.08)
Text:
white
soft gray hierarchy
Accent:
muted cyan
silver-blue glow
subtle purple undertones
Examples:
#7dd3fc
#93c5fd
#c4b5fd

☀️ LIGHT MODE
IMPORTANT: Do NOT create a boring white light mode.
It should feel like:
Apple
Linear
Notion
modern premium software
Backgrounds:
#fafafa
#f5f5f5
#eeeeee
Text:
#171717
#262626
Use:
soft shadows
subtle borders
depth layers
premium surfaces

🌓 THEME ENGINE
MANDATORY: Implement:
dark mode
light mode
system mode
Use:
next-themes
Persist theme using localStorage.
Also create future-ready support for:
Neural
Terminal
Infra
Midnight
Monochrome

🔠 TYPOGRAPHY
Headings:
Geist OR Satoshi
Body:
Inter
Typography Style:
large bold headlines
spacious layouts
premium spacing rhythm
clean hierarchy
sharp engineering feel

🧱 TECH STACK (MANDATORY)
Frontend + Backend:
Next.js latest App Router
TypeScript
Tailwind CSS
ShadCN UI
Animations:
Framer Motion
GSAP + ScrollTrigger
Lenis smooth scrolling
3D / Graphics:
React Three Fiber
minimal Three.js usage
shader backgrounds only where needed
Backend:
Next.js Route Handlers
Server Actions
Database:
Supabase (PostgreSQL)
Use the Supabase JS client (@supabase/supabase-js) throughout. Create a lib/supabase.ts client file. All environment variables must be read from .env.local: NEXT_PUBLIC_SUPABASE_URL= NEXT_PUBLIC_SUPABASE_ANON_KEY= SUPABASE_SERVICE_ROLE_KEY=
Auth:
Clerk
Use @clerk/nextjs throughout. Protect /dashboard using Clerk middleware (clerkMiddleware in middleware.ts). All environment variables: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= CLERK_SECRET_KEY= NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
Content:
MDX blog support

📁 PROJECT STRUCTURE
Create a COMPLETE scalable architecture.
Example:
app/
components/
lib/
hooks/
styles/
config/
providers/
store/
server/
content/
types/
actions/
animations/
Also create:
config/owner.ts ← all personal info (name, email, socials, etc.)
config/seed.ts ← all fallback dummy data (projects, blog posts, lab items)
lib/supabase.ts ← Supabase client
middleware.ts ← Clerk route protection

🌐 WEBSITE STRUCTURE

HOME (/)
Hero Section:
large cinematic typography
futuristic engineering statement
command palette preview
subtle animated background grid
reactive glow effects
layered depth
Heading: "FULL STACK ENGINEER" "SYSTEMS DEVELOPER" "AI + INFRASTRUCTURE"
Subtext: "I build scalable web applications, intelligent systems, and developer tools with a focus on performance, automation and thoughtful design."
Hero Features:
command search bar
live system status
subtle terminal widget
floating analytics panel
project spotlight
futuristic CTA buttons
Sections:
Featured projects
Tech stack visualization
GitHub activity visualization
Experience timeline
CMS preview
Lab experiments
System metrics
Testimonials (optional)
Final CTA

PROJECTS (/projects)
Grid of advanced project cards.
Each card must include:
project thumbnail
tech stack
category
tags
metrics
hover interactions
magnetic hover effect
animated depth response
Filtering:
category filter
search
sorting
tag system

PROJECT DETAIL (/projects/[slug])
MANDATORY: Each project becomes a full engineering case study.
Include:
overview
architecture
screenshots
stack
deployment strategy
infrastructure decisions
challenges
solutions
tradeoffs
performance optimizations
GitHub link
live demo link
ADVANCED: Add:
architecture diagrams
CI/CD visualization
deployment flow
database structure
API flow

LAB (/lab)
Experimental engineering playground.
Show:
AI experiments
shaders
automation tools
CLI tools
computer vision projects
unfinished prototypes
infrastructure experiments
This page should feel:
experimental
technical
intelligent

BLOG (/blog)
MDX-powered technical blog.
Features:
syntax highlighting
reading time
table of contents
progress bar
code copy buttons
responsive typography
related articles
Topics:
DevOps
AI
Linux
system design
Next.js
deployment pipelines
architecture

ABOUT (/about)
Professional engineering profile.
Include:
story
workflow
philosophy
toolchain
Linux setup
engineering mindset
development principles
Also add:
stack timeline
skills visualization
workflow diagrams
About content to use as fallback:
Nirmalya is a full stack engineer and systems developer based in Kolkata, India. He builds scalable web applications, intelligent developer tools, and infrastructure automation systems. He runs Arch Linux with Hyprland, uses Neovim as his primary editor, and believes deeply in automation, clean architecture, and performance-first engineering. His stack spans React, Next.js, Django, PostgreSQL, Docker, Terraform, and Go. He is currently exploring AI/ML systems, fine-tuning LLMs, and building developer tools that remove friction from engineering workflows.
Timeline fallback:
2021: Started programming. Built first Django + React app.
2022: Deployed first production system. Learned Docker, CI/CD, cloud infrastructure.
2023: Moved to Arch Linux + Hyprland. Went deep into DevOps, Terraform, PostgreSQL.
2024: Shifted focus to AI/ML. Started building AI-powered developer tools.
2025: Building InfraPilot. Exploring LLM fine-tuning and autonomous agent systems.

NOW (/now)
Current focus page.
Include:
what I'm learning
what I'm building
current experiments
current stack
current goals
Fallback content for /now:
Currently building:
InfraPilot — an infrastructure automation tool for deploying and managing cloud resources using natural language commands and Terraform under the hood.
Currently learning:
LLM fine-tuning with LoRA and QLoRA
Rust (for systems-level CLI tooling)
Kubernetes internals and operator patterns
Currently experimenting:
Local AI agents with Ollama + LangChain
Hyprland shader customizations
Custom terminal dashboard using Go + bubbletea
Current stack obsessions:
Go, Rust, Terraform, Kubernetes, Supabase, Next.js 15
Current goal:
Ship InfraPilot v1 publicly. Get first 100 GitHub stars.

PHILOSOPHY (/philosophy)
Personal engineering philosophy.
Topics:
automation mindset
architecture principles
tooling philosophy
clean systems
performance beliefs
product thinking
Fallback content for /philosophy:
Automation First: If I do something twice, I automate it the third time. Repetition is a signal that a system is missing.
Architecture Over Features: A well-designed system can absorb new features gracefully. A poorly designed one collapses under them.
Performance Is Respect: Fast software respects the user's time. Every unnecessary millisecond is a form of disrespect.
Tools Shape Thinking: The tools you use define how you think about problems. Choose them carefully. Build them when necessary.
Linux Is Freedom: Running your own stack, knowing your system, owning your environment — this is engineering, not just usage.
Simplicity Is Hard: Complex solutions are easy. Simple, elegant, maintainable systems are where real engineering lives.
Ownership: If it's deployed, it's mine. If it breaks, I fix it. No blame, no handoffs. Full ownership.

CONTACT (/contact)
Premium contact experience.
Features:
animated form
validation
success states
social links
availability indicator
booking CTA
Contact form submits via POST to /api/contact (Next.js Route Handler). The handler saves the message to Supabase table: messages (id, name, email, subject, message, created_at, read). On success: show animated success state. On error: show error state with retry.
Prefill these social links from config/owner.ts:
GitHub: https://github.com/nirmalya
LinkedIn: https://linkedin.com/in/nirmalya
Twitter/X: https://twitter.com/nirmalya
Email: nirmalya@example.com

DASHBOARD (/dashboard)
PRIVATE REAL CMS.
Protected route via Clerk middleware.
Features:
analytics
project manager
blog manager
media uploads
markdown editor
SEO management
dashboard widgets
deployment logs
IMPORTANT: This is the REAL CMS.

CMS PREVIEW (/cms-preview)
PUBLIC SAFE SHOWCASE.
Readonly version.
IMPORTANT: This page must look extremely premium.
Show:
analytics panels
project editor previews
deployment widgets
AI assistant widgets
markdown preview
activity feed
futuristic dashboards
All data on this page is the seed/fallback data from config/seed.ts. No real database reads. No auth required. Include a banner at top: "This is a live preview of the CMS powering this portfolio. All data shown is for demonstration."
This is a major visual showcase page.

COMMAND CENTER
MANDATORY FEATURE.
Implement: Ctrl + K command palette.
Features:
page navigation
project search
theme switching
resume access
quick actions
CMS preview launch
Inspired by:
Raycast
Linear
Vercel

TERMINAL EXPERIENCE
Add an interactive terminal component.
Commands and responses to implement:
whoami nirmalya — full stack engineer · systems developer · ai + infrastructure
skills react · next.js · typescript · django · postgresql · docker · terraform · go · aws · ai/ml
projects [1] DevSync — real-time developer collaboration platform [2] AI Study Buddy — AI-powered study assistant with content generation [3] InfraPilot — infrastructure automation tool (terraform + natural language)
stack frontend: next.js · react · typescript · tailwind backend: django · postgresql · supabase · go devops: docker · terraform · github actions · vercel ai/ml: langchain · ollama · openai api · huggingface
status ● available for opportunities ● location: kolkata, india (IST UTC+5:30) ● open to: full-time · freelance · open source collaboration
contact email: nirmalya@example.com github: github.com/nirmalya
clear [terminal cleared]
Features:
keyboard interaction
animated typing
realistic shell feel
command history (arrow up/down)
tab completion for known commands
unknown command: "command not found: [x]. type 'help' for available commands."
help command listing all available commands

GITHUB VISUALIZATION
DO NOT use simple embeds.
Create:
commit heatmaps
language analytics
contribution metrics
repository activity
deployment frequency charts
Use GitHub API. GitHub username: nirmalya Fallback if API fails: use static mock data from config/seed.ts

LIVE SYSTEM STATUS
Create futuristic status widgets.
Examples:
API uptime
deployment health
latest commits
system metrics
active projects
active experiments
Fallback status values (use if APIs unavailable):
Portfolio: ● Online
API: ● Operational
Database: ● Operational
Last Deploy: 2 hours ago
Active Projects: 3
Active Experiments: 5

AI ASSISTANT
Add an embedded AI assistant.
Capabilities:
answer questions about projects
explain architecture
explain stack decisions
search content
summarize blogs
Can use:
embeddings
RAG
vector search

INTERACTIVE STACK VISUALIZATION
Instead of boring badges: Create:
orbit systems
dependency graphs
infra maps
animated relationships
Stack data to visualize:
Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
Backend: Django, Go, PostgreSQL, Supabase, REST APIs
DevOps: Docker, Terraform, GitHub Actions, Vercel, AWS
AI/ML: LangChain, Ollama, OpenAI API, HuggingFace, Vector DBs
Tools: Neovim, Arch Linux, Hyprland, Git, tmux

DEPLOYMENT PIPELINE VISUALIZATION
Show: GitHub → CI/CD (GitHub Actions) → Vercel (Frontend) → Supabase (DB) → Edge Network → Analytics
Use:
animated flows
futuristic infrastructure visuals

🌱 SEED / FALLBACK DATA
IMPORTANT: All seed data lives in config/seed.ts. Pages must use Supabase data when available, and fall back to seed data when the database is empty or unavailable. This ensures the site looks complete immediately after npm run dev without any database setup.

SEED PROJECTS (3 featured):
Project 1:
title: DevSync
slug: devsync
category: Full Stack
tags: ["Next.js", "TypeScript", "Supabase", "WebSockets", "Tailwind"]
description: A real-time developer collaboration platform for modern teams. Built for speed, designed for engineers.
overview: DevSync is a real-time collaboration platform that enables distributed engineering teams to work together on code, deploy together, and monitor together. Built with Next.js, Supabase Realtime, and WebSockets.
featured: true
github: https://github.com/nirmalya/devsync
live: https://devsync.dev
status: published
metrics: { stars: 142, forks: 28, users: "500+" }
features:
Real-time collaboration with presence awareness
CI/CD automation and deployment monitoring
Role-based access control
Monitoring and analytics dashboard
architecture: Next.js App Router frontend. Supabase for database and realtime subscriptions. Clerk for auth. Deployed on Vercel with edge functions.
challenges: Handling real-time state synchronization across 100+ concurrent users without conflicts. Solved using CRDT-inspired merge strategies and Supabase Realtime channels.
cover: /images/projects/devsync.png
Project 2:
title: AI Study Buddy
slug: ai-study-buddy
category: AI/ML
tags: ["Next.js", "OpenAI", "LangChain", "PostgreSQL", "Tailwind"]
description: An AI-powered study assistant with content generation, quiz creation, and intelligent summarization.
overview: AI Study Buddy helps students and engineers learn faster using AI. It generates summaries, creates quizzes, explains concepts, and tracks learning progress — all powered by LangChain and OpenAI.
featured: true
github: https://github.com/nirmalya/ai-study-buddy
live: https://ai-study-buddy.vercel.app
status: published
metrics: { stars: 87, forks: 14, users: "1.2K+" }
features:
AI-powered content summarization
Automatic quiz generation from notes
Concept explanation with Socratic dialogue
Learning progress tracking
architecture: Next.js frontend with Server Actions. LangChain orchestration layer. OpenAI GPT-4 for generation. PostgreSQL via Supabase for user data and history.
challenges: Keeping generation latency under 2s while maintaining quality. Used streaming responses and prompt caching to achieve 1.4s average response time.
cover: /images/projects/ai-study-buddy.png
Project 3:
title: InfraPilot
slug: infrapilot
category: DevOps
tags: ["Go", "Terraform", "AWS", "Docker", "CLI"]
description: An infrastructure automation tool for deploying and managing cloud resources using natural language commands.
overview: InfraPilot translates natural language infrastructure requests into Terraform plans and executes them safely. Engineers describe what they want — InfraPilot figures out the how.
featured: true
github: https://github.com/nirmalya/infrapilot
live: https://infrapilot.dev
status: published
metrics: { stars: 203, forks: 41, users: "active" }
features:
Natural language to Terraform conversion
Safe plan + apply workflow with human approval
Multi-cloud support (AWS, GCP, Azure)
Deployment history and rollback
architecture: Go CLI tool. LangChain for NL-to-Terraform translation. Terraform for actual infrastructure management. Docker for sandboxed execution. AWS SDK for resource management.
challenges: Preventing hallucinated Terraform configs from causing real infrastructure damage. Solved with a mandatory plan-review step and a static analysis layer before any apply.
cover: /images/projects/infrapilot.png

SEED BLOG POSTS (3 posts):
Post 1:
title: "Why I Switched to Arch Linux + Hyprland (And Never Looked Back)"

slug: arch-linux-hyprland-setup

excerpt: After years on Ubuntu and macOS, I rebuilt my entire dev environment from scratch on Arch Linux with Hyprland. Here's what I learned, what broke, and why it was worth it.

tags: ["Linux", "DevOps", "Workflow"]

readTime: 8 min

date: 2025-03-12

status: published

body: | Moving to Arch Linux was not a weekend project. It was a month-long process of breaking things, learning why they broke, and rebuilding them better. But what I got at the end was a system I completely understood — and that's worth more than any convenience.

Hyprland gives me dynamic tiling, smooth animations, and a workflow that feels native to how I think about windows and workspaces. Combined with Neovim, tmux, and a custom dotfiles setup, I now have a development environment that gets out of my way.

The real value of Arch isn't the rolling release or the AUR — it's the process of building it from scratch. You learn your system. You stop being a user and start being an operator.

Post 2:
title: "Building Production-Grade Terraform Pipelines with GitHub Actions"

slug: terraform-github-actions-pipeline

excerpt: Most Terraform tutorials stop at 'terraform apply'. Here's how I build actual production pipelines with plan reviews, drift detection, and rollback strategies.

tags: ["DevOps", "Terraform", "CI/CD"]

readTime: 12 min

date: 2025-04-01

status: published

body: | Terraform is easy to start and hard to scale safely. The internet is full of tutorials that show you how to write a main.tf and run terraform apply. Almost none of them show you what a production pipeline actually looks like.

In this post I'll walk through the pipeline I use on InfraPilot and several client projects: plan on PR, human approval gate, apply on merge, drift detection on schedule, and automated rollback on failure.

The key insight is that Terraform pipelines should be boring. If something exciting happens in your infra pipeline, that's a bad sign.

Post 3:
title: "Fine-Tuning LLMs with LoRA: A Practical Guide for Engineers"

slug: llm-fine-tuning-lora-guide

excerpt: LoRA changed what's possible for engineers who want to fine-tune large models without a GPU cluster. Here's a practical, no-nonsense guide to actually doing it.

tags: ["AI/ML", "LLMs", "Python"]

readTime: 15 min

date: 2025-04-28

status: published

body: | Full fine-tuning a 7B parameter model requires hardware most engineers don't have. LoRA (Low-Rank Adaptation) changes that by training only a small set of adapter weights while the base model stays frozen.

The result: you can fine-tune a meaningful model on a single consumer GPU in a few hours. I've done this for code generation, infrastructure description tasks, and document summarization.

This guide covers the full pipeline: dataset preparation, training with Hugging Face PEFT, evaluation, and serving with Ollama.

SEED LAB ITEMS (5 experiments):
Lab 1:
title: Local AI Agent with Ollama + LangChain
slug: local-ai-agent
description: A fully local AI agent that can browse files, run shell commands, and answer questions about a codebase. No API keys. No cloud.
status: In Progress
tags: ["AI", "LangChain", "Ollama", "Python"]
Lab 2:
title: Hyprland Shader Collection
slug: hyprland-shaders
description: A collection of GLSL shaders for Hyprland — including a CRT scanline effect, a subtle film grain overlay, and a chromatic aberration shader for focused windows.
status: Done
tags: ["Linux", "GLSL", "Hyprland"]
Lab 3:
title: Terminal Dashboard in Go (bubbletea)
slug: terminal-dashboard-go
description: A custom TUI dashboard built with Go and bubbletea that shows system stats, git status, active Docker containers, and a Pomodoro timer.
status: In Progress
tags: ["Go", "CLI", "TUI"]
Lab 4:
title: CV-Powered Posture Monitor
slug: posture-monitor-cv
description: A computer vision tool using MediaPipe that monitors posture during coding sessions and sends desktop notifications when bad posture is detected for more than 30 seconds.
status: Done
tags: ["Python", "Computer Vision", "MediaPipe"]
Lab 5:
title: Automated Dotfiles Sync System
slug: dotfiles-sync
description: A zero-dependency bash system that syncs dotfiles across machines using a private Git repo, with conflict detection and rollback. Used across 3 machines daily.
status: Done
tags: ["Bash", "Linux", "Automation"]

🎞️ ANIMATION SYSTEM
MANDATORY: Create a cohesive motion language.
Use:
Framer Motion
GSAP
Lenis
Animations:
smooth page transitions
layered hover responses
cinematic reveals
parallax depth
subtle cursor reactions
magnetic buttons
glow transitions
smooth easing system
IMPORTANT: Motion should feel:
premium
restrained
precise
NOT flashy.

🧠 ADVANCED INTERACTIONS
Implement:
magnetic hover buttons
subtle cursor lighting
keyboard-first navigation
command shortcuts
soft depth movement
scroll narrative transitions

🎵 OPTIONAL SOUND DESIGN
Optional but supported:
subtle hover ticks
command sounds
terminal typing audio
IMPORTANT: Must be:
subtle
low volume
disable-able

🧩 COMPONENT SYSTEM
Create reusable:
cards
containers
sections
overlays
buttons
typography
modals
command interfaces
dashboard widgets
terminal panels
Everything must feel unified.

📱 RESPONSIVENESS
MANDATORY:
mobile-first
tablet optimized
ultra-wide optimized
adaptive spacing
responsive typography
Mobile should still feel premium.

♿ ACCESSIBILITY
MANDATORY:
keyboard navigation
proper focus states
semantic HTML
reduced motion support
proper contrast ratios
screen reader support

⚡ PERFORMANCE
MANDATORY:
optimized bundle size
lazy loading
optimized images
limited Three.js usage
server components where appropriate
streaming where appropriate
IMPORTANT: The site should feel:
extremely smooth
extremely responsive
premium

🔍 SEO
Include:
dynamic metadata
Open Graph
Twitter cards
sitemap
robots.txt
structured metadata
All meta values default to config/owner.ts values.

📊 ANALYTICS
Add placeholders for:
Vercel Analytics
Google Analytics
custom analytics dashboard

🧪 TESTING
Ensure:
cross-browser support
responsive testing
keyboard testing
performance optimization

🚫 IMPORTANT DESIGN RESTRICTIONS
DO NOT:
overuse glassmorphism
overload with particles
use excessive neon
create gamer aesthetics
create clutter
create generic cyberpunk UI
overanimate everything
break readability
reduce usability for visuals

🎯 FINAL GOAL
The final experience should feel like:
"A futuristic engineering platform built by a systems developer."
NOT:
a portfolio template
a designer clone
a cyberpunk demo
an animation showcase
It should feel:
believable
premium
intelligent
highly engineered
award-winning
cohesive
product-grade
The final result should look worthy of:
Awwwards
professional SaaS products
elite engineering portfolios
startup founder portfolios
modern developer operating systems
Generate the COMPLETE production-ready project now.
