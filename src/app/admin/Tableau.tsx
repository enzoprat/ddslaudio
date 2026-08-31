"use client";

import { useActionState, useEffect, useState, useTransition } from "react";

import type { Category, Product } from "@/data/catalog";

import { DepotImage } from "./DepotImage";
import {
  basculerSommeil,
  deconnexion,
  enregistrerProduit,
  supprimerProduit,
  type EtatAction,
} from "./actions";

const initial: EtatAction = {};

export function Tableau({
  produits,
  categories,
}: {
  produits: Product[];
  categories: Category[];
}) {
  /** Fiche en cours de modification, `null` pour une nouvelle fiche. */
  const [edition, setEdition] = useState<Product | null>(null);
  const [etat, action, enCours] = useActionState(enregistrerProduit, initial);
  const [transition, demarrer] = useTransition();

  // Après un enregistrement réussi, le formulaire repart à vide.
  useEffect(() => {
    if (etat.succes) setEdition(null);
  }, [etat.succes]);

  const occupe = enCours || transition;

  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-ink-950/11 pb-5">
        <div>
          <h1 className="display-md text-ink-900">Catalogue</h1>
          <p className="mt-1.5 text-[14.5px] text-ink-600">
            {produits.length} fiche{produits.length > 1 ? "s" : ""}, dont{" "}
            {produits.filter((p) => p.status === "sommeil").length} en sommeil.
          </p>
        </div>
        <button
          type="button"
          onClick={() => demarrer(() => void deconnexion())}
          className="btn btn-ghost btn-sm"
        >
          Se déconnecter
        </button>
      </header>

      {/* Formulaire */}
      <form
        action={action}
        // La clé force la réinitialisation des champs quand on change de fiche.
        key={edition?.id ?? "nouvelle"}
        className="panel mt-8 rounded-[3px] p-6 sm:p-7"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="tech text-brass-600">
            {edition ? `Modifier — ${edition.name}` : "Nouvelle fiche"}
          </h2>
          {edition && (
            <button
              type="button"
              onClick={() => setEdition(null)}
              className="text-[13.5px] text-ink-500 underline-offset-2 hover:text-brass-600 hover:underline"
            >
              Annuler la modification
            </button>
          )}
        </div>

        {edition && <input type="hidden" name="id" value={edition.id} />}

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="nom" className="label">
              Nom du produit
            </label>
            <input
              id="nom"
              name="nom"
              required
              defaultValue={edition?.name ?? ""}
              className="field"
            />
          </div>

          <div>
            <label htmlFor="categorie" className="label">
              Catégorie
            </label>
            <select
              id="categorie"
              name="categorie"
              required
              defaultValue={edition?.category ?? ""}
              className="field"
            >
              <option value="" disabled>
                Choisir…
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="prix" className="label">
                Prix (€)
              </label>
              <input
                id="prix"
                name="prix"
                inputMode="decimal"
                placeholder="Laisser vide"
                defaultValue={edition?.price ?? ""}
                className="field"
              />
            </div>
            <div>
              <label htmlFor="quantite" className="label">
                Quantité au parc
              </label>
              <input
                id="quantite"
                name="quantite"
                inputMode="numeric"
                placeholder="Laisser vide"
                defaultValue={edition?.availableQuantity ?? ""}
                className="field"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className="label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={3}
              defaultValue={edition?.shortDescription ?? ""}
              className="field min-h-0"
            />
          </div>

          <div className="sm:col-span-2">
            <span className="label">Photo</span>
            <DepotImage valeurInitiale={edition?.images[0] ?? ""} />
          </div>
        </div>

        {etat.erreur && (
          <p role="alert" className="mt-4 text-[14px] text-red-700">
            {etat.erreur}
          </p>
        )}
        {etat.succes && (
          <p role="status" className="mt-4 text-[14px] text-ink-700">
            {etat.succes}
          </p>
        )}

        <button
          type="submit"
          disabled={occupe}
          className="btn btn-primary mt-6"
        >
          {enCours
            ? "Enregistrement…"
            : edition
              ? "Enregistrer les modifications"
              : "Ajouter au catalogue"}
        </button>
      </form>

      {/* Fiches */}
      <ul className="mt-10 divide-y divide-ink-950/10 rounded-[3px] border border-ink-950/11">
        {produits.map((p) => (
          <li
            key={p.id}
            className={`flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3.5 ${
              p.status === "sommeil" ? "bg-paper-200" : ""
            }`}
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="tech-sm text-brass-700">{p.ref}</span>
                <span className="text-[15px] text-ink-900">{p.name}</span>
                {p.status === "sommeil" && (
                  <span className="text-[13px] text-ink-500">
                    en sommeil, invisible sur le site
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-[13.5px] text-ink-500">
                {categories.find((c) => c.id === p.category)?.name}
                {p.price !== null && ` · ${p.price} €`}
                {p.availableQuantity !== null && ` · ${p.availableQuantity} au parc`}
              </p>
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => {
                  setEdition(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="btn btn-ghost btn-sm"
              >
                Modifier
              </button>
              <button
                type="button"
                disabled={occupe}
                onClick={() => demarrer(() => void basculerSommeil(p.id))}
                className="btn btn-ghost btn-sm"
              >
                {p.status === "actif" ? "Mettre en sommeil" : "Réactiver"}
              </button>
              <button
                type="button"
                disabled={occupe}
                onClick={() => {
                  if (
                    window.confirm(
                      `Retirer définitivement « ${p.name} » du catalogue ?`,
                    )
                  ) {
                    demarrer(() => void supprimerProduit(p.id));
                  }
                }}
                className="btn btn-ghost btn-sm text-red-700"
              >
                Retirer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
