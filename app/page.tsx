import Blog from "@/components/blog";
import Contact from "@/components/contact";
import FAQ from "@/components/faq";
import Hero from "@/components/hero";
import LogoCloudSection from "@/components/logo-cloud-section";
import Pricing from "@/components/pricing";
import Process from "@/components/process";
import Services from "@/components/services";
import { WorkScrollSection } from "@/components/work-scroll";
import { TextColor } from "@/components/ui/text-color";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkScrollSection />
      <Services />
      <Process />
      <Pricing />
      <FAQ />
      <LogoCloudSection />
      <Blog />
      <Contact />
      <TextColor />
    </>
  );
}
