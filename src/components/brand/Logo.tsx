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

/** Hauteurs de rendu — le fichier fait 600 × 410. */
const HEIGHTS = { sm: 50, md: 74, lg: 120 } as const;
const RATIO = 600 / 410;

export function Logo({ size = "sm", tone = "clair", className = "" }: LogoProps) {
  const h = HEIGHTS[size];

  return (
    <Image
      src={tone === "sombre" ? "/brand/ddsl-audio.png" : "/brand/ddsl-audio-fond-clair.png"}
      alt="DDSL Audio"
      width={Math.round(h * RATIO)}
      height={h}
      priority={size !== "lg"}
      className={`h-auto w-auto ${className}`}
      style={{ height: h }}
    />
  );
}
