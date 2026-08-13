import Link from "next/link";
import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import { Beams, SignalLine } from "@/components/ui/Ambience";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { parcSummary, categoryCount } from "@/data/catalog";

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

export default function HomePage() {
  const parc = parcSummary();

  return (
    <>
      <Hero />
      <Marquee />

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

          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            {/* Bloc principal : location */}
            <Reveal className="lg:col-span-7" as="article">
              <div className="panel perf relative flex h-full flex-col overflow-hidden rounded-[3px] p-7 sm:p-9">
                <div
                  className="pointer-events-none absolute -right-10 -top-10 text-brass-600/12"
                  aria-hidden="true"
                >
                  <Glyph name="sonorisation" className="h-56 w-56" />
                </div>

                <div className="relative">
                  <span className="tech text-brass-700/80">01 — Location</span>
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
                          className="inline-flex items-center gap-2 rounded-[3px] border border-ink-950/13 px-3 py-2 text-[13px] text-ink-700 transition-colors hover:border-brass-600/55 hover:text-brass-700"
                        >
                          {c.name}
                          <span className="tech-sm text-brass-700">
                            {String(categoryCount(c.id)).padStart(2, "0")}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative mt-auto pt-9">
                  <Link href="/materiel" className="btn btn-primary">
                    Parcourir le matériel
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Deux blocs secondaires */}
            <div className="grid gap-4 lg:col-span-5">
              <Reveal delay={90} as="article">
                <div className="panel relative h-full overflow-hidden rounded-[3px] p-7">
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 text-brass-600/12"
                    aria-hidden="true"
                  >
                    <Glyph name="lumiere" className="h-40 w-40" />
                  </div>
                  <span className="tech text-brass-700/80">
                    02 — Installation
                  </span>
                  <h3 className="display-md mt-3.5 text-ink-900">
                    Installé, câblé, réglé
                  </h3>
                  <p className="relative mt-3.5 text-[15px] leading-relaxed text-ink-700">
                    Le matériel arrive sur place, il est monté, raccordé et
                    réglé avant l'ouverture des portes. Vous ne touchez ni à un
                    câble, ni à un ampli.
                  </p>
                  <Link
                    href="/prestations#installation"
                    className="mt-5 inline-flex items-center gap-2 tech text-brass-600 hover:text-brass-700"
                  >
                    Installation son &amp; lumière
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={160} as="article">
                <div className="panel relative h-full overflow-hidden rounded-[3px] p-7">
                  <div
                    className="pointer-events-none absolute -right-6 -bottom-8 text-brass-600/12"
                    aria-hidden="true"
                  >
                    <Glyph name="regie-dj" className="h-40 w-40" />
                  </div>
                  <span className="tech text-brass-700/80">
                    03 — DJ &amp; musiciens
                  </span>
                  <h3 className="display-md mt-3.5 text-ink-900">
                    Quelqu'un derrière la régie
                  </h3>
                  <p className="relative mt-3.5 text-[15px] leading-relaxed text-ink-700">
                    DDSL Audio assure le DJ set, avec la régie, le son et la
                    lumière nécessaires. Des musiciens peuvent s'ajouter selon
                    le projet.
                  </p>
                  <Link
                    href="/dj"
                    className="mt-5 inline-flex items-center gap-2 tech text-brass-600 hover:text-brass-700"
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
              <span className="text-ink-400">—</span>
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
      <section className="relative border-b border-ink-950/10 py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <Kicker>De la demande au jour J</Kicker>
            <h2 className="display-lg mt-5 max-w-2xl text-ink-900">
              Comment ça se passe
            </h2>
          </Reveal>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-[3px] border border-ink-950/11 bg-ink-950/7 sm:grid-cols-2 lg:grid-cols-4">
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
              <Reveal as="li" key={step.n} delay={i * 70}>
                <div className="relative flex h-full flex-col bg-paper-50 p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[13px] text-brass-700">
                      {step.n}
                    </span>
                    <span
                      className="h-px flex-1 bg-gradient-to-r from-brass-600/50 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="display-md mt-5 text-[1.35rem] text-ink-900">
                    {step.t}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">
                    {step.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ─────────────── Je ne sais pas quoi choisir ─────────────── */}
      <section className="relative grain overflow-hidden border-b border-ink-950/10 bg-paper-50">
        <Beams className="opacity-60" />
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

              <div className="panel rounded-[3px] p-7">
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
        <SignalLine className="opacity-60" />
      </section>

      {/* ─────────────── Réalisations ─────────────── */}
      <section className="border-b border-ink-950/10 py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <Kicker>Sur le terrain</Kicker>
                <h2 className="display-lg mt-5 max-w-xl text-ink-900">
                  Réalisations
                </h2>
              </div>
              <Link href="/realisations" className="btn btn-ghost self-start">
                Voir la section
              </Link>
            </div>
            <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-ink-600">
              Cette section accueillera les photos et vidéos des événements
              équipés à Bordeaux et en Gironde, avec le détail du matériel
              utilisé sur chacun.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────── Zone d'intervention + conversion finale ─────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <div className="panel relative overflow-hidden rounded-[3px]">
              <div
                className="pointer-events-none absolute inset-0 grid-tech opacity-40"
                aria-hidden="true"
              />
              <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:p-14">
                <div>
                  <Kicker>Zone d'intervention</Kicker>
                  <h2 className="display-lg mt-5 text-ink-900">
                    Bordeaux, Gironde
                    <br />
                    et région bordelaise
                  </h2>
                  <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-ink-600">
                    Le matériel part de Bordeaux. Les interventions se font dans
                    la métropole et le reste de la Gironde. Pour un événement
                    plus loin, indiquez le lieu dans votre demande&nbsp;: le
                    déplacement sera chiffré ou refusé clairement.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link href="/demande" className="btn btn-primary w-full">
                    Demander un devis
                  </Link>
                  <Link href="/materiel" className="btn w-full">
                    Voir le matériel
                  </Link>
                  <Link href="/besoin-conseil" className="btn btn-ghost w-full">
                    Je ne sais pas quoi choisir
                  </Link>
                  <p className="pt-2 text-center text-[13px] text-ink-500">
                    Aucun paiement en ligne · aucune réservation ferme
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqJsonLd faq={FAQ} />
    </>
  );
}
