import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Kicker } from "@/components/ui/Kicker";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site DDSL Audio — éditeur, hébergement, propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  const { contact } = site;

  const identity: [string, string | null][] = [
    ["Dénomination", site.legalName],
    ["Forme juridique", contact.legalForm],
    ["Adresse", contact.address],
    ["Code postal / ville", contact.postalCode],
    ["SIRET", contact.siret],
    ["TVA intracommunautaire", contact.vatNumber],
    ["Directeur de la publication", contact.publicationDirector],
    ["Téléphone", contact.phone],
    ["E-mail", contact.email],
  ];

  const known = identity.filter(([, v]) => Boolean(v)) as [string, string][];
  const missing = identity.filter(([, v]) => !v).map(([k]) => k);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Mentions légales", href: "/mentions-legales" },
        ]}
      />

      <div className="mx-auto max-w-[820px] px-4 pb-24 pt-14 sm:px-6 sm:pt-20">
        <Kicker>Informations légales</Kicker>
        <h1 className="display-lg mt-5 text-ink-900">Mentions légales</h1>

        <section className="mt-12">
          <h2 className="display-md text-ink-900">Éditeur du site</h2>
          <dl className="mt-5 divide-y divide-ink-950/10 border-y border-ink-950/11">
            {known.map(([k, v]) => (
              <div
                key={k}
                className="grid gap-1 py-3.5 sm:grid-cols-[240px_minmax(0,1fr)] sm:gap-4"
              >
                <dt className="tech-sm text-ink-500">{k}</dt>
                <dd className="text-[15px] text-ink-900">{v}</dd>
              </div>
            ))}
          </dl>

          {missing.length > 0 && (
            <div className="mt-6 rounded-[3px] border-l-2 border-brass-600/60 bg-ink-950/[0.035] px-5 py-4">
              <p className="text-[14.5px] leading-relaxed text-ink-600">
                Les informations suivantes ne sont pas encore publiées&nbsp;:{" "}
                {missing.join(", ").toLowerCase()}. Elles seront ajoutées dès
                communication par DDSL Audio. En attendant, toute demande
                d'identification de l'éditeur peut être formulée via le{" "}
                <Link
                  href="/contact"
                  className="text-brass-600 underline underline-offset-4"
                >
                  formulaire de contact
                </Link>
                .
              </p>
            </div>
          )}
        </section>

        <section className="mt-12">
          <h2 className="display-md text-ink-900">Hébergement</h2>
          {contact.hostingProvider ? (
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
              {contact.hostingProvider}
            </p>
          ) : (
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
              Les coordonnées de l'hébergeur seront précisées ici lors de la
              mise en production du site.
            </p>
          )}
        </section>

        <section className="mt-12">
          <h2 className="display-md text-ink-900">Objet du site</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
            {`Ce site présente le matériel et les prestations de ${site.name} à ${site.city} et en ${site.area}. Il ne permet aucune vente ni aucune réservation en ligne. Les informations affichées (disponibilités, caractéristiques, compositions) sont indicatives et ne valent pas offre contractuelle : seul le devis établi par ${site.name} engage les parties.`}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="display-md text-ink-900">
            Propriété intellectuelle
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
            {`La structure du site, ses textes et ses éléments graphiques sont la propriété de ${site.name}, sauf mention contraire. Les marques et références de matériel citées appartiennent à leurs fabricants respectifs et ne sont mentionnées qu'à titre d'identification des équipements du parc.`}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="display-md text-ink-900">Liens et responsabilité</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
            {`${site.name} met à jour ce site avec soin, sans garantir l'absence d'erreur ou d'omission. En cas d'écart entre une information du site et le devis, c'est le devis qui fait foi.`}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="display-md text-ink-900">Données personnelles</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
            Le traitement des informations transmises via les formulaires est
            décrit dans la{" "}
            <Link
              href="/politique-de-confidentialite"
              className="text-brass-600 underline underline-offset-4"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  );
}
