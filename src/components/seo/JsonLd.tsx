import { site } from "@/data/site";
import { categories, products, productLabel } from "@/data/catalog";
import type { Product } from "@/data/catalog";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Données structurées : uniquement des informations confirmées.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Fiche établissement. Aucun champ n'est publié tant qu'il n'est pas renseigné. */
export function LocalBusinessJsonLd() {
  const { contact, social } = site;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.baseUrl}/#entreprise`,
    name: site.name,
    url: site.baseUrl,
    description:
      "Location de matériel de sonorisation, d'éclairage, de scène et de vidéo à Bordeaux. Installation, sonorisation d'événement et prestation DJ en Gironde.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bordeaux",
      addressRegion: "Nouvelle-Aquitaine",
      addressCountry: "FR",
      ...(contact.address ? { streetAddress: contact.address } : {}),
      ...(contact.postalCode ? { postalCode: contact.postalCode } : {}),
    },
    areaServed: [
      { "@type": "City", name: "Bordeaux" },
      { "@type": "AdministrativeArea", name: "Gironde" },
    ],
    knowsAbout: categories.map((c) => c.name),
    makesOffer: categories.map((c) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${c.name} — location à Bordeaux`,
        description: c.tagline,
      },
      url: `${site.baseUrl}/materiel/${c.slug}`,
    })),
  };

  if (contact.phone) data.telephone = contact.phone;
  if (contact.email) data.email = contact.email;
  if (contact.openingHours) data.openingHours = contact.openingHours;

  const sameAs = [social.instagram, social.facebook, social.youtube].filter(
    Boolean,
  );
  if (sameAs.length) data.sameAs = sameAs;

  return <JsonLd data={data} />;
}

/** Fil d'ariane structuré. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${site.baseUrl}${item.href}`,
        })),
      }}
    />
  );
}

/** Liste du matériel d'une catégorie. */
export function CategoryItemListJsonLd({
  categorySlug,
  items,
}: {
  categorySlug: string;
  items: Product[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `Matériel disponible — ${categorySlug}`,
        numberOfItems: items.length,
        itemListElement: items.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: p.name,
            ...(p.brand ? { brand: { "@type": "Brand", name: p.brand } } : {}),
            ...(productLabel(p) ? { model: productLabel(p) } : {}),
            description: p.shortDescription,
            url: `${site.baseUrl}/materiel/${categorySlug}#${p.id}`,
          },
        })),
      }}
    />
  );
}

/** Questions fréquentes — uniquement des réponses factuelles. */
export function FaqJsonLd({
  faq,
}: {
  faq: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }}
    />
  );
}

export const totalReferences = products.length;
