"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

import { useQuote } from "./QuoteProvider";
import { QuantityStepper } from "./AddToQuote";
import { Kicker } from "@/components/ui/Kicker";
import { categories, productLabel } from "@/data/catalog";
import { eventTypes, installationChoices } from "@/data/site";
import {
  guestRanges,
  labelFor,
  needs as needList,
  readBrief,
  venues,
  type Brief,
} from "@/lib/brief";

type Status = "idle" | "sending" | "sent" | "error";

export function RequestPage() {
  const {
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

  const [brief, setBrief] = useState<Brief | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    place: "",
    guests: "",
    schedule: "",
    dj: false,
    musicians: false,
    message: "",
    consent: false,
  });

  /* Reprise du parcours guidé */
  useEffect(() => {
    const b = readBrief();
    if (!b) return;
    setBrief(b);
    setForm((f) => ({
      ...f,
      eventType: f.eventType || (labelFor(eventTypes, b.eventType) ?? ""),
      guests: f.guests || (labelFor(guestRanges, b.guests) ?? ""),
      dj: f.dj || b.needs.includes("dj"),
      musicians: f.musicians || b.needs.includes("musiciens"),
    }));
  }, []);

  const update = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) => setForm((f) => ({ ...f, [key]: value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    /* Vérifié ici plutôt que côté serveur : la correction est immédiate
       et le champ fautif reçoit le focus. */
    const missing = !form.lastName.trim()
      ? { id: "lastName", message: "Indiquez au moins votre nom." }
      : !form.email.includes("@")
        ? { id: "email", message: "Indiquez une adresse e-mail valide." }
        : null;

    if (missing) {
      setError(missing.message);
      setStatus("error");
      document.getElementById(missing.id)?.focus();
      return;
    }

    if (!form.consent) {
      setError(
        "Merci de cocher la case d'accord d'utilisation avant d'envoyer.",
      );
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "materiel",
          contact: {
            firstName: form.firstName,
            lastName: form.lastName,
            company: form.company,
            email: form.email,
            phone: form.phone,
          },
          event: {
            type: form.eventType,
            date: form.date,
            place: form.place,
            guests: form.guests,
            schedule: form.schedule,
            venue: labelFor(venues, brief?.venue ?? null) ?? "",
          },
          needs: {
            installation:
              installationChoices.find((c) => c.id === installation)?.label ??
              "",
            dj: form.dj,
            musicians: form.musicians,
            list:
              brief?.needs
                .map((n) => labelFor(needList, n))
                .filter((x): x is string => Boolean(x)) ?? [],
          },
          items: detailed.map(({ item }) => item),
          message: form.message,
        }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setError(data.error ?? "L'envoi n'a pas abouti. Réessayez.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(
        "Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.",
      );
      setStatus("error");
    }
  }

  /* ─────────────── Confirmation ─────────────── */
  if (status === "sent") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="tech text-brass-600">Demande transmise</span>
        </div>
        <h1 className="display-lg mt-5 text-ink-900">
          C'est parti chez DDSL Audio
        </h1>
        <p className="lede mt-5">
          Votre sélection et les informations sur votre événement ont été
          envoyées. La disponibilité du matériel à votre date va être vérifiée
          avant l'établissement du devis.
        </p>
        <ul className="mt-8 space-y-4 border-l-2 border-brass-600/45 pl-5">
          {[
            "Aucun paiement n'a été effectué et rien n'est réservé à ce stade.",
            "Si un élément de votre sélection ne convient pas à votre configuration, une alternative vous sera proposée.",
            "Une copie de votre demande n'est pas envoyée automatiquement : notez votre sélection si vous souhaitez la conserver.",
          ].map((t) => (
            <li key={t} className="text-[15px] leading-relaxed text-ink-600">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn">
            Retour à l'accueil
          </Link>
          <Link href="/materiel" className="btn btn-ghost">
            Continuer à parcourir le parc
          </Link>
        </div>
      </div>
    );
  }

  /* ─────────────── Formulaire ─────────────── */
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
      <header className="max-w-3xl">
        <Kicker>Demande de devis</Kicker>
        <h1 className="display-lg mt-5 text-ink-900">
          {count > 0
            ? "Votre sélection et votre événement"
            : "Décrivez votre besoin"}
        </h1>
        <p className="lede mt-5">
          {count > 0
            ? "Vérifiez la liste, complétez ce que vous savez de l'événement, et envoyez. Un seul devis vous sera adressé pour l'ensemble."
            : "Vous pouvez envoyer une demande sans avoir sélectionné de matériel : expliquez simplement votre événement, DDSL Audio propose une configuration."}
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14">
        {/* Formulaire */}
        <form onSubmit={onSubmit} noValidate className="order-2 lg:order-1">
          {brief && (
            <div className="panel mb-8 rounded-[3px] p-5">
              <h2 className="tech text-brass-600">Ce que vous nous avez dit</h2>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[14px] text-ink-600">
                {labelFor(eventTypes, brief.eventType) && (
                  <li>{labelFor(eventTypes, brief.eventType)}</li>
                )}
                {labelFor(guestRanges, brief.guests) && (
                  <li>{labelFor(guestRanges, brief.guests)} personnes</li>
                )}
                {labelFor(venues, brief.venue) && (
                  <li>{labelFor(venues, brief.venue)}</li>
                )}
                {brief.needs.length > 0 && (
                  <li>
                    Besoins&nbsp;:{" "}
                    {brief.needs
                      .map((n) => labelFor(needList, n))
                      .filter(Boolean)
                      .join(", ")}
                  </li>
                )}
              </ul>
              <Link
                href="/besoin-conseil"
                className="mt-3 inline-block text-[13px] text-brass-600 underline underline-offset-4"
              >
                Modifier ces réponses
              </Link>
            </div>
          )}

          <Fieldset title="Vos coordonnées" step="01">
            <p className="mb-5 text-[14px] leading-relaxed text-ink-500">
              Seuls le nom et l'e-mail sont nécessaires&nbsp;
              <span className="text-brass-600">*</span>. Tout le reste est
              facultatif&nbsp;: ce que vous ne savez pas encore se précisera
              ensuite.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="firstName"
                label="Prénom"
                value={form.firstName}
                onChange={(v) => update("firstName", v)}
                autoComplete="given-name"
              />
              <Field
                id="lastName"
                label="Nom"
                required
                value={form.lastName}
                onChange={(v) => update("lastName", v)}
                autoComplete="family-name"
              />
              <Field
                id="company"
                label="Société ou association"
                hint="Si applicable"
                value={form.company}
                onChange={(v) => update("company", v)}
                autoComplete="organization"
                className="sm:col-span-2"
              />
              <Field
                id="email"
                label="E-mail"
                type="email"
                required
                value={form.email}
                onChange={(v) => update("email", v)}
                autoComplete="email"
              />
              <Field
                id="phone"
                label="Téléphone"
                type="tel"
                value={form.phone}
                onChange={(v) => update("phone", v)}
                autoComplete="tel"
              />
            </div>
          </Fieldset>

          <Fieldset title="L'événement" step="02">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="eventType">
                  Type d'événement
                </label>
                <select
                  id="eventType"
                  className="field"
                  value={form.eventType}
                  onChange={(e) => update("eventType", e.target.value)}
                >
                  <option value="">À préciser</option>
                  {eventTypes.map((t) => (
                    <option key={t.id} value={t.label}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <Field
                id="date"
                label="Date"
                type="date"
                value={form.date}
                onChange={(v) => update("date", v)}
              />

              <Field
                id="place"
                label="Lieu"
                hint="Ville, salle, adresse approximative"
                value={form.place}
                onChange={(v) => update("place", v)}
                className="sm:col-span-2"
              />

              <div>
                <label className="label" htmlFor="guests">
                  Nombre de personnes
                </label>
                <select
                  id="guests"
                  className="field"
                  value={form.guests}
                  onChange={(e) => update("guests", e.target.value)}
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
                id="schedule"
                label="Horaires"
                hint="Ex. installation 16h, début 20h, fin 3h"
                value={form.schedule}
                onChange={(v) => update("schedule", v)}
              />
            </div>
          </Fieldset>

          <Fieldset title="Ce dont vous avez besoin" step="03">
            <p className="label">Installation du matériel</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {installationChoices.map((c) => (
                <label key={c.id} className="choice">
                  <input
                    type="radio"
                    name="installation"
                    checked={installation === c.id}
                    onChange={() => setInstallation(c.id)}
                  />
                  <span className="text-[14px]">{c.label}</span>
                </label>
              ))}
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <label className="choice">
                <input
                  type="checkbox"
                  checked={form.dj}
                  onChange={(e) => update("dj", e.target.checked)}
                />
                <span className="text-[14px]">
                  Un DJ pour la soirée
                  <span className="block text-[13px] text-ink-500">
                    Prestation assurée par DDSL Audio
                  </span>
                </span>
              </label>
              <label className="choice">
                <input
                  type="checkbox"
                  checked={form.musicians}
                  onChange={(e) => update("musicians", e.target.checked)}
                />
                <span className="text-[14px]">
                  Des musiciens
                  <span className="block text-[13px] text-ink-500">
                    À étudier selon le projet
                  </span>
                </span>
              </label>
            </div>
          </Fieldset>

          <Fieldset title="Précisions" step="04">
            <label className="label" htmlFor="message">
              Votre message
            </label>
            <textarea
              id="message"
              className="field"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Contraintes du lieu, accès, dimensions de scène souhaitées, ambiance musicale, questions… Si vous ne connaissez pas le matériel, décrivez simplement votre événement."
            />
          </Fieldset>

          {/* Récapitulatif avant envoi */}
          <div className="panel mt-8 rounded-[3px] p-5">
            <h2 className="tech text-brass-600">Avant d'envoyer</h2>
            <ul className="mt-3 space-y-1.5 text-[14.5px] text-ink-700">
              <li>
                Matériel sélectionné&nbsp;:{" "}
                <span className="text-ink-900">
                  {count > 0
                    ? `${detailed.length} référence${detailed.length > 1 ? "s" : ""}, ${count} unité${count > 1 ? "s" : ""}`
                    : "aucun — DDSL Audio vous proposera une configuration"}
                </span>
              </li>
              <li>
                Installation&nbsp;:{" "}
                <span className="text-ink-900">
                  {installationChoices.find((c) => c.id === installation)
                    ?.label ?? "non renseignée"}
                </span>
              </li>
              {(form.dj || form.musicians) && (
                <li>
                  Prestation&nbsp;:{" "}
                  <span className="text-ink-900">
                    {[form.dj && "DJ", form.musicians && "musiciens"]
                      .filter(Boolean)
                      .join(" + ")}
                  </span>
                </li>
              )}
            </ul>
          </div>

          <label className="choice mt-5 items-start !min-h-0 py-3.5">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => update("consent", e.target.checked)}
              className="mt-0.5"
            />
            <span className="text-[14px] leading-relaxed text-ink-700">
              J'accepte que ces informations soient utilisées par DDSL Audio
              pour traiter ma demande de devis.{" "}
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

          <div className="mt-7">
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-auto sm:min-w-[280px]"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
            </button>
            <p className="mt-3 text-[13.5px] text-ink-500">
              Aucun paiement, aucune réservation ferme. Vous recevrez un devis à
              valider.
            </p>
          </div>
        </form>

        {/* Récapitulatif matériel */}
        <aside className="order-1 lg:order-2 lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
          <div className="panel rounded-[3px]">
            <header className="flex items-center justify-between gap-3 border-b border-ink-950/10 px-5 py-4">
              <h2 className="tech text-ink-800">Matériel sélectionné</h2>
              <span className="font-mono text-xs tabular-nums text-brass-600">
                [{String(count).padStart(2, "0")}]
              </span>
            </header>

            {detailed.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p className="text-[14.5px] leading-relaxed text-ink-600">
                  Votre demande est vide. Ce n'est pas bloquant&nbsp;: décrivez
                  votre événement dans le formulaire et DDSL Audio proposera le
                  matériel.
                </p>
                <Link href="/materiel" className="btn btn-sm btn-ghost mt-5 w-full">
                  Parcourir le parc
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-ink-950/10">
                {detailed.map(({ item, product }) => {
                  const cat = categories.find((c) => c.id === product.category);
                  const label = productLabel(product);
                  return (
                    <li key={product.id} className="px-5 py-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <span className="tech-sm text-brass-700">
                            {product.ref} · {cat?.name}
                          </span>
                          <h3 className="mt-1 font-display font-semibold tracking-[-0.02em] text-[17px] leading-tight text-ink-900">
                            {product.name}
                          </h3>
                          {label && label !== product.name && (
                            <p className="text-[13px] text-ink-500">
                              {label}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(product.id)}
                          className="shrink-0 pt-1 text-[13.5px] text-ink-500 transition-colors hover:text-alert"
                        >
                          Retirer
                        </button>
                      </div>

                      <div className="mt-3">
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(v) => setQuantity(product.id, v)}
                          max={product.availableQuantity}
                          label={product.name}
                        />
                      </div>

                      {product.options.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {product.options.map((opt) => {
                            const on = item.options.includes(opt.id);
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => toggleOption(product.id, opt.id)}
                                aria-pressed={on}
                                className={`rounded-[3px] border px-2.5 py-1.5 text-[12px] transition-colors ${
                                  on
                                    ? "border-brass-600/60 bg-brass-100/60 text-brass-700"
                                    : "border-ink-950/13 text-ink-600 hover:border-ink-950/24"
                                }`}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {product.customConfig && (
                        <input
                          className="field mt-2.5 !min-h-[42px] text-sm"
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
            )}
          </div>

          {detailed.length > 0 && (
            <p className="mt-4 text-[13.5px] leading-relaxed text-ink-500">
              Vous pouvez encore ajouter des références&nbsp;: votre sélection
              est conservée pendant la navigation.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}

/* ─────────────────────── Éléments de formulaire ─────────────────────── */

function Fieldset({
  title,
  step,
  children,
}: {
  title: string;
  step: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-ink-950/11 pt-7 first:border-t-0 first:pt-0 [&+&]:mt-9">
      <legend className="sr-only">{title}</legend>
      <div className="mb-5 flex items-center gap-3">
        <span className="font-mono text-[12px] text-brass-700">{step}</span>
        <h2 className="display-md text-[1.3rem] text-ink-900">{title}</h2>
        <span
          className="h-px flex-1 bg-gradient-to-r from-ink-950/10 to-transparent"
          aria-hidden="true"
        />
      </div>
      {children}
    </fieldset>
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
