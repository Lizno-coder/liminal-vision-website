import { NextRequest, NextResponse } from "next/server";

import { sendCloudflareEmail } from "@/lib/auth/cloudflare-email";
import { getClientIp } from "@/lib/request";
import { takeRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

type ContactBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  websiteType?: unknown;
  budget?: unknown;
  message?: unknown;
  agbAccepted?: unknown;
  source?: unknown;
};

function normalizeString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function formatCloudflareEmailError(error: unknown): string {
  const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";

  if (message === "CLOUDFLARE_EMAIL_CONFIG_MISSING") {
    return "Cloudflare Email ist noch nicht konfiguriert.";
  }

  if (message.startsWith("CLOUDFLARE_EMAIL_SEND_FAILED:")) {
    return "Die Kontaktanfrage konnte per E-Mail nicht zugestellt werden.";
  }

  return "Serverfehler beim Kontaktversand.";
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactBody;
    const name = normalizeString(body.name, 80);
    const email = normalizeString(body.email, 160).toLowerCase();
    const phone = normalizeString(body.phone, 40);
    const company = normalizeString(body.company, 80);
    const websiteType = normalizeString(body.websiteType, 80);
    const message = normalizeString(body.message, 5000);
    const source = normalizeString(body.source, 60) || "contact-page";
    const agbAccepted = body.agbAccepted === true;
    const budget =
      typeof body.budget === "number" && Number.isFinite(body.budget)
        ? Math.round(body.budget)
        : null;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, E-Mail und Nachricht sind erforderlich." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Bitte geben Sie eine gueltige E-Mail-Adresse ein." },
        { status: 400 }
      );
    }

    if (!agbAccepted) {
      return NextResponse.json(
        { error: "Bitte akzeptieren Sie die AGB, um fortzufahren." },
        { status: 400 }
      );
    }

    const ipAddress = getClientIp(request);
    const rateLimit = takeRateLimit(`contact:${ipAddress}`, {
      limit: 5,
      windowMs: 1000 * 60 * 10,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte warten Sie kurz und versuchen Sie es erneut." },
        { status: 429 }
      );
    }

    const inquiryId = `inq-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const toAddress =
      process.env.CONTACT_RECEIVER_EMAIL ||
      process.env.BUSINESS_CONTACT_EMAIL ||
      "business@liminalo.com";

    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");
    const text = [
      "Neue Kontaktanfrage",
      `ID: ${inquiryId}`,
      `Name: ${name}`,
      `E-Mail: ${email}`,
      `Telefon: ${phone || "Nicht angegeben"}`,
      `Unternehmen: ${company || "Nicht angegeben"}`,
      `Website-Art: ${websiteType || "Nicht angegeben"}`,
      `Budget: ${budget ? `${budget} EUR` : "Nicht angegeben"}`,
      `Quelle: ${source}`,
      "",
      "Nachricht:",
      message,
    ].join("\n");
    const html = `
      <div style="font-family: Inter, Arial, sans-serif; color: #08111c;">
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>ID:</strong> ${escapeHtml(inquiryId)}</p>
        <hr />
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone || "Nicht angegeben")}</p>
        <p><strong>Unternehmen:</strong> ${escapeHtml(company || "Nicht angegeben")}</p>
        <p><strong>Website-Art:</strong> ${escapeHtml(websiteType || "Nicht angegeben")}</p>
        <p><strong>Budget:</strong> ${budget ? `${budget} EUR` : "Nicht angegeben"}</p>
        <p><strong>Quelle:</strong> ${escapeHtml(source)}</p>
        <hr />
        <p><strong>Nachricht:</strong></p>
        <p>${safeMessage}</p>
      </div>
    `.trim();

    try {
      await sendCloudflareEmail({
        to: [toAddress],
        replyTo: email,
        subject: `Neue Anfrage von ${name}`,
        text,
        html,
      });
    } catch (error) {
      return NextResponse.json(
        { error: formatCloudflareEmailError(error) },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      inquiryId,
      message: "Anfrage erfolgreich gesendet.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";

    return NextResponse.json(
      {
        error: "Serverfehler beim Kontaktversand.",
        details: process.env.NODE_ENV === "production" ? undefined : message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    mailProvider: "cloudflare",
    hasCloudflareEmailToken: Boolean(
      process.env.CLOUDFLARE_EMAIL_API_TOKEN || process.env.CLOUDFLARE_API_TOKEN
    ),
    hasFromAddress: Boolean(process.env.CLOUDFLARE_EMAIL_FROM),
    hasRecipient: Boolean(
      process.env.CONTACT_RECEIVER_EMAIL || process.env.BUSINESS_CONTACT_EMAIL
    ),
    time: new Date().toISOString(),
  });
}
