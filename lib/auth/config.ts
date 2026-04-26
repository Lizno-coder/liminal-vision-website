import "server-only";

export const AUTH_SESSION_COOKIE = "liminalo_session";
export const AUTH_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;
export const AUTH_CODE_TTL_MS = 1000 * 60 * 15;

export const AUTH_REGISTER_LIMIT = {
  limit: 5,
  windowMs: 1000 * 60 * 10,
};

export const AUTH_LOGIN_LIMIT = {
  limit: 10,
  windowMs: 1000 * 60 * 10,
};

export const AUTH_VERIFY_LIMIT = {
  limit: 10,
  windowMs: 1000 * 60 * 10,
};

export function isProduction(): boolean {
  if (process.env.AUTH_PREVIEW_MODE === "true") {
    return false;
  }

  return (
    process.env.NODE_ENV === "production" &&
    process.env.VERCEL_ENV !== "preview" &&
    process.env.VERCEL_ENV !== "development"
  );
}

export function getSessionSecret(): string {
  const secret = process.env.AUTH_SESSION_SECRET;

  if (secret) {
    return secret;
  }

  if (!isProduction()) {
    return "liminalo-dev-session-secret";
  }

  throw new Error("AUTH_SESSION_SECRET_MISSING");
}

export function getCodeSecret(): string {
  const secret = process.env.AUTH_CODE_SECRET || process.env.AUTH_SESSION_SECRET;

  if (secret) {
    return secret;
  }

  if (!isProduction()) {
    return "liminalo-dev-code-secret";
  }

  throw new Error("AUTH_CODE_SECRET_MISSING");
}
