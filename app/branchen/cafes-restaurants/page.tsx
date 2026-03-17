"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Star, TrendingUp, Users, Clock } from "lucide-react";
import { Coffee, Utensils, Calendar, MapPin, Phone } from "lucide-react";

const features = [
  { icon: Calendar, title: "Online-Reservierung", desc: "Gäste buchen Tische rund um die Uhr" },
  { icon: Utensils, title: "Digitale Speisekarte", desc: "Aktuelle Preise und Angebote" },
  { icon: MapPin, title: "Standort & Anfahrt", desc: "Mit Google Maps Integration" },
  { icon: Phone, title: "Click-to-Call", desc: "Direkt von der Website anrufen" },
];

const benefits = [
  "47% mehr Reservierungen durch Online-Buchung",
  "Weniger Telefonanfragen nach Öffnungszeiten",
  "Bessere Google-Sichtbarkeit für 'Restaurant in der Nähe'",
  "Professioneller Eindruck bei neuen Gästen",
  "Einfache Aktualisierung von Speisekarte und Öffnungszeiten",
];

const stats = [
  { value: "85%", label: "der Gäste suchen online nach Restaurants" },
  { value: "3x", label: "mehr Reservierungen mit Online-Buchung" },
  { value: "24/7", label: "Erreichbarkeit für Reservierungen" },
];

export default function CafeRestaurantPage() {
  return (
    <div className="min-h-screen bg-[#08090d] text-white overflow-x-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(41,151,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(41,151,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      
      {/* Hero Section */}
      <section className="relative px-4 pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Link href="/branchen" className="inline-flex items-center gap-2 mb-6 text-sm text-white/50 hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" />Zurück zu allen Branchen
              </Link>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] text-sm font-medium mb-6">
                <Coffee className="w-4 h-4" />Cafés & Restaurants
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Mehr Gäste durch eine{" "}
                <span className="bg-gradient-to-r from-[#f59e0b] to-[#f97316] bg-clip-text text-transparent">
                  professionelle Website
                </span>
              </h1>
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                Ihre Speisekarte, Öffnungszeiten und Reservierungsmöglichkeiten – alles auf einen Blick. 
                Perfekt für Gastronomen, die mehr Gäste erreichen wollen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kontakt" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#f97316] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#f59e0b]/25 hover:shadow-[#f59e0b]/40 transition-all hover:scale-[1.02]">
                  Kostenlose Beratung <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/#pricing" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white hover:bg-white/5 transition-all">
                  Preise ansehen
                </Link>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#f59e0b]/10 to-transparent p-2">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-[#f59e0b]/20 mb-4">
                      <Coffee className="w-12 h-12 text-[#f59e0b]" />
                    </div>
                    <p className="text-white/40 text-sm">Beispiel: Café Website</p>
                  </div>
                </div>
              </div>
              {/* Floating stats card */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="absolute -bottom-6 -left-6 bg-[#0d0d0f] border border-white/10 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f59e0b]/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#f59e0b]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">+47%</div>
                    <div className="text-xs text-white/50">mehr Reservierungen</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative px-4 py-16 border-y border-white/5">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#f97316] bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Was Ihre Website kann</h2>
            <p className="text-white/60 max-w-xl mx-auto">Speziell entwickelte Features für Cafés und Restaurants</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group">
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-[#f59e0b]/30 hover:bg-white/[0.04]">
                    <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-[#f59e0b]" />
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

      {/* Benefits Section */}
      <section className="relative px-4 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Warum Ihr Restaurant eine Website braucht</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#f59e0b]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#f59e0b]" />
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
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#f97316] flex items-center justify-center text-white font-bold text-sm border-2 border-[#0d0d0f]">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                      ))}
                    </div>
                    <p className="text-sm text-white/50">4.9 von 5 Sternen</p>
                  </div>
                </div>
                <blockquote className="text-white/80 italic mb-4">
                  "Seit wir unsere Website haben, sind wir vollständig ausgebucht. Die Online-Reservierung funktioniert einwandfrei."
                </blockquote>
                <div className="text-sm">
                  <span className="text-white font-semibold">Maria S.</span>
                  <span className="text-white/50"> — Café Sonnenschein, München</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#f59e0b]/10 via-transparent to-[#f97316]/10 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bereit für mehr Gäste?</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Lassen Sie uns in einem kostenlosen Gespräch besprechen, wie wir Ihr Restaurant oder Café online erfolgreich machen können.
            </p>
            <Link href="/kontakt" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#f97316] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#f59e0b]/25 hover:shadow-[#f59e0b]/40 transition-all hover:scale-[1.02]">
              Jetzt Beratungstermin vereinbaren <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
