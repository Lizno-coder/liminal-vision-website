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

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://liminalo.com").replace(
    /\/$/,
    ""
  );
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
  const siteUrl = getSiteUrl();
  const logoUrl = `${siteUrl}/Liminalo.png`;
  const privacyUrl = `${siteUrl}/datenschutz`;
  const imprintUrl = `${siteUrl}/impressum`;

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
  <body style="margin:0;padding:0;background-color:#f4f7fb;color:#07111e;-webkit-text-size-adjust:100%;text-size-adjust:100%;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">Ihr Liminalo Bestaetigungscode lautet: ${safeCode}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;min-width:100%;background:#f4f7fb;">
      <tr>
        <td align="center" class="outer-pad" style="padding:42px 18px;font-family:Arial,Helvetica,sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;border-collapse:separate;border-spacing:0;">
            <tr>
              <td class="card-pad" style="padding:0;border:1px solid #dce6f2;border-radius:34px;background:#ffffff;box-shadow:0 24px 80px rgba(15,35,60,0.14);overflow:hidden;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="padding:32px 34px 26px;background:#07111e;background-image:linear-gradient(135deg,#07111e,#0b2138 62%,#082847);">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td align="left">
                            <img src="${logoUrl}" width="48" height="48" alt="Liminalo" style="display:block;width:48px;height:48px;border:0;outline:none;text-decoration:none;" />
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-top:24px;">
                            <p style="margin:0 0 10px;color:#74bbff;font-size:12px;line-height:18px;letter-spacing:2.4px;text-transform:uppercase;font-weight:700;">Liminalo Account</p>
                            <h1 class="headline" style="margin:0;color:#ffffff;font-size:34px;line-height:40px;font-weight:800;letter-spacing:-0.8px;font-family:Arial,Helvetica,sans-serif;">E-Mail bestaetigen</h1>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:32px 34px 0;">
                      <p style="margin:0 0 22px;color:#31445c;font-size:16px;line-height:26px;font-weight:400;">Hallo ${safeName}, geben Sie den folgenden Code auf der Liminalo Website ein, um Ihre Registrierung sicher abzuschliessen.</p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding:0 34px 28px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;border-spacing:0;width:100%;">
                        <tr>
                          <td align="center" style="padding:0 0 10px;color:#66758a;font-size:13px;line-height:20px;font-weight:700;text-transform:uppercase;letter-spacing:1.8px;">Code</td>
                        </tr>
                        <tr>
                          <td align="center" class="code" style="padding:20px 18px;border-radius:24px;background:#eef6ff;border:1px solid #c9e4ff;color:#07111e;font-size:38px;line-height:46px;letter-spacing:10px;font-weight:800;font-family:Arial,Helvetica,sans-serif;mso-line-height-rule:exactly;">
                            ${safeCode}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 34px 30px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;border-spacing:0;border-radius:22px;background:#f7faff;border:1px solid #e6edf7;">
                        <tr>
                          <td style="padding:18px 20px;color:#52657e;font-size:14px;line-height:23px;">
                            Der Code ist ${minutes} Minuten gueltig. Falls Sie diese Registrierung nicht selbst gestartet haben, ignorieren Sie diese E-Mail bitte. Es wird dadurch kein Konto bestaetigt.
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:22px 34px 30px;border-top:1px solid #edf2f8;background:#fbfdff;">
                      <p style="margin:0 0 10px;color:#6b7d92;font-size:12px;line-height:19px;">Diese E-Mail wurde automatisch im Rahmen Ihrer Registrierung bei Liminalo versendet. Bitte geben Sie den Code nur auf liminalo.com ein und teilen Sie ihn nicht mit Dritten.</p>
                      <p style="margin:0;color:#8a98aa;font-size:12px;line-height:19px;">
                        Liminalo · Informationen zu Datenschutz und Anbieterkennzeichnung finden Sie unter
                        <a href="${privacyUrl}" style="color:#2563eb;text-decoration:underline;">Datenschutz</a>
                        und
                        <a href="${imprintUrl}" style="color:#2563eb;text-decoration:underline;">Impressum</a>.
                      </p>
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
    `Ihr Liminalo Bestaetigungscode lautet: ${input.code}`,
    `Code: ${input.code}`,
    "",
    `Der Code ist ${Math.round(AUTH_CODE_TTL_MS / 60000)} Minuten gueltig.`,
    "",
    "Geben Sie den Code nur auf liminalo.com ein und teilen Sie ihn nicht mit Dritten.",
    "Falls Sie sich nicht selbst registriert haben, ignorieren Sie diese E-Mail.",
    "",
    "Datenschutz: https://liminalo.com/datenschutz",
    "Impressum: https://liminalo.com/impressum",
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
