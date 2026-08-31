/**
 * ─────────────────────────────────────────────────────────────
 *  ACCÈS À L'ADMINISTRATION
 * ─────────────────────────────────────────────────────────────
 *  Un seul rédacteur, un seul mot de passe : `ADMIN_PASSWORD`.
 *  Pas de comptes, pas de base d'utilisateurs.
 *
 *  La session est un cookie signé « échéance.signature », la
 *  signature étant un HMAC du mot de passe. Changer le mot de
 *  passe invalide donc immédiatement les sessions ouvertes.
 * ─────────────────────────────────────────────────────────────
 */

import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "ddsl-admin";
const DUREE = 7 * 24 * 60 * 60 * 1000; // 7 jours

function motDePasse(): string | undefined {
  return process.env.ADMIN_PASSWORD;
}

export function administrationConfiguree(): boolean {
  return Boolean(motDePasse());
}

function signer(echeance: number, secret: string): string {
  return createHmac("sha256", secret).update(String(echeance)).digest("hex");
}

/** Comparaison à durée constante, pour ne rien révéler par le temps de réponse. */
function egales(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

export function verifierMotDePasse(saisie: string): boolean {
  const attendu = motDePasse();
  return Boolean(attendu) && egales(saisie, attendu!);
}

export async function ouvrirSession(): Promise<void> {
  const secret = motDePasse();
  if (!secret) return;

  const echeance = Date.now() + DUREE;
  const jar = await cookies();
  jar.set(COOKIE, `${echeance}.${signer(echeance, secret)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(echeance),
  });
}

export async function fermerSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function sessionValide(): Promise<boolean> {
  const secret = motDePasse();
  if (!secret) return false;

  const valeur = (await cookies()).get(COOKIE)?.value;
  if (!valeur) return false;

  const [brut, signature] = valeur.split(".");
  const echeance = Number(brut);
  if (!signature || !Number.isFinite(echeance) || echeance < Date.now()) {
    return false;
  }
  return egales(signature, signer(echeance, secret));
}

/**
 * À appeler en tête de CHAQUE écriture : les actions serveur sont
 * atteignables directement, l'affichage de la page ne les protège pas.
 */
export async function exigerSession(): Promise<void> {
  if (!(await sessionValide())) {
    throw new Error("Session expirée. Reconnectez-vous pour enregistrer.");
  }
}
