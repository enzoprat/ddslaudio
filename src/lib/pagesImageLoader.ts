/**
 * Loader d'images pour l'aperçu GitHub Pages, servi depuis un sous-chemin.
 *
 * `images.unoptimized` court-circuite le loader de Next : le `basePath`
 * n'est alors jamais ajouté au `src`, et toutes les images renvoient 404.
 * Ce loader rend l'image telle quelle, préfixée du sous-chemin.
 * Voir next.config.ts, branche `isPages`.
 */
export default function pagesImageLoader({ src }: { src: string }) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
