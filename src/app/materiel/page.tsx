import type { Metadata } from "next";
import Link from "next/link";

import { CategorySection } from "@/components/catalog/CategorySection";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import {
  categories,
  productsByCategory,
  categoryCount,
} from "@/data/catalog";
import { listeProduitsPublics } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Catalogue — location de matériel événementiel à Bordeaux",
  description:
    "Le parc DDSL Audio : sonorisation, éclairage, régie DJ Pioneer, scène jusqu'à 24 m², vidéoprojection et consoles de mixage. Location à Bordeaux et en Gironde, avec ou sans installation.",
  alternates: { canonical: "/materiel" },
};

export default async function MaterielPage() {
  const produits = await listeProduitsPublics();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Matériel", href: "/materiel" },
        ]}
      />

      {/* En-tête */}
      <section className="relative border-b border-ink-950/10">
        <div
          className="pointer-events-none absolute inset-0 grid-tech opacity-40"
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1400px] px-4 pb-12 pt-14 sm:px-6 sm:pb-14 sm:pt-20">
          <Kicker>Catalogue · {produits.length} références</Kicker>
          <h1 className="display-lg mt-5 max-w-3xl text-ink-900">
            Le parc technique, référence par référence
          </h1>
          <p className="lede mt-5 max-w-2xl">
            Sélectionnez ce dont vous avez besoin, ajustez les quantités,
            ajoutez l'installation si vous la souhaitez. Tout part ensuite en
            une seule demande de devis.
          </p>

          {/* Rappel du fonctionnement */}
          <ol className="mt-9 flex flex-wrap items-center gap-x-2 gap-y-3 text-[13.5px] text-ink-600">
            {[
              "Ajoutez le matériel",
              "Ajustez quantités et options",
              "Envoyez une seule demande",
            ].map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="font-mono text-[12px] text-brass-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step}
                {i < 2 && (
                  <span className="ml-2 text-ink-300" aria-hidden="true">
                    ——
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Sommaire des catégories */}
      <nav
        aria-label="Catégories de matériel"
        className="sticky top-[var(--header-h)] z-40 border-b border-ink-950/10 bg-paper-100/90 backdrop-blur-md"
      >
        <ul className="no-scrollbar mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-4 py-2.5 sm:px-6">
          {categories.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.slug}`}
                className="flex items-center gap-2 whitespace-nowrap rounded-[3px] border border-ink-950/11 px-3 py-2 text-[13px] text-ink-700 transition-colors hover:border-brass-600/55 hover:text-brass-700"
              >
                <Glyph name={c.id} className="h-4 w-4 opacity-60" />
                {c.name}
                <span className="tech-sm text-brass-700">
                  {String(categoryCount(produits, c.id)).padStart(2, "0")}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Catégories */}
      <div className="mx-auto max-w-[1400px] space-y-20 px-4 py-16 sm:space-y-24 sm:px-6 sm:py-20">
        {categories.map((c) => (
          <CategorySection
            key={c.id}
            category={c}
            products={productsByCategory(produits, c.id)}
          />
        ))}
      </div>

      {/* Rien trouvé / hésitation */}
      <section className="border-t border-ink-950/10 bg-paper-50">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="display-md text-ink-900">
              Vous ne trouvez pas ce que vous cherchez&nbsp;?
            </h2>
            <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-ink-600">
              Le parc n'est pas figé et tout n'est pas encore listé ici.
              Décrivez ce dont vous avez besoin&nbsp;: si DDSL Audio ne l'a pas,
              on vous le dira clairement.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/demande" className="btn btn-primary">
                Décrire mon besoin
              </Link>
              <Link href="/besoin-conseil" className="btn btn-ghost">
                Je ne connais pas le matériel
              </Link>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="panel rounded-[3px] p-6 sm:p-7">
              <h3 className="tech text-brass-600">Bon à savoir</h3>
              <ul className="mt-5 space-y-4">
                {[
                  "Aucun paiement en ligne : votre sélection sert uniquement à préparer un devis.",
                  "Les quantités affichées correspondent au parc, pas à la disponibilité à votre date. Elle est vérifiée avant la réponse.",
                  "L'installation reste optionnelle sur toutes les catégories : vous pouvez très bien récupérer le matériel vous-même.",
                ].map((t) => (
                  <li key={t} className="flex gap-3.5">
                    <span className="mt-[11px] h-px w-3.5 shrink-0 bg-brass-600/70" aria-hidden="true" />
                    <span className="text-[14.5px] leading-relaxed text-ink-600">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
