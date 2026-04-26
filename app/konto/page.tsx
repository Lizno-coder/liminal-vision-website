import type { Metadata } from "next";

import AccountAccess from "@/components/account-access";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Konto und Login",
  description:
    "Registrierung und Login fuer den gesicherten Liminalo Accountbereich mit E-Mail-Code und Turnstile.",
  path: "/konto",
  keywords: [
    "liminalo login",
    "liminalo konto",
    "website kundenkonto",
    "anmeldung webdesign",
  ],
});

export default function KontoPage() {
  return <AccountAccess />;
}
