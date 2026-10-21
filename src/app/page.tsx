import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { Reassurance } from "@/components/home/Reassurance";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { parcSummary, categoryCount } from "@/data/catalog";
import { listeProduitsPublics } from "@/lib/catalogue";
import { apercuAccueil, photo } from "@/data/photos";

export const metadata: Metadata = {
  title:
    "Location de matériel son, lumière et scène à Bordeaux — DDSL Audio",
  description:
    "DDSL Audio loue son parc son, lumière, scène et vidéo à Bordeaux et en Gironde : matériel seul ou installé sur place. Régie DJ Pioneer, scène jusqu'à 24 m², vidéoprojection. Devis sur demande.",
  alternates: { canonical: "/" },
};

const FAQ = [
  {
    question: "Peut-on louer du matériel sans installation à Bordeaux ?",
    answer:
      "Oui. Le matériel se loue à l'unité ou en ensemble, à récupérer sans installation. L'installation et la mise en service restent une option, à ajouter au moment de la demande de devis.",
  },
  {
    question: "DDSL Audio installe-t-il le matériel sur place ?",
    answer:
      "Oui, l'installation et la mise en service sont proposées en complément de la location : livraison, montage, câblage et réglages sur le lieu de l'événement, à Bordeaux et en Gironde.",
  },
  {
    question: "Peut-on réserver et payer en ligne ?",
    answer:
      "Non. Le site sert à préparer une demande de devis. La sélection de matériel est transmise à DDSL Audio, qui vérifie les disponibilités à votre date avant d'établir une proposition chiffrée.",
  },
  {
    question: "Quelle surface de scène est disponible ?",
    answer:
      "Le parc permet de monter un plateau jusqu'à environ 24 m². Des surfaces plus réduites sont possibles, ainsi que la location d'éléments à l'unité.",
  },
];

