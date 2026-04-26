import { NextRequest, NextResponse } from "next/server";

import {
  AUTH_CODE_TTL_MS,
  AUTH_REGISTER_LIMIT,
} from "@/lib/auth/config";
import {
  generateVerificationCode,
  getPasswordValidationError,
  hashPassword,
  hashVerificationCode,
  normalizeEmail,
} from "@/lib/auth/crypto";
import { sendVerificationCodeEmail } from "@/lib/auth/cloudflare-email";
import { getAuthStore } from "@/lib/auth/store";
import { verifyTurnstileToken } from "@/lib/auth/turnstile";
import { getClientIp } from "@/lib/request";
import { takeRateLimit } from "@/lib/rate-limit";

type RegisterBody = {
  fullName?: unknown;
  email?: unknown;
  company?: unknown;
  password?: unknown;
  turnstileToken?: unknown;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function formatAuthError(error: unknown): string {
  const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";

  if (message === "CLOUDFLARE_EMAIL_CONFIG_MISSING") {
    return "Cloudflare Email ist noch nicht konfiguriert.";
  }

  if (message.startsWith("CLOUDFLARE_EMAIL_SEND_FAILED:")) {
    return "Der Bestaetigungscode konnte gerade nicht per E-Mail versendet werden.";
  }

  if (message === "TURNSTILE_SECRET_KEY_MISSING") {
    return "Turnstile ist noch nicht konfiguriert.";
  }

  if (message === "AUTH_SESSION_SECRET_MISSING") {
    return "AUTH_SESSION_SECRET fehlt in den Environment Variables.";
  }

  return "Die Registrierung konnte gerade nicht gestartet werden.";
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterBody;
    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
    const email = normalizeEmail(
      typeof body.email === "string" ? body.email : ""
    );
    const company =
      typeof body.company === "string" && body.company.trim()
        ? body.company.trim().slice(0, 80)
        : null;
    const password = typeof body.password === "string" ? body.password : "";
    const turnstileToken =
      typeof body.turnstileToken === "string" ? body.turnstileToken : "";

    if (fullName.length < 2) {
      return NextResponse.json(
        { error: "Bitte geben Sie Ihren Namen ein." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Bitte geben Sie eine gueltige E-Mail-Adresse ein." },
        { status: 400 }
      );
    }

    const passwordError = getPasswordValidationError(password);

    if (passwordError) {
      return NextResponse.json({ error: passwordError }, { status: 400 });
    }

    const ipAddress = getClientIp(request);
    const requestHost = request.headers.get("host");
    const isVercelPreviewHost = /^.+-[a-z0-9]+-[a-z0-9-]+\.vercel\.app$/.test(
      (requestHost || "").toLowerCase()
    );
    const rateLimit = takeRateLimit(
      `auth:register:${ipAddress}`,
      AUTH_REGISTER_LIMIT
    );

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Zu viele Registrierungen. Bitte warten Sie kurz." },
        { status: 429 }
      );
    }

    const humanCheck = await verifyTurnstileToken(
      turnstileToken,
      ipAddress,
      requestHost
    );

    if (!humanCheck.ok) {
      return NextResponse.json(
        { error: humanCheck.message || "Die Sicherheitspruefung ist fehlgeschlagen." },
        { status: 400 }
      );
    }

    const store = getAuthStore();
    const existingUser = await store.findUserByEmail(email);

    if (existingUser?.emailVerifiedAt) {
      return NextResponse.json(
        { error: "Fuer diese E-Mail existiert bereits ein bestaetigtes Konto." },
        { status: 409 }
      );
    }

    const verificationCode = generateVerificationCode();
    const passwordHash = await hashPassword(password);

    await store.savePendingUser({
      email,
      fullName: fullName.slice(0, 80),
      company,
      passwordHash,
      verificationCodeHash: hashVerificationCode(email, verificationCode),
      verificationCodeExpiresAt: new Date(
        Date.now() + AUTH_CODE_TTL_MS
      ).toISOString(),
    });

    const mailResult = await sendVerificationCodeEmail({
      to: email,
      fullName: fullName.slice(0, 80),
      code: verificationCode,
      allowPreviewFallback: isVercelPreviewHost,
    });

    return NextResponse.json({
      success: true,
      email,
      storageMode: store.mode,
      mailMode: mailResult.mode,
      previewCode: mailResult.previewCode || null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: formatAuthError(error) },
      { status: 500 }
    );
  }
}
