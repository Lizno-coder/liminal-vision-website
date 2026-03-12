"use client";

import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "framer-motion";
import { ArrowUpRight, Monitor, Sparkles, Zap } from "lucide-react";

const projects = [
  {
    name: "Café München",
    category: "Restaurant & Café",
    color: "from-amber-500/20 to-orange-500/20",
    icon: "☕",
  },
  {
    name: "Beauty Studio",
    category: "Beauty & Wellness", 
    color: "from-pink-500/20 to-rose-500/20",
    icon: "✨",
  },
  {
    name: "Handwerker Plus",
    category: "Handwerk & Service",
    color: "from-blue-500/20 to-cyan-500/20",
    icon: "🔧",
  },
];

export function WorkScrollSection() {
  return (
    <section id="work" className="relative overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="mb-8 px-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-block text-sm uppercase tracking-[0.2em] text-[#2997ff]"
            >
              Unsere Arbeit
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
            >
              Websites die
              <br />
              <span className="text-[#2997ff]">beeindrucken</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-2xl text-lg text-white/60"
            >
              Scrolle nach unten und sieh, wie wir aus Ideen digitale Erlebnisse machen
            </motion.p>
          </div>
        }
      >
        {/* Mockup Content */}
        <div className="relative h-full w-full bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] p-6 md:p-10">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(41,151,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(41,151,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Browser Chrome */}
          <div className="relative mb-6 flex items-center gap-2 rounded-t-xl border-b border-white/10 bg-white/5 p-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-4 flex-1 rounded-md bg-white/5 px-3 py-1 text-xs text-white/40">
              liminalo.com/demo
            </div>
          </div>

          {/* Mockup Grid */}
          <div className="relative grid gap-4 md:grid-cols-3 md:gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${project.color} p-6 transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-[#2997ff]/10`}
              >
                <div className="mb-4 text-4xl">{project.icon}</div>
                <h3 className="mb-1 text-lg font-semibold text-white">{project.name}</h3>
                <p className="text-sm text-white/60">{project.category}</p>
                
                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="h-5 w-5 text-white/80" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Stats */}
          <div className="relative mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 md:mt-8">
            <div className="text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-[#2997ff]">
                <Zap className="h-4 w-4" />
                <span className="text-2xl font-bold">50+</span>
              </div>
              <p className="text-xs text-white/50">Projekte</p>
            </div>
            <div className="text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-[#2997ff]">
                <Sparkles className="h-4 w-4" />
                <span className="text-2xl font-bold">100%</span>
              </div>
              <p className="text-xs text-white/50">Zufriedenheit</p>
            </div>
            <div className="text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-[#2997ff]">
                <Monitor className="h-4 w-4" />
                <span className="text-2xl font-bold">24h</span>
              </div>
              <p className="text-xs text-white/50">Support</p>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
