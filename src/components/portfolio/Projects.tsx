"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

type ProjectCategory = "All" | "Web App" | "API" | "Mobile" | "Open Source";

interface Project {
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with real-time inventory management, Stripe payment integration, and an admin dashboard for order tracking and analytics.",
    category: "Web App",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe", "PostgreSQL"],
    image: "/projects/ecommerce.jpg",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Task Management API",
    description:
      "A RESTful API for task management with JWT authentication, role-based access control, and real-time WebSocket notifications for team collaboration.",
    category: "API",
    tags: ["Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    image: "/projects/api.jpg",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "AI Chat Interface",
    description:
      "An elegant AI chat application with streaming responses, conversation history, and markdown rendering. Built with a focus on performance and UX.",
    category: "Web App",
    tags: ["React", "OpenAI", "Tailwind CSS", "Vercel AI SDK"],
    image: "/projects/aichat.jpg",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Portfolio CMS",
    description:
      "A headless CMS designed for developer portfolios, featuring a rich text editor, image optimization, and automatic deployment to Vercel via webhooks.",
    category: "Web App",
    tags: ["Next.js", "MDX", "Prisma", "Vercel"],
    image: "/projects/cms.jpg",
    githubUrl: "#",
  },
  {
    title: "CLI Tool Generator",
    description:
      "An open-source CLI tool that scaffolds project templates with customizable configurations, supporting multiple frameworks and build tools.",
    category: "Open Source",
    tags: ["TypeScript", "Commander.js", "Inquirer"],
    image: "/projects/cli.jpg",
    githubUrl: "#",
  },
  {
    title: "Fitness Tracker App",
    description:
      "A cross-platform mobile application for tracking workouts, nutrition, and health metrics with data visualization charts and goal setting.",
    category: "Mobile",
    tags: ["React Native", "Expo", "Firebase", "Chart.js"],
    image: "/projects/fitness.jpg",
    liveUrl: "#",
    githubUrl: "#",
  },
];

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
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
            building great software.
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
              key={project.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="group relative flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
            >
              {/* Project Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-bold text-primary/20">
                    {project.title.charAt(0)}
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                      aria-label="Live demo"
                    >
                      <ExternalLink className="h-5 w-5 text-white" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                      aria-label="GitHub repo"
                    >
                      <Github className="h-5 w-5 text-white" />
                    </a>
                  )}
                </div>
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      Featured
                    </Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
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
                      className="text-xs font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
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
              window.open("https://github.com", "_blank")
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
