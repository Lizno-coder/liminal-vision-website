'use client';

import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.12,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center px-6 pt-24 md:px-10 lg:px-16">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-xl"
          >
            Premium digital experiences for visionary brands
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-[8rem]"
          >
            <span className="block text-white/95">Liminal</span>
            <span className="block bg-gradient-to-r from-[#2997ff] via-[#7ab8ff] to-[#5856d6] bg-clip-text text-transparent">
              Vision
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="mt-8 max-w-2xl text-lg leading-8 text-white/65 md:text-xl"
          >
            Wir erstellen einzigartige Websites für Unternehmen, die sich von der Masse abheben wollen.
            Kostenlose Demo vor dem Deal.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-7 py-4 text-sm font-medium text-white shadow-[0_0_35px_rgba(41,151,255,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_55px_rgba(88,86,214,0.4)]"
            >
              Demo anfordern
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-medium text-white/85 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/8"
            >
              Portfolio ansehen
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden h-[520px] lg:block"
        >
          <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl" />
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] bg-gradient-to-br from-[#2997ff]/20 to-[#5856d6]/20 blur-3xl" />

          <motion.div
            animate={{
              y: [0, -14, 0],
              rotate: [0, 6, -4, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative h-full w-full rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/10 to-white/5 shadow-[0_0_60px_rgba(41,151,255,0.18)] backdrop-blur-2xl">
              <div className="absolute inset-6 rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(41,151,255,0.35),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(88,86,214,0.25),transparent_40%),rgba(255,255,255,0.04)]" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#services"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/60 backdrop-blur-xl"
      >
        Scroll
        <ChevronDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}
