"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

const steps = [
  { nr: "01", title: "Kontakt", desc: "Kurzes Briefing" },
  { nr: "02", title: "Demo", desc: "Design-Vorschlag" },
  { nr: "03", title: "Deal", desc: "Feinschliff & Freigabe" },
  { nr: "04", title: "Live", desc: "Go-live & Support" },
];

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.5,
  });

  const lineScale = useTransform(smoothProgress, [0.15, 0.7], [0, 1]);
  const glowOpacity = useTransform(smoothProgress, [0.1, 0.6], [0.15, 1]);

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 28 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          delay: 0.08 + i * 0.08,
          ease: [0.22, 1, 0.36, 1],
        },
      }),
    }),
    []
  );

  return (
    <section ref={ref} id="process" className="relative overflow-hidden px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-sm text-[#2997ff]">
            Ablauf
          </span>
          <h2 className="text-3xl font-bold text-white md:text-4xl">So funktioniert&apos;s</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/55">
            Ruhig, klar und smooth — egal wie schnell gescrollt wird.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            style={{ opacity: glowOpacity }}
            className="pointer-events-none absolute left-0 right-0 top-[2.15rem] hidden h-px bg-gradient-to-r from-transparent via-[#2997ff]/45 to-transparent md:block"
          />

          <motion.div
            style={{ scaleX: lineScale }}
            className="absolute left-8 right-8 top-[2.15rem] hidden h-px origin-left bg-gradient-to-r from-[#2997ff] via-[#5daeff] to-[#5856d6] md:block"
          />

          <div className="grid gap-4 md:grid-cols-4 md:gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.nr}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={cardVariants}
                className="relative"
              >
                <div className="group relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05] md:p-6">
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(41,151,255,0.16),transparent_58%)]" />

                  <div className="relative z-10 flex h-full flex-col gap-8">
                    <div className="flex items-center justify-between">
                      <div className="text-sm uppercase tracking-[0.22em] text-white/32">Step</div>
                      <div className="rounded-full border border-[#2997ff]/25 bg-[#2997ff]/8 px-3 py-1 text-xs font-medium text-[#2997ff]">
                        {step.nr}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                      <p className="max-w-[18ch] text-sm leading-6 text-white/56">{step.desc}</p>
                    </div>

                    <div className="mt-auto h-px w-full bg-gradient-to-r from-[#2997ff]/40 via-white/12 to-transparent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
