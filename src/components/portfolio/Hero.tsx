"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Full-screen B&W Photo Background */}
      <div className="absolute inset-0 -z-0">
        {/* The photo as background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/profile-bw.webp')" }}
        />
        {/* Multi-layer dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        {/* Subtle primary color tint at edges */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-sm text-white/80">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Available for new opportunities
          </span>
        </motion.div>

        {/* Name - MUHAMMAD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.9]">
            <span className="text-white">MUHAMMAD</span>
          </h1>
        </motion.div>

        {/* Title line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-4 flex items-center justify-center gap-4"
        >
          <div className="h-px w-8 sm:w-12 bg-primary/60" />
          <p className="text-primary text-sm sm:text-base font-medium tracking-[0.25em] uppercase">
            Full-Stack Developer
          </p>
          <div className="h-px w-8 sm:w-12 bg-primary/60" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-6 text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting clean, scalable, and user-centric digital experiences.
          I turn complex problems into elegant solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="gap-2 px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View My Work
            <ArrowDown className="h-4 w-4" />
          </Button>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-8 h-11 rounded-md text-sm font-medium border border-white/20 text-white bg-transparent hover:bg-white/10 transition-colors"
          >
            Get In Touch
            <Mail className="h-4 w-4" />
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          {[
            { icon: Github, label: "GitHub", href: "#" },
            { icon: Linkedin, label: "LinkedIn", href: "#" },
            { icon: Mail, label: "Email", href: "#" },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="p-3 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-primary/40 transition-all duration-300 hover:scale-110"
            >
              <Icon className="h-5 w-5 text-white/70" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
