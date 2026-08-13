"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useQuote } from "./QuoteProvider";
import { QuantityStepper } from "./AddToQuote";
import { categories, productLabel } from "@/data/catalog";
import { installationChoices } from "@/data/site";

export function QuoteDrawer() {
  const {
    isOpen,
    close,
    detailed,
    count,
    setQuantity,
    remove,
    toggleOption,
    setNote,
    installation,
    setInstallation,
    clear,
  } = useQuote();

  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* Le tiroir se referme quand on change de page */
  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* Le reste de la page devient inerte : ni clic, ni tabulation derrière le voile */
  useEffect(() => {
    if (!isOpen) return;
    const root = rootRef.current;
    const behind = [...document.body.children].filter(
      (el): el is HTMLElement =>
        el !== root && el instanceof HTMLElement && el.tagName !== "SCRIPT",
    );
    behind.forEach((el) => el.setAttribute("inert", ""));

    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    return () => {
      behind.forEach((el) => el.removeAttribute("inert"));
      previous?.focus?.();
    };
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 z-[90] ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      {/* Voile */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-paper-100/55 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panneau */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Ma demande de devis"
        className={`absolute right-0 top-0 h-[100dvh] w-full sm:w-[440px] bg-paper-50 border-l border-ink-950/11 flex flex-col transition-transform duration-350 ease-[cubic-bezier(.22,1,.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* En-tête */}
        <header className="flex items-center justify-between gap-3 px-5 h-16 border-b border-ink-950/11 bg-paper-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className={`led ${count > 0 ? "led-brass led-pulse" : "opacity-25"}`} />
            <h2 className="tech text-ink-800">Ma demande</h2>
            <span className="font-mono text-xs text-brass-600 tabular-nums">
              [{String(count).padStart(2, "0")}]
            </span>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="w-10 h-10 -mr-2 grid place-items-center text-ink-600 hover:text-ink-900 transition-colors"
            aria-label="Fermer ma demande"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" aria-hidden="true">
              <path
                d="M1 1l13 13M14 1L1 14"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </header>

        {detailed.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <ul className="divide-y divide-ink-950/10">
                {detailed.map(({ item, product }) => {
                  const cat = categories.find((c) => c.id === product.category);
                  const label = productLabel(product);
                  return (
                    <li key={product.id} className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <span className="tech-sm text-brass-700/80">
                            {product.ref} · {cat?.name}
                          </span>
                          <h3 className="font-display font-semibold tracking-[-0.02em] text-lg leading-tight mt-1 text-ink-900">
                            {product.name}
                          </h3>
                          {label && label !== product.name && (
                            <p className="text-[13px] text-ink-500">{label}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(product.id)}
                          aria-label={`Retirer ${product.name} de ma demande`}
                          className="shrink-0 pt-1 text-[13.5px] text-ink-500 transition-colors hover:text-alert"
                        >
                          Retirer
                        </button>
                      </div>

                      <div className="mt-3.5 flex items-center gap-3">
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(n) => setQuantity(product.id, n)}
                          max={product.availableQuantity}
                          label={product.name}
                        />
                        {product.availableQuantity !== null &&
                          item.quantity >= product.availableQuantity && (
                            <span className="tech-sm text-brass-600/85">
                              Parc complet
                            </span>
                          )}
                      </div>

                      {product.options.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {product.options.map((opt) => {
                            const on = item.options.includes(opt.id);
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => toggleOption(product.id, opt.id)}
                                aria-pressed={on}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[3px] border text-[12px] transition-colors ${
                                  on
                                    ? "border-brass-600/60 bg-brass-100/60 text-brass-700"
                                    : "border-ink-950/13 text-ink-600 hover:border-ink-950/24 hover:text-ink-800"
                                }`}
                              >
                                <span
                                  className={`led ${on ? "led-brass" : "opacity-20 !bg-ink-950"}`}
                                />
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {product.customConfig && (
                        <input
                          className="field mt-3 !min-h-[42px] text-sm"
                          value={item.note ?? ""}
                          onChange={(e) => setNote(product.id, e.target.value)}
                          placeholder={product.customConfig.placeholder}
                          aria-label={`${product.customConfig.label} — ${product.name}`}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Question installation, posée une seule fois pour toute la demande */}
              <div className="p-5 border-t border-ink-950/11 bg-paper-200/60">
                <p className="label !mb-2.5">Installation nécessaire ?</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {installationChoices.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() =>
                        setInstallation(installation === c.id ? null : c.id)
                      }
                      aria-pressed={installation === c.id}
                      className={`px-2 py-2.5 rounded-[3px] border text-[12px] leading-tight transition-colors ${
                        installation === c.id
                          ? "border-brass-600 bg-brass-100/60 text-brass-700"
                          : "border-ink-950/13 text-ink-600 hover:border-ink-950/24"
                      }`}
                    >
                      {c.id === "oui"
                        ? "Oui"
                        : c.id === "non"
                          ? "Non"
                          : "Je ne sais pas"}
                    </button>
                  ))}
                </div>
                <p className="text-[13px] text-ink-500 mt-2.5 leading-relaxed">
                  Vous pourrez le préciser plus tard, cette réponse n'engage à
                  rien.
                </p>
              </div>
            </div>

            {/* Pied */}
            <footer className="shrink-0 border-t border-ink-950/11 bg-paper-200 p-4 pb-[max(16px,env(safe-area-inset-bottom))] space-y-2.5">
              <Link href="/demande" className="btn btn-primary w-full">
                Finaliser ma demande
              </Link>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={close}
                  className="py-2 text-[14px] text-ink-600 transition-colors hover:text-ink-800"
                >
                  Continuer à parcourir
                </button>
                <button
                  type="button"
                  onClick={clear}
                  className="py-2 text-[14px] text-ink-400 transition-colors hover:text-alert"
                >
                  Tout vider
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col justify-center px-6 py-10 text-center">
      <div className="mx-auto mb-6 flex h-14 items-end gap-1" aria-hidden="true">
        {[0.2, 0.45, 0.15, 0.6, 0.3].map((h, i) => (
          <span
            key={i}
            className="w-1.5 bg-ink-950/10"
            style={{ height: `${h * 100}%` }}
          />
        ))}
      </div>
      <h3 className="display-md text-ink-900">Aucun matériel sélectionné</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
        Parcourez le parc et ajoutez tout ce dont vous avez besoin :
        sonorisation, lyres, platines, écrans. Vous recevrez un seul devis pour
        l'ensemble.
      </p>
      <div className="mt-7 space-y-2.5">
        <Link href="/materiel" className="btn btn-primary w-full">
          Voir le matériel
        </Link>
        <Link href="/besoin-conseil" className="btn btn-ghost w-full">
          Je ne sais pas quoi choisir
        </Link>
      </div>
    </div>
  );
}
