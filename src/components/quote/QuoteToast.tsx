"use client";

import { useQuote } from "./QuoteProvider";

/** Confirmation d'ajout, discrète, sans bloquer la navigation. */
export function QuoteToast() {
  const { lastAdded, open, isOpen } = useQuote();
  const visible = Boolean(lastAdded) && !isOpen;

  return (
    <div
      aria-live="polite"
      className={`fixed z-[80] left-1/2 -translate-x-1/2 bottom-[84px] sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0 w-[calc(100%-32px)] sm:w-auto transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      {visible && (
        <div className="panel flex items-center gap-3 rounded-[3px] px-4 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,.9)]">
          <p className="text-sm text-ink-900 min-w-0">
            <span className="font-medium">{lastAdded}</span>
            <span className="text-ink-600">
              {" "}
              — ajouté à votre demande ✓
            </span>
          </p>
          <button
            type="button"
            onClick={open}
            className="ml-1 whitespace-nowrap text-[14px] font-medium text-brass-600 hover:text-brass-700"
          >
            Voir
          </button>
        </div>
      )}
    </div>
  );
}
