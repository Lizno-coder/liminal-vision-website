import "server-only";

import { isProduction } from "./config";

type TurnstileResult = {
  ok: boolean;
  mode: "verified" | "skipped";
  message?: string;
};

export async function verifyTurnstileToken(
  token: string,
  ipAddress?: string,
  requestHost?: string | null
): Promise<TurnstileResult> {
  const host = (requestHost || "").toLowerCase();
  const isVercelPreviewHost =
    /^.+-[a-z0-9]+-[a-z0-9-]+\.vercel\.app$/.test(host);

  if (!isProduction() || isVercelPreviewHost) {
    return { ok: true, mode: "skipped" };
  }

  const secret =
    (process.env.TURNSTILE_SECRET_KEY ||
      process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ||
      "")
      .replace(/\\n/g, "")
      .replace(/\s/g, "");

  if (!secret) {
    throw new Error("TURNSTILE_SECRET_KEY_MISSING");
  }

  if (!token) {
    return {
      ok: false,
      mode: "verified",
      message: "Bitte bestaetigen Sie zuerst die Turnstile-Pruefung.",
    };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (ipAddress && ipAddress !== "unknown") {
    body.set("remoteip", ipAddress);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("TURNSTILE_REQUEST_FAILED");
  }

  const data = (await response.json()) as {
    success?: boolean;
    "error-codes"?: string[];
  };

  if (!data.success) {
    return {
      ok: false,
      mode: "verified",
      message: "Die Turnstile-Pruefung konnte nicht bestaetigt werden.",
    };
  }

  return { ok: true, mode: "verified" };
}
