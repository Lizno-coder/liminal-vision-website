import { NextRequest, NextResponse } from "next/server";

import { AUTH_LOGIN_LIMIT } from "@/lib/auth/config";
import { normalizeEmail, verifyPassword } from "@/lib/auth/crypto";
import {
  buildSessionCookie,
  createSessionValue,
} from "@/lib/auth/session";
import { getAuthStore } from "@/lib/auth/store";
import { verifyTurnstileToken } from "@/lib/auth/turnstile";
import { toPublicUser } from "@/lib/auth/types";
import { getClientIp } from "@/lib/request";
import { takeRateLimit } from "@/lib/rate-limit";

type LoginBody = {
  email?: unknown;
  password?: unknown;
  turnstileToken?: unknown;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginBody;
    const email = normalizeEmail(
      typeof body.email === "string" ? body.email : ""
    );
    const password = typeof body.password === "string" ? body.password : "";
    const turnstileToken =
      typeof body.turnstileToken === "string" ? body.turnstileToken : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Bitte geben Sie E-Mail und Passwort ein." },
        { status: 400 }
      );
    }

    const ipAddress = getClientIp(request);
    const rateLimit = takeRateLimit(
      `auth:login:${ipAddress}:${email}`,
      AUTH_LOGIN_LIMIT
    );

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Zu viele Login-Versuche. Bitte warten Sie kurz." },
        { status: 429 }
      );
    }

    const humanCheck = await verifyTurnstileToken(
      turnstileToken,
      ipAddress,
      request.headers.get("host")
    );

    if (!humanCheck.ok) {
      return NextResponse.json(
        { error: humanCheck.message || "Die Sicherheitspruefung ist fehlgeschlagen." },
        { status: 400 }
      );
    }

    const store = getAuthStore();
    const user = await store.findUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: "E-Mail oder Passwort sind ungueltig." },
        { status: 401 }
      );
    }

    if (!user.emailVerifiedAt) {
      return NextResponse.json(
        {
          error: "Bitte bestaetigen Sie zuerst Ihren E-Mail-Code.",
          needsVerification: true,
          email,
        },
        { status: 403 }
      );
    }

    if (!user.passwordHash) {
      return NextResponse.json(
        { error: "Dieses Konto wurde mit Google erstellt. Bitte mit Google anmelden." },
        { status: 401 }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "E-Mail oder Passwort sind ungueltig." },
        { status: 401 }
      );
    }

    const loggedInUser = (await store.touchLogin(user.id)) || user;
    const publicUser = toPublicUser(loggedInUser);
    const response = NextResponse.json({
      success: true,
      user: publicUser,
      storageMode: store.mode,
    });

    response.cookies.set(buildSessionCookie(createSessionValue(publicUser)));

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (message === "TURNSTILE_SECRET_KEY_MISSING") {
      return NextResponse.json(
        { error: "Turnstile ist noch nicht konfiguriert." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Die Anmeldung konnte gerade nicht abgeschlossen werden." },
      { status: 500 }
    );
  }
}
