import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Impressum | Liminalo",
  description:
    "Impressum von Liminalo mit allen Pflichtangaben zu Anbieter, Kontakt und Verantwortlichkeit.",
  path: "/impressum",
  keywords: [
    "impressum liminalo",
    "anbieterkennzeichnung",
    "rechtliche angaben website",
  ],
});

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
