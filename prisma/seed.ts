import "dotenv/config";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const projects: Prisma.ProjectCreateInput[] = [
  {
    slug: "doklink",
    title: "DokLink",
    category: "Full Stack · Mobile",
    tags: ["React Native", "Expo", "Django", "DRF", "PostgreSQL"],
    description:
      "An emergency healthcare platform for real-time hospital bed discovery and booking. Live on the Google Play Store.",
    overview:
      "DokLink helps people in medical emergencies find and reserve hospital beds in real time. Users trigger an emergency, see nearby hospitals sorted by distance with live general and ICU bed counts, and reserve a bed with a countdown window sized to their travel time. I run the platform as CTO and sole developer: the React Native app, the Django REST backend, and the infrastructure it ships on.",
    featured: true,
    status: "published",
    year: 2025,
    features: [
      "Real-time bed availability with automatic release on cancel, admit, or expiry",
      "Dynamic reservation windows based on travel distance",
      "JWT authentication with OTP verification and Aadhaar validation",
      "Payment integration with signature verification and transaction lifecycle handling",
    ],
    architecture:
      "React Native + Expo client. Django REST Framework backend on PostgreSQL, with Cloudinary for media and scheduled jobs for reservation expiry. Deployed with Docker behind Nginx on a Linux server.",
    challenges:
      "The booking flow is a textbook race condition: two users reserving the last ICU bed at the same moment. Solved with atomic transactions and row-level guarantees so bed counts can never go negative, plus automated expiry that returns unused reservations to the pool.",
    tradeoffs:
      "A single Django monolith instead of microservices. For a small team shipping fast in healthcare, one well-structured codebase with clear module boundaries beats a distributed system nobody has time to operate.",
    performance:
      "Booking-critical endpoints are kept lean: indexed geo-lookups for nearby hospitals and transaction-scoped writes for reservations. The app stays responsive on low-end Android devices, which is where emergencies actually happen.",
    accent: "199 89% 74%",
  },
  {
    slug: "floatchat",
    title: "FloatChat",
    category: "AI/ML",
    tags: ["Next.js", "FastAPI", "LangChain", "Supabase", "PostgreSQL"],
    description:
      "An AI conversational analytics platform for querying 23 years of Argo ocean data in plain English.",
    overview:
      "FloatChat lets researchers ask questions like 'show me salinity profiles near the equator in 2015' and get real answers from oceanographic data: 79,934 records from 451 Argo floats spanning 23 years. Natural language goes in, validated SQL runs against PostgreSQL, and the results render as maps, depth profiles, and a 3D globe.",
    featured: true,
    github: "https://github.com/DevNiru2704/floatchat",
    live: "https://floatchat-chi.vercel.app",
    status: "published",
    year: 2025,
    features: [
      "Natural language to SQL over a scientific schema",
      "Retrieval-augmented generation for contextual follow-up questions",
      "ETL pipelines ingesting NetCDF datasets into PostgreSQL",
      "Interactive 2D maps, 3D globe, and depth profile visualizations",
    ],
    architecture:
      "Next.js frontend with a FastAPI backend. LangChain orchestrates Mistral 7B via HuggingFace for SQL generation, with Supabase providing PostgreSQL and vector storage for retrieval.",
    challenges:
      "Getting a 7B model to produce reliable SQL over a scientific schema. The answer was constraint: schema-aware prompting, query validation before execution, and retrieval of similar past queries as context.",
    tradeoffs:
      "A hosted 7B model instead of a frontier LLM. Slightly weaker generation, but predictable cost and latency, which matters when every chat message triggers inference.",
    performance:
      "The dataset is pre-processed once through the ETL pipeline, so queries hit indexed PostgreSQL tables instead of raw NetCDF files. Visualization data is shaped server-side to keep the client light.",
    accent: "213 94% 78%",
  },
  {
    slug: "auktave-2k26",
    title: "AUKTAVE 2K26",
    category: "Frontend · Web",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "PWA"],
    description:
      "A production event management portal for a university tech fest: registrations, schedules, sponsors, and event discovery.",
    overview:
      "AUKTAVE 2K26 is the official portal for a university fest, built to handle event discovery, registrations, schedules, and sponsor showcases. The content layer is fully typed TypeScript with modular event definitions and nested dynamic routing, so adding a new event is a data change, not a code change.",
    featured: true,
    status: "published",
    year: 2026,
    features: [
      "Modular, typed content architecture with nested dynamic routing",
      "Structured metadata, Open Graph tags, and sitemap generation",
      "Progressive Web App capabilities with offline support",
      "Immersive animations with Framer Motion and GSAP",
    ],
    architecture:
      "Next.js 16 App Router with React 19. A TypeScript-driven content architecture keeps event data separate from presentation. Tailwind CSS for styling, Framer Motion and GSAP for motion.",
    challenges:
      "Keeping heavy animation work from wrecking performance on mid-range phones, which is what most attendees carry. Motion is scoped to visible sections and respects reduced-motion preferences.",
    tradeoffs:
      "Static, typed content instead of a CMS. For a fest site with a fixed content window, type-checked data files beat CMS complexity.",
    performance:
      "SEO-first build with structured metadata and generated sitemaps. Animations are lazy and interruptible rather than blocking the first paint.",
    accent: "250 91% 85%",
  },
  {
    slug: "afashions",
    title: "A Fashions",
    category: "Full Stack",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Nginx", "Linux"],
    description:
      "A premium e-commerce platform for an international leather goods manufacturer, built at No Strategy Studios.",
    overview:
      "A production e-commerce site for an international leather manufacturer, built end to end during my time at No Strategy Studios: responsive storefront, security hardening, SEO, and the server it runs on.",
    live: "https://www.afashions.net",
    status: "published",
    year: 2025,
    features: [
      "Multi-tier API rate limiting and captcha protection",
      "XSS and CSRF mitigation with production security headers",
      "100 Lighthouse SEO score with structured data and dynamic sitemaps",
      "VPS deployment with Nginx reverse proxy and automated SSL",
    ],
    architecture:
      "Next.js and TypeScript frontend with Tailwind CSS. Deployed on a Linux VPS behind an Nginx reverse proxy with Certbot-managed SSL.",
    challenges:
      "Shipping a public commerce site that survives the open internet: bots, scrapers, and abuse. Layered rate limiting, captcha at sensitive endpoints, and strict header policies handled it.",
    tradeoffs:
      "A VPS instead of managed hosting. More operational responsibility, but full control over the stack and a fraction of the cost at this scale.",
    performance:
      "Perfect Lighthouse SEO score via structured metadata, Schema.org data, and optimized indexing. Image-heavy pages stay fast through aggressive optimization.",
    accent: "30 80% 65%",
  },
  {
    slug: "glass-automation",
    title: "Glass Workflow Automation",
    category: "Full Stack",
    tags: ["React", "Node.js", "Express.js", "PostgreSQL", "AI"],
    description:
      "A workflow automation platform that digitizes a glass manufacturing business, from WhatsApp sketch intake to production tracking.",
    overview:
      "Built for Modern Mahal, this platform replaces a paper-based glass manufacturing workflow. Customers send rough hand-drawn sketches over WhatsApp; the system ingests them automatically, converts them into structured, editable production diagrams with AI assistance, validates the geometry, generates quotations, and tracks every job through production.",
    status: "published",
    year: 2026,
    features: [
      "Automatic diagram intake from WhatsApp with media synchronization",
      "AI-assisted sketch-to-diagram conversion with fully editable output",
      "Smart validation: dimension mismatches, hole overlaps, feasibility checks",
      "Quotation generation, production tracking, and role-based access control",
    ],
    architecture:
      "React frontend with a Node.js and Express backend on PostgreSQL. An AI-assisted processing module extracts dimensions, shapes, holes, and cut markings from customer sketches.",
    challenges:
      "Hand-drawn sketches are ambiguous by nature. The system extracts what it can, flags what it cannot, and keeps a human in the loop: every generated diagram stays editable and requires explicit approval before production.",
    tradeoffs:
      "Suggestions over automation. The system could auto-approve clean diagrams, but in manufacturing a wrong dimension is expensive, so final decisions stay with the administrator.",
    performance:
      "Validation runs synchronously on save so errors surface while the operator still has context, not after the job reaches the factory floor.",
    accent: "160 60% 55%",
  },
  {
    slug: "vayita-grow",
    title: "Vayita Grow",
    category: "Full Stack",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    description:
      "A B2B corporate platform and internal management system for an agricultural inputs manufacturer, built as freelance work.",
    overview:
      "A corporate web presence and operations platform for VayitaGrow Bioorganics, an agricultural inputs company. The public site handles product showcase and dealer inquiries; the internal platform manages clients, orders, statements, and field reports. Built to be shown to investors as proof the company runs digitally.",
    status: "published",
    year: 2026,
    features: [
      "Product catalog with category-level showcase for dealers and distributors",
      "Partner inquiry workflows for dealers, retailers, and institutional buyers",
      "Internal modules for client, order, statement, and field report management",
      "Role-aware access with hardened authentication",
    ],
    architecture:
      "Next.js App Router with TypeScript and Tailwind CSS. Supabase PostgreSQL for data, with server-side data access and Zod-validated server actions.",
    challenges:
      "One codebase serving two very different audiences: a polished public site for partners and investors, and a dense internal tool for staff. Clear route groups and a shared design system kept both coherent.",
    tradeoffs:
      "Shipped the highest-value internal modules first instead of the full ERP surface. An investor demo that works beats a feature list that does not.",
    performance:
      "Server components by default with client interactivity pushed to leaf components. Internal tables paginate server-side to stay fast as data grows.",
    accent: "142 70% 60%",
  },
];

