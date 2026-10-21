"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { postDevis } from "@/lib/devis";

type Status = "idle" | "sending" | "sent" | "error";

const SUBJECTS = [
  "Disponibilité d'une date",
  "Question sur du matériel",
  "Installation sur un lieu",
  "Prestation DJ",
  "Autre",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [f, setF] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    date: "",
    message: "",
    consent: false,
  });

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) =>
    setF((prev) => ({ ...prev, [k]: v }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

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
        kind: "contact",
        contact: {
          firstName: f.firstName,
          lastName: f.lastName,
          company: f.company,
          email: f.email,
          phone: f.phone,
        },
        event: { type: f.subject, date: f.date },
        needs: {},
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
      <div className="panel rounded-panel p-7 sm:p-9">
        <div className="flex items-center gap-3">
          <span className="tech text-brass-600">Message transmis</span>
        </div>
        <h2 className="display-md mt-4 text-ink-900">Bien reçu</h2>
        <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-ink-600">
          DDSL Audio vous répondra à l'adresse indiquée. Si votre demande
          concerne une date précise, elle sera vérifiée avant réponse.
        </p>
        <Link href="/materiel" className="btn btn-ghost mt-7">
          Parcourir le matériel
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="panel rounded-panel p-6 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <h2 className="tech text-ink-800">Écrire à DDSL Audio</h2>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <Field
          id="c-firstName"
          label="Prénom"
          value={f.firstName}
          onChange={(v) => set("firstName", v)}
          autoComplete="given-name"
        />
        <Field
          id="c-lastName"
          label="Nom"
          required
          value={f.lastName}
          onChange={(v) => set("lastName", v)}
          autoComplete="family-name"
        />
        <Field
          id="c-email"
          label="E-mail"
          type="email"
          required
          value={f.email}
          onChange={(v) => set("email", v)}
          autoComplete="email"
        />
        <Field
          id="c-phone"
          label="Téléphone"
          type="tel"
          value={f.phone}
          onChange={(v) => set("phone", v)}
          autoComplete="tel"
        />
        <Field
          id="c-company"
          label="Société"
          hint="Si demande professionnelle"
          value={f.company}
          onChange={(v) => set("company", v)}
          autoComplete="organization"
        />

        <div>
          <label className="label" htmlFor="c-subject">
            Objet
          </label>
          <select
            id="c-subject"
            className="field"
            value={f.subject}
            onChange={(e) => set("subject", e.target.value)}
          >
            <option value="">À préciser</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <Field
          id="c-date"
          label="Date concernée"
          hint="Facultatif"
          type="date"
          value={f.date}
          onChange={(v) => set("date", v)}
          className="sm:col-span-2"
        />
      </div>

      <div className="mt-6">
        <label className="label" htmlFor="c-message">
          Votre message
        </label>
        <textarea
          id="c-message"
          className="field min-h-[150px]"
          value={f.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Décrivez votre besoin, le lieu, le contexte…"
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
          className="mt-5 rounded-panel border border-alert/50 bg-alert/10 px-4 py-3 text-[14.5px] text-ink-900"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary mt-7 w-full"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
      </button>
      <p className="mt-3 text-[13.5px] text-ink-500">
        Pour une demande de matériel chiffrée, passez plutôt par la{" "}
        <Link
          href="/demande"
          className="text-brass-600 underline underline-offset-4"
        >
          demande de devis
        </Link>
        .
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
