const WORDS = [
  "Location de matériel",
  "Sonorisation",
  "Éclairage scénique",
  "Scène & structures",
  "Vidéoprojection",
  "Régie DJ",
  "Installation",
  "Musiciens",
];

/** Bandeau de disciplines — défilement continu, très lent. */
export function Marquee() {
  return (
    <div
      className="relative overflow-hidden border-b border-ink-950/10 bg-paper-50 py-3.5"
      aria-hidden="true"
    >
      <div
        className="flex w-max"
        style={{ animation: "signal-scroll 52s linear infinite" }}
      >
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0 items-center">
            {WORDS.map((w) => (
              <li key={w} className="flex items-center">
                <span className="whitespace-nowrap px-6 font-display font-medium text-[15px] tracking-[0.02em] text-ink-500">
                  {w}
                </span>
                <span className="h-1 w-1 rotate-45 bg-brass-500/60" />
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-paper-200 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-paper-200 to-transparent" />
    </div>
  );
}
