"use client";

import { motion } from "framer-motion";
import { Box, Layers3, Sparkles } from "lucide-react";

const services = [
  {
    title: "Web Design",
    description:
      "Einzigartige Designs, die Ihre Marke perfekt repräsentieren. Modern, responsiv und konversionsoptimiert.",
    icon: Sparkles,
  },
  {
    title: "Development",
    description:
      "Blitzschnelle Websites mit modernster Technologie. Astro, React, Next.js – alles was Ihr Projekt braucht.",
    icon: Box,
  },
  {
    title: "Cloud Hosting",
    description:
      "Schneller als Vercel. Cloudflare Pages mit globalem CDN, D1 Datenbanken und R2 Storage.",
    icon: Layers3,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#2997ff]">
            Services
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl lg:text-5xl">
            Alles aus einer Hand
          </h2>
          <p className="mt-4 text-white/60">
            Von der Idee bis zum Launch begleiten wir Sie durch den gesamten Prozess.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -6,
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2997ff]/10 via-transparent to-[#5856d6]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.08] text-[#8cc8ff]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mb-3 text-xl font-medium tracking-[-0.02em] text-white">
                    {service.title}
                  </h3>

                  <p className="text-sm leading-6 text-white/60">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
