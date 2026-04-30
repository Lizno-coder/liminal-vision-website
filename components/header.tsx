"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import {
  BadgeEuro,
  BriefcaseBusiness,
  Home,
  ListChecks,
  Mail,
  MapPin,
  UserRound,
} from "lucide-react";

import {
  LockUnlockIcon,
  MenuCloseIcon,
  SendIcon,
  UserPulseIcon,
} from "@/components/ui/animated-state-icons";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Branchen", href: "/branchen", icon: BriefcaseBusiness },
  { name: "Standorte", href: "/standorte", icon: MapPin },
  { name: "Ablauf", href: "/#process", icon: ListChecks },
  { name: "Preise", href: "/#pricing", icon: BadgeEuro },
  { name: "Kontakt", href: "/kontakt", icon: Mail },
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

function UserAvatar({
  user,
  size = "md",
}: {
  user: HeaderUser | null;
  size?: "sm" | "md";
}) {
  const initials = user
    ? user.fullName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";
  const sizeClass = size === "sm" ? "h-9 w-9 text-xs" : "h-10 w-10 text-sm";

  return (
    <div
      className={`${sizeClass} flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-gradient-to-br from-[#2997ff] to-[#5856d6] font-semibold text-white shadow-lg shadow-[#2997ff]/20`}
    >
      {user?.avatarDataUrl ? (
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
  const [isAccountHovered, setIsAccountHovered] = useState(false);
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
        className="gradient-login-button"
        aria-label="Zur Anmeldeseite"
        onMouseEnter={() => setIsAccountHovered(true)}
        onMouseLeave={() => setIsAccountHovered(false)}
        onFocus={() => setIsAccountHovered(true)}
        onBlur={() => setIsAccountHovered(false)}
      >
        <UserPulseIcon size={20} active={isAccountHovered} className="-ml-1 mr-1.5 text-white" />
        <span className="gradient-login-text">Anmelden</span>
      </Link>
    );
  }

  return (
    <div ref={profileRef} className="relative">
      <button
        type="button"
        onClick={() => setIsProfileOpen((current) => !current)}
        onMouseEnter={() => setIsAccountHovered(true)}
        onMouseLeave={() => setIsAccountHovered(false)}
        onFocus={() => setIsAccountHovered(true)}
        onBlur={() => setIsAccountHovered(false)}
        className="rounded-full outline-none transition hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-[#2997ff]"
        aria-label="Profilmenü öffnen"
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
                <div className="truncate text-sm font-semibold text-white">
                  {user.fullName}
                </div>
                <div className="truncate text-xs text-white/52">{user.email}</div>
              </div>
            </div>

            <Link
              href="/konto"
              onClick={() => setIsProfileOpen(false)}
              className="mt-2 flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-white/78 transition hover:bg-white/10 hover:text-white"
            >
              <UserPulseIcon size={18} />
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
              <LockUnlockIcon size={18} />
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
  const [isMenuContactHovered, setIsMenuContactHovered] = useState(false);
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
    window.addEventListener("focus", loadSession);
    window.addEventListener("pageshow", loadSession);
    window.addEventListener("liminalo-auth-change", loadSession);

    return () => {
      active = false;
      window.removeEventListener("focus", loadSession);
      window.removeEventListener("pageshow", loadSession);
      window.removeEventListener("liminalo-auth-change", loadSession);
    };
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setSessionUser(null);
    setIsOpen(false);
    window.dispatchEvent(new Event("liminalo-auth-change"));
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
      <style suppressHydrationWarning>{`
        .gradient-login-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 40px;
          padding: 0 18px;
          border: 0;
          border-radius: 999px;
          overflow: hidden;
          isolation: isolate;
          color: white;
          background: transparent;
          font-size: 13px;
          font-weight: 800;
          line-height: 1;
          transition: transform 0.2s ease;
        }

        .gradient-login-button:hover {
          transform: scale(1.03);
        }

        .gradient-login-button:active {
          transform: scale(0.99);
        }

        .gradient-login-button::before {
          content: "";
          position: absolute;
          top: -55%;
          left: -55%;
          width: 210%;
          height: 210%;
          background: conic-gradient(
            from 0deg,
            #ff6b6b,
            #4ecdc4,
            #45b7d1,
            #96ceb4,
            #feca57,
            #ff9ff3,
            #ff6b6b
          );
          z-index: -2;
          filter: blur(10px);
          transform: rotate(0deg);
          transition: transform 1.5s ease-in-out;
        }

        .gradient-login-button:hover::before {
          transform: rotate(180deg);
        }

        .gradient-login-button::after {
          content: "";
          position: absolute;
          inset: 3px;
          border-radius: 999px;
          background: #05070b;
          z-index: -1;
          filter: blur(5px);
        }

        .gradient-login-text {
          color: transparent;
          background: conic-gradient(
            from 0deg,
            #ff6b6b,
            #4ecdc4,
            #45b7d1,
            #96ceb4,
            #feca57,
            #ff9ff3,
            #ff6b6b
          );
          background-clip: text;
          -webkit-background-clip: text;
          filter: hue-rotate(0deg);
        }

        .gradient-login-button:hover .gradient-login-text {
          animation: hue-rotating 2s linear infinite;
        }

        .liminal-menu-card {
          background-color: rgba(36, 40, 50, 0.92);
          background-image:
            radial-gradient(circle at 18% 0%, rgba(41, 151, 255, 0.2), transparent 30%),
            linear-gradient(139deg, rgba(36, 40, 50, 0.94) 0%, rgba(36, 40, 50, 0.88) 42%, rgba(21, 28, 44, 0.96) 100%);
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .liminal-menu-separator {
          border-top: 1.5px solid rgba(255, 255, 255, 0.1);
        }

        .liminal-menu-element {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #9aa3b1;
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 14px;
          font-weight: 650;
          transition: transform 0.22s ease, background-color 0.22s ease, color 0.22s ease;
        }

        .liminal-menu-element svg {
          width: 18px;
          height: 18px;
          transition: stroke 0.22s ease, transform 0.22s ease;
        }

        .liminal-menu-element:hover {
          background-color: #2997ff;
          color: #ffffff;
          transform: translate(1px, -1px);
        }

        .liminal-menu-element:hover svg {
          stroke: #ffffff;
          transform: scale(1.04);
        }

        .liminal-menu-element:active {
          transform: scale(0.99);
        }

        .liminal-menu-accent {
          color: #8ecbff;
        }

        .liminal-menu-accent:hover {
          background-color: rgba(41, 151, 255, 0.18);
        }

        @media (min-width: 768px) {
          .gradient-login-button {
            min-height: 44px;
            padding: 0 24px;
            font-size: 15px;
          }
        }

        @keyframes hue-rotating {
          to {
            filter: hue-rotate(360deg);
          }
        }
      `}</style>
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

            <div className="flex items-center gap-1.5 md:gap-2">
              <AccountMenu user={sessionUser} onLogout={handleLogout} />
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
                className="inline-flex h-10 w-10 items-center justify-center text-white md:h-12 md:w-12"
              >
                <MenuCloseIcon size={34} active={isOpen} />
              </button>
            </div>
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
              <div className="liminal-menu-card w-full max-w-xs overflow-hidden p-3 backdrop-blur-2xl md:max-w-sm">
                <ul className="flex list-none flex-col gap-2 p-0">
                  {navLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="liminal-menu-element"
                      >
                        <Icon />
                        {link.name}
                      </Link>
                    </motion.div>
                    );
                  })}
                </ul>

                <Link
                  href="/kontakt"
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() => setIsMenuContactHovered(true)}
                  onMouseLeave={() => setIsMenuContactHovered(false)}
                  onFocus={() => setIsMenuContactHovered(true)}
                  onBlur={() => setIsMenuContactHovered(false)}
                  className="group mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2997ff] to-[#5eb9ff] px-4 py-3 text-sm font-bold text-white shadow-[0_14px_38px_rgba(41,151,255,0.24)] transition hover:-translate-y-0.5"
                >
                  <SendIcon size={20} active={isMenuContactHovered} className="transition group-hover:scale-105" />
                  Kontakt anfragen
                </Link>

                {sessionUser ? (
                  <div className="liminal-menu-separator mt-3 pt-3">
                    <div className="rounded-xl bg-black/20 p-3">
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
                      className="liminal-menu-element liminal-menu-accent mt-3 justify-center"
                    >
                      <UserPulseIcon size={18} />
                      Profileinstellungen
                    </Link>
                    <button
                      type="button"
                      onClick={() => void handleLogout()}
                      className="liminal-menu-element mt-1 w-full justify-center text-left hover:!bg-[#8e2a2a]"
                    >
                      <LockUnlockIcon size={18} />
                      Abmelden
                    </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/konto"
                    onClick={() => setIsOpen(false)}
                    className="liminal-menu-element liminal-menu-accent liminal-menu-separator mt-3 justify-center pt-3"
                  >
                    <UserPulseIcon size={18} />
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
