import { SeoSchemaGroup, getIndustrySeoConfig } from "@/lib/seo";

const seo = getIndustrySeoConfig("handwerk-gewerbe");

export const metadata = seo.metadata;

export default function HandwerkGewerbeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SeoSchemaGroup schemas={seo.schemas}>{children}</SeoSchemaGroup>;
}
