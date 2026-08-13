import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SignalLine } from "@/components/ui/Ambience";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { parcSummary } from "@/data/catalog";

export const metadata: Metadata = {
  title: "À propos — DDSL Audio, prestataire technique à Bordeaux",
  description:
    "DDSL Audio loue, installe et exploite du matériel son, lumière, scène et vidéo à Bordeaux et en Gironde. Un parc réel, une réponse par personne.",
  alternates: { canonical: "/a-propos" },
};

const PRINCIPES = [
  {
    code: "01",
    t: "Ce qui est en ligne existe",
    d: "Chaque référence du catalogue appartient au parc DDSL Audio. Les disponibilités sont vérifiées à votre date avant toute réponse.",
  },
  {
    code: "02",
    t: "Rien ne se réserve tout seul",
    d: "Pas de paiement en ligne, pas de calendrier automatique. Une demande est lue, la date est vérifiée, puis vous recevez une réponse.",
  },
  {
    code: "03",
    t: "Le lieu décide du matériel",
    d: "Volume, matériaux, plafond, intérieur ou extérieur : la configuration se décide sur le lieu, et se discute avant la date, pas le jour même.",
  },
  {
    code: "04",
    t: "Installation optionnelle",
    d: "Vous pouvez venir chercher le matériel et l'installer vous-même, ou tout confier. Les deux se demandent au même endroit.",
  },
];

export default function AProposPage() {
  const parc = parcSummary();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "À propos", href: "/a-propos" },
        ]}
      />

      <section className="relative border-b border-ink-950/10">
        <div
          className="pointer-events-none absolute inset-0 grid-tech opacity-35"
          style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1400px] px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
          <Kicker>À propos</Kicker>
          <h1 className="display-lg mt-5 max-w-3xl text-ink-900">
            Du matériel, et quelqu'un qui sait le brancher
          </h1>
          <p className="lede mt-5 max-w-2xl">
            DDSL Audio est un prestataire technique installé à Bordeaux. Son
            métier&nbsp;: fournir le son, la lumière, la scène et la vidéo dont
            un événement a besoin — et, quand c'est demandé, les installer et
            les faire tourner jusqu'à la fin de la soirée.
          </p>
        </div>
      </section>

      {/* Le parc, en clair (fond papier) */}
      <section className="stage text-paper-50">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <span className="tech text-brass-300">Le parc</span>
            <h2 className="display-lg mt-4 max-w-2xl">
              Ce qui est disponible, catégorie par catégorie
            </h2>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-paper-200/70">
              Le catalogue correspond à l'inventaire. Il s'étoffera au fil des
              acquisitions, et chaque nouvelle référence y apparaîtra avec ses
              caractéristiques réelles.
            </p>
          </Reveal>

          <ol className="mt-12 divide-y divide-white/12 border-y border-white/14">
            {parc.map((c, i) => (
              <Reveal as="li" key={c.id} delay={i * 55}>
                <Link
                  href={`/materiel/${c.slug}`}
                  className="group grid items-baseline gap-2 py-5 sm:grid-cols-[54px_minmax(0,1fr)_auto] sm:gap-6"
                >
                  <span className="font-mono text-[13px] text-brass-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="font-display font-semibold tracking-[-0.02em] text-[22px] leading-tight transition-colors group-hover:text-brass-300">
                      {c.name}
                    </span>
                    <span className="mt-1 block text-[14.5px] text-paper-200/60">
                      {c.tagline}
                    </span>
                  </span>
                  <span className="text-[14.5px] text-paper-200/70 sm:text-right">
                    {c.detail}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Principes */}
      <section className="border-b border-ink-950/10 py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <h2 className="display-lg max-w-2xl text-ink-900">
              Comment DDSL Audio travaille
            </h2>
          </Reveal>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-[3px] border border-ink-950/11 bg-ink-950/7 sm:grid-cols-2">
            {PRINCIPES.map((p, i) => (
              <Reveal as="li" key={p.code} delay={i * 70}>
                <div className="flex h-full flex-col bg-paper-50 p-6 sm:p-7">
                  <span className="font-mono text-[13px] text-brass-600">
                    {p.code}
                  </span>
                  <h3 className="display-md mt-4 text-[1.3rem] text-ink-900">
                    {p.t}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                    {p.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
        <SignalLine className="mt-16 opacity-45" />
      </section>

      <section className="bg-paper-50 py-16 sm:py-20">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="display-md max-w-xl text-ink-900">
              Le plus simple reste de décrire votre événement
            </h2>
            <p className="mt-3 max-w-lg text-[15.5px] leading-relaxed text-ink-600">
              Une date, un lieu, un ordre de grandeur du nombre de personnes
              suffisent à démarrer.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/materiel" className="btn btn-ghost">
              Voir le matériel
            </Link>
            <Link href="/demande" className="btn btn-primary">
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
