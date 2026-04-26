import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AGB | Liminalo",
  description: "Allgemeine Geschäftsbedingungen von Liminalo.",
  path: "/agb",
  keywords: [
    "agb liminalo",
    "allgemeine geschäftsbedingungen",
    "vertragsbedingungen website",
  ],
});

export default function AgbLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
