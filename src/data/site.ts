/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIGURATION GLOBALE — DDSL AUDIO
 * ─────────────────────────────────────────────────────────────
 *  Toute valeur `null` est volontairement absente du site tant
 *  qu'elle n'a pas été confirmée par DDSL Audio.
 *  L'interface masque automatiquement les champs non renseignés :
 *  il suffit de remplir la valeur ici pour qu'elle apparaisse.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "DDSL Audio",
  legalName: "DDSL Audio",
  /** ⚠️ À CONFIRMER — domaine définitif. Surchargeable par NEXT_PUBLIC_SITE_URL. */
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ddsl-audio.fr",
  city: "Bordeaux",
  area: "Gironde et région bordelaise",

  /** ⚠️ À COMPLÉTER — ne rien inventer. `null` = masqué sur le site. */
  contact: {
    phone: "06 41 80 89 82" as string | null,
    phoneHref: "+33641808982" as string | null,
    whatsapp: null as string | null, // ex. "+33600000000"
    email: null as string | null, // ex. "contact@ddsl-audio.fr"
    address: null as string | null,
    postalCode: null as string | null,
    openingHours: null as string | null,
    siret: null as string | null,
    legalForm: null as string | null,
    vatNumber: null as string | null,
    publicationDirector: null as string | null,
    hostingProvider: null as string | null,
  },

  social: {
    instagram: null as string | null,
    facebook: null as string | null,
    youtube: null as string | null,
  },

  /** Formulaires : destination des demandes de devis (variables d'environnement). */
  formsEndpointNote:
    "Les demandes sont traitées par /api/devis. Renseigner RESEND_API_KEY + DEVIS_TO_EMAIL pour l'envoi par e-mail.",
} as const;

export type EventType = {
  id: string;
  label: string;
};

export const eventTypes: EventType[] = [
  { id: "soiree-privee", label: "Soirée privée" },
  { id: "mariage", label: "Mariage" },
  { id: "professionnel", label: "Événement professionnel" },
  { id: "concert", label: "Concert / live" },
  { id: "dj-set", label: "DJ set" },
  { id: "autre", label: "Autre" },
];

export const installationChoices = [
  { id: "oui", label: "Oui" },
  { id: "non", label: "Non, je récupère le matériel" },
  { id: "ne-sais-pas", label: "Je ne sais pas encore" },
] as const;
