"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Code, Globe } from "lucide-react";

const services = [
  { icon: Sparkles, title: "Design", desc: "Modern & einzigartig" },
  { icon: Code, title: "Code", desc: "Schnell & sauber" },
  { icon: Globe, title: "Hosting", desc: "Weltweit schnell" },
];

export default function Services() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

  return (
    <section ref={ref} id="services" className="relative overflow-hidden px-4 py-24 sm:px-6">
      <motion.div style={{ y, opacity }} className="mx-auto max-w-4xl">
        <motion.div style={{ scale }} className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-block rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-sm text-[#2997ff]"
          >
            Leistungen
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-white md:text-4xl"
          >
            Alles aus einer Hand
          </motion.h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.2 + i * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400 },
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2997ff]/0 to-[#5856d6]/0 transition-all duration-500 group-hover:from-[#2997ff]/10 group-hover:to-[#5856d6]/10" />

              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="relative mb-4"
              >
                <s.icon className="h-10 w-10 text-[#2997ff]" />
              </motion.div>
              <h3 className="relative text-lg font-semibold text-white">{s.title}</h3>
              <p className="relative mt-1 text-white/50">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
