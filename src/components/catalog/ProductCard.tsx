import Link from "next/link";
import { ProductMedia } from "./ProductMedia";
import { AddToQuoteButton } from "@/components/quote/AddToQuote";
import {
  categories,
  formatPrice,
  productLabel,
  type Product,
} from "@/data/catalog";

function href(product: Product) {
  const cat = categories.find((c) => c.id === product.category);
  return `/materiel/${cat?.slug}/${product.id}`;
}

/* ─────────────────────── Carte matériel (unité) ─────────────────────── */

export function ProductCard({ product }: { product: Product }) {
  const label = productLabel(product);
  const prix = formatPrice(product.price);

  return (
    <article className="panel group relative flex h-full flex-col overflow-hidden rounded-[3px] transition-colors duration-300 hover:border-brass-600/45">
      <Link
        href={href(product)}
        className="block focus-visible:outline-offset-[-2px]"
        aria-label={`Fiche : ${product.name}`}
      >
        <ProductMedia
          product={product}
          className="h-32 border-b border-ink-950/10 transition-transform duration-500 group-hover:scale-[1.015]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="tech-sm text-brass-700">{product.ref}</span>
          {product.availableQuantity !== null && (
            <span className="tech-sm text-ink-500">
              {product.availableQuantity} au parc
            </span>
          )}
        </div>

        <h3 className="mt-2 font-display font-semibold tracking-[-0.02em] text-[1.35rem] leading-[1.05] text-ink-900">
          <Link href={href(product)} className="hover:text-brass-700">
            {product.name}
          </Link>
        </h3>

        {label && label !== product.name && (
          <p className="mt-0.5 text-[13px] text-ink-500">{label}</p>
        )}

        <p className="mt-2.5 line-clamp-3 text-[14px] leading-relaxed text-ink-600">
          {product.shortDescription}
        </p>

        <div className="mt-auto pt-5">
          {prix && (
            <p className="mb-3 font-display font-semibold tracking-[-0.02em] text-[1.15rem] leading-none text-ink-900">
              {prix}
            </p>
          )}
          {product.installationAvailable && (
            <p className="mb-3 flex items-center gap-2 text-[13px] text-ink-500">
              Installation possible
            </p>
          )}
          <AddToQuoteButton product={product} />
          <Link
            href={href(product)}
            className="mt-2 block py-1 text-center text-[13px] text-ink-500 transition-colors hover:text-brass-600"
          >
            Voir la fiche
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ──────────────── Ligne système (sonorisation, packs) ──────────────── */

export function SystemRow({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const prix = formatPrice(product.price);

  return (
    <article className="panel group grid gap-5 rounded-[3px] p-5 transition-colors duration-300 hover:border-brass-600/45 sm:grid-cols-[132px_minmax(0,1fr)_auto] sm:items-center sm:p-6">
      <Link href={href(product)} aria-label={`Fiche : ${product.name}`}>
        <ProductMedia
          product={product}
          className="h-28 rounded-[2px] border border-ink-950/10 sm:h-24"
        />
      </Link>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="tech-sm text-brass-700">{product.ref}</span>
          <span className="tech-sm text-ink-400">
            Système {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="mt-1.5 font-display font-semibold tracking-[-0.02em] text-[1.5rem] leading-none text-ink-900">
          <Link href={href(product)} className="hover:text-brass-700">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-ink-600">
          {product.shortDescription}
        </p>

        {product.packContents.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {product.packContents.map((c) => (
              <li key={c.label} className="text-[13px] text-ink-500">
                {c.quantity ? `${c.quantity} × ` : ""}
                {c.label}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-[13px] text-ink-400">
            Composition détaillée communiquée avec le devis.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:w-[210px]">
        {prix && (
          <p className="font-display font-semibold tracking-[-0.02em] text-[1.25rem] leading-none text-ink-900">
            {prix}
          </p>
        )}
        <AddToQuoteButton product={product} />
        <Link
          href={href(product)}
          className="btn btn-sm btn-ghost !border-ink-950/11"
        >
          Voir la fiche
        </Link>
      </div>
    </article>
  );
}
