'use client';

import { motion } from "framer-motion";
import { Eye, Palette, Code, Rocket } from "lucide-react";

const steps = [
  {
    title: "Kostenlose Demo",
    description:
      "Sie erhalten eine maßgeschneiderte Demo-Website, bevor Sie sich entscheiden. Kein Risiko, keine Vorauszahlung.",
    icon: Eye,
  },
  {
    title: "Planung & Design",
    description:
      "Wir analysieren Ihre Anforderungen und erstellen ein durchdachtes Konzept. Wireframes, Design-Vorschläge, alles abgestimmt.",
    icon: Palette,
  },
  {
    title: "Entwicklung",
    description:
      "Clean Code, modernste Technologien, optimale Performance. Wir setzen Ihr Design pixelgenau um.",
    icon: Code,
  },
  {
    title: "Launch & Support",
    description:
      "Wir kümmern uns um Hosting, Domain und Go-Live. Und danach? Wir bleiben an Ihrer Seite.",
    icon: Rocket,
  },
];

export default function Process() {
  return (
    <section className="relative px-6 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#2997ff]">
            Prozess
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            So arbeiten wir
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-[#2997ff]/40 via-white/10 to-[#5856d6]/30 md:block" />

          <div className="space-y-12">
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
                  className="grid gap-6 md:grid-cols-[80px_1fr]"
                >
                  <div className="relative hidden md:flex justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                      className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/8 text-[#8cc8ff] backdrop-blur-xl"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                  </div>

                  <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
                    <div className="mb-3 text-sm uppercase tracking-[0.22em] text-white/45">
                      0{index + 1}
                    </div>
                    <h3 className="mb-4 text-2xl font-medium tracking-[-0.03em]">
                      {step.title}
                    </h3>
                    <p className="max-w-2xl text-white/65 leading-7">
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
