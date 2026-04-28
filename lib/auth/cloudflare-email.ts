import "server-only";

import { AUTH_CODE_TTL_MS, isProduction } from "./config";

type VerificationEmailInput = {
  to: string;
  fullName: string;
  code: string;
  allowPreviewFallback?: boolean;
};

type CloudflareEmailAddress =
  | string
  | {
      address: string;
      name?: string;
    };

type CloudflareEmailInput = {
  to: string | string[];
  from?: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
};

type VerificationEmailResult = {
  mode: "cloudflare" | "dev-log";
  previewCode?: string;
};

type CloudflareEmailResponse = {
  success?: boolean;
  result?: {
    delivered?: string[];
    permanent_bounces?: string[];
    queued?: string[];
  };
  errors?: Array<{ code?: number; message?: string }>;
};

function parseEmailAddress(value: string): CloudflareEmailAddress {
  const trimmed = value.trim();
  const match = trimmed.match(/^(.+?)\s*<([^<>]+)>$/);

  if (!match) {
    return trimmed;
  }

  return {
    address: match[2].trim(),
    name: match[1].trim().replace(/^["']|["']$/g, ""),
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getCloudflareEmailConfig() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken =
    process.env.CLOUDFLARE_EMAIL_API_TOKEN || process.env.CLOUDFLARE_API_TOKEN;
  const fromAddress =
    process.env.CLOUDFLARE_EMAIL_FROM || "Liminalo <noreply@liminalo.com>";

  return {
    accountId,
    apiToken,
    fromAddress,
  };
}

export async function sendCloudflareEmail(input: CloudflareEmailInput) {
  const { accountId, apiToken, fromAddress } = getCloudflareEmailConfig();

  if (!accountId || !apiToken || !fromAddress) {
    throw new Error("CLOUDFLARE_EMAIL_CONFIG_MISSING");
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: parseEmailAddress(input.from || fromAddress),
        to: input.to,
        reply_to: input.replyTo,
        subject: input.subject,
        text: input.text,
        html: input.html,
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

  return data.result;
}

function getEmailHtml(input: VerificationEmailInput): string {
  const minutes = Math.round(AUTH_CODE_TTL_MS / 60000);
  const safeName = escapeHtml(input.fullName || "dort");
  const safeCode = escapeHtml(input.code);

  return `<!doctype html>
<html lang="de">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="dark light" />
    <meta name="supported-color-schemes" content="dark light" />
    <title>Ihr Liminalo Code</title>
    <style>
      @media only screen and (max-width: 520px) {
        .outer-pad { padding: 22px 14px !important; }
        .card-pad { padding: 28px 20px !important; border-radius: 26px !important; }
        .headline { font-size: 28px !important; line-height: 34px !important; }
        .code { font-size: 30px !important; line-height: 38px !important; letter-spacing: 7px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#05070b;color:#f5f7fb;-webkit-text-size-adjust:100%;text-size-adjust:100%;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;min-width:100%;background:#05070b;background-image:radial-gradient(circle at 50% 0%, rgba(41,151,255,0.24), transparent 42%);">
      <tr>
        <td align="center" class="outer-pad" style="padding:42px 18px;font-family:Arial,Helvetica,sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;border-collapse:separate;border-spacing:0;">
            <tr>
              <td class="card-pad" style="padding:38px 34px;border:1px solid rgba(255,255,255,0.12);border-radius:34px;background:#08101c;background-image:linear-gradient(145deg, rgba(41,151,255,0.20), rgba(255,255,255,0.035));box-shadow:0 24px 80px rgba(0,0,0,0.35);">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td align="left" style="padding:0 0 18px;">
                      <div style="display:inline-block;width:42px;height:42px;border-radius:14px;background:#07111f;border:1px solid rgba(41,151,255,0.45);text-align:center;line-height:42px;color:#2997ff;font-size:22px;font-weight:700;font-family:Arial,Helvetica,sans-serif;">L</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0;">
                      <p style="margin:0 0 12px;color:#54adff;font-size:12px;line-height:18px;letter-spacing:2.4px;text-transform:uppercase;font-weight:700;">Liminalo Account</p>
                      <h1 class="headline" style="margin:0 0 16px;color:#ffffff;font-size:34px;line-height:40px;font-weight:800;letter-spacing:-0.8px;font-family:Arial,Helvetica,sans-serif;">Ihr Bestaetigungscode</h1>
                      <p style="margin:0 0 28px;color:#c9d5e6;font-size:16px;line-height:26px;font-weight:400;">Hallo ${safeName}, geben Sie diesen Code auf der Liminalo Website ein, um Ihre Registrierung abzuschliessen.</p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding:0 0 28px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;border-spacing:0;width:100%;max-width:360px;">
                        <tr>
                          <td align="center" class="code" style="padding:20px 18px;border-radius:24px;background:#2997ff;background-image:linear-gradient(135deg,#2997ff,#2563eb 58%,#5b5cf6);color:#ffffff;font-size:36px;line-height:44px;letter-spacing:10px;font-weight:800;font-family:Arial,Helvetica,sans-serif;mso-line-height-rule:exactly;">
                            ${safeCode}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0;">
                      <p style="margin:0;color:#92a2b8;font-size:14px;line-height:23px;">Der Code ist ${minutes} Minuten gueltig. Falls Sie diese Anfrage nicht selbst gestartet haben, koennen Sie diese E-Mail ignorieren.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:30px 0 0;">
                      <p style="margin:0;color:#5e718c;font-size:12px;line-height:19px;">Diese Nachricht wurde automatisch von Liminalo gesendet. Bitte antworten Sie nicht direkt auf diese E-Mail.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

export async function sendVerificationCodeEmail(
  input: VerificationEmailInput
): Promise<VerificationEmailResult> {
  const replyTo = process.env.CLOUDFLARE_EMAIL_REPLY_TO;
  const text = [
    `Hallo ${input.fullName},`,
    "",
    `Ihr Bestaetigungscode lautet: ${input.code}`,
    "",
    `Der Code ist ${Math.round(AUTH_CODE_TTL_MS / 60000)} Minuten gueltig.`,
    "",
    "Falls Sie sich nicht selbst registriert haben, ignorieren Sie diese E-Mail.",
  ].join("\n");

  try {
    await sendCloudflareEmail({
      to: input.to,
      replyTo,
      subject: "Ihr Liminalo Bestaetigungscode",
      text,
      html: getEmailHtml(input),
    });

    return { mode: "cloudflare" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";

    if (message !== "CLOUDFLARE_EMAIL_CONFIG_MISSING") {
      throw error;
    }

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
}
