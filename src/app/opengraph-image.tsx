import { ImageResponse } from "next/og";

/**
 * Image de partage générée à la volée : reprend la signature du logo
 * (DDSL laiton, filet + signal, AUDIO espacé) sur fond encre.
 * Aucun fichier binaire à maintenir ; à remplacer par un visuel photo
 * dès que des images d'événements sont disponibles.
 */
export const alt =
  "DDSL Audio — location de matériel son, lumière et scène à Bordeaux";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background:
            "linear-gradient(140deg, #08090a 0%, #101215 55%, #08090a 100%)",
          padding: "0 88px",
          color: "#f5f3ee",
        }}
      >
        {/* Signature */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span
            style={{
              fontSize: 62,
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "#d8a83a",
            }}
          >
            DDSL
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 4,
              height: 34,
            }}
          >
            {[10, 26, 7, 34, 16].map((h, i) => (
              <span
                key={i}
                style={{
                  width: 5,
                  height: h,
                  background: i % 2 ? "#d8a83a" : "rgba(245,243,238,0.45)",
                }}
              />
            ))}
          </span>
          <span
            style={{
              fontSize: 40,
              fontWeight: 600,
              letterSpacing: "0.34em",
            }}
          >
            AUDIO
          </span>
        </div>

        <div
          style={{
            height: 1,
            width: 220,
            margin: "40px 0",
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
