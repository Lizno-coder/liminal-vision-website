import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import { AUTH_SESSION_COOKIE, AUTH_SESSION_TTL_MS, getSessionSecret } from "./config";
import type { AuthPublicUser } from "./types";

type SessionPayload = {
  sub: string;
  email: string;
  fullName: string;
  exp: number;
};

function signPayload(payload: string): string {
  return createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("base64url");
}

export function createSessionValue(user: AuthPublicUser): string {
  const payload: SessionPayload = {
    sub: user.id,
    email: user.email,
    fullName: user.fullName,
    exp: Date.now() + AUTH_SESSION_TTL_MS,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function readSessionValue(value?: string | null): SessionPayload | null {
  if (!value) {
    return null;
  }

  const [encodedPayload, signature] = value.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (actualBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(actualBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as SessionPayload;

    if (payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function buildSessionCookie(value: string) {
  return {
    name: AUTH_SESSION_COOKIE,
    value,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(Date.now() + AUTH_SESSION_TTL_MS),
  };
}

export function clearSessionCookie() {
  return {
    name: AUTH_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  };
}
