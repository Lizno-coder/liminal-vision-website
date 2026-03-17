import { getIndustryPageBySlug } from "@/content/industry-pages";
import { SEOHead, createBreadcrumbSchema, createServiceSchema } from "@/lib/seo";

const page = getIndustryPageBySlug("beauty-kosmetik")!;

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
          { name: "Beauty & Kosmetik", path: page.path },
        ]),
      ]}
    />
  );
}
