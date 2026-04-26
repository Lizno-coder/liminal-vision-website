import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { AUTH_SESSION_COOKIE } from "@/lib/auth/config";
import { clearSessionCookie, readSessionValue } from "@/lib/auth/session";
import { getAuthStore } from "@/lib/auth/store";
import { toPublicUser } from "@/lib/auth/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const store = getAuthStore();
  const cookieStore = cookies();
  const sessionValue = cookieStore.get(AUTH_SESSION_COOKIE)?.value;
  const session = readSessionValue(sessionValue);

  if (!session) {
    const response = NextResponse.json({
      user: null,
      storageMode: store.mode,
    });

    if (sessionValue) {
      response.cookies.set(clearSessionCookie());
    }

    return response;
  }

  const user = await store.findUserById(session.sub);

  if (!user || !user.emailVerifiedAt) {
    const response = NextResponse.json({
      user: null,
      storageMode: store.mode,
    });
    response.cookies.set(clearSessionCookie());
    return response;
  }

  return NextResponse.json({
    user: toPublicUser(user),
    storageMode: store.mode,
  });
}
