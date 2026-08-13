import type { Metadata } from "next";
import { GuidedPath } from "@/components/guide/GuidedPath";

export const metadata: Metadata = {
  title: "Vous ne savez pas quel matériel choisir ?",
  description:
    "Quatre questions sur votre événement à Bordeaux ou en Gironde : type, nombre de personnes, lieu, besoins. DDSL Audio prépare une proposition à partir de vos réponses.",
  alternates: { canonical: "/besoin-conseil" },
};

export default function BesoinConseilPage() {
  return <GuidedPath />;
}
