import Image from "next/image";
import Link from "next/link";
import { Beams, VuMeter } from "@/components/ui/Ambience";
import { Glyph } from "@/components/ui/Glyph";
import { parcSummary } from "@/data/catalog";
import { listeProduitsPublics } from "@/lib/catalogue";
import { photo } from "@/data/photos";

export async function Hero() {
  const parc = parcSummary(await listeProduitsPublics());
  const visuel = photo("regie-dj-colonnes");

  return (
    <section className="relative grain overflow-hidden border-b border-ink-950/10">
      <Beams />

      {/* Trame technique, plus dense en bas */}
      <div
        className="pointer-events-none absolute inset-0 grid-tech opacity-[0.55]"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 55%, black 88%, transparent)",
        }}
        aria-hidden="true"
      />
      {/* Halo de sol */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 100%, rgba(192,148,66,0.10), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.1fr_minmax(0,380px)] lg:items-end lg:gap-16 lg:pb-20 lg:pt-28">
        {/* Colonne éditoriale */}
        <div className="reveal">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 tech text-ink-600">
            Bordeaux · Gironde
            <span className="h-3 w-px bg-ink-950/14" aria-hidden="true" />
            <span className="text-brass-700">Location &amp; prestation</span>
          </p>

          <h1 className="display-xl mt-6 max-w-[15ch] text-ink-900">
            Son, lumière, scène, vidéo.
            <span className="mt-2 block text-brass-700">
              À louer seul ou installé sur place.
            </span>
          </h1>

          <p className="lede mt-7 max-w-xl">
            DDSL Audio loue son parc technique à Bordeaux et en Gironde. Un
            système de sonorisation pour une soirée, une régie DJ complète, ou
            toute une réception à équiper&nbsp;: la demande part du même
            endroit.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/materiel" className="btn btn-primary sm:min-w-[210px]">
              Voir le matériel
            </Link>
            <Link href="/demande" className="btn btn-ghost sm:min-w-[190px]">
              Demander un devis
            </Link>
          </div>

          <p className="mt-7 max-w-md border-l-2 border-brass-600/45 py-1 pl-4 text-[14px] leading-relaxed text-ink-500">
            Vous prenez le matériel et vous vous débrouillez, ou DDSL Audio
            vient l'installer. Le choix se fait au moment du devis, pas avant.
          </p>
        </div>

        {/* Panneau de rack : état du parc */}
        <aside
          className="panel reveal overflow-hidden rounded-[3px]"
          style={{ animationDelay: "160ms" }}
        >
          {visuel && (
            <div className="relative aspect-[4/3] w-full bg-ink-950">
              <Image
                src={visuel.src}
                alt={visuel.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-cover"
              />
            </div>
          )}

          <header className="flex items-center justify-between gap-3 border-b border-ink-950/10 px-4 py-3">
            <h2 className="tech text-ink-800">Le parc</h2>
            <VuMeter bars={9} className="opacity-70" />
          </header>

          <ul className="divide-y divide-ink-950/8">
            {parc.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/materiel/${c.slug}`}
                  className="group flex items-center gap-3.5 px-4 py-3 transition-colors hover:bg-ink-950/4"
                >
                  <Glyph
                    name={c.id}
                    className="h-6 w-6 shrink-0 text-ink-400 transition-colors group-hover:text-brass-600"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display font-semibold tracking-[-0.02em] text-[16px] leading-tight text-ink-900">
                      {c.name}
                    </span>
                    <span className="block text-[13px] leading-tight text-ink-500">
                      {c.detail}
                    </span>
                  </span>
                  <span className="tech-sm shrink-0 text-brass-700 transition-colors group-hover:text-brass-600">
                    {c.code}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="border-t border-ink-950/10 px-4 py-3 text-[12.5px] leading-relaxed text-ink-500">
            Chaque catégorie se loue seule ou avec les autres. Les
            disponibilités sont vérifiées à votre date avant l'envoi du devis.
          </p>
        </aside>
      </div>
    </section>
  );
}
