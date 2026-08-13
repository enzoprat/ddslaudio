import type { Metadata } from "next";
import Link from "next/link";

import { DjForm } from "@/components/dj/DjForm";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Beams, SignalLine } from "@/components/ui/Ambience";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { productsByCategory } from "@/data/catalog";

export const metadata: Metadata = {
  title: "DJ pour soirée, mariage et événement à Bordeaux",
  description:
    "Prestation DJ à Bordeaux et en Gironde : régie, sonorisation, éclairage et installation selon le lieu. Musiciens possibles. Décrivez votre soirée, DDSL Audio répond avec une proposition.",
  alternates: { canonical: "/dj" },
};

const CHAIN = [
  {
    code: "01",
    t: "La régie",
    d: "Lecteurs et table de mixage Pioneer. C'est l'outil du DJ, il arrive avec la prestation.",
  },
  {
    code: "02",
    t: "La diffusion",
    d: "Une salle de 60 personnes et une salle de 300 ne se sonorisent pas avec le même système. Le choix se fait sur le lieu, pas sur catalogue.",
  },
  {
    code: "03",
    t: "L'éclairage",
    d: "Une piste sans lumière reste une salle éclairée au néon. Les lyres habillent le plateau et suivent la soirée.",
  },
  {
    code: "04",
    t: "La mise en place",
    d: "Livraison, montage, câblage, réglages avant l'arrivée du public. Démontage à l'heure convenue.",
  },
];

const CAS = [
  {
    t: "Le lieu est déjà équipé",
    d: "Certaines salles ont leur diffusion et leur éclairage. Dans ce cas, la prestation se limite au DJ et à sa régie — on vérifie simplement que le raccordement est possible.",
  },
  {
    t: "Le lieu n'a rien",
    d: "Salle des fêtes, chai, chapiteau, jardin : tout arrive avec DDSL Audio. Son, lumière, alimentation à prévoir, installation comprise.",
  },
  {
    t: "Vous avez déjà un DJ",
    d: "Aucun problème : le matériel se loue seul. La régie, la sonorisation et l'éclairage se demandent depuis le catalogue.",
  },
];

