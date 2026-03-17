"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Sparkles, TrendingUp, Zap, Globe } from "lucide-react";
import { Coffee, Hammer, Barbell, Scissors, Storefront, Buildings, Bed, Sparkle, Stethoscope, GraduationCap, Car, PaintBrush, Briefcase, Wrench, ChartLineUp } from "@phosphor-icons/react";

const industries = [
  { id: "cafe", icon: Coffee, title: "Cafés & Restaurants", shortDesc: "Mehr Gäste durch klare Präsentation", benefits: ["Online-Reservierung", "Digitale Speisekarte"], color: "#f59e0b", stat: "+47%", href: "/branchen/cafes-restaurants" },
  { id: "handwerk", icon: Hammer, title: "Handwerk & Gewerbe", shortDesc: "Vertrauen durch Professionalität", benefits: ["Leistungsübersicht", "Referenzen"], color: "#8b5cf6", stat: "24/7", href: "/branchen/handwerk-gewerbe" },
  { id: "fitness", icon: Barbell, title: "Fitness & Wellness", shortDesc: "Mehr Mitglieder durch starke Präsenz", benefits: ["Kursplan", "Online-Anmeldung"], color: "#10b981", stat: "+62%", href: "/branchen/fitness-wellness" },
  { id: "beauty", icon: Scissors, title: "Beauty & Kosmetik", shortDesc: "Eleganz, die überzeugt", benefits: ["Online-Termine", "Preisliste"], color: "#f43f5e", stat: "-40%", href: "/branchen/beauty-kosmetik" },
  { id: "retail", icon: Storefront, title: "Einzelhandel", shortDesc: "Ihr Geschäft digital erlebbar", benefits: ["Produkt-Showcase", "Standorte"], color: "#3b82f6", stat: "+85%", href: "/branchen/einzelhandel" },
  { id: "business", icon: Buildings, title: "Dienstleister", shortDesc: "Kompetenz, die sichtbar ist", benefits: ["Service-Übersicht", "Case Studies"], color: "#06b6d4", stat: "3x", href: "/branchen/dienstleister" },
  { id: "hotel", icon: Bed, title: "Hotels & Unterkünfte", shortDesc: "Buchungen rund um die Uhr", benefits: ["Zimmer-Übersicht", "Buchungsanfrage"], color: "#ec4899", stat: "+120%", href: "/branchen/hotels-unterkuenfte" },
  { id: "health", icon: Stethoscope, title: "Gesundheit & Praxen", shortDesc: "Vertrauen auf den ersten Klick", benefits: ["Online-Terminbuchung", "Leistungskatalog"], color: "#ef4444", stat: "-55%", href: "/branchen/gesundheit-praxen" },
  { id: "education", icon: GraduationCap, title: "Bildung & Coaching", shortDesc: "Wissen, das beeindruckt", benefits: ["Kurskalender", "Buchungssystem"], color: "#f97316", stat: "+200%", href: "/branchen/bildung-coaching" },
  { id: "auto", icon: Car, title: "Automobil & Service", shortDesc: "Ihr Autohaus digital", benefits: ["Fahrzeug-Showcase", "Werkstatt-Termine"], color: "#6366f1", stat: "+78%", href: "/branchen/automobil-service" },
  { id: "creative", icon: PaintBrush, title: "Kreative & Künstler", shortDesc: "Aufmerksamkeit verdienen", benefits: ["Portfolio", "Buchungsanfragen"], color: "#a855f7", stat: "5x", href: "/branchen/kreative-kuenstler" },
  { id: "other", icon: Sparkle, title: "Weitere Branchen", shortDesc: "Maßgeschneidert für Sie", benefits: ["Individuell", "Flexibel"], color: "#2997ff", stat: "100%", href: "/kontakt" },
];

const processSteps = [
  { step: "01", title: "Analyse", subtitle: "Wir verstehen Ihr Business", desc: "Wir lernen Ihre Branche, Zielgruppe und Ziele kennen.", icon: ChartLineUp, color: "#2997ff" },
  { step: "02", title: "Konzept", subtitle: "Maßgeschneiderte Strategie", desc: "Wir entwickeln ein individuelles Konzept für Sie.", icon: Briefcase, color: "#5856d6" },
  { step: "03", title: "Design", subtitle: "Visuell beeindruckend", desc: "Modernes, Conversion-optimiertes Design.", icon: PaintBrush, color: "#a855f7" },
  { step: "04", title: "Launch", subtitle: "Ihre Website geht live", desc: "Schnell, sicher und SEO-optimiert.", icon: Wrench, color: "#10b981" },
];

