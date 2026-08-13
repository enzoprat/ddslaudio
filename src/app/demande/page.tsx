import type { Metadata } from "next";
import { RequestPage } from "@/components/quote/RequestPage";

export const metadata: Metadata = {
  title: "Demander un devis — location et prestation à Bordeaux",
  description:
    "Envoyez votre sélection de matériel et les informations de votre événement à DDSL Audio. Devis établi après vérification des disponibilités. Aucun paiement en ligne.",
  alternates: { canonical: "/demande" },
  robots: { index: false, follow: true },
};

export default function DemandePage() {
  return <RequestPage />;
}
