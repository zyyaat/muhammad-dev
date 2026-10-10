"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowUpRight, ArrowRight } from "lucide-react";
import TechIcon from "./TechIcon";
import { caseStudies } from "@/lib/case-studies";
import type { ProjectCategory } from "@/lib/case-studies";

const projectCategories: ProjectCategory[] = [
  "All",
  "Web App",
  "API",
  "Mobile",
  "Open Source",
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("All");

  const filteredProjects =
    activeCategory === "All"
      ? caseStudies
      : caseStudies.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 sm:py-32 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">Featured Projects</h2>
          <div className="mt-4 w-16 h-1 bg-primary mx-auto rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            A selection of projects that showcase my skills and passion for
            building great software. Every card opens a full case study.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="group relative flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
            >
              {/* Cover */}
              <Link
                href={`/projects/${project.slug}`}
                className="relative block h-48 overflow-hidden"
                aria-label={`Open ${project.title} case study`}
              >
                <Image
                  src={project.cover}
                  alt={`${project.title} cover`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* readability gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent" />
                {/* Hover overlay with links */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-primary/80 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  {project.liveUrl && (
                    <span
                      role="button"
                      tabIndex={-1}
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(project.liveUrl, "_blank");
                      }}
                      className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:scale-110 transition-all"
                      aria-label="Live demo"
                    >
                      <ExternalLink className="h-5 w-5 text-white" />
                    </span>
                  )}
                  {project.githubUrl && (
                    <span
                      role="button"
                      tabIndex={-1}
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(project.githubUrl, "_blank");
                      }}
                      className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:scale-110 transition-all"
                      aria-label="GitHub repo"
                    >
                      <Github className="h-5 w-5 text-white" />
                    </span>
                  )}
                  <span className="px-4 py-2.5 rounded-full bg-white text-foreground text-sm font-semibold flex items-center gap-1.5 hover:scale-105 transition-transform">
                    Case study
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary text-primary-foreground text-xs shadow-lg">
                      Featured
                    </Badge>
                  </div>
                )}
              </Link>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center justify-between mb-2">
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="tech-badge text-xs font-normal gap-1.5 pl-2 hover:border-primary/30 transition-colors"
                    >
                      <span className="tech-badge-icon">
                        <TechIcon name={tag} className="h-3 w-3" />
                      </span>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                >
                  Read the case study
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={() =>
              window.open("https://github.com/zyyaat", "_blank")
            }
          >
            <Github className="h-4 w-4" />
            See More on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
