import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Kicker } from "@/components/ui/Kicker";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment DDSL Audio utilise les informations transmises via les formulaires du site : finalité, durée, droits.",
  alternates: { canonical: "/politique-de-confidentialite" },
  robots: { index: false, follow: true },
};

const COLLECTED = [
  {
    t: "Vos coordonnées",
    d: "Nom, prénom, e-mail, téléphone et, le cas échéant, société. Elles servent uniquement à vous répondre.",
  },
  {
    t: "Les informations sur votre événement",
    d: "Date, lieu, horaires, nombre de personnes, type d'événement, ambiance souhaitée. Elles servent à vérifier la faisabilité et à préparer une proposition.",
  },
  {
    t: "Votre sélection de matériel",
    d: "Les références ajoutées à votre demande, leurs quantités, options et précisions.",
  },
];

export default function ConfidentialitePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          {
            name: "Politique de confidentialité",
            href: "/politique-de-confidentialite",
          },
        ]}
      />

      <div className="mx-auto max-w-[820px] px-4 pb-24 pt-14 sm:px-6 sm:pt-20">
        <Kicker>Données personnelles</Kicker>
        <h1 className="display-lg mt-5 text-ink-900">
          Politique de confidentialité
        </h1>
        <p className="lede mt-5">
          Ce site ne vend rien en ligne et n'utilise aucun outil de publicité.
          Les seules informations traitées sont celles que vous envoyez
          volontairement dans un formulaire.
        </p>

        <section className="mt-12">
          <h2 className="display-md text-ink-900">Ce qui est collecté</h2>
          <ul className="mt-6 divide-y divide-ink-950/10 border-y border-ink-950/11">
            {COLLECTED.map((c) => (
              <li key={c.t} className="py-4">
                <h3 className="text-[16px] text-ink-900">{c.t}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">
                  {c.d}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="display-md text-ink-900">À quoi cela sert</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
            Uniquement à traiter votre demande&nbsp;: vérifier la disponibilité
            du matériel et de la date, établir un devis, et échanger avec vous
            jusqu'à la réalisation ou l'abandon du projet. Aucune de ces
            informations n'est vendue, louée ni transmise à des tiers à des fins
            commerciales.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="display-md text-ink-900">Base légale</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
            Votre consentement, donné en cochant la case avant l'envoi du
            formulaire, ainsi que les démarches précontractuelles engagées à
            votre demande.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="display-md text-ink-900">Durée de conservation</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
            Les demandes sont conservées le temps de l'échange commercial, puis
            pendant la durée nécessaire au respect des obligations comptables
            lorsqu'un devis a été signé. Une demande restée sans suite peut être
            supprimée sur simple demande de votre part.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="display-md text-ink-900">Destinataires</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
            {`${site.name} uniquement. L'acheminement des messages passe par un prestataire technique d'envoi d'e-mails, qui n'exploite pas ces données pour son propre compte.`}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="display-md text-ink-900">
            Stockage dans votre navigateur
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
            Votre sélection de matériel et les réponses du parcours guidé sont
            enregistrées localement dans votre navigateur, afin que vous ne
            perdiez pas votre demande en changeant de page. Ces données restent
            sur votre appareil tant que vous n'envoyez pas le formulaire, et
            vous pouvez les effacer en vidant votre demande ou les données de
            navigation du site.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="display-md text-ink-900">Mesure d'audience</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
            Aucun traceur publicitaire ni cookie tiers n'est déposé par ce site.
            Si un outil de mesure d'audience est ajouté par la suite, cette page
            sera mise à jour avant sa mise en service.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="display-md text-ink-900">Vos droits</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
            Vous pouvez demander l'accès, la rectification, la suppression, la
            limitation ou la portabilité des informations vous concernant, et
            retirer votre consentement à tout moment. Ces demandes se formulent
            via le{" "}
            <Link
              href="/contact"
              className="text-brass-600 underline underline-offset-4"
            >
              formulaire de contact
            </Link>
            {site.contact.email && (
              <>
                {" "}
                ou à l'adresse{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-brass-600 underline underline-offset-4"
                >
                  {site.contact.email}
                </a>
              </>
            )}
            . Vous disposez également du droit d'introduire une réclamation
            auprès de la CNIL.
          </p>
        </section>
      </div>
    </>
  );
}
