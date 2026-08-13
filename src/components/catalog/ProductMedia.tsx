import Image from "next/image";
import { Glyph } from "@/components/ui/Glyph";
import type { Product } from "@/data/catalog";

/**
 * Visuel de fiche. Tant qu'aucune photo n'est fournie, on affiche
 * une plaque technique dessinée plutôt qu'une image générique.
 */
export function ProductMedia({
  product,
  className = "",
  size = "card",
}: {
  product: Product;
  className?: string;
  size?: "card" | "large";
}) {
  const glyphSize = size === "large" ? "h-24 w-24" : "h-14 w-14";

  if (product.images.length > 0) {
    return (
      <div className={`relative overflow-hidden bg-paper-200 ${className}`}>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`perf relative flex items-center justify-center overflow-hidden bg-paper-200 ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, rgba(192,148,66,0.10), transparent 62%)",
        }}
      />
      <Glyph
        name={product.category}
        className={`relative text-ink-300 ${glyphSize}`}
      />
      <span className="absolute bottom-2 right-2.5 tech-sm text-ink-300">
        {product.ref}
      </span>
    </div>
  );
}
