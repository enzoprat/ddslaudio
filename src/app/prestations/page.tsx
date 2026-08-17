import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import { SignalLine } from "@/components/ui/Ambience";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { categories } from "@/data/catalog";
import { photo } from "@/data/photos";

export const metadata: Metadata = {
  title: "Location, installation et sonorisation d'événement à Bordeaux",
  description:
    "Location de matériel événementiel, installation et mise en service son et lumière, prestation DJ. DDSL Audio intervient à Bordeaux, en Gironde et dans la région bordelaise.",
  alternates: { canonical: "/prestations" },
};

const INSTALLATION_STEPS = [
  {
    t: "Préparation",
    d: "Configuration du lieu, contraintes d'accès, alimentation électrique disponible, position de la régie. Un repérage sur place peut être proposé si le lieu le demande.",
  },
  {
    t: "Livraison et montage",
    d: "Le matériel arrive préparé. Diffusion, pieds, structures, éclairage et écrans sont mis en place.",
  },
  {
    t: "Câblage et mise en service",
    d: "Raccordements, alimentation, patch, tests de diffusion et réglages avant l'arrivée du public.",
  },
  {
    t: "Démontage",
    d: "Reprise du matériel après l'événement, à l'horaire convenu.",
  },
];

const COMBOS = [
  {
    code: "A",
    title: "Vous prenez le matériel",
    d: "Vous récupérez les références choisies, vous installez vous-même. C'est la formule la plus légère.",
    tags: ["Location seule"],
  },
  {
    code: "B",
    title: "On installe, vous gérez la soirée",
    d: "Le matériel est livré, monté et réglé. Vous n'avez plus qu'à lancer la musique ou brancher un micro.",
    tags: ["Location", "Installation"],
  },
  {
    code: "C",
    title: "On s'occupe de tout",
    d: "Matériel, installation, et quelqu'un derrière la régie du début à la fin. Avec DJ, et musiciens selon le projet.",
    tags: ["Location", "Installation", "DJ"],
  },
];

