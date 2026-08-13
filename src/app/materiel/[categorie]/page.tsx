import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard, SystemRow } from "@/components/catalog/ProductCard";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import {
  BreadcrumbJsonLd,
  CategoryItemListJsonLd,
} from "@/components/seo/JsonLd";
import { categories, getCategory, productsByCategory } from "@/data/catalog";

type Params = { params: Promise<{ categorie: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ categorie: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { categorie } = await params;
  const category = getCategory(categorie);
  if (!category) return {};

  return {
    title: category.seo.title,
    description: category.seo.description,
    alternates: { canonical: `/materiel/${category.slug}` },
    openGraph: {
      title: `${category.seo.title} | DDSL Audio`,
      description: category.seo.description,
      url: `/materiel/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { categorie } = await params;
  const category = getCategory(categorie);
  if (!category) notFound();

  const items = productsByCategory(category.id);
  const systems = items.filter((p) => p.kind === "system");
  const units = items.filter((p) => p.kind === "unit");
  const others = categories.filter((c) => c.id !== category.id);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Matériel", href: "/materiel" },
          { name: category.name, href: `/materiel/${category.slug}` },
        ]}
      />
      <CategoryItemListJsonLd categorySlug={category.slug} items={items} />

      {/* En-tête catégorie */}
      <section className="relative border-b border-ink-950/10">
        <div
          className="pointer-events-none absolute inset-0 grid-tech opacity-40"
          style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1400px] px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-14">
          <nav aria-label="Fil d'ariane" className="text-[13.5px] text-ink-500">
            <Link href="/materiel" className="hover:text-brass-600">
              Matériel
            </Link>
            <span className="mx-2 text-ink-400">/</span>
            <span className="text-ink-700">{category.name}</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Kicker>{category.tagline}</Kicker>
              <h1 className="display-lg mt-5 max-w-2xl text-ink-900">
                {category.name}
              </h1>
              <p className="lede mt-5 max-w-2xl">{category.intro}</p>
            </div>

            <span
              className="hidden text-brass-600/20 lg:block"
              aria-hidden="true"
            >
              <Glyph name={category.id} className="h-40 w-40" />
            </span>
          </div>
        </div>
      </section>

      {/* Matériel */}
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-16">
        {systems.length > 0 && (
          <div className="space-y-3">
            {systems.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <SystemRow product={p} index={i} />
              </Reveal>
            ))}
          </div>
        )}

        {units.length > 0 && (
          <ul
            className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
              systems.length > 0 ? "mt-4" : ""
            }`}
          >
            {units.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 55} className="h-full">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
        )}

        {category.hint && (
          <Reveal>
            <p className="mt-8 border-l-2 border-brass-600/45 py-1 pl-4 text-[15px] leading-relaxed text-ink-600">
              {category.hint}
            </p>
          </Reveal>
        )}

        <Reveal>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/demande" className="btn btn-primary">
              Demander un devis
            </Link>
            <Link href="/besoin-conseil" className="btn btn-ghost">
              Je ne sais pas quoi choisir
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Autres catégories */}
      <section className="border-t border-ink-950/10 bg-paper-50">
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6">
          <h2 className="display-md text-ink-900">
            Les autres catégories
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/materiel/${c.slug}`}
                  className="panel group flex h-full items-center gap-3.5 rounded-[3px] p-4 transition-colors hover:border-brass-600/45"
                >
                  <Glyph
                    name={c.id}
                    className="h-6 w-6 shrink-0 text-ink-400 transition-colors group-hover:text-brass-600"
                  />
                  <span className="font-display font-semibold tracking-[-0.02em] text-[15px] leading-tight text-ink-900">
                    {c.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
