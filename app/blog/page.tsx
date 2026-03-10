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
    excerpt: "Instagram reicht nicht mehr. Hier erklären wir, warum eine eigene Website das Fundament Ihrer digitalen Präsenz ist – und wie sie Ihnen langfristig Kunden bringt.",
    content: `
## Das Problem mit Instagram & Co.

Viele kleine Unternehmer und Influencer denken: „Ich habe doch Instagram, da erreiche ich meine Kunden.