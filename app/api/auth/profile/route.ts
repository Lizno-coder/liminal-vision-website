import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { AUTH_SESSION_COOKIE } from "@/lib/auth/config";
import { clearSessionCookie, readSessionValue } from "@/lib/auth/session";
import { getAuthStore, type UpdateUserProfileInput } from "@/lib/auth/store";
import { toPublicUser } from "@/lib/auth/types";

export const dynamic = "force-dynamic";

const MAX_AVATAR_DATA_URL_LENGTH = 420_000;

function cleanText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : null;
}

function cleanRequiredText(value: unknown, maxLength: number): string | null {
  const text = cleanText(value, maxLength);
  return text && text.length >= 2 ? text : null;
}

function cleanAvatar(value: unknown): string | null {
  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }

  if (value.length > MAX_AVATAR_DATA_URL_LENGTH) {
    throw new Error("AVATAR_TOO_LARGE");
  }

  if (!/^data:image\/(png|jpe?g|webp);base64,[a-z0-9+/=]+$/i.test(value)) {
    throw new Error("AVATAR_INVALID");
  }

  return value;
}

async function getVerifiedUser() {
  const store = getAuthStore();
  const cookieStore = cookies();
  const sessionValue = cookieStore.get(AUTH_SESSION_COOKIE)?.value;
  const session = readSessionValue(sessionValue);

  if (!session) {
    return { store, user: null, clearCookie: Boolean(sessionValue) };
  }

  const user = await store.findUserById(session.sub);
  return {
    store,
    user: user?.emailVerifiedAt ? user : null,
    clearCookie: !user || !user.emailVerifiedAt,
  };
}

export async function GET() {
  const { store, user, clearCookie } = await getVerifiedUser();
  const response = NextResponse.json({
    user: user ? toPublicUser(user) : null,
    storageMode: store.mode,
  });

  if (clearCookie) {
    response.cookies.set(clearSessionCookie());
  }

  return response;
}

export async function PATCH(request: Request) {
  const { store, user, clearCookie } = await getVerifiedUser();

  if (!user) {
    const response = NextResponse.json(
      { success: false, error: "Bitte melden Sie sich erneut an." },
      { status: 401 }
    );

    if (clearCookie) {
      response.cookies.set(clearSessionCookie());
    }

    return response;
  }

  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { success: false, error: "Ungueltige Profildaten." },
      { status: 400 }
    );
  }

  const fullName = cleanRequiredText(payload.fullName, 90);

  if (!fullName) {
    return NextResponse.json(
      { success: false, error: "Bitte geben Sie einen Namen an." },
      { status: 400 }
    );
  }

  let avatarDataUrl: string | null;

  try {
    avatarDataUrl = cleanAvatar(payload.avatarDataUrl);
  } catch {
    return NextResponse.json(
      { success: false, error: "Das Profilbild ist ungueltig oder zu gross." },
      { status: 400 }
    );
  }

  const profile: UpdateUserProfileInput = {
    fullName,
    company: cleanText(payload.company, 120),
    phone: cleanText(payload.phone, 60),
    role: cleanText(payload.role, 80),
    website: cleanText(payload.website, 180),
    bio: cleanText(payload.bio, 420),
    avatarDataUrl,
  };
  const updatedUser = await store.updateUserProfile(user.id, profile);

  if (!updatedUser) {
    return NextResponse.json(
      { success: false, error: "Das Profil konnte nicht gespeichert werden." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    user: toPublicUser(updatedUser),
    storageMode: store.mode,
  });
}
