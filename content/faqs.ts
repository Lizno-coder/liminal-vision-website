export type FAQItem = {
  question: string;
  answer: string;
};

export const homeFaqs: FAQItem[] = [
  {
    question: "Was kostet eine Website?",
    answer:
      "Eine einfache Website startet ab 50 €. Mit unserem Preisrechner erhalten Sie eine erste Schätzung, der finale Preis wird vor Projektstart transparent festgelegt.",
  },
  {
    question: "Wie lange dauert die Umsetzung?",
    answer:
      "Je nach Umfang dauert die Umsetzung in der Regel zwischen 3 und 14 Tagen. Kleine Landingpages sind schneller live, größere Projekte brauchen etwas mehr Abstimmung.",
  },
  {
    question: "Wie läuft die Bezahlung ab?",
    answer:
      "Üblich sind 50 Prozent bei Projektstart und 50 Prozent bei Fertigstellung. Für Ihre Anfrage verlangen wir keine Vorkasse.",
  },
  {
    question: "Kann ich später Änderungen an der Website machen?",
    answer:
      "Ja. Auf Wunsch zeigen wir Ihnen, wie Sie Inhalte selbst pflegen. Alternativ unterstützen wir Sie mit Wartung und späteren Änderungen.",
  },
];
