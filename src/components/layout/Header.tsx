"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Glyph } from "@/components/ui/Glyph";
import { useQuote } from "@/components/quote/QuoteProvider";
import { categories, categoryCount } from "@/data/catalog";

const NAV = [
  { href: "/prestations", label: "Prestations" },
  { href: "/dj", label: "DJ" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { count, open, hydrated } = useQuote();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  const isMateriel = pathname.startsWith("/materiel");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-colors duration-300 ${
          scrolled || mobileOpen || megaOpen
            ? "bg-paper-100/90 backdrop-blur-md border-b border-ink-950/10"
            : "border-b border-transparent"
        }`}
        style={{ height: "var(--header-h)" }}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-[1400px] items-center gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className="shrink-0 py-2"
            aria-label="DDSL Audio — accueil"
          >
            <Logo size="sm" />
          </Link>

          {/* Navigation desktop */}
          <nav
            className="ml-4 hidden items-center gap-0.5 lg:flex"
            aria-label="Navigation principale"
          >
            <div
              className="relative"
              onMouseEnter={() => {
                cancelClose();
                setMegaOpen(true);
              }}
              onMouseLeave={scheduleClose}
            >
              <Link
                href="/materiel"
                aria-expanded={megaOpen}
                onClick={() => setMegaOpen(false)}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-[15px] font-medium transition-colors ${
                  isMateriel
                    ? "text-brass-600"
                    : "text-ink-600 hover:text-ink-900"
                }`}
              >
                Matériel
                <svg
                  width="8"
                  height="5"
                  viewBox="0 0 8 5"
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                >
                  <path d="M0 0l4 5 4-5" fill="currentColor" />
                </svg>
              </Link>
            </div>

            {NAV.map((n) => {
              const active = pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`px-3 py-2.5 text-[15px] font-medium transition-colors ${
                    active
                      ? "text-brass-600"
                      : "text-ink-600 hover:text-ink-900"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={open}
              className={`group inline-flex h-10 items-center gap-2.5 rounded-[3px] border px-3 transition-colors ${
                count > 0
                  ? "border-brass-600/60 bg-brass-100/50 text-brass-700"
                  : "border-ink-950/15 text-ink-600 hover:border-ink-950/28 hover:text-ink-900"
              }`}
            >
              {count > 0 && <span className="led led-brass" />}
              <span className="hidden text-[15px] font-medium sm:inline">Ma demande</span>
              <span className="text-[15px] font-medium sm:hidden">Demande</span>
              <span className="font-mono text-xs tabular-nums">
                ({hydrated ? count : 0})
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-[3px] border border-ink-950/15 text-ink-800 lg:hidden"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
            >
              <span className="relative block h-[11px] w-4">
                <span
                  className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-250 ${
                    mobileOpen ? "top-[5px] rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[5px] h-[1.5px] w-full bg-current transition-opacity duration-200 ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-250 ${
                    mobileOpen ? "top-[5px] -rotate-45" : "top-[10px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mega menu matériel */}
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className={`absolute inset-x-0 top-full hidden origin-top border-b border-ink-950/10 bg-paper-100/95 backdrop-blur-md transition-all duration-250 lg:block ${
            megaOpen
              ? "visible opacity-100 translate-y-0"
              : "invisible opacity-0 -translate-y-2"
          }`}
        >
          <div className="mx-auto grid max-w-[1400px] gap-8 px-6 py-8 xl:grid-cols-[1fr_300px]">
            <ul className="grid grid-cols-3 gap-x-6 gap-y-1">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/materiel/${c.slug}`}
                    className="group flex items-start gap-3.5 rounded-[3px] p-3 transition-colors hover:bg-ink-950/4"
                  >
                    <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center border border-ink-950/11 bg-paper-200 text-brass-600/85 transition-colors group-hover:border-brass-600/45 group-hover:text-brass-600">
                      <Glyph name={c.id} className="h-6 w-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-baseline gap-2">
                        <span className="font-display font-semibold tracking-[-0.02em] text-[17px] leading-tight text-ink-900">
                          {c.name}
                        </span>
                        <span className="tech-sm text-brass-700">
                          {String(categoryCount(c.id)).padStart(2, "0")}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-ink-600">
                        {c.tagline}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden border-l border-ink-950/10 pl-8 xl:block">
              <p className="tech text-brass-700/80">Vous hésitez</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
                Décrivez votre événement en quatre questions. DDSL Audio prépare
                une proposition à partir de vos réponses.
              </p>
              <Link
                href="/besoin-conseil"
                className="btn btn-sm btn-ghost mt-5 w-full"
              >
                Je ne sais pas quoi choisir
              </Link>
              <Link href="/materiel" className="btn btn-sm mt-2 w-full">
                Tout le parc
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile — hors du <header>, dont le backdrop-filter ferait
          de lui le bloc conteneur des enfants en position fixed. */}
      <div
        className={`fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[65] overflow-y-auto overscroll-contain bg-paper-100 transition-all duration-300 lg:hidden ${
          mobileOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <nav className="px-4 pb-10 pt-4" aria-label="Navigation mobile">
          <p className="tech mb-3 px-1 text-brass-700/80">Matériel</p>
          <ul className="grid grid-cols-2 gap-2">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/materiel/${c.slug}`}
                  className="panel flex h-full flex-col gap-2 rounded-[3px] p-3.5"
                >
                  <Glyph name={c.id} className="h-6 w-6 text-brass-600/85" />
                  <span className="font-display font-semibold tracking-[-0.02em] text-[15px] leading-tight text-ink-900">
                    {c.name}
                  </span>
                  <span className="text-[13px] leading-snug text-ink-500">
                    {c.tagline}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/materiel"
            className="btn btn-ghost mt-3 w-full justify-between"
          >
            Tout le parc <span aria-hidden="true">→</span>
          </Link>

          <div className="my-6 rule-brass" />

          <ul className="space-y-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="flex items-center justify-between border-b border-ink-950/8 py-4 font-display font-semibold tracking-[-0.02em] text-2xl text-ink-900"
                >
                  {n.label}
                  <span className="tech-sm text-brass-700" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-7 space-y-2.5">
            <Link href="/besoin-conseil" className="btn btn-ghost w-full">
              Je ne sais pas quoi choisir
            </Link>
            <Link href="/demande" className="btn btn-primary w-full">
              Demander un devis
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
