"use client";

/**
 * Éléments d'ambiance : lumière scénique et signal audio.
 * Uniquement transform + opacity (pas de reflow), désactivés
 * automatiquement via prefers-reduced-motion.
 */

/**
 * Faisceaux de projecteurs diffus, mouvement très lent.
 * Sur fond clair un faisceau ne peut pas « briller » : il est rendu
 * en multiply, donc en cône chaud plutôt qu'en halo.
 */
export function Beams({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ mixBlendMode: "multiply" }}
      aria-hidden="true"
    >
      {/* Le flou est porté par l'enveloppe, sinon `clip-path` s'applique
          après le filtre et laisse une arête nette en travers de la page. */}
      <div
        className="absolute -top-[28%] left-[8%] h-[145%] w-[26vw] min-w-[220px] origin-top blur-[64px] opacity-40"
        style={{ animation: "beam-sweep 19s ease-in-out infinite" }}
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(to bottom, rgba(184,144,63,0.24), rgba(184,144,63,0.05) 52%, transparent 80%)",
            clipPath: "polygon(46% 0%, 54% 0%, 88% 100%, 12% 100%)",
          }}
        />
      </div>
      <div
        className="absolute -top-[20%] right-[16%] h-[125%] w-[30vw] min-w-[240px] origin-top blur-[86px] opacity-30"
        style={{ animation: "beam-sweep-alt 31s ease-in-out infinite" }}
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(to bottom, rgba(150,112,44,0.22), transparent 72%)",
            clipPath: "polygon(48% 0%, 52% 0%, 92% 100%, 8% 100%)",
          }}
        />
      </div>
    </div>
  );
}

/* Hauteurs fixes : rendu identique serveur / client. */
const VU_BARS = [
  0.35, 0.62, 0.28, 0.88, 0.45, 0.7, 0.32, 0.95, 0.5, 0.24, 0.66, 0.4, 0.82,
  0.3, 0.58, 0.9, 0.42, 0.26, 0.74, 0.36,
];

/** Vumètre discret — 20 segments, animation décalée. */
export function VuMeter({
  bars = 12,
  className = "",
  active = true,
}: {
  bars?: number;
  className?: string;
  active?: boolean;
}) {
  return (
    <span
      className={`inline-flex h-4 items-end gap-[2px] ${className}`}
      aria-hidden="true"
    >
      {VU_BARS.slice(0, bars).map((h, i) => (
        <span
          key={i}
          className="w-[2px] origin-bottom bg-[var(--accent)] opacity-75"
          style={{
            height: `${Math.round(h * 100)}%`,
            animation: active
              ? `vu-bounce ${(1.1 + (i % 5) * 0.24).toFixed(2)}s ease-in-out ${(i * 0.09).toFixed(2)}s infinite`
              : undefined,
            transform: active ? undefined : "scaleY(0.3)",
          }}
        />
      ))}
    </span>
  );
}

/** Ligne de signal audio horizontale, très fine, qui traverse une section. */
export function SignalLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative h-8 w-full overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-y-0 left-0 flex w-[200%] items-center"
        style={{ animation: "signal-scroll 38s linear infinite" }}
      >
        {[0, 1].map((k) => (
          <svg
            key={k}
            viewBox="0 0 1200 32"
            preserveAspectRatio="none"
            className="h-8 w-1/2 text-brass-600/35"
            fill="none"
          >
            <path
              d="M0 16 H120 l14-9 12 18 10-24 12 30 14-15 H420 l10-6 12 12 14-22 10 28 12-12 H760 l16-10 10 20 14-26 12 32 10-16 H1200"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}
