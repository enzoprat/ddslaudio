import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og";

/**
 * Image de partage composée au build : logo DDSL Audio sur une photo de
 * régie assombrie. Les fichiers sont lus depuis `public/` et injectés en
 * base64, `next/og` ne pouvant pas résoudre d'URL relative.
 */
/** Généré au build — requis par l'export statique de l'aperçu client. */
export const dynamic = "force-static";

function asDataUrl(relativePath: string, mime: string) {
  const bytes = readFileSync(join(process.cwd(), "public", relativePath));
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

export const alt =
  "DDSL Audio — location de matériel son, lumière et scène à Bordeaux";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const logo = asDataUrl("brand/ddsl-audio.png", "image/png");
  const photo = asDataUrl("photos/regie-dj-colonnes.jpg", "image/jpeg");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#08090a",
          padding: "0 88px",
          color: "#f5f3ee",
        }}
      >
        {/* Photo de fond, largement assombrie pour rester lisible */}
        <img
          src={photo}
          alt=""
          width={630}
          height={630}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 630,
            height: 630,
            objectFit: "cover",
            opacity: 0.42,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, #08090a 45%, rgba(8,9,10,0.65) 72%, rgba(8,9,10,0.35) 100%)",
          }}
        />

        <img src={logo} alt="" width={300} height={205} />

        <div
          style={{
            height: 1,
            width: 220,
            margin: "34px 0",
            background:
              "linear-gradient(to right, #d8a83a, rgba(216,168,58,0))",
          }}
        />

        <div
          style={{
            fontSize: 56,
            lineHeight: 1.15,
            fontWeight: 600,
            maxWidth: 880,
          }}
        >
          Son, lumière, scène, vidéo.
        </div>
        <div
          style={{
            fontSize: 34,
            marginTop: 14,
            color: "#d8a83a",
            fontWeight: 500,
          }}
        >
          À louer seul ou installé sur place.
        </div>

        <div
          style={{
            fontSize: 26,
            marginTop: 44,
            color: "rgba(245,243,238,0.55)",
            letterSpacing: "0.14em",
          }}
        >
          BORDEAUX · GIRONDE
        </div>
      </div>
    ),
    size,
  );
}
