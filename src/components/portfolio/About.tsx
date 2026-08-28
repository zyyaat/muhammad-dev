"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Coffee, Globe, Zap } from "lucide-react";
import Image from "next/image";

const stats = [
  { label: "Years Experience", value: "3+", icon: Code2 },
  { label: "Projects Completed", value: "25+", icon: Zap },
  { label: "Technologies", value: "15+", icon: Coffee },
  { label: "Countries Reached", value: "Global", icon: Globe },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 sm:py-32 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">About Me</h2>
          <div className="mt-4 w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* B&W Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Decorative ring */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Photo circle */}
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden border-2 border-border">
                <Image
                  src="/profile-bw.webp"
                  alt="Developer portrait"
                  fill
                  className="object-cover object-top"
                  sizes="240px"
                />
              </div>
              {/* Accent dot */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary border-4 border-background" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            <p className="text-muted-foreground leading-relaxed text-base">
              I am a passionate full-stack developer with a deep love for building
              modern, scalable web applications. My journey in software development
              started with curiosity and has evolved into a career dedicated to
              creating impactful digital solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              I specialize in the JavaScript/TypeScript ecosystem, with expertise in
              frameworks like React, Next.js, and Node.js. I believe in writing
              clean, maintainable code and following best practices that ensure
              long-term project success. Every project I take on is an opportunity
              to learn something new and push the boundaries of what is possible on
              the web.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              When I am not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge through
              technical writing and community engagement.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group text-center"
            >
              <stat.icon className="h-5 w-5 text-primary mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}