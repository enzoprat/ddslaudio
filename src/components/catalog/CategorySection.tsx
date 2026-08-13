import { ProductCard, SystemRow } from "./ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import type { Category, Product } from "@/data/catalog";

/**
 * Bloc catégorie. Les systèmes s'affichent en lignes de rack,
 * le matériel à l'unité en grille : deux traitements distincts,
 * parce que ce ne sont pas les mêmes objets.
 */
export function CategorySection({
  category,
  products,
  headingLevel = "h2",
}: {
  category: Category;
  products: Product[];
  headingLevel?: "h2" | "h3";
}) {
  const systems = products.filter((p) => p.kind === "system");
  const units = products.filter((p) => p.kind === "unit");
  const Heading = headingLevel;

  return (
    <section id={category.slug} className="scroll-mt-24">
      <Reveal>
        <header className="flex flex-col gap-4 border-b border-ink-950/11 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center border border-ink-950/11 bg-paper-200 text-brass-600/85">
              <Glyph name={category.id} className="h-6 w-6" />
            </span>
            <div>
              <span className="tech-sm text-brass-700">{category.code}</span>
              <Heading className="display-md mt-1 text-ink-900">
                {category.name}
              </Heading>
            </div>
          </div>
          <p className="text-[14px] text-ink-500 sm:text-right">
            {category.tagline}
          </p>
        </header>

        <p className="mt-6 max-w-3xl text-[15.5px] leading-relaxed text-ink-700">
          {category.intro}
        </p>
      </Reveal>

      {systems.length > 0 && (
        <div className="mt-8 space-y-3">
          {systems.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <SystemRow product={p} index={i} />
            </Reveal>
          ))}
        </div>
      )}

      {units.length > 0 && (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {units.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 55} className="h-full">
              <ProductCard product={p} />
            </Reveal>
          ))}
        </ul>
      )}

      {category.hint && (
        <Reveal>
          <p className="mt-6 flex items-start gap-3 border-l-2 border-brass-600/45 py-1 pl-4 text-[14.5px] leading-relaxed text-ink-600">
            {category.hint}
          </p>
        </Reveal>
      )}
    </section>
  );
}
