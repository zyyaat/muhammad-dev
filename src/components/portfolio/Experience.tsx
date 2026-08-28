"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: "Senior Frontend Developer",
    company: "Tech Company",
    period: "2024 - Present",
    description:
      "Leading the frontend architecture and development of a SaaS platform serving thousands of enterprise clients.",
    achievements: [
      "Redesigned the core application UI, improving user engagement by 40%",
      "Implemented micro-frontend architecture reducing build times by 60%",
      "Mentored a team of 4 junior developers on React best practices",
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    role: "Full-Stack Developer",
    company: "Digital Agency",
    period: "2022 - 2024",
    description:
      "Built and maintained multiple client-facing web applications, from e-commerce platforms to content management systems.",
    achievements: [
      "Delivered 10+ production projects on time and within budget",
      "Built a reusable component library adopted across all agency projects",
      "Integrated third-party APIs including Stripe, Twilio, and AWS services",
    ],
    techStack: ["Node.js", "React", "PostgreSQL", "AWS"],
  },
  {
    role: "Junior Developer",
    company: "Startup Inc.",
    period: "2021 - 2022",
    description:
      "Started my professional career building features for an early-stage startup in the fintech space.",
    achievements: [
      "Developed key features for the payment processing module",
      "Wrote comprehensive unit and integration tests achieving 90% coverage",
      "Participated in daily standups and agile sprint planning",
    ],
    techStack: ["JavaScript", "Vue.js", "Express", "MongoDB"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 sm:py-32 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">Experience</h2>
          <div className="mt-4 w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-12 mb-12 last:mb-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1.5 mt-1.5 ring-4 ring-background" />

                {/* Spacer for desktop layout */}
                <div className="hidden md:block md:w-1/2" />

                {/* Content card */}
                <div
                  className={`ml-10 md:ml-0 md:w-1/2 ${
                    !isLeft ? "md:pl-0 md:pr-12" : "md:pr-0 md:pl-12"
                  }`}
                >
                  <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                    <span className="text-sm text-primary font-medium">
                      {exp.period}
                    </span>
                    <h3 className="text-lg font-semibold mt-1">{exp.role}</h3>
                    <p className="text-muted-foreground text-sm">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                      {exp.description}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {exp.achievements.map((a) => (
                        <li
                          key={a}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {exp.techStack.map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="text-xs font-normal"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
