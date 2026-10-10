"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/lib/case-studies";
import TechIcon from "./TechIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  Globe,
  Github,
  CheckCircle2,
  // icon registry (resolved from string keys in case-studies data)
  Boxes,
  Receipt,
  Users,
  CreditCard,
  Radio,
  FileSpreadsheet,
  ShieldCheck,
  Languages,
  Store,
  LineChart,
  Zap,
  Database,
  GitBranch,
  Layers,
  Lock,
  RefreshCw,
  FileText,
  BarChart3,
  Terminal,
  Rocket,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Boxes,
  Receipt,
  Users,
  CreditCard,
  Radio,
  FileSpreadsheet,
  ShieldCheck,
  Languages,
  Store,
  LineChart,
  Zap,
  Database,
  GitBranch,
  Layers,
  Lock,
  RefreshCw,
  FileText,
  BarChart3,
  Terminal,
  Rocket,
};

const iconFor = (key: string): LucideIcon => ICONS[key] ?? Boxes;

/* ------------------------------------------------------------------ */
/*  Slide plan                                                         */
/* ------------------------------------------------------------------ */

interface SlideDef {
  id: string;
  label: string;
}

function slidePlan(data: CaseStudy): SlideDef[] {
  return [
    { id: "cover", label: "Cover" },
    { id: "overview", label: "Overview" },
    { id: "numbers", label: "By the numbers" },
    { id: "features", label: "Features" },
    ...(data.gallery ? [{ id: "screens", label: "Screens" }] : []),
    ...(data.mobileShots ? [{ id: "mobile", label: "Mobile" }] : []),
    ...(data.architecture ? [{ id: "architecture", label: "Architecture" }] : []),
    ...(data.highlights ? [{ id: "highlights", label: "Engineering" }] : []),
    { id: "stack", label: "Stack" },
    { id: "closing", label: "Finish" },
  ];
}

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Building blocks                                                    */
/* ------------------------------------------------------------------ */

function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {sub && (
        <p className="mt-3 text-muted-foreground leading-relaxed">{sub}</p>
      )}
    </div>
  );
}