const posts: Prisma.BlogPostCreateInput[] = [
  {
    slug: "kubernetes-is-not-a-badge",
    title: "Kubernetes Is Not a Badge of Honor",
    excerpt:
      "I wrote an infrastructure rulebook for my own projects, and the most useful rule is the one that keeps telling me no. Here is the decision framework that stops me from over-engineering.",
    tags: ["DevOps", "Architecture", "Opinion"],
    readTime: "8 min",
    date: "2026-03-08",
    status: "published",
    body: `There is a moment in every side project where you catch yourself opening the Kubernetes docs, and you need someone to ask you a simple question: how many users do you have? If the honest answer is "me, and sometimes my friend testing on staging", close the tab.

I run the infrastructure for a healthcare platform as its only developer. Somewhere along the way I started writing down the rules I kept re-deriving from scratch, and it grew into a full set of internal DevOps guidelines: eighteen parts covering everything from networking standards to cost management. The single most useful idea in all of it fits in one sentence: Kubernetes is not a badge of engineering maturity. It is an operational tool.

Tools have prerequisites. A hammer assumes you have nails. Kubernetes assumes you have a team that can operate it at three in the morning, workloads that actually need orchestration, and enough services that scheduling them by hand became painful. If those assumptions do not hold, you have not adopted Kubernetes, you have adopted its bill.

The framework I use instead is a staged one. I keep a table with five stages, from prototype to internet scale, and each stage lists two things: what you should be running, and what you should explicitly avoid. The avoid column is the important one. At the prototype stage, avoid Kubernetes, avoid microservices, avoid multi-region, avoid anything with the word "mesh" in it. Not because those things are bad, but because they solve problems you do not have yet, and they charge rent whether or not the problem shows up.

The mechanism behind the table is what I call a complexity budget. Every system can only afford so much operational complexity, and the budget is set by the team size and the stakes, not by ambition. A solo developer has a tiny budget. Spending it on container orchestration means there is nothing left for the things that actually kill small products: backups you never tested, monitoring you never set up, deploys you are scared of.

That last one deserves its own line, because another rule from the guidelines follows me around: an untested backup is an assumption, not a recovery plan. It is amazing how many teams have Kubernetes and no restore drill.

For every piece of heavyweight infrastructure, the guidelines define a gate: a set of concrete conditions that must be true before adopting it. The Kubernetes gate asks about team size, service count, and whether deployment pain is actually the bottleneck. The microservices gate asks whether independent teams need independent deploy cadences. The multi-region gate asks whether you have users whose regulators or latency budgets demand it. Most projects never pass most gates, and that is the point.

When two rules conflict, I resolve them with a fixed priority order: reliability first, then security, then simplicity, and cost near the end. The order is not the interesting part. The interesting part is having one at all, because it turns arguments into lookups. Should I add a second region for resilience, at triple the operational complexity? Reliability says maybe, simplicity says no, and the tie-break rules say simplicity loses only when reliability is actually threatened. One availability zone going down is rare; me being unable to operate a two-region setup alone is guaranteed.

None of this means staying small forever. Stages exist to be graduated from. When DokLink needs more than one server can give, the same table tells me what the next stage looks like and what it costs. The framework does not forbid complexity, it prices it, and it makes me pay attention to the receipt.

The uncomfortable truth about resume-driven infrastructure is that it optimizes for interviews you have not gotten at the expense of users you already have. The systems I am proudest of are boring: a Django monolith, PostgreSQL, Docker, Nginx, one server, tested backups. Boring is what reliable looks like from the inside.

So before the next kubectl tutorial, ask the staged question: what stage am I actually at, and what does that stage say to avoid? The answer is usually cheaper, simpler, and slightly disappointing. Ship it anyway.`,
  },
  {
    slug: "constitution-for-ai-infrastructure",
    title: "I Wrote a Constitution to Govern the AI That Builds My Infrastructure",
    excerpt:
      "AI agents now write a lot of my infrastructure code, so I gave them a binding rulebook with hard reject gates. Then I turned it on my own project, and it failed.",
    tags: ["DevOps", "AI", "Automation"],
    readTime: "9 min",
    date: "2026-04-05",
    status: "published",
    body: `A growing share of my infrastructure work is done with AI agents in the loop. They draft Terraform, write deploy scripts, and propose CI pipelines. They are fast, tireless, and occasionally catastrophically confident. Speed without judgment is a liability, so I did the only reasonable thing: I wrote them a constitution.

That is not a metaphor. The final part of my internal DevOps guidelines is a document that declares itself the supreme authority over any AI agent doing infrastructure work on my projects. It defines a precedence order for when rules conflict, an output template the agent must follow, and, most importantly, four hard reject gates: security, reliability, observability, and cost. If a proposed change fails any gate, the agent must refuse to proceed, no matter how convincing the plan looks.

Why so formal? Because the failure mode of AI-assisted infrastructure is not dramatic hallucination, it is plausible mediocrity. An agent will happily generate a deployment setup that works on the happy path and quietly embeds a static credential, skips health checks, or provisions something expensive. Each choice looks locally fine. A human reviewer skims twenty lines of generated YAML and approves. The rot is cumulative.

Rules that live in your head do not survive contact with a code generator. Rules written down, with explicit reject conditions, can be pasted into every session, enforced in review, and pointed to in an argument. The constitution turns "I have a bad feeling about this" into "this fails gate two, here is the line".

The gates are deliberately blunt. Security: no static long-lived credentials, no secrets in code or CI variables when a managed identity exists, never trust location, trust identity. Reliability: no deploy path without rollback, no service without health checks, an untested backup is an assumption, not a recovery plan. Observability: if it cannot be seen failing, it does not ship. Cost: every resource has an owner and a reason, or it gets deleted.

Here is where the story gets embarrassing, which is to say useful. After finishing the constitution, I did the obvious thing and audited my own production setup against it. The result was a gap analysis document that I keep in the repo, and my own infrastructure failed several of its own gates.

Two failures stood out. First, deployment was SSH plus file copy: log into the server, pull, restart. It works, and it fails the reliability gate completely: no atomic release, no rollback, no audit trail beyond shell history. Second, and worse, static cloud credentials sat in GitHub secrets: long-lived access keys of the exact kind the security gate bans, because leaked long-lived keys are how small projects end up mining cryptocurrency for someone else.

I could have quietly fixed both and pretended the constitution sprang fully formed from principled engineering. I left the gap analysis in the repo instead, with warning markers on every failed check. A rulebook that has never caught its own author is marketing material. One that has caught you, with receipts, is a tool.

There is a broader lesson about working with AI here. The value of the constitution is not that it makes the agent smarter. It is that it makes the agent refusable. When an agent proposes something that fails a gate, the conversation stops being a negotiation with a very confident text generator and becomes a checklist lookup. The agent drafts, the constitution judges, and I decide. That's the correct hierarchy, written down so it survives my own laziness at midnight.

The CI insight from the same guidelines applies doubly to AI-generated changes: CI/CD is not a deployment tool, it is a trust pipeline, and the output of CI is confidence. Generated code enters with less trust than hand-written code, so it must earn more of it mechanically: stricter linting, mandatory plan review, no direct-to-production paths.

If you are letting AI write infrastructure, write the constitution first. Make the gates binary. Then run your own systems through it and publish what fails. The document that survives that exercise is worth following.`,
  },
  {
    slug: "security-checklist-to-real-code",
    title: "From a Security Checklist PDF to Real Auth Code",
    excerpt:
      "A client handed me a generic security checklist. Instead of nodding and filing it away, I mapped every item to actual code in the project, and learned that the mapping is where all the value lives.",
    tags: ["Security", "Full Stack", "Engineering"],
    readTime: "9 min",
    date: "2026-05-10",
    status: "published",
    body: `Every developer eventually receives The Checklist. A client or manager forwards a PDF titled something like "essential security practices", assembled by someone selling a course, and asks: are we doing all this? Most of these checklists are not wrong. They are just unfalsifiable. "Validate all inputs" is advice nobody can disagree with and nobody can verify.

It happened to me on a client project: a security checklist written for beginners, complete with generic dangers and one-size-fits-all fixes. The lazy answer was "yes, we're covered". The useful answer, which became a document in the repo, was to take every single item and map it to the real code: file paths, mechanisms, and honest status marks.

The transformation is bigger than it sounds. "Protect against brute force" is a wish. "Login attempts are rate limited per account and per IP, with lockout thresholds, in this middleware file" is a fact someone can check, test, and break. The checklist asks the question; the mapping is the actual security work.

Some of the mappings turned out to be the most interesting engineering in the project. Take logout. The naive JWT story is that you cannot revoke a token, you just wait for expiry. The project's answer: every token carries a unique identifier, and logout adds that identifier to a blacklist checked on each request. Stolen tokens die when the session does, not when the clock says so.

Two-factor authentication had a subtler detail: the 2FA challenge token is single use. Once a code is verified, the challenge cannot be replayed, which closes a window most tutorial implementations leave open. Password rules differ per role, because an admin account and a customer account do not carry the same blast radius. Redirect targets after login are whitelisted, killing open-redirect phishing. And the contact and signup forms include honeypot fields: invisible inputs that humans never fill but naive bots always do, which quietly filters automated abuse with zero user friction.

None of these came from the checklist. The checklist said "secure your authentication". The mapping process forced the better question: what does secure mean here, in this file, for this threat?

My favorite section of the mapping document is the one most security theater omits: known advisories, accepted. Running a dependency audit on the project flags a couple of moderate findings in transitive dependencies. The document lists them, explains why they are not exploitable in this context, and notes that the "fix" would be a breaking downgrade that introduces more risk than it removes. That paragraph is more trustworthy than a green badge, because a clean audit output usually means someone ran an update command until warnings went away, understanding none of them.

Security is not the checklist and it is not even the code. It is the explicit, written relationship between the two. When the relationship is documented, new engineers can verify claims instead of inheriting folklore, auditors get file paths instead of assurances, and future me can tell whether a change breaks a guarantee some past me made.

So next time The Checklist lands in your inbox, resist both failure modes: do not dismiss it as beginner content, and do not nod it into a drawer. Fork it into your repo and annotate every line with what your code actually does, where, and why. The gaps you find are real work worth doing. The items you can point to are proof. And the ones you consciously decide not to fix, written down with reasons, are the mark of a team that actually understands its own security instead of performing it.`,
  },
  {
    slug: "the-remove-it-test",
    title: "The Remove-It Test: Why Premium Design Is Quieter Than You Think",
    excerpt:
      "The best design rule I use is brutally simple: if removing an element does not hurt the page, it should not be there. Notes from the design system I apply to client work.",
    tags: ["Design", "Frontend", "UX"],
    readTime: "7 min",
    date: "2026-06-14",
    status: "published",
    body: `Open any portfolio site built last year and count the animations. Cursor trails, tilting cards, letters that scatter when you scroll. Each one screams effort. And that is exactly the problem: premium design is usually quieter than amateur attempts at luxury.

For client work I maintain a design constitution, a written set of rules I apply to every interface decision. The rule I reach for most often is the Remove-It Test: for any element, animation, or effect, imagine the page without it. If nothing of value is lost, remove it. The highest-quality websites are often those that know what not to include.

It sounds like minimalism, but the mechanism is different. Minimalism is an aesthetic; the Remove-It Test is an audit. You are not asking "does this look clean?", you are asking "what is this element doing for the user?" A gradient border can pass the test if it communicates hierarchy. A parallax section almost never passes, because the page without it says exactly the same thing, faster.

The companion rule is the Wow Test, and it inverts what people expect: if an interaction impresses you so much that you notice the interaction instead of the content, redesign it. The best animation is often the one users barely notice but always appreciate. Motion should feel like the interface breathing, not performing.

Quiet does not mean vague. The constitution pins motion to numbers: tiny interactions like hovers and toggles live in the 100 to 180 millisecond band, standard transitions a bit above that, and only rare cinematic moments, a hero reveal on first load, are allowed 1000 to 2000 milliseconds. Once timings are written down, animation stops being taste and starts being engineering. A 400 millisecond hover effect is not a style choice, it is a bug.

The same goes for where motion is allowed to live. I keep a frequency hierarchy per section, effectively a star rating: the hero gets the most animation freedom, cards and stats get a little, and forms get almost none, because nobody wants their invoice fields to bounce. Motion budget, like complexity budget, is a finite resource you spend where attention actually belongs.

When rules conflict, a fixed priority order resolves the argument, and the order is the whole philosophy in one line: accessibility beats usability, usability beats aesthetics, and novelty comes dead last. A beautiful interaction that fails keyboard users is not a beautiful interaction. Respecting a reduced-motion preference is not an edge case, it is the priority list working as designed.

Context bends the rules without breaking them. The constitution adapts by industry: a healthcare interface should be calm, high-contrast, and predictable, while a creative studio site can spend far more motion budget. The Remove-It Test survives every adaptation, though. It just returns different answers, because "value" means something different to a nurse on a night shift than to a design-conference visitor.

The deepest instruction in the whole document is about the document itself: never follow it blindly. It is a knowledge base, not a checklist, and the best solution for a given page rarely uses every technique available. Rules externalize judgment so you can argue with yourself in writing. They do not replace the judgment.

So here is the exercise I give every interface I touch, and it costs nothing: pick your proudest visual flourish. Screenshot the page with it and without it. Show both to someone who has never seen the project and ask what the page is about. If both versions get the same answer, you know what to do. It will sting once. Then it becomes the most freeing rule you have.`,
  },
  {
    slug: "one-constitution-three-projects",
    title: "One Coding Constitution, Three Projects",
    excerpt:
      "I copy the same engineering principles document into every repo I start, then layer framework-specific rules on top. Here is why the boring duplicated file outperforms clever tooling.",
    tags: ["Engineering", "TypeScript", "Best Practices"],
    readTime: "8 min",
    date: "2026-07-05",
    status: "published",
    body: `There is a file I copy, nearly byte for byte, into every serious project I start. It is not a utility library or a config. It is a document: mandatory software engineering principles, the same SOLID, DRY, KISS, and YAGNI canon every senior engineer claims to know, written down as binding rules with a code-review checklist at the end. It has now shipped inside a healthcare platform, a manufacturing automation system, and a B2B agricultural platform.

Copying a principles doc between repos sounds like the least interesting engineering decision possible. That is exactly why it works. The document is boring, stable, and portable, which are the three qualities project-specific conventions never have. Every new codebase starts with the same constitutional layer, so the arguments that waste the first month of most projects, naming, error handling, when to abstract, are pre-settled by a document with authority.

The line from that document I quote most often: never generate tutorial-level code. It was written with AI assistants in mind, and it earns its keep daily. Tutorial code is code that works in the happy path and teaches nothing about failure: no error boundaries, no loading states, no thought about what happens when the network lies to you. Whether the author is a model or a rushed human, the rule gives review a word for the smell.

The constitution alone is not enough, because principles are stack-agnostic and bugs are not. So each project layers framework-specific rulebooks on top, and those are where the sharp edges live. Three examples that have each saved me real debugging hours.

Tailwind first. The JIT compiler scans your source for class names as literal strings. Build a class dynamically, by concatenating a color variable into a class name at runtime, and it silently vanishes from the output CSS. Nothing errors; the style just does not exist in production. The rule: never interpolate class names, keep a lookup map from state to complete class strings. One sentence in a rulebook versus an evening of staring at a button that is styled locally and naked in prod.

Next.js second. The rule is phrased to be unforgettable: Server Actions are public endpoints, authenticate every one. The framework makes calling a server function feel like a local call, and that ergonomic lie is exactly why people forget that anyone on the internet can invoke it with crafted input. Every action validates with a schema and checks authorization, no exceptions, even the "internal" ones. Especially the internal ones.

React lists third. The rulebook says virtualize any list beyond about a hundred items, and states the memoization policy as: only when profiling justifies it. Premature memo wrapping clutters code for wins that do not exist, while a two-thousand-row table without virtualization is a guaranteed jank generator. The number matters less than having a number; thresholds convert vibes into review comments.

The same rulebooks also encode the quieter preferences that keep bundles lean: prefer the platform Intl APIs over date-formatting libraries, prefer fetch over an HTTP client dependency, reach for a library only when the platform genuinely cannot do the job. None of these are dramatic. Compounded over a project, they are the difference between a lean app and a node_modules archaeology dig.

Does duplicating the constitution across repos violate DRY, the very principle it preaches? No, and the distinction matters: DRY is about not duplicating knowledge that must change together. The principles document is intentionally frozen; each copy is a snapshot, not a dependency. A shared living version would couple three unrelated projects to one file's churn, which is the exact coupling DRY exists to prevent.

If you work across multiple codebases, or with AI agents that need the same briefing every session, write your constitution once. Keep it under a page of rules that are actually enforceable, add a framework rulebook per stack with numbers and named gotchas, and copy them into every repo like you copy a license file. It is the highest-leverage boring file you will ever maintain.`,
  },
];

