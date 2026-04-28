"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { LogOut, Settings, UserRound } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Branchen", href: "/branchen" },
  { name: "Standorte", href: "/standorte" },
  { name: "Ablauf", href: "/#process" },
  { name: "Preise", href: "/#pricing" },
  { name: "Kontakt", href: "/kontakt" },
];

type HeaderUser = {
  email: string;
  fullName: string;
  company: string | null;
  avatarDataUrl: string | null;
};

type SessionResponse = {
  user?: HeaderUser | null;
};

function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative flex items-center overflow-hidden transition group-hover:drop-shadow-[0_0_20px_rgba(41,151,255,0.22)] ${
        compact ? "h-10 md:h-12" : "h-11 sm:h-12"
      }`}
    >
      <Image
        src="/Liminalo.png"
        alt="Liminalo"
        width={96}
        height={96}
        quality={90}
        sizes={compact ? "(min-width: 768px) 48px, 40px" : "(min-width: 640px) 48px, 44px"}
        priority
        className="h-full w-auto object-contain"
      />
    </div>
  );
}

function UserAvatar({ user, size = "md" }: { user: HeaderUser; size?: "sm" | "md" }) {
  const initials = user.fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const sizeClass = size === "sm" ? "h-9 w-9 text-xs" : "h-10 w-10 text-sm";

  return (
    <div
      className={`${sizeClass} flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-gradient-to-br from-[#2997ff] to-[#5856d6] font-semibold text-white shadow-lg shadow-[#2997ff]/20`}
    >
      {user.avatarDataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.avatarDataUrl} alt="" className="h-full w-full object-cover" />
      ) : (
        initials || <UserRound className="h-4 w-4" />
      )}
    </div>
  );
}

function AccountMenu({
  user,
  onLogout,
}: {
  user: HeaderUser | null;
  onLogout: () => Promise<void>;
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isProfileOpen) {
      return;
    }

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (
        profileRef.current &&
        event.target instanceof Node &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isProfileOpen]);

  if (!user) {
    return (
      <Link
        href="/konto"
        className="inline-flex items-center rounded-full border border-white/20 bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:scale-[1.02] hover:bg-white/90"
      >
        Anmelden
      </Link>
    );
  }

  return (
    <div ref={profileRef} className="relative">
      <button
        type="button"
        onClick={() => setIsProfileOpen((current) => !current)}
        className="rounded-full outline-none transition hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-[#2997ff]"
        aria-label="Profilmenue oeffnen"
        aria-expanded={isProfileOpen}
      >
        <UserAvatar user={user} />
      </button>

      <AnimatePresence>
        {isProfileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-12 w-72 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07111e]/92 p-3 shadow-[0_25px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 rounded-[1.15rem] bg-white/[0.06] p-3">
              <UserAvatar user={user} size="sm" />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-white">{user.fullName}</div>
                <div className="truncate text-xs text-white/52">{user.email}</div>
              </div>
            </div>

            <Link
              href="/konto"
              onClick={() => setIsProfileOpen(false)}
              className="mt-2 flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-white/78 transition hover:bg-white/10 hover:text-white"
            >
              <Settings className="h-4 w-4" />
              Profileinstellungen
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsProfileOpen(false);
                void onLogout();
              }}
              className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm text-white/78 transition hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Abmelden
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sessionUser, setSessionUser] = useState<HeaderUser | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const headerY = useMotionValue(0);
  const springY = useSpring(headerY, { stiffness: 400, damping: 30 });

  useEffect(() => {
    let active = true;

    const loadSession = async () => {
      try {
        const response = await fetch("/api/auth/session", { cache: "no-store" });
        const data = (await response.json()) as SessionResponse;

        if (active) {
          setSessionUser(data.user || null);
        }
      } catch {
        if (active) {
          setSessionUser(null);
        }
      }
    };

    void loadSession();

    return () => {
      active = false;
    };
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setSessionUser(null);
    setIsOpen(false);
  }

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY > 16);

          if (currentScrollY > 100) {
            if (currentScrollY > lastScrollY.current + 5) {
              setIsOpen(false);
              headerY.set(-100);
            } else if (currentScrollY < lastScrollY.current - 5) {
              headerY.set(0);
            }
          } else {
            headerY.set(0);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerY]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (
        headerRef.current &&
        event.target instanceof Node &&
        !headerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-[calc(env(safe-area-inset-top)+1rem)] sm:px-6 lg:px-8">
      <motion.div
        ref={headerRef}
        style={{ y: springY }}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`mx-auto max-w-7xl transition-shadow ${scrolled ? "" : ""}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-full items-center justify-between px-1 md:h-14">
            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex cursor-pointer items-center gap-1"
              aria-label="Zur Startseite"
            >
              <BrandLockup compact />
            </Link>

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center text-white md:h-12 md:w-12"
            >
              <div className="relative h-4 w-5 md:h-5 md:w-6">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-white transition-all duration-300 md:w-6 ${
                    isOpen ? "top-1.5 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-white transition-all duration-300 md:top-2 md:w-6 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-3 h-0.5 w-5 rounded-full bg-white transition-all duration-300 md:top-4 md:w-6 ${
                    isOpen ? "top-1.5 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="mt-3 flex justify-end"
            >
              <div className="w-full max-w-xs overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#07111e]/88 p-3 shadow-[0_25px_80px_rgba(0,0,0,0.38)] backdrop-blur-2xl md:max-w-sm md:p-4">
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-2xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <Link
                  href="/kontakt"
                  onClick={() => setIsOpen(false)}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-4 py-3 text-sm font-semibold text-white"
                >
                  Kontakt anfragen
                </Link>

                {sessionUser ? (
                  <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                    <div className="flex items-center gap-3">
                      <UserAvatar user={sessionUser} size="sm" />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-white">
                          {sessionUser.fullName}
                        </div>
                        <div className="truncate text-xs text-white/52">
                          {sessionUser.email}
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/konto"
                      onClick={() => setIsOpen(false)}
                      className="mt-3 flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black"
                    >
                      Profileinstellungen
                    </Link>
                    <button
                      type="button"
                      onClick={() => void handleLogout()}
                      className="mt-2 flex w-full items-center justify-center rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/80"
                    >
                      Abmelden
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/konto"
                    onClick={() => setIsOpen(false)}
                    className="mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black"
                  >
                    Anmelden / Registrieren
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
