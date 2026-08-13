/**
 * ─────────────────────────────────────────────────────────────
 *  CATALOGUE MATÉRIEL — DDSL AUDIO
 * ─────────────────────────────────────────────────────────────
 *  Source de vérité unique. Aucune référence n'est codée en dur
 *  dans les composants : tout est généré depuis ce fichier.
 *
 *  RÈGLE : on n'invente RIEN.
 *  - `null`   → information non communiquée → masquée sur le site
 *  - `[]`     → liste vide → bloc non affiché
 *  - `{}`     → aucune caractéristique → tableau non affiché
 *
 *  Pour compléter une fiche, il suffit de remplir les champs.
 *  L'interface les affiche automatiquement.
 * ─────────────────────────────────────────────────────────────
 */

export type CategoryId =
  | "sonorisation"
  | "lumiere"
  | "regie-dj"
  | "scene"
  | "video"
  | "consoles";

export type ProductKind = "unit" | "system";

export type PackItem = {
  /** Libellé de l'élément qui compose le système. */
  label: string;
  quantity?: number | null;
  /** Id d'un produit du catalogue si l'élément est louable séparément. */
  productId?: string | null;
};

export type ProductOption = {
  id: string;
  label: string;
  hint?: string;
};

export type Product = {
  id: string;
  /** Code technique affiché sur les fiches (repère interne lisible). */
  ref: string;
  name: string;
  brand: string | null;
  model: string | null;
  category: CategoryId;
  subcategory: string | null;
  kind: ProductKind;
  images: string[];
  shortDescription: string;
  description: string | null;
  /** Caractéristiques techniques : clé = libellé affiché. */
  specifications: Record<string, string>;
  availableQuantity: number | null;
  installationAvailable: boolean;
  packContents: PackItem[];
  accessories: string[];
  options: ProductOption[];
  /** Informations complémentaires affichées en encart sur la fiche. */
  notes: string | null;
  featured: boolean;
  /** Autorise la saisie d'une configuration libre (dimensions, plan…). */
  customConfig?: {
    label: string;
    placeholder: string;
  } | null;
};

export type Category = {
  id: CategoryId;
  slug: string;
  name: string;
  /** Code court utilisé dans l'UI technique. */
  code: string;
  /** Une ligne, factuelle, affichée sous le titre de catégorie. */
  tagline: string;
  intro: string;
  /** Message contextuel affiché en haut de la catégorie (UX). */
  hint: string | null;
  seo: {
    title: string;
    description: string;
  };
};

/* ───────────────────────────── CATÉGORIES ───────────────────────────── */

