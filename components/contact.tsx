"use client";

import { useState } from "react";
import { Send, Check, Loader2, Building2, Globe } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

const projectTypes = [
  { value: "", label: "Website-Art auswählen" },
  { value: "business", label: "Unternehmenswebsite" },
  { value: "shop", label: "Onlineshop / E-Commerce" },
  { value: "restaurant", label: "Restaurant / Gastronomie" },
  { value: "hotel", label: "Hotel / Unterkunft" },
  { value: "medical", label: "Arztpraxis / Klinik" },
  { value: "law", label: "Anwaltskanzlei" },
  { value: "realestate", label: "Immobilien" },
  { value: "construction", label: "Bau / Handwerk" },
  { value: "automotive", label: "Autohaus / Werkstatt" },
  { value: "beauty", label: "Beauty / Kosmetik / Friseur" },
  { value: "fitness", label: "Fitness / Studio / Yoga" },
  { value: "event", label: "Event / Hochzeit" },
  { value: "portfolio", label: "Portfolio / Persönliche Website" },
  { value: "blog", label: "Blog / Magazin" },
  { value: "landing", label: "Landing Page" },
  { value: "redesign", label: "Website-Relaunch" },
  { value: "other", label: "Sonstiges" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agbAccepted, setAgbAccepted] = useState(false);
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    company: "",
    websiteType: "",
    message: "" 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agbAccepted) {
      alert("Bitte akzeptieren Sie die AGBs, um fortzufahren.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          agbAccepted,
          source: 'homepage-contact'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", company: "", websiteType: "", message: "" });
        setAgbAccepted(false);
      } else {
        console.error('Submit error:', data.error);
        alert('Fehler beim Senden: ' + (data.error || 'Unbekannter Fehler'));
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Fehler beim Senden. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#2997ff]">Kontakt</p>
          <h2 className="text-3xl font-bold text-white">Los geht&apos;s</h2>
          <p className="mt-2 text-white/60">Schreiben Sie uns. Wir melden uns.</p>
        </div>

        {sent ? (
          <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center">
            <Check className="mx-auto mb-4 h-12 w-12 text-green-400" />
            <h3 className="text-xl font-semibold text-white">Danke!</h3>
            <p className="mt-2 text-white/60">Wir antworten innerhalb 24 Stunden.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                required
                placeholder="Ihr Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-all focus:border-[#2997ff]/50 focus:bg-white/[0.07]"
              />
            </div>
            <div>
              <input
                type="email"
                required
                placeholder="Ihre E-Mail *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-all focus:border-[#2997ff]/50 focus:bg-white/[0.07]"
              />
            </div>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Unternehmen (optional)"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-white placeholder-white/40 outline-none transition-all focus:border-[#2997ff]/50 focus:bg-white/[0.07]"
              />
            </div>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 pointer-events-none z-10" />
              <select
                value={form.websiteType}
                onChange={(e) => setForm({ ...form, websiteType: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-10 py-3 text-white outline-none transition-all focus:border-[#2997ff]/50 focus:bg-white/[0.07] appearance-none cursor-pointer"
              >
                {projectTypes.map((type) => (
                  <option key={type.value} value={type.value} className="bg-[#0a0a0a]">
                    {type.label}
                  </option>
                ))}
              </select>
              <svg className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div>
              <textarea
                required
                rows={4}
                placeholder="Was brauchen Sie? *"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-all focus:border-[#2997ff]/50 focus:bg-white/[0.07]"
              />
            </div>
            
            {/* AGB Checkbox */}
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <input
                type="checkbox"
                id="agb-home"
                checked={agbAccepted}
                onChange={(e) => setAgbAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-[#2997ff] focus:ring-[#2997ff] cursor-pointer"
              />
              <label htmlFor="agb-home" className="text-xs text-white/60 cursor-pointer">
                Ich habe die{" "}
                <a href="/agb" className="text-[#2997ff] hover:underline" target="_blank">
                  AGBs
                </a>{" "}
                gelesen und akzeptiere sie. *
              </label>
            </div>
            
            <LiquidButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {isSubmitting ? "Wird gesendet..." : "Abschicken"}
            </LiquidButton>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-white/40">
          Oder direkt: <a href="mailto:business@liminalo.com" className="text-[#2997ff] hover:underline">business@liminalo.com</a>
        </p>
      </div>
    </section>
  );
}
