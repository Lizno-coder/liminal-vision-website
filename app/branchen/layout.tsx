import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

const title = "Webdesign für Branchen und lokale Betriebe | Liminalo";
const description =
  "Branchenspezifische Websites für Restaurants, Handwerk, Fitness, Beauty, Einzelhandel, Praxen und weitere lokale Unternehmen. Liminalo entwickelt Seiten mit klarer Conversion und SEO-Basis.";
const keywords = [
  "webdesign branchen",
  "branchenspezifische websites",
  "website für lokale unternehmen",
  "landingpages branchen",
  "webdesign branchenlösungen",
];

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/branchen",
  keywords,
});

export default function BranchenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
