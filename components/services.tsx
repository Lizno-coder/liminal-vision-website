"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Coffee,
  Dumbbell,
  Flower2,
  Hammer,
} from "lucide-react";

const useCases = [
  {
    icon: Coffee,
    title: "Cafés & Gastronomie",
    desc: "Warm, einladend und auf Reservierungen, Karte und Events ausgerichtet.",
    accent: "from-amber-400/20 to-orange-500/20",
    iconColor: "text-amber-300",
  },
  {
    icon: Dumbbell,
    title: "Fitness & Studios",
    desc: "Klar, energiegeladen und optimiert für Probetrainings und Kursinfos.",
    accent: "from-emerald-400/20 to-green-500/20",
    iconColor: "text-emerald-300",
  },
  {
    icon: Hammer,
    title: "Handwerk",
    desc: "Ruhig, vertrauensvoll und sauber strukturiert für Leistungen und Anfragen.",
    accent: "from-violet-400/20 to-purple-500/20",
    iconColor: "text-violet-300",
  },
  {
    icon: Flower2,
    title: "Beauty & Kosmetik",
    desc: "Elegant, leicht und hochwertig für Treatments, Termine und Premium-Auftritt.",
    accent: "from-rose-400/20 to-pink-500/20",
    iconColor: "text-rose-300",
  },
];

export default function Services() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.75]);

  return (
    <section ref={ref} id="anwendungsbereiche" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <motion.div style={{ y, opacity }} className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-sm text-[#2997ff]"
          >
            Anwendungsbereiche
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl lg:text-5xl"
          >
            Mini-Websites, die je nach Branche anders wirken.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="mt-5 max-w-2xl text-base leading-7 text-white/60"
          >
            Nicht jede Branche braucht das gleiche Layout. Deshalb gestalten wir
            Mini-Websites passend zum jeweiligen Einsatzbereich – minimalistisch,
            aufgeräumt und trotzdem mit eigenem Charakter.
          </motion.p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {useCases.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 + index * 0.08, duration: 0.55 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-60`} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />

              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                  <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>

                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="mt-10"
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/10"
          >
            Anwendungsbereiche ansehen
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
