"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState, type CSSProperties, type MouseEvent } from "react";
import TechIcon, { techVars } from "./TechIcon";

type Category = "Frontend" | "Backend" | "Tools" | "Other";

interface Skill {
  name: string;
  category: Category;
  level: number; // 1-5
}

const skills: Skill[] = [
  { name: "React", category: "Frontend", level: 5 },
  { name: "Next.js", category: "Frontend", level: 5 },
  { name: "TypeScript", category: "Frontend", level: 5 },
  { name: "JavaScript", category: "Frontend", level: 5 },
  { name: "Tailwind CSS", category: "Frontend", level: 5 },
  { name: "HTML/CSS", category: "Frontend", level: 5 },
  { name: "Framer Motion", category: "Frontend", level: 4 },
  { name: "Vue.js", category: "Frontend", level: 3 },
  { name: "Node.js", category: "Backend", level: 5 },
  { name: "Express.js", category: "Backend", level: 4 },
  { name: "Python", category: "Backend", level: 4 },
  { name: "PostgreSQL", category: "Backend", level: 4 },
  { name: "MongoDB", category: "Backend", level: 4 },
  { name: "Prisma ORM", category: "Backend", level: 4 },
  { name: "REST APIs", category: "Backend", level: 5 },
  { name: "GraphQL", category: "Backend", level: 3 },
  { name: "Git & GitHub", category: "Tools", level: 5 },
  { name: "Docker", category: "Tools", level: 4 },
  { name: "Vercel", category: "Tools", level: 5 },
  { name: "Figma", category: "Tools", level: 3 },
  { name: "Linux", category: "Tools", level: 4 },
  { name: "CI/CD", category: "Tools", level: 4 },
];

const categories: Category[] = ["Frontend", "Backend", "Tools"];

function getLevelLabel(level: number): string {
  const labels = ["", "Beginner", "Elementary", "Intermediate", "Advanced", "Expert"];
  return labels[level] || "";
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  // Spotlight follows the cursor inside each card
  const handleSpotlight = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 sm:py-32 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">Skills & Technologies</h2>
          <div className="mt-4 w-16 h-1 bg-primary mx-auto rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            A curated collection of technologies I work with to build modern, scalable applications.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as Category | "All")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.8, y: 20 }
                }
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  y: -12,
                  transition: { duration: 0.18, ease: "easeIn" },
                }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 24,
                  delay: isInView ? Math.min(i * 0.045, 0.6) : 0,
                }}
                whileHover={{ y: -6, scale: 1.03 }}
                onMouseMove={handleSpotlight}
                style={techVars(skill.name) as CSSProperties}
                className="skill-card group relative flex flex-col items-center p-4 pt-5 rounded-2xl border border-border bg-card cursor-default"
              >
                {/* Brand-colored icon chip */}
                <div className="tech-chip mb-3.5 h-12 w-12 rounded-2xl text-muted-foreground/80">
                  <TechIcon name={skill.name} className="tech-icon h-7 w-7" />
                </div>

                <div className="text-sm font-semibold text-center leading-tight">
                  {skill.name}
                </div>

                <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mt-1.5">
                  {getLevelLabel(skill.level)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
