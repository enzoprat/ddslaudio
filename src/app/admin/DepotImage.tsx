"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

/**
 * Dépôt d'une photo par glisser-déposer (ou par clic).
 *
 * Le fichier part directement du navigateur vers Vercel Blob ; c'est
 * l'URL retournée qui est postée avec le formulaire, via un champ caché.
 */
export function DepotImage({ valeurInitiale }: { valeurInitiale: string }) {
  const [url, setUrl] = useState(valeurInitiale);
  const [survol, setSurvol] = useState(false);
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const champ = useRef<HTMLInputElement>(null);

  async function envoyer(fichier: File | undefined) {
    if (!fichier) return;
    if (!fichier.type.startsWith("image/")) {
      setErreur("Ce fichier n'est pas une image.");
      return;
    }

    setErreur(null);
    setEnCours(true);
    try {
      const blob = await upload(`produits/${fichier.name}`, fichier, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      });
      setUrl(blob.url);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "L'envoi a échoué.");
    } finally {
      setEnCours(false);
    }
  }

  return (
    <div>
      <input type="hidden" name="image" value={url} />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setSurvol(true);
        }}
        onDragLeave={() => setSurvol(false)}
        onDrop={(e) => {
          e.preventDefault();
          setSurvol(false);
          void envoyer(e.dataTransfer.files[0]);
        }}
        className={`flex items-center gap-4 rounded-[3px] border border-dashed p-4 transition-colors ${
          survol ? "border-brass-600 bg-brass-600/5" : "border-ink-950/25"
        }`}
      >
        {url ? (
          <Image
            src={url}
            alt=""
            width={80}
            height={80}
            unoptimized
            className="h-20 w-20 shrink-0 rounded-[2px] object-cover"
          />
        ) : (
          <div className="h-20 w-20 shrink-0 rounded-[2px] bg-paper-200" />
        )}

        <div className="min-w-0">
          <p className="text-[14px] text-ink-700">
            {enCours
              ? "Envoi en cours…"
              : "Glissez une photo ici, ou choisissez un fichier."}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => champ.current?.click()}
              disabled={enCours}
              className="btn btn-ghost btn-sm"
            >
              Choisir un fichier
            </button>
            {url && !enCours && (
              <button
                type="button"
                onClick={() => setUrl("")}
                className="btn btn-ghost btn-sm"
              >
                Retirer
              </button>
            )}
          </div>
          {erreur && (
            <p role="alert" className="mt-2 text-[13.5px] text-red-700">
              {erreur}
            </p>
          )}
        </div>
      </div>

      <input
        ref={champ}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          void envoyer(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}
