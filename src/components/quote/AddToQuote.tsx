"use client";

import { useState } from "react";
import { useQuote } from "./QuoteProvider";
import type { Product } from "@/data/catalog";

/* ─────────────────────── Sélecteur de quantité ─────────────────────── */

export function QuantityStepper({
  value,
  onChange,
  max,
  label,
}: {
  value: number;
  onChange: (n: number) => void;
  max?: number | null;
  label: string;
}) {
  const ceiling = max ?? 99;

  return (
    <div className="inline-flex items-stretch border border-ink-950/16 rounded-panel bg-paper-50">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        className="w-11 h-11 grid place-items-center text-ink-700 hover:text-brass-600 hover:bg-paper-300 transition-colors rounded-l-panel"
        aria-label={`Retirer une unité — ${label}`}
      >
        <svg width="12" height="2" viewBox="0 0 12 2" aria-hidden="true">
          <rect width="12" height="2" fill="currentColor" />
        </svg>
      </button>

      <span
        className="w-11 h-11 grid place-items-center font-mono text-sm border-x border-ink-950/11 tabular-nums"
        aria-live="polite"
      >
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= ceiling}
        className="w-11 h-11 grid place-items-center text-ink-700 hover:text-brass-600 hover:bg-paper-300 transition-colors rounded-r-panel disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
        aria-label={`Ajouter une unité — ${label}`}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <rect y="5" width="12" height="2" fill="currentColor" />
          <rect x="5" width="2" height="12" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}

/* ─────────────────── Ajout rapide (cartes catalogue) ─────────────────── */

export function AddToQuoteButton({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { add, has, open, items } = useQuote();
  const [justAdded, setJustAdded] = useState(false);
  const inQuote = has(product.id);
  const qty = items.find((i) => i.productId === product.id)?.quantity ?? 0;

  if (inQuote) {
    return (
      <button
        type="button"
        onClick={open}
        className={`btn btn-sm btn-ghost !border-brass-600/55 !text-brass-700 w-full ${className}`}
      >
        Dans ma demande · {qty}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        add(product.id);
        setJustAdded(true);
        window.setTimeout(() => setJustAdded(false), 1600);
      }}
      className={`btn btn-sm w-full ${className}`}
    >
      {justAdded ? "Ajouté ✓" : "Ajouter à ma demande"}
    </button>
  );
}

/* ───────────── Ajout détaillé (fiche matériel : quantité + options) ───────────── */

export function ProductQuoteForm({ product }: { product: Product }) {
  const { add, open } = useQuote();
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [added, setAdded] = useState(false);

  const toggle = (id: string) =>
    setOptions((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id],
    );

  return (
    <div className="space-y-5">
      {product.options.length > 0 && (
        <fieldset>
          <legend className="label">Options</legend>
          <div className="space-y-2">
            {product.options.map((opt) => (
              <label key={opt.id} className="choice items-start !min-h-0 py-3">
                <input
                  type="checkbox"
                  checked={options.includes(opt.id)}
                  onChange={() => toggle(opt.id)}
                  className="mt-0.5"
                />
                <span>
                  <span className="block text-sm text-ink-900">{opt.label}</span>
                  {opt.hint && (
                    <span className="block text-[13px] leading-snug text-ink-600 mt-0.5">
                      {opt.hint}
                    </span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {product.customConfig && (
        <div>
          <label className="label" htmlFor={`cfg-${product.id}`}>
            {product.customConfig.label}
          </label>
          <input
            id={`cfg-${product.id}`}
            className="field"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={product.customConfig.placeholder}
          />
        </div>
      )}

      <div className="flex flex-col items-start gap-3 pt-1">
        <QuantityStepper
          value={quantity}
          onChange={(n) => setQuantity(Math.max(1, n))}
          max={product.availableQuantity}
          label={product.name}
        />
        <button
          type="button"
          className="btn btn-primary w-full self-stretch"
          onClick={() => {
            add(product.id, { quantity, options, note: note || undefined });
            setAdded(true);
            window.setTimeout(() => setAdded(false), 2000);
          }}
        >
          {added ? "Ajouté à votre demande ✓" : "Ajouter à ma demande"}
        </button>
      </div>

      {added && (
        <button
          type="button"
          onClick={open}
          className="text-[13px] text-brass-600 underline underline-offset-4 hover:text-brass-700"
        >
          Voir ma demande
        </button>
      )}

      <p className="text-[13px] leading-relaxed text-ink-500">
        Aucun paiement, aucun engagement : cette sélection sert uniquement à
        préparer votre devis.
      </p>
    </div>
  );
}
