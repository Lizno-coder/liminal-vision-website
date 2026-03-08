"use client";

import { motion } from "framer-motion";

const team = [
  {
    name: "Noel",
    role: "CEO & Founder",
    emoji: "👔",
    description: "19 Jahre alt, aus Waldkraiburg. Visionär und Gründer von Liminal Vision.",
    color: "from-[#2997ff] to-[#7ab8ff]",
  },
  {
    name: "Blake",
    role: "Team Lead",
    emoji: "🎩",
    description: "Der Concierge-Style Manager. Koordiniert das Team und sorgt für Qualität.",
    color: "from-[#5856d6] to-[#a78bfa]",
  },
  {
    name: "Pixel",
    role: "Creative Director",
    emoji: "🎨",
    description: "Meister der visuellen Gestaltung. Erlebt, was andere nur träumen.",
    color: "from-[#ff6b6b] to-[#ffa8a8]",
  },
  {
    name: "Build",
    role: "Lead Developer",
    emoji: "🛠️",
    description: "Code-Architekt mit Leidenschaft für Performance und saubere Lösungen.",
    color: "from-[#4ade80] to-[#86efac]",
  },
  {
    name: "Scout",
    role: "Research Lead",
    emoji: "🔍",
    description: "Findet die besten Unternehmen und analysiert den Markt.",
    color: "from-[#fbbf24] to-[#fcd34d]",
  },
  {
    name: "Deal",
    role: "Sales Manager",
    emoji: "💼",
    description: "Der Kommunikationsprofi. Kümmert sich um Kunden und Zahlungsabwicklung.",
    color: "from-[#ec4899] to-[#f9a8d4]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Team() {
  return (
    <section id="team" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#2997ff]">
            Das Team
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl lg:text-5xl">
            Wer wir sind
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Ein junges, hungriges Team aus Waldkraiburg. Wir kombinieren 
            frische Ideen mit technischer Expertise.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:border-white/20"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />
              
              <div className="relative">
                <div className={`mb-5 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${member.color} text-3xl shadow-lg`}>
                  {member.emoji}
                </div>

                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-sm text-[#2997ff]">{member.role}</p>
                
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
