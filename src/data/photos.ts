/**
 * ─────────────────────────────────────────────────────────────
 *  PHOTOTHÈQUE
 * ─────────────────────────────────────────────────────────────
 *  Photos fournies par DDSL Audio. Les légendes décrivent
 *  uniquement ce qui est visible sur l'image : aucun lieu, aucune
 *  date et aucun nom d'événement n'est avancé tant que DDSL Audio
 *  ne les a pas confirmés. Dès qu'ils le seront, ces photos
 *  pourront alimenter des fiches complètes dans `realisations.ts`.
 * ─────────────────────────────────────────────────────────────
 */

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  /** Description de l'image pour les lecteurs d'écran. */
  alt: string;
  /** Légende affichée sous la photo. */
  caption: string;
  /**
   * `object-position` à appliquer sur les cadrages larges, quand le sujet
   * n'est pas au centre de l'image. Non renseigné = centré.
   */
  focus?: string;
};

export const photos: Photo[] = [
  {
    id: "regie-dj-colonnes",
    src: "/photos/regie-dj-colonnes.jpg",
    width: 1440,
    height: 1440,
    alt: "Régie DJ habillée aux couleurs de DDSL Audio, encadrée de deux colonnes acoustiques posées sur caissons de basse, avec deux lyres installées sur la régie.",
    caption:
      "Régie habillée, colonnes sur caissons et lyres posées sur la structure.",
  },
  {
    id: "systeme-ligne-source-salle",
    src: "/photos/systeme-ligne-source-salle.jpg",
    width: 1600,
    height: 1066,
    alt: "Système de diffusion en ligne source empilé sur deux caissons de basse, surmonté d'une lyre, installé en bord de scène devant un rideau.",
    caption:
      "Diffusion en ligne source sur caissons, lyre en tête de pile, en bord de plateau.",
  },
  {
    id: "installation-lyre",
    src: "/photos/installation-lyre.jpg",
    width: 1600,
    height: 1066,
    alt: "Technicien en sweat DDSL Audio installant une lyre en hauteur dans une salle de réception.",
    caption: "Pose et orientation d'une lyre pendant le montage.",
    focus: "50% 22%",
  },
  {
    id: "montage-systeme-salle",
    src: "/photos/montage-systeme-salle.jpg",
    width: 1600,
    height: 1066,
    alt: "Deux personnes assemblant un système de diffusion en ligne source sur ses caissons, à côté d'une malle de transport.",
    caption: "Assemblage d'un système de diffusion, malles encore ouvertes.",
  },
  {
    id: "plateau-concert-lumiere",
    src: "/photos/plateau-concert-lumiere.jpg",
    width: 1600,
    height: 1066,
    alt: "Plateau de concert équipé d'une batterie, de claviers, de retours de scène et d'un pont lumière allumé en rouge et bleu.",
    caption: "Plateau instrumenté, retours en place et éclairage de scène monté.",
  },
  {
    id: "enceinte-sur-pied-soiree",
    src: "/photos/enceinte-sur-pied-soiree.jpg",
    width: 1600,
    height: 1066,
    alt: "Technicien DDSL Audio réglant la hauteur d'une enceinte sur pied dans une salle, de nuit.",
    caption: "Réglage d'une enceinte sur pied en début de soirée.",
  },
  {
    id: "scene-exterieure-ecran",
    src: "/photos/scene-exterieure-ecran.jpg",
    width: 1536,
    height: 1024,
    alt: "Scène montée en extérieur avec un grand écran, des enceintes sur pieds, des retours de scène et une jupe de scène DDSL Audio.",
    caption:
      "Plateau monté en extérieur : écran, façade sur pieds et retours de scène.",
  },
  {
    id: "montage-enceintes-etage",
    src: "/photos/montage-enceintes-etage.jpg",
    width: 1600,
    height: 1066,
    alt: "Technicien en t-shirt DDSL Audio positionnant des enceintes empilées devant une baie vitrée.",
    caption: "Mise en place de la diffusion avant l'ouverture des portes.",
  },
];

export function photo(id: string): Photo | undefined {
  return photos.find((p) => p.id === id);
}

/** Sélection d'accueil : un aperçu des trois volets (parc, montage, plateau). */
export const apercuAccueil = [
  "scene-exterieure-ecran",
  "systeme-ligne-source-salle",
  "plateau-concert-lumiere",
  "montage-systeme-salle",
]
  .map((id) => photo(id))
  .filter((p): p is Photo => Boolean(p));
