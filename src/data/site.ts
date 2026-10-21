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
  /**
   * Domaine de production. Sans tiret, et AVEC `www` : l'hébergement
   * redirige `ddslaudio.fr` vers `www.ddslaudio.fr` en 308, c'est donc
   * cette forme qui est canonique. Une canonique pointant vers l'URL
   * qui redirige ferait perdre le bénéfice du signal.
   *
   * Toutes les URL absolues en découlent : canoniques, sitemap,
   * robots.txt, Open Graph et données structurées.
   * Surchargeable par NEXT_PUBLIC_SITE_URL.
   */
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ddslaudio.fr",
  city: "Bordeaux",
  area: "Gironde et région bordelaise",

  /** ⚠️ À COMPLÉTER — ne rien inventer. `null` = masqué sur le site. */
  contact: {
    phone: "06 41 80 89 82" as string | null,
    phoneHref: "+33641808982" as string | null,
    whatsapp: "+33641808982" as string | null,
    email: "contact@ddslaudio.fr" as string | null,

    /* Identité légale relevée sur societe.com (SIREN 794 913 798).
       À faire confirmer par DDSL Audio avant la mise en ligne. */
    address: "26 rue Sarah Bernhardt" as string | null,
    postalCode: "33600 Pessac" as string | null,
    openingHours: null as string | null,
    siret: "794 913 798 00029" as string | null,
    legalForm: "Entrepreneur individuel" as string | null,
    /* Laissé vide volontairement : le n° de TVA affiché par societe.com est
       recalculé depuis le SIREN, il n'est pas déclaré. Ne le renseigner que si
       DDSL Audio est effectivement assujetti à la TVA. */
    vatNumber: null as string | null,
    publicationDirector: "Daniel Foudjem Ganno" as string | null,
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
