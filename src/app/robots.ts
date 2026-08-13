import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/demande",
        "/mentions-legales",
        "/politique-de-confidentialite",
      ],
    },
    sitemap: `${site.baseUrl}/sitemap.xml`,
    host: site.baseUrl,
  };
}
