import type { MetadataRoute } from "next";
import { categories, products } from "@/data/catalog";
import { site } from "@/data/site";

/**
 * Les pages sans contenu public (demande de devis, pages légales)
 * sont volontairement exclues : elles sont en `noindex`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.baseUrl}${path}`;

  const statics: MetadataRoute.Sitemap = [
    { url: url("/"), priority: 1, changeFrequency: "monthly" },
    { url: url("/materiel"), priority: 0.9, changeFrequency: "monthly" },
    { url: url("/prestations"), priority: 0.8, changeFrequency: "yearly" },
    { url: url("/dj"), priority: 0.8, changeFrequency: "yearly" },
    { url: url("/besoin-conseil"), priority: 0.7, changeFrequency: "yearly" },
    { url: url("/realisations"), priority: 0.6, changeFrequency: "monthly" },
    { url: url("/a-propos"), priority: 0.5, changeFrequency: "yearly" },
    { url: url("/contact"), priority: 0.5, changeFrequency: "yearly" },
  ];

  const categoryUrls: MetadataRoute.Sitemap = categories.map((c) => ({
    url: url(`/materiel/${c.slug}`),
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: url(`/materiel/${p.category}/${p.id}`),
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  return [...statics, ...categoryUrls, ...productUrls].map((entry) => ({
    ...entry,
    lastModified: now,
  }));
}
