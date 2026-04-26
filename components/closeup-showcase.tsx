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
          quality={86}
          sizes="(max-width: 639px) 182vw, (max-width: 767px) 145vw, (max-width: 1023px) 130vw, (max-width: 1279px) 118vw, (max-width: 1800px) 108vw, 1944px"
          className="relative left-1/2 block h-auto w-[182%] max-w-none -translate-x-[50.7%] sm:left-auto sm:ml-auto sm:w-[145%] sm:translate-x-[6%] md:w-[130%] md:translate-x-[3%] lg:w-[118%] lg:translate-x-[2%] xl:w-[108%] xl:translate-x-0"
        />
      </div>
    </section>
  );
}
