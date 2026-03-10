import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import GridBackground from "@/components/grid-background";

export const metadata: Metadata = {
  title: "Blog | Liminal Vision - Insights für kleine Unternehmen",
  description: "Praktische Tipps und Insights für Unternehmer, die online erfolgreich sein wollen. Website-Strategie, Marketing und mehr.",
};

const articles = [
  {
    slug: "warum-jede-kleine-firma-website-braucht",
    title: "Warum jede kleine Firma eine Website braucht",
    excerpt: "Instagram reicht nicht mehr. Hier erklären wir, warum eine eigene Website das Fundament Ihrer digitalen Präsenz ist.",
    date: "5. März 2025",
    readTime: "5 Min",
    category: "Strategie",
    author: "Blake",
  },
  {
    slug: "website-vs-instagram",
    title: "Website vs. Instagram: Was bringt mehr?",
    excerpt: "Social Media ist wichtig, aber Ihre Website ist Ihr Eigentum. Wir vergleichen beide Kanäle.",
    date: "28. Februar 2025",
    readTime: "6 Min",
    category: "Marketing",
    author: "Pixel",
  },
  {
    slug: "5-groesste-fehler-website-erstellung",
    title: "Die 5 größten Fehler bei der Website-Erstellung",
    excerpt: "Langsame Ladezeiten, schlechte mobile Darstellung, verpasste SEO-Chancen – wir zeigen die häufigsten Fehler.",
    date: "20. Februar 2025",
    readTime: "7 Min",
    category: "Entwicklung",
    author: "Build",
  },
];

function ArticleCard({ article }: { article: typeof articles[0] }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]">
      <Link href={`/blog/${article.slug}`} className="block p-6 lg:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-white/50">
          <span className="rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-3 py-1 font-medium text-[#2997ff]">
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readTime}
          </span>
        </div>

        <h2 className="mb-3 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[#7ab8ff] lg:text-2xl">
          {article.title}
        </h2>

        <p className="mb-4 text-sm leading-relaxed text-white/60">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm text-white/70">
            <User className="h-4 w-4" />
            {article.author}
          </span>
          <span className="flex items-center gap-2 text-sm font-medium text-[#2997ff]">
            Weiterlesen
            <ArrowLeft className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function BlogPage() {
  return (
    <>
      {/* Grid Background */}
      <GridBackground />
      
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/80 pointer-events-none" />

      {/* Content */}
      <main className="relative z-10 px-6 pb-6 pt-24 lg:pb-8 lg:pt-32">
        <div className="mx-auto max-w-4xl">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#2997ff]">
              Blog
            </p>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl lg:text-5xl">
              Insights & Tipps
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">
              Praktisches Wissen für Unternehmer, die online erfolgreich sein wollen. 
              Website-Strategie, Marketing und mehr.
            </p>
          </div>

          {/* Back Link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition-all hover:border-white/20 hover:bg-white/8"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück zur Startseite
            </Link>
          </div>

          {/* Articles Grid */}
          <div className="grid gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-[#2997ff]/10 via-transparent to-[#5856d6]/10 p-8 text-center backdrop-blur-xl">
            <h3 className="mb-2 text-xl font-semibold text-white">
              Keinen Artikel verpassen?
            </h3>
            <p className="mb-6 text-white/60">
              Wir schreiben regelmäßig über Websites, Marketing und digitale Strategien für kleine Unternehmen.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02]"
            >
              Kontakt aufnehmen
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
