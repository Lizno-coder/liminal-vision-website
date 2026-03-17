"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, X } from "lucide-react";
import { 
  Coffee, 
  Hammer, 
  Barbell, 
  Scissors, 
  Storefront,
  Buildings,
  Bed,
  Sparkle
} from "@phosphor-icons/react";

// Branchen-Daten mit kundenorientierten Texten
const industries = [
  {
    id: "cafe",
    icon: Coffee,
    title: "Cafés & Restaurants",
    shortDesc: "Mehr Gäste durch klare Präsentation",
    description: "Ihre Speisekarte, Öffnungszeiten und Reservierungsmöglichkeiten – alles auf einen Blick. Perfekt für Gastronomen, die Kunden schnell informieren wollen.",
    benefits: ["Online-Reservierung", "Digitale Speisekarte", "Mobile Optimierung"],
    color: "#f59e0b",
  },
  {
    id: "handwerk",
    icon: Hammer,
    title: "Handwerk & Gewerbe",
    shortDesc: "Vertrauen durch Professionalität",
    description: "Von der Baufirma bis zum Tischler: Zeigen Sie Ihre Leistungen, Referenzen und Kontaktdaten professionell. Ihre Website arbeitet für Sie, auch außerhalb der Geschäftszeiten.",
    benefits: ["Leistungsübersicht", "Referenzen", "Direkt-Kontakt"],
    color: "#8b5cf6",
  },
  {
    id: "fitness",
    icon: Barbell,
    title: "Fitness & Wellness",
    shortDesc: "Mehr Mitglieder durch starke Präsenz",
    description: "Präsentieren Sie Ihre Kurse, Trainer und Mitgliedschaften überzeugend. Mit Online-Anmeldung und klarem Stundenplan gewinnen Sie neue Mitglieder rund um die Uhr.",
    benefits: ["Kursplan", "Online-Anmeldung", "Trainer-Vorstellung"],
    color: "#10b981",
  },
  {
    id: "beauty",
    icon: Scissors,
    title: "Beauty & Kosmetik",
    shortDesc: "Eleganz, die überzeugt",
    description: "Stilvoll Ihre Treatments, Preise und Verfügbarkeiten präsentieren. Mit integrierter Terminbuchung vereinfachen Sie den Alltag für Sie und Ihre Kundinnen.",
    benefits: ["Online-Termine", "Preisliste", "Treatment-Infos"],
    color: "#f43f5e",
  },
  {
    id: "retail",
    icon: Storefront,
    title: "Einzelhandel",
    shortDesc: "Ihr Geschäft digital erlebbar",
    description: "Von der Boutique bis zum Fachgeschäft: Präsentieren Sie Ihre Produkte, Öffnungszeiten und Standorte. Lassen Sie Kunden wissen, was Sie einzigartig macht.",
    benefits: ["Produkt-Showcase", "Standorte", "Angebote"],
    color: "#3b82f6",
  },
  {
    id: "business",
    icon: Buildings,
    title: "Dienstleister",
    shortDesc: "Kompetenz, die sichtbar ist",
    description: "Ob Beratung, Agentur oder Service: Ihre Expertise verdient eine Website, die Vertrauen schafft. Klar, professionell und auf Ihre Zielgruppe zugeschnitten.",
    benefits: ["Service-Übersicht", "Case Studies", "Kontaktformular"],
    color: "#06b6d4",
  },
  {
    id: "hotel",
    icon: Bed,
    title: "Hotels & Unterkünfte",
    shortDesc: "Buchungen rund um die Uhr",
    description: "Präsentieren Sie Ihre Zimmer, Preise und Ausstattung stilvoll. Mit direkter Buchungsanfrage füllen Sie Ihre Betten – auch während Sie schlafen.",
    benefits: ["Zimmer-Übersicht", "Buchungsanfrage", "Foto-Galerie"],
    color: "#ec4899",
  },
  {
    id: "other",
    icon: Sparkle,
    title: "Weitere Branchen",
    shortDesc: "Maßgeschneidert für Sie",
    description: "Jede Branche ist einzigartig. Wir analysieren Ihre Bedürfnisse und entwickeln eine Website, die perfekt zu Ihrem Business passt – egal ob Praxis, Schule oder Verein.",
    benefits: ["Individuelle Lösung", "Beratung", "Flexibel"],
    color: "#2997ff",
  },
];

