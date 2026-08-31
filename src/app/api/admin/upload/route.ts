import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

import { sessionValide } from "@/lib/admin-auth";

/**
 * Dépôt des photos de produit.
 *
 * Le fichier ne transite pas par cette route : le navigateur l'envoie
 * directement à Vercel Blob (la limite de taille d'une fonction
 * serverless est de quelques mégaoctets, une photo la dépasse vite).
 * La route ne fait qu'autoriser l'envoi, après vérification de la session.
 */

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await sessionValide())) {
    return NextResponse.json(
      { error: "Session expirée. Reconnectez-vous." },
      { status: 401 },
    );
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const reponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/avif",
        ],
        maximumSizeInBytes: 8 * 1024 * 1024,
        addRandomSuffix: true,
      }),
      // Appelé par Vercel une fois le fichier reçu. Rien à faire ici :
      // l'URL est enregistrée avec la fiche produit, pas à la volée.
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(reponse);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Envoi refusé." },
      { status: 400 },
    );
  }
}
