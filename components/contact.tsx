'use client';

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28 md:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#2997ff]">
            Kontakt
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Lassen wir uns unterhalten
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Erzählen Sie uns von Ihrem Projekt. Wir melden uns innerhalb von 24 Stunden zurück.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl md:p-8"
        >
          <div className="pointer-events-none absolute -left-16 top-8 h-40 w-40 rounded-full bg-[#2997ff]/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-8 h-40 w-40 rounded-full bg-[#5856d6]/15 blur-3xl" />

          <form className="relative grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="group relative">
                <input
                  id="name"
                  type="text"
                  placeholder=" "
                  className="peer h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 pt-5 text-white outline-none transition-all duration-300 placeholder:text-transparent focus:border-[#2997ff]/50 focus:shadow-[0_0_0_4px_rgba(41,151,255,0.08)]"
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 top-4 origin-left text-sm text-white/45 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:scale-90 peer-focus:text-[#8cc8ff] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-90"
                >
                  Name
                </label>
              </div>

              <div className="group relative">
                <input
                  id="email"
                  type="email"
                  placeholder=" "
                  className="peer h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 pt-5 text-white outline-none transition-all duration-300 placeholder:text-transparent focus:border-[#2997ff]/50 focus:shadow-[0_0_0_4px_rgba(41,151,255,0.08)]"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-4 origin-left text-sm text-white/45 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:scale-90 peer-focus:text-[#8cc8ff] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-90"
                >
                  Email
                </label>
              </div>
            </div>

            <div className="group relative">
              <input
                id="company"
                type="text"
                placeholder=" "
                className="peer h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 pt-5 text-white outline-none transition-all duration-300 placeholder:text-transparent focus:border-[#2997ff]/50 focus:shadow-[0_0_0_4px_rgba(41,151,255,0.08)]"
              />
              <label
                htmlFor="company"
                className="absolute left-4 top-4 origin-left text-sm text-white/45 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:scale-90 peer-focus:text-[#8cc8ff] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-90"
              >
                Unternehmen
              </label>
            </div>

            <div className="group relative">
              <textarea
                id="message"
                rows={5}
                placeholder=" "
                className="peer w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 pt-5 text-white outline-none transition-all duration-300 placeholder:text-transparent focus:border-[#2997ff]/50 focus:shadow-[0_0_0_4px_rgba(41,151,255,0.08)]"
              />
              <label
                htmlFor="message"
                className="absolute left-4 top-4 origin-left text-sm text-white/45 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:scale-90 peer-focus:text-[#8cc8ff] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-90"
              >
                Nachricht
              </label>
            </div>

            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-8 py-4 text-sm font-medium text-white shadow-[0_0_35px_rgba(41,151,255,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_55px_rgba(88,86,214,0.4)]"
            >
              <Send className="h-4 w-4" />
              Nachricht senden
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
