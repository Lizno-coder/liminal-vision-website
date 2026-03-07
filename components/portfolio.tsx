'use client';

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const items = [
  {
    title: "TechStart GmbH",
    category: "Corporate Website",
    tags: ["Astro", "GSAP", "CMS"],
    color: "from-blue-900/50 to-purple-900/50",
  },
  {
    title: "CraftBrew Bar",
    category: "Local Business",
    tags: ["Next.js", "Animations", "Booking"],
    color: "from-amber-900/50 to-orange-900/50",
  },
  {
    title: "DesignLab Agency",
    category: "Portfolio",
    tags: ["Three.js", "React", "WebGL"],
    color: "from-purple-900/50 to-pink-900/50",
  },
  {
    title: "GreenSpace",
    category: "E-Commerce",
    tags: ["Shopify", "Custom Theme", "Stripe"],
    color: "from-green-900/50 to-emerald-900/50",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative px-6 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#2997ff]">
            Portfolio
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Ausgewählte Arbeiten
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
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
              whileHover={{
                y: -6,
                rotateX: -4,
                rotateY: index % 2 === 0 ? 4 : -4,
                transition: { type: "spring", stiffness: 200, damping: 20 },
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl"
            >
              <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${item.color}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur-xl"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-end justify-between gap-6 p-6">
                <div>
                  <p className="mb-2 text-sm uppercase tracking-[0.2em] text-white/45">
                    {item.category}
                  </p>
                  <h3 className="text-2xl font-medium tracking-[-0.03em]">
                    {item.title}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white/80 transition-colors duration-300 group-hover:text-[#8cc8ff]">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
