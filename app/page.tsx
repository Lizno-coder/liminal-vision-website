import Contact from "@/components/contact";
import Hero from "@/components/hero";
import Portfolio from "@/components/portfolio";
import Process from "@/components/process";
import Services from "@/components/services";
import ThreeBackground from "@/components/three-background";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <ThreeBackground />

      <div className="relative z-10">
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <Contact />
      </div>
    </main>
  );
}