export default function PrestationsPage() {
  const visuelInstallation = photo("montage-systeme-salle");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Prestations", href: "/prestations" },
        ]}
      />

      {/* En-tête */}
      <section className="relative border-b border-ink-950/10">
        <div
          className="pointer-events-none absolute inset-0 grid-tech opacity-40"
          style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1400px] px-4 pb-14 pt-14 sm:px-6 sm:pt-20">
          <Kicker>Prestations</Kicker>
          <h1 className="display-lg mt-5 max-w-3xl text-ink-900">
            Le matériel, la mise en œuvre, ou les deux
          </h1>
          <p className="lede mt-5 max-w-2xl">
            DDSL Audio loue son parc, l'installe si vous le souhaitez, et peut
            assurer la prestation jusqu'à la fin de la soirée. Ces trois volets
            se demandent séparément ou ensemble.
          </p>
        </div>
      </section>

      {/* 01 — Location */}
      <section id="location" className="scroll-mt-24 border-b border-ink-950/10 py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <span className="tech text-brass-700/80">01 — Location</span>
              <h2 className="display-lg mt-4 text-ink-900">
                Location de matériel
              </h2>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-700">
                À l'unité ou en ensemble. Un système de sonorisation pour une
                soirée d'anniversaire, une régie DJ complète, des lyres pour
                habiller une salle, un vidéoprojecteur et son écran pour une
                réunion&nbsp;: le catalogue permet de tout demander en une fois.
              </p>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-600">
                L'installation reste optionnelle sur l'ensemble du parc. Vous
                pouvez très bien venir chercher le matériel et vous en occuper
                seul.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/materiel" className="btn btn-primary">
                  Parcourir le matériel
                </Link>
                <Link href="/demande" className="btn btn-ghost">
                  Demander un devis
                </Link>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <ul className="grid gap-2 sm:grid-cols-2">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/materiel/${c.slug}`}
                      className="panel group flex h-full flex-col gap-2.5 rounded-[3px] p-4 transition-colors hover:border-brass-600/45"
                    >
                      <Glyph
                        name={c.id}
                        className="h-7 w-7 text-ink-400 transition-colors group-hover:text-brass-600"
                      />
                      <span className="font-display font-semibold tracking-[-0.02em] text-[17px] leading-tight text-ink-900">
                        {c.name}
                      </span>
                      <span className="text-[13px] leading-snug text-ink-500">
                        {c.tagline}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 — Installation (fond clair) */}
      <section
        id="installation"
        className="scroll-mt-24 stage text-paper-50"
      >
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <span className="tech text-brass-300">02 — Installation</span>
                <h2 className="display-lg mt-4 max-w-2xl">
                  Installation et mise en service
                </h2>
                <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-paper-200/70">
                  DDSL Audio livre, monte, câble et règle le matériel sur le
                  lieu de l'événement — soirées, réceptions, mariages, concerts,
                  séminaires. Le système est testé et laissé prêt à servir avant
                  l'arrivée du public.
                </p>
              </div>

              {visuelInstallation && (
                <figure className="w-full lg:w-[420px]">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-[3px] bg-ink-950">
                    <Image
                      src={visuelInstallation.src}
                      alt={visuelInstallation.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-[13.5px] leading-snug text-paper-200/65">
                    {visuelInstallation.caption}
                  </figcaption>
                </figure>
              )}
            </div>
          </Reveal>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-[3px] border border-white/12 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {INSTALLATION_STEPS.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 70}>
                <div className="flex h-full flex-col bg-ink-900 p-6">
                  <span className="font-mono text-[13px] text-brass-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-md mt-4 text-[1.25rem]">{s.t}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-paper-200/70">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={100}>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/demande" className="btn btn-invert">
                Demander une installation
              </Link>
              <p className="max-w-xl text-[14.5px] leading-relaxed text-paper-200/65">
                Indiquez l'adresse, les horaires d'accès et l'heure d'ouverture
                au public&nbsp;: c'est ce qui conditionne le planning de montage.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — DJ & musiciens */}
      <section className="relative border-b border-ink-950/10 py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              <div>
                <span className="tech text-brass-700/80">
                  03 — DJ &amp; musiciens
                </span>
                <h2 className="display-lg mt-4 text-ink-900">
                  Le DJ arrive avec son dispositif
                </h2>
                <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-700">
                  La prestation DJ n'est pas une ligne de location de plus.
                  Elle arrive avec ce qu'il faut pour jouer&nbsp;: la régie, la
                  diffusion, l'éclairage, et l'installation si le lieu n'est pas
                  équipé. Des musiciens peuvent compléter le dispositif selon le
                  projet.
                </p>
                <Link href="/dj" className="btn btn-primary mt-8">
                  La prestation DJ en détail
                </Link>
              </div>

              <div className="panel rounded-[3px] p-6 sm:p-7">
                <h3 className="tech text-brass-600">Ce qui peut être inclus</h3>
                <ul className="mt-5 space-y-3.5">
                  {[
                    "Régie DJ (lecteurs et table de mixage)",
                    "Sonorisation adaptée au lieu",
                    "Éclairage de piste",
                    "Installation et démontage",
                    "Musiciens, selon le projet",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3.5">
                      <span className="mt-[11px] h-px w-3.5 shrink-0 bg-brass-600/70" aria-hidden="true" />
                      <span className="text-[15px] text-ink-700">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
        <SignalLine className="mt-14 opacity-50" />
      </section>

      {/* Combinaisons */}
      <section className="border-b border-ink-950/10 bg-paper-50 py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <Kicker>Trois façons de faire</Kicker>
            <h2 className="display-lg mt-5 max-w-2xl text-ink-900">
              Location seule, installation, ou prestation complète
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-4 lg:grid-cols-3">
            {COMBOS.map((c, i) => (
              <Reveal as="li" key={c.code} delay={i * 80}>
                <div className="panel flex h-full flex-col rounded-[3px] p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center border border-brass-600/55 font-mono text-[13px] text-brass-600">
                      {c.code}
                    </span>
                    <span
                      className="h-px flex-1 bg-gradient-to-r from-brass-600/40 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="display-md mt-5 text-[1.3rem] text-ink-900">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                    {c.d}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {c.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-[3px] border border-ink-950/13 px-2.5 py-1.5 text-[12px] text-ink-600"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/demande" className="btn btn-primary">
                Demander un devis
              </Link>
              <Link href="/besoin-conseil" className="btn btn-ghost">
                Je ne sais pas quoi choisir
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
