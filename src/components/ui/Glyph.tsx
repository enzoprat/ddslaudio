import type { CategoryId } from "@/data/catalog";

type GlyphProps = {
  name: CategoryId;
  className?: string;
};

/**
 * Pictogrammes techniques dessinés pour DDSL Audio.
 * Chaque tracé représente le matériel réel de la catégorie
 * (façade d'enceinte, lyre, platine, praticable, projection, tranche de console).
 *
 * Construction : contour épais + détails en aplat. Les versions
 * précédentes étaient en filet fin avec des opacités partielles, et
 * disparaissaient dès qu'on descendait sous 32 px.
 */
export function Glyph({ name, className = "" }: GlyphProps) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  /* Aplats : détails pleins, jamais en contour. */
  const solid = { fill: "currentColor", stroke: "none" };
  /* Faisceau : seule opacité tolérée, elle porte l'idée de lumière. */
  const beam = { fill: "currentColor", stroke: "none", opacity: 0.16 };

  switch (name) {
    case "sonorisation":
      return (
        <svg {...common}>
          <rect x="11" y="4" width="26" height="40" rx="3" />
          <circle cx="24" cy="17" r="8" />
          <circle cx="24" cy="17" r="3" {...solid} />
          <circle cx="24" cy="34" r="5" />
          <circle cx="24" cy="34" r="1.8" {...solid} />
        </svg>
      );

    case "lumiere":
      return (
        <svg {...common}>
          <path d="M18.5 26.5 11.5 44h25l-7-17.5z" {...beam} />
          <rect x="16" y="3" width="16" height="5" rx="1.5" />
          <path d="M20 8v5M28 8v5" />
          <rect x="14" y="13" width="20" height="13" rx="3" />
          <circle cx="24" cy="19.5" r="3.6" {...solid} />
        </svg>
      );

    case "regie-dj":
      return (
        <svg {...common}>
          <rect x="4" y="9" width="40" height="30" rx="3" />
          <circle cx="16" cy="24" r="8" />
          <circle cx="16" cy="24" r="2" {...solid} />
          <path d="M29.5 15v18M35 15v18M40.5 15v18" strokeWidth="1.4" />
          <rect x="26.5" y="25.5" width="6" height="3.2" rx="1.2" {...solid} />
          <rect x="32" y="18" width="6" height="3.2" rx="1.2" {...solid} />
          <rect x="37.5" y="28.5" width="6" height="3.2" rx="1.2" {...solid} />
        </svg>
      );

    case "scene":
      return (
        <svg {...common}>
          <path d="M4 20 24 11l20 9-20 9z" />
          <path d="M4 20v6l20 9 20-9v-6" />
          <path d="M9.5 31.5v8M38.5 31.5v8M24 37v7" strokeWidth="1.6" />
        </svg>
      );

    case "video":
      return (
        <svg {...common}>
          <path d="M20 28 36 16.5v19L20 34z" {...beam} />
          <rect x="4" y="25" width="16" height="12" rx="2" />
          <circle cx="12" cy="31" r="3.4" {...solid} />
          <rect x="36" y="10" width="8" height="28" rx="1.5" />
        </svg>
      );

    case "consoles":
      return (
        <svg {...common}>
          <rect x="4" y="6" width="40" height="36" rx="3" />
          <circle cx="12" cy="14" r="2.4" {...solid} />
          <circle cx="24" cy="14" r="2.4" {...solid} />
          <circle cx="36" cy="14" r="2.4" {...solid} />
          <path d="M12 22v13M24 22v13M36 22v13" strokeWidth="1.4" />
          <rect x="8.5" y="29" width="7" height="3.2" rx="1.2" {...solid} />
          <rect x="20.5" y="24" width="7" height="3.2" rx="1.2" {...solid} />
          <rect x="32.5" y="31" width="7" height="3.2" rx="1.2" {...solid} />
        </svg>
      );
  }
}
