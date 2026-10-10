import type { ComponentType, CSSProperties } from "react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiFramer,
  SiVuedotjs,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiGraphql,
  SiGit,
  SiGithub,
  SiDocker,
  SiVercel,
  SiFigma,
  SiLinux,
  SiGithubactions,
  SiOpenapiinitiative,
  SiStripe,
  SiSocketdotio,
  SiJsonwebtokens,
  SiMdx,
  SiExpo,
  SiFirebase,
  SiChartdotjs,
  SiGo,
  SiGin,
  SiFlutter,
  SiDart,
  SiSupabase,
} from "react-icons/si";
import {
  Sparkles,
  Terminal,
  MousePointerClick,
  Code2,
  Radio,
  CreditCard,
} from "lucide-react";

type AnyIcon = ComponentType<{
  className?: string;
  style?: CSSProperties;
}>;

interface TechMeta {
  icon: AnyIcon;
  /** Official brand color. Undefined = monochrome brand (adapts to theme). */
  color?: string;
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

const TECH_MAP: Record<string, TechMeta> = {};

function reg(aliases: string[], icon: AnyIcon, color?: string) {
  for (const alias of aliases) TECH_MAP[norm(alias)] = { icon, color };
}

/* ---------- Brand registry (official simple-icons colors) ---------- */
reg(["react", "reactjs", "react native", "reactnative"], SiReact, "#61DAFB");
reg(["next.js", "nextjs", "next"], SiNextdotjs); // mono
reg(["typescript", "ts"], SiTypescript, "#3178C6");
reg(["javascript", "js"], SiJavascript, "#F7DF1E");
reg(["tailwind css", "tailwindcss", "tailwind"], SiTailwindcss, "#06B6D4");
reg(["html/css", "htmlcss", "html5", "html"], SiHtml5, "#E34F26");
reg(["css", "css3"], SiCss, "#663399");
reg(["framer motion", "framermotion", "framer"], SiFramer, "#0055FF");
reg(["vue.js", "vuejs", "vue"], SiVuedotjs, "#4FC08D");
reg(["node.js", "nodejs", "node"], SiNodedotjs, "#5FA04E");
reg(["express.js", "expressjs", "express"], SiExpress); // mono
reg(["python"], SiPython, "#3776AB");
reg(["postgresql", "postgres"], SiPostgresql, "#4169E1");
reg(["mongodb", "mongo"], SiMongodb, "#47A248");
reg(["prisma orm", "prismaorm", "prisma"], SiPrisma); // mono
reg(
  ["rest apis", "restapis", "rest api", "restapi", "openapi"],
  SiOpenapiinitiative,
  "#6BA539"
);
reg(["graphql"], SiGraphql, "#E10098");
reg(["git & github", "gitgithub", "git"], SiGit, "#F05032");
reg(["github"], SiGithub); // mono
reg(["docker"], SiDocker, "#2496ED");
reg(["vercel", "vercel ai sdk", "vercelaisdk"], SiVercel); // mono
reg(["figma"], SiFigma, "#F24E1E");
reg(["linux"], SiLinux, "#FCC624");
reg(
  ["ci/cd", "cicd", "github actions", "githubactions"],
  SiGithubactions,
  "#2088FF"
);
reg(["stripe"], SiStripe, "#635BFF");
reg(["socket.io", "socketio"], SiSocketdotio); // mono
reg(["jwt", "json web tokens", "jsonwebtokens"], SiJsonwebtokens); // mono
reg(["mdx"], SiMdx); // mono
reg(["expo"], SiExpo); // mono
reg(["firebase"], SiFirebase, "#FFCA28");
reg(["chart.js", "chartjs"], SiChartdotjs, "#FF6384");

/* Lucide fallbacks for brands without an official simple-icon */
reg(["openai"], Sparkles); // mono
reg(["commander.js", "commanderjs", "commander"], Terminal); // mono
reg(["inquirer"], MousePointerClick); // mono

/* Pharmacy OS stack */
reg(["go", "golang"], SiGo, "#00ADD8");
reg(["gin", "gin framework"], SiGin, "#008ECF");
reg(["flutter"], SiFlutter, "#02569B");
reg(["dart"], SiDart, "#0175C2");
reg(["supabase"], SiSupabase, "#3FCF8E");
reg(["websocket", "websockets", "real-time", "realtime"], Radio); // mono
reg(["paymob", "xpay", "payments"], CreditCard); // mono

const FALLBACK: TechMeta = { icon: Code2 }; // mono

export function getTechMeta(name: string): TechMeta {
  return TECH_MAP[norm(name)] ?? FALLBACK;
}

/* ---------- Contrast helpers ---------- */

function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const lin = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** CSS vars for a tech: --tech (accent) and --tech-on (readable color on top of it). */
export function techVars(name: string): CSSProperties {
  const meta = getTechMeta(name);
  if (!meta.color) {
    // Monochrome brands ride on the site's primary accent
    return { ["--tech" as string]: "var(--primary)", ["--tech-on" as string]: "var(--primary-foreground)" };
  }
  const on = luminance(meta.color) > 0.5 ? "#111827" : "#FFFFFF";
  return { ["--tech" as string]: meta.color, ["--tech-on" as string]: on };
}

/* ---------- Icon component ---------- */

export default function TechIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const meta = getTechMeta(name);
  const Icon = meta.icon;
  return (
    <Icon
      className={className}
      style={meta.color ? { color: meta.color } : undefined}
      aria-hidden="true"
    />
  );
}
