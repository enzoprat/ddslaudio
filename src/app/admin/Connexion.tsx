"use client";

import { useActionState } from "react";

import { connexion, type EtatAction } from "./actions";

const initial: EtatAction = {};

export function Connexion() {
  const [etat, action, enCours] = useActionState(connexion, initial);

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="display-md text-ink-900">Administration</h1>
      <p className="mt-3 text-[15px] text-ink-600">
        Gestion du catalogue DDSL Audio.
      </p>

      <form action={action} className="panel mt-8 rounded-[3px] p-6">
        <label htmlFor="motdepasse" className="label">
          Mot de passe
        </label>
        <input
          id="motdepasse"
          name="motdepasse"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="field"
        />

        {etat.erreur && (
          <p role="alert" className="mt-3 text-[14px] text-red-700">
            {etat.erreur}
          </p>
        )}

        <button
          type="submit"
          disabled={enCours}
          className="btn btn-primary mt-5 w-full"
        >
          {enCours ? "Vérification…" : "Entrer"}
        </button>
      </form>
    </div>
  );
}
