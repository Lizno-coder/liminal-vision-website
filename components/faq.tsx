"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Was kostet eine Website?",
    a: "Ab 50€ für eine einfache Seite. Der Preis-Rechner zeigt Ihnen eine Schätzung. Der finale Preis wird vor Projektstart festgelegt.",
  },
  {
    q: "Wie lange dauert es?",
    a: "3-14 Tage, je nach Umfang.",
  },
  {
    q: "Wie läuft die Bezahlung ab?",
    a: "50% bei Start, 50% bei Fertigstellung. Keine Vorkasse für die Demo.",
  },
  {
    q: "Kann ich später Änderungen machen?",
    a: "Ja, wir zeigen Ihnen wie. Oder buchen Sie unseren Wartungsservice.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <p className="mb-1 text-sm uppercase tracking-[0.2em] text-[#2997ff]">FAQ</p>
          <h2 className="text-2xl font-semibold text-white">Fragen & Antworten</h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03]">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <span className="font-medium text-white">{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-white/50 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-white/10 px-4 pb-4 pt-2 text-sm text-white/60">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