export default function IndustriesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<typeof industries[0] | null>(null);

  return (
    <div className="min-h-screen bg-[#08090d] text-white">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(41,151,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(41,151,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 mb-8 text-sm text-white/50 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zur Startseite
            </Link>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#2997ff]"
          >
            Branchenlösungen
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            Websites für{" "}
            <span className="text-[#2997ff]">Ihre Branche</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
          >
            Ob Café, Handwerksbetrieb oder Fitnessstudio – wir erstellen maßgeschneiderte Websites, 
            die Ihre Kunden überzeugen und Ihr Business wachsen lassen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10"
          >
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-[#2997ff] px-8 py-4 text-base font-semibold text-white hover:bg-[#2997ff]/90 transition-all"
            >
              Kontakt
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="relative px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setSelectedIndustry(industry)}
                  className="group relative cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 h-full transition-all duration-300 hover:border-[#2997ff]/30 hover:bg-white/[0.04]">
                    {/* Hover glow */}
                    <div 
                      className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle at top right, ${industry.color}10, transparent 60%)`
                      }}
                    />
                    
                    <div className="relative z-10">
                      <div 
                        className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:scale-110"
                        style={{ 
                          borderColor: `${industry.color}30`,
                          backgroundColor: `${industry.color}10`
                        }}
                      >
                        <Icon 
                          className="h-6 w-6 transition-colors duration-300" 
                          weight="duotone"
                          color={industry.color}
                        />
                      </div>

                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#2997ff] transition-colors">
                        {industry.title}
                      </h3>
                      
                      <p className="text-sm text-white/50 mb-4">
                        {industry.shortDesc}
                      </p>

                      <div className="flex items-center gap-1 text-sm text-[#2997ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Mehr erfahren</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="relative px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              So arbeiten wir für Sie
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Egal welche Branche – unser Prozess ist immer auf Ihre Bedürfnisse angepasst
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Analyse",
                desc: "Wir verstehen Ihre Branche, Ihre Zielgruppe und Ihre konkreten Anforderungen."
              },
              {
                step: "02",
                title: "Konzept",
                desc: "Basierend auf Ihren Bedürfnissen entwickeln wir ein maßgeschneidertes Konzept."
              },
              {
                step: "03",
                title: "Umsetzung",
                desc: "Wir bauen Ihre Website mit Fokus auf Usability, Design und Conversion."
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <span className="text-5xl font-bold text-white/5">{item.step}</span>
                <h3 className="text-xl font-semibold text-white mt-2 mb-3">{item.title}</h3>
                <p className="text-white/50">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bereit für Ihre neue Website?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Lassen Sie uns in einem kostenlosen Gespräch besprechen, wie wir Ihre Branche 
              digital erfolgreich machen können.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2997ff] px-8 py-4 text-base font-semibold text-white hover:bg-[#2997ff]/90 transition-all"
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

      {/* Modal for Industry Details */}
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
                className="absolute right-4                top-4 p-2 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
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

              <h3 className="text-2xl font-bold text-white mb-4">
                {selectedIndustry.title}
              </h3>
              
              <p className="text-white/70 mb-6 leading-relaxed">
                {selectedIndustry.description}
              </p>

              <div className="mb-8">
                <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                  Ihre Vorteile
                </h4>
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
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2997ff] px-6 py-3 text-base font-semibold text-white hover:bg-[#2997ff]/90 transition-all"
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
