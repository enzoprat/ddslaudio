import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductMedia } from "@/components/catalog/ProductMedia";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductQuoteForm } from "@/components/quote/AddToQuote";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import {
  categories,
  getCategory,
  getProduct,
  formatPrice,
  hasSpecs,
  productLabel,
  productsByCategory,
} from "@/data/catalog";
import { site } from "@/data/site";
import { listeProduitsPublics } from "@/lib/catalogue";

type Params = { params: Promise<{ categorie: string; produit: string }> };

export async function generateStaticParams() {
  return (await listeProduitsPublics()).map((p) => {
    const cat = categories.find((c) => c.id === p.category);
    return { categorie: cat!.slug, produit: p.id };
  });
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { categorie, produit } = await params;
  const product = getProduct(await listeProduitsPublics(), produit);
  const category = getCategory(categorie);
  if (!product || !category) return {};

  const label = productLabel(product);
  const title = `${product.name} — location à Bordeaux`;

  return {
    title,
    description: `${product.shortDescription} Location à Bordeaux et en Gironde chez DDSL Audio, avec ou sans installation.`,
    alternates: {
      canonical: `/materiel/${category.slug}/${product.id}`,
    },
    openGraph: {
      title: `${title} | DDSL Audio`,
      description: product.shortDescription,
      url: `/materiel/${category.slug}/${product.id}`,
      ...(label ? { siteName: site.name } : {}),
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { categorie, produit } = await params;
  const produits = await listeProduitsPublics();
  const product = getProduct(produits, produit);
  const category = getCategory(categorie);

  if (!product || !category || product.category !== category.id) notFound();

  const label = productLabel(product);
  const prix = formatPrice(product.price);
  const related = productsByCategory(produits, category.id).filter(
    (p) => p.id !== product.id && p.kind === "unit",
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Matériel", href: "/materiel" },
          { name: category.name, href: `/materiel/${category.slug}` },
          {
            name: product.name,
            href: `/materiel/${category.slug}/${product.id}`,
          },
        ]}
      />

      <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <nav aria-label="Fil d'ariane" className="text-[13.5px] text-ink-500">
          <Link href="/materiel" className="hover:text-brass-600">
            Matériel
          </Link>
          <span className="mx-2 text-ink-400">/</span>
          <Link
            href={`/materiel/${category.slug}`}
            className="hover:text-brass-600"
          >
            {category.name}
          </Link>
          <span className="mx-2 text-ink-400">/</span>
          <span className="text-ink-700">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14">
          {/* Colonne fiche */}
          <div>
            <ProductMedia
              product={product}
              size="large"
              className="h-56 rounded-[3px] border border-ink-950/11 sm:h-72"
            />

            <div className="mt-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="tech-sm text-brass-700">{product.ref}</span>
                <span className="tech-sm text-ink-400">
                  {category.name}
                  {product.subcategory ? ` · ${product.subcategory}` : ""}
                </span>
              </div>

              <h1 className="display-lg mt-3 text-ink-900">{product.name}</h1>

              {label && label !== product.name && (
                <p className="mt-2 text-[15px] text-ink-500">{label}</p>
              )}

              <p className="lede mt-5 max-w-2xl">{product.shortDescription}</p>

              {product.description && (
                <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-ink-600">
                  {product.description}
                </p>
              )}
            </div>

            {/* Caractéristiques */}
            {hasSpecs(product) && (
              <section className="mt-10">
                <h2 className="tech text-brass-600">Caractéristiques</h2>
                <dl className="mt-4 overflow-hidden rounded-[3px] border border-ink-950/11">
                  {Object.entries(product.specifications).map(([k, v], i) => (
                    <div
                      key={k}
                      className={`grid gap-1 px-4 py-3 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-4 ${
                        i % 2 === 0 ? "bg-paper-50" : "bg-paper-200"
                      }`}
                    >
                      <dt className="tech-sm text-ink-500">{k}</dt>
                      <dd className="text-[15px] text-ink-800">{v}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {/* Composition du système */}
            {product.packContents.length > 0 && (
              <section className="mt-10">
                <h2 className="tech text-brass-600">Contenu</h2>
                <ul className="mt-4 divide-y divide-ink-950/10 rounded-[3px] border border-ink-950/11">
                  {product.packContents.map((c) => (
                    <li
                      key={c.label}
                      className="flex items-center justify-between gap-4 px-4 py-3"
                    >
                      <span className="text-[15px] text-ink-800">
                        {c.productId ? (
                          <Link
                            href={`/materiel/${category.slug}/${c.productId}`}
                            className="hover:text-brass-600"
                          >
                            {c.label}
                          </Link>
                        ) : (
                          c.label
                        )}
                      </span>
                      {c.quantity != null && (
                        <span className="font-mono text-[13px] tabular-nums text-brass-600">
                          × {c.quantity}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Accessoires */}
            {product.accessories.length > 0 && (
              <section className="mt-10">
                <h2 className="tech text-brass-600">Accessoires fournis</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {product.accessories.map((a) => (
                    <li
                      key={a}
                      className="rounded-[3px] border border-ink-950/11 px-3 py-2 text-[14px] text-ink-700"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Informations complémentaires */}
            {product.notes && (
              <p className="mt-10 border-l-2 border-brass-600/45 py-1 pl-4 text-[15px] leading-relaxed text-ink-600">
                {product.notes}
              </p>
            )}
          </div>

          {/* Colonne demande */}
          <aside className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
            <div className="panel rounded-[3px] p-6">
              <div className="flex items-baseline justify-between gap-4 border-b border-ink-950/10 pb-4">
                <h2 className="tech text-ink-800">Ajouter à ma demande</h2>
                {prix && (
                  <span className="font-display font-semibold tracking-[-0.02em] text-[1.4rem] leading-none text-ink-900">
                    {prix}
                  </span>
                )}
              </div>

              <dl className="grid gap-2 py-4 text-[14px]">
                {product.availableQuantity !== null && (
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-ink-500">Au parc</dt>
                    <dd className="font-mono tabular-nums text-ink-800">
                      {product.availableQuantity}
                    </dd>
                  </div>
                )}
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-ink-500">Installation</dt>
                  <dd className="text-ink-800">
                    {product.installationAvailable
                      ? "Disponible en option"
                      : "Non proposée"}
                  </dd>
                </div>
              </dl>

              <div className="border-t border-ink-950/10 pt-5">
                <ProductQuoteForm product={product} />
              </div>
            </div>

            <p className="mt-4 text-[13.5px] leading-relaxed text-ink-500">
              Un doute sur la compatibilité avec le reste de votre
              sélection&nbsp;? DDSL Audio la vérifie avant de vous envoyer le
              devis.
            </p>
          </aside>
        </div>

        {/* Dans la même catégorie */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="flex items-end justify-between gap-4 border-b border-ink-950/11 pb-4">
              <h2 className="display-md text-ink-900">
                Dans {category.name.toLowerCase()}
              </h2>
              <Link
                href={`/materiel/${category.slug}`}
                className="tech text-brass-600 hover:text-brass-700"
              >
                Tout voir
              </Link>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {related.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
