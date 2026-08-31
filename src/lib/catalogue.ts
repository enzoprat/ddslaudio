/**
 * ─────────────────────────────────────────────────────────────
 *  STORE CATALOGUE
 * ─────────────────────────────────────────────────────────────
 *  Seul endroit qui sait *où* sont rangés les produits. Le reste
 *  du site appelle `listeProduits()` sans se soucier du stockage.
 *
 *  Trois cas, dans cet ordre :
 *
 *  1. `BLOB_READ_WRITE_TOKEN` présent  → Vercel Blob, un unique
 *     fichier JSON. Pas de base de données : le catalogue tient en
 *     quelques dizaines de fiches et n'a qu'un seul rédacteur.
 *  2. Développement local              → un JSON dans .catalogue-local/,
 *     pour pouvoir essayer /admin sans rien déployer.
 *  3. Export statique de l'aperçu      → la graine `seedProducts`,
 *     en lecture seule.
 * ─────────────────────────────────────────────────────────────
 */

import "server-only";

import { cache } from "react";

import { seedProducts, type Product } from "@/data/catalog";

const FICHIER = "catalogue.json";
const FICHIER_LOCAL = ".catalogue-local/catalogue.json";

/** Complète une fiche de la graine, qui ne porte ni prix ni statut. */
function depuisGraine(): Product[] {
  return seedProducts.map((p) => ({ ...p, price: null, status: "actif" }));
}

function surBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/** Dépannage du poste de développement, jamais en production. */
function enLocal(): boolean {
  return !surBlob() && process.env.NODE_ENV === "development";
}

/** Le catalogue peut-il être modifié depuis /admin ? */
export function stockageActif(): boolean {
  return surBlob() || enLocal();
}

/** Où les modifications atterrissent, pour le dire à l'administrateur. */
export function stockageLocal(): boolean {
  return enLocal();
}

function valider(donnees: unknown): Product[] {
  if (!Array.isArray(donnees)) {
    throw new Error("Catalogue corrompu : un tableau de produits était attendu.");
  }
  return donnees as Product[];
}

/**
 * Liste complète, fiches en sommeil comprises. Réservée à
 * l'administration : les pages publiques passent par
 * `listeProduitsPublics()`.
 */
export const listeProduits = cache(async function listeProduits(): Promise<
  Product[]
> {
  if (enLocal()) {
    const { readFile } = await import("node:fs/promises");
    try {
      return valider(JSON.parse(await readFile(FICHIER_LOCAL, "utf8")));
    } catch (err) {
      // Premier lancement : le fichier n'existe pas encore.
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return depuisGraine();
      throw err;
    }
  }

  if (!surBlob()) return depuisGraine();

  const { list } = await import("@vercel/blob");
  const { blobs } = await list({ prefix: FICHIER, limit: 1 });
  const blob = blobs.find((b) => b.pathname === FICHIER);
  if (!blob) return depuisGraine();

  // `no-store` : sans cela l'administration afficherait encore la version
  // précédente juste après un enregistrement.
  const reponse = await fetch(blob.url, { cache: "no-store" });
  if (!reponse.ok) {
    throw new Error(
      `Catalogue illisible (${reponse.status}). Le site continue de servir la version précédente.`,
    );
  }

  return valider(await reponse.json());
});

/** Ce que voit le public : tout sauf les fiches mises en sommeil. */
export async function listeProduitsPublics(): Promise<Product[]> {
  const produits = await listeProduits();
  return produits.filter((p) => p.status === "actif");
}

export async function enregistrerProduits(produits: Product[]): Promise<void> {
  const contenu = JSON.stringify(produits, null, 2);

  if (enLocal()) {
    const { mkdir, writeFile } = await import("node:fs/promises");
    const { dirname } = await import("node:path");
    await mkdir(dirname(FICHIER_LOCAL), { recursive: true });
    await writeFile(FICHIER_LOCAL, contenu, "utf8");
    return;
  }

  const { put } = await import("@vercel/blob");
  await put(FICHIER, contenu, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    // Le fichier est relu à chaque écriture : il ne doit jamais être servi
    // depuis le cache du CDN.
    cacheControlMaxAge: 0,
  });
}
