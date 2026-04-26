import "server-only";

import { createUserId, normalizeEmail } from "./crypto";
import type { AuthStorageMode, AuthUserRecord } from "./types";

type SavePendingUserInput = {
  email: string;
  fullName: string;
  company: string | null;
  passwordHash: string;
  verificationCodeHash: string;
  verificationCodeExpiresAt: string;
};

type UpsertOAuthUserInput = {
  email: string;
  fullName: string;
};

type AuthStore = {
  mode: AuthStorageMode;
  findUserByEmail(email: string): Promise<AuthUserRecord | null>;
  findUserById(id: string): Promise<AuthUserRecord | null>;
  savePendingUser(input: SavePendingUserInput): Promise<AuthUserRecord>;
  upsertOAuthUser(input: UpsertOAuthUserInput): Promise<AuthUserRecord>;
  markUserVerified(userId: string): Promise<AuthUserRecord | null>;
  incrementVerificationAttempts(userId: string): Promise<AuthUserRecord | null>;
  touchLogin(userId: string): Promise<AuthUserRecord | null>;
};

type DbValue = string | number | null;

type DbUserRow = {
  id: string;
  email: string;
  full_name: string;
  company: string | null;
  password_hash: string | null;
  email_verified_at: string | null;
  verification_code_hash: string | null;
  verification_code_expires_at: string | null;
  verification_attempts: number | string;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
};

type D1QueryResult<T> = {
  success?: boolean;
  results?: T[];
};

type D1ApiResponse<T> = {
  success?: boolean;
  result?: D1QueryResult<T> | D1QueryResult<T>[];
  errors?: Array<{ code?: number; message?: string }>;
};

function mapDbUser(row: DbUserRow): AuthUserRecord {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    company: row.company,
    passwordHash: row.password_hash,
    emailVerifiedAt: row.email_verified_at,
    verificationCodeHash: row.verification_code_hash,
    verificationCodeExpiresAt: row.verification_code_expires_at,
    verificationAttempts: Number(row.verification_attempts ?? 0),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastLoginAt: row.last_login_at,
  };
}

class MemoryAuthStore implements AuthStore {
  mode: AuthStorageMode = "memory";
  private usersByEmail = new Map<string, AuthUserRecord>();
  private usersById = new Map<string, AuthUserRecord>();

  async findUserByEmail(email: string): Promise<AuthUserRecord | null> {
    return this.usersByEmail.get(normalizeEmail(email)) || null;
  }

  async findUserById(id: string): Promise<AuthUserRecord | null> {
    return this.usersById.get(id) || null;
  }

  async savePendingUser(input: SavePendingUserInput): Promise<AuthUserRecord> {
    const normalizedEmail = normalizeEmail(input.email);
    const current = this.usersByEmail.get(normalizedEmail);
    const now = new Date().toISOString();

    const nextUser: AuthUserRecord = {
      id: current?.id || createUserId(),
      email: normalizedEmail,
      fullName: input.fullName,
      company: input.company,
      passwordHash: input.passwordHash,
      emailVerifiedAt: current?.emailVerifiedAt || null,
      verificationCodeHash: input.verificationCodeHash,
      verificationCodeExpiresAt: input.verificationCodeExpiresAt,
      verificationAttempts: 0,
      createdAt: current?.createdAt || now,
      updatedAt: now,
      lastLoginAt: current?.lastLoginAt || null,
    };

    this.usersByEmail.set(normalizedEmail, nextUser);
    this.usersById.set(nextUser.id, nextUser);

    return nextUser;
  }

  async upsertOAuthUser(input: UpsertOAuthUserInput): Promise<AuthUserRecord> {
    const normalizedEmail = normalizeEmail(input.email);
    const current = this.usersByEmail.get(normalizedEmail);
    const now = new Date().toISOString();

    const nextUser: AuthUserRecord = {
      id: current?.id || createUserId(),
      email: normalizedEmail,
      fullName: input.fullName,
      company: current?.company || null,
      passwordHash: current?.passwordHash || null,
      emailVerifiedAt: current?.emailVerifiedAt || now,
      verificationCodeHash: null,
      verificationCodeExpiresAt: null,
      verificationAttempts: 0,
      createdAt: current?.createdAt || now,
      updatedAt: now,
      lastLoginAt: current?.lastLoginAt || null,
    };

    this.usersByEmail.set(normalizedEmail, nextUser);
    this.usersById.set(nextUser.id, nextUser);

    return nextUser;
  }