export const categories: Category[] = [
  {
    id: "sonorisation",
    slug: "sonorisation",
    name: "Sonorisation",
    code: "SON",
    tagline: "Systèmes de diffusion complets",
    intro:
      "Trois systèmes de sonorisation sont disponibles à la location. Chacun se loue monté et prêt à l'emploi, avec ou sans installation sur place. Si vous hésitez entre deux configurations, décrivez le lieu et le nombre de personnes : nous ajustons avant d'établir le devis.",
    hint: "Un doute sur la puissance nécessaire ? Indiquez la surface et le nombre d'invités dans votre demande, nous validons la configuration avant de chiffrer.",
    seo: {
      title: "Location de matériel de sonorisation à Bordeaux",
      description:
        "Location de systèmes de sonorisation à Bordeaux et en Gironde. Matériel seul ou installation et mise en service par DDSL Audio.",
    },
  },
  {
    id: "lumiere",
    slug: "lumiere",
    name: "Lumière",
    code: "LUM",
    tagline: "Éclairage scénique et événementiel",
    intro:
      "L'éclairage se loue à l'unité ou en ensemble. Le pilotage et l'implantation peuvent être pris en charge par DDSL Audio le jour J.",
    hint: "Le parc s'étoffe régulièrement. Si vous cherchez un type de projecteur qui n'est pas listé, demandez-le : nous vous dirons ce qui est disponible à votre date.",
    seo: {
      title: "Location d'éclairage événementiel à Bordeaux",
      description:
        "Location de lyres et de matériel d'éclairage événementiel à Bordeaux. Implantation et pilotage possibles par DDSL Audio.",
    },
  },
  {
    id: "regie-dj",
    slug: "regie-dj",
    name: "Régie DJ",
    code: "RDJ",
    tagline: "Lecteurs et tables de mixage Pioneer",
    intro:
      "Platines et tables de mixage Pioneer disponibles à l'unité. Vous composez votre régie référence par référence, ou vous nous laissez l'assembler avec le son et la lumière.",
    hint: "Un doute sur la compatibilité entre lecteurs et table de mixage ? DDSL Audio vérifie votre sélection avant de vous envoyer le devis.",
    seo: {
      title: "Location de matériel DJ à Bordeaux — Pioneer CDJ, DJM, XDJ",
      description:
        "Location de platines et tables de mixage Pioneer à Bordeaux : CDJ-2000 Nexus, DJM-800, DJM-700, XDJ-AZ. Régie complète possible.",
    },
  },
  {
    id: "scene",
    slug: "scene",
    name: "Scène & structures",
    code: "SCN",
    tagline: "Jusqu'à 24 m² de plateau",
    intro:
      "Le parc scénique permet de monter un plateau jusqu'à environ 24 m². Les éléments se louent aussi séparément pour compléter une scène existante ou surélever une régie.",
    hint: "Vous avez besoin d'une scène complète ? Indiquez les dimensions souhaitées et la hauteur dans votre demande.",
    seo: {
      title: "Location de scène et de structures à Bordeaux",
      description:
        "Location de plateau de scène jusqu'à 24 m² à Bordeaux et en Gironde. Montage et démontage assurés par DDSL Audio.",
    },
  },
  {
    id: "video",
    slug: "video",
    name: "Vidéo & projection",
    code: "VID",
    tagline: "Vidéoprojection et écrans",
    intro:
      "Vidéoprojecteurs et écrans pour diffuser un film, un diaporama, un discours ou un support de présentation. La mise en place et le câblage peuvent être ajoutés à la demande.",
    hint: "Précisez la distance de projection et la luminosité de la salle : cela conditionne le choix du vidéoprojecteur et de l'écran.",
    seo: {
      title: "Location de vidéoprojecteur et d'écran à Bordeaux",
      description:
        "Location de vidéoprojecteurs, écrans de projection et écran géant à Bordeaux. Installation et câblage possibles.",
    },
  },
  {
    id: "consoles",
    slug: "consoles",
    name: "Consoles & mixage",
    code: "MIX",
    tagline: "Mixage analogique et numérique",
    intro:
      "Consoles de mixage analogiques et numérique, pour un groupe, une conférence ou une régie son autonome. Disponibles seules ou intégrées à un système de sonorisation.",
    hint: "Indiquez le nombre de sources à brancher (micros, retours, instruments) : nous orientons vers la console adaptée.",
    seo: {
      title: "Location de console de mixage à Bordeaux",
      description:
        "Location de consoles de mixage analogiques et numérique à Bordeaux et en Gironde, seules ou intégrées à un système son.",
    },
  },
];

/* ───────────────────────────── OPTIONS COMMUNES ───────────────────────────── */

const OPT_INSTALL: ProductOption = {
  id: "installation",
  label: "Installation et mise en service",
  hint: "DDSL Audio livre, installe, câble et règle sur place.",
};

const OPT_OPERATOR: ProductOption = {
  id: "technicien",
  label: "Technicien présent pendant l'événement",
  hint: "Un opérateur reste sur place pour piloter et intervenir.",
};

/* ───────────────────────────── PRODUITS ─────────────────────────────
 *  Les champs laissés à `null` / `[]` / `{}` attendent les données
 *  réelles de DDSL Audio. Ils ne sont pas affichés en attendant.
 * ──────────────────────────────────────────────────────────────────── */

