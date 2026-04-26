import "server-only";

import { AUTH_CODE_TTL_MS, isProduction } from "./config";

type VerificationEmailInput = {
  to: string;
  fullName: string;
  code: string;
  allowPreviewFallback?: boolean;
};

type VerificationEmailResult = {
  mode: "cloudflare" | "dev-log";
  previewCode?: string;
};

type CloudflareEmailResponse = {
  success?: boolean;
  errors?: Array<{ code?: number; message?: string }>;
};

function getEmailHtml(input: VerificationEmailInput): string {
  const minutes = Math.round(AUTH_CODE_TTL_MS / 60000);

  return `
    <div style="margin:0;padding:36px;background:#05070b;color:#f5f7fb;font-family:Inter,Arial,sans-serif;">
      <div style="max-width:560px;margin:0 auto;border:1px solid rgba(255,255,255,0.1);border-radius:30px;padding:34px;background:linear-gradient(145deg,rgba(41,151,255,0.15),rgba(255,255,255,0.04));">
        <p style="margin:0 0 14px;color:#2997ff;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">Liminalo Account</p>
        <h1 style="margin:0 0 16px;font-size:32px;line-height:1.08;color:#ffffff;">Ihr Bestaetigungscode</h1>
        <p style="margin:0 0 28px;color:rgba(245,247,251,0.72);line-height:1.7;">
          Hallo ${input.fullName}, bitte geben Sie diesen Code auf der Website ein, um Ihre Registrierung abzuschliessen.
        </p>
        <div style="display:inline-block;padding:18px 24px;border-radius:22px;background:linear-gradient(135deg,#2997ff,#5856d6);color:white;font-size:34px;letter-spacing:0.3em;font-weight:700;">
          ${input.code}
        </div>
        <p style="margin:28px 0 0;color:rgba(245,247,251,0.62);line-height:1.7;">
          Der Code ist ${minutes} Minuten gueltig. Wenn Sie diese Anfrage nicht selbst gestartet haben, ignorieren Sie die E-Mail.
        </p>
      </div>
    </div>
  `.trim();
}

export async function sendVerificationCodeEmail(
  input: VerificationEmailInput
): Promise<VerificationEmailResult> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken =
    process.env.CLOUDFLARE_EMAIL_API_TOKEN || process.env.CLOUDFLARE_API_TOKEN;
  const fromAddress =
    process.env.CLOUDFLARE_EMAIL_FROM || "Liminalo <noreply@liminalo.com>";
  const replyTo = process.env.CLOUDFLARE_EMAIL_REPLY_TO;

  if (!accountId || !apiToken || !fromAddress) {
    if (!isProduction() || input.allowPreviewFallback) {
      console.info(
        `[Auth] Cloudflare Email preview code for ${input.to}: ${input.code}`
      );

      return {
        mode: "dev-log",
        previewCode: input.code,
      };
    }

    throw new Error("CLOUDFLARE_EMAIL_CONFIG_MISSING");
  }

  const minutes = Math.round(AUTH_CODE_TTL_MS / 60000);
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: input.to,
        reply_to: replyTo,
        subject: "Ihr Liminalo Bestaetigungscode",
        text: [
          `Hallo ${input.fullName},`,
          "",
          `Ihr Bestaetigungscode lautet: ${input.code}`,
          "",
          `Der Code ist ${minutes} Minuten gueltig.`,
          "",
          "Falls Sie sich nicht selbst registriert haben, ignorieren Sie diese E-Mail.",
        ].join("\n"),
        html: getEmailHtml(input),
      }),
      cache: "no-store",
    }
  );

  const data = (await response.json()) as CloudflareEmailResponse;

  if (!response.ok || !data.success) {
    const message =
      data.errors?.map((error) => error.message).join("; ") ||
      "Cloudflare Email send failed.";
    throw new Error(`CLOUDFLARE_EMAIL_SEND_FAILED:${message}`);
  }

  return { mode: "cloudflare" };
}