const labs: Prisma.LabCreateInput[] = [
  {
    slug: "context-interpreter",
    title: "CONTEXT: A Programming Language Interpreter",
    description:
      "A custom programming language interpreter built in Python from scratch: lexical analysis, recursive parsing, AST generation, and a runtime supporting arithmetic, conditionals, and variable bindings.",
    status: "Done",
    tags: ["Python", "Compilers", "AST", "Interpreters"],
    progress: 100,
  },
  {
    slug: "xr-av-research",
    title: "XR Research: Pedestrian-AV Interaction",
    description:
      "Two peer-reviewed publications on pedestrian and autonomous vehicle interaction: an IGI Global book chapter on XR-based simulation environments, and an ICDSNE 2026 paper evaluating eHMI trust in VR with 30+ participants.",
    status: "Done",
    tags: ["XR", "VR", "HCI", "Research"],
    progress: 100,
  },
  {
    slug: "portfolio-3",
    title: "Portfolio 3.0 (this site)",
    description:
      "The site you are on: Next.js 16, React 19, Prisma 7 with the pg driver adapter, Tailwind v4 CSS-first theming, and PostgreSQL on Supabase. Command palette, terminal, and a CMS interface concept included.",
    status: "Done",
    tags: ["Next.js", "Prisma", "Supabase", "Tailwind"],
    progress: 100,
  },
  {
    slug: "hyprland-dotfiles",
    title: "Arch Linux + Hyprland Workflow",
    description:
      "An ongoing rice: Hyprland on Arch Linux with custom keybinds, theming, and dotfiles automation. The daily driver that every project on this site was built on.",
    status: "In Progress",
    tags: ["Linux", "Hyprland", "Dotfiles"],
    progress: 70,
  },
];

