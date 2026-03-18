"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Mail,
  Receipt,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const paymentFacts = [
  { label: "Status", value: "Erfolgreich" },
  { label: "Zahlungsart", value: "Einmalzahlung" },
  { label: "Bestätigung", value: "Per E-Mail" },
];

const nextSteps = [
  {
    icon: Mail,
    title: "Bestätigung unterwegs",
    text: "Sie erhalten in Kürze eine Zahlungsbestätigung an die hinterlegte E-Mail-Adresse.",
  },
  {
    icon: Receipt,
    title: "Beleg auf Anfrage",
    text: "Wenn Sie noch eine Rechnung oder eine Zuordnung brauchen, können Sie uns direkt schreiben.",
  },
  {
    icon: ShieldCheck,
    title: "Sicher verarbeitet",
    text: "Die Zahlung wurde erfolgreich abgeschlossen und muss nicht erneut ausgelöst werden.",
  },
];

export default function PaymentSuccessPage() {
  return (
    <div className="relative overflow-hidden px-4 pb-24 pt-8 sm:px-6 lg:px-8 lg:pt-14">
      <div className="pointer-events-none absolute left-[10%] top-24 h-64 w-64 rounded-full bg-[#2997ff]/14 blur-3xl" />
      <div className="pointer-events-none absolute bottom-12 right-[12%] h-72 w-72 rounded-full bg-[#5856d6]/12 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <section className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.045] shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
          <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                Zahlung erfolgreich
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Danke für Ihre <span className="text-[#2997ff]">Zahlung</span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
                Ihre Zahlung wurde erfolgreich verarbeitet. Sie müssen nichts weiter tun.
                Wenn wir noch etwas von Ihnen brauchen, melden wir uns direkt per E-Mail.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {paymentFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-4 py-4"
                  >
                    <div className="text-xs uppercase tracking-[0.18em] text-white/35">
                      {fact.label}
                    </div>
                    <div className="mt-2 text-sm font-medium text-white">{fact.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-12 rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-6 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(41,151,255,0.24)] hover:opacity-95"
                >
                  <Link href="/">
                    Zur Startseite
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-12 rounded-full border-white/15 bg-white/[0.03] px-6 text-sm font-semibold text-white hover:bg-white/[0.06] hover:text-white"
                    >
                      Zahlungsdetails ansehen
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Zahlung erfolgreich</DialogTitle>
                      <DialogDescription>
                        Die Einmalzahlung wurde erfolgreich bestätigt.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogBody className="py-8 text-center">
                      <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-emerald-400" />
                      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 text-left">
                        <div className="mb-3 flex items-center justify-between text-sm text-white/65">
                          <span>Zahlungstyp</span>
                          <span className="font-medium text-white">Einmalzahlung</span>
                        </div>
                        <div className="mb-3 flex items-center justify-between text-sm text-white/65">
                          <span>Status</span>
                          <span className="font-medium text-white">Erfolgreich</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-white/65">
                          <span>Bestätigung</span>
                          <span className="font-medium text-white">Per E-Mail</span>
                        </div>
                      </div>
                    </DialogBody>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button className="w-full rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] text-white hover:opacity-95">
                          Verstanden
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="rounded-[1.8rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-5">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#2997ff]/20 bg-[#2997ff]/10 text-[#2997ff]">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Was passiert jetzt?</h2>
                <div className="mt-5 space-y-4">
                  {nextSteps.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={step.title}
                        className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#2997ff]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{step.title}</div>
                            <p className="mt-1 text-sm leading-6 text-white/55">
                              {step.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5">
                <div className="text-sm font-medium text-white">Fragen zur Zahlung?</div>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Wenn Sie eine Rückfrage zur Zahlung, Rechnung oder Zuordnung haben, schreiben Sie
                  uns einfach kurz.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-4 h-11 rounded-full border-white/15 bg-white/[0.03] px-5 text-sm font-semibold text-white hover:bg-white/[0.06] hover:text-white"
                >
                  <Link href="/kontakt">Kontakt</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
