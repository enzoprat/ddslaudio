import Image from "next/image";
import Link from "next/link";

import { Glyph } from "@/components/ui/Glyph";
import { parcSummary } from "@/data/catalog";
import { listeProduitsPublics } from "@/lib/catalogue";
import { photo } from "@/data/photos";

/**
 * Ouverture du site.
 *
 * Le métier se vend par ce qu'il produit : un plateau monté, éclairé,
 * sonorisé. La photo passe donc au premier plan, plein cadre, et le
 * texte se pose dessus — l'inverse de la vignette de 380 px qu'il y
 * avait ici, qui réduisait le meilleur argument à une illustration.
 *
 * Le bandeau de catégories qui ferme le bloc joue le rôle d'une face
 * de rack : il annonce le parc et sert de navigation.
 */
export async function Hero() {
  const parc = parcSummary(await listeProduitsPublics());
  const visuel = photo("plateau-concert-lumiere");

  return (
    /* La marge négative annule le décalage que `main` applique pour le
       header fixe : la photo doit passer dessous, pas commencer après. */
    <section className="stage relative isolate -mt-[var(--header-h)] overflow-hidden">
      {visuel && (
        <div className="media media-veil-hero absolute inset-0">
          <Image
            src={visuel.src}
            alt={visuel.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{
              objectPosition: visuel.focus ?? "50% 46%",
              /* La salle est éclairée en rouge saturé : sans ce léger
                 retrait, elle écrase le laiton de la charte. */
              filter: "saturate(0.82) brightness(0.88)",
            }}
          />
        </div>
      )}

      <div className="relative mx-auto flex min-h-[clamp(560px,78vh,760px)] max-w-[1400px] flex-col justify-end px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-32">
        <p className="hero-in flex flex-wrap items-center gap-x-3 gap-y-2 text-[13.5px] font-semibold text-paper-200/80">
          Bordeaux · Gironde
          <span className="h-3 w-px bg-white/25" aria-hidden="true" />
          <span className="text-brass-300">Location &amp; prestation</span>
        </p>

        <h1
          className="hero-in display-xl mt-5 max-w-[16ch] text-paper-50"
          style={{ animationDelay: "70ms" }}
        >
          Son, lumière, scène, vidéo.
          <span className="mt-1.5 block text-brass-300">
            À louer seul ou installé sur place.
          </span>
        </h1>

        <p
          className="hero-in lede mt-7 text-paper-200/85"
          style={{ animationDelay: "140ms" }}
        >
          DDSL Audio loue son parc technique à Bordeaux et en Gironde. Un
          système de sonorisation pour une soirée, une régie DJ complète, ou
          toute une réception à équiper&nbsp;: la demande part du même endroit.
        </p>

        <div
          className="hero-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: "210ms" }}
        >
          <Link href="/materiel" className="btn btn-invert sm:min-w-[210px]">
            Voir le matériel
          </Link>
          <Link
            href="/besoin-conseil"
            className="btn border-white/30 text-paper-50 hover:border-brass-300/70 sm:min-w-[210px]"
          >
            Je ne sais pas quoi choisir
          </Link>
        </div>
      </div>

      {/* Face de rack : le parc en une ligne, et l'accès aux catégories. */}
      <nav
        aria-label="Catégories de matériel"
        className="relative border-t border-white/12 bg-night-950/55 backdrop-blur-md"
      >
        <ul className="mx-auto grid max-w-[1400px] grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {parc.map((c) => (
            <li key={c.id} className="border-b border-white/10 lg:border-b-0">
              <Link
                href={`/materiel/${c.slug}`}
                className="group flex h-full items-center gap-3 border-white/10 px-4 py-4 transition-colors hover:bg-white/[0.07] lg:border-l lg:first:border-l-0"
              >
                <Glyph
                  name={c.id}
                  className="h-6 w-6 shrink-0 text-paper-200/45 transition-colors group-hover:text-brass-300"
                />
                <span className="min-w-0">
                  <span className="block text-[14.5px] font-semibold leading-tight text-paper-50">
                    {c.name}
                  </span>
                  {/* Le détail est masqué sur les petites largeurs : à deux
                      colonnes il se coupait au milieu d'un mot. */}
                  <span className="mt-0.5 hidden truncate text-[12.5px] leading-tight text-paper-200/55 sm:block">
                    {c.detail}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