  async markUserVerified(userId: string): Promise<AuthUserRecord | null> {
    const current = this.usersById.get(userId);

    if (!current) {
      return null;
    }

    const nextUser: AuthUserRecord = {
      ...current,
      emailVerifiedAt: current.emailVerifiedAt || new Date().toISOString(),
      verificationCodeHash: null,
      verificationCodeExpiresAt: null,
      verificationAttempts: 0,
      updatedAt: new Date().toISOString(),
    };

    this.usersById.set(userId, nextUser);
    this.usersByEmail.set(nextUser.email, nextUser);

    return nextUser;
  }

  async incrementVerificationAttempts(
    userId: string
  ): Promise<AuthUserRecord | null> {
    const current = this.usersById.get(userId);

    if (!current) {
      return null;
    }

    const nextUser: AuthUserRecord = {
      ...current,
      verificationAttempts: current.verificationAttempts + 1,
      updatedAt: new Date().toISOString(),
    };

    this.usersById.set(userId, nextUser);
    this.usersByEmail.set(nextUser.email, nextUser);

    return nextUser;
  }

  async touchLogin(userId: string): Promise<AuthUserRecord | null> {
    const current = this.usersById.get(userId);

    if (!current) {
      return null;
    }

    const nextUser: AuthUserRecord = {
      ...current,
      lastLoginAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.usersById.set(userId, nextUser);
    this.usersByEmail.set(nextUser.email, nextUser);

    return nextUser;
  }
}

let d1ReadyPromise: Promise<void> | null = null;

class D1AuthStore implements AuthStore {
  mode: AuthStorageMode = "d1";
  private endpoint: string;

  constructor(
    private accountId: string,
    private databaseId: string,
    private apiToken: string
  ) {
    this.endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;
  }

