import Link from "next/link";

import { site } from "@/data/site";

/**
 * Bandeau de réassurance, juste sous le hero.
 *
 * Il répond aux quatre objections qui arrêtent un visiteur avant qu'il
 * ne demande un devis : « je n'y connais rien », « je ne sais pas si
 * c'est libre à ma date », « je ne veux pas m'engager », « sont-ils
 * près de chez moi ». Chaque ligne reprend un engagement déjà tenu
 * ailleurs sur le site — rien n'est ajouté ici qui ne soit vrai.
 *
 * Volontairement sans cartes : quatre rectangles de plus auraient
 * répété la figure des sections suivantes.
 */
const POINTS = [
  {
    titre: "Seul ou installé",
    detail: "Vous récupérez le matériel, ou DDSL Audio le monte et le règle.",
  },
  {
    titre: "Vérifié à votre date",
    detail: "Les disponibilités sont contrôlées avant tout chiffrage.",
  },
  {
    titre: "Sans engagement",
    detail: "Aucun paiement en ligne, aucune réservation ferme.",
  },
  {
    titre: "Bordeaux et Gironde",
    detail: "Au-delà, le déplacement est chiffré ou refusé clairement.",
  },
];

export function Reassurance() {
  return (
    <section
      aria-label="Ce qui est garanti"
      className="sand border-b border-ink-950/10"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((p) => (
            <li
              key={p.titre}
              className="border-ink-950/10 py-6 sm:odd:pr-8 sm:even:border-l sm:even:pl-8 lg:border-l lg:px-7 lg:first:border-l-0 lg:first:pl-0 lg:odd:pr-7"
            >
              <p className="flex items-center gap-2.5 text-[15px] font-semibold text-ink-900">
                <span className="led led-brass" aria-hidden="true" />
                {p.titre}
              </p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink-600">
                {p.detail}
              </p>
            </li>
          ))}
        </ul>

        {site.contact.phone && (
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-ink-950/10 py-4 text-[14.5px] text-ink-600">
            Une question avant de demander un devis&nbsp;?
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="link-brass font-semibold"
            >
              {site.contact.phone}
            </a>
            <span className="text-ink-400" aria-hidden="true">
              ou
            </span>
            <Link href="/contact" className="link-brass font-semibold">
              écrire à DDSL Audio
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
