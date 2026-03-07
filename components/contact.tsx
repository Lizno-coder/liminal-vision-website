"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#2997ff]">
            Kontakt
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl lg:text-5xl">
            Lassen wir uns unterhalten
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Erzählen Sie uns von Ihrem Projekt. Wir melden uns innerhalb von 24 Stunden zurück.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl sm:p-8"
        >
          <div className="pointer-events-none absolute -left-16 top-8 h-40 w-40 rounded-full bg-[#2997ff]/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-8 h-40 w-40 rounded-full bg-[#5856d6]/15 blur-3xl" />

          <form className="relative grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="group relative">
                <input
                  id="name"
                  type="text"
                  placeholder=" "
                  className="peer h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 pt-4 text-sm text-white outline-none transition-all placeholder:text-transparent focus:border-[#2997ff]/50 sm:h-14 sm:pt-5"
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 top-3 text-xs text-white/50 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#8cc8ff] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs sm:top-4 sm:peer-placeholder-shown:top-4 sm:peer-focus:top-2.5"
                >
                  Name
                </label>
              </div>

              <div className="group relative">
                <input
                  id="email"
                  type="email"
                  placeholder=" "
                  className="peer h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 pt-4 text-sm text-white outline-none transition-all placeholder:text-transparent focus:border-[#2997ff]/50 sm:h-14 sm:pt-5"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-3 text-xs text-white/50 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#8cc8ff] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs sm:top-4 sm:peer-placeholder-shown:top-4 sm:peer-focus:top-2.5"
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
                className="peer h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 pt-4 text-sm text-white outline-none transition-all placeholder:text-transparent focus:border-[#2997ff]/50 sm:h-14 sm:pt-5"
              />
              <label
                htmlFor="company"
                className="absolute left-4 top-3 text-xs text-white/50 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#8cc8ff] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs sm:top-4 sm:peer-placeholder-shown:top-4 sm:peer-focus:top-2.5"
              >
                Unternehmen
              </label>
            </div>

            <div className="group relative">
              <textarea
                id="message"
                rows={4}
                placeholder=" "
                className="peer w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 pt-5 text-sm text-white outline-none transition-all placeholder:text-transparent focus:border-[#2997ff]/50 sm:pt-6"
              />
              <label
                htmlFor="message"
                className="absolute left-4 top-3 text-xs text-white/50 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#8cc8ff] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs sm:top-4 sm:peer-placeholder-shown:top-5 sm:peer-focus:top-2.5"
              >
                Nachricht
              </label>
            </div>

            <button
              type="submit"
              className="group mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-6 py-3.5 text-sm font-medium text-white shadow-[0_0_35px_rgba(41,151,255,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_55px_rgba(88,86,214,0.4)]"
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
