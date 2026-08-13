/**
 * « Brief » : réponses du parcours guidé.
 * Stocké côté navigateur, puis pré-rempli dans la demande de devis.
 * Aucune interprétation automatique : ce sont des informations
 * transmises telles quelles à DDSL Audio.
 */

const STORAGE_KEY = "ddsl-brief-v1";

export type Brief = {
  eventType: string | null;
  guests: string | null;
  venue: string | null;
  needs: string[];
  createdAt: string;
};

export const guestRanges = [
  { id: "moins-50", label: "Moins de 50" },
  { id: "50-100", label: "50 à 100" },
  { id: "100-200", label: "100 à 200" },
  { id: "200-500", label: "200 à 500" },
  { id: "plus-500", label: "Plus de 500" },
  { id: "je-ne-sais-pas", label: "Je ne sais pas encore" },
];

export const venues = [
  { id: "interieur", label: "Intérieur" },
  { id: "exterieur", label: "Extérieur" },
  { id: "les-deux", label: "Les deux" },
];

export const needs = [
  { id: "son", label: "Son", hint: "Diffusion, micros, retours" },
  { id: "lumiere", label: "Lumière", hint: "Éclairage de piste ou de plateau" },
  { id: "scene", label: "Scène", hint: "Plateau, praticables" },
  { id: "video", label: "Vidéo", hint: "Projection, écran" },
  { id: "dj", label: "DJ", hint: "Prestation assurée par DDSL Audio" },
  { id: "musiciens", label: "Musiciens", hint: "Formation live, selon projet" },
  { id: "je-ne-sais-pas", label: "Je ne sais pas", hint: "On en discute" },
];

export function saveBrief(brief: Brief) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(brief));
  } catch {
    /* stockage indisponible */
  }
}

export function readBrief(): Brief | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Brief;
    return Array.isArray(parsed.needs) ? parsed : null;
  } catch {
    return null;
  }
}

export function clearBrief() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function labelFor(
  list: { id: string; label: string }[],
  id: string | null,
): string | null {
  if (!id) return null;
  return list.find((x) => x.id === id)?.label ?? null;
}
