import Link from "next/link";
import { Glyph } from "@/components/ui/Glyph";
import { categories } from "@/data/catalog";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1000px] px-4 pb-24 pt-20 sm:px-6 sm:pt-28">
      <div className="flex items-center gap-3">
        <span className="tech text-ink-500">Erreur 404, signal perdu</span>
      </div>

      <h1 className="display-lg mt-5 max-w-2xl text-ink-900">
        Cette page n'existe pas
      </h1>
      <p className="lede mt-5 max-w-xl">
        Le lien est peut-être ancien, ou la référence a changé de nom. Le
        catalogue reste accessible ci-dessous.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          Retour à l'accueil
        </Link>
        <Link href="/materiel" className="btn btn-ghost">
          Voir le matériel
        </Link>
      </div>

      <ul className="mt-14 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <li key={c.id}>
            <Link
              href={`/materiel/${c.slug}`}
              className="panel panel-link group flex h-full items-center gap-4 rounded-panel p-4"
            >
              <Glyph
                name={c.id}
                className="h-7 w-7 shrink-0 text-ink-400 transition-colors group-hover:text-brass-600"
              />
              <span className="font-display font-semibold tracking-[-0.02em] text-[16px] leading-tight text-ink-900">
                {c.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
