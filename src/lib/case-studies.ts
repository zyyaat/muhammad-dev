
export type ProjectCategory = "Web App" | "API" | "Mobile" | "Open Source";

export interface Stat {
  value: string;
  label: string;
}

export interface Feature {
  /** Lucide icon key resolved in the client component */
  icon: string;
  title: string;
  text: string;
}

export interface GalleryShot {
  src: string;
  alt: string;
  caption: string;
  wide?: boolean;
}

export interface ArchitectureLayer {
  /** Lucide icon key resolved in the client component */
  icon: string;
  title: string;
  subtitle: string;
  points: string[];
  color: string;
}

export interface Highlight {
  /** Lucide icon key resolved in the client component */
  icon: string;
  title: string;
  text: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  cover: string;
  coverStyle: "split" | "fullbleed";
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  year: string;
  role: string;
  platform: string;
  status: string;
  isLive?: boolean;
  challenge: string;
  solution: string;
  stats: Stat[];
  features: Feature[];
  gallery?: GalleryShot[];
  mobileShots?: { src: string; alt: string }[];
  mobileCopy?: {
    title: string;
    text: string;
    points: string[];
  };
  architecture?: ArchitectureLayer[];
  highlights?: Highlight[];
  stack: string[];
  closing: { title: string; text: string };
}

const PHARMACY_LIVE = "https://matketing22.vercel.app/";
const PHARMACY_REPO = "https://github.com/zyyaat/pharmacy-public";