  private async query<T>(sql: string, params: DbValue[] = []): Promise<T[]> {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql, params }),
      cache: "no-store",
    });

    const payload = (await response.json()) as D1ApiResponse<T>;
    const firstResult = Array.isArray(payload.result)
      ? payload.result[0]
      : payload.result;

    if (!response.ok || !payload.success || firstResult?.success === false) {
      const message =
        payload.errors?.map((error) => error.message).join("; ") ||
        "Cloudflare D1 request failed.";
      throw new Error(`D1_REQUEST_FAILED:${message}`);
    }

    return firstResult?.results || [];
  }

  private async ensureReady() {
    if (!d1ReadyPromise) {
      d1ReadyPromise = this.query(`
        create table if not exists auth_users (
          id text primary key,
          email text not null unique,
          full_name text not null,
          company text,
          password_hash text,
          email_verified_at text,
          verification_code_hash text,
          verification_code_expires_at text,
          verification_attempts integer not null default 0,
          created_at text not null default (datetime('now')),
          updated_at text not null default (datetime('now')),
          last_login_at text
        )
      `).then(() => undefined);
    }

    return d1ReadyPromise;
  }

  async findUserByEmail(email: string): Promise<AuthUserRecord | null> {
    await this.ensureReady();
    const rows = await this.query<DbUserRow>(
      `
        select *
        from auth_users
        where email = ?
        limit 1
      `,
      [normalizeEmail(email)]
    );

    return rows[0] ? mapDbUser(rows[0]) : null;
  }

  async findUserById(id: string): Promise<AuthUserRecord | null> {
    await this.ensureReady();
    const rows = await this.query<DbUserRow>(
      `
        select *
        from auth_users
        where id = ?
        limit 1
      `,
      [id]
    );

    return rows[0] ? mapDbUser(rows[0]) : null;
  }

  async savePendingUser(input: SavePendingUserInput): Promise<AuthUserRecord> {
    await this.ensureReady();
    const current = await this.findUserByEmail(input.email);

    if (current) {
      const rows = await this.query<DbUserRow>(
        `
          update auth_users
          set
            full_name = ?,
            company = ?,
            password_hash = ?,
            verification_code_hash = ?,
            verification_code_expires_at = ?,
            verification_attempts = 0,
            updated_at = datetime('now')
          where id = ?
          returning *
        `,
        [
          input.fullName,
          input.company,
          input.passwordHash,
          input.verificationCodeHash,
          input.verificationCodeExpiresAt,
          current.id,
        ]
      );

      return mapDbUser(rows[0]);
    }

    const rows = await this.query<DbUserRow>(
      `
        insert into auth_users (
          id,
          email,
          full_name,
          company,
          password_hash,
          verification_code_hash,
          verification_code_expires_at
        )
        values (?, ?, ?, ?, ?, ?, ?)
        returning *
      `,
      [
        createUserId(),
        normalizeEmail(input.email),
        input.fullName,
        input.company,
        input.passwordHash,
        input.verificationCodeHash,
        input.verificationCodeExpiresAt,
      ]
    );

    return mapDbUser(rows[0]);
  }

  async upsertOAuthUser(input: UpsertOAuthUserInput): Promise<AuthUserRecord> {
    await this.ensureReady();
    const current = await this.findUserByEmail(input.email);

    if (current) {
      const rows = await this.query<DbUserRow>(
        `
          update auth_users
          set
            full_name = ?,
            email_verified_at = coalesce(email_verified_at, datetime('now')),
            verification_code_hash = null,
            verification_code_expires_at = null,
            verification_attempts = 0,
            updated_at = datetime('now')
          where id = ?
          returning *
        `,
        [input.fullName, current.id]
      );

      return mapDbUser(rows[0]);
    }

    const rows = await this.query<DbUserRow>(
      `
        insert into auth_users (
          id,
          email,
          full_name,
          email_verified_at
        )
        values (?, ?, ?, datetime('now'))
        returning *
      `,
      [createUserId(), normalizeEmail(input.email), input.fullName]
    );

    return mapDbUser(rows[0]);
  }

  async markUserVerified(userId: string): Promise<AuthUserRecord | null> {
    await this.ensureReady();
    const rows = await this.query<DbUserRow>(
      `
        update auth_users
        set
          email_verified_at = coalesce(email_verified_at, datetime('now')),
          verification_code_hash = null,
          verification_code_expires_at = null,
          verification_attempts = 0,
          updated_at = datetime('now')
        where id = ?
        returning *
      `,
      [userId]
    );

    return rows[0] ? mapDbUser(rows[0]) : null;
  }

  async incrementVerificationAttempts(
    userId: string
  ): Promise<AuthUserRecord | null> {
    await this.ensureReady();
    const rows = await this.query<DbUserRow>(
      `
        update auth_users
        set
          verification_attempts = verification_attempts + 1,
          updated_at = datetime('now')
        where id = ?
        returning *
      `,
      [userId]
    );

    return rows[0] ? mapDbUser(rows[0]) : null;
  }

  async touchLogin(userId: string): Promise<AuthUserRecord | null> {
    await this.ensureReady();
    const rows = await this.query<DbUserRow>(
      `
        update auth_users
        set
          last_login_at = datetime('now'),
          updated_at = datetime('now')
        where id = ?
        returning *
      `,
      [userId]
    );

    return rows[0] ? mapDbUser(rows[0]) : null;
  }
}

const memoryStore = new MemoryAuthStore();
let d1Store: D1AuthStore | null = null;

export function getAuthStore(): AuthStore {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId =
    process.env.CLOUDFLARE_D1_DATABASE_ID || process.env.D1_DATABASE_ID;
  const apiToken =
    process.env.CLOUDFLARE_D1_API_TOKEN || process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !databaseId || !apiToken) {
    return memoryStore;
  }

  if (!d1Store) {
    d1Store = new D1AuthStore(accountId, databaseId, apiToken);
  }

  return d1Store;
}
