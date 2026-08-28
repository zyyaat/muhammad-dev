"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Heart } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:hello@example.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.button
            onClick={() =>
              document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-lg font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-primary">&lt;</span>
            Dev
            <span className="text-primary">/&gt;</span>
          </motion.button>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="h-3.5 w-3.5 text-primary fill-primary" /> {" "}
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
