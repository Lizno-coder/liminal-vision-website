import { getIndustryPageBySlug } from "@/content/industry-pages";
import { SEOHead, createBreadcrumbSchema, createServiceSchema } from "@/lib/seo";

const page = getIndustryPageBySlug("dienstleister")!;

export default function Head() {
  return (
    <SEOHead
      title={page.title}
      description={page.description}
      path={page.path}
      keywords={page.keywords}
      schemas={[
        createServiceSchema({
          name: page.serviceName,
          description: page.description,
          path: page.path,
          keywords: page.keywords,
        }),
        createBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: "Branchen", path: "/branchen" },
          { name: page.serviceName, path: page.path },
        ]),
      ]}
    />
  );
}
