import type { Metadata } from "next";

import PaymentSuccessPage from "@/components/payment-success-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Zahlung erfolgreich",
  description: "Die Zahlung wurde erfolgreich verarbeitet.",
  path: "/danke",
  noIndex: true,
});

export default function DankePage() {
  return <PaymentSuccessPage />;
}