export default async function HomePage() {
  const produits = await listeProduitsPublics();
  const parc = parcSummary(produits);
  const visuelLocation = photo("systeme-ligne-source-salle");
  const visuelInstallation = photo("installation-lyre");
  const visuelFinal = photo("montage-enceintes-etage");

  return (
    <>
      <Hero />
      <Reassurance />

      {/* ─────────────── Prestations : trois volets combinables ─────────────── */}
      <section className="relative border-b border-ink-950/10 py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <Kicker>Ce que fait DDSL Audio</Kicker>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <h2 className="display-lg max-w-3xl text-ink-900">
                Trois façons de travailler ensemble,
                <br className="hidden sm:block" /> qui se cumulent
              </h2>
              <p className="max-w-md text-[15px] leading-relaxed text-ink-600">
                Vous pouvez prendre le matériel et vous débrouiller, nous
                confier l'installation, ou demander une prestation complète avec
                DJ. Rien n'oblige à choisir un seul volet.
              </p>
            </div>
          </Reveal>

          {/* Trois registres différents plutôt que trois fois la même
              carte : une carte photo, une carte mixte, une carte noire.
              Les pictogrammes en filigrane à 12 % qui décoraient les
              trois blocs ne se voyaient pas et ne disaient rien. */}
          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            {/* 01 — Location : le cœur du métier, donc le plus grand bloc */}
            <Reveal className="lg:col-span-7" as="article">
              <div className="panel flex h-full flex-col overflow-hidden rounded-panel">
                {visuelLocation && (
                  <div className="media media-zoom aspect-[16/7] w-full">
                    <Image
                      src={visuelLocation.src}
                      alt={visuelLocation.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover"
                      style={{ objectPosition: visuelLocation.focus }}
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <span className="step-label">
                    <span className="step-num">01</span> Location
                  </span>
                  <h3 className="display-md mt-4 text-ink-900">
                    Le parc, à l'unité ou en système
                  </h3>
                  <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-ink-700">
                    Un système de sonorisation, une paire de CDJ et une table de
                    mixage, des lyres, un vidéoprojecteur et son écran. Vous
                    composez la liste, elle part en une seule demande.
                  </p>

                  <ul className="mt-7 flex flex-wrap gap-1.5">
                    {parc.map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/materiel/${c.slug}`}
                          className="inline-flex items-center gap-2 rounded-ctl border border-ink-950/13 px-3 py-2 text-[13px] text-ink-700 transition-colors hover:border-brass-600/55 hover:text-brass-700"
                        >
                          {c.name}
                          <span className="tech-sm text-brass-700">
                            {String(categoryCount(produits, c.id)).padStart(2, "0")}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-9">
                    <Link href="/materiel" className="btn btn-primary">
                      Parcourir le matériel
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4 lg:col-span-5">
              {/* 02 — Installation : photo carrée, texte à côté */}
              <Reveal delay={90} as="article">
                <div className="panel flex h-full overflow-hidden rounded-panel">
                  {visuelInstallation && (
                    <div className="media media-zoom hidden w-[38%] shrink-0 sm:block">
                      <Image
                        src={visuelInstallation.src}
                        alt={visuelInstallation.alt}
                        fill
                        sizes="200px"
                        className="object-cover"
                        style={{ objectPosition: visuelInstallation.focus }}
                      />
                    </div>
                  )}
                  <div className="flex-1 p-6 sm:p-7">
                    <span className="step-label">
                      <span className="step-num">02</span> Installation
                    </span>
                    <h3 className="display-md mt-3.5 text-ink-900">
                      Installé, câblé, réglé
                    </h3>
                    <p className="mt-3.5 text-[15px] leading-relaxed text-ink-700">
                      Le matériel arrive sur place, il est monté, raccordé et
                      réglé avant l'ouverture des portes.
                    </p>
                    <Link
                      href="/prestations#installation"
                      className="mt-5 inline-flex items-center gap-2 tech text-brass-600 hover:text-brass-700"
                    >
                      Installation son &amp; lumière
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>

              {/* 03 — DJ : bloc noir. Le changement de registre marque
                  que ce n'est plus de la location mais une prestation. */}
              <Reveal delay={160} as="article">
                <div className="stage flex h-full flex-col rounded-panel p-7">
                  <span className="step-label">
                    <span className="step-num">03</span> DJ &amp; musiciens
                  </span>
                  <h3 className="display-md mt-3.5 text-paper-50">
                    Quelqu'un derrière la régie
                  </h3>
                  <p className="mt-3.5 text-[15px] leading-relaxed text-paper-200/75">
                    DDSL Audio assure le DJ set, avec la régie, le son et la
                    lumière nécessaires. Des musiciens peuvent s'ajouter selon
                    le projet.
                  </p>
                  <Link
                    href="/dj"
                    className="mt-5 inline-flex items-center gap-2 tech text-brass-300 hover:text-brass-200"
                  >
                    La prestation DJ
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={120}>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-l-2 border-brass-600/45 py-1 pl-4 text-[14.5px] text-ink-600">
              Exemple courant&nbsp;:
              <span className="text-ink-800">
                régie DJ louée + lyres + installation
              </span>
              <span className="text-ink-400" aria-hidden="true">
                ·
              </span>
              <span>un seul devis, un seul interlocuteur.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────── Le parc — bloc noir, index éditorial ─────────────── */}
      <section className="relative stage text-paper-50">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <Kicker>Inventaire</Kicker>
                <h2 className="display-lg mt-5 max-w-2xl">
                  Ce qu'il y a réellement dans le parc
                </h2>
              </div>
              <p className="max-w-sm text-[15px] leading-relaxed text-paper-200/70">
                Le parc évolue. Ce qui est listé ici est disponible&nbsp;; les
                quantités et les modèles sont confirmés à votre date, avant le
                devis.
              </p>
            </div>
          </Reveal>

          <ul className="mt-14 border-t border-white/12">
            {parc.map((c, i) => (
              <Reveal as="li" key={c.id} delay={i * 55}>
                <Link
                  href={`/materiel/${c.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 border-b border-white/12 py-6 transition-colors hover:bg-white/5 sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto] sm:gap-x-8"
                >
                  <span className="font-mono text-[13px] tabular-nums text-brass-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="flex items-center gap-4">
                    <Glyph
                      name={c.id}
                      className="hidden h-8 w-8 text-paper-200/45 transition-colors group-hover:text-brass-300 sm:block"
                    />
                    <span className="font-display font-semibold text-[clamp(1.5rem,3vw,2.1rem)] leading-none tracking-[-0.03em]">
                      {c.name}
                    </span>
                  </span>

                  <span className="col-start-2 text-[14px] text-paper-200/65 sm:col-start-3 sm:text-[15px]">
                    {c.detail}
                  </span>

                  <span
                    className="col-start-3 row-start-1 justify-self-end text-brass-300 transition-transform duration-300 group-hover:translate-x-1 sm:col-start-4"
                    aria-hidden="true"
                  >
                    <svg width="26" height="10" viewBox="0 0 26 10" fill="none">
                      <path
                        d="M0 5h24M20 1l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120}>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/materiel" className="btn btn-invert">
                Ouvrir le catalogue
              </Link>
              <p className="text-[14.5px] leading-relaxed text-paper-200/65">
                Besoin de plusieurs références&nbsp;? Ajoutez tout ce qu'il vous
                faut, vous recevrez un seul devis.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────── Déroulé : chaîne de signal ─────────────── */}
      {/* Quatre étapes reliées par un fil, comme un schéma de câblage.
          Les quatre encadrés identiques d'avant ne disaient pas que les
          étapes s'enchaînent — et faisaient la même figure que les trois
          autres grilles de la page. */}
      <section className="relative border-b border-ink-950/10 py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <Kicker>De la demande au jour J</Kicker>
            <h2 className="display-lg mt-4 max-w-2xl text-ink-900">
              Comment ça se passe
            </h2>
          </Reveal>

          <ol className="chaine mt-14 grid gap-y-10 lg:grid-cols-4 lg:gap-x-10">
            {[
              {
                n: "01",
                t: "Vous sélectionnez",
                d: "Dans le catalogue, ou en décrivant simplement votre événement si vous ne connaissez pas le matériel.",
              },
              {
                n: "02",
                t: "On vérifie",
                d: "Disponibilité à votre date, cohérence de la sélection, puissance adaptée au lieu et au nombre d'invités.",
              },
              {
                n: "03",
                t: "Vous recevez le devis",
                d: "Matériel, options d'installation, prestation éventuelle. Rien n'est engagé tant que vous n'avez pas validé.",
              },
              {
                n: "04",
                t: "Le jour J",
                d: "Vous récupérez le matériel, ou DDSL Audio livre, installe et règle sur place.",
              },
            ].map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 80} className="chaine-etape">
                <span className="chaine-noeud" aria-hidden="true">
                  <span className="numeral text-[15px] text-brass-700">
                    {step.n}
                  </span>
                </span>
                <h3 className="display-sm mt-5 text-ink-900">{step.t}</h3>
                <p className="mt-2.5 max-w-sm text-[15px] leading-relaxed text-ink-600">
                  {step.d}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ─────────────── Je ne sais pas quoi choisir ─────────────── */}
      <section className="relative border-b border-ink-950/10 bg-paper-50">
        <div className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <Kicker>Aucune connaissance technique requise</Kicker>
                <h2 className="display-lg mt-5 max-w-xl text-ink-900">
                  Vous ne savez pas quel matériel choisir&nbsp;?
                </h2>
                <p className="lede mt-5 max-w-xl">
                  C'est le cas de la plupart des gens qui organisent une soirée
                  ou un mariage. Répondez à quatre questions sur votre
                  événement&nbsp;: le type, le nombre de personnes, le lieu, ce
                  dont vous avez besoin. DDSL Audio se charge du reste.
                </p>
                <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-ink-500">
                  Aucun calcul automatique, aucune configuration imposée&nbsp;:
                  vos réponses servent à préparer une proposition, qui vous est
                  ensuite expliquée.
                </p>
              </div>

              <div className="panel rounded-panel p-7">
                <span className="tech text-brass-700">Parcours guidé</span>
                <ul className="mt-6 space-y-3.5">
                  {[
                    "Quel événement préparez-vous ?",
                    "Combien de personnes ?",
                    "Intérieur ou extérieur ?",
                    "Son, lumière, scène, vidéo, DJ ?",
                  ].map((q, i) => (
                    <li key={q} className="flex items-start gap-3.5">
                      <span className="mt-0.5 font-mono text-[12px] text-brass-700">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] text-ink-700">{q}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/besoin-conseil"
                  className="btn btn-primary mt-8 w-full"
                >
                  Décrire mon événement
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────── Réalisations ─────────────── */}
      {/* Galerie volontairement dissymétrique : une grande image porte
          la section, les autres la complètent. Une grille de quatre
          vignettes égales donnait des photos toutes petites et un bloc
          interchangeable avec n'importe quel autre site. */}
      <section className="sand border-b border-ink-950/10 py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <Kicker>Sur le terrain</Kicker>
                <h2 className="display-lg mt-4 max-w-xl text-ink-900">
                  Le matériel en situation
                </h2>
                <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-600">
                  Pendant le montage et une fois le lieu équipé. Ces photos
                  viennent d'interventions réelles de DDSL Audio.
                </p>
              </div>
              <Link href="/realisations" className="btn btn-ghost self-start">
                Toutes les réalisations
              </Link>
            </div>
          </Reveal>

          {/* Mosaïque : une image maîtresse, deux moyennes, une bande
              panoramique. Les hauteurs sont pilotées par les rangées de
              la grille, sinon la colonne haute étire la colonne basse. */}
          <div className="mt-12 grid gap-3 lg:grid-cols-12 lg:auto-rows-[240px]">
            {apercuAccueil.map((p, i) => (
              <Reveal
                key={p.id}
                delay={i * 80}
                className={
                  [
                    "lg:col-span-7 lg:row-span-2",
                    "lg:col-span-5",
                    "lg:col-span-5",
                    "lg:col-span-12",
                  ][i] ?? "lg:col-span-6"
                }
              >
                <figure className="media rounded-panel media-zoom h-full">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes={i === 0 ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 42vw"}
                    className="h-full min-h-[220px] w-full object-cover"
                    style={{ objectPosition: p.focus }}
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-950/92 via-night-950/55 to-transparent px-5 pb-4 pt-12 text-[13.5px] leading-snug text-paper-100">
                    {p.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Zone d'intervention + conversion finale ─────────────── */}
      {/* Dernier temps fort : on ferme sur une photo de montage, pas sur
          un encadré blanc. Une seule action mise en avant — les trois
          boutons empilés d'avant se neutralisaient entre eux. */}
      <section className="stage relative isolate overflow-hidden">
        {visuelFinal && (
          <div className="media media-veil absolute inset-0">
            <Image
              src={visuelFinal.src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{
                objectPosition: visuelFinal.focus ?? "50% 40%",
                filter: "saturate(0.8) brightness(0.75)",
              }}
            />
          </div>
        )}

        <div className="relative mx-auto max-w-[1400px] px-4 py-24 sm:px-6 sm:py-28">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <div>
                <Kicker>Zone d'intervention</Kicker>
                <h2 className="display-lg mt-4 text-paper-50">
                  Bordeaux, Gironde
                  <br />
                  et région bordelaise
                </h2>
                <p className="lede mt-6 text-paper-200/80">
                  Le matériel part de Bordeaux. Les interventions se font dans
                  la métropole et le reste de la Gironde. Pour un événement plus
                  loin, indiquez le lieu dans votre demande&nbsp;: le
                  déplacement sera chiffré ou refusé clairement.
                </p>
              </div>

              <div className="lg:pb-2">
                <Link
                  href="/demande"
                  className="btn btn-invert w-full text-[16px] sm:min-h-[56px]"
                >
                  Décrire mon projet et recevoir un devis
                </Link>

                <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14.5px] text-paper-200/70">
                  <Link
                    href="/materiel"
                    className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-paper-50 hover:decoration-brass-300"
                  >
                    Parcourir le matériel
                  </Link>
                  <Link
                    href="/besoin-conseil"
                    className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-paper-50 hover:decoration-brass-300"
                  >
                    Je ne sais pas quoi choisir
                  </Link>
                </p>

                <p className="mt-6 border-t border-white/12 pt-4 text-[13.5px] text-paper-200/55">
                  Aucun paiement en ligne, aucune réservation ferme. La demande
                  sert à préparer un devis.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqJsonLd faq={FAQ} />
    </>
  );
}