// The `order` field drives the sequence shown on /philosophy.
const principles: Prisma.PrincipleCreateInput[] = [
  {
    slug: "automation-first",
    title: "Automation First",
    body: "If I do something twice, I automate it the third time. Repetition is a signal that a system is missing.",
    order: 1,
  },
  {
    slug: "architecture-over-features",
    title: "Architecture Over Features",
    body: "A well-designed system can absorb new features gracefully. A poorly designed one collapses under them.",
    order: 2,
  },
  {
    slug: "performance-is-respect",
    title: "Performance Is Respect",
    body: "Fast software respects the user's time. Every unnecessary millisecond is a form of disrespect.",
    order: 3,
  },
  {
    slug: "tools-shape-thinking",
    title: "Tools Shape Thinking",
    body: "The tools you use define how you think about problems. Choose them carefully. Build them when necessary.",
    order: 4,
  },
  {
    slug: "linux-is-freedom",
    title: "Linux Is Freedom",
    body: "Running your own stack, knowing your system, owning your environment - this is engineering, not just usage.",
    order: 5,
  },
  {
    slug: "simplicity-is-hard",
    title: "Simplicity Is Hard",
    body: "Complex solutions are easy. Simple, elegant, maintainable systems are where real engineering lives.",
    order: 6,
  },
  {
    slug: "ownership",
    title: "Ownership",
    body: "If it's deployed, it's mine. If it breaks, I fix it. No blame, no handoffs. Full ownership.",
    order: 7,
  },
];

async function main() {
  // Remove rows whose slugs are no longer seeded (e.g. the old demo content),
  // then upsert the real content.
  await prisma.project.deleteMany({ where: { slug: { notIn: projects.map((p) => p.slug) } } });
  await prisma.blogPost.deleteMany({ where: { slug: { notIn: posts.map((p) => p.slug) } } });
  await prisma.lab.deleteMany({ where: { slug: { notIn: labs.map((l) => l.slug) } } });
  await prisma.principle.deleteMany({ where: { slug: { notIn: principles.map((p) => p.slug) } } });

  for (const data of projects) {
    await prisma.project.upsert({ where: { slug: data.slug }, update: data, create: data });
  }
  for (const data of posts) {
    await prisma.blogPost.upsert({ where: { slug: data.slug }, update: data, create: data });
  }
  for (const data of labs) {
    await prisma.lab.upsert({ where: { slug: data.slug }, update: data, create: data });
  }
  for (const data of principles) {
    await prisma.principle.upsert({ where: { slug: data.slug }, update: data, create: data });
  }
  console.log(
    `Seeded ${projects.length} projects, ${posts.length} posts, ${labs.length} labs, ${principles.length} principles.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
