"use client";

import { motion } from "framer-motion";
import { Eye, Palette, Code, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Kostenlose Demo",
    description: "Sie erhalten eine maßgeschneiderte Demo-Website, bevor Sie sich entscheiden. Kein Risiko.",
    icon: Eye,
  },
  {
    number: "02",
    title: "Planung & Design",
    description: "Wir analysieren Ihre Anforderungen und erstellen ein durchdachtes Konzept.",
    icon: Palette,
  },
  {
    number: "03",
    title: "Entwicklung",
    description: "Clean Code, modernste Technologien, optimale Performance.",
    icon: Code,
  },
  {
    number: "04",
    title: "Launch & Support",
    description: "Wir kümmern uns um Hosting, Domain und Go-Live.",
    icon: Rocket,
  },
];

export function Process() {
  return (
    <section id="process" className="section relative overflow-hidden">
      {/* Background Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="heading-2 mb-4">
            Unser <span className="gradient-text">Prozess</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Transparent, effizient, ergebnisorientiert.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-blue-500/50 hidden md:block" />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Number Circle - Desktop */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full glass-strong items-center justify-center z-10">
                  <span className="text-xl font-bold text-blue-400">{step.number}</span>
                </div>

                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-20 md:text-right" : "md:pl-20"}`}>
                  {/* Mobile Number */}
                  <div className="md:hidden flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full glass-strong flex items-center justify-center">
                      <span className="text-lg font-bold text-blue-400">{step.number}</span>
                    </div>
                    <div className="text-blue-400">
                      <step.icon size={24} />
                    </div>
                  </div>

                  {/* Desktop Icon */}
                  <div className={`hidden md:flex mb-4 ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
                    <div className="text-blue-400">
                      <step.icon size={24} />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
