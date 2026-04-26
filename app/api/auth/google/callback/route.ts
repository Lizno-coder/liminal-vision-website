import { NextRequest, NextResponse } from "next/server";

import {
  buildSessionCookie,
  createSessionValue,
} from "@/lib/auth/session";
import { getAuthStore } from "@/lib/auth/store";
import { toPublicUser } from "@/lib/auth/types";

const GOOGLE_STATE_COOKIE = "liminalo_google_oauth_state";

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
};

type GoogleUserInfo = {
  email?: string;
  email_verified?: boolean;
  name?: string;
};

function getBaseUrl(request: NextRequest): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    `${request.nextUrl.protocol}//${request.headers.get("host")}`
  );
}

function redirectToAccount(request: NextRequest, query: string) {
  return NextResponse.redirect(new URL(`/konto?${query}`, request.url));
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get(GOOGLE_STATE_COOKIE)?.value;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!code || !state || !expectedState || state !== expectedState) {
    return redirectToAccount(request, "error=google_state");
  }

  if (!clientId || !clientSecret) {
    return redirectToAccount(request, "error=google_not_configured");
  }

  const redirectUri = `${getBaseUrl(request).replace(/\/$/, "")}/api/auth/google/callback`;
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
    cache: "no-store",
  });

  const tokenData = (await tokenResponse.json()) as GoogleTokenResponse;

  if (!tokenResponse.ok || !tokenData.access_token) {
    return redirectToAccount(request, "error=google_token");
  }

  const userResponse = await fetch(
    "https://openidconnect.googleapis.com/v1/userinfo",
    {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
      cache: "no-store",
    }
  );
  const googleUser = (await userResponse.json()) as GoogleUserInfo;

  if (!userResponse.ok || !googleUser.email || !googleUser.email_verified) {
    return redirectToAccount(request, "error=google_email");
  }

  const store = getAuthStore();
  const user = await store.upsertOAuthUser({
    email: googleUser.email,
    fullName: googleUser.name || googleUser.email.split("@")[0],
  });
  const publicUser = toPublicUser(user);
  const response = redirectToAccount(request, "auth=google");

  response.cookies.set(buildSessionCookie(createSessionValue(publicUser)));
  response.cookies.set({
    name: GOOGLE_STATE_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });

  return response;
}
