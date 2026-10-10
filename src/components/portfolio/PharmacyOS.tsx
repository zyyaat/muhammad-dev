"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Github,
  CheckCircle2,
  Server,
  MonitorSmartphone,
  Smartphone,
  Database,
  ShieldCheck,
  CreditCard,
  Radio,
  FileSpreadsheet,
  Barcode,
  Globe,
} from "lucide-react";
import TechIcon from "./TechIcon";

const LIVE_URL = "https://matketing22.vercel.app/";
const REPO_URL = "https://github.com/zyyaat/pharmacy-public";

const stats = [
  { value: "100K+", label: "Lines of code" },
  { value: "180+", label: "REST endpoints" },
  { value: "5", label: "Client apps" },
  { value: "8", label: "Languages (i18n)" },
  { value: "3", label: "Platforms" },
];

const layers = [
  {
    icon: Server,
    title: "Go API",
    subtitle: "The single source of truth",
    points: [
      "Gin + PostgreSQL (pgxpool) with a strict handler → service → repository layering",
      "Opaque DB-backed sessions in HttpOnly cookies + CSRF — no tokens in localStorage",
      "RBAC permission engine, full audit trail, background jobs",
    ],
    color: "#00ADD8",
  },
  {
    icon: MonitorSmartphone,
    title: "Next.js × 4 Apps",
    subtitle: "Independently deployable clients",
    points: [
      "Pharmacy dashboard, admin panel, POS, and marketing site on React 19",
      "next-intl with 8 locales (ar · en · fr · es · tr · zh · hi · ur)",
      "Tailwind CSS v4 + Radix UI, dark mode, deployed on Vercel",
    ],
    color: "#FFFFFF",
  },
  {
    icon: Smartphone,
    title: "Flutter Mobile",
    subtitle: "Android APK + Windows EXE",
    points: [
      "Cookie-session ported natively over dio with secure storage",
      "Offline detection, thermal PDF receipts, embedded Paymob WebView",
      "Shipped via GitHub Actions CI — no local build environment",
    ],
    color: "#02569B",
  },
];

const highlights = [
  {
    icon: ShieldCheck,
    text: "Multi-tenancy enforced at every query: company → pharmacy → branch → employee hierarchy with role-based permissions",
  },
  {
    icon: Radio,
    text: "Real-time support desk over WebSocket with typed events, presence, and a polling fallback that never drops messages",
  },
  {
    icon: CreditCard,
    text: "Embedded payments: Paymob & XPAY checkout, subscription plans, gating, and self-service billing",
  },
  {
    icon: Barcode,
    text: "POS flows with barcode generation, label settings, and thermal receipt printing on web and mobile",
  },
  {
    icon: FileSpreadsheet,
    text: "Excel export/reporting pipeline (excelize) and bulk product import with staged execution",
  },
  {
    icon: Database,
    text: "36 versioned SQL migrations with an honest implemented-vs-scaffolded contract documented in a system guide",
  },
];

const stack = [
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
];

export default function PharmacyOS() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pharmacy-os" className="py-24 sm:py-32 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <Badge
            variant="secondary"
            className="mb-4 gap-1.5 text-xs font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Featured Case Study
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold">Pharmacy OS</h2>
          <div className="mt-4 w-16 h-1 bg-primary mx-auto rounded-full" />
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A multi-tenant pharmacy operations platform — one Go API powering
            four Next.js applications and a Flutter mobile app. Inventory, POS,
            employees, attendance, subscriptions, payments, and a real-time
            support desk, built end-to-end.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          <Button size="lg" className="gap-2" asChild>
            <a href={LIVE_URL} target="_blank" rel="noopener noreferrer">
              <Globe className="h-4 w-4" />
              View Live Site
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              Source Code
            </a>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-16"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.25 + i * 0.06,
              }}
              className="rounded-2xl border border-border bg-card p-5 text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1.5">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Architecture layers */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="grid md:grid-cols-3 gap-4 mb-16"
        >
          {layers.map((layer, i) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 22,
                delay: 0.4 + i * 0.1,
              }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-colors duration-300"
            >
              <div
                className="inline-grid place-items-center h-11 w-11 rounded-xl mb-4"
                style={{
                  background: `color-mix(in oklab, ${layer.color} 12%, transparent)`,
                }}
              >
                <layer.icon
                  className="h-5.5 w-5.5"
                  style={{ color: layer.color }}
                />
              </div>
              <h3 className="text-lg font-semibold">{layer.title}</h3>
              <p className="text-xs text-primary font-medium mt-0.5 mb-4">
                {layer.subtitle}
              </p>
              <ul className="space-y-2.5">
                {layer.points.map((point) => (
                  <li
                    key={point}
                    className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Engineering highlights */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold text-center mb-8">
            Engineering highlights
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {highlights.map((h, i) => (
              <motion.div
                key={h.text}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.55 + i * 0.07 }}
                className="flex items-start gap-3.5 rounded-xl border border-border bg-card/50 p-4"
              >
                <div className="grid place-items-center h-9 w-9 shrink-0 rounded-lg bg-primary/10">
                  <h.icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {h.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="text-xl font-semibold text-center mb-8">
            Built with
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
            {stack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.75 + i * 0.035,
                }}
                className="tech-badge inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium hover:border-primary/40 transition-colors"
              >
                <span className="tech-badge-icon">
                  <TechIcon name={tech} className="h-4 w-4" />
                </span>
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
