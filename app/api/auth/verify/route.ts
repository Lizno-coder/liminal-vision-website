import { NextRequest, NextResponse } from "next/server";

import { AUTH_VERIFY_LIMIT } from "@/lib/auth/config";
import { verifyVerificationCode, normalizeEmail } from "@/lib/auth/crypto";
import {
  buildSessionCookie,
  createSessionValue,
} from "@/lib/auth/session";
import { getAuthStore } from "@/lib/auth/store";
import { toPublicUser } from "@/lib/auth/types";
import { getClientIp } from "@/lib/request";
import { takeRateLimit } from "@/lib/rate-limit";

type VerifyBody = {
  email?: unknown;
  code?: unknown;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as VerifyBody;
    const email = normalizeEmail(
      typeof body.email === "string" ? body.email : ""
    );
    const code = typeof body.code === "string" ? body.code.trim() : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Bitte geben Sie eine gueltige E-Mail-Adresse ein." },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { error: "Bitte geben Sie den 6-stelligen Code ein." },
        { status: 400 }
      );
    }

    const ipAddress = getClientIp(request);
    const rateLimit = takeRateLimit(`auth:verify:${ipAddress}`, AUTH_VERIFY_LIMIT);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Zu viele Versuche. Bitte warten Sie kurz." },
        { status: 429 }
      );
    }

    const store = getAuthStore();
    const user = await store.findUserByEmail(email);

    if (!user || !user.verificationCodeHash || !user.verificationCodeExpiresAt) {
      return NextResponse.json(
        { error: "Fuer diese E-Mail gibt es keinen offenen Code." },
        { status: 404 }
      );
    }

    if (user.verificationAttempts >= 5) {
      return NextResponse.json(
        { error: "Zu viele falsche Codes. Bitte starten Sie die Registrierung neu." },
        { status: 429 }
      );
    }

    if (new Date(user.verificationCodeExpiresAt).getTime() < Date.now()) {
      return NextResponse.json(
        { error: "Der Code ist abgelaufen. Bitte registrieren Sie sich erneut." },
        { status: 400 }
      );
    }

    if (!verifyVerificationCode(email, code, user.verificationCodeHash)) {
      await store.incrementVerificationAttempts(user.id);

      return NextResponse.json(
        { error: "Der eingegebene Code ist ungueltig." },
        { status: 400 }
      );
    }

    const verifiedUser = await store.markUserVerified(user.id);

    if (!verifiedUser) {
      return NextResponse.json(
        { error: "Das Konto konnte nicht bestaetigt werden." },
        { status: 500 }
      );
    }

    const loggedInUser = (await store.touchLogin(verifiedUser.id)) || verifiedUser;
    const publicUser = toPublicUser(loggedInUser);
    const response = NextResponse.json({
      success: true,
      user: publicUser,
      storageMode: store.mode,
    });

    response.cookies.set(buildSessionCookie(createSessionValue(publicUser)));

    return response;
  } catch {
    return NextResponse.json(
      { error: "Die Verifizierung konnte gerade nicht abgeschlossen werden." },
      { status: 500 }
    );
  }
}
