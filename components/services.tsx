"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Coffee, Dumbbell, Flower2, Hammer } from "lucide-react";

const useCases = [
  {
    title: "Gastronomie",
    subtitle: "Cafés, Restaurants, Bars",
    icon: Coffee,
    color: "#f6b94f",
    glow: "from-amber-400/20 to-orange-500/10",
    layout: (
      <div className="relative h-full overflow-hidden rounded-[1.4rem] sm:rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(55,35,21,0.95),rgba(29,18,12,0.98))] p-3 sm:p-4">
        <div className="rounded-[1rem] sm:rounded-[1.2rem] border border-white/10 bg-white/[0.05] p-3 sm:p-4">
          <div className="h-1.5 w-12 rounded-full bg-amber-200/70 sm:h-2 sm:w-16" />
          <div className="mt-3 h-9 w-3/4 rounded-xl bg-white/90 sm:mt-4 sm:h-12 sm:rounded-2xl" />
          <div className="mt-2 h-2.5 w-2/3 rounded-full bg-white/20 sm:mt-3 sm:h-3" />
          <div className="mt-2 h-2.5 w-1/2 rounded-full bg-white/10 sm:h-3" />
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:mt-3 sm:gap-3">
          <div className="h-16 rounded-[1rem] bg-white/[0.06] sm:h-20 sm:rounded-[1.2rem]" />
          <div className="h-16 rounded-[1rem] bg-amber-200/12 sm:h-20 sm:rounded-[1.2rem]" />
        </div>
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-4 top-5 h-12 w-12 rounded-full bg-amber-200/10 blur-xl sm:right-5 sm:top-6 sm:h-16 sm:w-16"
        />
      </div>
    ),
  },
  {
    title: "Fitness",
    subtitle: "Studios, Coaches, Gyms",
    icon: Dumbbell,
    color: "#4ade80",
    glow: "from-emerald-400/20 to-green-500/10",
    layout: (
      <div className="relative h-full overflow-hidden rounded-[1.4rem] sm:rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,22,14,0.98),rgba(7,14,11,0.98))] p-3 sm:p-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="h-1.5 w-10 rounded-full bg-emerald-200/80 sm:h-2 sm:w-14" />
            <div className="mt-3 h-8 w-24 rounded-xl bg-white/90 sm:mt-4 sm:h-10 sm:w-28 sm:rounded-2xl" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-8 w-8 rounded-xl bg-emerald-300/12 sm:h-10 sm:w-10 sm:rounded-2xl" />
            <div className="h-8 w-8 rounded-xl bg-white/[0.06] sm:h-10 sm:w-10 sm:rounded-2xl" />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-4">
          <div className="h-12 rounded-xl bg-white/[0.05] sm:h-16 sm:rounded-2xl" />
          <div className="h-12 rounded-xl bg-emerald-300/14 sm:h-16 sm:rounded-2xl" />
          <div className="h-12 rounded-xl bg-white/[0.05] sm:h-16 sm:rounded-2xl" />
        </div>
        <div className="mt-2.5 h-16 rounded-[1rem] bg-[linear-gradient(135deg,rgba(34,197,94,0.18),rgba(255,255,255,0.04))] sm:mt-3 sm:h-24 sm:rounded-[1.3rem]" />
      </div>
    ),
  },
  {
    title: "Handwerk",
    subtitle: "Betriebe, Services, Ausbau",
    icon: Hammer,
    color: "#b197fc",
    glow: "from-violet-400/20 to-purple-500/10",
    layout: (
      <div className="relative h-full overflow-hidden rounded-[1.4rem] sm:rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(19,18,27,0.98),rgba(16,15,24,0.98))] p-3 sm:p-4">
        <div className="grid grid-cols-[1.2fr_0.8fr] gap-2.5 sm:gap-3">
          <div className="h-20 rounded-[1rem] bg-[linear-gradient(135deg,rgba(177,151,252,0.18),rgba(255,255,255,0.04))] sm:h-28 sm:rounded-[1.3rem]" />
          <div className="space-y-2.5 sm:space-y-3">
            <div className="h-10 rounded-[0.9rem] bg-white/[0.05] sm:h-[3.4rem] sm:rounded-[1rem]" />
            <div className="h-10 rounded-[0.9rem] bg-white/[0.05] sm:h-[3.4rem] sm:rounded-[1rem]" />
          </div>
        </div>
        <div className="mt-2.5 space-y-2 sm:mt-3">
          <div className="h-2 w-20 rounded-full bg-violet-200/70 sm:h-4 sm:w-24" />
          <div className="h-10 rounded-xl bg-white/[0.05] sm:h-12 sm:rounded-2xl" />
          <div className="h-10 rounded-xl bg-white/[0.05] sm:h-12 sm:rounded-2xl" />
        </div>
      </div>
    ),
  },
  {
    title: "Beauty",
    subtitle: "Kosmetik, Brows, Studios",
    icon: Flower2,
    color: "#fb7185",
    glow: "from-rose-400/20 to-pink-500/10",
    layout: (
      <div className="relative h-full overflow-hidden rounded-[1.4rem] sm:rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(32,18,24,0.98),rgba(25,15,20,0.98))] p-3 sm:p-4">
        <div className="rounded-[1rem] sm:rounded-[1.3rem] bg-white/[0.06] p-3 sm:p-4">
          <div className="h-1.5 w-12 rounded-full bg-rose-200/80 sm:h-2 sm:w-16" />
          <div className="mt-3 h-8 w-2/3 rounded-xl bg-white/90 sm:mt-4 sm:h-10 sm:rounded-2xl" />
          <div className="mt-3 h-14 rounded-[1rem] bg-[linear-gradient(135deg,rgba(251,113,133,0.18),rgba(255,255,255,0.05))] sm:mt-3 sm:h-20 sm:rounded-[1.2rem]" />
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:mt-3 sm:gap-3">
          <div className="h-12 rounded-[0.9rem] bg-white/[0.05] sm:h-16 sm:rounded-[1.1rem]" />
          <div className="h-12 rounded-[0.9rem] bg-white/[0.05] sm:h-16 sm:rounded-[1.1rem]" />
        </div>
      </div>
    ),
  },
];

export default function Services() {
  return (
    <section id="anwendungsbereiche" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl sm:mb-12"
        >
          <span className="mb-4 inline-block rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-sm text-[#2997ff]">
            Anwendungsbereiche
          </span>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
            Für viele Branchen. <br className="hidden sm:block" /> <span className="text-[#2997ff]">Immer klar und modern.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          {useCases.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="group"
              >
                <div className="mb-2.5 flex items-center gap-2 px-1 sm:mb-3 sm:gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] sm:h-10 sm:w-10 sm:rounded-2xl"
                    style={{ boxShadow: `0 0 30px ${item.color}20` }}
                  >
                    <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="text-xs font-medium text-white sm:text-sm">{item.title}</h3>
                    <p className="text-[10px] text-white/42 sm:text-xs">{item.subtitle}</p>
                  </div>
                </div>

                <div className="relative h-[180px] sm:h-[260px]">
                  <div className={`absolute inset-0 rounded-[1.5rem] sm:rounded-[1.9rem] bg-gradient-to-b ${item.glow} opacity-80 blur-2xl`} />
                  <motion.div
                    animate={{ y: [0, -3, 0], rotateZ: [0, 0.15, 0] }}
                    transition={{ duration: 4 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative h-full"
                  >
                    {item.layout}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-8 sm:mt-10"
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/10"
          >
            Alle Anwendungsbereiche ansehen
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
