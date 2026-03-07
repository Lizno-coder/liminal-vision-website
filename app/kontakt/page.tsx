"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "liz.claw@gmx.de",
    href: "mailto:liz.claw@gmx.de",
  },
  {
    icon: MapPin,
    label: "Standort",
    value: "Waldkraiburg, Bayern",
    href: null,
  },
  {
    icon: Clock,
    label: "Antwortzeit",
    value: "Innerhalb 24 Stunden",
    href: null,
  },
];

const faqs = [
  {
    question: "Wie funktioniert die kostenlose Demo?",
    answer: "Sie erhalten eine maßgeschneiderte Vorschau Ihrer Website, bevor Sie sich entscheiden. Keine Vorauszahlung nötig.",
  },
  {
    question: "Wie lange dauert ein Projekt?",
    answer: "Je nach Umfang 2-6 Wochen. Wir geben Ihnen vor Projektstart eine konkrete Zeitangabe.",
  },
  {
    question: "Was kostet eine Website?",
    answer: "Unsere Websites starten bei €499. Der genaue Preis hängt von den Features ab.",
  },
];

export default function KontaktPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="heading-1 mb-6">
              Lassen wir uns <span className="gradient-text">unterhalten</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Erzählen Sie uns von Ihrem Projekt. Wir melden uns innerhalb von 24 Stunden zurück.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
              {/* Left: Contact Info */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Kontakt</h2>
                  <p className="text-gray-400">
                    Haben Sie eine Idee? Wir helfen Ihnen, sie Wirklichkeit werden zu lassen.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="group flex items-center gap-4 p-4 rounded-2xl glass hover:bg-white/5 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                            <item.icon size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">{item.label}</p>
                            <p className="text-white group-hover:text-blue-400 transition-colors">
                              {item.value}
                            </p>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 p-4 rounded-2xl glass">
                          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <item.icon size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">{item.label}</p>
                            <p className="text-white">{item.value}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Form */}
              <div className="lg:col-span-3">
                <form className="glass rounded-3xl p-8 md:p-10" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="name">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="form-input"
                        placeholder="Max Mustermann"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="form-input"
                        placeholder="max@beispiel.de"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="company">
                      Unternehmen
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="form-input"
                      placeholder="Ihr Unternehmen (optional)"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="service">
                      Service
                    </label>
                    <select id="service" name="service" className="form-input cursor-pointer">
                      <option value="">Bitte wählen...</option>
                      <option value="webdesign">Web Design</option>
                      <option value="development">Development</option>
                      <option value="animation">Animation & 3D</option>
                      <option value="hosting">Cloud Hosting</option>
                      <option value="full">Komplettpaket</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="message">
                      Ihre Nachricht *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="form-input resize-none"
                      placeholder="Erzählen Sie uns von Ihrem Projekt..."
                    />
                  </div>

                  <div className="mb-8">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        id="privacy"
                        name="privacy"
                        required
                        className="mt-1 w-5 h-5 rounded border-white/20 bg-black/30 text-blue-500"
                      />
                      <span className="text-sm text-gray-400">
                        Ich habe die{" "}
                        <a href="/datenschutz" className="text-blue-400 hover:underline">
                          Datenschutzerklärung
                        </a>{" "}
                        gelesen und stimme der Verarbeitung meiner Daten zu. *
                      </span>
                    </label>
                  </div>

                  <button type="submit" className="w-full btn btn-primary py-4 text-lg">
                    <Send size={18} />
                    Nachricht senden
                  </button>

                  <p className="text-center text-gray-500 text-sm mt-4">
                    Oder senden Sie uns direkt eine Email an{" "}
                    <a href="mailto:liz.claw@gmx.de" className="text-blue-400 hover:underline">
                      liz.claw@gmx.de
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-white/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Häufige Fragen</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-2xl p-6"
                >
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
