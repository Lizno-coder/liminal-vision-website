import Image from "next/image";

export default function CloseupShowcase() {
  return (
    <section
      aria-label="Mobile Website Showcase"
      className="relative overflow-hidden py-8 sm:py-12 md:py-16 xl:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_50%,rgba(41,151,255,0.14),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(circle_at_80%_50%,rgba(88,86,214,0.12),transparent_62%)]" />

      <div className="relative mx-auto w-full max-w-[1800px]">
        <Image
          src="/images/closeup-render-transparent.png"
          alt="Nahaufnahme einer mobilen Liminalo Website auf einem Smartphone"
          width={3840}
          height={2160}
          sizes="100vw"
          className="ml-auto block h-auto w-[165%] max-w-none translate-x-[10%] sm:w-[145%] sm:translate-x-[6%] md:w-[130%] md:translate-x-[3%] lg:w-[118%] lg:translate-x-[2%] xl:w-[108%] xl:translate-x-0"
        />
      </div>
    </section>
  );
}
