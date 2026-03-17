"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SpecialText } from "@/components/ui/special-text";

export default function Services() {
  return (
    <section id="anwendungsbereiche" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center sm:mb-12"
        >
          <span className="mb-4 inline-block rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-sm text-[#2997ff]">
            Branchen
          </span>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl lg:text-5xl">
            Für viele Branchen.{" "}
            <span className="text-[#2997ff]">
              <SpecialText inView once delay={0.3} className="text-[#2997ff]">
                Immer klar und modern.
              </SpecialText>
            </span>
          </h2>
        </motion.div>

        {/* Centered Image - No background box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-6xl px-2 sm:px-4"
        >
          {/* Desktop/Tablet: Original horizontal image */}
          <img
            src="/showcase-websites.png"
            alt="Liminalo Website Beispiele - Fitness, Café, Handwerk"
            className="hidden w-full object-contain md:block"
          />
          {/* Mobile: Optimized vertical image */}
          <img
            src="/images/IMG_0303.png"
            alt="Liminalo Website Beispiele - Mobile optimiert"
            className="mx-auto block w-full max-w-sm object-contain md:hidden"
          />
        </motion.div>

        {/* Centered Button */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex justify-center sm:mt-10"
        >
          <Link
            href="/branchen"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/10"
          >
            Weitere Branchen
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
