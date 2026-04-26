"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: Record<string, unknown>
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

type TurnstileWidgetProps = {
  action: string;
  resetKey: number;
  onVerify: (token: string) => void;
};

export function TurnstileWidget({
  action,
  resetKey,
  onVerify,
}: TurnstileWidgetProps) {
  const [isPreviewHost, setIsPreviewHost] = useState<boolean | null>(null);
  const siteKey = isPreviewHost === null || isPreviewHost
    ? undefined
    : process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.replace(/\\n/g, "").replace(
        /\s/g,
        ""
      );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onVerifyRef = useRef(onVerify);

  useEffect(() => {
    setIsPreviewHost(window.location.hostname.endsWith(".vercel.app"));
  }, []);

  useEffect(() => {
    onVerifyRef.current = onVerify;
  }, [onVerify]);

  useEffect(() => {
    if (!siteKey) {
      onVerifyRef.current("");
      return;
    }

    let cancelled = false;

    const cleanupWidget = () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };

    const mountWidget = () => {
      if (
        cancelled ||
        !containerRef.current ||
        !window.turnstile
      ) {
        return false;
      }

      cleanupWidget();
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: "dark",
        action,
        callback: (token: string) => onVerifyRef.current(token),
        "expired-callback": () => onVerifyRef.current(""),
        "error-callback": () => onVerifyRef.current(""),
      });

      return true;
    };

    if (mountWidget()) {
      return () => {
        cancelled = true;
        cleanupWidget();
      };
    }

    const interval = window.setInterval(() => {
      if (mountWidget()) {
        window.clearInterval(interval);
      }
    }, 150);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      cleanupWidget();
    };
  }, [action, resetKey, siteKey]);

  if (isPreviewHost === null) {
    return <div className="min-h-[66px]" />;
  }

  if (!siteKey) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white/55">
        {isPreviewHost
          ? "Turnstile ist in Vercel Previews deaktiviert. In Production wird das echte Widget geladen."
          : "Turnstile Preview: Setzen Sie `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, um das echte Widget zu laden."}
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
      />
      <div ref={containerRef} className="min-h-[66px]" />
    </>
  );
}
