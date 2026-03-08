"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { nr: "01", title: "Kontakt", desc: "Sie schreiben uns" },
  { nr: "02", title: "Demo", desc: "Wir zeigen Design" },
  { nr: "03", title: "Deal", desc: "Sie sagen ja" },
  { nr: "04", title: "Live", desc: "Website online" },
];

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineProgress = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  return (
    <section ref={ref} id="process" className="relative overflow-hidden px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-sm text-[#2997ff]">
            Ablauf
          </span>
          <h2 className="text-3xl font-bold text-white md:text-4xl">So funktioniert's</h2>
        </motion.div>

        {/* Progress line */}
        <div className="relative">
          <motion.div
            style={{ scaleX: lineProgress }}
            className="absolute left-0 right-0 top-8 hidden h-0.5 origin-left bg-gradient-to-r from-[#2997ff] to-[#5856d6] md:block"
          />

          <div className="grid gap-8 md:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.nr}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2 + i * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2997ff]/20 to-[#5856d6]/20 backdrop-blur-sm"
                >
                  <span className="bg-gradient-to-r from-[#2997ff] to-[#5856d6] bg-clip-text text-xl font-bold text-transparent">
                    {step.nr}
                  </span>
                </motion.div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-1 text-sm text-white/50">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
