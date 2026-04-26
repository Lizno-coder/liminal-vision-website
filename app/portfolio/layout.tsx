import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

const title = "Portfolio und Branchenbeispiele für Websites | Liminalo";
const description =
  "Entdecken Sie Branchenbeispiele und Website-Konzepte von Liminalo. Moderne Auftritte für Restaurants, Handwerk, Studios, Dienstleister und lokale Unternehmen.";
const keywords = [
  "webdesign portfolio",
  "website beispiele",
  "branchenbeispiele website",
  "portfolio webagentur",
  "landingpage beispiele",
];

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/portfolio",
  keywords,
});

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
