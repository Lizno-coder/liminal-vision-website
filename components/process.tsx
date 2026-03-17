"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChatTeardropText, Handshake, Rocket } from "@phosphor-icons/react";

const steps = [
  { 
    nr: "01", 
    title: "Kontakt", 
    desc: "Wir besprechen Ihre Wünsche",
    icon: ChatTeardropText,
    color: "#2997ff"
  },
  { 
    nr: "02", 
    title: "Deal", 
    desc: "Angebot & Auftragsstart",
    icon: Handshake,
    color: "#5856d6"
  },
  { 
    nr: "03", 
    title: "Launch", 
    desc: "Ihre Website geht live",
    icon: Rocket,
    color: "#00D4AA"
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="process" className="relative overflow-hidden py-20 md:py-32">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(41,151,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(41,151,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-center"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.3em] text-[#2997ff]"
          >
            So funktioniert&apos;s
          </motion.span>
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Drei Schritte zum Erfolg
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent md:block" />
          
          {/* Connection line - mobile */}
          <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:hidden" />

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={step.nr}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`relative md:flex md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Content card */}
                  <motion.div 
                    className={`relative ml-16 md:ml-0 md:w-5/12 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#2997ff]/30 hover:bg-white/[0.04]">
                      {/* Hover glow */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-[#2997ff]/5 to-transparent"
                        initial={{ opacity: 0, x: isEven ? 100 : -100 }}
                        animate={{ 
                          opacity: activeStep === index ? 1 : 0,
                          x: activeStep === index ? 0 : (isEven ? 100 : -100)
                        }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      <div className={`relative z-10 flex items-center gap-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        {/* Icon */}
                        <motion.div 
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                          animate={{ 
                            borderColor: activeStep === index ? step.color : 'rgba(255,255,255,0.1)',
                            backgroundColor: activeStep === index ? `${step.color}15` : 'rgba(255,255,255,0.05)'
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon 
                            className="h-6 w-6 transition-colors duration-300" 
                            weight="duotone"
                            color={activeStep === index ? step.color : 'rgba(255,255,255,0.5)'}
                          />
                        </motion.div>
                        
                        <div className={`flex-1 ${isEven ? 'md:text-right' : ''}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span 
                              className="text-xs font-bold uppercase tracking-wider"
                              style={{ color: step.color }}
                            >
                              {step.nr}
                            </span>
                            <h3 className="text-xl font-semibold text-white md:text-2xl">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-sm text-white/50 md:text-base">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Center dot */}
                  <div className="absolute left-8 top-1/2 z-10 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2">
                    <motion.div 
                      className="relative flex h-4 w-4 items-center justify-center"
                      animate={{ scale: activeStep === index ? 1.3 : 1 }}
                    >
                      {/* Outer ring */}
                      <motion.div 
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: step.color }}
                        animate={{ 
                          opacity: activeStep === index ? 0.3 : 0,
                          scale: activeStep === index ? 1.5 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      {/* Inner dot */}
                      <div 
                        className="h-3 w-3 rounded-full transition-colors duration-300"
                        style={{ 
                          backgroundColor: activeStep === index ? step.color : 'rgba(255,255,255,0.3)',
                          boxShadow: activeStep === index ? `0 0 20px ${step.color}` : 'none'
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
