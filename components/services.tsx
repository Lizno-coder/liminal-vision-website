'use client';

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
    <section id="services" className="relative px-6 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#2997ff]">
            Services
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Alles aus einer Hand
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
                  rotateX: -8,
                  rotateY: index % 2 === 0 ? 8 : -8,
                  y: -6,
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2997ff]/8 via-transparent to-[#5856d6]/8 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-[#8cc8ff] shadow-[0_0_30px_rgba(41,151,255,0.15)]"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <Icon className="h-7 w-7" />
                </motion.div>

                <h3
                  className="mb-4 text-2xl font-medium tracking-[-0.03em]"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {service.title}
                </h3>

                <p
                  className="text-base leading-7 text-white/65"
                  style={{ transform: "translateZ(20px)" }}
                >
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
