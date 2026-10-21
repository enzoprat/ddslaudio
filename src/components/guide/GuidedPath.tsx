"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Kicker } from "@/components/ui/Kicker";
import { eventTypes } from "@/data/site";
import {
  guestRanges,
  labelFor,
  needs as needList,
  saveBrief,
  venues,
} from "@/lib/brief";

type StepId = "type" | "personnes" | "lieu" | "besoins" | "recap";

const STEPS: { id: StepId; code: string; label: string }[] = [
  { id: "type", code: "01", label: "Événement" },
  { id: "personnes", code: "02", label: "Personnes" },
  { id: "lieu", code: "03", label: "Lieu" },
  { id: "besoins", code: "04", label: "Besoins" },
];

export function GuidedPath() {
  const router = useRouter();
  const [step, setStep] = useState<StepId>("type");
  const [eventType, setEventType] = useState<string | null>(null);
  const [guests, setGuests] = useState<string | null>(null);
  const [venue, setVenue] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const index = STEPS.findIndex((s) => s.id === step);
  const progress =
    step === "recap" ? 100 : Math.round((index / STEPS.length) * 100);

  const goNext = (next: StepId) => setStep(next);

  const toggleNeed = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id],
    );

  const finish = () => {
    saveBrief({
      eventType,
      guests,
      venue,
      needs: selected,
      createdAt: new Date().toISOString(),
    });
    router.push("/demande");
  };

  return (
    <div className="mx-auto max-w-[1100px] px-4 pb-24 pt-12 sm:px-6 sm:pt-16">
      <header className="max-w-2xl">
        <Kicker>Parcours guidé</Kicker>
        <h1 className="display-lg mt-5 text-ink-900">
          Décrivez votre événement
        </h1>
        <p className="lede mt-5">
          Quatre questions, aucune connaissance technique nécessaire. Vos
          réponses servent à préparer une proposition&nbsp;: rien n'est calculé
          automatiquement, DDSL Audio les lit et vous répond.
        </p>
      </header>

      {/* Fader de progression */}
      <div className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <ol className="flex flex-wrap gap-x-5 gap-y-2">
            {STEPS.map((s, i) => {
              const done = step === "recap" || i < index;
              const current = s.id === step;
              return (
                <li key={s.id} className="flex items-center gap-2">
                  <span
                    className={`led ${
                      current
                        ? "led-brass led-pulse"
                        : done
                          ? "led-brass"
                          : "!bg-ink-950 opacity-20 shadow-none"
                    }`}
                  />
                  <span
                    className={`tech-sm ${
                      current
                        ? "text-brass-700"
                        : done
                          ? "text-ink-600"
                          : "text-ink-400"
                    }`}
                  >
                    {s.code} {s.label}
                  </span>
                </li>
              );
            })}
          </ol>
          <span className="font-mono text-[12px] tabular-nums text-brass-600">
            {progress}%
          </span>
        </div>

        <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-ink-950/7">
          <div
            className="h-full bg-gradient-to-r from-brass-600 to-brass-300 transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ width: `${Math.max(progress, 4)}%` }}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="panel mt-8 rounded-panel p-6 sm:p-9">
        {step === "type" && (
          <Question title="Quel événement préparez-vous ?">
            <OptionGrid>
              {eventTypes.map((t) => (
                <Option
                  key={t.id}
                  label={t.label}
                  selected={eventType === t.id}
                  onClick={() => {
                    setEventType(t.id);
                    goNext("personnes");
                  }}
                />
              ))}
            </OptionGrid>
          </Question>
        )}

        {step === "personnes" && (
          <Question
            title="Combien de personnes attendez-vous ?"
            hint="Une fourchette suffit. C'est ce qui détermine la puissance de diffusion nécessaire."
            onBack={() => goNext("type")}
          >
            <OptionGrid>
              {guestRanges.map((g) => (
                <Option
                  key={g.id}
                  label={g.label}
                  selected={guests === g.id}
                  onClick={() => {
                    setGuests(g.id);
                    goNext("lieu");
                  }}
                />
              ))}
            </OptionGrid>
          </Question>
        )}

        {step === "lieu" && (
          <Question
            title="L'événement se déroule où ?"
            hint="En extérieur, la diffusion et l'alimentation électrique ne se traitent pas de la même façon."
            onBack={() => goNext("personnes")}
          >
            <OptionGrid>
              {venues.map((v) => (
                <Option
                  key={v.id}
                  label={v.label}
                  selected={venue === v.id}
                  onClick={() => {
                    setVenue(v.id);
                    goNext("besoins");
                  }}
                />
              ))}
            </OptionGrid>
          </Question>
        )}

        {step === "besoins" && (
          <Question
            title="De quoi avez-vous besoin ?"
            hint="Plusieurs réponses possibles. Si vous n'êtes sûr de rien, cochez « je ne sais pas »."
            onBack={() => goNext("lieu")}
          >
            <div className="grid gap-2 sm:grid-cols-2">
              {needList.map((n) => (
                <label key={n.id} className="choice items-start !min-h-0 py-3.5">
                  <input
                    type="checkbox"
                    checked={selected.includes(n.id)}
                    onChange={() => toggleNeed(n.id)}
                    className="mt-0.5"
                  />
                  <span>
                    <span className="block text-[15px] text-ink-900">
                      {n.label}
                    </span>
                    <span className="block text-[13px] leading-snug text-ink-500">
                      {n.hint}
                    </span>
                  </span>
                </label>
              ))}
            </div>

            <button
              type="button"
              onClick={() => goNext("recap")}
              className="btn btn-primary mt-7 w-full sm:w-auto sm:min-w-[260px]"
              disabled={selected.length === 0}
            >
              Continuer
            </button>
          </Question>
        )}

        {step === "recap" && (
          <div>
            <div className="flex items-center gap-3">
              <span className="tech text-brass-600">Récapitulatif</span>
            </div>
            <h2 className="display-md mt-4 text-ink-900">
              Voilà ce que DDSL Audio va recevoir
            </h2>

            <dl className="mt-7 divide-y divide-ink-950/10 border-y border-ink-950/11">
              <Row label="Événement" value={labelFor(eventTypes, eventType)} />
              <Row label="Personnes" value={labelFor(guestRanges, guests)} />
              <Row label="Lieu" value={labelFor(venues, venue)} />
              <Row
                label="Besoins"
                value={
                  selected
                    .map((s) => labelFor(needList, s))
                    .filter(Boolean)
                    .join(" · ") || null
                }
              />
            </dl>

            <p className="mt-6 max-w-xl text-[14.5px] leading-relaxed text-ink-600">
              Il reste à indiquer votre date, le lieu exact et comment vous
              joindre. Aucune configuration n'est imposée&nbsp;: la proposition
              vous sera expliquée avant tout engagement.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={finish}
                className="btn btn-primary sm:min-w-[300px]"
              >
                Recevoir une proposition adaptée
              </button>
              <button
                type="button"
                onClick={() => goNext("besoins")}
                className="btn btn-ghost"
              >
                Corriger mes réponses
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="mt-8 text-[14px] leading-relaxed text-ink-500">
        Vous préférez choisir vous-même votre matériel&nbsp;?{" "}
        <Link
          href="/materiel"
          className="text-brass-600 underline underline-offset-4 hover:text-brass-700"
        >
          Ouvrir le catalogue
        </Link>
        .
      </p>
    </div>
  );
}

/* ─────────────────────── Sous-composants ─────────────────────── */

function Question({
  title,
  hint,
  onBack,
  children,
}: {
  title: string;
  hint?: string;
  onBack?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-5 inline-flex items-center gap-2 text-[14px] text-ink-500 transition-colors hover:text-brass-600"
        >
          <span aria-hidden="true">←</span> Question précédente
        </button>
      )}
      <h2 className="display-md text-ink-900">{title}</h2>
      {hint && (
        <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-ink-600">
          {hint}
        </p>
      )}
      <div className="mt-7">{children}</div>
    </div>
  );
}

function OptionGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

function Option({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex min-h-[64px] items-center justify-between gap-3 rounded-panel border px-4 py-3 text-left transition-colors ${
        selected
          ? "border-brass-600 bg-brass-100/60"
          : "border-ink-950/15 bg-paper-50 hover:border-brass-600/55 hover:bg-paper-200"
      }`}
    >
      <span className="text-[16px] text-ink-900">{label}</span>
      <span
        className="text-brass-700 opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      >
        →
      </span>
    </button>
  );
}

function Row({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="grid gap-1 py-3.5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-4">
      <dt className="tech-sm text-ink-500">{label}</dt>
      <dd className="text-[15px] text-ink-900">
        {value ?? <span className="text-ink-400">Non précisé</span>}
      </dd>
    </div>
  );
}
