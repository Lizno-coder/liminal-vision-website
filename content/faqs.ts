export type FAQItem = {
  question: string;
  answer: string;
};

export const homeFaqs: FAQItem[] = [
  {
    question: "Was kostet eine Website?",
    answer:
      "Eine einfache Website startet ab 50 EUR. Mit unserem Preisrechner erhalten Sie eine erste Schaetzung, der finale Preis wird vor Projektstart transparent festgelegt.",
  },
  {
    question: "Wie lange dauert die Umsetzung?",
    answer:
      "Je nach Umfang dauert die Umsetzung in der Regel zwischen 3 und 14 Tagen. Kleine Landingpages sind schneller live, groessere Projekte brauchen etwas mehr Abstimmung.",
  },
  {
    question: "Wie laeuft die Bezahlung ab?",
    answer:
      "Ueblich sind 50 Prozent bei Projektstart und 50 Prozent bei Fertigstellung. Fuer die Demo verlangen wir keine Vorkasse.",
  },
  {
    question: "Kann ich spaeter Aenderungen an der Website machen?",
    answer:
      "Ja. Auf Wunsch zeigen wir Ihnen, wie Sie Inhalte selbst pflegen. Alternativ unterstuetzen wir Sie mit Wartung und spaeteren Aenderungen.",
  },
];