export default function IndustriesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<typeof industries[0] | null>(null);

  return (
    <div className="min-h-screen bg-[#08090d] text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(41,151,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(41,151,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      
      <section className="relative px-4 pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm text-white/50 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />Zurück zur Startseite
            </Link>
          </motion.div>

          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-block mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#2997ff]">Branchenlösungen</motion.span>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Websites für{" "}
            <span className="bg-gradient-to-r from-[#2997ff] to-[#5856d6] bg-clip-text text-transparent">jede Branche</span>
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Ob Café, Handwerksbetrieb oder Fitnessstudio – wir erstellen maßgeschneiderte Websites.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#2997ff]/25 hover:shadow-[#2997ff]/40 transition-all hover:scale-[1.02]">
              Kostenloses Erstgespräch<ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 py-8 border-y border-white/5">
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ value: "500+", label: "Zufriedene Kunden" }, { value: "98%", label: "Weiterempfehlung" }, { value: "<2s", label: "Ladezeit" }, { value: "24/7", label: "Support" }].map((badge, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#2997ff] to-[#5856d6] bg-clip-text text-transparent">{badge.value}</div>
              <div className="text-sm text-white/50">{badge.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Für Ihre Branche</h2>
            <p className="text-white/60 max-w-xl mx-auto">Von A wie Autohaus bis Z wie Zahnarzt – wir kennen Ihre Branche.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <motion.div key={industry.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                  <Link href={industry.href} className="group relative block cursor-pointer">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 h-full transition-all duration-500 hover:border-[#2997ff]/30 hover:bg-white/[0.04] hover:scale-[1.02]">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#2997ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                            style={{ backgroundColor: `${industry.color}15`, border: `1px solid ${industry.color}40` }}>
                            <Icon className="h-6 w-6" weight="duotone" color={industry.color} />
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: `${industry.color}15`, color: industry.color }}>{industry.stat}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#2997ff] transition-colors duration-300">{industry.title}</h3>
                        <p className="text-sm text-white/50 mb-4">{industry.shortDesc}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {industry.benefits.map((benefit) => (
                            <span key={benefit} className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: `${industry.color}10`, color: `${industry.color}cc` }}>{benefit}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(41,151,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(41,151,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#2997ff]">Unser Prozess</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">So arbeiten wir für <span className="text-[#2997ff]">Sie</span></h2>
            <p className="text-white/60 max-w-xl mx-auto">Egal welche Branche – unser bewährter Prozess sorgt für Ihren Erfolg</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }} className="group relative">
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-6 h-full hover:border-[#2997ff]/30 transition-all duration-500">
                    <div className="absolute -top-4 -right-4 text-8xl font-bold opacity-5" style={{ color: step.color }}>{step.step}</div>
                    <div className="relative z-10">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                        <Icon className="h-6 w-6" weight="duotone" color={step.color} />
                      </div>
                      <div className="mb-1 text-sm font-bold" style={{ color: step.color }}>{step.step}</div>
                      <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-[#2997ff] mb-3">{step.subtitle}</p>
                      <p className="text-sm text-white/50">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-4">
            {[{ icon: Zap, title: "Blitzschnell", desc: "Ladezeit unter 2s", color: "#f59e0b" }, { icon: Globe, title: "SEO-Optimiert", desc: "Besser gefunden", color: "#10b981" }, { icon: Sparkles, title: "Modern", desc: "Aktuelles Design", color: "#8b5cf6" }, { icon: TrendingUp, title: "Conversion", desc: "Mehr Anfragen", color: "#2997ff" }].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center hover:border-white/20 transition-all duration-300 hover:scale-[1.02]">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${feature.color}15`, border: `1px solid ${feature.color}30` }}>
                    <Icon className="h-7 w-7" color={feature.color} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/50">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#2997ff]/10 via-transparent to-[#5856d6]/10 p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bereit für Ihre neue Website?</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Lassen Sie uns in einem kostenlosen Gespräch besprechen, wie wir Ihre Branche digital erfolgreich machen können.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-8 py-4 text-base font-semibold text-white hover:shadow-lg hover:shadow-[#2997ff]/25 transition-all hover:scale-[1.02]"
              >
                Termin vereinbaren
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white hover:bg-white/5 transition-all"
              >
                Preise ansehen
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedIndustry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndustry(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0d0d0f] p-8"
            >
              <button
                onClick={() => setSelectedIndustry(null)}
                className="absolute right-4 top-4 p-2 text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div 
                className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ 
                  backgroundColor: `${selectedIndustry.color}15`,
                  border: `1px solid ${selectedIndustry.color}30`
                }}
              >
                <selectedIndustry.icon 
                  className="h-8 w-8" 
                  weight="duotone"
                  color={selectedIndustry.color}
                />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">{selectedIndustry.title}</h3>
              <p className="text-white/70 mb-6 leading-relaxed">{selectedIndustry.shortDesc}</p>

              <div className="mb-8">
                <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Vorteile</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIndustry.benefits.map((benefit) => (
                    <span
                      key={benefit}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{ 
                        backgroundColor: `${selectedIndustry.color}15`,
                        color: selectedIndustry.color
                      }}
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/kontakt"
                onClick={() => setSelectedIndustry(null)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-6 py-3 text-base font-semibold text-white hover:shadow-lg hover:shadow-[#2997ff]/25 transition-all"
              >
                Jetzt anfragen
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
