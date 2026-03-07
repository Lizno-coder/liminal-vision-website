"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "TechStart GmbH",
    category: "Corporate Website",
    description: "Moderne Unternehmenswebsite mit animierten Elementen",
    tags: ["Astro", "GSAP", "CMS"],
    gradient: "from-blue-900/50 to-purple-900/50",
  },
  {
    title: "CraftBrew Bar",
    category: "Local Business",
    description: "Stylische Präsenz für eine Craft-Beer Bar",
    tags: ["Next.js", "Animations", "Booking"],
    gradient: "from-amber-900/50 to-orange-900/50",
  },
  {
    title: "DesignLab Agency",
    category: "Portfolio",
    description: "Kreative Agentur-Website mit 3D-Elementen",
    tags: ["Three.js", "React", "WebGL"],
    gradient: "from-purple-900/50 to-pink-900/50",
  },
  {
    title: "GreenSpace",
    category: "E-Commerce",
    description: "Online-Shop für nachhaltige Produkte",
    tags: ["Shopify", "Custom Theme", "Stripe"],
    gradient: "from-green-900/50 to-emerald-900/50",
  },
];

const stats = [
  { value: "50+", label: "Projekte" },
  { value: "100%", label: "Zufriedenheit" },
  { value: "95+", label: "Lighthouse Score" },
  { value: "24h", label: "Support" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="section">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <h2 className="heading-2 mb-4">
              Ausgewählte <span className="gradient-text">Arbeiten</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl">
              Jedes Projekt ist einzigartig. Hier ein Auszug unserer Arbeit.
            </p>
          </div>
          <Link href="/kontakt" className="btn btn-secondary">
            Eigenes Projekt starten
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-700 group-hover:scale-105`} />
              
              {/* Number Badge */}
              <div className="absolute top-6 left-6 w-10 h-10 rounded-full glass flex items-center justify-center">
                <span className="text-sm font-semibold text-white">0{index + 1}</span>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-blue-400 text-sm font-medium mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {project.category}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs rounded-full glass text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                <ArrowUpRight size={20} className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
