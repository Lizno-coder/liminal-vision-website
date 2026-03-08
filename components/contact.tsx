"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
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
                placeholder="Ihr Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-all focus:border-[#2997ff]/50 focus:bg-white/[0.07]"
              />
            </div>
            <div>
              <input
                type="email"
                required
                placeholder="Ihre E-Mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-all focus:border-[#2997ff]/50 focus:bg-white/[0.07]"
              />
            </div>
            <div>
              <textarea
                required
                rows={4}
                placeholder="Was brauchen Sie?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-all focus:border-[#2997ff]/50 focus:bg-white/[0.07]"
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2997ff] to-[#5856d6] py-3 font-medium text-white transition-transform active:scale-[0.98]"
            >
              <Send className="h-4 w-4" />
              Abschicken
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-white/40">
          Oder direkt: <a href="mailto:liz.claw@gmx.de" className="text-[#2997ff] hover:underline">liz.claw@gmx.de</a>
        </p>
      </div>
    </section>
  );
}
