import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact/ContactForm";
import { WhatsAppIcon, whatsappHref } from "@/components/layout/WhatsApp";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — DDSL Audio, Bordeaux et Gironde",
  description:
    "Contacter DDSL Audio pour une location de matériel, une installation son et lumière ou une prestation DJ à Bordeaux, en Gironde et dans la région bordelaise.",
  alternates: { canonical: "/contact" },
};

const ROUTES = [
  {
    t: "Vous savez ce qu'il vous faut",
    d: "Composez votre sélection dans le catalogue et envoyez-la en une fois.",
    href: "/materiel",
    cta: "Parcourir le matériel",
  },
  {
    t: "Vous ne savez pas quoi choisir",
    d: "Quatre questions sur votre événement suffisent à préparer une proposition.",
    href: "/besoin-conseil",
    cta: "Répondre aux questions",
  },
  {
    t: "Vous cherchez un DJ",
    d: "La prestation DJ a son propre formulaire : date, lieu, horaires, ambiance.",
    href: "/dj",
    cta: "Prestation DJ",
  },
];

export default function ContactPage() {
  const { contact, social } = site;
  const whatsapp = whatsappHref();
  const hasDirect = Boolean(contact.phone || contact.email || whatsapp);
  const socials = Object.entries(social).filter(([, v]) => Boolean(v)) as [
    string,
    string,
  ][];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <section className="relative border-b border-ink-950/10">
        <div
          className="pointer-events-none absolute inset-0 grid-tech opacity-35"
          style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1400px] px-4 pb-14 pt-14 sm:px-6 sm:pt-20">
          <Kicker>Contact</Kicker>
          <h1 className="display-lg mt-5 max-w-3xl text-ink-900">
            Poser une question, vérifier une date
          </h1>
          <p className="lede mt-5 max-w-2xl">
            DDSL Audio intervient à Bordeaux, en Gironde et dans la région
            bordelaise. Toute demande passe par écrit&nbsp;: c'est ce qui permet
            de vérifier la disponibilité du matériel avant de répondre.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            {hasDirect ? (
              <div className="panel rounded-panel p-6 sm:p-7">
                <h2 className="tech text-brass-600">Joindre directement</h2>
                <ul className="mt-5 space-y-3 text-[17px]">
                  {contact.phone && (
                    <li>
                      <a
                        href={`tel:${contact.phoneHref ?? contact.phone}`}
                        className="text-brass-700 hover:text-brass-700"
                      >
                        {contact.phone}
                      </a>
                    </li>
                  )}
                  {contact.email && (
                    <li>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-brass-700 hover:text-brass-700"
                      >
                        {contact.email}
                      </a>
                    </li>
                  )}
                  {whatsapp && (
                    <li>
                      <a
                        href={whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-brass-700"
                      >
                        <WhatsAppIcon className="h-[17px] w-[17px]" />
                        WhatsApp
                      </a>
                    </li>
                  )}
                </ul>
                {contact.openingHours && (
                  <p className="mt-5 text-[14.5px] text-ink-600">
                    {contact.openingHours}
                  </p>
                )}
              </div>
            ) : (
              <div className="panel rounded-panel p-6 sm:p-7">
                <h2 className="tech text-brass-600">Par écrit</h2>
                <p className="mt-5 text-[15.5px] leading-relaxed text-ink-600">
                  Le formulaire est la voie la plus directe pour le moment. Les
                  demandes sont lues et reçoivent une réponse à l'adresse
                  indiquée.
                </p>
              </div>
            )}

            <h2 className="display-md mt-12 text-ink-900">
              Par où passer selon votre cas
            </h2>
            <ul className="mt-6 divide-y divide-ink-950/10 border-y border-ink-950/11">
              {ROUTES.map((r) => (
                <li
                  key={r.href}
                  className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <div>
                    <h3 className="text-[16px] text-ink-900">{r.t}</h3>
                    <p className="mt-1.5 max-w-sm text-[14.5px] leading-relaxed text-ink-600">
                      {r.d}
                    </p>
                  </div>
                  <Link
                    href={r.href}
                    className="btn btn-sm btn-ghost shrink-0 self-start sm:self-auto"
                  >
                    {r.cta}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="tech mt-12 text-brass-700/80">Zone d'intervention</h2>
            <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-ink-600">
              Bordeaux et la métropole, puis la Gironde. Au-delà, c'est possible
              selon la date et le volume de matériel&nbsp;: indiquez la commune
              dans votre message, la réponse sera claire.
            </p>

            {socials.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {socials.map(([key, url]) => (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-ghost capitalize"
                    >
                      {key}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          <Reveal delay={90}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
