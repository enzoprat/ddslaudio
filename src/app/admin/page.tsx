import type { Metadata } from "next";

import { categories } from "@/data/catalog";
import { listeProduits, stockageActif, stockageLocal } from "@/lib/catalogue";
import { administrationConfiguree, sessionValide } from "@/lib/admin-auth";

import { Connexion } from "./Connexion";
import { Tableau } from "./Tableau";

/** Page d'administration : jamais indexée, jamais mise en cache. */
export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function Cadre({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 sm:py-20">
      {children}
    </div>
  );
}

export default async function AdminPage() {
  if (!administrationConfiguree()) {
    return (
      <Cadre>
        <h1 className="display-md text-ink-900">Administration inactive</h1>
        <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-600">
          La variable d'environnement <code>ADMIN_PASSWORD</code> n'est pas
          renseignée sur cet hébergement. Tant qu'elle est absente, la page
          reste fermée.
        </p>
      </Cadre>
    );
  }

  if (!(await sessionValide())) {
    return (
      <Cadre>
        <Connexion />
      </Cadre>
    );
  }

  if (!stockageActif()) {
    return (
      <Cadre>
        <h1 className="display-md text-ink-900">Catalogue en lecture seule</h1>
        <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-600">
          La variable <code>BLOB_READ_WRITE_TOKEN</code> est absente&nbsp;: le
          site affiche le catalogue d'origine et aucune modification ne peut
          être enregistrée. Ajoutez un store Blob au projet Vercel pour activer
          l'administration.
        </p>
      </Cadre>
    );
  }

  const produits = await listeProduits();

  return (
    <Cadre>
      {stockageLocal() && (
        <p className="mb-8 border-l-2 border-brass-600/45 py-1 pl-4 text-[14.5px] leading-relaxed text-ink-600">
          Poste de développement&nbsp;: les fiches sont écrites dans{" "}
          <code>.catalogue-local/</code> et le dépôt de photo est indisponible
          (il demande un store Blob). En ligne, tout est enregistré sur Vercel.
        </p>
      )}
      <Tableau produits={produits} categories={categories} />
    </Cadre>
  );
}
