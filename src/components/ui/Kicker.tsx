type KickerProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Étiquette de section.
 *
 * Plus de filet laiton devant le libellé, ni de capitales : les deux
 * donnaient un air de gabarit. Reste un simple surtitre coloré, dont
 * la teinte vient de `--accent` — redéfini dans les blocs `.stage`,
 * donc rien à passer en props selon le fond.
 */
export function Kicker({ children, className = "" }: KickerProps) {
  return (
    <p
      className={`text-[13.5px] font-semibold tracking-[0.01em] text-[var(--accent)] ${className}`}
    >
      {children}
    </p>
  );
}
