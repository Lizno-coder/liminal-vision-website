"use client";

import { motion } from "framer-motion";
import { Eye, Palette, Code, Rocket } from "lucide-react";

const steps = [
  {
    title: "Kostenlose Demo",
    description:
      "Sie erhalten eine maßgeschneiderte Demo-Website, bevor Sie sich entscheiden. Kein Risiko.",
    icon: Eye,
  },
  {
    title: "Planung & Design",
    description:
      "Wir analysieren Ihre Anforderungen und erstellen ein durchdachtes Konzept.",
    icon: Palette,
  },
  {
    title: "Entwicklung",
    description:
      "Clean Code, modernste Technologien, optimale Performance.",
    icon: Code,
  },
  {
    title: "Launch & Support",
    description:
      "Wir kümmern uns um Hosting, Domain und Go-Live.",
    icon: Rocket,
  },
];

export default function Process() {
  return (
    <section id="process" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#2997ff]">
            Prozess
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl lg:text-5xl">
            So arbeiten wir
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-[#2997ff]/40 via-white/10 to-[#5856d6]/30 md:left-6 lg:left-8" />

          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="grid gap-4 md:grid-cols-[60px_1fr] lg:grid-cols-[80px_1fr]"
                >
                  <div className="relative hidden md:flex justify-center">
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-[#8cc8ff] backdrop-blur-xl lg:h-12 lg:w-12">
                      <Icon className="h-4 w-4 lg:h-5 lg:w-5" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl md:p-6">
                    <div className="mb-2 flex items-center gap-3 md:hidden">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-[#8cc8ff]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs uppercase tracking-[0.22em] text-white/45">
                        0{index + 1}
                      </span>
                    </div>
                    
                    <div className="hidden mb-2 text-xs uppercase tracking-[0.22em] text-white/45 md:block">
                      0{index + 1}
                    </div>
                    
                    <h3 className="mb-2 text-lg font-medium tracking-[-0.02em] text-white md:text-xl">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-6 text-white/60">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
