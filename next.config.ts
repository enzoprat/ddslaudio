import type { NextConfig } from "next";

/**
 * `GITHUB_PAGES=true` : build d'aperçu publié sur GitHub Pages pour la
 * présentation au client. Export 100 % statique, servi depuis un sous-chemin
 * (`/ddslaudio`), sans route serveur — voir .github/workflows/pages.yml.
 * En production le build reste inchangé.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: import.meta.dirname,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  ...(isPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath,
        // Le sous-chemin doit être lisible depuis le loader, qui n'a pas
        // accès à cette configuration.
        env: { NEXT_PUBLIC_BASE_PATH: basePath },
        images: {
          loader: "custom" as const,
          loaderFile: "./src/lib/pagesImageLoader.ts",
        },
      }
    : {}),
};

export default nextConfig;
