'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  CheckCircle2,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';

type InquiryOption = {
  value: string;
  label: string;
  description?: string;
};

const inquiryOptions: InquiryOption[] = [
  {
    value: 'webdesign',
    label: 'Web Design',
    description: 'Einzigartige Designs für Ihre Marke',
  },
  {
    value: 'development',
    label: 'Development',
    description: 'Next.js, Astro, TypeScript',
  },
  {
    value: 'animation',
    label: 'Animation & 3D',
    description: 'GSAP, Three.js, WebGL',
  },
  {
    value: 'hosting',
    label: 'Cloud Hosting',
    description: 'Cloudflare Pages, D1, R2',
  },
  {
    value: 'full',
    label: 'Komplettpaket',
    description: 'Alles aus einer Hand',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

function RevealSection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}

function HeroWordReveal({ text }: { text: string }) {
  const words = useMemo(() => text.split(' '), [text]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-wrap justify-center gap-x-3 gap-y-2"
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
            show: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

function FloatingLabelInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  textarea = false,
  rows = 5,
}: {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  textarea?: boolean;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const baseClasses =
    'peer w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 pt-6 pb-2.5 text-white placeholder-transparent outline-none backdrop-blur-xl transition-all duration-300 focus:border-blue-400/60 focus:bg-white/[0.06]';
  const glowClasses = focused
    ? 'shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_0_30px_rgba(59,130,246,0.18)]'
    : 'shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]';

  return (
    <motion.label
      whileFocus={{ scale: 1.01 }}
      animate={focused ? { scale: 1.01 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`group relative block ${glowClasses}`}
    >
      {textarea ? (
        <textarea
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={label}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={label}
          className={baseClasses}
        />
      )}

      <motion.span
        animate={
          active
            ? { y: 0, scale: 0.82, color: 'rgba(125, 211, 252, 0.95)' }
            : { y: 14, scale: 1, color: 'rgba(255,255,255,0.5)' }
        }
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="pointer-events-none absolute left-4 top-2 origin-left text-sm font-medium"
      >
        {label}
      </motion.span>

      <motion.div
        aria-hidden
        animate={
          focused
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.98 }
        }
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/8 via-blue-500/8 to-violet-500/8"
      />
    </motion.label>
  );
}

function CustomSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: InquiryOption[];
}) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
        setFocused(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <span className="mb-2 block text-sm font-medium text-white/65">{label}</span>

      <motion.button
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          setFocused(true);
        }}
        whileTap={{ scale: 0.995 }}
        className={`group relative flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left backdrop-blur-2xl transition-all duration-300 outline-none ${
          open || focused
            ? 'border-blue-400/60 bg-white/[0.06] shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_0_30px_rgba(59,130,246,0.18)]'
            : 'border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.055]'
        }`}
      >
        <div className="min-w-0">
          <div className={`text-sm ${selected ? 'text-white' : 'text-white/45'}`}>
            {selected ? selected.label : 'Service wählen...'}
          </div>
          <AnimatePresence mode="wait">
            {selected?.description ? (
              <motion.div
                key={selected.description}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-1 truncate text-xs text-white/45"
              >
                {selected.description}
              </motion.div>
            ) : (
              <motion.div
                key="placeholder-desc"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-1 text-xs text-white/35"
              >
                Wählen Sie den gewünschten Service
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/70 transition-colors group-hover:text-blue-300"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 8, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 2, scale: 0.98, filter: 'blur(8px)' }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/70 shadow-2xl shadow-black/40 backdrop-blur-2xl"
          >
            <div className="max-h-80 overflow-y-auto p-2">
              {options.map((option, index) => {
                const active = option.value === value;

                return (
                  <motion.button
                    key={option.value}
                    type="button"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                      setFocused(false);
                    }}
                    className={`group relative mb-1 w-full rounded-xl px-4 py-3 text-left transition-all duration-200 last:mb-0 ${
                      active
                        ? 'bg-gradient-to-r from-blue-500/20 via-blue-500/15 to-violet-500/15 text-white'
                        : 'text-white/80 hover:bg-blue-400/10 hover:text-blue-200'
                    }`}
                  >
                    <div className="text-sm font-medium">{option.label}</div>
                    {option.description ? (
                      <div className="mt-1 text-xs text-white/45 group-hover:text-blue-100/70">
                        {option.description}
                      </div>
                    ) : null}
                    {active ? (
                      <motion.div
                        layoutId="selected-pill"
                        className="absolute inset-0 rounded-xl border border-blue-400/25"
                      />
                    ) : null}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactCard({
  icon,
  title,
  value,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  href?: string;
}) {
  const content = (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/8 via-transparent to-blue-500/8 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-blue-300 shadow-[0_10px_30px_rgba(34,211,238,0.08)]">
          {icon}
        </div>
        <div className="text-sm text-white/45">{title}</div>
        <div className="mt-1 text-lg font-semibold text-white">{value}</div>
        <div className="mt-2 text-sm leading-6 text-white/55">{description}</div>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block focus:outline-none">
        {content}
      </a>
    );
  }

  return content;
}

export default function KontaktPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    inquiry: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const pageRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end start'],
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orbX1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const orbX2 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const smoothOrbY1 = useSpring(orbY1, { stiffness: 60, damping: 20, mass: 0.6 });
  const smoothOrbY2 = useSpring(orbY2, { stiffness: 60, damping: 20, mass: 0.6 });
  const smoothOrbX1 = useSpring(orbX1, { stiffness: 60, damping: 20, mass: 0.6 });
  const smoothOrbX2 = useSpring(orbX2, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const handleChange = (name: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitted(false);

    await new Promise((resolve) => setTimeout(resolve, 1800));

    setIsSubmitting(false);
    setSubmitted(true);
    setForm({
      name: '',
      email: '',
      company: '',
      inquiry: '',
      message: '',
    });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen overflow-hidden bg-black text-white selection:bg-blue-400/20 selection:text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.08),transparent_25%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_20%)]" />

      <motion.div
        style={{ y: smoothOrbY1, x: smoothOrbX1 }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-24 left-[8%] h-80 w-80 rounded-full bg-blue-500/18 blur-3xl"
      />

      <motion.div
        style={{ y: smoothOrbY2, x: smoothOrbX2 }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.22, 0.35, 0.22] }}
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut', delay: 1 }}
        className="pointer-events-none absolute top-[30%] right-[6%] h-[26rem] w-[26rem] rounded-full bg-blue-600/14 blur-3xl"
      />

      <motion.div
        animate={{ y: [0, -14, 0], opacity: [0.18, 0.24, 0.18] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 0.5 }}
        className="pointer-events-none absolute bottom-[-4rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-28 sm:px-8 lg:px-10">
        <motion.section
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 backdrop-blur-xl"
          >
            Kostenlose Demo verfügbar
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            <HeroWordReveal text="Lassen wir uns unterhalten" />
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-balance text-base leading-7 text-white/60 sm:text-lg"
          >
            Erzählen Sie uns von Ihrem Projekt. Wir melden uns innerhalb von 24 Stunden zurück.
          </motion.p>
        </motion.section>

        <div className="mt-20 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealSection>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-blue-400/[0.03]" />
              <div className="relative">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Ihr Projekt
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/55 sm:text-base">
                    Teilen Sie uns Ihre Vision mit und wir finden den besten Weg.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FloatingLabelInput
                      label="Ihr Name"
                      name="name"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                    <FloatingLabelInput
                      label="Email Adresse"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FloatingLabelInput
                      label="Unternehmen"
                      name="company"
                      value={form.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                    />
                    <CustomSelect
                      label="Service"
                      value={form.inquiry}
                      onChange={(val) => handleChange('inquiry', val)}
                      options={inquiryOptions}
                    />
                  </div>

                  <FloatingLabelInput
                    label="Projekt Details"
                    name="message"
                    textarea
                    rows={6}
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                  />

                  <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-white/40">
                      Wir antworten innerhalb von 1–2 Werktagen.
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -1 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="group relative inline-flex min-w-[180px] items-center justify-center gap-2 overflow-hidden rounded-2xl border border-blue-400/20 bg-gradient-to-r from-blue-400 via-blue-500 to-violet-500 px-6 py-3.5 text-sm font-medium text-white shadow-[0_15px_40px_rgba(59,130,246,0.35)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-80"
                    >
                      <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="relative flex items-center gap-2">
                        {isSubmitting ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                              className="inline-block h-4 w-4 rounded-full border-2 border-white/35 border-t-white"
                            />
                            Wird gesendet...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Nachricht senden
                          </>
                        )}
                      </span>
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                        className="relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-emerald-100 backdrop-blur-xl"
                      >
                        <motion.div
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: [0.6, 1.12, 1], opacity: 1 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-0.5">
                            <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                          </div>
                          <div>
                            <div className="font-medium">Nachricht gesendet!</div>
                            <div className="mt-1 text-sm text-emerald-100/75">
                              Vielen Dank für Ihre Nachricht. Wir melden uns bald bei Ihnen.
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="pointer-events-none absolute inset-0"
                        >
                          <motion.div
                            animate={{
                              x: ['0%', '100%'],
                              opacity: [0, 0.35, 0],
                            }}
                            transition={{ duration: 1.4, ease: 'easeInOut' }}
                            className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl"
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          </RevealSection>

          <div className="space-y-6">
            <RevealSection>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <ContactCard
                  icon={<Mail className="h-5 w-5" />}
                  title="Email"
                  value="liz.claw@gmx.de"
                  description="Für Projektanfragen und allgemeine Fragen."
                  href="mailto:liz.claw@gmx.de"
                />
                <ContactCard
                  icon={<Phone className="h-5 w-5" />}
                  title="Telefon"
                  value="Auf Anfrage"
                  description="Verfügbar für Beratungsgespräche."
                />
                <ContactCard
                  icon={<MapPin className="h-5 w-5" />}
                  title="Standort"
                  value="Waldkraiburg, Bayern"
                  description="Wir arbeiten global mit ambitionierten Marken."
                />
                <ContactCard
                  icon={<Clock3 className="h-5 w-5" />}
                  title="Antwortzeit"
                  value="Innerhalb 24h"
                  description="Schnelle, durchdachte Antworten."
                />
              </div>
            </RevealSection>
          </div>
        </div>
      </div>
    </div>
  );
}
