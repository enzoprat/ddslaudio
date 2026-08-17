import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Glyph } from "@/components/ui/Glyph";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { SignalLine } from "@/components/ui/Ambience";
import { categories } from "@/data/catalog";
import { photos } from "@/data/photos";
import { realisations } from "@/data/realisations";

export const metadata: Metadata = {
  title: "Réalisations — événements sonorisés à Bordeaux et en Gironde",
  description:
    "Les événements équipés par DDSL Audio à Bordeaux et en Gironde : soirées privées, mariages, événements professionnels, concerts.",
  alternates: { canonical: "/realisations" },
};

/** Format de mise en page alterné : évite la grille de cartes identiques. */
const SPANS = [
  "sm:col-span-2 lg:row-span-2",
  "sm:col-span-1",
  "sm:col-span-1",
  "sm:col-span-1",
  "sm:col-span-2",
  "sm:col-span-1",
];

export default function RealisationsPage() {
  const hasItems = realisations.length > 0;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Réalisations", href: "/realisations" },
        ]}
      />

      <section className="relative border-b border-ink-950/10">
        <div
          className="pointer-events-none absolute inset-0 grid-tech opacity-35"
          style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1400px] px-4 pb-14 pt-14 sm:px-6 sm:pt-20">
          <Kicker>Réalisations</Kicker>
          <h1 className="display-lg mt-5 max-w-3xl text-ink-900">
            Ce qui se monte, et où
          </h1>
          <p className="lede mt-5 max-w-2xl">
            Salles, chais, chapiteaux, jardins, plateaux de concert&nbsp;: chaque
            lieu impose sa contrainte.{" "}
            {hasItems
              ? "Cette page rassemble les événements équipés par DDSL Audio en Gironde et dans la région bordelaise."
              : "Voici le parc en situation, du montage à la salle prête."}
          </p>
        </div>
      </section>

      {hasItems ? (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
            <ul className="grid auto-rows-[minmax(220px,auto)] gap-3 sm:grid-cols-3">
              {realisations.map((r, i) => (
                <Reveal
                  as="li"
                  key={r.id}
                  delay={i * 60}
                  className={SPANS[i % SPANS.length]}
                >
                  <article className="panel group relative flex h-full flex-col overflow-hidden rounded-[3px]">
                    {r.cover && (
                      <div className="relative min-h-[200px] flex-1 overflow-hidden bg-paper-200">
                        <Image
                          src={r.cover}
                          alt={r.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 45vw"
                          className="object-cover transition-transform duration-700 ease-fader group-hover:scale-[1.03]"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-2 p-5">
                      <span className="text-[13px] font-medium text-brass-700">
                        {r.eventType}
                        {r.city && ` · ${r.city}`}
                      </span>
                      <h2 className="font-display font-semibold tracking-[-0.02em] text-[19px] leading-tight text-ink-900">
                        {r.title}
                      </h2>
                      <p className="text-[14.5px] leading-relaxed text-ink-600">
                        {r.summary}
                      </p>
                      {r.services.length > 0 && (
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {r.services.map((s) => (
                            <li
                              key={s}
                              className="rounded-[3px] border border-ink-950/13 px-2.5 py-1 text-[12px] text-ink-600"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
            <ul className="grid auto-rows-[minmax(230px,auto)] gap-3 sm:grid-cols-3">
              {photos.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.id}
                  delay={i * 60}
                  className={SPANS[i % SPANS.length]}
                >
                  <figure className="panel flex h-full flex-col overflow-hidden rounded-[3px]">
                    <div className="relative min-h-[190px] flex-1 bg-ink-950">
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 45vw"
                        className="object-cover"
                        style={{ objectPosition: p.focus }}
                      />
                    </div>
                    <figcaption className="px-4 py-3.5 text-[14px] leading-snug text-ink-600">
                      {p.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={90}>
              <div className="panel mt-10 rounded-[3px] p-7 sm:p-9">
                <span className="tech text-brass-700">Fiches détaillées</span>
                <h2 className="display-md mt-5 max-w-2xl text-ink-900">
                  Le détail événement par événement viendra ensuite
                </h2>
                <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-ink-600">
                  Lieu, date et liste du matériel utilisé ne sont pas publiés
                  ici&nbsp;: ils demandent l'accord des organisateurs. En
                  attendant, le catalogue montre le parc disponible et la page
                  prestations explique comment se déroule une installation.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/materiel" className="btn btn-primary">
                    Voir le matériel
                  </Link>
                  <Link href="/prestations" className="btn btn-ghost">
                    Comment ça se passe
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Types d'événements réellement couverts, sans chiffre inventé */}
            <Reveal delay={90}>
              <h2 className="display-md mt-16 text-ink-900">
                Le type d'événements équipés
              </h2>
              <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-ink-600">
                Le parc couvre aussi bien une soirée privée qu'une réception ou
                un plateau de concert. Le matériel change, la logique reste la
                même.
              </p>
            </Reveal>

            <ul className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c, i) => (
                <Reveal as="li" key={c.id} delay={i * 50}>
                  <Link
                    href={`/materiel/${c.slug}`}
                    className="panel group flex h-full items-start gap-4 rounded-[3px] p-5 transition-colors hover:border-brass-600/45"
                  >
                    <Glyph
                      name={c.id}
                      className="mt-0.5 h-8 w-8 shrink-0 text-ink-400 transition-colors group-hover:text-brass-600"
                    />
                    <span>
                      <span className="block font-display font-semibold tracking-[-0.02em] text-[17px] leading-tight text-ink-900">
                        {c.name}
                      </span>
                      <span className="mt-1 block text-[13.5px] leading-snug text-ink-500">
                        {c.tagline}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
          <SignalLine className="mt-16 opacity-40" />
        </section>
      )}

      <section className="border-t border-ink-950/10 bg-paper-50 py-16 sm:py-20">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="display-md max-w-xl text-ink-900">
              Vous avez une date et un lieu
            </h2>
            <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-ink-600">
              C'est le point de départ. Décrivez le reste, DDSL Audio revient
              vers vous avec une proposition.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/demande" className="btn btn-primary">
              Demander un devis
            </Link>
            <Link href="/besoin-conseil" className="btn btn-ghost">
              Je ne sais pas quoi choisir
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