function BrowserFrame({
  src,
  alt,
  caption,
  priority,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}) {
  return (
    <figure className="group/frame">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg shadow-foreground/5 transition-shadow duration-500 group-hover/frame:shadow-xl group-hover/frame:shadow-primary/10">
        {/* browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-border/70 bg-muted/50 px-3.5 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          <span className="mx-auto hidden max-w-[55%] truncate rounded-full bg-background/70 px-3 py-0.5 text-[10px] text-muted-foreground sm:block">
            {src.replace("/projects/", "").replace(".webp", "")}
          </span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 1100px"
            className="object-cover object-top transition-transform duration-700 group-hover/frame:scale-[1.02]"
          />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2.5 flex items-start gap-2 text-xs text-muted-foreground">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function PhoneFrame({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-[180px] shrink-0 rounded-[2.4rem] border border-border bg-card p-2 shadow-2xl shadow-foreground/10 transition-transform duration-500 hover:rotate-0 sm:w-[210px]",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-[1.9rem]">
        <div className="relative aspect-[9/19]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="220px"
            className="object-cover object-top"
          />
        </div>
        <span className="absolute left-1/2 top-2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-background/70" />
      </div>
    </div>
  );
}

function MetaChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function CaseStudy({ data }: { data: CaseStudy }) {
  const slides = slidePlan(data);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideEls = useRef<(HTMLElement | null)[]>([]);
  const rafRef = useRef(0);
  const targetRef = useRef(0); // authoritative nav index (race-free)
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  /* ---- scroll tracking (progress + nearest-center slide) ---- */
  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) return;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
      const center = el.scrollTop + el.clientHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      slideEls.current.forEach((s, i) => {
        if (!s) return;
        const d = Math.abs(s.offsetTop + s.offsetHeight / 2 - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
      // Sync nav target only when the scroll has settled on a slide,
      // so manual wheel scrolling updates it but smooth animations don't fight it.
      const settled = slideEls.current[best];
      if (settled && Math.abs(el.scrollTop - settled.offsetTop) < 60) {
        targetRef.current = best;
      }
    });
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const goto = useCallback(
    (i: number) => {
      const el = containerRef.current;
      const clamped = Math.max(0, Math.min(slides.length - 1, i));
      targetRef.current = clamped;
      const target = slideEls.current[clamped];
      if (el && target) el.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    },
    [slides.length]
  );

  /* ---- keyboard navigation (PPT-style) ---- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (["ArrowDown", "PageDown", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
        goto(targetRef.current + 1);
      } else if (["ArrowUp", "PageUp", "ArrowLeft"].includes(e.key)) {
        e.preventDefault();
        goto(targetRef.current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goto(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goto(slides.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goto, slides.length]);

  const ghost = (idx: number) => (
    <span
      aria-hidden
      className="pointer-events-none absolute right-6 top-20 select-none text-[5.5rem] font-bold leading-none tracking-tighter text-foreground/[0.05] sm:right-10 sm:text-[7rem]"
    >
      {String(idx + 1).padStart(2, "0")}
    </span>
  );

  /* ---- slide wrappers ---- */
  const page = (
    idx: number,
    id: string,
    className: string,
    inner: React.ReactNode
  ) => (
    <section
      key={id}
      id={id}
      ref={(el) => {
        slideEls.current[idx] = el;
      }}
      className={cn(
        "relative min-h-svh snap-start overflow-hidden px-4 sm:px-6",
        className
      )}
    >
      {ghost(idx)}
      {inner}
    </section>
  );

  const pad = "mx-auto w-full max-w-6xl py-24 sm:py-28";

  const sections: React.ReactNode[] = [];

  /* ================= 1. COVER ================= */
  {
    const idx = sections.length;
    if (data.coverStyle === "split") {
      sections.push(
        page(
          idx,
          "cover",
          "flex items-center pt-16",
          <>
            {/* ambient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(720px 480px at 78% 30%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 65%)",
              }}
            />
            <div className="mx-auto grid w-full max-w-7xl items-center gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    Case Study
                  </span>
                  <span className="h-px w-8 bg-border" />
                  <span className="text-xs font-medium text-muted-foreground">
                    {data.category}
                  </span>
                </div>
                <h1 className="mt-5 text-5xl font-bold tracking-tighter sm:text-6xl lg:text-7xl">
                  {data.title}
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  {data.tagline}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  <MetaChip>
                    <span className="font-semibold text-foreground">
                      {data.year}
                    </span>
                  </MetaChip>
                  <MetaChip>{data.platform}</MetaChip>
                  <MetaChip>
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        data.isLive
                          ? "bg-green-500 shadow-[0_0_8px] shadow-green-500/60"
                          : "bg-muted-foreground/40"
                      )}
                    />
                    {data.status}
                  </MetaChip>
                </div>

                <div className="mt-9 flex flex-wrap gap-3">
                  {data.liveUrl && (
                    <Button size="lg" className="gap-2" asChild>
                      <a href={data.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4" />
                        View live site
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                      </a>
                    </Button>
                  )}
                  {data.githubUrl && (
                    <Button size="lg" variant="outline" className="gap-2" asChild>
                      <a href={data.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        Source code
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>

              {/* browser mockup */}
              <motion.div
                initial={{ opacity: 0, y: 48, rotate: 1.5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
                className="relative"
              >
                <div
                  aria-hidden
                  className="absolute -inset-8 rounded-[2rem] opacity-60 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 20%, transparent), transparent)",
                  }}
                />
                <div className="relative transition-transform duration-700 hover:scale-[1.015] hover:rotate-[0.5deg]">
                  <BrowserFrame
                    src={data.cover}
                    alt={`${data.title} — cover`}
                    priority
                  />
                </div>
              </motion.div>
            </div>

            {/* scroll hint */}
            <div className="absolute inset-x-0 bottom-6 flex justify-center">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground"
              >
                <ChevronDown className="h-3.5 w-3.5" />
                Scroll — or use arrow keys
              </motion.div>
            </div>
          </>
        )
      );
    } else {
      /* fullbleed cover — the art carries the typography */
      sections.push(
        page(
          idx,
          "cover",
          "flex flex-col",
          <>
          <div className="absolute inset-0">
            <Image
              src={data.cover}
              alt={`${data.title} — cover art`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-left sm:object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />
          </div>
          <div className="relative mt-auto flex w-full items-end justify-between pb-16 pt-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3"
            >
              {(data.liveUrl || data.githubUrl) && (
                <>
                  {data.liveUrl && (
                    <Button size="lg" className="gap-2" asChild>
                      <a href={data.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4" />
                        View live
                      </a>
                    </Button>
                  )}
                  {data.githubUrl && (
                    <Button size="lg" variant="outline" className="gap-2 backdrop-blur" asChild>
                      <a href={data.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        Source
                      </a>
                    </Button>
                  )}
                </>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="hidden items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground sm:flex"
            >
              Scroll
              <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
            </motion.div>
          </div>
          </>
        )
      );
    }
  }

  /* ================= 2. OVERVIEW ================= */
  {
    const idx = sections.length;
    sections.push(
      page(
        idx,
        "overview",
        "flex items-center",
        <div className={pad}>
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <SectionHead
              eyebrow="Overview"
              title="Why this project exists"
              sub="Every serious build starts with a real annoyance. Here is the one this project was designed to kill."
            />
          </motion.div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { label: "The challenge", text: data.challenge, tone: "amber" },
              { label: "The solution", text: data.solution, tone: "primary" },
            ].map((block, i) => (
              <motion.div
                key={block.label}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.12 }}
                className="relative rounded-2xl border border-border bg-card p-6 sm:p-8"
              >
                <span
                  className={cn(
                    "absolute inset-x-0 top-0 h-1 rounded-t-2xl",
                    block.tone === "amber" ? "bg-amber-400/70" : "bg-primary"
                  )}
                />
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {block.label}
                </h3>
                <p className="mt-4 leading-relaxed text-foreground/90">
                  {block.text}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            className="mt-4 grid gap-4 rounded-2xl border border-border bg-card/60 p-6 sm:grid-cols-3"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                My role
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed">{data.role}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Platform
              </p>
              <p className="mt-2 text-sm font-medium">{data.platform}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Status
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm font-medium">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    data.isLive
                      ? "bg-green-500 shadow-[0_0_8px] shadow-green-500/60"
                      : "bg-muted-foreground/40"
                  )}
                />
                {data.status}
              </p>
            </div>
          </motion.div>
        </div>
      )
    );
  }

  /* ================= 3. NUMBERS ================= */
  {
    const idx = sections.length;
    sections.push(
      page(
        idx,
        "numbers",
        "flex items-center",
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(640px 420px at 50% 42%, color-mix(in oklab, var(--primary) 10%, transparent), transparent 70%)",
            }}
          />
          <div className={cn(pad, "relative")}>
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-12 text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                By the numbers
              </p>
              <h2 className="mx-auto mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
                The shape of the codebase
              </h2>
            </motion.div>
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {data.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1 + i * 0.07,
                  }}
                  className="rounded-2xl border border-border bg-card p-6 text-center sm:p-8"
                >
                  <div className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    {s.value}
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground sm:text-sm">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )
    );
  }

  /* ================= 4. FEATURES ================= */
  {
    const idx = sections.length;
    sections.push(
      page(
        idx,
        "features",
        "flex items-center",
        <div className={pad}>
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <SectionHead
              eyebrow="Features"
              title="What it actually does"
              sub="The modules that carry the product — each one designed, built, and wired end-to-end."
            />
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.06 * i }}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/30"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10">
                  {(() => { const F = iconFor(f.icon); return <F className="h-5 w-5 text-primary" />; })()}
                </div>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    );
  }

  /* ================= 5. SCREENS (gallery) ================= */
  if (data.gallery) {
    const idx = sections.length;
    // chunk into wide singles and pairs
    const rows: { type: "wide" | "pair"; items: typeof data.gallery }[] = [];
    let i = 0;
    while (i < data.gallery.length) {
      if (data.gallery[i].wide) {
        rows.push({ type: "wide", items: [data.gallery[i]] });
        i += 1;
      } else {
        const pair = [data.gallery[i]];
        if (data.gallery[i + 1] && !data.gallery[i + 1].wide)
          pair.push(data.gallery[i + 1]);
        rows.push({ type: "pair", items: pair });
        i += pair.length;
      }
    }
    sections.push(
      page(
        idx,
        "screens",
        "flex items-center",
        <div className={cn(pad, "w-full")}>
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <SectionHead
              eyebrow="Inside the product"
              title="Screens from the live site"
              sub="Captured straight from production — the same pages a visitor or a pharmacy owner lands on."
            />
          </motion.div>
          <div className="space-y-6">
            {rows.map((row, r) =>
              row.type === "wide" ? (
                <motion.div
                  key={r}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <BrowserFrame
                    src={row.items[0].src}
                    alt={row.items[0].alt}
                    caption={row.items[0].caption}
                  />
                </motion.div>
              ) : (
                <div key={r} className="grid gap-6 md:grid-cols-2">
                  {row.items.map((shot, k) => (
                    <motion.div
                      key={shot.src}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 0.7,
                        ease: EASE,
                        delay: k * 0.12,
                      }}
                    >
                      <BrowserFrame
                        src={shot.src}
                        alt={shot.alt}
                        caption={shot.caption}
                      />
                    </motion.div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      )
    );
  }

  /* ================= 6. MOBILE ================= */
  if (data.mobileShots && data.mobileCopy) {
    const idx = sections.length;
    sections.push(
      page(
        idx,
        "mobile",
        "flex items-center",
        <div className={cn(pad, "w-full")}>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                On mobile
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {data.mobileCopy.title}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {data.mobileCopy.text}
              </p>
              <ul className="mt-6 space-y-3">
                {data.mobileCopy.points.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.07 }}
                    className="flex items-start gap-2.5 text-sm text-foreground/90"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {p}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <div className="flex items-center justify-center gap-5 sm:gap-8">
              {data.mobileShots.map((shot, i) => (
                <motion.div
                  key={shot.src}
                  initial={{ opacity: 0, y: 48, rotate: i === 0 ? -4 : 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    ease: EASE,
                    delay: 0.15 + i * 0.12,
                  }}
                >
                  <PhoneFrame
                    src={shot.src}
                    alt={shot.alt}
                    className={i === 0 ? "-rotate-3 lg:-rotate-2" : "rotate-3 lg:rotate-2"}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )
    );
  }

  /* ================= 7. ARCHITECTURE ================= */
  if (data.architecture) {
    const idx = sections.length;
    sections.push(
      page(
        idx,
        "architecture",
        "flex items-center",
        <div className={cn(pad, "w-full")}>
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <SectionHead
              eyebrow="Architecture"
              title="How the system is built"
              sub="Clear layers, honest contracts — every client talks to one API that owns the truth."
            />
          </motion.div>
          <div className="grid gap-4 md:grid-cols-3">
            {data.architecture.map((layer, i) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/30"
              >
                <div
                  className="inline-grid h-11 w-11 place-items-center rounded-xl"
                  style={{
                    background: `color-mix(in oklab, ${layer.color} 12%, transparent)`,
                  }}
                >
                  {(() => {
                    const L = iconFor(layer.icon);
                    return (
                      <L
                        className="h-5.5 w-5.5"
                        style={{ color: layer.color }}
                      />
                    );
                  })()}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{layer.title}</h3>
                <p className="mt-0.5 text-xs font-medium text-primary">
                  {layer.subtitle}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {layer.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      )
    );
  }

  /* ================= 8. HIGHLIGHTS ================= */
  if (data.highlights) {
    const idx = sections.length;
    sections.push(
      page(
        idx,
        "highlights",
        "flex items-center",
        <div className={cn(pad, "w-full")}>
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <SectionHead
              eyebrow="Engineering notes"
              title="Decisions I'm proud of"
              sub="The details that separate a demo from a system that survives production."
            />
          </motion.div>
          <div className="grid gap-3 md:grid-cols-2">
            {data.highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.05 * i }}
                className="flex items-start gap-3.5 rounded-xl border border-border bg-card/60 p-5"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10">
                  {(() => { const H = iconFor(h.icon); return <H className="h-4.5 w-4.5 text-primary" />; })()}
                </div>
                <div>
                  <p className="text-sm font-semibold">{h.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {h.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    );
  }

  /* ================= 9. STACK ================= */
  {
    const idx = sections.length;
    sections.push(
      page(
        idx,
        "stack",
        "flex items-center",
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(640px 420px at 50% 55%, color-mix(in oklab, var(--primary) 9%, transparent), transparent 70%)",
            }}
          />
          <div className={cn(pad, "relative text-center")}>
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Tech stack
              </p>
              <h2 className="mx-auto mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
                Built with
              </h2>
            </motion.div>
            <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
              {data.stack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.1 + i * 0.04,
                  }}
                  className="tech-badge inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40"
                >
                  <span className="tech-badge-icon">
                    <TechIcon name={tech} className="h-4 w-4" />
                  </span>
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </>
      )
    );
  }

  /* ================= 10. CLOSING ================= */
  {
    const idx = sections.length;
    sections.push(
      page(
        idx,
        "closing",
        "flex items-center justify-center",
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(760px 500px at 50% 60%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 68%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            className={cn("relative mx-auto max-w-3xl px-2 text-center", "py-24")}
          >
            <Badge variant="secondary" className="mb-6 gap-1.5">
              <span className="relative flex h-2 w-2">
                {data.isLive && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                )}
                <span
                  className={cn(
                    "relative inline-flex h-2 w-2 rounded-full",
                    data.isLive ? "bg-primary" : "bg-muted-foreground"
                  )}
                />
              </span>
              {data.isLive ? "Available online" : data.status}
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {data.closing.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
              {data.closing.text}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              {data.liveUrl && (
                <Button size="lg" className="gap-2" asChild>
                  <a href={data.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                    View live site
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                  </a>
                </Button>
              )}
              {data.githubUrl && (
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <a href={data.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Source code
                  </a>
                </Button>
              )}
              <Button size="lg" variant="ghost" className="gap-2" asChild>
                <Link href="/#projects">
                  <ArrowLeft className="h-4 w-4" />
                  All projects
                </Link>
              </Button>
            </div>
            <p className="mt-12 text-xs text-muted-foreground">
              {data.title} · {data.year} — designed &amp; built by MUHAMMAD
            </p>
          </motion.div>
        </>
      )
    );
  }

  /* ---------------------------------------------------------------- */

  return (
    <div className="bg-background text-foreground">
      {/* progress bar */}
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-border/40">
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* top chrome */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/50 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">All projects</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <span className="truncate text-sm font-semibold">{data.title}</span>
          <span className="text-xs font-medium tabular-nums text-muted-foreground">
            {String(active + 1).padStart(2, "0")}
            <span className="mx-1 text-border">/</span>
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </header>

      {/* dot rail */}
      <nav
        aria-label="Slides"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex"
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goto(i)}
            aria-label={s.label}
            className="group relative grid place-items-center py-1"
          >
            <span
              className={cn(
                "block rounded-full transition-all duration-300",
                i === active
                  ? "h-6 w-1.5 bg-primary"
                  : "h-2 w-2 bg-foreground/20 group-hover:bg-foreground/50"
              )}
            />
            <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1 text-[11px] font-medium text-popover-foreground opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
              {s.label}
            </span>
          </button>
        ))}
      </nav>

      {/* the PPT: snap container */}
      <main
        ref={containerRef}
        onScroll={handleScroll}
        className="h-svh snap-y snap-proximity overflow-y-auto scroll-pt-0 lg:snap-mandatory"
        style={{ scrollbarWidth: "thin" }}
      >
        {sections}
      </main>
    </div>
  );
}
