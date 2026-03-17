import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import GridBackground from "@/components/grid-background";

const articles = [
  {
    slug: "warum-jede-kleine-firma-website-braucht",
    title: "Warum jede kleine Firma eine Website braucht",
    excerpt: "Instagram reicht nicht mehr. Hier erklären wir, warum eine eigene Website das Fundament Ihrer digitalen Präsenz ist.",
    content: `## Das Problem mit Instagram & Co.

Viele kleine Unternehmer denken: „Ich habe doch Instagram, da erreiche ich meine Kunden." Stimmt – aber nur bedingt. Social Media-Plattformen haben einen gravierenden Nachteil: **Sie gehören Ihnen nicht.**

### Algorithmen bestimmen, wer Sie sieht

Auf Instagram entscheidet ein Algorithmus, wer Ihre Posts zu Gesicht bekommt. Selbst Ihre Follower sehen nicht alles, was Sie posten.

### Gebannt? Gelöscht? Alles weg.

Stellen Sie sich vor: Morgen ist Ihr Instagram-Account gesperrt. Jahre an Aufbau, tausende Follower – alles weg. Bei einer eigenen Website haben Sie die Kontrolle.

## Warum eine Website anders ist

### 1. Sie gehört Ihnen

Ihre Website ist Ihr Eigentum. Kein Algorithmus, keine willkürlichen Sperren.

### 2. Google findet Sie

Wenn jemand „Café München" oder „Schreiner Rosenheim" googelt, erscheinen Websites in den Suchergebnissen.

### 3. Professionalität schafft Vertrauen

Eine professionelle Website signalisiert: „Ich nehme mein Geschäft ernst."

### 4. Alles an einem Ort

Öffnungszeiten, Anfahrt, Preise, Leistungen – alles übersichtlich auf einer Seite.

## Aber Websites sind doch teuer?

Nicht bei uns:

- **1 Seite**: Ab 50 €
- **3 Seiten**: Ab 100 €
- **5 Seiten**: Ab 150 €

## Fazit

Social Media ist wichtig – als Ergänzung. Aber das Fundament Ihrer digitalen Präsenz sollte eine eigene Website sein.

**Bereit für Ihre Website?** [Fordern Sie eine kostenlose Demo an](/kontakt).`,
    date: "5. März 2025",
    readTime: "5 Min",
    category: "Strategie",
    author: "Blake",
  },
  {
    slug: "website-vs-instagram",
    title: "Website vs. Instagram: Was bringt mehr?",
    excerpt: "Social Media ist wichtig, aber Ihre Website ist Ihr Eigentum. Wir vergleichen beide Kanäle.",
    content: `## Das falsche Entweder-Oder

„Brauche ich wirklich eine Website?" – Die Antwort: **Sie brauchen beides**, aber für unterschiedliche Zwecke.

## Instagram: Perfekt für Aufmerksamkeit

**Stärken:**
- Schnelle Reichweite
- Direkter Kontakt
- Visuelle Präsentation
- Kostenlos starten

**Schwächen:**
- Algorithmus-Abhängigkeit
- Kurze Halbwertszeit
- Schwierige Auffindbarkeit

## Website: Perfekt für Conversion

**Stärken:**
- Google-Sichtbarkeit
- Permanente Präsenz
- Vollständige Kontrolle
- Eigentum

**Schwächen:**
- Keine virale Reichweite
- Anfangsinvestition

## Die perfekte Kombination

- **Instagram** = Ihr Schaufenster
- **Website** = Ihr Geschäft

Beide ergänzen sich perfekt. Instagram bringt die Aufmerksamkeit, die Website macht daraus Kunden.`,
    date: "28. Februar 2025",
    readTime: "6 Min",
    category: "Marketing",
    author: "Pixel",
  },
  {
    slug: "5-groesste-fehler-website-erstellung",
    title: "Die 5 größten Fehler bei der Website-Erstellung",
    excerpt: "Langsame Ladezeiten, schlechte mobile Darstellung – wir zeigen die häufigsten Fehler.",
    content: `## Fehler #1: Zu langsame Ladezeit

**53% der Nutzer** verlassen eine Seite, die länger als 3 Sekunden lädt.

**Lösung:**
- Bilder optimieren
- Gutes Hosting
- Code optimieren

## Fehler #2: Keine Mobile-Optimierung

Über **60% aller Besuche** kommen von Smartphones.

**Lösung:**
- Mobile-First Design
- Responsive Layout
- Touch-Optimierung

## Fehler #3: Keine klare Handlungsaufforderung

**Lösung:** Ein klarer CTA pro Seite – sichtbar platziert.

## Fehler #4: Vernachlässigtes SEO

**Lösung:**
- Meta-Titel setzen
- Lokales SEO
- Google My Business

## Fehler #5: DIY statt Professionalität

**Lösung:** Professionelle Hilfe holen. Zeit ist Geld.`,
    date: "20. Februar 2025",
    readTime: "7 Min",
    category: "Entwicklung",
    author: "Build",
  },
];

