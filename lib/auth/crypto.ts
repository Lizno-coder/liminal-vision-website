import "server-only";

import {
  createHmac,
  randomInt,
  randomUUID,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";

import { getCodeSecret } from "./config";

const scrypt = promisify(scryptCallback);
const PASSWORD_KEY_LENGTH = 64;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function generateVerificationCode(): string {
  return randomInt(100000, 1000000).toString();
}

export function createUserId(): string {
  return randomUUID();
}

export function getPasswordValidationError(password: string): string | null {
  if (password.length < 10) {
    return "Das Passwort muss mindestens 10 Zeichen lang sein.";
  }

  if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
    return "Das Passwort muss Buchstaben und Zahlen enthalten.";
  }

  return null;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomUUID().replace(/-/g, "");
  const derivedKey = (await scrypt(password, salt, PASSWORD_KEY_LENGTH)) as Buffer;

  return `scrypt$${salt}$${derivedKey.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  storedPasswordHash: string
): Promise<boolean> {
  const [algorithm, salt, digest] = storedPasswordHash.split("$");

  if (algorithm !== "scrypt" || !salt || !digest) {
    return false;
  }

  const storedDigest = Buffer.from(digest, "hex");
  const candidateDigest = (await scrypt(
    password,
    salt,
    storedDigest.length
  )) as Buffer;

  if (storedDigest.length !== candidateDigest.length) {
    return false;
  }

  return timingSafeEqual(storedDigest, candidateDigest);
}

export function hashVerificationCode(email: string, code: string): string {
  return createHmac("sha256", getCodeSecret())
    .update(`${normalizeEmail(email)}:${code}`)
    .digest("hex");
}

export function verifyVerificationCode(
  email: string,
  code: string,
  expectedHash: string
): boolean {
  const actual = Buffer.from(hashVerificationCode(email, code), "hex");
  const expected = Buffer.from(expectedHash, "hex");

  if (actual.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(actual, expected);
}
