"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";

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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          {filteredSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.05 * i }}
              className="group relative p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-default"
            >
              <div className="text-sm font-medium text-center">{skill.name}</div>
              {/* Level dots */}
              <div className="flex justify-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      idx < skill.level
                        ? "bg-primary"
                        : "bg-muted-foreground/20"
                    }`}
                  />
                ))}
              </div>
              {/* Tooltip on hover */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <Badge variant="secondary" className="text-xs whitespace-nowrap">
                  {getLevelLabel(skill.level)}
                </Badge>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
