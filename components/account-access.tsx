"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Loader2,
  LockKeyhole,
  LogOut,
  Save,
  Upload,
  UserRound,
} from "lucide-react";

import { TurnstileWidget } from "@/components/auth/turnstile-widget";
import { CanvasRevealEffect } from "@/components/ui/sign-in-flow-1";
import { cn } from "@/lib/utils";

type AuthStorageMode = "memory" | "d1";

type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  company: string | null;
  phone: string | null;
  role: string | null;
  website: string | null;
  bio: string | null;
  avatarDataUrl: string | null;
  emailVerifiedAt: string | null;
  createdAt: string;
  lastLoginAt: string | null;
};

type ApiResponse = {
  success?: boolean;
  error?: string;
  email?: string;
  user?: AuthUser | null;
  needsVerification?: boolean;
  storageMode?: AuthStorageMode;
  mailMode?: "cloudflare" | "dev-log";
  previewCode?: string | null;
};

type ProfileForm = {
  fullName: string;
  company: string;
  phone: string;
  role: string;
  website: string;
  bio: string;
  avatarDataUrl: string;
};

type Notice = {
  tone: "success" | "error" | "info";
  text: string;
};

const inputClassName =
  "w-full rounded-full border border-white/10 bg-black/20 px-5 py-2.5 text-center text-sm text-white outline-none backdrop-blur-sm transition placeholder:text-white/34 focus:border-[#2997ff]/55 focus:bg-black/30 sm:py-3 sm:text-base";

const profileInputClassName =
  "w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none backdrop-blur-sm transition placeholder:text-white/34 focus:border-[#2997ff]/55 focus:bg-black/30";

const panelMotion = {
  initial: { opacity: 0, x: 34 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -34 },
  transition: { duration: 0.32, ease: "easeOut" },
};

function NoticeBanner({ notice }: { notice: Notice | null }) {
  if (!notice) {
    return null;
  }

  const toneClass =
    notice.tone === "success"
      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
      : notice.tone === "error"
        ? "border-rose-400/20 bg-rose-500/10 text-rose-100"
        : "border-white/10 bg-white/[0.05] text-white/72";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("rounded-2xl border px-4 py-3 text-sm", toneClass)}
    >
      {notice.text}
    </motion.div>
  );
}

function LogoMark() {
  return (
    <Link
      href="/"
      className="mx-auto flex h-10 items-center justify-center overflow-hidden sm:h-14"
      aria-label="Zur Startseite"
    >
      <Image
        src="/Liminalo.png"
        alt="Liminalo"
        width={112}
        height={112}
        quality={90}
        sizes="56px"
        className="h-full w-auto object-contain"
      />
    </Link>
  );
}

