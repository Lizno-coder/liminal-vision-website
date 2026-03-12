import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { cn } from "@/lib/utils";

const logos = [
  { src: "https://svgl.app/library/nvidia-wordmark-light.svg", alt: "Nvidia Logo" },
  { src: "https://svgl.app/library/supabase_wordmark_light.svg", alt: "Supabase Logo" },
  { src: "https://svgl.app/library/openai_wordmark_light.svg", alt: "OpenAI Logo" },
  { src: "https://svgl.app/library/turso-wordmark-light.svg", alt: "Turso Logo" },
  { src: "https://svgl.app/library/vercel_wordmark.svg", alt: "Vercel Logo" },
  { src: "https://svgl.app/library/github_wordmark_light.svg", alt: "GitHub Logo" },
  { src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg", alt: "Claude AI Logo" },
  { src: "https://svgl.app/library/clerk-wordmark-light.svg", alt: "Clerk Logo" },
];

export default function LogoCloudSection() {
  return (
    <section className="relative py-16 md:py-20">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className={cn(
          "-z-10 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40vmin] w-[80vmin]",
          "bg-[radial-gradient(ellipse_at_center,rgba(41,151,255,0.15),transparent_50%)]",
          "blur-[60px]"
        )}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-lg font-medium tracking-tight text-white/60 md:text-xl">
          <span className="text-white/80">Vertraut von führenden Unternehmen.</span>
          <br />
          <span className="bg-gradient-to-r from-[#2997ff] to-[#5856d6] bg-clip-text text-transparent font-semibold">
            Genutzt von den Besten.
          </span>
        </h2>

        {/* Decorative line */}
        <div className="mx-auto mb-8 h-px max-w-xs bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Logo Cloud */}
        <LogoCloud logos={logos} />

        {/* Decorative line */}
        <div className="mx-auto mt-8 h-px max-w-xs bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </section>
  );
}