export const products: Product[] = [
  /* ── SONORISATION ─────────────────────────────────────────────── */
  {
    id: "systeme-sono-01",
    ref: "SON-S01",
    name: "Système Sono 01",
    brand: null,
    model: null,
    category: "sonorisation",
    subcategory: "Système complet",
    kind: "system",
    images: [],
    shortDescription:
      "Système de diffusion complet, livré monté et réglé si vous choisissez l'installation.",
    description:
      "Ensemble de sonorisation loué comme un tout : diffusion, amplification et câblage nécessaire au fonctionnement. Les éléments qui le composent peuvent également être loués séparément selon les disponibilités à votre date.",
    specifications: {},
    availableQuantity: 1,
    installationAvailable: true,
    // Composition : à renseigner élément par élément dès réception des références.
    // Exemple de structure attendue :
    // { label: "Enceinte", quantity: 2, productId: null },
    // { label: "Caisson de basses", quantity: 2, productId: null },
    // { label: "Amplification", quantity: 1, productId: null },
    packContents: [],
    accessories: [],
    options: [OPT_INSTALL, OPT_OPERATOR],
    notes:
      "La composition exacte du système est confirmée avec le devis, en fonction du lieu et de la date.",
    featured: true,
  },
  {
    id: "systeme-sono-02",
    ref: "SON-S02",
    name: "Système Sono 02",
    brand: null,
    model: null,
    category: "sonorisation",
    subcategory: "Système complet",
    kind: "system",
    images: [],
    shortDescription:
      "Deuxième système de diffusion du parc, louable seul ou en complément du premier.",
    description:
      "Les systèmes peuvent être combinés entre eux pour couvrir un volume plus important ou séparer deux espaces (salle et extérieur, cocktail et piste).",
    specifications: {},
    availableQuantity: 1,
    installationAvailable: true,
    packContents: [],
    accessories: [],
    options: [OPT_INSTALL, OPT_OPERATOR],
    notes:
      "La composition exacte du système est confirmée avec le devis, en fonction du lieu et de la date.",
    featured: false,
  },
  {
    id: "systeme-sono-03",
    ref: "SON-S03",
    name: "Système Sono 03",
    brand: null,
    model: null,
    category: "sonorisation",
    subcategory: "Système complet",
    kind: "system",
    images: [],
    shortDescription:
      "Troisième système du parc. Utilisable en diffusion principale ou en renfort.",
    description:
      "Comme les deux autres systèmes, il se loue avec ou sans installation. Si vous ne savez pas lequel choisir, décrivez simplement votre événement dans la demande.",
    specifications: {},
    availableQuantity: 1,
    installationAvailable: true,
    packContents: [],
    accessories: [],
    options: [OPT_INSTALL, OPT_OPERATOR],
    notes:
      "La composition exacte du système est confirmée avec le devis, en fonction du lieu et de la date.",
    featured: false,
  },

  /* ── LUMIÈRE ──────────────────────────────────────────────────── */
  {
    id: "lyre",
    ref: "LUM-01",
    name: "Lyre",
    brand: null,
    model: null,
    category: "lumiere",
    subcategory: "Projecteur motorisé",
    kind: "unit",
    images: [],
    shortDescription:
      "Projecteur motorisé pour animer une piste, un plateau ou une façade.",
    description:
      "Les lyres se louent à l'unité. Le nombre dépend de la surface à couvrir et de l'effet recherché : indiquez la configuration du lieu, nous proposons une quantité cohérente dans le devis.",
    specifications: {},
    availableQuantity: null,
    installationAvailable: true,
    packContents: [],
    accessories: [],
    options: [
      OPT_INSTALL,
      {
        id: "pilotage",
        label: "Pilotage lumière pendant l'événement",
        hint: "Programmation et conduite assurées par DDSL Audio.",
      },
    ],
    notes:
      "Quantité disponible variable selon la date. Elle est confirmée à la réponse au devis.",
    featured: true,
  },

  /* ── RÉGIE DJ ─────────────────────────────────────────────────── */
  {
    id: "pioneer-cdj-2000-nexus",
    ref: "RDJ-01",
    name: "Pioneer CDJ-2000 Nexus",
    brand: "Pioneer",
    model: "CDJ-2000 Nexus",
    category: "regie-dj",
    subcategory: "Lecteur multimédia",
    kind: "unit",
    images: [],
    shortDescription:
      "Lecteur multimédia. Se loue à l'unité, généralement par paire.",
    description:
      "La plupart des DJ demandent deux lecteurs associés à une table de mixage : pensez à ajuster la quantité avant d'envoyer votre demande.",
    specifications: {},
    availableQuantity: null,
    installationAvailable: true,
    packContents: [],
    accessories: [],
    options: [OPT_INSTALL],
    notes: null,
    featured: true,
  },
  {
    id: "pioneer-djm-800",
    ref: "RDJ-02",
    name: "Pioneer DJM-800",
    brand: "Pioneer",
    model: "DJM-800",
    category: "regie-dj",
    subcategory: "Table de mixage",
    kind: "unit",
    images: [],
    shortDescription: "Table de mixage DJ.",
    description:
      "Compatible avec les lecteurs du parc. À associer à un ou deux lecteurs selon votre configuration.",
    specifications: {},
    availableQuantity: null,
    installationAvailable: true,
    packContents: [],
    accessories: [],
    options: [OPT_INSTALL],
    notes: null,
    featured: true,
  },
  {
    id: "pioneer-djm-700",
    ref: "RDJ-03",
    name: "Pioneer DJM-700",
    brand: "Pioneer",
    model: "DJM-700",
    category: "regie-dj",
    subcategory: "Table de mixage",
    kind: "unit",
    images: [],
    shortDescription:
      "Table de mixage DJ, seconde référence du parc.",
    description:
      "Elle se branche sur les mêmes lecteurs que le DJM-800. Utile lorsque deux régies tournent, ou en secours.",
    specifications: {},
    availableQuantity: null,
    installationAvailable: true,
    packContents: [],
    accessories: [],
    options: [OPT_INSTALL],
    notes: null,
    featured: false,
  },
  {
    id: "pioneer-xdj-az",
    ref: "RDJ-04",
    name: "Pioneer XDJ-AZ",
    brand: "Pioneer",
    model: "XDJ-AZ",
    category: "regie-dj",
    subcategory: "Système tout-en-un",
    kind: "unit",
    images: [],
    shortDescription:
      "Console tout-en-un : lecteurs et mixage dans un seul appareil.",
    description:
      "Une seule machine à installer et à câbler, sans lecteurs séparés. Pratique quand la place en régie est limitée ou quand le montage doit aller vite.",
    specifications: {},
    availableQuantity: null,
    installationAvailable: true,
    packContents: [],
    accessories: [],
    options: [OPT_INSTALL],
    notes:
      "Si vous hésitez entre cette console et une régie CDJ + table de mixage, précisez-le : nous en discutons avant le devis.",
    featured: true,
  },

  /* ── SCÈNE ────────────────────────────────────────────────────── */
  {
    id: "plateau-scene",
    ref: "SCN-01",
    name: "Plateau de scène",
    brand: null,
    model: null,
    category: "scene",
    subcategory: "Praticables",
    kind: "unit",
    images: [],
    shortDescription:
      "Éléments de plateau assemblables, jusqu'à environ 24 m² au total.",
    description:
      "Le parc permet de monter une scène jusqu'à environ 24 m². Vous pouvez demander une surface plus réduite : le plateau se compose selon vos dimensions, la place disponible et l'usage (groupe, prise de parole, régie surélevée).",
    specifications: {
      "Surface maximale": "environ 24 m²",
    },
    availableQuantity: null,
    installationAvailable: true,
    packContents: [],
    accessories: [],
    options: [
      {
        id: "montage",
        label: "Montage et démontage sur place",
        hint: "Livraison, assemblage du plateau et reprise après l'événement.",
      },
    ],
    notes: null,
    featured: true,
    customConfig: {
      label: "Dimensions souhaitées",
      placeholder: "Ex. 6 m × 4 m, hauteur 40 cm, en intérieur",
    },
  },

  /* ── VIDÉO ────────────────────────────────────────────────────── */
  {
    id: "videoprojecteur",
    ref: "VID-01",
    name: "Vidéoprojecteur",
    brand: null,
    model: null,
    category: "video",
    subcategory: "Projection",
    kind: "unit",
    images: [],
    shortDescription:
      "Trois vidéoprojecteurs disponibles, à associer à un écran du parc.",
    description:
      "Le choix du projecteur dépend de la distance de projection, de la taille de l'image et de la luminosité ambiante. Décrivez la salle dans votre demande : nous affectons le modèle adapté.",
    specifications: {},
    availableQuantity: 3,
    installationAvailable: true,
    packContents: [],
    accessories: [],
    options: [
      OPT_INSTALL,
      {
        id: "cablage",
        label: "Câblage et raccordement des sources",
        hint: "Liaison ordinateur, régie ou lecteur jusqu'au projecteur.",
      },
    ],
    notes: null,
    featured: false,
  },
  {
    id: "ecran-projection",
    ref: "VID-02",
    name: "Écran de projection",
    brand: null,
    model: null,
    category: "video",
    subcategory: "Projection",
    kind: "unit",
    images: [],
    shortDescription: "Deux écrans disponibles, sur pied ou sur structure.",
    description:
      "À associer à un vidéoprojecteur. Indiquez la taille d'image souhaitée et la profondeur de salle disponible.",
    specifications: {},
    availableQuantity: 2,
    installationAvailable: true,
    packContents: [],
    accessories: [],
    options: [OPT_INSTALL],
    notes: null,
    featured: false,
  },
  {
    id: "ecran-geant",
    ref: "VID-03",
    name: "Écran géant",
    brand: null,
    model: null,
    category: "video",
    subcategory: "Projection",
    kind: "unit",
    images: [],
    shortDescription:
      "Grande surface de projection pour une salle profonde ou une audience nombreuse.",
    description:
      "Un seul exemplaire au parc. Il demande davantage de recul et une implantation étudiée : l'installation est vivement conseillée.",
    specifications: {},
    availableQuantity: 1,
    installationAvailable: true,
    packContents: [],
    accessories: [],
    options: [OPT_INSTALL],
    notes:
      "Un repérage du lieu peut être proposé avant l'événement selon la configuration.",
    featured: true,
  },

  /* ── CONSOLES ─────────────────────────────────────────────────── */
  {
    id: "console-analogique",
    ref: "MIX-01",
    name: "Console de mixage analogique",
    brand: null,
    model: null,
    category: "consoles",
    subcategory: "Analogique",
    kind: "unit",
    images: [],
    shortDescription:
      "Trois consoles analogiques disponibles, réglages directs et immédiats.",
    description:
      "Une console analogique convient bien aux configurations simples : quelques micros, un lecteur, deux retours. Tout est accessible en façade, sans navigation dans des menus.",
    specifications: {},
    availableQuantity: 3,
    installationAvailable: true,
    packContents: [],
    accessories: [],
    options: [OPT_INSTALL, OPT_OPERATOR],
    notes: null,
    featured: false,
  },
  {
    id: "console-numerique",
    ref: "MIX-02",
    name: "Console de mixage numérique",
    brand: null,
    model: null,
    category: "consoles",
    subcategory: "Numérique",
    kind: "unit",
    images: [],
    shortDescription:
      "Une console numérique, pour les configurations à plusieurs sources et mémoires de réglages.",
    description:
      "Utile dès qu'il y a un groupe, plusieurs retours, ou plusieurs moments à enchaîner dans la journée avec des réglages différents.",
    specifications: {},
    availableQuantity: 1,
    installationAvailable: true,
    packContents: [],
    accessories: [],
    options: [OPT_INSTALL, OPT_OPERATOR],
    notes: null,
    featured: false,
  },
];

