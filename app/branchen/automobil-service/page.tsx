"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Star, TrendingUp, Car, Wrench, Calendar, CreditCard } from "lucide-react";
import GridBackground from "@/components/grid-background";

const features = [
  { icon: Car, title: "Fahrzeug-Showcase", desc: "Bestand mit Bildern & Details" },
  { icon: Wrench, title: "Werkstatt-Termine", desc: "Service online buchen" },
  { icon: Calendar, title: "Probefahrten", desc: "Einfach terminieren" },
  { icon: CreditCard, title: "Finanzierung", desc: "Rechner & Anfragen" },
];

const benefits = [
  "78% mehr Service-Termine durch Online-Buchung",
  "Professioneller Fahrzeugbestand immer aktuell",
  "Weniger Zeit mit Telefonaten verbringen",
  "Direkte Kontaktaufnahme interessierter Käufer",
  "24/7 Erreichbarkeit für Notfälle & Anfragen",
];

const stats = [
  { value: "+78%", label: "mehr Service-Termine" },
  { value: "3x", label: "mehr Anfragen" },
  { value: "24/7", label: "Erreichbarkeit" },
];

export default function AutomobilPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <GridBackground color="#6366f1" />
      
      <section className="relative px-4 pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Link href="/branchen" className="inline-flex items-center gap-2 mb-6 text-sm text-white/50 hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" />Zurück zu allen Branchen
              </Link>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#6366f1] text-sm font-medium mb-6">
                <Car className="w-4 h-4" />Automobil & Service
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Ihr Autohaus{" "}
                <span className="bg-gradient-to-r from-[#6366f1] to-[#818cf8] bg-clip-text text-transparent">
                  digital
                </span>
              </h1>
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                Autohäuser, Werkstätten und Detailer: Präsentieren Sie Ihr Fahrzeugangebot, 
                Services und Terminverfügbarkeiten. Werkstatt- und Showroom-Termine online buchbar.
              </p>
              <Link href="/kontakt" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6366f1] to-[#818cf8] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#6366f1]/25 hover:shadow-[#6366f1]/40 transition-all hover:scale-[1.02]">
                Kostenlose Beratung <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#6366f1]/10 to-transparent p-2">
                <div className="aspect-[4/3] rounded-2xl bg-transparent flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-[#6366f1]/20 mb-4">
                      <Car className="w-12 h-12 text-[#6366f1]" />
                    </div>
                    <p className="text-white/40 text-sm">Autohaus Website</p>
                  </div>
                </div>
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="absolute -bottom-6 -left-6 bg-transparent border border-white/10 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#6366f1]/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#6366f1]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">+78%</div>
                    <div className="text-xs text-white/50">mehr Termine</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 border-y border-white/5">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#6366f1] to-[#818cf8] bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Was Ihre Website kann</h2>
            <p className="text-white/60 max-w-xl mx-auto">Speziell für Autohäuser, Werkstätten & Detailer</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group">
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-[#6366f1]/30 hover:bg-white/[0.04]">
                    <div className="w-12 h-12 rounded-xl bg-[#6366f1]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-[#6366f1]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-white/50">{feature.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Warum Autohäuser eine Website brauchen</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#6366f1]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#6366f1]" />
                    </div>
                    <span className="text-white/80">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="rounded-3xl border border-white/10 bg-transparent p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex -space-x-2">
                    {[1,2,3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#818cf8] flex items-center justify-center text-white font-bold text-sm border-2 border-[#0d0d0f]">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-[#6366f1] text-[#6366f1]" />
                      ))}
                    </div>
                    <p className="text-sm text-white/50">4.9 von 5 Sternen</p>
                  </div>
                </div>
                <blockquote className="text-white/80 italic mb-4">
                  "Unsere Werkstatt ist dank Online-Terminbuchung immer ausgelastet. Die Kunden lieben die einfache Terminierung."
                </blockquote>
                <div className="text-sm">
                  <span className="text-white font-semibold">Thomas H.</span>
                  <span className="text-white/50"> — Autohaus Hansen, Berlin</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#6366f1]/10 via-transparent to-[#818cf8]/10 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bereit für mehr Kunden?</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Lassen Sie uns besprechen, wie wir Ihr Autohaus oder Ihre Werkstatt online erfolgreich machen.
            </p>
            <Link href="/kontakt" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6366f1] to-[#818cf8] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#6366f1]/25 hover:shadow-[#6366f1]/40 transition-all hover:scale-[1.02]">
              Jetzt Beratungstermin vereinbaren <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
