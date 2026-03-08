"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria Schmidt",
    company: "Café Sonnenschein",
    location: "München",
    role: "Inhaberin",
    rating: 5,
    text: "Die Website hat unser Café komplett verändert. Innerhalb eines Monats hatten wir 40% mehr Reservierungen. Der kostenlose Demo-Prozess hat uns sofort überzeugt – wir wussten genau, was wir bekommen.",
  },
  {
    name: "Thomas Weber",
    company: "FitZone Studio",
    location: "Rosenheim",
    role: "Gründer",
    rating: 5,
    text: "Endlich mal ein Team, das versteht, was kleine Unternehmen brauchen. Kein Tech-Gedöns, sondern Lösungen, die funktionieren. Die Seite lädt schneller als alle Konkurrenten und sieht dabei top aus.",
  },
  {
    name: "Karin Müller",
    company: "Kunsthandwerk Müller",
    location: "Waldkraiburg",
    role: "Handwerkerin",
    rating: 5,
    text: "Ich hatte null Ahnung von Websites, aber Liminal Vision hat mich Schritt für Schritt begleitet. Jetzt verkaufe ich meine Produkte online und erreiche Kunden aus ganz Bayern. Beste Entscheidung!",
  },
  {
    name: "Markus Bauer",
    company: "Bauer Gebäudereinigung",
    location: "Mühldorf",
    role: "Geschäftsführer",
    rating: 5,
    text: "Professionelle Beratung, faire Preise, tolles Ergebnis. Was will man mehr? Unsere neue Website bringt regelmäßig Anfragen aus der Region ein. Das hat sich schon nach 3 Monaten amortisiert.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-[#fbbf24] text-[#fbbf24]" : "text-white/20"
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#2997ff]">
            Kundenstimmen
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl lg:text-5xl">
            Was Kunden sagen
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Wir lassen lieber andere für uns sprechen. 
            Echte Geschichten von echten Unternehmern.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-white/5" />
              
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>

              <p className="mb-6 text-base leading-relaxed text-white/80">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#2997ff] to-[#5856d6] text-sm font-bold text-white">
                  {testimonial.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-medium text-white">{testimonial.name}</p>
                  <p className="text-sm text-white/50">
                    {testimonial.role}, {testimonial.company} – {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