export const caseStudies: CaseStudy[] = [
  /* ================= PHARMACY OS — flagship, real data ================= */
  {
    slug: "pharmacy-os",
    title: "Pharmacy OS",
    tagline:
      "A multi-tenant pharmacy operations platform — one Go API powering four Next.js apps and a Flutter mobile client.",
    description:
      "A multi-tenant pharmacy operations platform: one Go API powering four Next.js apps and a Flutter mobile client — inventory, POS, employees, attendance, subscriptions, payments, and a real-time support desk. ~100K lines of code, built end-to-end.",
    category: "Web App",
    tags: ["Go", "Gin", "PostgreSQL", "Next.js", "Flutter", "WebSocket"],
    cover: "/projects/pharmacy/cover.webp",
    coverStyle: "split",
    liveUrl: PHARMACY_LIVE,
    githubUrl: PHARMACY_REPO,
    featured: true,
    year: "2024 — 2025",
    role: "Solo full-stack — architecture, backend, all five clients, CI/CD",
    platform: "Web (4 apps) · Android · Windows",
    status: "Live in production",
    isLive: true,
    challenge:
      "Independent pharmacies still run on paper notebooks, disconnected spreadsheets, and gut feeling. Stock counts drift from reality, expiry dates sneak past, employee hours live in a paper ledger, and the owner has no single place that answers \"how is my business doing right now?\" — let alone across multiple branches.",
    solution:
      "Pharmacy OS replaces that patchwork with one operating system: a strict layered Go API as the single source of truth, four independently deployable Next.js clients (pharmacy dashboard, admin panel, POS, marketing site), and a Flutter app for Android and Windows. Multi-tenancy is enforced at every query — company → pharmacy → branch → employee — with role-based permissions, full audit trails, and real payments wired in from day one.",
    stats: [
      { value: "100K+", label: "Lines of code" },
      { value: "180+", label: "REST endpoints" },
      { value: "5", label: "Client apps" },
      { value: "36", label: "SQL migrations" },
      { value: "8", label: "Languages (i18n)" },
      { value: "3", label: "Platforms shipped" },
    ],
    features: [
      {
        icon: "Boxes",
        title: "Inventory & barcode",
        text: "Batch/expiry tracking, barcode generation & label settings, stock adjustments, and bulk product import with staged execution.",
      },
      {
        icon: "Receipt",
        title: "POS & receipts",
        text: "Fast point-of-sale flows on web and mobile with thermal PDF receipt printing straight from the browser or the Flutter app.",
      },
      {
        icon: "Users",
        title: "Employees & attendance",
        text: "Branch-scoped employee accounts, shifts, attendance records, and payroll-ready history — all under RBAC permissions.",
      },
      {
        icon: "CreditCard",
        title: "Payments & subscriptions",
        text: "Embedded Paymob & XPAY checkout, subscription plans with gating, and self-service billing for pharmacy owners.",
      },
      {
        icon: "Radio",
        title: "Real-time support desk",
        text: "WebSocket support hub with typed events and presence — plus a polling fallback so conversations never drop messages.",
      },
      {
        icon: "FileSpreadsheet",
        title: "Reports & exports",
        text: "Excel report pipeline (excelize) across sales, stock and employees, with a docs-grade system guide for the whole platform.",
      },
    ],
    gallery: [
      {
        src: "/projects/pharmacy/positioning.webp",
        alt: "Pharmacy OS marketing site — positioning section",
        caption: "Marketing site — the value proposition, in Arabic-first RTL",
        wide: true,
      },
      {
        src: "/projects/pharmacy/login.webp",
        alt: "Pharmacy OS login screen",
        caption: "App login — opaque sessions in HttpOnly cookies, no tokens in localStorage",
      },
      {
        src: "/projects/pharmacy/onboarding-2.webp",
        alt: "Pharmacy OS onboarding wizard",
        caption: "4-step onboarding wizard that provisions a fully isolated pharmacy tenant",
      },
      {
        src: "/projects/pharmacy/mission.webp",
        alt: "Pharmacy OS mission section",
        caption: "The mission: the tools should care about the pharmacy, not the other way around",
        wide: true,
      },
    ],
    mobileShots: [
      { src: "/projects/pharmacy/mobile-hero.webp", alt: "Pharmacy OS mobile landing" },
      { src: "/projects/pharmacy/mobile-login.webp", alt: "Pharmacy OS mobile login" },
    ],
    mobileCopy: {
      title: "Flutter, treated like a first-class client",
      text: "The mobile app is not a wrapped webview of the dashboard — it is a native Flutter client that re-implements the platform's session model and ships through CI, not through someone's laptop.",
      points: [
        "Cookie-session ported natively over dio with secure storage",
        "Connectivity-aware UI with offline detection",
        "Thermal PDF receipt printing on Android",
        "Embedded Paymob WebView checkout",
        "Shipped via GitHub Actions CI — APK & Windows EXE",
      ],
    },
    architecture: [
      {
        icon: "Database",
        title: "Go API",
        subtitle: "The single source of truth",
        points: [
          "Gin + PostgreSQL (pgxpool) with strict handler → service → repository layering",
          "Opaque DB-backed sessions in HttpOnly cookies + CSRF — no tokens in localStorage",
          "RBAC permission engine, full audit trail, background jobs",
        ],
        color: "#00ADD8",
      },
      {
        icon: "Layers",
        title: "Next.js × 4 apps",
        subtitle: "Independently deployable clients",
        points: [
          "Pharmacy dashboard, admin panel, POS, and marketing site on React 19",
          "next-intl with 8 locales (ar · en · fr · es · tr · zh · hi · ur)",
          "Tailwind CSS v4 + Radix UI, dark mode, deployed on Vercel",
        ],
        color: "#FFFFFF",
      },
      {
        icon: "Rocket",
        title: "Flutter mobile",
        subtitle: "Android APK + Windows EXE",
        points: [
          "Cookie-session ported natively over dio with secure storage",
          "Offline detection, thermal PDF receipts, embedded Paymob WebView",
          "Shipped via GitHub Actions CI — no local build environment",
        ],
        color: "#02569B",
      },
    ],
    highlights: [
      {
        icon: "ShieldCheck",
        title: "Multi-tenancy at every query",
        text: "company → pharmacy → branch → employee hierarchy enforced in the data layer, with role-based permissions and a full audit trail.",
      },
      {
        icon: "Lock",
        title: "Sessions done right",
        text: "Opaque DB-backed sessions in HttpOnly cookies with CSRF protection, bcrypt password hashing, and email OTP — zero tokens in localStorage.",
      },
      {
        icon: "Radio",
        title: "Real-time that never drops",
        text: "WebSocket support hub with typed events and presence, plus an automatic polling fallback when sockets are unavailable.",
      },
      {
        icon: "CreditCard",
        title: "Payments wired end-to-end",
        text: "Paymob & XPAY embedded checkout, subscription gating, and self-service billing — the business model is part of the architecture.",
      },
      {
        icon: "Languages",
        title: "8 languages, RTL-first",
        text: "next-intl powers ar · en · fr · es · tr · zh · hi · ur with an Arabic-first RTL design system across all four web apps.",
      },
      {
        icon: "GitBranch",
        title: "36 versioned migrations",
        text: "Every schema change is a versioned SQL migration, with an honest implemented-vs-scaffolded contract documented in a system guide.",
      },
    ],
    stack: [
      "Go",
      "Gin",
      "PostgreSQL",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Flutter",
      "Dart",
      "WebSocket",
      "JWT",
      "Docker",
      "GitHub Actions",
      "Vercel",
      "Paymob",
    ],
    closing: {
      title: "Explore the live platform",
      text: "The marketing site, onboarding wizard, and login are live — walk through the same flows a pharmacy owner sees on day one.",
    },
  },

  /* ================= Placeholder portfolio projects ================= */
  {
    slug: "ecommerce",
    title: "E-Commerce Platform",
    tagline: "Storefront, real-time inventory & an admin analytics dashboard.",
    description:
      "A full-featured e-commerce platform with real-time inventory management, Stripe payment integration, and an admin dashboard for order tracking and analytics.",
    category: "Web App",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe", "PostgreSQL"],
    cover: "/projects/ecommerce.webp",
    coverStyle: "fullbleed",
    year: "2024",
    role: "Full-stack design & development",
    platform: "Web",
    status: "Completed",
    challenge:
      "Small stores need more than a product grid: inventory has to stay truthful across every sale, checkout must feel effortless, and the owner needs answers about orders and revenue without opening a database. Most off-the-shelf kits bolt those pieces together awkwardly and fall apart the moment traffic grows.",
    solution:
      "A single Next.js application where the storefront, inventory engine, Stripe checkout, and admin analytics share one Prisma/PostgreSQL data model. Stock decrements atomically at checkout, webhooks keep payment state in sync, and the admin dashboard turns the same data into order tracking and revenue analytics.",
    stats: [
      { value: "100%", label: "TypeScript end-to-end" },
      { value: "1", label: "Shared data model" },
      { value: "0", label: "Oversold items — atomic stock" },
      { value: "24/7", label: "Webhook-synced payments" },
    ],
    features: [
      {
        icon: "Store",
        title: "Storefront",
        text: "Product catalog, search, and cart built around server components for fast first paint.",
      },
      {
        icon: "Boxes",
        title: "Real-time inventory",
        text: "Atomic stock updates at checkout — the database, not the UI, is the source of truth.",
      },
      {
        icon: "CreditCard",
        title: "Stripe checkout",
        text: "Hosted checkout with webhook-driven order state: paid, shipped, refunded.",
      },
      {
        icon: "BarChart3",
        title: "Admin analytics",
        text: "Order tracking, revenue charts, and low-stock alerts in a single dashboard.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "Stripe", "PostgreSQL", "Vercel"],
    closing: {
      title: "Built to sell, not just to demo",
      text: "Every flow — browse, pay, fulfill, refund — is wired through real payment and inventory primitives.",
    },
  },
  {
    slug: "task-api",
    title: "Task Management API",
    tagline: "REST API with RBAC, JWT auth & real-time team notifications.",
    description:
      "A RESTful API for task management with JWT authentication, role-based access control, and real-time WebSocket notifications for team collaboration.",
    category: "API",
    tags: ["Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    cover: "/projects/task-api.webp",
    coverStyle: "fullbleed",
    year: "2024",
    role: "Backend design & development",
    platform: "API / Node.js service",
    status: "Completed",
    challenge:
      "Team task tools die on two details: who is allowed to change what, and how everyone else finds out the moment something changes. Permissions sprinkled through route handlers rot fast, and polling every few seconds wastes both battery and patience.",
    solution:
      "An Express + MongoDB API where RBAC is a first-class middleware chain — roles, projects, and permissions checked in one place — and Socket.io rooms mirror the permission model so notifications land instantly, only for people allowed to see them.",
    stats: [
      { value: "RBAC", label: "Role-based access at middleware level" },
      { value: "WS", label: "Socket.io rooms scoped by project" },
      { value: "JWT", label: "Stateless auth with refresh rotation" },
      { value: "REST", label: "Predictable resource-oriented routes" },
    ],
    features: [
      {
        icon: "Lock",
        title: "JWT authentication",
        text: "Short-lived access tokens with refresh rotation and per-device revocation.",
      },
      {
        icon: "ShieldCheck",
        title: "Role-based access control",
        text: "Owner / admin / member / viewer roles enforced by a single reusable middleware chain.",
      },
      {
        icon: "Zap",
        title: "Real-time notifications",
        text: "Socket.io pushes assignments, comments, and status changes to exactly the right rooms.",
      },
      {
        icon: "Database",
        title: "MongoDB aggregation",
        text: "Board metrics and velocity reports computed with aggregation pipelines, not N+1 queries.",
      },
    ],
    stack: ["Node.js", "Express", "MongoDB", "Socket.io", "JWT", "Docker"],
    closing: {
      title: "An API teams can build on",
      text: "Documented routes, predictable errors, and real-time events that respect the permission model.",
    },
  },
  {
    slug: "ai-chat",
    title: "AI Chat Interface",
    tagline: "Streaming AI chat with conversation memory & markdown rendering.",
    description:
      "An elegant AI chat application with streaming responses, conversation history, and markdown rendering. Built with a focus on performance and UX.",
    category: "Web App",
    tags: ["React", "OpenAI", "Tailwind CSS", "Vercel AI SDK"],
    cover: "/projects/ai-chat.webp",
    coverStyle: "fullbleed",
    year: "2024",
    role: "Frontend & integration",
    platform: "Web",
    status: "Completed",
    challenge:
      "Most AI chat demos feel like a terminal bolted to a webpage: text pops in after a long blank wait, code blocks lose their formatting, and refreshing the page deletes the whole conversation. The model is only half the product — the other half is how the interface behaves while you wait.",
    solution:
      "A React interface built on the Vercel AI SDK where tokens stream in as they are generated, markdown and code render with proper highlighting, and every conversation persists to a history sidebar. Optimistic UI keeps the chat responsive even on slow network rounds.",
    stats: [
      { value: "TTFT", label: "Time-to-first-token focused UI" },
      { value: "MD", label: "Full markdown + code rendering" },
      { value: "∞", label: "Persisted conversation history" },
      { value: "60fps", label: "Streaming without jank" },
    ],
    features: [
      {
        icon: "Zap",
        title: "Token streaming",
        text: "Responses render as they arrive via the Vercel AI SDK streaming protocol.",
      },
      {
        icon: "FileText",
        title: "Markdown & code",
        text: "Headings, lists, tables, and syntax-highlighted code blocks render correctly mid-stream.",
      },
      {
        icon: "RefreshCw",
        title: "Conversation memory",
        text: "Threads persist across reloads with rename, delete, and pick-up-where-you-left-off.",
      },
      {
        icon: "LineChart",
        title: "Performance-minded",
        text: "Memoized message list and careful state updates keep long chats at 60fps.",
      },
    ],
    stack: ["React", "OpenAI", "Tailwind CSS", "Vercel AI SDK", "TypeScript", "Vercel"],
    closing: {
      title: "The interface does the waiting for you",
      text: "Streaming, memory, and rendering details that make an AI product feel finished instead of experimental.",
    },
  },
  {
    slug: "portfolio-cms",
    title: "Portfolio CMS",
    tagline: "Headless CMS with rich text editor & webhook deployments.",
    description:
      "A headless CMS designed for developer portfolios, featuring a rich text editor, image optimization, and automatic deployment to Vercel via webhooks.",
    category: "Web App",
    tags: ["Next.js", "MDX", "Prisma", "Vercel"],
    cover: "/projects/portfolio-cms.webp",
    coverStyle: "fullbleed",
    year: "2023",
    role: "Full-stack design & development",
    platform: "Web",
    status: "Completed",
    challenge:
      "Developer portfolios rot because updating them is a chore: SSH into a server, edit markdown, rebuild, pray. Content and code live in the same repo, so every typo becomes a deploy — and images are whatever file size the camera felt like producing.",
    solution:
      "A headless CMS where projects and posts are content, not code. A rich text editor writes MDX, Prisma persists everything to PostgreSQL, images pass through an optimization pipeline, and publishing fires a Vercel webhook that rebuilds the public site with fresh content — no code touched.",
    stats: [
      { value: "MDX", label: "Rich text editor output" },
      { value: "1", label: "Publish = one webhook" },
      { value: "auto", label: "Image optimization pipeline" },
      { value: "0", label: "Code changes to publish" },
    ],
    features: [
      {
        icon: "FileText",
        title: "Rich text editor",
        text: "Write structured MDX with components — no markdown syntax memorization required.",
      },
      {
        icon: "Database",
        title: "Prisma models",
        text: "Projects, posts, tags, and media live in a clean relational schema.",
      },
      {
        icon: "RefreshCw",
        title: "Webhook deploys",
        text: "Publishing triggers a Vercel rebuild — content ships without touching the repo.",
      },
      {
        icon: "Zap",
        title: "Image optimization",
        text: "Uploads are resized and converted to modern formats before they ever reach the CDN.",
      },
    ],
    stack: ["Next.js", "MDX", "Prisma", "Vercel", "TypeScript", "PostgreSQL"],
    closing: {
      title: "Content as data, deploys as a side effect",
      text: "A CMS that treats a portfolio like a product, not a code exercise.",
    },
  },
  {
    slug: "cli-tool",
    title: "CLI Tool Generator",
    tagline: "Open-source scaffolder for project templates & configs.",
    description:
      "An open-source CLI tool that scaffolds project templates with customizable configurations, supporting multiple frameworks and build tools.",
    category: "Open Source",
    tags: ["TypeScript", "Commander.js", "Inquirer"],
    cover: "/projects/cli-tool.webp",
    coverStyle: "fullbleed",
    year: "2023",
    role: "Author & maintainer",
    platform: "CLI / npm package",
    status: "Open source",
    challenge:
      "Starting a project means answering the same ten questions every time: framework, TypeScript or not, linter config, folder structure, CI file. Copy-pasting an old project works until the old project's config drifts three tool versions behind.",
    solution:
      "An npm-distributed CLI that asks the right questions interactively, then scaffolds a coherent, up-to-date project: framework templates, matching lint/format configs, git init, and a first commit — all from one command.",
    stats: [
      { value: "1", label: "Command to a running project" },
      { value: "n", label: "Framework & tool templates" },
      { value: "OSS", label: "Open source & extensible" },
      { value: "0", label: "Config drift — templates stay current" },
    ],
    features: [
      {
        icon: "Terminal",
        title: "Interactive prompts",
        text: "Inquirer flows with sensible defaults — one Enter press away from a scaffolded project.",
      },
      {
        icon: "Layers",
        title: "Template registry",
        text: "Frameworks and build tools map to maintained templates with matching configs.",
      },
      {
        icon: "GitBranch",
        title: "Git-ready output",
        text: "Initializes a repo, writes a clean .gitignore, and makes the first commit for you.",
      },
      {
        icon: "Rocket",
        title: "Extensible by design",
        text: "New templates are data, not forks — drop a definition in, and the CLI picks it up.",
      },
    ],
    stack: ["TypeScript", "Commander.js", "Inquirer", "Node.js"],
    closing: {
      title: "Stop copy-pasting your last project",
      text: "One command, consistent configs, and a clean git history from commit zero.",
    },
  },
  {
    slug: "fitness",
    title: "Fitness Tracker App",
    tagline: "Cross-platform workout, nutrition & health metrics tracker.",
    description:
      "A cross-platform mobile application for tracking workouts, nutrition, and health metrics with data visualization charts and goal setting.",
    category: "Mobile",
    tags: ["React Native", "Expo", "Firebase", "Chart.js"],
    cover: "/projects/fitness.webp",
    coverStyle: "fullbleed",
    year: "2023",
    role: "Mobile design & development",
    platform: "iOS · Android",
    status: "Completed",
    challenge:
      "Fitness apps usually track one thing well and everything else badly: workouts in one app, meals in another, progress photos in the camera roll. And every app guards its data, so your history is hostage to whichever subscription you forget to cancel.",
    solution:
      "One Expo app that owns the full picture — workouts, nutrition, and body metrics in a single Firebase-backed profile — with chart-driven progress views and goal tracking that actually adapts when you miss a week.",
    stats: [
      { value: "2", label: "Platforms from one codebase" },
      { value: "3", label: "Health domains unified" },
      { value: "RT", label: "Firebase real-time sync" },
      { value: "📊", label: "Chart-driven progress views" },
    ],
    features: [
      {
        icon: "Users",
        title: "Workout logging",
        text: "Sets, reps, and rest times logged in seconds — templates for repeat sessions.",
      },
      {
        icon: "FileSpreadsheet",
        title: "Nutrition diary",
        text: "Daily meals with calorie and macro totals that roll into weekly trends.",
      },
      {
        icon: "BarChart3",
        title: "Progress charts",
        text: "Weight, volume, and consistency visualized with Chart.js over any date range.",
      },
      {
        icon: "LineChart",
        title: "Goal engine",
        text: "Goals that adjust to real behavior — missed weeks recalibrate instead of shaming.",
      },
    ],
    stack: ["React Native", "Expo", "Firebase", "Chart.js", "TypeScript"],
    closing: {
      title: "One app for the whole picture",
      text: "Workouts, nutrition, and metrics — synced, charted, and actually yours.",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
