/**
 * Envoi d'une demande de devis.
 *
 * `NEXT_PUBLIC_DEMO=1` correspond à l'export statique publié sur GitHub Pages
 * pour la présentation au client : il n'y a pas de route serveur dans cette
 * version, donc rien n'est envoyé. Le parcours reste navigable de bout en bout.
 * En production, le comportement est inchangé (POST vers `/api/devis`).
 */
export const isDemo = process.env.NEXT_PUBLIC_DEMO === "1";

export type DevisResult = { ok: boolean; error?: string };

export async function postDevis(payload: unknown): Promise<DevisResult> {
  if (isDemo) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { ok: true };
  }

  const res = await fetch("/api/devis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as DevisResult;
  if (!res.ok || !data.ok) {
    return { ok: false, error: data.error };
  }
  return { ok: true };
}
