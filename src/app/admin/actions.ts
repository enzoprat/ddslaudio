"use server";

/**
 * Actions de l'administration.
 *
 * Chaque écriture commence par `exigerSession()` : une action serveur
 * est une route atteignable directement, le fait que la page ne
 * s'affiche pas sans mot de passe ne protège rien.
 */

import { revalidatePath } from "next/cache";

import {
  categories,
  OPT_INSTALL,
  OPT_OPERATOR,
  type CategoryId,
  type Product,
} from "@/data/catalog";
import { listeProduits, enregistrerProduits } from "@/lib/catalogue";
import {
  exigerSession,
  fermerSession,
  ouvrirSession,
  verifierMotDePasse,
} from "@/lib/admin-auth";

export type EtatAction = { erreur?: string; succes?: string };

/** Rafraîchit le site public après une écriture. */
function rafraichir() {
  revalidatePath("/", "layout");
}

const texte = (v: FormDataEntryValue | null, max = 400) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

/** Identifiant d'URL : minuscules, sans accents, tirets. */
function slug(nom: string): string {
  return (
    nom
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "produit"
  );
}

function identifiantLibre(base: string, pris: Set<string>): string {
  if (!pris.has(base)) return base;
  let n = 2;
  while (pris.has(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}

/** Référence lisible : code de catégorie + numéro d'ordre. */
function referenceSuivante(produits: Product[], categorie: CategoryId): string {
  const code = categories.find((c) => c.id === categorie)!.code;
  const utilisees = produits
    .filter((p) => p.ref.startsWith(`${code}-`))
    .map((p) => Number(p.ref.slice(code.length + 1).replace(/\D/g, "")))
    .filter(Number.isFinite);
  const suivant = (utilisees.length ? Math.max(...utilisees) : 0) + 1;
  return `${code}-${String(suivant).padStart(2, "0")}`;
}

/* ───────────────────────────── SESSION ───────────────────────────── */

export async function connexion(
  _etat: EtatAction,
  donnees: FormData,
): Promise<EtatAction> {
  if (!verifierMotDePasse(texte(donnees.get("motdepasse"), 200))) {
    return { erreur: "Mot de passe incorrect." };
  }
  await ouvrirSession();
  revalidatePath("/admin");
  return {};
}

export async function deconnexion(): Promise<void> {
  await fermerSession();
  revalidatePath("/admin");
}

/* ───────────────────────────── PRODUITS ───────────────────────────── */

export async function enregistrerProduit(
  _etat: EtatAction,
  donnees: FormData,
): Promise<EtatAction> {
  await exigerSession();

  const nom = texte(donnees.get("nom"), 120);
  if (!nom) return { erreur: "Le nom est obligatoire." };

  const categorie = texte(donnees.get("categorie"), 40) as CategoryId;
  if (!categories.some((c) => c.id === categorie)) {
    return { erreur: "Choisissez une catégorie." };
  }

  const description = texte(donnees.get("description"), 1200);
  if (!description) return { erreur: "La description est obligatoire." };

  // Le champ accepte « 350 » comme « 350,50 » : personne ne saisit un point.
  const prixSaisi = texte(donnees.get("prix"), 20).replace(",", ".");
  const prix = prixSaisi === "" ? null : Number(prixSaisi);
  if (prix !== null && (!Number.isFinite(prix) || prix < 0)) {
    return { erreur: "Le prix doit être un nombre." };
  }

  const quantiteSaisie = texte(donnees.get("quantite"), 10);
  const quantite = quantiteSaisie === "" ? null : Number(quantiteSaisie);
  if (quantite !== null && (!Number.isInteger(quantite) || quantite < 0)) {
    return { erreur: "La quantité doit être un nombre entier." };
  }

  const image = texte(donnees.get("image"), 600);
  const identifiant = texte(donnees.get("id"), 80);

  const produits = await listeProduits();
  const index = identifiant ? produits.findIndex((p) => p.id === identifiant) : -1;

  if (index === -1) {
    const pris = new Set(produits.map((p) => p.id));
    const nouveau: Product = {
      id: identifiantLibre(slug(nom), pris),
      ref: referenceSuivante(produits, categorie),
      name: nom,
      brand: null,
      model: null,
      category: categorie,
      subcategory: null,
      kind: "unit",
      images: image ? [image] : [],
      shortDescription: description,
      description: null,
      specifications: {},
      availableQuantity: quantite,
      installationAvailable: true,
      packContents: [],
      accessories: [],
      options: [OPT_INSTALL, OPT_OPERATOR],
      notes: null,
      featured: false,
      customConfig: null,
      price: prix,
      status: "actif",
    };
    await enregistrerProduits([...produits, nouveau]);
    rafraichir();
    return { succes: `« ${nom} » a été ajouté au catalogue.` };
  }

  const existant = produits[index];
  const modifie: Product = {
    ...existant,
    name: nom,
    category: categorie,
    // Le code de référence suit la catégorie : il change avec elle.
    ref:
      existant.category === categorie
        ? existant.ref
        : referenceSuivante(produits, categorie),
    shortDescription: description,
    availableQuantity: quantite,
    price: prix,
    // Pas de nouveau fichier déposé : on garde l'image en place.
    images: image ? [image] : existant.images,
  };
  const suite = [...produits];
  suite[index] = modifie;
  await enregistrerProduits(suite);
  rafraichir();
  return { succes: `« ${nom} » a été mis à jour.` };
}

export async function basculerSommeil(identifiant: string): Promise<void> {
  await exigerSession();
  const produits = await listeProduits();
  await enregistrerProduits(
    produits.map((p) =>
      p.id === identifiant
        ? { ...p, status: p.status === "actif" ? "sommeil" : "actif" }
        : p,
    ),
  );
  rafraichir();
}

export async function supprimerProduit(identifiant: string): Promise<void> {
  await exigerSession();
  const produits = await listeProduits();
  await enregistrerProduits(produits.filter((p) => p.id !== identifiant));
  rafraichir();
}
