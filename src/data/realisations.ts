/**
 * ─────────────────────────────────────────────────────────────
 *  RÉALISATIONS
 * ─────────────────────────────────────────────────────────────
 *  Tableau volontairement vide : aucune réalisation n'est
 *  publiée tant que DDSL Audio n'a pas fourni les photos et les
 *  informations réelles. La page s'adapte automatiquement dès
 *  qu'une entrée est ajoutée ici.
 *
 *  Exemple de structure attendue :
 *
 *  {
 *    id: "mariage-chateau-2024",
 *    title: "Mariage — Château, Médoc",
 *    eventType: "Mariage",
 *    city: "Médoc",
 *    date: "2024-06",              // AAAA-MM, facultatif
 *    cover: "/realisations/xxx.jpg",
 *    images: ["/realisations/xxx-1.jpg"],
 *    video: null,
 *    summary: "Sonorisation du cocktail puis de la soirée, éclairage de piste.",
 *    equipment: ["systeme-sono-02", "lyre"],   // ids du catalogue
 *    services: ["Location", "Installation", "DJ"],
 *    featured: true,
 *  }
 * ─────────────────────────────────────────────────────────────
 */

export type Realisation = {
  id: string;
  title: string;
  eventType: string;
  city: string | null;
  date: string | null;
  cover: string | null;
  images: string[];
  video: string | null;
  summary: string;
  equipment: string[];
  services: string[];
  featured: boolean;
};

export const realisations: Realisation[] = [];

export function featuredRealisations() {
  return realisations.filter((r) => r.featured);
}
