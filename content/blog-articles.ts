export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  dateLabel: string;
  readTime: string;
  category: string;
  author: string;
  keywords: string[];
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "warum-jede-kleine-firma-website-braucht",
    title: "Warum jede kleine Firma eine Website braucht",
    excerpt:
      "Instagram reicht nicht mehr. Eine eigene Website ist das Fundament Ihrer digitalen Präsenz und macht Sie unabhängiger von Plattformen.",
    content: `## Das Problem mit Instagram und Co.

Viele kleine Unternehmen denken: "Ich habe doch Instagram, da erreiche ich meine Kunden." Das stimmt nur teilweise. Social-Media-Plattformen haben einen großen Nachteil: **Sie gehören Ihnen nicht.**

### Algorithmen bestimmen, wer Sie sieht

Auf Instagram entscheidet ein Algorithmus, wer Ihre Inhalte zu Gesicht bekommt. Selbst Ihre eigenen Follower sehen nicht automatisch alles, was Sie posten.

### Gesperrt? Geändert? Alles weg.

Wenn Ihr Account plötzlich eingeschränkt oder gelöscht wird, sind Reichweite und Inhalte sofort gefährdet. Bei einer eigenen Website behalten Sie die Kontrolle.

## Warum eine Website anders ist

### 1. Sie gehört Ihnen

Ihre Website ist Ihr eigener digitaler Standort. Kein Algorithmus, keine fremde Plattform und keine willkürlichen Regeln.

### 2. Google kann Sie finden

Wenn jemand nach "Café München" oder "Schreiner Rosenheim" sucht, erscheinen Websites in den Suchergebnissen. Genau dort wollen Sie sichtbar sein.

### 3. Professionalität schafft Vertrauen

Eine professionelle Website signalisiert Seriosität und macht sofort klar, dass Ihr Unternehmen ernst genommen werden will.

### 4. Alles an einem Ort

Öffnungszeiten, Leistungen, Preise, Kontakt und Anfahrt stehen gebündelt an einem Ort. Das spart Rückfragen und erleichtert die Entscheidung.

## Aber Websites sind doch teuer?

Nicht zwingend:

- **1 Seite**: Ab 50 €
- **3 Seiten**: Ab 100 €
- **5 Seiten**: Ab 150 €

## Fazit

Social Media ist wichtig, aber eher als Ergänzung. Das stabile Fundament Ihrer digitalen Sichtbarkeit sollte eine eigene Website sein.

**Bereit für Ihre Website?** [Kontakt aufnehmen](/kontakt).`,
    publishedAt: "2026-03-05",
    updatedAt: "2026-03-05",
    dateLabel: "5. März 2026",
    readTime: "5 Min",
    category: "Strategie",
    author: "Liminalo",
    keywords: [
      "website für kleine unternehmen",
      "digitale präsenz",
      "website erstellen lassen",
      "lokale sichtbarkeit",
    ],
  },
  {
    slug: "website-vs-instagram",
    title: "Website vs. Instagram: Was bringt mehr?",
    excerpt:
      "Social Media ist wichtig, aber Ihre Website bleibt Ihr digitales Eigentum. Beide Kanäle erfüllen unterschiedliche Aufgaben.",
    content: `## Das falsche Entweder-oder

"Brauche ich wirklich eine Website?" Die ehrliche Antwort ist: **Sie brauchen beides**, aber für unterschiedliche Zwecke.

## Instagram: Stark für Aufmerksamkeit

**Stärken:**
- Schnelle Reichweite
- Direkter Kontakt
- Visuelle Präsentation
- Einfacher Start

**Schwächen:**
- Abhängigkeit vom Algorithmus
- Inhalte verschwinden schnell
- Schwierig über Google auffindbar

## Website: Stark für Conversion

**Stärken:**
- Sichtbarkeit in Google
- Permanente Präsenz
- Volle Kontrolle über Inhalte und Struktur
- Professionellerer Gesamteindruck

**Schwächen:**
- Braucht eine erste Investition
- Keine automatische virale Reichweite

## Die perfekte Kombination

- **Instagram** = Aufmerksamkeit und Reichweite
- **Website** = Vertrauen, Information und Anfragen

Instagram bringt Menschen auf Sie aufmerksam. Ihre Website macht daraus konkrete Kontakte, Reservierungen oder Anfragen.`,
    publishedAt: "2026-02-28",
    updatedAt: "2026-02-28",
    dateLabel: "28. Februar 2026",
    readTime: "6 Min",
    category: "Marketing",
    author: "Liminalo",
    keywords: [
      "website vs instagram",
      "website oder social media",
      "online sichtbar werden",
      "kundenanfragen website",
    ],
  },
  {
    slug: "5-groesste-fehler-website-erstellung",
    title: "Die 5 größten Fehler bei der Website-Erstellung",
    excerpt:
      "Langsame Ladezeiten, schlechte mobile Darstellung und fehlende SEO-Basis kosten Sichtbarkeit und Anfragen. Diese Fehler sollten Sie vermeiden.",
    content: `## Fehler 1: Zu langsame Ladezeit

Wenn eine Website zu langsam lädt, springen Nutzer früh wieder ab.

**Lösung:**
- Bilder optimieren
- Solides Hosting wählen
- Unnötigen Code reduzieren

## Fehler 2: Keine Mobile-Optimierung

Ein großer Teil der Besucher kommt über Smartphones. Wenn die mobile Darstellung schwach ist, verlieren Sie Vertrauen und Anfragen.

**Lösung:**
- Mobile-First Design
- Saubere responsive Layouts
- Touch-freundliche Bedienung

## Fehler 3: Kein klarer Call-to-Action

Wenn Besucher nicht sofort sehen, was sie tun sollen, sinkt die Conversion.

**Lösung:**
- Ein klarer CTA pro Seite
- Sichtbare Kontaktmöglichkeit
- Kurze Wege zur Anfrage

## Fehler 4: Vernachlässigtes SEO

Ohne Titles, Descriptions, Sitemap und relevante Inhalte bleibt viel Potenzial ungenutzt.

**Lösung:**
- Meta-Titel und Descriptions setzen
- Lokale Suchbegriffe einbauen
- Saubere technische SEO umsetzen

## Fehler 5: DIY statt Professionalität

Eine schwache Website kostet oft mehr, als sie spart, weil Vertrauen und Sichtbarkeit verloren gehen.

**Lösung:**
- Mit klarer Strategie starten
- Struktur, Design und SEO zusammendenken
- Inhalte auf Conversion ausrichten`,
    publishedAt: "2026-02-20",
    updatedAt: "2026-02-20",
    dateLabel: "20. Februar 2026",
    readTime: "7 Min",
    category: "Entwicklung",
    author: "Liminalo",
    keywords: [
      "fehler website erstellen",
      "website seo fehler",
      "mobile optimierung website",
      "website ladezeit verbessern",
    ],
  },
];

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug);
}
