"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Star, TrendingUp, Scissors, Calendar, Sparkles, Heart } from "lucide-react";

const features = [
  { icon: Calendar, title: "Online-Termine", desc: "Kunden buchen selbstständig" },
  { icon: Sparkles, title: "Service-Katalog", desc: "Alle Treatments übersichtlich" },
  { icon: Heart, title: "Gutscheine", desc: "Online verkaufen & einlösen" },
  { icon: Scissors, title: "Preisliste", desc: "Transparent & aktuell" },
];

const benefits = [
  "40% weniger Telefonate für Terminanfragen",
  "Mehr Stammkunden durch Online-Buchung",
  "Professioneller Auftritt gegenüber Konkurrenz",
  "Einfache Gutschein-Verwaltung",
  "Bessere Auslastung durch 24/7 Buchung",
];

const stats = [
  { value: "-40%", label: "weniger Telefonate" },
  { value: "3x", label: "mehr Online-Buchungen" },
  { value: "85%", label: "suchen online" },
];

export default function BeautyPage() {
  return (
    <div className="min-h-screen bg-[#08090d] text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(244,63,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.03)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      
      <section className="relative px-4 pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Link href="/branchen" className="inline-flex items-center gap-2 mb-6 text-sm text-white/50 hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" />Zurück zu allen Branchen
              </Link>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f43f5e]/10 border border-[#f43f5e]/30 text-[#f43f5e] text-sm font-medium mb-6">
                <Scissors className="w-4 h-4" />Beauty & Kosmetik
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Eleganz, die{" "}
                <span className="bg-gradient-to-r from-[#f43f5e] to-[#fb7185] bg-clip-text text-transparent">
                  überzeugt
                </span>
              </h1>
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                Stylisch Ihre Treatments, Preise und Verfügbarkeiten präsentieren. 
                Mit integrierter Terminbuchung vereinfachen Sie den Alltag für Sie und Ihre Kundinnen.
              </p>
              <Link href="/kontakt" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f43f5e] to-[#fb7185] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#f43f5e]/25 hover:shadow-[#f43f5e]/40 transition-all hover:scale-[1.02]">
                Kostenlose Beratung <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#f43f5e]/10 to-transparent p-2">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-[#f43f5e]/20 mb-4">
                      <Sparkles className="w-12 h-12 text-[#f43f5e]" />
                    </div>
                    <p className="text-white/40 text-sm">Beauty Salon Website</p>
                  </div>
                </div>
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="absolute -bottom-6 -left-6 bg-[#0d0d0f] border border-white/10 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f43f5e]/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#f43f5e]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">-40%</div>
                    <div className="text-xs text-white/50">weniger Telefonate</div>
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
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#f43f5e] to-[#fb7185] bg-clip-text text-transparent mb-2">{stat.value}</div>
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
            <p className="text-white/60 max-w-xl mx-auto">Perfekt für Beauty-Salons, Kosmetikstudios und Nagelstudios</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group">
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-[#f43f5e]/30 hover:bg-white/[0.04]">
                    <div className="w-12 h-12 rounded-xl bg-[#f43f5e]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-[#f43f5e]" />
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
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,63,94,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Warum Ihr Salon eine Website braucht</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#f43f5e]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#f43f5e]" />
                    </div>
                    <span className="text-white/80">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex -space-x-2">
                    {[1,2,3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f43f5e] to-[#fb7185] flex items-center justify-center text-white font-bold text-sm border-2 border-[#0d0d0f]">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-[#f43f5e] text-[#f43f5e]" />
                      ))}
                    </div>
                    <p className="text-sm text-white/50">4.9 von 5 Sternen</p>
                  </div>
                </div>
                <blockquote className="text-white/80 italic mb-4">
                  "Endlich kann ich mich aufs Wesentliche konzentrieren statt dauernd ans Telefon zu müssen."
                </blockquote>
                <div className="text-sm">
                  <span className="text-white font-semibold">Lisa M.</span>
                  <span className="text-white/50"> — Beauty Lounge, Hamburg</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#f43f5e]/10 via-transparent to-[#fb7185]/10 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bereit für mehr Kundinnen?</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Lassen Sie uns besprechen, wie wir Ihren Beauty-Salon online erfolgreich machen.
            </p>
            <Link href="/kontakt" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f43f5e] to-[#fb7185] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#f43f5e]/25 hover:shadow-[#f43f5e]/40 transition-all hover:scale-[1.02]">
              Jetzt Beratungstermin vereinbaren <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
