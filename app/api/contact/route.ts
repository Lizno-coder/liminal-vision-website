import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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

let resend: Resend | null = null;

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }

  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }

  return resend;
}

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

function formatResendError(errorMessage: string): string {
  const normalized = errorMessage.toLowerCase();

  if (normalized.includes("testing emails")) {
    return "Resend ist noch im Testmodus. Bitte pruefen Sie Absender- und Empfaenger-Adresse.";
  }

  if (normalized.includes("from") && normalized.includes("verified")) {
    return "Die konfigurierte Absenderadresse ist bei Resend noch nicht verifiziert.";
  }

  if (normalized.includes("api key")) {
    return "Der Resend API-Key ist ungueltig oder fehlt.";
  }

  return "Die Kontaktanfrage konnte per E-Mail nicht zugestellt werden.";
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

    const resendClient = getResendClient();

    if (!resendClient) {
      return NextResponse.json(
        { error: "RESEND_API_KEY fehlt in den Environment Variables." },
        { status: 500 }
      );
    }

    const inquiryId = `inq-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || "Liminalo <onboarding@resend.dev>";
    const toAddress =
      process.env.CONTACT_RECEIVER_EMAIL ||
      process.env.BUSINESS_CONTACT_EMAIL ||
      "business@liminalo.com";

    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");
    const { data, error } = await resendClient.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject: `Neue Anfrage von ${name}`,
      text: [
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
      ].join("\n"),
      html: `
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
      `.trim(),
    });

    if (error || !data) {
      const resendMessage = error?.message || "Unbekannter Resend-Fehler";
      return NextResponse.json(
        { error: formatResendError(resendMessage) },
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
    hasResendKey: Boolean(process.env.RESEND_API_KEY),
    hasFromAddress: Boolean(process.env.RESEND_FROM_EMAIL),
    hasRecipient: Boolean(
      process.env.CONTACT_RECEIVER_EMAIL || process.env.BUSINESS_CONTACT_EMAIL
    ),
    time: new Date().toISOString(),
  });
}
