"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { eventTypes } from "@/data/site";
import { guestRanges } from "@/lib/brief";
import { postDevis } from "@/lib/devis";

type Status = "idle" | "sending" | "sent" | "error";

export function DjForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [f, setF] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    place: "",
    schedule: "",
    guests: "",
    mood: "",
    sound: false,
    light: false,
    musicians: false,
    message: "",
    consent: false,
  });

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) =>
    setF((prev) => ({ ...prev, [k]: v }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    /* Vérifié ici plutôt que côté serveur : la correction est immédiate
       et le champ fautif reçoit le focus. */
    const missing = !f.lastName.trim()
      ? { id: "dj-lastName", message: "Indiquez au moins votre nom." }
      : !f.email.includes("@")
        ? { id: "dj-email", message: "Indiquez une adresse e-mail valide." }
        : null;

    if (missing) {
      setError(missing.message);
      setStatus("error");
      document.getElementById(missing.id)?.focus();
      return;
    }

    if (!f.consent) {
      setError(
        "Merci de cocher la case d'accord d'utilisation avant d'envoyer.",
      );
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const result = await postDevis({
        kind: "dj",
        contact: {
          firstName: f.firstName,
          lastName: f.lastName,
          company: f.company,
          email: f.email,
          phone: f.phone,
        },
        event: {
          type: f.eventType,
          date: f.date,
          place: f.place,
          schedule: f.schedule,
          guests: f.guests,
        },
        needs: {
          dj: true,
          musicians: f.musicians,
          sound: f.sound,
          light: f.light,
          mood: f.mood,
        },
        items: [],
        message: f.message,
      });

      if (!result.ok) {
        setError(result.error ?? "L'envoi n'a pas abouti. Réessayez.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setError("Impossible de joindre le serveur. Réessayez dans un instant.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="panel rounded-[3px] p-7 sm:p-9">
        <div className="flex items-center gap-3">
          <span className="tech text-brass-600">Demande transmise</span>
        </div>
        <h3 className="display-md mt-4 text-ink-900">
          Votre demande est bien partie
        </h3>
        <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-ink-600">
          DDSL Audio va regarder la date, le lieu et ce que vous avez décrit,
          puis revenir vers vous avec une proposition. Rien n'est réservé ni
          facturé à ce stade.
        </p>
        <Link href="/materiel" className="btn btn-ghost mt-7">
          Voir le matériel en attendant
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="panel rounded-[3px] p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <h3 className="tech text-ink-800">Parler de votre soirée</h3>
      </div>

      <p className="mt-5 text-[14px] leading-relaxed text-ink-500">
        Seuls le nom et l'e-mail sont nécessaires&nbsp;
        <span className="text-brass-600">*</span>. Le reste est facultatif.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field id="dj-firstName" label="Prénom" value={f.firstName} onChange={(v) => set("firstName", v)} autoComplete="given-name" />
        <Field id="dj-lastName" label="Nom" required value={f.lastName} onChange={(v) => set("lastName", v)} autoComplete="family-name" />
        <Field id="dj-email" label="E-mail" type="email" required value={f.email} onChange={(v) => set("email", v)} autoComplete="email" />
        <Field id="dj-phone" label="Téléphone" type="tel" value={f.phone} onChange={(v) => set("phone", v)} autoComplete="tel" />

        <div>
          <label className="label" htmlFor="dj-eventType">
            Type d'événement
          </label>
          <select
            id="dj-eventType"
            className="field"
            value={f.eventType}
            onChange={(e) => set("eventType", e.target.value)}
          >
            <option value="">À préciser</option>
            {eventTypes.map((t) => (
              <option key={t.id} value={t.label}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <Field id="dj-date" label="Date" type="date" value={f.date} onChange={(v) => set("date", v)} />

        <Field
          id="dj-place"
          label="Lieu"
          hint="Ville, salle"
          value={f.place}
          onChange={(v) => set("place", v)}
          className="sm:col-span-2"
        />

        <Field
          id="dj-schedule"
          label="Horaires"
          hint="Ex. 21h — 4h"
          value={f.schedule}
          onChange={(v) => set("schedule", v)}
        />

        <div>
          <label className="label" htmlFor="dj-guests">
            Nombre d'invités
          </label>
          <select
            id="dj-guests"
            className="field"
            value={f.guests}
            onChange={(e) => set("guests", e.target.value)}
          >
            <option value="">À préciser</option>
            {guestRanges.map((g) => (
              <option key={g.id} value={g.label}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        <Field
          id="dj-mood"
          label="Ambiance musicale recherchée"
          hint="Styles, artistes, moments"
          value={f.mood}
          onChange={(v) => set("mood", v)}
          className="sm:col-span-2"
        />
      </div>

      <p className="label mt-7">Le lieu est-il équipé ?</p>
      <div className="grid gap-2 sm:grid-cols-3">
        <label className="choice">
          <input type="checkbox" checked={f.sound} onChange={(e) => set("sound", e.target.checked)} />
          <span className="text-[14px]">Sonorisation à fournir</span>
        </label>
        <label className="choice">
          <input type="checkbox" checked={f.light} onChange={(e) => set("light", e.target.checked)} />
          <span className="text-[14px]">Éclairage à fournir</span>
        </label>
        <label className="choice">
          <input type="checkbox" checked={f.musicians} onChange={(e) => set("musicians", e.target.checked)} />
          <span className="text-[14px]">Musiciens en plus</span>
        </label>
      </div>

      <div className="mt-6">
        <label className="label" htmlFor="dj-message">
          Informations complémentaires
        </label>
        <textarea
          id="dj-message"
          className="field"
          value={f.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Déroulé de la soirée, moments particuliers, contraintes de la salle, voisinage, heure de fin imposée…"
        />
      </div>

      <label className="choice mt-5 items-start !min-h-0 py-3.5">
        <input
          type="checkbox"
          checked={f.consent}
          onChange={(e) => set("consent", e.target.checked)}
          className="mt-0.5"
        />
        <span className="text-[14px] leading-relaxed text-ink-700">
          J'accepte que ces informations soient utilisées par DDSL Audio pour
          traiter ma demande.{" "}
          <Link
            href="/politique-de-confidentialite"
            className="text-brass-600 underline underline-offset-4"
          >
            En savoir plus
          </Link>
        </span>
      </label>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-[3px] border border-alert/50 bg-alert/10 px-4 py-3 text-[14.5px] text-ink-900"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary mt-7 w-full"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
      <p className="mt-3 text-[13.5px] text-ink-500">
        Aucun paiement, aucune réservation ferme à ce stade.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  hint,
  autoComplete,
  className = "",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  hint?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="label" htmlFor={id}>
        {label}
        {required && <span className="ml-1 text-brass-600">*</span>}
        {hint && (
          <span className="ml-2 normal-case tracking-normal text-ink-400">
            {hint}
          </span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className="field"
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
