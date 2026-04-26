import { SeoSchemaGroup, getIndustrySeoConfig } from "@/lib/seo";

const seo = getIndustrySeoConfig("kreative-kuenstler");

export const metadata = seo.metadata;

export default function KreativeKuenstlerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SeoSchemaGroup schemas={seo.schemas}>{children}</SeoSchemaGroup>;
}
