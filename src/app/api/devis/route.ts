import { NextResponse } from "next/server";
import { getProduct, productLabel } from "@/data/catalog";
import { listeProduits } from "@/lib/catalogue";
import { site } from "@/data/site";

/**
 * Réception des demandes de devis.
 *
 * Envoi par e-mail activé dès que ces variables d'environnement
 * sont renseignées (aucune dépendance supplémentaire) :
 *   RESEND_API_KEY   — clé API Resend
 *   DEVIS_TO_EMAIL   — adresse de réception DDSL Audio
 *   DEVIS_FROM_EMAIL — expéditeur vérifié (ex. site@ddslaudio.fr)
 *
 * Sans ces variables, la demande est journalisée côté serveur et
 * l'utilisateur reçoit une confirmation : rien n'est perdu
 * silencieusement, mais l'acheminement doit être configuré.
 */

export const runtime = "nodejs";

/**
 * Message d'échec : ne renvoie vers un canal de secours que s'il existe
 * réellement. Tant que les coordonnées ne sont pas renseignées dans
 * `site.ts`, inutile de demander à l'internaute de « nous contacter ».
 */
function sendFailureMessage(): string {
  /* Le téléphone d'abord : en cas d'échec d'envoi, appeler aboutit plus
     sûrement qu'écrire. La préposition suit le moyen de contact. */
  const repli = site.contact.phone
    ? `au ${site.contact.phone}`
    : site.contact.email
      ? `à l'adresse ${site.contact.email}`
      : null;

  return repli
    ? `L'envoi a échoué. Réessayez dans un instant, ou contactez DDSL Audio directement ${repli}.`
    : "L'envoi a échoué. Réessayez dans un instant : votre saisie est conservée.";
}

type Payload = {
  kind: "materiel" | "dj" | "contact";
  contact: {
    firstName: string;
    lastName: string;
    company?: string;
    email: string;
    phone?: string;
  };
  event: {
    type?: string;
    date?: string;
    place?: string;
    guests?: string;
    schedule?: string;
    venue?: string;
  };
  needs: {
    installation?: string;
    dj?: boolean;
    musicians?: boolean;
    mood?: string;
    sound?: boolean;
    light?: boolean;
    list?: string[];
  };
  items: { productId: string; quantity: number; options: string[]; note?: string }[];
  message?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const clean = (v: unknown, max = 400) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête illisible." },
      { status: 400 },
    );
  }

  const firstName = clean(body?.contact?.firstName, 80);
  const lastName = clean(body?.contact?.lastName, 80);
  const email = clean(body?.contact?.email, 160);

  if (!lastName || !email) {
    return NextResponse.json(
      { ok: false, error: "Nom et e-mail sont nécessaires pour vous répondre." },
      { status: 400 },
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "L'adresse e-mail ne semble pas valide." },
      { status: 400 },
    );
  }

  const items = Array.isArray(body.items) ? body.items.slice(0, 80) : [];
  // Liste complète, sommeil compris : une sélection faite avant la mise en
  // sommeil d'une fiche doit rester lisible dans le message.
  const catalogue = await listeProduits();

  const lines: string[] = [];
  lines.push(
    body.kind === "dj"
      ? "DEMANDE — PRESTATION DJ"
      : body.kind === "contact"
        ? "MESSAGE — FORMULAIRE DE CONTACT"
        : "DEMANDE DE DEVIS",
  );
  lines.push("");
  lines.push("— Contact —");
  lines.push(`Nom       : ${firstName} ${lastName}`.trim());
  if (clean(body.contact.company)) {
    lines.push(`Société   : ${clean(body.contact.company)}`);
  }
  lines.push(`E-mail    : ${email}`);
  if (clean(body.contact.phone, 40)) {
    lines.push(`Téléphone : ${clean(body.contact.phone, 40)}`);
  }

  const ev = body.event ?? {};
  const evLines = [
    ["Type", clean(ev.type, 80)],
    ["Date", clean(ev.date, 40)],
    ["Lieu", clean(ev.place, 160)],
    ["Personnes", clean(ev.guests, 60)],
    ["Intérieur/extérieur", clean(ev.venue, 40)],
    ["Horaires", clean(ev.schedule, 120)],
  ].filter(([, v]) => v);

  if (evLines.length) {
    lines.push("", "— Événement —");
    evLines.forEach(([k, v]) => lines.push(`${k} : ${v}`));
  }

  const n = body.needs ?? {};
  const needLines: string[] = [];
  if (clean(n.installation, 40)) {
    needLines.push(`Installation : ${clean(n.installation, 40)}`);
  }
  if (n.dj) needLines.push("DJ : oui");
  if (n.musicians) needLines.push("Musiciens : oui");
  if (n.sound) needLines.push("Sonorisation à fournir : oui");
  if (n.light) needLines.push("Éclairage à fournir : oui");
  if (clean(n.mood, 200)) needLines.push(`Ambiance : ${clean(n.mood, 200)}`);
  if (Array.isArray(n.list) && n.list.length) {
    needLines.push(`Besoins indiqués : ${n.list.join(", ")}`);
  }
  if (needLines.length) {
    lines.push("", "— Besoins —", ...needLines);
  }

  if (items.length) {
    lines.push("", `— Matériel sélectionné (${items.length}) —`);
    for (const it of items) {
      const product = getProduct(catalogue, it.productId);
      if (!product) continue;
      const label = productLabel(product);
      lines.push(
        `• ${it.quantity} × ${product.name}${
          label && label !== product.name ? ` (${label})` : ""
        } [${product.ref}]`,
      );
      if (it.options?.length) {
        const names = it.options
          .map((o) => product.options.find((po) => po.id === o)?.label ?? o)
          .join(", ");
        lines.push(`    options : ${names}`);
      }
      if (clean(it.note, 200)) {
        lines.push(`    précision : ${clean(it.note, 200)}`);
      }
    }
  }

  if (clean(body.message, 3000)) {
    lines.push("", "— Message —", clean(body.message, 3000));
  }

  const text = lines.join("\n");
  const subject = (
    body.kind === "dj"
      ? `Prestation DJ — ${firstName} ${lastName}`
      : body.kind === "contact"
        ? `Message site — ${firstName} ${lastName}`
        : `Demande de devis — ${firstName} ${lastName}`
  ).trim();

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.DEVIS_TO_EMAIL;
  const from = process.env.DEVIS_FROM_EMAIL;

  if (apiKey && to && from) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject,
          text,
        }),
      });

      if (!res.ok) {
        console.error("[devis] envoi refusé", res.status, await res.text());
        console.error("[devis] contenu non acheminé :\n" + text);
        return NextResponse.json(
          {
            ok: false,
            error: sendFailureMessage(),
          },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error("[devis] erreur réseau", err);
      console.error("[devis] contenu non acheminé :\n" + text);
      return NextResponse.json(
        {
          ok: false,
          error: sendFailureMessage(),
        },
        { status: 502 },
      );
    }
  } else {
    // Acheminement non configuré : la demande est tracée dans les logs serveur.
    console.warn(
      "[devis] RESEND_API_KEY / DEVIS_TO_EMAIL / DEVIS_FROM_EMAIL non configurés.",
    );
    console.info("[devis] " + subject + "\n" + text);
  }

  return NextResponse.json({ ok: true });
}
