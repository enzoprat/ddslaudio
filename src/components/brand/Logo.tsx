type LogoProps = {
  /** Hauteur de rendu approximative. */
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZES = {
  sm: { top: "text-[19px]", bottom: "text-[11px]", gap: "gap-[3px]", w: "w-[86px]" },
  md: { top: "text-[30px]", bottom: "text-[17px]", gap: "gap-[5px]", w: "w-[136px]" },
  lg: { top: "text-[52px]", bottom: "text-[30px]", gap: "gap-[8px]", w: "w-[238px]" },
} as const;

/**
 * Signature typographique DDSL Audio.
 * Reprend la construction du logo : « DDSL » laiton, filet + signal,
 * « AUDIO » espacé, dans la couleur de texte du contexte.
 * (Le logo vectoriel définitif pourra remplacer ce bloc dans /public.)
 */
export function Logo({ size = "sm", className = "" }: LogoProps) {
  const s = SIZES[size];

  return (
    <span
      className={`inline-flex flex-col items-center ${s.gap} ${s.w} leading-none ${className}`}
      aria-hidden="true"
    >
      <span
        className={`font-display font-bold ${s.top} tracking-[0.06em] bg-gradient-to-b from-brass-400 via-brass-500 to-brass-700 bg-clip-text text-transparent`}
      >
        DDSL
      </span>

      <span className="flex w-full items-center gap-[5px]">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-brass-600" />
        <span className="flex items-end gap-[1.5px] h-[7px]">
          <span className="w-[1.5px] h-[3px] bg-[var(--text)] opacity-40" />
          <span className="w-[1.5px] h-[6px] bg-brass-500" />
          <span className="w-[1.5px] h-[2px] bg-[var(--text)] opacity-40" />
          <span className="w-[1.5px] h-[7px] bg-brass-500" />
          <span className="w-[1.5px] h-[4px] bg-[var(--text)] opacity-40" />
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-brass-600" />
      </span>

      <span
        className={`font-display font-semibold ${s.bottom} tracking-[0.34em] indent-[0.34em] text-[var(--text)]`}
      >
        AUDIO
      </span>
    </span>
  );
}
