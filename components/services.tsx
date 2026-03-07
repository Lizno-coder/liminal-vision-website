"use client";

import { motion } from "framer-motion";
import { Monitor, Code2, Sparkles, Cloud } from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Web Design",
    description: "Einzigartige Designs, die Ihre Marke perfekt repräsentieren. Modern, responsiv und konversionsoptimiert.",
    features: ["Responsive Design", "UI/UX Optimierung", "Brand Identity"],
  },
  {
    icon: Code2,
    title: "Development",
    description: "Blitzschnelle Websites mit modernster Technologie. Astro, React, Next.js – alles was Ihr Projekt braucht.",
    features: ["Astro / Next.js", "TypeScript", "Performance 95+"],
  },
  {
    icon: Sparkles,
    title: "Animation & 3D",
    description: "Atemberaubende Animationen und 3D-Effekte, die beeindrucken. GSAP, Three.js, WebGL.",
    features: ["GSAP Animationen", "3D Elemente", "Micro-Interactions"],
  },
  {
    icon: Cloud,
    title: "Cloud Hosting",
    description: "Schneller als Vercel. Cloudflare Pages mit globalem CDN, D1 Datenbanken und R2 Storage.",
    features: ["Cloudflare Pages", "D1 Datenbanken", "Global CDN"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="heading-2 mb-4">
            Unsere <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Alles aus einer Hand. Von der ersten Idee bis zum Live-Gang.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative p-8 rounded-3xl glass card-hover"
            >
              {/* Gradient Border on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={28} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                      <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