export default function DjPage() {
  const regie = productsByCategory("regie-dj");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Prestation DJ", href: "/dj" },
        ]}
      />

      {/* En-tête */}
      <section className="relative overflow-hidden border-b border-ink-950/10">
        <Beams />
        <div
          className="pointer-events-none absolute inset-0 grid-tech opacity-30"
          style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-[1400px] gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <Kicker>Prestation DJ</Kicker>
            <h1 className="display-lg mt-5 max-w-2xl text-ink-900">
              Un DJ, et tout ce qu'il faut autour
            </h1>
            <p className="lede mt-5 max-w-xl">
              Faire venir un DJ ne suffit pas à faire tenir une soirée. Il lui
              faut une régie, une diffusion calibrée sur la salle, de la lumière
              sur la piste, et quelqu'un qui a monté tout ça avant l'arrivée des
              invités. DDSL Audio prend l'ensemble.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#demande-dj" className="btn btn-primary">
                Parler de votre soirée
              </a>
              <Link href="/materiel/regie-dj" className="btn btn-ghost">
                Voir la régie
              </Link>
            </div>
          </div>

          <div className="panel self-end rounded-[3px] p-6 sm:p-7">
            <h2 className="tech text-brass-700">La régie utilisée</h2>
            <ul className="mt-6 divide-y divide-ink-950/10 border-y border-ink-950/11">
              {regie.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/materiel/regie-dj/${p.id}`}
                    className="flex items-center gap-4 py-3.5 text-[15px] text-ink-800 transition-colors hover:text-brass-700"
                  >
                    <span className="font-mono text-[12px] text-brass-700/70">
                      {p.ref}
                    </span>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13.5px] leading-relaxed text-ink-500">
              Ce matériel appartient au parc DDSL Audio. Il se loue aussi seul,
              sans prestation.
            </p>
          </div>
        </div>
      </section>

      {/* La chaîne */}
      <section className="border-b border-ink-950/10 py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <h2 className="display-lg max-w-2xl text-ink-900">
              Ce que comprend la prestation
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-ink-600">
              Chaque élément se discute selon le lieu et le nombre de personnes.
              Rien n'est imposé&nbsp;: si la salle est déjà équipée, on n'ajoute
              pas ce qui existe déjà.
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-[3px] border border-ink-950/11 bg-ink-950/7 sm:grid-cols-2 lg:grid-cols-4">
            {CHAIN.map((c, i) => (
              <Reveal as="li" key={c.code} delay={i * 70}>
                <div className="flex h-full flex-col bg-paper-50 p-6">
                  <span className="font-mono text-[13px] text-brass-600">
                    {c.code}
                  </span>
                  <h3 className="display-md mt-4 text-[1.25rem] text-ink-900">
                    {c.t}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">
                    {c.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
        <SignalLine className="mt-16 opacity-50" />
      </section>

      {/* Musiciens (fond clair) */}
      <section id="musiciens" className="scroll-mt-24 stage text-paper-50">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div>
                <span className="tech text-brass-300">En complément</span>
                <h2 className="display-lg mt-4 max-w-xl">
                  Des musiciens sur le set
                </h2>
                <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-paper-200/70">
                  Selon le projet, la soirée peut être ouverte ou accompagnée
                  par des musiciens qui jouent sur le mix — un saxophone sur un
                  cocktail, une percussion sur une fin de soirée, un format plus
                  large pour une réception.
                </p>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-paper-200/60">
                  Ce n'est pas une option cochable&nbsp;: la formation dépend de
                  la date, du lieu et de ce que vous voulez entendre. Indiquez-le
                  dans votre demande, on en parle.
                </p>
                <a href="#demande-dj" className="btn btn-invert mt-8">
                  Le préciser dans ma demande
                </a>
              </div>

              <div className="lg:self-center">
                <p className="text-[14px] leading-relaxed text-paper-200/60">
                  Les moments où un musicien change la soirée
                </p>
                <ol className="mt-5 divide-y divide-white/12 border-y border-white/14">
                  {[
                    "Cocktail et arrivée des invités",
                    "Ouverture de soirée",
                    "Moment fort en milieu de set",
                    "Fin de soirée",
                  ].map((t, i) => (
                    <li key={t} className="flex items-baseline gap-5 py-4">
                      <span className="font-mono text-[13px] text-brass-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[16px] text-paper-200/80">{t}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 text-[14px] leading-relaxed text-paper-200/60">
                  En dehors de ces moments, le set tourne seul.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trois cas */}
      <section className="border-b border-ink-950/10 bg-paper-50 py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <Kicker>Selon votre lieu</Kicker>
            <h2 className="display-lg mt-5 max-w-2xl text-ink-900">
              Trois situations qui reviennent
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-4 lg:grid-cols-3">
            {CAS.map((c, i) => (
              <Reveal as="li" key={c.t} delay={i * 80}>
                <div className="panel flex h-full flex-col rounded-[3px] p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="tech-sm text-brass-700/80">
                      Cas {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="h-px flex-1 bg-gradient-to-r from-brass-600/35 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="display-md mt-5 text-[1.3rem] text-ink-900">
                    {c.t}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                    {c.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Formulaire */}
      <section id="demande-dj" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <Kicker>Votre demande</Kicker>
            <h2 className="display-lg mt-5 max-w-lg text-ink-900">
              Dites ce que vous préparez
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink-600">
              La date et le lieu suffisent à savoir si c'est possible. Le reste
              — horaires, nombre d'invités, ambiance — sert à préparer une
              proposition qui ressemble à votre soirée.
            </p>
            <ul className="mt-8 space-y-3.5 border-t border-ink-950/11 pt-7">
              {[
                "La date est vérifiée avant toute réponse.",
                "Le matériel proposé dépend du lieu : ce qui est déjà sur place n'est pas refacturé.",
                "Horaires de montage et de démontage fixés avec vous, pas imposés.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3.5">
                  <span className="mt-[11px] h-px w-3.5 shrink-0 bg-brass-600/70" aria-hidden="true" />
                  <span className="text-[15px] leading-relaxed text-ink-600">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-md text-[14.5px] leading-relaxed text-ink-500">
              Vous cherchez seulement du matériel, sans DJ&nbsp;?{" "}
              <Link
                href="/materiel"
                className="text-brass-600 underline underline-offset-4 hover:text-brass-700"
              >
                Le catalogue est par ici
              </Link>
              .
            </p>
          </Reveal>

          <Reveal delay={90}>
            <DjForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
