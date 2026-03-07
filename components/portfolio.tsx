"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const items = [
  {
    title: "TechStart GmbH",
    category: "Corporate Website",
    tags: ["Astro", "GSAP", "CMS"],
    gradient: "from-blue-900/60 to-purple-900/60",
  },
  {
    title: "CraftBrew Bar",
    category: "Local Business",
    tags: ["Next.js", "Animations", "Booking"],
    gradient: "from-amber-900/60 to-orange-900/60",
  },
  {
    title: "DesignLab Agency",
    category: "Portfolio",
    tags: ["Three.js", "React", "WebGL"],
    gradient: "from-purple-900/60 to-pink-900/60",
  },
  {
    title: "GreenSpace",
    category: "E-Commerce",
    tags: ["Shopify", "Custom Theme", "Stripe"],
    gradient: "from-green-900/60 to-emerald-900/60",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#2997ff]">
            Portfolio
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl lg:text-5xl">
            Ausgewählte Arbeiten
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: index * 0.1,
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl"
            >
              <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${item.gradient}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-white/80 backdrop-blur-xl"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-end justify-between gap-4 p-5">
                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.18em] text-white/45">
                    {item.category}
                  </p>
                  <h3 className="text-lg font-medium tracking-[-0.02em] text-white md:text-xl">
                    {item.title}
                  </h3>
                </div>

                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-white/70 transition-colors duration-300 group-hover:text-[#8cc8ff]">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
