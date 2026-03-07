import Contact from "@/components/contact";
import Hero from "@/components/hero";
import Portfolio from "@/components/portfolio";
import Process from "@/components/process";
import Services from "@/components/services";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Portfolio />
      <Contact />
    </>
  );
}
