"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Euro,
  Mail,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";

type ProjectType = {
  value: string;
  label: string;
};

const projectTypes: ProjectType[] = [
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
  { value: "retail", label: "Einzelhandel" },
  { value: "education", label: "Bildung / Coaching" },
  { value: "creative", label: "Kreative / Künstler" },
  { value: "event", label: "Event / Hochzeit" },
  { value: "portfolio", label: "Portfolio / Persönliche Website" },
  { value: "blog", label: "Blog / Magazin" },
  { value: "landing", label: "Landing Page" },
  { value: "redesign", label: "Website-Relaunch" },
  { value: "other", label: "Sonstiges" },
];

const budgetLabels: Record<number, string> = {
  50: "ab 50 €",
  500: "ca. 500 €",
  1000: "ca. 1.000 €",
  2500: "ca. 2.500 €",
  5000: "ca. 5.000 €",
  7500: "ca. 7.500 €",
  10000: "ab 10.000 €",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/68">{label}</span>
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-white/28 focus:border-[#2997ff]/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_1px_rgba(41,151,255,0.25),0_0_30px_rgba(41,151,255,0.12)]"
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <textarea
      rows={6}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-white/28 focus:border-[#2997ff]/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_1px_rgba(41,151,255,0.25),0_0_30px_rgba(41,151,255,0.12)]"
    />
  );
}

function KontaktPageContent() {
  const searchParams = useSearchParams();
  const preselectedWebsiteType = useMemo(() => {
    const value = searchParams.get("websiteType");
    return projectTypes.some((type) => type.value === value) ? value ?? "" : "";
  }, [searchParams]);
  const preselectedProjectLabel = useMemo(
    () =>
      projectTypes.find((type) => type.value === preselectedWebsiteType)?.label ?? "",
    [preselectedWebsiteType]
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    websiteType: preselectedWebsiteType,
    budget: 1000,
    message: "",
  });
  const [agbAccepted, setAgbAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!preselectedWebsiteType) {
      return;
    }

    setForm((prev) =>
      prev.websiteType === preselectedWebsiteType
        ? prev
        : { ...prev, websiteType: preselectedWebsiteType }
    );
  }, [preselectedWebsiteType]);

  const budgetText = useMemo(() => budgetLabels[form.budget] ?? `${form.budget} €`, [form.budget]);

  const updateField = (field: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!agbAccepted) {
      alert("Bitte akzeptieren Sie die AGBs, um fortzufahren.");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitted(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          agbAccepted,
          source: 'contact-page'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          websiteType: preselectedWebsiteType,
          budget: 1000,
          message: "",
        });
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

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <motion.div
        animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[6%] top-24 h-64 w-64 rounded-full bg-[#2997ff]/12 blur-3xl"
      />
      <motion.div
        animate={{ opacity: [0.14, 0.26, 0.14], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute bottom-10 right-[10%] h-72 w-72 rounded-full bg-[#5856d6]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8 lg:pt-16">
        <section className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-sm text-[#2997ff]"
          >
            <Sparkles className="h-4 w-4" />
            Kontakt
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.55 }}
            className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
          >
            <span className="text-[#2997ff]">Erzählen</span> Sie uns kurz, was Sie <span className="text-[#2997ff]">brauchen</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.55 }}
            className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-white/58 sm:text-base"
          >
            Je klarer Ihre Angaben, desto passender können wir Ihr Konzept und Ihre Website vorbereiten.
          </motion.p>

          {preselectedProjectLabel ? (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.45 }}
              className="mx-auto mt-4 inline-flex max-w-max rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70"
            >
              Vorausgewählt: {preselectedProjectLabel}
            </motion.p>
          ) : null}
        </section>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:p-8"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                <span className="text-[#2997ff]">Projekt</span>anfrage
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/52">
                Wenige klare Angaben genügen, damit Ihre Anfrage sauber eingeschätzt werden kann.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name">
                  <Input value={form.name} onChange={(v) => updateField("name", v)} placeholder="Ihr Name" />
                </Field>
                <Field label="E-Mail">
                  <Input value={form.email} onChange={(v) => updateField("email", v)} placeholder="ihre@email.de" type="email" />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Telefon">
                  <Input value={form.phone} onChange={(v) => updateField("phone", v)} placeholder="Optional" type="tel" />
                </Field>
                <Field label="Unternehmen">
                  <Input value={form.company} onChange={(v) => updateField("company", v)} placeholder="Firmenname" />
                </Field>
              </div>

              <Field label="Website-Art">
                <select
                  value={form.websiteType}
                  onChange={(e) => updateField("websiteType", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white outline-none backdrop-blur-xl transition-all duration-300 focus:border-[#2997ff]/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_1px_rgba(41,151,255,0.25),0_0_30px_rgba(41,151,255,0.12)]"
                >
                  <option value="" className="bg-[#0a0a0a] text-white/70">Bitte auswählen</option>
                  {projectTypes.map((type) => (
                    <option key={type.value} value={type.value} className="bg-[#0a0a0a]">
                      {type.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Budgetvorstellung">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 backdrop-blur-xl">
                  <div className="mb-5 flex items-center justify-between gap-4 text-sm text-white/70">
                    <div className="inline-flex items-center gap-2">
                      <Euro className="h-4 w-4 text-[#2997ff]" />
                      Geschätzter Rahmen
                    </div>
                    <span className="rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-sm font-medium text-[#2997ff]">{budgetText}</span>
                  </div>
                  <div className="relative px-1">
                    <input
                      type="range"
                      min="50"
                      max="10000"
                      step="50"
                      value={form.budget}
                      onChange={(e) => updateField("budget", Number(e.target.value))}
                      className="range-slider h-3 w-full cursor-pointer appearance-none rounded-full bg-white/10"
                      style={{
                        background: `linear-gradient(to right, #2997ff 0%, #5856d6 ${((form.budget - 50) / (10000 - 50)) * 100}%, rgba(255,255,255,0.1) ${((form.budget - 50) / (10000 - 50)) * 100}%, rgba(255,255,255,0.1) 100%)`
                      }}
                    />
                  </div>
                  <div className="mt-4 flex justify-between text-xs text-white/40">
                    <span>50 €</span>
                    <span>10.000 €</span>
                  </div>
                </div>
              </Field>

              <Field label="Weitere Angaben">
                <Textarea
                  value={form.message}
                  onChange={(v) => updateField("message", v)}
                  placeholder="Was soll die Website können? Welche Seiten brauchen Sie? Haben Sie schon Inhalte, Bilder oder besondere Wünsche?"
                />
              </Field>

              {/* AGB Checkbox */}
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <input
                  type="checkbox"
                  id="agb"
                  checked={agbAccepted}
                  onChange={(e) => setAgbAccepted(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-white/20 bg-white/5 text-[#2997ff] focus:ring-[#2997ff] cursor-pointer"
                />
                <label htmlFor="agb" className="text-sm text-white/60 cursor-pointer">
                  Ich habe die{" "}
                  <a href="/agb" className="text-[#2997ff] hover:underline" target="_blank">
                    AGBs
                  </a>{" "}
                  gelesen und akzeptiere sie. *
                </label>
              </div>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-white/40">* Pflichtfeld</div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -1 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-2xl border border-[#2997ff]/20 bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-6 py-3.5 text-sm font-medium text-white shadow-[0_15px_40px_rgba(41,151,255,0.28)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {isSubmitting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                        className="inline-block h-4 w-4 rounded-full border-2 border-white/35 border-t-white"
                      />
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Anfrage senden
                    </>
                  )}
                </motion.button>
              </div>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-emerald-100 backdrop-blur-xl"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                      <div>
                        <div className="font-medium">Anfrage gesendet.</div>
                        <div className="mt-1 text-sm text-emerald-100/75">
                          Vielen Dank. Die Anfrage ist eingegangen und wird zeitnah bearbeitet.
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          <div className="space-y-5">
            {[
              {
                icon: <Mail className="h-5 w-5" />,
                title: "E-Mail",
                value: "business@liminalo.com",
                sub: "Für Anfragen, Rückfragen und Projektbesprechungen.",
              },
              {
                icon: <Phone className="h-5 w-5" />,
                title: "Telefon",
                value: "0174 6509061",
                sub: "Direkter Kontakt für schnelle Abstimmung.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 + index * 0.06 }}
                whileHover={{ y: -4 }}
                className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#2997ff]">
                  {item.icon}
                </div>
                <div className="text-sm text-white/45">{item.title}</div>
                <div className="mt-1 text-lg font-semibold text-white">{item.value}</div>
                <div className="mt-2 text-sm leading-6 text-white/55">{item.sub}</div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
            >
              <h3 className="text-lg font-semibold text-white">Was wir vorab wissen sollten</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/58">
                <li>• Welche Branche und welches Ziel Ihre Website hat</li>
                <li>• Welche Seiten oder Funktionen benötigt werden</li>
                <li>• Welcher Budgetrahmen realistisch ist</li>
                <li>• Bis wann das Projekt idealerweise starten soll</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KontaktPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
      <KontaktPageContent />
    </Suspense>
  );
}
