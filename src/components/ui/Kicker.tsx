type KickerProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Étiquette de section : un filet laiton court, puis le libellé.
 * La couleur vient de `--accent`, redéfini dans les blocs `.stage`,
 * donc rien à passer en props selon le fond.
 */
export function Kicker({ children, className = "" }: KickerProps) {
  return (
    <p className={`flex items-center gap-3 tech text-[var(--accent)] ${className}`}>
      <span
        className="h-px w-7 shrink-0 bg-[var(--accent)] opacity-70"
        aria-hidden="true"
      />
      {children}
    </p>
  );
}
