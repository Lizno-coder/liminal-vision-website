export type AuthStorageMode = "memory" | "d1";

export type AuthUserRecord = {
  id: string;
  email: string;
  fullName: string;
  company: string | null;
  phone: string | null;
  role: string | null;
  website: string | null;
  bio: string | null;
  avatarDataUrl: string | null;
  passwordHash: string | null;
  emailVerifiedAt: string | null;
  verificationCodeHash: string | null;
  verificationCodeExpiresAt: string | null;
  verificationAttempts: number;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
};

export type AuthPublicUser = {
  id: string;
  email: string;
  fullName: string;
  company: string | null;
  phone: string | null;
  role: string | null;
  website: string | null;
  bio: string | null;
  avatarDataUrl: string | null;
  emailVerifiedAt: string | null;
  createdAt: string;
  lastLoginAt: string | null;
};

export function toPublicUser(user: AuthUserRecord): AuthPublicUser {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    company: user.company,
    phone: user.phone,
    role: user.role,
    website: user.website,
    bio: user.bio,
    avatarDataUrl: user.avatarDataUrl,
    emailVerifiedAt: user.emailVerifiedAt,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt,
  };
}