// Generate static paths
export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Helper function to parse content
function parseContent(content: string) {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let currentList: string[] = [];
  let inList = false;
  let key = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${key++}`} className="my-6 space-y-3">
          {currentList.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-white/70">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2997ff]" />
              <span>{item.replace(/^- \*\*|^\*\*/, '').replace(/\*\*/g, '')}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
      inList = false;
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    
    if (trimmed === '') {
      flushList();
      return;
    }

    if (trimmed.startsWith('## ')) {
      flushList();
      const text = trimmed.replace('## ', '');
      elements.push(
        <h2 key={key++} className="mt-12 mb-6 text-2xl font-bold text-white">
          {text}
        </h2>
      );
      return;
    }

    if (trimmed.startsWith('### ')) {
      flushList();
      const text = trimmed.replace('### ', '');
      elements.push(
        <h3 key={key++} className="mt-8 mb-4 text-xl font-semibold text-white/90">
          {text}
        </h3>
      );
      return;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('**')) {
      currentList.push(trimmed.replace('- ', '').replace(/\*\*/g, ''));
      inList = true;
      return;
    }

    if (inList && !trimmed.startsWith('- ')) {
      flushList();
    }

    const processedLine = trimmed
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#2997ff] hover:underline">$1</a>');
    
    elements.push(
      <p 
        key={key++} 
        className="mb-6 text-white/70 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: processedLine }}
      />
    );
  });

  flushList();
  return elements;
}

interface Props {
  params: { slug: string };
}

export default function ArticlePage({ params }: Props) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const contentElements = parseContent(article.content);

  return (
    <div className="min-h-screen relative bg-[#08090d]">
      <GridBackground />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/80 pointer-events-none" />

      <div className="pt-24 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition-all hover:border-white/20 hover:bg-white/10">
            <ArrowLeft className="h-4 w-4" />Alle Artikel
          </Link>
        </div>
      </div>

      <article className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-3 py-1.5 font-medium text-[#2997ff]">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-white/50">
              <Calendar className="h-4 w-4" />{article.date}
            </span>
            <span className="flex items-center gap-1.5 text-white/50">
              <Clock className="h-4 w-4" />{article.readTime} Lesezeit
            </span>
          </div>

          <h1 className="mb-8 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            {article.title}
          </h1>

          <div className="mb-10 flex items-center gap-4 border-b border-white/10 pb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#2997ff] to-[#5856d6] text-base font-bold text-white">
              {article.author[0]}
            </div>
            <div>
              <p className="font-semibold text-white">{article.author}</p>
              <p className="text-sm text-white/50">Liminalo Team</p>
            </div>
          </div>

          <div className="article-content">
            {contentElements}
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-br from-[#2997ff]/10 via-transparent to-[#5856d6]/10 p-6 sm:p-8">
            <h3 className="mb-3 text-xl font-semibold text-white">Bereit für Ihre eigene Website?</h3>
            <p className="mb-6 text-white/60 text-sm sm:text-base">
              Lassen Sie uns in einem kostenlosen Gespräch besprechen, wie wir Ihnen helfen können.
            </p>
            <Link href="/kontakt" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2997ff]/25">
              Kostenlose Demo anfordern
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
