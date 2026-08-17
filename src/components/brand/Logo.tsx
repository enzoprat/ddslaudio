import Image from "next/image";

type LogoProps = {
  /** Hauteur de rendu. */
  size?: "sm" | "md" | "lg";
  /**
   * Fond sur lequel le logo est posé. Le logo d'origine porte un « AUDIO »
   * blanc, illisible sur le blanc du site : la variante `clair` reprend ce
   * mot en encre, l'or restant identique.
   */
  tone?: "clair" | "sombre";
  className?: string;
};

/** Dimensions du fichier source. */
const SOURCE = { width: 600, height: 410 } as const;

/** Hauteurs de rendu. */
const HEIGHTS = { sm: 50, md: 74, lg: 120 } as const;

export function Logo({ size = "sm", tone = "clair", className = "" }: LogoProps) {
  const h = HEIGHTS[size];
  const w = Math.round((h * SOURCE.width) / SOURCE.height);

  return (
    <Image
      src={tone === "sombre" ? "/brand/ddsl-audio.png" : "/brand/ddsl-audio-fond-clair.png"}
      alt="DDSL Audio"
      // Dimensions du fichier, pour que le ratio déclaré soit exact ; le
      // rendu est piloté en CSS ci-dessous.
      {...SOURCE}
      sizes={`${w}px`}
      priority={size !== "lg"}
      className={`w-auto ${className}`}
      style={{ height: h }}
    />
  );
}
