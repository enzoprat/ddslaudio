import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppIcon, whatsappHref } from "@/components/layout/WhatsApp";
import { categories } from "@/data/catalog";
import { site } from "@/data/site";

const PRESTATIONS = [
  { href: "/prestations#location", label: "Location de matériel" },
  { href: "/prestations#installation", label: "Installation son & lumière" },
  { href: "/dj", label: "Prestation DJ" },
  { href: "/dj#musiciens", label: "Musiciens" },
];

const MAISON = [
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/besoin-conseil", label: "Besoin de conseil" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const { contact } = site;
  const whatsapp = whatsappHref();
  const hasContact = Boolean(contact.phone || contact.email || whatsapp);

  return (
    <footer className="stage relative">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid gap-10 py-14 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
          <div>
            <Logo size="md" tone="sombre" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-paper-200/70">
              Location de matériel son, lumière, scène et vidéo à Bordeaux.
              Installation, sonorisation d'événement et prestation DJ en Gironde
              et dans la région bordelaise.
            </p>

            {hasContact && (
              <ul className="mt-6 space-y-2 text-[15px]">
                {contact.phone && (
                  <li>
                    <a
                      href={`tel:${contact.phoneHref ?? contact.phone}`}
                      className="text-brass-300 hover:text-brass-200"
                    >
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact.email && (
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-brass-300 hover:text-brass-200"
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
                      className="inline-flex items-center gap-2 text-brass-300 hover:text-brass-200"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </li>
                )}
              </ul>
            )}

            <div className="mt-7 flex flex-wrap gap-2">
              <Link href="/materiel" className="btn btn-sm">
                Voir le matériel
              </Link>
              <Link href="/demande" className="btn btn-sm btn-primary">
                Demander un devis
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 md:gap-14">
            <FooterCol
              title="Matériel"
              links={categories.map((c) => ({
                href: `/materiel/${c.slug}`,
                label: c.name,
              }))}
            />
            <FooterCol title="Prestations" links={PRESTATIONS} />
            <FooterCol title="DDSL Audio" links={MAISON} />
          </div>
        </div>

        <div className="rule-brass" />

        <div className="flex flex-col gap-4 py-6 text-[13px] text-paper-200/50 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p>
              © {new Date().getFullYear()} {site.name} — Bordeaux, {site.area}.
            </p>
            {/* Crédit du studio : une seule occurrence sur tout le site,
                le pied de page étant partagé par toutes les pages.
                L'ancre est le nom de la marque, jamais une expression
                commerciale — un lien de pied de page répété d'un site à
                l'autre avec une ancre optimisée est traité comme du spam. */}
            <p className="text-[12.5px] text-paper-200/50">
              Réalisé par{" "}
              <a
                href="https://www.pratstudio.fr"
                target="_blank"
                rel="noopener"
                className="text-paper-200/75 underline decoration-white/25 underline-offset-2 transition-colors hover:text-paper-50 hover:decoration-brass-300"
              >
                Prat Studio
              </a>
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Liens légaux">
            <Link href="/mentions-legales" className="hover:text-paper-50">
              Mentions légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="hover:text-paper-50"
            >
              Politique de confidentialité
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="tech mb-4 text-brass-300">{title}</h2>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[15px] text-paper-200/70 transition-colors hover:text-paper-50"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
