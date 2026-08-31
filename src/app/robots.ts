import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/** Généré au build — requis par l'export statique de l'aperçu client. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin",
        "/demande",
        "/mentions-legales",
        "/politique-de-confidentialite",
      ],
    },
    sitemap: `${site.baseUrl}/sitemap.xml`,
    host: site.baseUrl,
  };
}
