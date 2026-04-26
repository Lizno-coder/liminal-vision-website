import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Datenschutz | Liminalo",
  description:
    "Datenschutzerklärung von Liminalo mit Informationen zur Datenverarbeitung auf liminalo.com.",
  path: "/datenschutz",
  keywords: [
    "datenschutz liminalo",
    "datenschutzerklärung",
    "datenverarbeitung website",
  ],
});

export default function DatenschutzLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