/* ───────────────────────────── HELPERS ───────────────────────────── */

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function productsByCategory(categoryId: CategoryId): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function categoryCount(categoryId: CategoryId): number {
  return productsByCategory(categoryId).length;
}

export const featuredProducts = products.filter((p) => p.featured);

/** Vrai si la fiche contient au moins une donnée technique à afficher. */
export function hasSpecs(product: Product): boolean {
  return Object.keys(product.specifications).length > 0;
}

/** Libellé court « marque + modèle » quand les deux sont connus. */
export function productLabel(product: Product): string | null {
  if (product.brand && product.model) return `${product.brand} ${product.model}`;
  return product.model ?? product.brand ?? null;
}

/**
 * Résumé du parc affiché en façade (hero, page matériel).
 * Chaque ligne est un fait vérifiable, dérivé des données ci-dessus.
 */
export function parcSummary() {
  const qty = (id: string) => getProduct(id)?.availableQuantity ?? null;
  const projecteurs = qty("videoprojecteur");
  const ecrans = (qty("ecran-projection") ?? 0) + (qty("ecran-geant") ?? 0);
  const analogiques = qty("console-analogique");
  const numeriques = qty("console-numerique");

  return categories.map((c) => {
    let detail: string;
    switch (c.id) {
      case "sonorisation":
        detail = `${categoryCount("sonorisation")} systèmes complets`;
        break;
      case "lumiere":
        detail = "Lyres";
        break;
      case "regie-dj":
        detail = "Pioneer CDJ · DJM · XDJ";
        break;
      case "scene":
        detail = "Plateau jusqu'à 24 m²";
        break;
      case "video":
        detail = `${projecteurs} vidéoprojecteurs · ${ecrans} écrans`;
        break;
      case "consoles":
        detail = `${analogiques} analogiques · ${numeriques} numérique`;
        break;
    }
    return { ...c, detail };
  });
}
