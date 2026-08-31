"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Product } from "@/data/catalog";

/**
 * Met le catalogue à disposition des composants client (panier de devis,
 * compteurs du menu). Il était auparavant importé directement depuis
 * `@/data/catalog` ; depuis l'ajout de l'administration la liste est
 * chargée côté serveur, puis passée ici par le layout.
 */
const CatalogueContext = createContext<Product[] | null>(null);

export function CatalogueProvider({
  produits,
  children,
}: {
  produits: Product[];
  children: ReactNode;
}) {
  return (
    <CatalogueContext.Provider value={produits}>
      {children}
    </CatalogueContext.Provider>
  );
}

export function useCatalogue(): Product[] {
  const ctx = useContext(CatalogueContext);
  if (!ctx) {
    throw new Error("useCatalogue doit être utilisé dans <CatalogueProvider>");
  }
  return ctx;
}