function StepTabs({
  activeTab,
  onChange,
}: {
  activeTab: "register" | "login";
  onChange: (tab: "register" | "login") => void;
}) {
  return (
    <div className="grid grid-cols-2 rounded-full border border-white/10 bg-black/20 p-1 backdrop-blur-sm">
      {(["register", "login"] as const).map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={cn(
            "rounded-full px-4 py-2.5 text-sm font-medium transition",
            activeTab === tab
              ? "bg-white text-black"
              : "text-white/58 hover:text-white"
          )}
        >
          {tab === "register" ? "Registrieren" : "Anmelden"}
        </button>
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.3 35.1 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.3-4.1 5.6l6.2 5.2C36.9 39.3 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

function GoogleButton({ label }: { label: string }) {
  return (
    <a
      href="/api/auth/google/start"
      className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/12 bg-white px-5 py-3 text-sm font-medium text-black shadow-[0_18px_55px_rgba(255,255,255,0.12)] transition hover:scale-[1.01] hover:bg-white/90"
    >
      <GoogleIcon />
      <span>{label}</span>
    </a>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

async function cropAvatarToDataUrl(source: string, zoom: number) {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const element = new window.Image();
    element.onload = () => resolve(element);
    element.onerror = reject;
    element.src = source;
  });
  const canvas = document.createElement("canvas");
  const size = 320;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("CANVAS_UNAVAILABLE");
  }

  canvas.width = size;
  canvas.height = size;
  const minScale = Math.max(size / image.width, size / image.height);
  const scale = minScale * zoom;
  const width = image.width * scale;
  const height = image.height * scale;

  context.clearRect(0, 0, size, size);
  context.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);

  return canvas.toDataURL("image/jpeg", 0.86);
}

export default function AccountAccess() {
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");
  const [view, setView] = useState<"auth" | "verify" | "account">("auth");
  const [notice, setNotice] = useState<Notice | null>(null);
  const [sessionUser, setSessionUser] = useState<AuthUser | null>(null);
  const [, setStorageMode] = useState<AuthStorageMode>("memory");
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerCaptchaSeed, setRegisterCaptchaSeed] = useState(0);
  const [loginCaptchaSeed, setLoginCaptchaSeed] = useState(0);
  const [registerTurnstileToken, setRegisterTurnstileToken] = useState("");
  const [loginTurnstileToken, setLoginTurnstileToken] = useState("");
  const [verifyEmail, setVerifyEmail] = useState("");
  const [previewCode, setPreviewCode] = useState<string | null>(null);
  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    company: "",
    password: "",
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [profileForm, setProfileForm] = useState<ProfileForm>({
    fullName: "",
    company: "",
    phone: "",
    role: "",
    website: "",
    bio: "",
    avatarDataUrl: "",
  });
  const [avatarSource, setAvatarSource] = useState("");
  const [avatarZoom, setAvatarZoom] = useState(1);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isCodeComplete = codeDigits.every((digit) => digit.length === 1);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const footers = Array.from(document.querySelectorAll("footer"));
    const previousFooterDisplays = footers.map((footer) => footer.style.display);

    document.body.style.overflow = "hidden";
    footers.forEach((footer) => {
      footer.style.display = "none";
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      footers.forEach((footer, index) => {
        footer.style.display = previousFooterDisplays[index] || "";
      });
    };
  }, []);

  useEffect(() => {
    if (!sessionUser) {
      return;
    }

    setProfileForm({
      fullName: sessionUser.fullName,
      company: sessionUser.company || "",
      phone: sessionUser.phone || "",
      role: sessionUser.role || "",
      website: sessionUser.website || "",
      bio: sessionUser.bio || "",
      avatarDataUrl: sessionUser.avatarDataUrl || "",
    });
  }, [sessionUser]);

  useEffect(() => {
    let active = true;
    const params = new URLSearchParams(window.location.search);

    if (params.get("error") === "google_not_configured") {
      setNotice({
        tone: "error",
        text: "Google Login ist noch nicht konfiguriert.",
      });
    } else if (params.get("error")?.startsWith("google")) {
      setNotice({
        tone: "error",
        text: "Die Google-Anmeldung konnte nicht abgeschlossen werden.",
      });
    } else if (params.get("auth") === "google") {
      setNotice({
        tone: "success",
        text: "Sie sind mit Google angemeldet.",
      });
    }

    const loadSession = async () => {
      try {
        const response = await fetch("/api/auth/session", { cache: "no-store" });
        const data = (await response.json()) as ApiResponse;

        if (!active) {
          return;
        }

        if (data.storageMode) {
          setStorageMode(data.storageMode);
        }

        if (data.user) {
          setSessionUser(data.user);
          setView("account");
        }
      } catch {
        if (active) {
          setNotice({
            tone: "error",
            text: "Die Session konnte gerade nicht geladen werden.",
          });
        }
      } finally {
        if (active) {
          setIsCheckingSession(false);
        }
      }
    };

    void loadSession();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (view === "verify") {
      const timer = window.setTimeout(() => codeInputRefs.current[0]?.focus(), 260);
      return () => window.clearTimeout(timer);
    }
  }, [view]);

  function switchTab(tab: "register" | "login") {
    setActiveTab(tab);
    setView("auth");
    setNotice(null);
    setPreviewCode(null);
  }

  async function requestVerificationCode() {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...registerForm,
        turnstileToken: registerTurnstileToken,
      }),
    });
    const data = (await response.json()) as ApiResponse;

    if (data.storageMode) {
      setStorageMode(data.storageMode);
    }

    if (!response.ok) {
      throw new Error(data.error || "Die Registrierung konnte nicht gestartet werden.");
    }

    setVerifyEmail(data.email || registerForm.email);
    setPreviewCode(data.previewCode || null);
    setCodeDigits(["", "", "", "", "", ""]);
    setView("verify");
    setNotice({
      tone: "success",
      text:
        data.mailMode === "dev-log" && data.previewCode
          ? "Preview-Code erzeugt."
          : "Der Bestaetigungscode wurde versendet.",
    });
  }

  async function handleRegisterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setNotice(null);
    setPreviewCode(null);

    try {
      await requestVerificationCode();
    } catch (error) {
      setNotice({
        tone: "error",
        text:
          error instanceof Error
            ? error.message
            : "Die Registrierung konnte nicht gestartet werden.",
      });
    } finally {
      setRegisterTurnstileToken("");
      setRegisterCaptchaSeed((value) => value + 1);
      setIsSubmitting(false);
    }
  }

  async function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setNotice(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...loginForm,
          turnstileToken: loginTurnstileToken,
        }),
      });
      const data = (await response.json()) as ApiResponse;

      if (data.storageMode) {
        setStorageMode(data.storageMode);
      }

      if (!response.ok || !data.user) {
        if (data.needsVerification && data.email) {
          setVerifyEmail(data.email);
          setCodeDigits(["", "", "", "", "", ""]);
          setView("verify");
          setNotice({
            tone: "info",
            text: data.error || "Bitte bestaetigen Sie zuerst Ihren E-Mail-Code.",
          });
          return;
        }

        throw new Error(data.error || "Die Anmeldung konnte nicht abgeschlossen werden.");
      }

      setSessionUser(data.user);
      setView("account");
      setNotice({
        tone: "success",
        text: "Sie sind jetzt angemeldet.",
      });
    } catch (error) {
      setNotice({
        tone: "error",
        text:
          error instanceof Error
            ? error.message
            : "Die Anmeldung konnte gerade nicht abgeschlossen werden.",
      });
    } finally {
      setLoginTurnstileToken("");
      setLoginCaptchaSeed((value) => value + 1);
      setIsSubmitting(false);
    }
  }

  async function handleVerifySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isCodeComplete) {
      return;
    }

    setIsSubmitting(true);
    setNotice(null);

    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: verifyEmail,
          code: codeDigits.join(""),
        }),
      });
      const data = (await response.json()) as ApiResponse;

      if (data.storageMode) {
        setStorageMode(data.storageMode);
      }

      if (!response.ok || !data.user) {
        throw new Error(data.error || "Der Code konnte nicht bestaetigt werden.");
      }

      setSessionUser(data.user);
      setPreviewCode(null);
      setView("account");
      setNotice({
        tone: "success",
        text: "Ihr Konto ist bestaetigt.",
      });
    } catch (error) {
      setNotice({
        tone: "error",
        text:
          error instanceof Error
            ? error.message
            : "Die Verifizierung konnte gerade nicht abgeschlossen werden.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLogout() {
    setIsSubmitting(true);
    setNotice(null);

    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setSessionUser(null);
      setView("auth");
      setActiveTab("login");
      setNotice({
        tone: "info",
        text: "Sie wurden abgemeldet.",
      });
    } catch {
      setNotice({
        tone: "error",
        text: "Die Abmeldung konnte gerade nicht abgeschlossen werden.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleProfileSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setNotice(null);

    try {
      const response = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
      });
      const data = (await response.json()) as ApiResponse;

      if (!response.ok || !data.user) {
        throw new Error(data.error || "Das Profil konnte nicht gespeichert werden.");
      }

      setSessionUser(data.user);
      setNotice({
        tone: "success",
        text: "Profil gespeichert.",
      });
    } catch (error) {
      setNotice({
        tone: "error",
        text:
          error instanceof Error
            ? error.message
            : "Das Profil konnte gerade nicht gespeichert werden.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleAvatarFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setNotice({
        tone: "error",
        text: "Bitte laden Sie ein Bild hoch.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarSource(String(reader.result || ""));
      setAvatarZoom(1);
    };
    reader.readAsDataURL(file);
  }

  async function applyAvatarCrop() {
    if (!avatarSource) {
      return;
    }

    try {
      const dataUrl = await cropAvatarToDataUrl(avatarSource, avatarZoom);
      setProfileForm((current) => ({ ...current, avatarDataUrl: dataUrl }));
      setAvatarSource("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      setNotice({
        tone: "error",
        text: "Das Profilbild konnte nicht verarbeitet werden.",
      });
    }
  }

  function handleCodeChange(index: number, rawValue: string) {
    const digits = rawValue.replace(/\D/g, "");

    if (digits.length > 1) {
      const nextDigits = [...codeDigits];

      digits
        .slice(0, 6 - index)
        .split("")
        .forEach((digit, offset) => {
          nextDigits[index + offset] = digit;
        });

      setCodeDigits(nextDigits);
      codeInputRefs.current[Math.min(index + digits.length, 5)]?.focus();
      return;
    }

    const nextDigits = [...codeDigits];
    nextDigits[index] = digits;
    setCodeDigits(nextDigits);

    if (digits && index < 5) {
      codeInputRefs.current[index + 1]?.focus();
    }
  }

  function handleCodeKeyDown(
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Backspace" && !codeDigits[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  }

  return (
    <div
      data-account-access
      className="fixed inset-0 z-[70] overflow-hidden bg-[#05070b]"
    >
      <style>{`
        body:has([data-account-access]) {
          overflow: hidden;
        }

        body:has([data-account-access]) header,
        body:has([data-account-access]) footer {
          display: none;
        }
      `}</style>
      <div className="fixed inset-0">
        <CanvasRevealEffect
          animationSpeed={3}
          containerClassName="bg-[#05070b]"
          colors={[
            [41, 151, 255],
            [88, 86, 214],
          ]}
          dotSize={6}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.78),rgba(10,10,10,0.26)_42%,rgba(10,10,10,0.92))]" />
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto flex h-screen w-full flex-col justify-center overflow-y-auto px-5 py-[calc(env(safe-area-inset-top)+1rem)] pb-[calc(env(safe-area-inset-bottom)+1rem)] md:py-28",
          view === "account" && sessionUser ? "max-w-2xl" : "max-w-md"
        )}
      >
        <div className="space-y-4 text-center sm:space-y-7">
          <LogoMark />

          <AnimatePresence mode="wait">
            {isCheckingSession ? (
              <motion.div
                key="loading"
                {...panelMotion}
                className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm text-white/58 backdrop-blur-sm"
              >
                Session wird geladen...
              </motion.div>
            ) : view === "account" && sessionUser ? (
              <motion.div key="account" {...panelMotion} className="space-y-6">
                <div className="space-y-1">
                  <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    Profileinstellungen
                  </h1>
                  <p className="text-sm text-white/54 sm:text-lg">{sessionUser.email}</p>
                </div>

                <NoticeBanner notice={notice} />

                <form
                  onSubmit={handleProfileSubmit}
                  className="rounded-[2rem] border border-white/10 bg-black/22 p-5 text-left backdrop-blur-md sm:p-6"
                >
                  <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                    <div className="relative">
                      <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white/12 bg-gradient-to-br from-[#2997ff] to-[#5856d6] text-2xl font-semibold text-white shadow-[0_20px_60px_rgba(41,151,255,0.22)]">
                        {profileForm.avatarDataUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={profileForm.avatarDataUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          getInitials(profileForm.fullName) || <UserRound className="h-7 w-7" />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105"
                        aria-label="Profilbild hochladen"
                      >
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-lg font-semibold text-white">
                        {profileForm.fullName || sessionUser.fullName}
                      </div>
                      <div className="text-sm text-white/52">
                        {profileForm.company || "Liminalo Account"}
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-medium text-white/78 transition hover:bg-white/10 hover:text-white"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        Bild hochladen
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarFileChange}
                      />
                    </div>
                  </div>

                  {avatarSource ? (
                    <div className="mt-5 rounded-[1.5rem] border border-[#2997ff]/20 bg-[#2997ff]/10 p-4">
                      <div className="mx-auto h-36 w-36 overflow-hidden rounded-full border border-white/14 bg-black/30">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={avatarSource}
                          alt=""
                          className="h-full w-full object-cover"
                          style={{ transform: `scale(${avatarZoom})` }}
                        />
                      </div>
                      <label className="mt-4 block text-xs font-medium uppercase tracking-[0.18em] text-white/46">
                        Zoom
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.05"
                        value={avatarZoom}
                        onChange={(event) => setAvatarZoom(Number(event.target.value))}
                        className="mt-2 w-full accent-[#2997ff]"
                      />
                      <div className="mt-4 flex gap-3">
                        <button
                          type="button"
                          onClick={() => setAvatarSource("")}
                          className="flex-1 rounded-full border border-white/12 px-4 py-2.5 text-sm font-medium text-white/72 transition hover:bg-white/10"
                        >
                          Abbrechen
                        </button>
                        <button
                          type="button"
                          onClick={() => void applyAvatarCrop()}
                          className="flex-1 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
                        >
                          Uebernehmen
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <input
                      value={profileForm.fullName}
                      onChange={(event) =>
                        setProfileForm((current) => ({
                          ...current,
                          fullName: event.target.value,
                        }))
                      }
                      placeholder="Name"
                      className={profileInputClassName}
                      autoComplete="name"
                    />
                    <input
                      value={profileForm.company}
                      onChange={(event) =>
                        setProfileForm((current) => ({
                          ...current,
                          company: event.target.value,
                        }))
                      }
                      placeholder="Unternehmen"
                      className={profileInputClassName}
                      autoComplete="organization"
                    />
                    <input
                      value={profileForm.role}
                      onChange={(event) =>
                        setProfileForm((current) => ({
                          ...current,
                          role: event.target.value,
                        }))
                      }
                      placeholder="Position / Rolle"
                      className={profileInputClassName}
                    />
                    <input
                      value={profileForm.phone}
                      onChange={(event) =>
                        setProfileForm((current) => ({
                          ...current,
                          phone: event.target.value,
                        }))
                      }
                      placeholder="Telefon"
                      className={profileInputClassName}
                      autoComplete="tel"
                    />
                    <input
                      value={profileForm.website}
                      onChange={(event) =>
                        setProfileForm((current) => ({
                          ...current,
                          website: event.target.value,
                        }))
                      }
                      placeholder="Website"
                      className={`${profileInputClassName} sm:col-span-2`}
                      autoComplete="url"
                    />
                    <textarea
                      value={profileForm.bio}
                      onChange={(event) =>
                        setProfileForm((current) => ({
                          ...current,
                          bio: event.target.value,
                        }))
                      }
                      placeholder="Kurzbeschreibung"
                      className={`${profileInputClassName} min-h-28 resize-none rounded-[1.4rem] sm:col-span-2`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Profil speichern
                  </button>
                </form>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <LogOut className="h-4 w-4" />
                  Abmelden
                </button>
              </motion.div>
            ) : view === "verify" ? (
              <motion.form
                key="verify"
                {...panelMotion}
                onSubmit={handleVerifySubmit}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    Code gesendet
                  </h1>
                  <p className="text-sm text-white/54 sm:text-lg">{verifyEmail}</p>
                </div>

                <NoticeBanner notice={notice} />

                {previewCode ? (
                  <div className="rounded-full border border-[#2997ff]/25 bg-[#2997ff]/10 px-5 py-3 font-mono text-xl tracking-[0.24em] text-white">
                    {previewCode}
                  </div>
                ) : null}

                <div className="rounded-full border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-sm">
                  <div className="flex items-center justify-center">
                    {codeDigits.map((digit, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          ref={(element) => {
                            codeInputRefs.current[index] = element;
                          }}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={digit}
                          onChange={(event) => handleCodeChange(index, event.target.value)}
                          onKeyDown={(event) => handleCodeKeyDown(index, event)}
                          className="w-9 bg-transparent text-center text-xl text-white outline-none"
                          style={{ caretColor: "transparent" }}
                        />
                        {index < 5 ? (
                          <span className="text-xl text-white/18">|</span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setView("auth");
                      setNotice(null);
                      setPreviewCode(null);
                    }}
                    className="inline-flex w-[34%] items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="submit"
                    disabled={!isCodeComplete || isSubmitting}
                    className={cn(
                      "inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition",
                      isCodeComplete
                        ? "border-transparent bg-white text-black hover:bg-white/90"
                        : "cursor-not-allowed border-white/10 bg-black/28 text-white/40"
                    )}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                    Weiter
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div key="auth" {...panelMotion} className="space-y-3 sm:space-y-6">
                <div className="space-y-0.5 sm:space-y-1">
                  <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    {activeTab === "register" ? "Konto erstellen" : "Einloggen"}
                  </h1>
                  <p className="text-sm text-white/54 sm:text-lg">
                    {activeTab === "register"
                      ? "Sichern Sie Ihren Liminalo Zugang."
                      : "Willkommen zurueck."}
                  </p>
                </div>

                <StepTabs activeTab={activeTab} onChange={switchTab} />
                <NoticeBanner notice={notice} />

                {activeTab === "register" ? (
                  <form onSubmit={handleRegisterSubmit} className="space-y-2.5 sm:space-y-4">
                    <GoogleButton label="Mit Google registrieren" />
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-white/10" />
                      <span className="text-xs text-white/38">oder per E-Mail</span>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
                    <input
                      type="text"
                      value={registerForm.fullName}
                      onChange={(event) =>
                        setRegisterForm((current) => ({
                          ...current,
                          fullName: event.target.value,
                        }))
                      }
                      placeholder="Ihr Name"
                      className={inputClassName}
                      autoComplete="name"
                    />
                    <input
                      type="email"
                      value={registerForm.email}
                      onChange={(event) =>
                        setRegisterForm((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      placeholder="E-Mail"
                      className={inputClassName}
                      autoComplete="email"
                    />
                    <input
                      type="text"
                      value={registerForm.company}
                      onChange={(event) =>
                        setRegisterForm((current) => ({
                          ...current,
                          company: event.target.value,
                        }))
                      }
                      placeholder="Unternehmen (optional)"
                      className={inputClassName}
                      autoComplete="organization"
                    />
                    <input
                      type="password"
                      value={registerForm.password}
                      onChange={(event) =>
                        setRegisterForm((current) => ({
                          ...current,
                          password: event.target.value,
                        }))
                      }
                      placeholder="Passwort"
                      className={inputClassName}
                      autoComplete="new-password"
                    />
                    <div className="rounded-[1.2rem] border border-white/10 bg-black/20 p-2 backdrop-blur-sm sm:rounded-[1.35rem] sm:p-3">
                      <TurnstileWidget
                        action="register"
                        resetKey={registerCaptchaSeed}
                        onVerify={setRegisterTurnstileToken}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70 sm:py-3"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <LockKeyhole className="h-4 w-4" />
                      )}
                      Konto erstellen
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleLoginSubmit} className="space-y-3 sm:space-y-4">
                    <GoogleButton label="Mit Google anmelden" />
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-white/10" />
                      <span className="text-xs text-white/38">oder per E-Mail</span>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(event) =>
                        setLoginForm((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      placeholder="E-Mail"
                      className={inputClassName}
                      autoComplete="email"
                    />
                    <input
                      type="password"
                      value={loginForm.password}
                      onChange={(event) =>
                        setLoginForm((current) => ({
                          ...current,
                          password: event.target.value,
                        }))
                      }
                      placeholder="Passwort"
                      className={inputClassName}
                      autoComplete="current-password"
                    />
                    <div className="rounded-[1.2rem] border border-white/10 bg-black/20 p-2 backdrop-blur-sm sm:rounded-[1.35rem] sm:p-3">
                      <TurnstileWidget
                        action="login"
                        resetKey={loginCaptchaSeed}
                        onVerify={setLoginTurnstileToken}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70 sm:py-3"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ArrowRight className="h-4 w-4" />
                      )}
                      Anmelden
                    </button>
                  </form>
                )}

                <p className="text-[11px] leading-4 text-white/38 sm:text-xs sm:leading-5">
                  Mit der Registrierung akzeptieren Sie AGB und Datenschutz.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
